import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import AppButton from '../components/AppButton';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { getItemById } from '../data/menu';
import { colors, fontSizes, spacing } from '../theme/theme';
import { formatPrice } from '../utils/format';

export default function ItemDetailScreen({ route, navigation }) {
  const item = getItemById(route.params?.itemId);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { width } = useWindowDimensions();
  const isWide = width >= 700;

  if (!item) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.description}>Item not found.</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(item, quantity);
    Alert.alert('Added to Cart', `${quantity} x ${item.name} added to your cart.`, [
      { text: 'Continue Shopping', onPress: () => navigation.goBack() },
      { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isWide && styles.wideContainer]}>
      <Image
        source={{ uri: item.image }}
        style={[styles.image, isWide && styles.wideImage]}
      />
      <View style={[styles.details, isWide && styles.wideDetails]}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.quantityRow}>
          <Text style={styles.label}>Quantity</Text>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(quantity - 1)}
          />
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.total}>{formatPrice(item.price * quantity)}</Text>
        </View>

        <AppButton title="Add to Cart" onPress={handleAddToCart} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xl,
  },
  wideContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: colors.border,
  },
  wideImage: {
    width: '50%',
    alignSelf: 'flex-start',
    borderRadius: 12,
  },
  details: {
    padding: spacing.lg,
  },
  wideDetails: {
    flex: 1,
    paddingTop: 0,
  },
  category: {
    fontSize: fontSizes.small,
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.xs,
  },
  price: {
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.primary,
    marginTop: spacing.sm,
  },
  description: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.text,
  },
  total: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.text,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
