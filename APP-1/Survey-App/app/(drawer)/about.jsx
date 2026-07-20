import { Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "About" }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>About This App</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Application</Text>
          <Text style={styles.text}>
            This application is built using React Native and Expo Router. It
            allows users to fill out surveys, preview responses, submit
            inspections, and view submission history.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Features</Text>
          <Text style={styles.text}>• Create and submit surveys</Text>
          <Text style={styles.text}>• Preview survey responses</Text>
          <Text style={styles.text}>• View inspection reports</Text>
          <Text style={styles.text}>• Access survey history</Text>
          <Text style={styles.text}>• Simple and user-friendly interface</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Version</Text>
          <Text style={styles.text}>Version: 1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Developer</Text>
          <Text style={styles.text}>
            Developed as a React Native Assignment using Expo Router.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});
