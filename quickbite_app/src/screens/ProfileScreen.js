import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name and order history will appear here.</Text>
      <AppButton title="Logout" variant="outline" onPress={() => navigation.replace('Login')} />
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
