import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RootLayout() {
  const router = useRouter();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const restore = async () => {
      await checkAuth();
      setChecking(false);
    };
    restore();
  }, []);

  useEffect(() => {
    if (!checking && token && user?.role) {
      switch (user.role) {
        case "admin":
          router.replace("/(admin)/dashboard");
          break;
        case "bhw":
          router.replace("/(bhw)/dashboard");
          break;
        default:
          console.warn("No matching role found:", user.role);
          break;
      }
    }
  }, [checking, token, user]);

  if (checking) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
}
