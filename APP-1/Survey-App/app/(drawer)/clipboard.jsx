import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ClipboardDrawer() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const handleCopy = async () => {
    if (!text.trim()) {
      Alert.alert("Empty", "Enter some text first.");
      return;
    }

    await Clipboard.setStringAsync(text);

    setHistory((prev) => {
      if (prev.includes(text)) return prev;
      return [text, ...prev];
    });

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlePaste = async () => {
    const value = await Clipboard.getStringAsync();
    setText(value);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteItem = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  const copyHistoryItem = async (item) => {
    await Clipboard.setStringAsync(item);
    Alert.alert("Copied", "Copied to clipboard");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Clipboard" }} />
      <View style={styles.container}>
        <View style={styles.hero}>
          <Ionicons name="clipboard-outline" size={54} color="#16A34A" />
          <Text style={styles.heading}>Clipboard Manager</Text>
          <Text style={styles.description}>Manage copied texts and quick pastes for your surveys.</Text>
        </View>

        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            multiline
            placeholder="Type or paste something..."
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.count}>
            Characters: {text.length}
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.pasteButton]}
              onPress={handlePaste}
            >
              <Ionicons name="download-outline" size={18} color="#16A34A" />
              <Text style={styles.pasteButtonText}>Paste</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.copyButton]}
              onPress={handleCopy}
            >
              <Ionicons name={copied ? "checkmark-outline" : "copy-outline"} size={18} color="#fff" />
              <Text style={styles.copyButtonText}>
                {copied ? "Copied" : "Copy text"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Clipboard History</Text>
          {history.length > 0 && (
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={history.length === 0 && styles.emptyContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Ionicons name="document-text-outline" size={42} color="#9CA3AF" />
              <Text style={styles.emptyText}>No history available</Text>
              <Text style={styles.emptySubtext}>Copied items will appear here.</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <View style={styles.historyItem}>
              <TouchableOpacity
                style={styles.historyContent}
                onPress={() => copyHistoryItem(item)}
              >
                <Ionicons name="copy-outline" size={16} color="#6B7280" style={{ marginRight: 10, marginTop: 2 }} />
                <Text style={styles.historyText} numberOfLines={2}>{item}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(index)}>
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },
  hero: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#111827",
  },
  description: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: "top",
    color: "#111827",
  },
  count: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 16,
    textAlign: "right",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  pasteButton: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#16A34A",
  },
  pasteButtonText: {
    color: "#16A34A",
    fontWeight: "bold",
    fontSize: 15,
  },
  copyButton: {
    backgroundColor: "#16A34A",
  },
  copyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  historyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flexGrow: 1,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 30,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginTop: 10,
  },
  emptyText: {
    color: "#4B5563",
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  emptySubtext: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  historyContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  historyText: {
    flex: 1,
    color: "#374151",
    fontSize: 15,
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
  },
});