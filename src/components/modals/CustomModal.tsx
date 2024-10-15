"use client";
import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useStore } from "zustand";
import { useModal } from "@/stores/useModal";

type Props = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomModal = ({ children, defaultOpen }: Props) => {
  const model = useStore(useModal, (state) => state);
  return (
    <Dialog open={model.isOpen || defaultOpen} onOpenChange={model.setClose}>
      <DialogContent className="h-[630px] w-full max-w-[400px] overflow-hidden rounded-lg bg-card md:max-w-[600px]">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
