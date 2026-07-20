import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { Stack } from "expo-router";

import { useSurvey } from "../../hooks/useSurvey";

export default function SurveyHistory() {
  const { surveys, isLoadingSurveys } = useSurvey();

  return (
    <>
      <Stack.Screen options={{ title: "Survey History" }} />

      <View style={styles.container}>
        {isLoadingSurveys ? (
          <View style={styles.center}>
            <Text style={styles.loading}>Loading surveys...</Text>
          </View>
        ) : (
          <FlatList
            data={surveys}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.list,
              surveys.length === 0 && styles.emptyList,
            ]}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No surveys submitted yet.
              </Text>
            }
            renderItem={({ item, index }) => (
              <SurveyCard item={item} index={index} />
            )}
          />
        )}
      </View>
    </>
  );
}

function SurveyCard({ item, index }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Survey #{index + 1}</Text>
          <Text style={styles.date}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Completed</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Row label="👤 Name" value={item.name} />
      <Row label="🎂 Age" value={item.age} />
      <Row label="⚧ Gender" value={item.gender} />
      <Row label="💬 Feedback" value={item.feedback} />

      {item.photo ? (
        <View style={styles.photoContainer}>
          <Text style={styles.photoTitle}>Photo</Text>

          <Image
            source={{ uri: item.photo }}
            style={styles.photo}
            resizeMode="cover"
          />
        </View>
      ) : null}
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>
        {value ? value.toString() : "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    fontSize: 18,
    color: "#666",
  },

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  empty: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  date: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },

  badge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },

  badgeText: {
    color: "#2E7D32",
    fontSize: 12,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },

  value: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    textAlign: "right",
    lineHeight: 22,
  },

  photoContainer: {
    marginTop: 12,
  },

  photoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },

  photo: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    backgroundColor: "#EAEAEA",
  },
});