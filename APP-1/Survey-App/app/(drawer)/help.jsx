import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HelpScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Help" }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Help & Support</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>How to Use the App</Text>
          <Text style={styles.text}>
            1. Fill out the survey or inspection form.
          </Text>
          <Text style={styles.text}>
            2. Review your entries on the Preview screen.
          </Text>
          <Text style={styles.text}>
            3. Submit the form to save it.
          </Text>
          <Text style={styles.text}>
            4. View previous submissions in the History section.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Frequently Asked Questions</Text>

          <Text style={styles.question}>
            How do I save a survey?
          </Text>
          <Text style={styles.answer}>
            Complete the form and tap the Submit button.
          </Text>

          <Text style={styles.question}>
            Where can I see previous submissions?
          </Text>
          <Text style={styles.answer}>
            Open the Survey History screen from the main menu.
          </Text>

          <Text style={styles.question}>
            Can I edit a submitted survey?
          </Text>
          <Text style={styles.answer}>
            This demo version only allows viewing previously submitted surveys.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Support</Text>
          <Text style={styles.text}>
            If you encounter any issues, contact your administrator or instructor.
          </Text>
          <Text style={styles.text}>
            Email: support@example.com
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  answer: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
  text: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
    lineHeight: 22,
  },
});
