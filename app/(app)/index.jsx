import { Redirect } from "expo-router";
import { Image, View } from "react-native";

const index = () => {
  return (
    <View className="flex-1 bg-base">
      <Image source={require("../../assets/splash.png")} />
      <Redirect href="/home" />
    </View>
  );
};

export default index;
