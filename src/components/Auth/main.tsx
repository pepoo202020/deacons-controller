import AuthHeader from "./content/Header/main";

const MainAuthPage = () => {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col items-start justify-start">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center w-full">body</div>
      <div className="h-12 w-full">footer</div>
    </div>
  );
};

export default MainAuthPage;
