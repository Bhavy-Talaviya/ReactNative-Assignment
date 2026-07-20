import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [photo, setPhoto] = useState(null);

  if (!permission) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera permission is required
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const picture = await cameraRef.current.takePictureAsync({
        quality: 1,
      });

      setPhoto(picture.uri);
    } catch (error) {
      console.log(error);
    }
  };

  if (photo) {
    return (
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: photo }}
          style={styles.previewImage}
        />

        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => setPhoto(null)}
        >
          <Text style={styles.buttonText}>Retake Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
      >
        {/* Top Controls */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              setFlash((prev) =>
                prev === "off" ? "on" : "off"
              )
            }
          >
            <Ionicons
              name={flash === "off" ? "flash-off" : "flash"}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              setFacing((prev) =>
                prev === "back" ? "front" : "back"
              )
            }
          >
            <Ionicons
              name="camera-reverse"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Capture Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },

  permissionText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },

  permissionButton: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  topBar: {
    position: "absolute",
    top: 60,
    right: 20,
    flexDirection: "row",
    gap: 15,
  },

  iconButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomBar: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  captureButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  captureInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
  },

  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
  },

  previewImage: {
    flex: 1,
    resizeMode: "cover",
  },

  retakeButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#16A34A",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
});