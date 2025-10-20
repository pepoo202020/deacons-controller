import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ICustomAvatarProps {
  borderColor: "blue" | "yellow";
  image: string;
  alt: string;
  size: string;
  fallback: string[];
}

const CustomAvatar: React.FC<ICustomAvatarProps> = ({
  alt,
  borderColor,
  fallback,
  image,
  size,
}) => {
  return (
    <Avatar className={`border border-${borderColor}-800`}>
      {image && (
        <AvatarImage src={image} alt={`profile image of ${alt}`} sizes={size} />
      )}
      <AvatarFallback className="text-white">{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
