import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes } from '../theme/theme';

export default function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, max = 20 }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, quantity <= min && styles.disabled]}
        onPress={onDecrease}
        disabled={quantity <= min}
      >
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable
        style={[styles.button, quantity >= max && styles.disabled]}
        onPress={onIncrease}
        disabled={quantity >= max}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.primary,
  },
  quantity: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.text,
  },
});
