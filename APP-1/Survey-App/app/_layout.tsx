import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { SurveyProvider } from '../context/SurveyContext';
import { ThemeProvider } from '../context/ThemeContext';
import { ProfileProvider } from '../context/ProfileContext';

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ProfileProvider>
          <SurveyProvider>
            <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </NavigationThemeProvider>
          </SurveyProvider>
        </ProfileProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
