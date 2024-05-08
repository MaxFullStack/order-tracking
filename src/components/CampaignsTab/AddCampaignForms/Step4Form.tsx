import React from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "../AddCampaingData"; // Garanta que isso está importado corretamente

const Step4Form: React.FC = () => {
  const { getValues } = useFormContext<FormData>();
  const data = getValues();

  // Função para renderizar cada valor com formatação condicional
  const renderValue = (key: string, value: any) => {
    const fieldMappings: Record<string, { label: string; format?: (value: any) => string }> = {
      campaignName: { label: "Campaign Name" },
      interestType: { label: "Interest Type", format: (value) => value === "simpleInterest" ? "Simple" : "Compound" },
      interestRate: { label: "Interest Rate", format: (value) => `${value}%` },
      fineType: { label: "Fine Type", format: (value) => value === "withoutFine" ? "No Fine" : "With Fine" },
      finePercentage: { label: "Fine Percentage", format: (value) => `${value}%` },
      maxInstallments: { label: "Maximum Installments" },
      minInstallmentValue: { label: "Minimum Installment Value", format: (value) => `$${value.toFixed(2)}` }
    };

    const field = fieldMappings[key];
    if (!field) return null; // Se não tiver mapeamento, não renderiza

    const label = field.label;
    const formattedValue = field.format ? field.format(value) : value;

    return (
      <div key={key} className="mb-2">
        <strong>{label}:</strong> {formattedValue}
      </div>
    );
  };

  const renderData = (data: any): JSX.Element[] => {
    return Object.entries(data).reduce<JSX.Element[]>((acc, [key, value]) => {
      if (typeof value === "object" && value !== null && !(value instanceof Array)) {
        // Recursion for nested objects
        acc.push(...renderData(value));
      } else {
        const element = renderValue(key, value);
        if (element) {
          acc.push(element);
        }
      }
      return acc;
    }, []);
  };
  
  return (
    <>
      <h2 className="text-lg font-semibold">Summary</h2>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        {renderData(data)}
      </div>
    </>
  );
};

export default Step4Form;
