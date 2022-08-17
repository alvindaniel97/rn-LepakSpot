import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const ref_input_password = useRef();

  const loginUser = () => {
    // signInWithEmailAndPassword(authentication, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     navigation.navigate("Dashboard");
    //     const user = userCredential.user;
    //     console.log("user", user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  };

  return (
    <SafeAreaView className="bg-white flex-1 ">
      <ScrollView>
        <View className="p-10">
          <View className="pt-10 items-center">
            <Image
              style={{ height: 250, width: 250 }}
              source={require("../assets/lepak_spot_logo.png")}
            />
          </View>

          <View className="pt-14 space-y-2">
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

          <View className="items-end pt-4">
            <View className="flex-row">
              <Text className="text-sm">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-sm font-bold text-cyan-600">
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="pt-14">
            <Button color="#FFA500" title="Login" onPress={loginUser} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
