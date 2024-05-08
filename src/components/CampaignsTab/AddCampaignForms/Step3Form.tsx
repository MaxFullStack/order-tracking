import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "../formSchema";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const Step3Form = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof formSchema>>();

  return (
    <>
      <FormLabel className="text-blue text-base" htmlFor="step3.maxInstallments">
        Installments
      </FormLabel>
      <FormDescription className="text-gray-500 text-sm">
        Set the maximum number and minimum value of installments.
      </FormDescription>
      <div className="w-full flex justify-start items-center mt-4 gap-4">
        <FormItem>
          <Label className="text-blue" htmlFor="step3.maxInstallments">
            Maximum number of installments
          </Label>
          <FormControl>
            <Controller
              control={control}
              name="step3.maxInstallments"
              render={({ field }) => (
                <div>
                  <Input
                    id="step3.maxInstallments"
                    type="number"
                    max={32}
                    className="w-[200px] bg-blue/5 mt-2"
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                    value={field.value}
                  />
                </div>
              )}
            />
          </FormControl>
          {errors.step3?.maxInstallments && (
            <FormMessage>{errors.step3?.maxInstallments.message}</FormMessage>
          )}
        </FormItem>
        <FormItem>
          <FormLabel className="text-blue" htmlFor="step3.minInstallmentValue">
            Minimum value per installment
          </FormLabel>
          <FormControl className="relative">
            <Controller
              control={control}
              name="step3.minInstallmentValue"
              render={({ field }) => (
                <div>
                  <span className="absolute ml-4 mt-2">R$</span>
                  <Input
                    id="step3.minInstallmentValue"
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-[200px] bg-blue/5 mt-2 pl-10"
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                    value={field.value}
                  />
                </div>
              )}
            />
          </FormControl>
          {errors.step3?.minInstallmentValue && (
            <FormMessage>{errors.step3?.minInstallmentValue.message}</FormMessage>
          )}
        </FormItem>
      </div>
    </>
  );
};

export default Step3Form;
