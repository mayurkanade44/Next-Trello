"use client";

import { useEffect, useState } from "react";
import CardModal from "../modals/cardModal";

const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <CardModal />
    </div>
  );
};
export default ModalProvider;
