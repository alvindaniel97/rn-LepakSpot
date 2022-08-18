import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { signOut } from "firebase/auth";
import { authentication } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const logoutUser = () => {
    signOut(authentication)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("Error signing out user. ", error);
      });
  };
  return (
    <SafeAreaView>
      <View>
        <Text className="text-red-500">HomeScreen</Text>
        <Button title="Logout" onPress={logoutUser} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
