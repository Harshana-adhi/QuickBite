import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import StatusTracker from '../components/StatusTracker';
import { useOrders } from '../context/OrderContext';
import { colors, fontSizes, spacing } from '../theme/theme';
import { formatPrice, formatTime } from '../utils/format';

export default function OrderTrackingScreen({ route, navigation }) {
  const { getOrderById } = useOrders();
  const order = getOrderById(route.params?.orderId);

  if (!order) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.muted}>Order not found.</Text>
      </View>
    );
  }

  const isReady = order.status === 'Ready for pickup';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.orderId}>Order {order.id}</Text>
        <Text style={styles.muted}>Pickup at {formatTime(order.pickupTime)}</Text>
        <View style={[styles.badge, isReady && styles.badgeReady]}>
          <Text style={[styles.badgeText, isReady && styles.badgeTextReady]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <StatusTracker status={order.status} />
        {isReady && (
          <Text style={styles.readyText}>Your order is ready! Collect it from the canteen counter.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((cartItem) => (
          <View key={cartItem.item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {cartItem.quantity} x {cartItem.item.name}
            </Text>
            <Text style={styles.itemPrice}>
              {formatPrice(cartItem.item.price * cartItem.quantity)}
            </Text>
          </View>
        ))}
        <View style={[styles.itemRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
        </View>
      </View>

      <AppButton title="Back to Menu" onPress={() => navigation.popToTop()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  orderId: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
  },
  muted: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: 12,
    marginTop: spacing.sm,
  },
  badgeReady: {
    backgroundColor: '#E8F5E9',
  },
  badgeText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fontSizes.small,
  },
  badgeTextReady: {
    color: colors.success,
  },
  sectionTitle: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  readyText: {
    fontSize: fontSizes.body,
    color: colors.success,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  itemName: {
    flex: 1,
    fontSize: fontSizes.body,
    color: colors.text,
  },
  itemPrice: {
    fontSize: fontSizes.body,
    color: colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
