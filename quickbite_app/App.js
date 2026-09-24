import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { OrderProvider } from './src/context/OrderContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <OrderProvider>
        <CartProvider>
          <AppNavigator />
          <StatusBar style="light" />
        </CartProvider>
      </OrderProvider>
    </SafeAreaProvider>
  );
}
