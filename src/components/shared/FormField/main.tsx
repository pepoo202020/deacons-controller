import { FormField } from "@/components/ui/form";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import TextFormField from "./content/TextFormField";
import { IconType } from "react-icons";

interface ICustomFormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  type: "email" | "password" | "text";
  label: string;
  placeholder: string;
  icon?: IconType;
  buttonIcon?: IconType;
  onButtonClick?: () => void;
  buttonLabel?: string;
}

const CustomFormField = <TFieldValues extends FieldValues>({
  control,
  name,
  type,
  label,
  placeholder,
  icon,
  buttonIcon,
  buttonLabel,
  onButtonClick,
}: ICustomFormFieldProps<TFieldValues>) => {
  const customFormFieldItem = (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) => {
    if (type === "email" || type === "password") {
      return (
        <TextFormField
          type={type}
          label={label}
          placeholder={placeholder}
          field={field}
          Icon={icon}
          ButtonIcon={buttonIcon}
          buttonLabel={buttonLabel}
          onButtonClick={onButtonClick}
        />
      );
    } else {
      return (
        <TextFormField
          type={type}
          label={label}
          placeholder={placeholder}
          field={field}
          Icon={icon}
          ButtonIcon={buttonIcon}
          buttonLabel={buttonLabel}
          onButtonClick={onButtonClick}
        />
      );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => customFormFieldItem(field)}
    />
  );
};

export default CustomFormField;
