import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function CartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart items will appear here.</Text>
      <AppButton title="Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  text: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
});
