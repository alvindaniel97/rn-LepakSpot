import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export default function App() {
  const user = false;
  return (
    <NavigationContainer>
      <TailwindProvider>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={screenOptions}>
            {user ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />{" "}
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegistrationScreen} />
              </>
            )}
          </Stack.Navigator>
        </SafeAreaProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
