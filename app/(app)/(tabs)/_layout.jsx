import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="chat" />
    </Tabs>
  );
};

export default TabLayout;
