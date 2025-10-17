import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Mail } from "lucide-react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons";

interface ITextFormFieldProps<TFieldValues extends FieldValues> {
  type: "text" | "email" | "password";
  label: string;
  placeholder: string;
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  Icon?: IconType;
  ButtonIcon?: IconType;
  onButtonClick?: () => void;
  buttonLabel?: string;
}

const TextFormField = <TFieldValues extends FieldValues>({
  type,
  label,
  placeholder,
  field,
  Icon,
  ButtonIcon,
  onButtonClick,
  buttonLabel,
}: ITextFormFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <FormLabel className="text-white dark:text-[#1E253C] font-bold">
        {label}
      </FormLabel>
      <FormControl>
        <InputGroup className="dark:border-black border-white">
          <InputGroupInput placeholder={placeholder} type={type} {...field} />
          {Icon && (
            <InputGroupAddon>
              <Icon />
            </InputGroupAddon>
          )}
          {ButtonIcon && (
            <InputGroupButton
              aria-label={buttonLabel}
              title={buttonLabel}
              size="icon-sm"
              onClick={onButtonClick}
              variant="default"
              className="bg-transparent hover:bg-transparent cursor-pointer"
            >
              {<ButtonIcon />}
            </InputGroupButton>
          )}
        </InputGroup>
      </FormControl>
      <FormMessage className="text-red-400 font-bold" />
    </FormItem>
  );
};

export default TextFormField;
