import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Toast from "react-native-toast-message";
import { TextInput } from 'react-native-paper';

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
            Toast.show({
              type: "success",
              text1: `Registration is successful`,
              text2: "Please login with your credentials",
              visibilityTime: 2000,
              position: "bottom",
              bottomOffset: 20,
            });
          })
          .catch((error) => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Something went wrong",
              visibilityTime: 2000,
              position: "bottom",
              bottomOffset: 20,
            });
            console.log("Error signing out upon account creation. ", error);
          });
      })
      .catch((result) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
          visibilityTime: 2000,
          position: "bottom",
          bottomOffset: 20,
        });
        console.log("Error registering user. ", result);
      });
  };
  return (
    <SafeAreaView className="p-2 bg-white flex-1">
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
          className='bg-white'
          mode="outlined"
          outlineColor='grey'
          activeOutlineColor="orange"
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => ref_input_password.current.focus()}
          blurOnSubmit={false}
        />
        <TextInput
          className='bg-white'
          mode="outlined"
          outlineColor='grey'
          activeOutlineColor="orange"
          label="Password"
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
