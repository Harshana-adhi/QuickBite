import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import QuantitySelector from './QuantitySelector';
import { colors, fontSizes, spacing } from '../theme/theme';
import { formatPrice } from '../utils/format';

export default function CartItemRow({ cartItem, onChangeQuantity, onRemove }) {
  const { item, quantity } = cartItem;

  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)} each</Text>
        <View style={styles.actions}>
          <QuantitySelector
            quantity={quantity}
            min={0}
            onIncrease={() => onChangeQuantity(quantity + 1)}
            onDecrease={() => onChangeQuantity(quantity - 1)}
          />
          <Pressable onPress={onRemove}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.lineTotal}>{formatPrice(item.price * quantity)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.sm + 2,
    marginBottom: spacing.sm + 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm + 2,
  },
  name: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.text,
  },
  price: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  remove: {
    fontSize: fontSizes.small,
    color: colors.danger,
    fontWeight: '600',
  },
  lineTotal: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: spacing.sm,
  },
});
