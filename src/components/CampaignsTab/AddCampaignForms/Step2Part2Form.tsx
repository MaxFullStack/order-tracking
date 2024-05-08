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

const Step2Part2Form = () => {
  const {
    control,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<z.infer<typeof formSchema>>();

  const fineType = watch("step2Part2.fineType");

  return (
    <>
      <FormItem>
        <div className="text-blue font-medium">Debt Fine</div>
        <FormControl>
          <Controller
            control={control}
            name="step2Part2.fineType"
            defaultValue="withoutFine"
            render={({ field }) => (
              <RadioGroup
                id="step2Part2.fineType"
                className="flex pt-2"
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === "withoutFine") {
                    setValue("step2Part2.finePercentage", undefined);
                    clearErrors("step2Part2.finePercentage");
                  }
                }}
                value={field.value}
              >
                <Card className="w-full">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                      <FormLabel
                        className="font-semibold text-blue text-base"
                        htmlFor="withFine"
                      >
                        With Fine
                      </FormLabel>
                      <p className="text-gray-500 text-sm">
                        A single value applied to the debt
                      </p>
                    </div>
                    <RadioGroupItem id="withFine" value="withFine" />
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                      <FormLabel
                        className="font-semibold text-blue text-base"
                        htmlFor="withoutFine"
                      >
                        Without Fine
                      </FormLabel>
                      <p className="text-gray-500 text-sm">
                        No fine will be applied to the amount
                      </p>
                    </div>
                    <RadioGroupItem id="withoutFine" value="withoutFine" />
                  </CardContent>
                </Card>
              </RadioGroup>
            )}
          />
        </FormControl>
        {errors.step2Part2?.fineType && (
          <FormMessage>{errors.step2Part2?.fineType.message}</FormMessage>
        )}
      </FormItem>
      <FormItem className="mt-6">
        <FormLabel className="text-blue text-base" htmlFor="step2Part2.finePercentage">
          Fine Percentage
        </FormLabel>
        <FormControl>
          <Controller
            control={control}
            name="step2Part2.finePercentage"
            render={({ field }) => (
              <div className="flex items-center">
                <Input
                  id="step2Part2.finePercentage"
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-[200px] bg-blue/5 mt-2"
                  value={fineType === "withoutFine" ? "" : field.value || ""}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                  disabled={fineType === "withoutFine"}
                />
                <span className="-ml-12 mt-2">%</span>
              </div>
            )}
          />
        </FormControl>
        {errors.step2Part2?.finePercentage && (
          <FormMessage>{errors.step2Part2?.finePercentage.message}</FormMessage>
        )}
      </FormItem>
    </>
  );
};

export default Step2Part2Form;