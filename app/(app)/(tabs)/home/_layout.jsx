import { Stack } from "expo-router";
import { Logo, ProfileIcon } from "../../../../components";
const colors = require("tailwindcss/colors");

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <Logo className="-ml-[9px] mr-3 aspect-square w-12" />
          ),
          headerTitle: "Home",
          headerRight: () => <ProfileIcon className="-mr-[6px]" />,
          headerStyle: {
            backgroundColor: "#101015",
          },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="all"
        options={{
          headerTitle: "Trending",
          headerStyle: {
            backgroundColor: "#101015",
          },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="movie"
        options={{
          headerTitle: "Popular movies",
          headerStyle: {
            backgroundColor: "#101015",
          },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="tv"
        options={{
          headerTitle: "Popular shows",
          headerStyle: {
            backgroundColor: "#101015",
          },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
