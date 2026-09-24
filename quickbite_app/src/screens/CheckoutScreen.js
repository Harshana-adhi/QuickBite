import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function CheckoutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order number and pickup time will appear here.</Text>
      <AppButton title="Track Order" onPress={() => navigation.navigate('OrderTracking')} />
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
