"use client";

import { useEffect, useState } from "react";

import { BlogModal } from "@/components/modals/blog-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <BlogModal />
    </>
  );
}

