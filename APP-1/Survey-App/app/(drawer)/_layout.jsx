import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../../hooks/useProfile';

function CustomDrawerContent(props) {
  const { profile } = useProfile();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      {/* Drawer Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: profile?.avatar,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profile?.name || "Student"}</Text>
        <Text style={styles.profileEmail}>{profile?.email || "student@example.com"}</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.itemsContainer}>
        <DrawerItem
          label="Home"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="home-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/');
          }}
        />
        <DrawerItem
          label="Survey History"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="time-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/survey-history');
          }}
        />
        <DrawerItem
          label="Inspection Report"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="clipboard-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/inspection-report');
          }}
        />
        <DrawerItem
          label="Location"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="location-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/location');
          }}
        />
        <DrawerItem
          label="Clipboard Manager"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="clipboard-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/clipboard');
          }}
        />
        <DrawerItem
          label="Contacts"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="people-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/contacts');
          }}
        />
        <DrawerItem
          label="Help"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="help-circle-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/help');
          }}
        />
        <DrawerItem
          label="About"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="information-circle-outline" color="#16A34A" size={22} />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/about');
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#16A34A',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="survey-history"
        options={{
          title: 'Survey History',
          drawerLabel: 'Survey History',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="inspection-report"
        options={{
          title: 'Inspection Report',
          drawerLabel: 'Inspection Report',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          title: 'Location',
          drawerLabel: 'Location',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="clipboard"
        options={{
          title: 'Clipboard Manager',
          drawerLabel: 'Clipboard',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          drawerLabel: 'Contacts',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          title: 'Help',
          drawerLabel: 'Help',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: 'About',
          drawerLabel: 'About',
          headerShown: true,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 0,
  },
  headerContainer: {
    backgroundColor: '#16A34A',
    padding: 24,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#D1FAE5',
    fontSize: 13,
    marginTop: 2,
  },
  itemsContainer: {
    paddingHorizontal: 10,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});
