import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BhwHeaderCard from "@/components/bhw/BhwHeaderCard";
import { useResidentStore } from "@/stores/useResidentStore";
import { useState } from "react";
import { NewResidentInput, Resident } from "@/types/residentType";
import AddResidentForm from "@/components/bhw/forms/AddResidentForm";
import { calculateAge } from "@/helpers/functions";
import Toast from "react-native-toast-message";

export default function ResidentsScreen() {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const { residents, addResident } = useResidentStore();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAddResident = async (data: NewResidentInput) => {
    try {
      const sampleNewResident: Resident = {
        ...data,
        _id: Math.random().toString(36).substring(2, 10),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        areaId: "cope1",
      };

      addResident(sampleNewResident);

      Toast.show({
        type: 'success',
        text1: 'Resident added!',
        position: "bottom"
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: "Please try again.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BhwHeaderCard
        title="Residents"
        subtitle="Manage all community residents"
        avatarUrl="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff"
      />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#64748b" />
        <Text style={styles.searchPlaceholder}>Search residents...</Text>
      </View>

      <FlatList
        data={residents}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(bhw)/residents/${item._id}`)}
          >
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor:
                    item.gender === "Male" ? "#EFF6FF" : "#FDF2F8",
                },
              ]}
            >
              <Ionicons
                name={item.gender === "Male" ? "male" : "female"}
                size={20}
                color={item.gender === "Male" ? "#3B82F6" : "#EC4899"}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName} {item?.suffix}
              </Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detail}>{item.gender}</Text>
                <Text style={styles.detail}>•</Text>
                <Text style={styles.detail}>
                  {calculateAge(item.birthdate)} years
                </Text>
                <Text style={styles.detail}>•</Text>
                <Text style={styles.detail}>{item.areaId}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>No residents found</Text>
            <Text style={styles.emptySubtext}>
              Add your first resident to get started
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
      <AddResidentForm
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data: NewResidentInput) => {
          handleAddResident(data);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  searchPlaceholder: {
    color: "#64748b",
    fontSize: 14,
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detail: {
    fontSize: 13,
    color: "#64748b",
    marginRight: 6,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
