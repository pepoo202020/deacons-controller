"use client";
import { Form } from "@/components/ui/form";
import { LoginFormSchemaType, loginFormSchema } from "@/services/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "@/components/shared/FormField/main";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useCallback, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgetPasswordModal from "./ForgetPasswordModal";
import CustomActionButton from "@/components/shared/CustomActionButton/main";

interface ILoginFormBodyProps {
  t: (key: string, options?: Record<string, unknown> | undefined) => string;
}

const LoginFormBody: React.FC<ILoginFormBodyProps> = ({ t }) => {
  // states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema({ t })),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLoginSubmit = (data: LoginFormSchemaType) => {
    alert(`Email: ${data.email}, Password: ${data.password}`);
  };

  const showPasswordHandler = useCallback(() => {
    setShowPassword((pre) => !pre);
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoginSubmit)}
        className="space-y-2"
      >
        <div className="space-y-4">
          <CustomFormField<LoginFormSchemaType>
            control={form.control}
            name="email"
            type="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            icon={MdOutlineEmail}
          />
          <CustomFormField
            control={form.control}
            name="password"
            type={showPassword ? "text" : "password"}
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
            icon={RiLockPasswordFill}
            buttonIcon={showPassword ? FaEyeSlash : FaEye}
            buttonLabel={t("passwordButtonLabel")}
            onButtonClick={showPasswordHandler}
          />
        </div>
        <ForgetPasswordModal />
        <CustomActionButton
          text={t("loginButton")}
          variant="default"
          type="submit"
        />
      </form>
    </Form>
  );
};

export default LoginFormBody;
