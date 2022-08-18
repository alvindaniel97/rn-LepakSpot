import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref_input_password = useRef();
  const navigation = useNavigation();

  const registerUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(() => {
        signOut(authentication)
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.log("Error signing out upon account creation. ", error);
          });
      })
      .catch((result) => {
        console.log("Error registering user. ", result);
      });
  };
  return (
    <SafeAreaView className="p-2">
      <View>
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={40} />
          </TouchableOpacity>
          <Text className="text-lg font-bold">Register Now</Text>
          <View></View>
        </View>
      </View>
      <View className="p-2 pt-10 space-y-2">
        <TextInput
          className="p-2 border-solid border-2 border-gray-500"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => ref_input_password.current.focus()}
          blurOnSubmit={false}
        />
        <TextInput
          className="p-2 border-solid border-2 border-gray-500"
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          ref={ref_input_password}
        />
      </View>
      <View className="pt-14">
        <Button color="#FFA500" title="Register" onPress={registerUser} />
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
