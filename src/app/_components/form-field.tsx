import * as LabelPrimitive from "@radix-ui/react-label";

type FormFieldProps = {
  name: string;
  label: string;
  children: React.ReactNode;
};

export const FormField = ({ name, label, children }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <LabelPrimitive.Root className="font-bold">{label}:</LabelPrimitive.Root>
      {children}
    </div>
  );
};
