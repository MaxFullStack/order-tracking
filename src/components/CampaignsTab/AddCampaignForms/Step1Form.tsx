"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../formSchema";
import {
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";

const Step1Form = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof formSchema>>();

  return (
    <>
      <FormItem>
        <FormLabel className="text-blue text-base" htmlFor="step1.campaignName">
          Choose a name
        </FormLabel>
        <FormControl>
          <Controller
            control={control}
            defaultValue=""
            name="step1.campaignName"
            render={({ field }) => (
              <Input
                id="step1.campaignName"
                className="w-[440px] bg-blue/5 mt-2"
                placeholder="Campaign name"
                maxLength={60}
                {...field}
              />
            )}
          />
        </FormControl>
        {errors.step1?.campaignName && (
          <FormMessage>{errors.step1?.campaignName.message}</FormMessage>
        )}
        <FormDescription className="flex items-center mt-2">
          <Icons.info size={18} className="mr-2" />
          Only campaigns with unique names can be created.
        </FormDescription>
      </FormItem>
    </>
  );
};

export default Step1Form;
