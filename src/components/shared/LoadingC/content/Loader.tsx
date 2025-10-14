import { Spinner, SpinnerProps } from "@/components/ui/shadcn-io/spinner";

interface ILoaderProps {
  variant: SpinnerProps["variant"];
}
const Loader = ({ variant }: ILoaderProps) => {
  return <Spinner key={variant} variant={variant} />;
};

export default Loader;
