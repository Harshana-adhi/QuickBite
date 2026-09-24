import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Menu items will appear here.</Text>
      <AppButton title="View Item" onPress={() => navigation.navigate('ItemDetail')} />
      <AppButton title="Go to Cart" onPress={() => navigation.navigate('Cart')} style={styles.button} />
      <AppButton
        title="My Profile"
        variant="outline"
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}
      />
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
  button: {
    marginTop: spacing.md,
  },
});
