import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useResidentStore } from "@/stores/useResidentStore";
import { calculateAge } from "@/helpers/functions";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import EditResidentForm from "@/components/bhw/forms/EditResidentForm";
import { Resident } from "@/types/residentType";
import Toast from "react-native-toast-message";

export default function ResidentDetailScreen() {
  const [showEditModal, setShowEditModal] = useState(false);

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { residents, removeResident, updateResident } = useResidentStore();

  const resident = residents.find((r) => r._id === id);

  if (!resident) {
    return router.replace("/(bhw)/residents");
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Resident",
      `Are you sure you want to delete ${resident.firstName} ${resident.lastName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeResident(resident._id);
            Toast.show({
              type: "success",
              text1: "Resident deleted successully",
              position: "bottom",
            });
          },
        },
      ]
    );
  };

  const handleEditResident = (data: Resident) => {
    updateResident(data);

    Toast.show({
      type: "success",
      text1: "Resident saved successfully!",
      position: "bottom",
    });

    router.replace(`/(bhw)/residents/${data._id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {resident.firstName} {resident.lastName}
          {resident.suffix ? `, ${resident.suffix}` : ""}
        </Text>
        <Text style={styles.subtitle}>Resident Details</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
          >
            <Ionicons name="create-outline" size={18} color="#4f46e5" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailValue}>{resident.gender}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Birthdate:</Text>
          <Text style={styles.detailValue}>
            {new Date(resident.birthdate).toLocaleDateString("en", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Age:</Text>
          <Text style={styles.detailValue}>
            {calculateAge(resident.birthdate)} years
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Area ID:</Text>
          <Text style={styles.detailValue}>{resident.areaId}</Text>
        </View>

        {resident.householdId && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Household ID:</Text>
            <Text style={styles.detailValue}>{resident.householdId}</Text>
          </View>
        )}
      </View>

      <EditResidentForm
        visible={showEditModal}
        resident={resident}
        onClose={() => setShowEditModal(false)}
        onSubmit={(updatedData) => handleEditResident(updatedData)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginTop: 23,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#e0e7ff",
  },
  editText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#4f46e5",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#fee2e2",
  },
  deleteText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#dc2626",
  },
  detailsSection: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "600",
  },
});
