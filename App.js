import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import Toast from "react-native-toast-message";
import useToastConfig from "./hooks/useToastConfig";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
  const toastConfig = useToastConfig();
  return (
    <NavigationContainer>
      <TailwindProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </SafeAreaProvider>
        <Toast config={toastConfig} />
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
