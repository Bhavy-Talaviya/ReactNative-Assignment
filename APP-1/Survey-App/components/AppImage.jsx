import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppImage({ uri, style, contentFit = 'cover', placeholderIcon = 'person' }) {
  const iconSize = typeof style?.width === 'number' ? style.width * 0.45 : 40;

  if (!uri) {
    return (
      <View style={[style, styles.placeholder]}>
        <Ionicons name={placeholderIcon} size={iconSize} color="#9CA3AF" />
      </View>
    );
  }

  return (
    <Image
      key={uri}
      source={{ uri }}
      style={style}
      contentFit={contentFit}
      cachePolicy="none"
      transition={200}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
