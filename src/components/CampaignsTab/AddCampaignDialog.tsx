"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CampaignStepper from "./AddCampaignStepper";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const CampaignDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="active:border-none">
          <div className="flex items-center mx-2">
            <Icons.plus className=" text-white -ml-2" />
            <div className="ml-2 text-left text-white">
              <p className="text-md">Example - Steps with progress bar</p>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[960px] p-6">
        <DialogHeader>
          <DialogTitle>New Campaigns</DialogTitle>
        </DialogHeader>
        <CampaignStepper onClose={handleCloseModal} />
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialog;
