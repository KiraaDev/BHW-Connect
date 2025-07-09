import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  count: number;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  backgroundColor?: string;
};

export default function DashboardStatCard({
  title,
  count,
  icon = "stats-chart-outline",
  iconColor = "#4f46e5",
  backgroundColor = "#ffffff",
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
  },
  iconWrapper: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  count: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
});
