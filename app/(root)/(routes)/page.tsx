"use client";

import { useEffect } from "react";

import { Modal } from "@/components/ui/modal";
import { useBlogModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";

const SetUpPage = () => {
  const onOpen = useBlogModal((state) => state.onOpen);
  const isOpen = useBlogModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetUpPage;
