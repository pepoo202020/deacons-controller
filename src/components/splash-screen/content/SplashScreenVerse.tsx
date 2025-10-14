interface ISplashScreenVerseProps {
  verse: string;
}

const SplashScreenVerse = ({ verse }: ISplashScreenVerseProps) => {
  return <p className="font-bold text-yellow-300">{verse}</p>;
};

export default SplashScreenVerse;
