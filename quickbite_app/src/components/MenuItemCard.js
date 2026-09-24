import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';
import { formatPrice } from '../utils/format';

export default function MenuItemCard({ item, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    margin: spacing.xs + 2,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: colors.border,
  },
  info: {
    padding: spacing.sm + 2,
  },
  name: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.text,
  },
  category: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginTop: 2,
  },
  price: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: spacing.xs,
  },
});
