import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function QuickActionButton({ label, icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name={icon} size={24} color="#4f46e5" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    margin: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginTop: 8,
    textAlign: "center",
  },
});
