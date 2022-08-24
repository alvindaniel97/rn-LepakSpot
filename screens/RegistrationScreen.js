import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import useAuth from "../hooks/useAuth";

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref_input_last_name = useRef();
  const ref_input_email = useRef();
  const ref_input_password = useRef();
  const navigation = useNavigation();
  const { registerUser } = useAuth();

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
      <View className="p-2 pt-10 space-y-4">
        <View className="flex-row space-x-4">
          <View className="flex-1 w-full">
            <TextInput
              className="bg-white"
              mode="outlined"
              outlineColor="grey"
              activeOutlineColor="orange"
              label="First Name"
              keyboardType="default"
              returnKeyType="next"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              onSubmitEditing={() => ref_input_last_name.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View className="flex-1 w-full">
            <TextInput
              className="bg-white"
              mode="outlined"
              outlineColor="grey"
              activeOutlineColor="orange"
              label="Last Name"
              keyboardType="default"
              returnKeyType="next"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              ref={ref_input_last_name}
              onSubmitEditing={() => ref_input_email.current.focus()}
              blurOnSubmit={false}
            />
          </View>
        </View>
        <View className="flex-1 w-full">
          <TextInput
            className="bg-white"
            mode="outlined"
            outlineColor="grey"
            activeOutlineColor="orange"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            value={email}
            onChangeText={(text) => setEmail(text)}
            ref={ref_input_email}
            onSubmitEditing={() => ref_input_password.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View className="flex-1 w-full">
          <TextInput
            className="bg-white"
            mode="outlined"
            outlineColor="grey"
            activeOutlineColor="orange"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            ref={ref_input_password}
          />
        </View>
        <View className="pt-10">
          <Button
            color="#FFA500"
            title="Register"
            onPress={() => registerUser(firstName, lastName, email, password)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
