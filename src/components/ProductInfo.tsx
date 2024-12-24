"use client";
import { products } from "@wix/stores";
import React, { useEffect, useState } from "react";
import Add from "./Add";

interface PRODUCTINFO {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}

function ProductInfo({ productId, variants, productOptions }: PRODUCTINFO) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectsVariants] = useState<products.Variant>();
  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectsVariants(variant);
  }, [selectedOptions, variants]);

  

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantsChoices = variant.choices;
      if (!variantsChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantsChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  console.log(productOptions)
  const handleOptionSelect = (optionType: string, choices: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choices }));
  };
  return (
    <div className="flex flex-col gap-6">
      {/* for color */}
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name} </h4>
          <ul className="flex items-center gap-3 ">
            {option.choices?.map((choice) => {
              console.log(choice.value)
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);
              return option.name === "Color" ? (
                <li
                  key={choice.value}
                  onClick={clickHandler}
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300  relative "
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 rotate-45 " />
                  )}
                </li>
              ) : (
                <li
                  onClick={clickHandler}
                  className="ring-1 ring-adfok gap-3 text-adfok rounded-md py-1 px-4 text-sm cursor-pointer"
                  style={{
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                      ? "#FBCFED"
                      : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  {choice.description}
                </li>
              );
              //  (
              //   // <div key={choice.value} onClick={clickHandler}>
              //   //   {choice.description}
              //   //   {disabled && "disabled"} {selected && "selected"}
              //   // </div>
              // );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || "581ac561-9f39-4eda-8964-b224672ad02b"
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
}

export default ProductInfo;
