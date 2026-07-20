import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

import AppImage from "../../../components/AppImage";

import { useSurvey } from "../../../hooks/useSurvey";
import { persistImageUri } from "../../../services/imageService";

export default function SurveyScreen() {
  const { addSurvey } = useSurvey();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [feedback, setFeedback] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      const savedUri = await persistImageUri(result.assets[0].uri);
      setPhoto(savedUri);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !age.trim() || !gender || !feedback.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await addSurvey({ name: name.trim(), age: age.trim(), gender, feedback: feedback.trim(), photo });
      setName("");
      setAge("");
      setGender("");
      setFeedback("");
      setPhoto(null);
      Alert.alert("Survey Submitted", "Your response was saved to Survey History.");
    } catch {
      Alert.alert("Could not save", "Please try submitting the survey again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Survey Form" }} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Customer Survey</Text>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} placeholder="Enter your age" keyboardType="numeric" value={age} onChangeText={setAge} />
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          {["Male", "Female", "Other"].map((item) => (
            <TouchableOpacity key={item} style={[styles.genderButton, gender === item && styles.selectedButton]} onPress={() => setGender(item)}>
              <Text style={[styles.genderText, gender === item && styles.selectedText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Feedback</Text>
        <TextInput style={[styles.input, styles.feedback]} placeholder="Write your feedback..." multiline numberOfLines={5} value={feedback} onChangeText={setFeedback} />

        <Text style={styles.label}>Photo (Optional)</Text>
        <View style={styles.photoContainer}>
          {photo ? (
            <View style={styles.photoPreviewContainer}>
              <AppImage uri={photo} style={styles.photoPreview} placeholderIcon="camera" />
              <TouchableOpacity style={styles.retakeButton} onPress={handleTakePhoto}>
                <Text style={styles.retakeText}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
              <Text style={styles.photoButtonText}>Click Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={[styles.submitButton, isSubmitting && styles.disabledButton]} disabled={isSubmitting} onPress={handleSubmit}>
          <Text style={styles.submitText}>{isSubmitting ? "Saving..." : "Submit Survey"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F7FA", flexGrow: 1 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 25 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16 },
  feedback: { height: 120, textAlignVertical: "top" },
  genderContainer: { flexDirection: "row", justifyContent: "space-between" },
  genderButton: { flex: 1, padding: 12, marginHorizontal: 5, borderWidth: 1, borderColor: "#16A34A", borderRadius: 8, alignItems: "center" },
  selectedButton: { backgroundColor: "#16A34A" },
  genderText: { color: "#16A34A", fontWeight: "600" },
  selectedText: { color: "#fff" },
  submitButton: { marginTop: 30, backgroundColor: "#16A34A", padding: 15, borderRadius: 10, alignItems: "center" },
  disabledButton: { opacity: 0.65 },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  photoContainer: { marginTop: 10, alignItems: "center", width: "100%" },
  photoButton: { backgroundColor: "#3B82F6", padding: 12, borderRadius: 8, alignItems: "center", width: "100%" },
  photoButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  photoPreviewContainer: { alignItems: "center", width: "100%" },
  photoPreview: { width: "100%", height: 200, borderRadius: 8, marginBottom: 10, backgroundColor: "#ccc" },
  retakeButton: { backgroundColor: "#EF4444", padding: 10, borderRadius: 8, alignItems: "center", width: "100%" },
  retakeText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
