import { Tabs, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable, ViewStyle } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { router } from "expo-router";

export default function BHWLayout() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!user || !token || user.role !== "bhw") {
      router.replace("/login");
    }
  }, [user, token]);

  if (!user || !token || user.role !== "bhw") return null;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        animationEnabled: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: Platform.OS === "ios" ? 88 : 70,
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

          if (route.name === "residents") {
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
      <Tabs.Screen name="dashboard/index" options={{ headerShown: false }} />
      <Tabs.Screen name="residents" options={{ headerShown: false }} />
      <Tabs.Screen name="settings/index" options={{ headerShown: false }} />
    </Tabs>
  );
}
