import { Image } from "react-native";

const Logo = ({ className }) => {
  return (
    <Image source={require("../assets/logo.png")} className={`${className}`} />
  );
};

export default Logo;
