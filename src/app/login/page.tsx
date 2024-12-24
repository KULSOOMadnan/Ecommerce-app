"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

function LoginPage() {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }
  const [mode, setMode] = useState<MODE>(MODE.LOGIN);
  const [username, setUsername] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [password, setPassword] = useState<string>(""); // Added password state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Sign up"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Sign up "
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "verify";

  const pathname = usePathname();

  // const handleCaptchaChange = (token: string | null) => {
  //   console.log("Captcha token:", token);
    
  //     setCaptchaToken(token); // Store the token in state when it's received
    
    
  // };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("Something Went Wrong!");

    // if (!captchaToken) {
    //   console.error("Captcha token is required!");
    //   return;
    // }

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
          case MODE.REGISTER:
            response = await wixClient.auth.register({
              email,
              password,
              profile: { nickname: username },
            });
            break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your e-mail.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
        default:
          break;

        }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(120vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center w-full">
      <div className="p-8 bg-white rounded-xl shadow-lg  w-[400px]">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <h1 className="lg:text-3xl text-2xl font-bold text-center">
            {formTitle}
          </h1>
          {mode === MODE.REGISTER ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 ">Username</label>
              <input
                type="text"
                name="username"
                placeholder="john"
                className="ring-2 ring-gray-300 rounded-md p-2 "
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          ) : null}
          {mode !== MODE.EMAIL_VERIFICATION ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                className="ring-2 ring-gray-300 rounded-md p-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Verification Code</label>
              <input
                type="text"
                name="emailCode"
                placeholder="Code"
                className="ring-2 ring-gray-300 rounded-md p-2"
                onChange={(e) => setEmailCode(e.target.value)}
              />
            </div>
          )}
          {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="ring-2 ring-gray-300 rounded-md p-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : null}
          {mode === MODE.LOGIN && (
            <div
              className="text-sm underline cursor-pointer"
              onClick={() => setMode(MODE.RESET_PASSWORD)}
            >
              Forgot Password?
            </div>
          )}


          <button
            className="bg-adfok text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : buttonTitle}
          </button>
          {error && <div className="text-red-600">{error}</div>}
          {mode === MODE.LOGIN && (
            <div
              className="text-sm text-center cursor-pointer"
              onClick={() => setMode(MODE.REGISTER)}
            >
              {"Don't"} have an account?{" "}
              <span className="text-adfok ml-2 ">Sign up</span>
            </div>
          )}
          {mode === MODE.REGISTER && (
            <div
              className="text-sm text-center cursor-pointer"
              onClick={() => setMode(MODE.LOGIN)}
            >
              Already have an account?{" "}
              <span className="text-adfok ml-2 ">Login now</span>
            </div>
          )}
          {mode === MODE.RESET_PASSWORD && (
            <div
              className="text-sm underline  text-center  cursor-pointer"
              onClick={() => setMode(MODE.LOGIN)}
            >
              Go back to <span className="text-adfok">login</span>
            </div>
          )}
          {message && <div className="text-green-600 text-sm">{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;




          {/* Google reCAPTCHA */}
          {/* { mode === MODE.REGISTER  && (

          // <div className="flex justify-center items-center w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          //   <ReCAPTCHA
          //     sitekey="6Ldtz38qAAAAADXmzDTVMZcC4hDBZ0t5v3YG6fZf"
          //     onChange={handleCaptchaChange}
          //   />
          // </div>
          )} */}