import React from "react";
import Step1Form from "./AddCampaignForms/Step1Form";
import Step2Part1Form from "./AddCampaignForms/Step2Part1Form";
import Step2Part2Form from "./AddCampaignForms/Step2Part2Form";
import Step3Form from "./AddCampaignForms/Step3Form";
import Step4Form from "./AddCampaignForms/Step4Form";
import Step5Form from "./AddCampaignForms/Step5Form";

export type Step1Data = {
  campaignName: string;
};

export type Step2Part1Data = {
  interestType: string;
  interestRate: number;
};

export type Step2Part2Data = {
  fineType: string;
  finePercentage: number;
};

export type Step3Data = {
  maxInstallments: number;
  minInstallmentValue: number;
};

export type Step4Data = {};

export type FormData = Step1Data &
  Step2Part1Data &
  Step2Part2Data &
  Step3Data &
  Step4Data;

export interface Step {
  title: string;
  subTitle: string;
  stepForms?: React.ComponentType<{ onNext: () => void }>[];
}

export const steps: Step[] = [
  {
    title: "Step 1",
    subTitle: "Choose a Name",
    stepForms: [Step1Form],
  },
  {
    title: "Step 2",
    subTitle: "Interest and Fines",
    stepForms: [Step2Part1Form, Step2Part2Form],
  },
  {
    title: "Step 3",
    subTitle: "Conditions",
    stepForms: [Step3Form],
  }, 
  {
    title: "Step 4",
    subTitle: "Summary",
    stepForms: [Step4Form],
  },
  {
    title: "Step 5",
    subTitle: "Finish",
    stepForms: [Step5Form],
  },
];
