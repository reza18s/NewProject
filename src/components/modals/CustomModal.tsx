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
      <DialogContent className="h-[600px] w-[70%] max-w-[600px] overflow-scroll rounded-lg bg-card">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
