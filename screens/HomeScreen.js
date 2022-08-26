import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";

const HomeScreen = ({ navigation }) => {
  //const navigation = useNavigation();
  const { user, logoutUser } = useAuth();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem("userDetails");
      if (jsonValue != null) {
        const userData = await JSON.parse(jsonValue);
        setUserDetails(userData);
      } else {
        setUserDetails(null);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Header navigation={navigation} userDetails={userDetails} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
