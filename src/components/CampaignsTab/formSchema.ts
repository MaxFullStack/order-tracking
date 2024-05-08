import { z } from "zod";

// Definition of schemas for each step of the form.
const step1Schema = z.object({
  campaignName: z.string().min(1, "Campaign name is required."),
});

const step2Part1Schema = z.object({
  interestType: z.enum(["compoundInterest", "simpleInterest"]).or(z.literal("")),
  interestRate: z.number().min(0.01, "Monthly interest rate must be greater than 0%."),
});

const step2Part2Schema = z.object({
  fineType: z.enum(["withFine", "withoutFine"]).or(z.literal("")),
  finePercentage: z.number().min(0.01, "Fine percentage must be greater than 0%.").optional(),
}).refine(data => data.fineType !== "withFine" || data.finePercentage != null, {
  message: "Fine percentage must be greater than 0 if 'With Fine' is selected.",
  path: ["finePercentage"],
});

const step3Schema = z.object({
  maxInstallments: z.number().min(1, "Maximum number of installments must be greater than 0.").max(36, "Maximum number of installments: 36."),
  minInstallmentValue: z.number().min(0.01, "Minimum installment value must be greater than R$ 0.00."),
});

// Final schema concatenating all previous schemas.
export const formSchema = z.object({
  step1: step1Schema,
  step2Part1: step2Part1Schema,
  step2Part2: step2Part2Schema,
  step3: step3Schema,
});

// Inferred type for the complete form.
export type FormSchemaType = z.infer<typeof formSchema>;
