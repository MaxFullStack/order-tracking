import React from "react";
import { Icons } from "@/components/icons";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  index: number;
  activeStep: number;
  activeItem: number;
  steps: {
    title: string;
    subTitle: string;
    stepForms?: React.ComponentType<{ onNext: () => void }>[];
  }[];
}

const ProgressBar = ({
  index,
  activeStep,
  activeItem,
  steps,
}: ProgressBarProps) => {
  const isCompleted = index < activeStep;
  const isInProgress = index === activeStep;
  const totalItems = steps[index].stepForms?.length ?? 1;
  const progressValue = isInProgress
    ? ((activeItem + 1) / totalItems) * 100
    : isCompleted
    ? 100
    : 0;

  return (
    <div className="flex items-center w-full">
      {isCompleted ? (
        <div className="w-5 h-5 p-4 rounded-full flex items-center justify-center text-lg font-semibold text-white bg-green-800">
          <div>
            <Icons.check size={20} />
          </div>
        </div>
      ) : (
        <div
          className={`w-5 h-5 p-4 rounded-full flex items-center justify-center text-lg font-semibold ${
            isInProgress
              ? "text-white bg-emerald-600"
              : "text-gray-500 bg-yellow-400"
          }`}
        >
          {index + 1}
        </div>
      )}
      <Progress value={progressValue} max={100} className="w-full mx-2" />
    </div>
  );
};

export default ProgressBar;
