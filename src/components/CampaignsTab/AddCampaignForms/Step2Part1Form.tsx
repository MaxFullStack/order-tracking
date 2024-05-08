import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../formSchema";
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

const Step2Part1Form = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof formSchema>>();

  return (
    <>
      <FormItem>
        <div className="text-blue font-medium">Select the type of interest</div>
        <FormControl>
          <Controller
            control={control}
            name="step2Part1.interestType"
            defaultValue="simpleInterest"
            render={({ field }) => (
              <RadioGroup
                id="step2Part1.interestType"
                className="flex pt-2"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <Card className="w-full">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                      <FormLabel
                        className="font-semibold text-blue text-base"
                        htmlFor="compoundInterest"
                      >
                        Compound Interest
                      </FormLabel>
                      <p className="text-gray-500 text-sm">
                        Interest on interest
                      </p>
                    </div>
                    <RadioGroupItem
                      value="compoundInterest"
                      id="compoundInterest"
                    />
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                      <FormLabel
                        className="font-semibold text-blue text-base"
                        htmlFor="simpleInterest"
                      >
                        Simple Interest
                      </FormLabel>
                      <p className="text-gray-500 text-sm">
                        Applied on an initial amount
                      </p>
                    </div>
                    <RadioGroupItem
                      value="simpleInterest"
                      id="simpleInterest"
                    />
                  </CardContent>
                </Card>
              </RadioGroup>
            )}
          />
        </FormControl>
        {errors.step2Part1?.interestType && (
          <FormMessage>{errors.step2Part1?.interestType.message}</FormMessage>
        )}
      </FormItem>
      <FormItem className="mt-6">
        <FormLabel className="text-blue text-base" htmlFor="step2Part1.interestRate">
          Monthly interest rate based on the debt
        </FormLabel>
        <FormControl>
          <Controller
            control={control}
            name="step2Part1.interestRate"
            render={({ field }) => (
              <div className="flex items-center">
                <Input
                  id="step2Part1.interestRate"
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-[200px] bg-blue/5 mt-2"
                 onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                   value={field.value}
                />
                <span className="-ml-12 mt-2">%</span>
              </div>
            )}
          />
        </FormControl>
        {errors.step2Part1?.interestRate && (
          <FormMessage>{errors.step2Part1?.interestRate.message}</FormMessage>
        )}
      </FormItem>
    </>
  );
};

export default Step2Part1Form;
