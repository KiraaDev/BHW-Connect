import { View, ScrollView, StyleSheet } from "react-native";
import DashboardCard from "../../../components/bhw/DashboardCard";
import QuickActionButton from "../../../components/bhw/QuickActionButton";
import { router } from "expo-router";
import BhwHeaderCard from "@/components/bhw/BhwHeaderCard";
import { useResidentStore } from "@/stores/useResidentStore";



export default function DashboardScreen() {

  const { residents } = useResidentStore()

  const stats = [
    {
      title: "Total Residents",
      count: residents.length,
      icon: "people-outline",
      iconColor: "#4f46e5",
    }
  ];
  return (
    <ScrollView style={styles.container}>
      <BhwHeaderCard
        title="BHW Dashboard"
        subtitle="Welcome, Gomer"
        avatarUrl="https://i.pravatar.cc/100"
      />

      {/* Stats */}
      {stats.map((stat, index) => (
        <DashboardCard
          key={index}
          title={stat.title}
          count={stat.count}
          icon={stat.icon as any}
          iconColor={stat.iconColor}
        />
      ))}

      {/* Quick Actions */}
      <View style={styles.actionsWrapper}>
        <QuickActionButton
          label="Add Resident"
          icon="person-add-outline"
          onPress={() => router.push("/(bhw)/residents")} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  actionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 8,
  },
});
