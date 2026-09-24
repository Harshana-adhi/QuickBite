import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <AppButton title="Login" onPress={() => navigation.replace('Home')} />
      <AppButton
        title="Continue as Guest"
        variant="outline"
        onPress={() => navigation.replace('Home')}
        style={styles.guestButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  guestButton: {
    marginTop: spacing.md,
  },
});
