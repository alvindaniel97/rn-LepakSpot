import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logoutUser } = useAuth();

  return (
    <SafeAreaView>
      <View>
        <Text className="text-red-500">Hi {user.email}</Text>
        <Button title="Logout" onPress={logoutUser} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
