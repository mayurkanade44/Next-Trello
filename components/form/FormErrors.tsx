import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-1 text-xs text-red-500"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center pt-1 pl-1"
        >
          <XCircle className="h-[14px] w-[14px] mr-1" />
          {error}
        </div>
      ))}
    </div>
  );
};
export default FormErrors;
