import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
const colors = require("tailwindcss/colors");

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.teal[500],
        tabBarStyle: {
          backgroundColor: "#101015",
          borderTopWidth: 0,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "interSemiBold",
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarItemStyle: {
            gap: -10,
          },
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarItemStyle: {
            gap: -10,
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarItemStyle: {
            gap: -10,
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
