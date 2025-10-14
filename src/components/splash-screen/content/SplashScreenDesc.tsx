interface ISplashScreenDescProps {
  text: string;
}

const SplashScreenDesc = ({ text }: ISplashScreenDescProps) => {
  return <p className="text-2xl font-light italic mb-5">{text}</p>;
};

export default SplashScreenDesc;
