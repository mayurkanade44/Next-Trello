"use client";

import { useEffect, useState } from "react";
import CardModal from "../modals/cardModal";
import ProModal from "../modals/ProModal";

const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <CardModal />
      <ProModal />
    </div>
  );
};
export default ModalProvider;
