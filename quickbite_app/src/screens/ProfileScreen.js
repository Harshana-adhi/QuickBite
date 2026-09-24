import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useUser } from '../context/UserContext';
import { colors, fontSizes, spacing } from '../theme/theme';
import { formatDate, formatPrice } from '../utils/format';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useUser();
  const { orders, clearOrders } = useOrders();
  const { clearCart } = useCart();

  const name = user?.name || 'Guest';

  const handleLogout = () => {
    clearCart();
    clearOrders();
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{user?.isGuest ? 'Guest user' : user?.email}</Text>
        <Text style={styles.orderCount}>Total orders: {orders.length}</Text>
      </View>
      <Text style={styles.sectionTitle}>Order History</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={<Text style={styles.empty}>You have not placed any orders yet.</Text>}
        renderItem={({ item: order }) => (
          <Pressable
            style={({ pressed }) => [styles.orderCard, pressed && styles.pressed]}
            onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
          >
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderMeta}>{formatDate(order.placedAt)}</Text>
              <Text style={styles.orderMeta}>
                {order.itemCount} item(s) · {formatPrice(order.total)}
              </Text>
            </View>
            <Text
              style={[styles.status, order.status === 'Ready for pickup' && styles.statusReady]}
            >
              {order.status}
            </Text>
          </Pressable>
        )}
        ListFooterComponent={
          <AppButton
            title="Logout"
            variant="outline"
            onPress={handleLogout}
            style={styles.logout}
          />
        }
      />
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
    paddingBottom: spacing.xl,
  },
  profileCard: {
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
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  name: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.sm,
  },
  email: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    marginTop: 2,
  },
  orderCount: {
    fontSize: fontSizes.body,
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  empty: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    textAlign: 'center',
    marginVertical: spacing.lg,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm + 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  pressed: {
    opacity: 0.85,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.text,
  },
  orderMeta: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginTop: 2,
  },
  status: {
    fontSize: fontSizes.small,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  statusReady: {
    color: colors.success,
  },
  logout: {
    marginTop: spacing.lg,
  },
});
