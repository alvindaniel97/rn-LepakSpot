import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddSpot from "../components/newSpot/AddSpot";

const NewSpotScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar translucent={true} backgroundColor="#ffa31a" />
      <AddSpot navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewSpotScreen;
