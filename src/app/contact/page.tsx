import Image from 'next/image'
import React from 'react'
import phone from '../../../public/call2.png'
import mail from '../../../public/mail2.png'

function page() {
  return (
   <>
   
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-center space-y-8 lg:space-x-9 h-auto lg:h-screen items-center">
        {/* Contact Info */}
        <div className="w-full lg:w-[340px] flex flex-col justify-evenly items-center shadow-lg p-6  md:mt-0">
          {/* Call To Us */}
          <div className="leading-9 w-full">
            <div className="flex items-center space-x-3">
              <div className="hover:rounded-full hover:bg-adfok p-2">
                <Image
                  src={phone}
                  alt="phone"
                  className="cursor-pointer h-[35px] w-[35px] hover:p-[4px] filter hover:invert hover:brightness-150"
                />
              </div>
              <h1 className="font-[poppins] font-medium text-[16px]">Call To Us</h1>
            </div>
            <div className="font-normal font-[poppins] mt-5 text-[14px]">
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
          </div>
          {/* Write To Us */}
          <div className="border-t-2 border-gray-200 pt-6 leading-9 w-full">
            <div className="flex items-center space-x-3">
              <div className="hover:rounded-full hover:bg-adfok p-2">
                <Image
                  src={mail}
                  alt="mail"
                  className="cursor-pointer h-[35px] w-[35px] hover:p-[4px] filter hover:invert hover:brightness-150"
                />
              </div>
              <h1 className="font-[poppins] font-medium text-[16px]">Write To Us</h1>
            </div>
            <div className="font-normal font-[poppins] text-[14px] mt-5">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Email: customer@exclusive.com</p>
              <p>Email: support@exclusive.com</p>
            </div>
          </div>
        </div>
        {/* Form Section */}
        <div className="w-full lg:w-[800px] shadow-lg p-6">
          <form className="space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <input
                type="text"
                className="bg-gray-100 h-[40px] w-full p-3 focus:outline-none rounded-sm"
                placeholder="Your Name*"
              />
              <input
                type="email"
                className="bg-gray-100 h-[40px] w-full p-3 focus:outline-none rounded-sm"
                placeholder="Your Email*"
              />
              <input
                type="tel"
                className="bg-gray-100 h-[40px] w-full p-3 focus:outline-none rounded-sm"
                placeholder="Your Phone*"
              />
            </div>
            {/* Message Area */}
            <div>
              <textarea
                placeholder="Your Message"
                className="bg-gray-100 p-3 focus:outline-none rounded-sm w-full"
                rows={8}
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-adfok hover:bg-[#bf3434] rounded-lg text-white h-[45px] w-[180px]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div></>
  )
}

export default page