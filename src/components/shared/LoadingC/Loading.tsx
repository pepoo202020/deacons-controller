import Loader from "./content/Loader";

interface ILoadingProps {
  text: string;
  mode: "text" | "modal" | "page";
}

const Loading = ({ text, mode }: ILoadingProps) => {
  return mode === "text" ? (
    <div className="flex items-center justify-center gap-2">
      <Loader variant="default" />
      <p className="font-semibold text-lg">{text}</p>
    </div>
  ) : mode === "modal" ? (
    <div>loading modal</div>
  ) : (
    <div className="fixed w-screen h-screen bg-black/40 text-white flex flex-col items-center justify-center gap-5">
      <Loader variant="bars" />
      <p className="font-semibold text-lg">{text}</p>
    </div>
  );
};

export default Loading;
