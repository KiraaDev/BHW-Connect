import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Resident } from "@/types/residentType";
import { useAreaStore } from "@/stores/useAreaStore";
import { useAuthStore } from "@/stores/useAuthStore";

type AddResidentFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Resident) => void;
};

export default function AddResidentForm({
  visible,
  onClose,
  onSubmit,
}: AddResidentFormProps) {
  const [formData, setFormData] = useState<Resident>({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    gender: "Male",
    birthdate: new Date().toISOString(),
    familyPosition: 1,
    occupation: "",
    civilStatus: "Single",
    student: undefined,
    garbageDisposal: "segregated",
    waterSource: "LCWD",
    typeOfToilet: "sanitary",
    areaId: "",
    LMP: null,
    EDC: false,
    GP: false,
    TB: false,
    HPN: false,
    DM: false,
    heartDisease: false,
    disability: false,
  });

  const { user } = useAuthStore();
  const { areas, fetchAreas } = useAreaStore();

  useEffect(() => {
    fetchAreas(user._id);
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      gender: "Male",
      birthdate: new Date().toISOString().split("T")[0],
      familyPosition: 1,
      occupation: "",
      civilStatus: "Single",
      student: undefined,
      garbageDisposal: "segregated",
      waterSource: "LCWD",
      typeOfToilet: "sanitary",
      areaId: "",
      LMP: null,
      EDC: false,
      GP: false,
      TB: false,
      HPN: false,
      DM: false,
      heartDisease: false,
      disability: false,
    });
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, birthdate: selectedDate.toISOString() });
    }
  };

  const isFormValid = () =>
    !!formData.firstName &&
    !!formData.lastName &&
    !!formData.gender &&
    !!formData.birthdate &&
    !!formData.areaId &&
    !!formData.occupation &&
    !!formData.familyPosition &&
    !!formData.civilStatus &&
    !!formData.garbageDisposal &&
    !!formData.waterSource &&
    !!formData.typeOfToilet;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Resident</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 8 }}>Select Area</Text>
              <Picker
                selectedValue={formData.areaId}
                onValueChange={(value) =>
                  setFormData({ ...formData, areaId: value })
                }
                style={{ height: 50, borderWidth: 1, borderColor: "#ccc" }}
              >
                <Picker.Item label="Select Area" value="" enabled={false} />
                {areas.map((area) => (
                  <Picker.Item
                    key={area._id}
                    label={area.name}
                    value={area._id}
                  />
                ))}
              </Picker>
            </View>

            {[
              { label: "First Name", key: "firstName" },
              { label: "Middle Name", key: "middleName" },
              { label: "Last Name", key: "lastName" },
              { label: "Suffix", key: "suffix" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }) => (
              <View key={key} style={styles.inputGroup}>
                <Text style={styles.label}>{label} *</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={formData[key as keyof Resident]?.toString() || ""}
                  onChangeText={(text) =>
                    setFormData({ ...formData, [key]: text })
                  }
                />
              </View>
            ))}

            {/* Civil Status */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Civil Status *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.civilStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, civilStatus: value })
                  }
                >
                  <Picker.Item label="Single" value="Single" />
                  <Picker.Item label="Married" value="Married" />
                  <Picker.Item label="Widowed" value="Widowed" />
                  <Picker.Item label="Separated" value="Separated" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(itemValue) =>
                    setFormData({ ...formData, gender: itemValue })
                  }
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Birthdate *</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {new Date(formData.birthdate).toLocaleDateString()}
                </Text>
                <Ionicons
                  name="calendar"
                  size={20}
                  color="#64748b"
                  style={styles.dateIcon}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(formData.birthdate)}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={styles.label}>Health Conditions</Text>
              {[
                { key: "LMP", label: "LMP (Last Menstrual Period)" },
                { key: "EDC", label: "EDC" },
                { key: "GP", label: "GP" },
                { key: "TB", label: "Tuberculosis (TB)" },
                { key: "HPN", label: "Hypertension (HPN)" },
                { key: "DM", label: "Diabetes Mellitus (DM)" },
                { key: "heartDisease", label: "Heart Disease" },
                { key: "disability", label: "Disability" },
              ].map(({ key, label }) => (
                <TouchableOpacity
                  key={key}
                  style={styles.checkboxRow}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      [key]: !formData[key as keyof Resident],
                    })
                  }
                >
                  <Ionicons
                    name={
                      formData[key as keyof Resident]
                        ? "checkbox-outline"
                        : "square-outline"
                    }
                    size={20}
                    color="#4b5563"
                  />
                  <Text style={styles.optionText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Garbage Disposal */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Garbage Disposal *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.garbageDisposal}
                  onValueChange={(value) =>
                    setFormData({ ...formData, garbageDisposal: value })
                  }
                >
                  <Picker.Item label="Segregated" value="segregated" />
                  <Picker.Item label="Not Segregated" value="not segregated" />
                </Picker>
              </View>
            </View>

            {/* Water Source */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Water Source *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.waterSource}
                  onValueChange={(value) =>
                    setFormData({ ...formData, waterSource: value })
                  }
                >
                  <Picker.Item label="Deep Well" value="deep well" />
                  <Picker.Item label="LCWD" value="LCWD" />
                </Picker>
              </View>
            </View>

            {/* Type of Toilet */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type of Toilet *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.typeOfToilet}
                  onValueChange={(value) =>
                    setFormData({ ...formData, typeOfToilet: value })
                  }
                >
                  <Picker.Item label="Faucet" value="faucet" />
                  <Picker.Item label="Sanitary" value="sanitary" />
                  <Picker.Item label="Unsanitary" value="unsanitary" />
                </Picker>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              disabled={!isFormValid()}
              style={[
                styles.submitButton,
                !isFormValid() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Save Resident</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    maxHeight: "80%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#1e293b",
  },
  dateIcon: {
    marginLeft: 8,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    backgroundColor: "#fff",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  optionText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 12,
  },
  submitButton: {
    backgroundColor: "#4f46e5",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#c7d2fe",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
