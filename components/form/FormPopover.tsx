"use client";

import { useAction } from "@/hooks/useAction";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { createBoard } from "@/actions/createBoard";
import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import FormPicker from "./FormPicker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/useProModal";

interface FormPopoverPops {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "end" | "center";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverPops) => {
  const proModal = useProModal()
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },

    onError: (error) => {
      toast.error(error);
      proModal.onOpen()
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 border-none text-red-500"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <FormPicker id="image" errors={fieldErrors} />
          <div className="space-y-4">
            <FormInput label="Board Title" id="title" errors={fieldErrors} />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default FormPopover;
