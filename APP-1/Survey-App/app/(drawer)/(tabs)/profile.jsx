import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import AppImage from "../../../components/AppImage";
import { useProfile } from "../../../hooks/useProfile";
import { persistImageUri } from "../../../services/imageService";

export default function ProfileScreen() {
  const { profile, updateProfile, isLoadingProfile } = useProfile();
  const [draft, setDraft] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraft(profile);
    }
  }, [profile, isEditing]);

  const handleEditPress = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const updateDraft = (key, value) => setDraft((current) => ({ ...current, [key]: value }));

  const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow photo library access to choose a profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const savedUri = await persistImageUri(result.assets[0].uri);
      updateDraft("avatar", savedUri);
    }
  };

  const saveProfile = async () => {
    if (!draft.name.trim() || !draft.email.trim()) {
      Alert.alert("Missing details", "Name and email are required.");
      return;
    }

    try {
      const nextProfile = {
        ...draft,
        name: draft.name.trim(),
        email: draft.email.trim(),
        phone: draft.phone.trim(),
        location: draft.location.trim(),
      };
      const savedProfile = await updateProfile(nextProfile);
      setDraft(savedProfile);
      setIsEditing(false);
      Alert.alert("Profile updated", "Your changes have been saved.");
    } catch {
      Alert.alert("Could not save", "Please try again.");
    }
  };

  const cancelEdit = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  if (isLoadingProfile) {
    return <View style={styles.container}><Text>Loading profile...</Text></View>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AppImage uri={isEditing ? draft.avatar : profile.avatar} style={styles.avatar} />

        {isEditing ? (
          <View style={styles.form}>
            <Text style={styles.formTitle}>Edit Profile</Text>
            <TouchableOpacity style={styles.photoButton} onPress={pickProfileImage}>
              <Ionicons name="image-outline" size={20} color="#16A34A" />
              <Text style={styles.photoButtonText}>Change Profile Photo</Text>
            </TouchableOpacity>
            <Field label="Full Name" value={draft.name} onChangeText={(value) => updateDraft("name", value)} />
            <Field label="Email" value={draft.email} keyboardType="email-address" autoCapitalize="none" onChangeText={(value) => updateDraft("email", value)} />
            <Field label="Phone" value={draft.phone} keyboardType="phone-pad" onChangeText={(value) => updateDraft("phone", value)} />
            <Field label="Location" value={draft.location} onChangeText={(value) => updateDraft("location", value)} />

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveProfile}><Text style={styles.saveText}>Save Changes</Text></TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
            <View style={styles.infoCard}>
              <InfoRow icon="person-outline" label="Full Name" value={profile.name} />
              <InfoRow icon="mail-outline" label="Email" value={profile.email} />
              <InfoRow icon="call-outline" label="Phone" value={profile.phone} />
              <InfoRow icon="location-outline" label="Location" value={profile.location} />
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}><Text style={styles.editText}>Edit Profile</Text></TouchableOpacity>
          </>
        )}
      </ScrollView>
    </>
  );
}

function InfoRow({ icon, label, value }) {
  return <View style={styles.row}><Ionicons name={icon} size={22} color="#16A34A" /><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value || "Not set"}</Text></View>;
}

function Field({ label, ...props }) {
  return <View style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput style={styles.input} {...props} /></View>;
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F4F6F8", alignItems: "center", padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginTop: 12, marginBottom: 15 },
  name: { fontSize: 26, fontWeight: "bold" },
  email: { fontSize: 16, color: "#666", marginBottom: 25 },
  infoCard: { width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 15, elevation: 3 },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  label: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: "600" },
  value: { color: "#555", maxWidth: "48%", textAlign: "right" },
  editButton: { marginTop: 30, backgroundColor: "#16A34A", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
  editText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  form: { width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 18, elevation: 3 },
  formTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  photoButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#16A34A", borderRadius: 8, padding: 11, marginTop: 8 },
  photoButtonText: { color: "#16A34A", fontWeight: "600", marginLeft: 8 },
  field: { marginTop: 14 },
  fieldLabel: { fontSize: 15, fontWeight: "600", marginBottom: 6, color: "#374151" },
  input: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 8, padding: 12, fontSize: 16 },
  actionRow: { flexDirection: "row", marginTop: 24, gap: 12 },
  cancelButton: { flex: 1, alignItems: "center", borderWidth: 1, borderColor: "#16A34A", borderRadius: 8, padding: 13 },
  saveButton: { flex: 1, alignItems: "center", backgroundColor: "#16A34A", borderRadius: 8, padding: 13 },
  cancelText: { color: "#16A34A", fontWeight: "bold" },
  saveText: { color: "#fff", fontWeight: "bold" },
});