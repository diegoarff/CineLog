import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerStyle: {
            backgroundColor: "#101015",
          },
          headerTintColor: "#e4e4e7",
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
