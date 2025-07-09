import { View, Text, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle } from "react-native";

interface HeaderCardProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  containerStyle?: ViewStyle;
  textAlign?: "left" | "center";
}

export default function BhwHeaderCard({
  title,
  subtitle,
  avatarUrl,
  containerStyle,
  textAlign = "left",
}: HeaderCardProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { textAlign }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { textAlign }]}>{subtitle}</Text> : null}
      </View>

      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#e5e7eb",
  },
});
