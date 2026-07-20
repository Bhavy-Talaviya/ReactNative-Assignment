import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useSurvey } from "../../../hooks/useSurvey";
import { useProfile } from "../../../hooks/useProfile";
import { formatDate, formatTime } from "../../../utils/formatDate";

export default function DashboardScreen() {
  const { surveys } = useSurvey() as { surveys: any[] };
  const { profile } = useProfile() as { profile: any };

  const todayStr = new Date().toDateString();
  const todaySurveys = surveys.filter(
    (s: any) => new Date(s.createdAt).toDateString() === todayStr
  );
  const completedToday = todaySurveys.filter(
    (s: any) => s.status === "Completed" || s.status === "Submitted"
  ).length;
  const totalToday = Math.max(todaySurveys.length, 12);
  const completionPercent =
    totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const recentSurveys = surveys.slice(0, 3);

  const quickActions = [
    {
      title: "New Survey",
      subtitle: "Start a new field survey",
      icon: "camera-outline",
      color: "#16A34A",
      bgColor: "#F0FDF4",
      onPress: () => router.push("/(drawer)/(tabs)/survey" as any),
    },
    {
      title: "Location",
      subtitle: "Capture current location",
      icon: "location-outline",
      color: "#2563EB",
      bgColor: "#EFF6FF",
      onPress: () => router.push("/location" as any),
    },
    {
      title: "Contacts",
      subtitle: "Select from contacts",
      icon: "people-outline",
      color: "#7C3AED",
      bgColor: "#F5F3FF",
      onPress: () => router.push("/contacts" as any),
    },
    {
      title: "Clipboard",
      subtitle: "Manage copied text",
      icon: "clipboard-outline",
      color: "#DC2626",
      bgColor: "#FEF2F2",
      onPress: () => router.push("/clipboard" as any),
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
      case "Submitted":
        return { color: "#166534", bg: "#DCFCE7" };
      case "In Progress":
        return { color: "#1E40AF", bg: "#DBEAFE" };
      case "Pending":
      case "Draft":
        return { color: "#9A3412", bg: "#FEF3C7" };
      default:
        return { color: "#374151", bg: "#F3F4F6" };
    }
  };

  const getSurveyIcon = (index: number) => {
    const icons = [
      { name: "water-outline", color: "#16A34A", bg: "#F0FDF4" },
      { name: "car-outline", color: "#2563EB", bg: "#EFF6FF" },
      { name: "business-outline", color: "#7C3AED", bg: "#F5F3FF" },
    ];
    return icons[index % icons.length];
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeRow}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeLabel}>Welcome back,</Text>
            <Text style={styles.welcomeName}>{profile?.name || "Student"} 👋</Text>
          </View>
          <Image
            source={{ uri: profile?.avatar }}
            style={styles.welcomeAvatar}
          />
        </View>

        {/* Student Info Card */}
        <View style={styles.studentCard}>
          <Image
            source={{ uri: profile?.avatar }}
            style={styles.studentAvatar}
          />
          <View style={styles.studentInfo}>
            <InfoRow
              icon="school-outline"
              label="Student ID"
              value={profile?.id}
            />
            <InfoRow
              icon="book-outline"
              label="Course"
              value={profile?.course}
            />
            <InfoRow
              icon="desktop-outline"
              label="Department"
              value={profile?.department}
            />
            <InfoRow
              icon="calendar-outline"
              label="Year"
              value={profile?.year}
            />
          </View>
        </View>

        {/* Today's Survey Count */}
        <View style={styles.surveyCountCard}>
          <View style={styles.surveyCountLeft}>
            <View style={styles.surveyCountIconRow}>
              <View style={styles.surveyCountIconBg}>
                <Ionicons name="bar-chart-outline" size={20} color="#2563EB" />
              </View>
              <Text style={styles.surveyCountTitle}>Today's Survey Count</Text>
            </View>
            <View style={styles.surveyCountNumbers}>
              <Text style={styles.surveyCountBig}>
                {String(completedToday).padStart(2, "0")}
              </Text>
              <Text style={styles.surveyCountTotal}>
                / {totalToday} Surveys
              </Text>
            </View>
          </View>
          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>{completionPercent}%</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.title}
              style={[
                styles.quickActionCard,
                { borderColor: action.bgColor },
              ]}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.quickActionIconBg,
                  { backgroundColor: action.color },
                ]}
              >
                <Ionicons name={action.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
              <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Survey Summary */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Survey Summary</Text>
          <TouchableOpacity
            onPress={() => router.push("/survey-history" as any)}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {recentSurveys.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="document-text-outline" size={40} color="#9CA3AF" />
            <Text style={styles.emptyText}>No surveys yet</Text>
            <Text style={styles.emptySubtext}>
              Start a new survey to see it here
            </Text>
          </View>
        ) : (
          recentSurveys.map((survey: any, index: number) => {
            const statusStyle = getStatusStyle(survey.status);
            const iconInfo = getSurveyIcon(index);
            return (
              <TouchableOpacity
                key={survey.id}
                style={styles.surveyItem}
                onPress={() => router.push("/survey-history" as any)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.surveyItemIcon,
                    { backgroundColor: iconInfo.bg },
                  ]}
                >
                  <Ionicons
                    name={iconInfo.name as any}
                    size={22}
                    color={iconInfo.color}
                  />
                </View>
                <View style={styles.surveyItemContent}>
                  <Text style={styles.surveyItemTitle} numberOfLines={1}>
                    {survey.name || `Survey #${index + 1}`}
                  </Text>
                  <View style={styles.surveyItemMeta}>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#6B7280"
                    />
                    <Text style={styles.surveyItemMetaText}>
                      {survey.location || "Gujarat"}
                    </Text>
                  </View>
                  <View style={styles.surveyItemMeta}>
                    <Ionicons
                      name="calendar-outline"
                      size={12}
                      color="#6B7280"
                    />
                    <Text style={styles.surveyItemMetaText}>
                      {formatDate(survey.createdAt)} •{" "}
                      {formatTime(survey.createdAt)}
                    </Text>
                  </View>
                </View>
                <View style={styles.surveyItemRight}>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusStyle.bg },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: statusStyle.color }]}
                    >
                      {survey.status}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={16} color="#16A34A" />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F0",
  },
  welcomeSection: {
    backgroundColor: "#F0FDF4",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: 16,
    color: "#374151",
  },
  welcomeName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#166534",
    marginTop: 2,
  },
  welcomeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#16A34A",
  },
  studentCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    marginBottom: 12,
  },
  studentAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 14,
  },
  studentInfo: {
    flex: 1,
    justifyContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 8,
    width: 85,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  surveyCountCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    alignItems: "center",
  },
  surveyCountLeft: {
    flex: 1,
  },
  surveyCountIconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  surveyCountIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  surveyCountTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  surveyCountNumbers: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  surveyCountBig: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#16A34A",
  },
  surveyCountTotal: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  progressCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 5,
    borderColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16A34A",
  },
  progressLabel: {
    fontSize: 10,
    color: "#6B7280",
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 14,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  viewAllText: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
    marginRight: 2,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    alignItems: "center",
    elevation: 1,
  },
  quickActionIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  quickActionSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 3,
  },
  surveyItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    alignItems: "center",
    elevation: 1,
  },
  surveyItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  surveyItemContent: {
    flex: 1,
  },
  surveyItemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },
  surveyItemMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  surveyItemMetaText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  surveyItemRight: {
    alignItems: "flex-end",
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 30,
    alignItems: "center",
    elevation: 1,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
  },
});