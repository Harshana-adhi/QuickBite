import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import CartItemRow from '../components/CartItemRow';
import { useCart } from '../context/CartContext';
import { colors, fontSizes, spacing } from '../theme/theme';
import { formatPrice } from '../utils/format';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, itemCount, subtotal } = useCart();
  const insets = useSafeAreaInsets();

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Add some food from the menu to get started.</Text>
        <AppButton title="Browse Menu" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(cartItem) => cartItem.item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item: cartItem }) => (
          <CartItemRow
            cartItem={cartItem}
            onChangeQuantity={(quantity) => updateQuantity(cartItem.item.id, quantity)}
            onRemove={() => removeFromCart(cartItem.item.id)}
          />
        )}
      />

      <View style={[styles.summary, { paddingBottom: spacing.md + insets.bottom }]}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items</Text>
          <Text style={styles.summaryValue}>{itemCount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>{formatPrice(subtotal)}</Text>
        </View>
        <AppButton title="Checkout" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },
  list: {
    padding: spacing.md,
  },
  summary: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: fontSizes.body,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: fontSizes.body,
    color: colors.text,
  },
  subtotalLabel: {
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.text,
  },
  subtotalValue: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.text,
  },
  emptyText: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});
