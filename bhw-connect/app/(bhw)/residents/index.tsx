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
import { useEffect, useState } from "react";
import { Resident } from "@/types/residentType";
import AddResidentForm from "@/components/bhw/forms/AddResidentForm";
import { calculateAge } from "@/helpers/functions";
import Toast from "react-native-toast-message";
import axiosInstance from "@/services/axiosInstance";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAreaStore } from "@/stores/useAreaStore";
import { Picker } from "@react-native-picker/picker";

export default function ResidentsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");

  const { user } = useAuthStore();
  const { residents, addResident, fetchResidents } = useResidentStore();
  const { areas, fetchAreas } = useAreaStore();

  useEffect(() => {
    if (user?._id) {
      fetchAreas(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (areas.length > 0) {
      setSelectedArea(areas[0]._id);
    }
  }, [areas]);

  useEffect(() => {
    if (selectedArea) {
      fetchResidents(selectedArea);
    }
  }, [selectedArea]);

  const handleRefresh = () => {
    setRefreshing(true);
    if (selectedArea) {
      fetchResidents(selectedArea).finally(() => {
        setRefreshing(false);
      });
    } else {
      setRefreshing(false);
    }
  };

  const handleAddResident = async (data: Resident) => {
    try {
      const response = await axiosInstance.post("/residents/", data);
      const newResident = response.data;
      addResident(newResident);

      Toast.show({
        type: "success",
        text1: "Resident added!",
        position: "top",
      });
    } catch (error) {
      console.error("Add Resident Error:", error);
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

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Area</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedArea}
            onValueChange={(value) => setSelectedArea(value)}
          >
            {areas.map((area) => (
              <Picker.Item key={area._id} label={area.name} value={area._id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#64748b" />
        <Text style={styles.searchPlaceholder}>Search residents...</Text>
      </View>

      <FlatList
        data={
          Array.isArray(residents)
            ? [...residents].sort(
                (a, b) =>
                  new Date(b.createdAt ?? 0).getTime() -
                  new Date(a.createdAt ?? 0).getTime()
              )
            : []
        }
        keyExtractor={(item) => item._id ?? String(item._id)}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => {
          const area = areas.find((a) => a._id === item.areaId);

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.navigate(`/(bhw)/residents/${item._id}`)}
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
                  <Text style={styles.detail}>
                    {area?.name ?? "Unknown Area"}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          );
        }}
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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      <AddResidentForm
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddResident}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
    color: "#475569",
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
