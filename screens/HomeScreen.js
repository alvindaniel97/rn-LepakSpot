import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { FAB } from "react-native-paper";

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
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        <StatusBar translucent={true} backgroundColor="#ffa31a" />
        <View
          className="bg-[#ffa31a] rounded-b-xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 10,
          }}
        >
          <Header navigation={navigation} userDetails={userDetails} />
        </View>
        <View className="flex-1">
          <FAB
            className="absolute m-12 bottom-0 right-0 rounded-full bg-[#ffa31a]"
            icon="plus"
            color="white"
            variant="surface"
            onPress={() => navigation.push("NewSpotScreen")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
