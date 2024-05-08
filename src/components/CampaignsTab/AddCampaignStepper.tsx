"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { steps } from "./AddCampaingData";
import { Button } from "@/components/ui/button";
import { FieldTranslations, fieldTranslations } from "./fieldTranslations";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import { z } from "zod";
import ProgressBar from "./ProgressBar";

interface CampaignStepperProps {
  onClose: () => void;
}

const CampaignStepper = ({ onClose }: CampaignStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      step1: { campaignName: "" },
      step2Part1: { interestType: "simpleInterest", interestRate: 0.01 },
      step2Part2: { fineType: "withoutFine", finePercentage: 0.01 },
      step3: { maxInstallments: 1, minInstallmentValue: 0.01 },
    },
  });

  const { handleSubmit } = methods;

  const isLastStep = activeStep === steps.length - 1;
  const isLastSubStep =
    activeItem === (steps[activeStep]?.stepForms?.length ?? 1) - 1;
  const CurrentStepComponent =
    steps[activeStep]?.stepForms?.[activeItem] || null;

  const handlePrev = () => {
    if (activeItem > 0) {
      setActiveItem((current) => current - 1);
    } else if (activeStep > 0) {
      setActiveStep((current) => current - 1);
      setActiveItem((steps[activeStep - 1]?.stepForms?.length ?? 1) - 1);
    }
  };

  const handleNext = async () => {
    const fieldNames = getFieldNamesForCurrentStep(
      activeStep,
      activeItem,
      methods.getValues()
    );
    const isValid = await methods.trigger(fieldNames as keyof FormSchemaType[]);

    if (isValid) {
      if (isLastSubStep) {
        setActiveStep((current) => current + 1);
        setActiveItem(0);
      } else {
        setActiveItem((current) => current + 1);
      }
    }
  };

  const handleSubmitFinal = methods.handleSubmit((data) => {
    console.log("Form data on submit:", data);
    Object.entries(data).forEach(([key, value]: any) => {
      const translatedKey = fieldTranslations[key as keyof FieldTranslations];
    });

    onClose();
  });

  const getFieldNamesForCurrentStep = (
    activeStep: number,
    activeItem: number,
    formValues: any
  ): keyof FormSchemaType => {
    switch (activeStep) {
      case 0:
        return ["step1.campaignName"];
      case 1:
        if (activeItem === 0) {
          return ["step2Part1.interestType", "step2Part1.interestRate"];
        } else {
          return ["step2Part2.fineType", "step2Part2.finePercentage"];
        }
      case 2:
        return ["step3.maxInstallments", "step3.minInstallmentValue"];
      default:
        return [];
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={isLastStep ? handleSubmitFinal : (e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center w-full mt-8 relative">
          <div className="flex justify-between w-full mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-baseline w-full">
                <ProgressBar
                  index={index}
                  activeStep={activeStep}
                  activeItem={activeItem}
                  steps={steps}
                />

                <h3 className="text-sm text-gray-500 mt-4">{step.title}</h3>
                <p
                  className={`text-sm ${
                    index === activeStep
                      ? "font-bold text-blue-800"
                      : "text-gray-500"
                  }`}
                >
                  {step.subTitle}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          {CurrentStepComponent ? (
            <CurrentStepComponent
              onNext={
                isLastSubStep && !isLastStep
                  ? handleSubmit(handleNext)
                  : handleNext
              }
            />
          ) : null}
        </div>
        <div className="flex mt-8 gap-3">
          {activeStep > 0 && (
            <Button variant={"ghost"} size={"lg"} onClick={handlePrev}>
              Back
            </Button>
          )}
          {!isLastStep ? (
            <Button size={"lg"} onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button size={"lg"} type="submit">
              Finish
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CampaignStepper;
