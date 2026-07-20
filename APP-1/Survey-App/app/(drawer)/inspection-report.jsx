import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useSurvey } from "../../hooks/useSurvey";

export default function InspectionReport() {
  const { surveys, isLoadingSurveys } = useSurvey();
  const latestSurvey = surveys[0];

  return (
    <>
      <Stack.Screen options={{ title: "Inspection Report" }} />
      <View style={styles.container}>
        {isLoadingSurveys ? (
          <Text style={styles.empty}>Loading report...</Text>
        ) : surveys.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="clipboard-outline" size={72} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No report data yet</Text>
            <Text style={styles.empty}>Submit a survey to generate an inspection report.</Text>
          </View>
        ) : (
          <FlatList
            data={surveys}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<ReportSummary count={surveys.length} latestSurvey={latestSurvey} />}
            renderItem={({ item, index }) => <ReportCard survey={item} index={index} />}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </>
  );
}

function ReportSummary({ count, latestSurvey }) {
  return (
    <View style={styles.summary}>
      <Text style={styles.heading}>Inspection Report</Text>
      <Text style={styles.summaryText}>{count} completed {count === 1 ? "inspection" : "inspections"}</Text>
      <Text style={styles.summaryText}>Latest: {latestSurvey.name}   {new Date(latestSurvey.createdAt).toLocaleDateString()}</Text>
    </View>
  );
}

function ReportCard({ survey, index }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Inspection #{index + 1}</Text>
        <Text style={styles.status}>{survey.status}</Text>
      </View>
      <Text style={styles.date}>{new Date(survey.createdAt).toLocaleString()}</Text>
      <Detail icon="person-outline" label="Inspector" value={survey.name} />
      <Detail icon="calendar-outline" label="Age" value={survey.age} />
      <Detail icon="people-outline" label="Gender" value={survey.gender} />
      <Detail icon="chatbubble-outline" label="Notes" value={survey.feedback} />
    </View>
  );
}

function Detail({ icon, label, value }) {
  return <View style={styles.detail}><Ionicons name={icon} size={19} color="#16A34A" /><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" }, list: { padding: 16, paddingBottom: 28 },
  summary: { backgroundColor: "#16A34A", borderRadius: 14, padding: 18, marginBottom: 16 }, heading: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 8 }, summaryText: { color: "#DBEAFE", fontSize: 15, marginTop: 3 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 }, cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, cardTitle: { fontSize: 18, fontWeight: "bold" }, status: { color: "#166534", backgroundColor: "#DCFCE7", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, fontSize: 12, fontWeight: "600" }, date: { color: "#6B7280", fontSize: 13, marginTop: 4, marginBottom: 10 },
  detail: { flexDirection: "row", alignItems: "flex-start", marginTop: 9 }, detailLabel: { width: 78, color: "#4B5563", fontWeight: "600", marginLeft: 8 }, detailValue: { flex: 1, color: "#111827" },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30 }, emptyTitle: { fontSize: 22, fontWeight: "bold", marginTop: 16, marginBottom: 8 }, empty: { textAlign: "center", fontSize: 16, color: "#6B7280" },
});
