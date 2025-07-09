import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Pressable, ViewStyle } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        animationEnabled: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: Platform.OS === "ios" ? 88 : 90,
          borderTopWidth: 0,
          elevation: 5,
        },
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
          color: "#111827",
        },
        tabBarButton: (props: BottomTabBarButtonProps) => (
          <Pressable onPress={props.onPress} style={props.style as ViewStyle}>
            {props.children}
          </Pressable>
        ),
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "dashboard/index") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "residents/index") {
            return (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "settings/index") {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            );
          }

          return null;
        },
      })}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="residents/index"
        options={{
          headerShown: false,
        }}
      />

      {/* Hidden screens - these won't appear in tabs */}
      <Tabs.Screen
        name="residents/[id]/index"
        options={{
          href: null, // This hides from tab bar
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="settings/index"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
