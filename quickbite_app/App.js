import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { OrderProvider } from './src/context/OrderContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <OrderProvider>
          <CartProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </CartProvider>
        </OrderProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
