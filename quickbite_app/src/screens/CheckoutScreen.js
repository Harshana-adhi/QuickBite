import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { useOrders } from '../context/OrderContext';
import { colors, fontSizes, spacing } from '../theme/theme';
import { formatPrice, formatTime } from '../utils/format';

export default function CheckoutScreen({ route, navigation }) {
  const { getOrderById } = useOrders();
  const order = getOrderById(route.params?.orderId);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Order not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.tick}>
          <Text style={styles.tickText}>✓</Text>
        </View>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.message}>Your food is being prepared at the canteen.</Text>

        <Text style={styles.label}>Order Number</Text>
        <Text style={styles.orderId}>{order.id}</Text>

        <Text style={styles.label}>Estimated Pickup Time</Text>
        <Text style={styles.pickup}>{formatTime(order.pickupTime)}</Text>

        <Text style={styles.summary}>
          {order.itemCount} item(s) · {formatPrice(order.total)}
        </Text>
      </View>

      <AppButton
        title="Track Order"
        onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
      />
      <AppButton
        title="Back to Menu"
        variant="outline"
        onPress={() => navigation.popToTop()}
        style={styles.secondButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tick: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickText: {
    color: '#fff',
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
  },
  message: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  label: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginTop: spacing.lg,
  },
  orderId: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.primary,
  },
  pickup: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
  },
  summary: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    marginTop: spacing.lg,
  },
  secondButton: {
    marginTop: spacing.md,
  },
});
