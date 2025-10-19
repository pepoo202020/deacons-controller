import z from "zod";

interface ISchemaProps {
  t: (key: string, options?: Record<string, unknown> | undefined) => string;
}

export const loginFormSchema = ({ t }: ISchemaProps) => {
  return z.object({
    email: z.email(t("emailError")),
    password: z.string().min(5, t("passwordLengthError")),
  });
};

export type LoginFormSchemaType = z.infer<ReturnType<typeof loginFormSchema>>;
