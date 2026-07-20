import React from "react";
import { Alert, ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useClipboard } from "../../hooks/useClipboard";
import { useLocation } from "../../hooks/useLocation";

export default function LocationScreen() {
  const { location, isGettingLocation, locationError, fetchLocation } = useLocation();
  const { copy } = useClipboard();

  const copyCurrentLocation = async () => {
    if (!location) {
      Alert.alert("Location unavailable", "Get your current location before copying it.");
      return;
    }

    const text = `Latitude: ${location.latitude}\nLongitude: ${location.longitude}\nAccuracy: ${formatAccuracy(location.accuracy)}\nAddress: ${location.address}`;
    const copied = await copy(text, "Location copied");
    if (copied) Alert.alert("Copied", "Current location copied to clipboard.");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Current Location" }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Ionicons name="location-outline" size={54} color="#16A34A" />
          <Text style={styles.heading}>Current Location</Text>
          <Text style={styles.description}>Allow location access to see your coordinates and GPS accuracy.</Text>
        </View>

        {location ? <LocationDetails location={location} /> : <EmptyLocation />}
        {locationError ? <Text style={styles.error}>{locationError}</Text> : null}

        <TouchableOpacity style={styles.primaryButton} onPress={fetchLocation} disabled={isGettingLocation}>
          {isGettingLocation ? <ActivityIndicator color="#fff" /> : <><Ionicons name={location ? "refresh-outline" : "navigate-outline"} size={21} color="#fff" /><Text style={styles.primaryText}>{location ? "Refresh Location" : "Request Permission & Get Location"}</Text></>}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.copyButton, !location && styles.disabledButton]} onPress={copyCurrentLocation} disabled={!location || isGettingLocation}>
          <Ionicons name="copy-outline" size={21} color="#16A34A" />
          <Text style={styles.copyText}>Copy Current Location</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

function LocationDetails({ location }) {
  return (
    <View style={styles.detailsCard}>
      <Detail icon="compass-outline" label="Latitude" value={location.latitude.toFixed(6)} />
      <Detail icon="compass-outline" label="Longitude" value={location.longitude.toFixed(6)} />
      <Detail icon="locate-outline" label="Accuracy" value={formatAccuracy(location.accuracy)} />
      <Detail icon="map-outline" label="Address" value={location.address} />
    </View>
  );
}

function EmptyLocation() {
  return <View style={styles.emptyCard}><Ionicons name="location-outline" size={42} color="#9CA3AF" /><Text style={styles.emptyText}>Your coordinates will appear here.</Text></View>;
}

function Detail({ icon, label, value }) {
  return <View style={styles.detail}><Ionicons name={icon} size={20} color="#16A34A" /><View style={styles.detailText}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text></View></View>;
}

function formatAccuracy(accuracy) {
  return typeof accuracy === "number" ? `± ${Math.round(accuracy)} m` : "Unavailable";
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F5F7FA", padding: 20 }, hero: { alignItems: "center", marginTop: 12, marginBottom: 24 }, heading: { fontSize: 27, fontWeight: "bold", marginTop: 8 }, description: { color: "#6B7280", textAlign: "center", marginTop: 7, lineHeight: 21 },
  detailsCard: { backgroundColor: "#fff", borderRadius: 14, padding: 16, elevation: 2 }, detail: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" }, detailText: { flex: 1, marginLeft: 12 }, label: { color: "#6B7280", fontSize: 13, fontWeight: "600" }, value: { color: "#111827", fontSize: 16, marginTop: 3 },
  emptyCard: { backgroundColor: "#fff", borderRadius: 14, padding: 30, alignItems: "center", elevation: 2 }, emptyText: { color: "#6B7280", marginTop: 10, fontSize: 16 }, error: { color: "#B91C1C", textAlign: "center", marginTop: 14, lineHeight: 20 },
  primaryButton: { minHeight: 52, marginTop: 24, borderRadius: 10, backgroundColor: "#16A34A", alignItems: "center", justifyContent: "center", flexDirection: "row" }, primaryText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 }, copyButton: { minHeight: 52, marginTop: 12, borderRadius: 10, borderWidth: 1, borderColor: "#16A34A", alignItems: "center", justifyContent: "center", flexDirection: "row" }, copyText: { color: "#16A34A", fontSize: 16, fontWeight: "bold", marginLeft: 8 }, disabledButton: { opacity: 0.45 },
});
