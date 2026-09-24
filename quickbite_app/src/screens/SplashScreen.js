import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes } from '../theme/theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QuickBite</Text>
      <Text style={styles.subtitle}>Order ahead. Skip the queue.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: fontSizes.body,
    marginTop: 8,
  },
});
