import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { MemoryTokenCache } from '@clerk/clerk-expo/dist/cache';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { useFonts } from 'expo-font';
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Sniglet': require('./assets/fonts/Sniglet-Regular.ttf'),
    'Sniglet-ExtraBold': require('./assets/fonts/Sniglet-ExtraBold.ttf'),
  });
  return (
    <ClerkProvider
    tokenCache={MemoryTokenCache}
    publishableKey='pk_test_ZGlyZWN0LWJlZGJ1Zy0yLmNsZXJrLmFjY291bnRzLmRldiQ'>
    <View style={styles.container}>
      
     {/* Sign In Component  */}
      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
            </NavigationContainer>
      </SignedIn>
      {/* SignOut Component */}
      <SignedOut>
        <Login/>    
      </SignedOut>
      <StatusBar backgroundColor='#EC7321' />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20
  },
});
