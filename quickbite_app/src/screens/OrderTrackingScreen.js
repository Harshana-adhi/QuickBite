import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function OrderTrackingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order status will appear here.</Text>
      <AppButton title="Back to Menu" onPress={() => navigation.navigate('Home')} />
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
