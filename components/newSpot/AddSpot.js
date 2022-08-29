import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { OutlinedTextField } from "rn-material-ui-textfield";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddSpot = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [spotName, setSpotName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const ref_input_spotName = useRef();
  const ref_input_type = useRef();
  const ref_input_description = useRef();
  const ref_input_lat = useRef();
  const ref_input_long = useRef();
  const ref_input_address = useRef();
  const ref_input_rating = useRef();

  return (
    <ScrollView className="p-2">
      <View>
        <View className="flex-row items-center justify-between pt-2 pb-2">
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={40} />
          </TouchableOpacity>
          <Text className="text-lg font-bold">Add A New Spot</Text>
          <View></View>
        </View>
      </View>
      <View className="p-2 space-y-2">
        <View>
          <OutlinedTextField
            tintColor="orange"
            mode="outlined"
            label="Spot Name"
            keyboardType="default"
            returnKeyType="next"
            value={spotName}
            onChangeText={(text) => setSpotName(text)}
            onSubmitEditing={() => ref_input_type.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View>
          <OutlinedTextField
            tintColor="orange"
            mode="outlined"
            label="Type"
            keyboardType="default"
            returnKeyType="next"
            ref={ref_input_type}
            value={type}
            onChangeText={(text) => setType(text)}
            onSubmitEditing={() => ref_input_description.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View>
          <OutlinedTextField
            tintColor="orange"
            mode="outlined"
            label="Description"
            keyboardType="default"
            returnKeyType="next"
            value={description}
            ref={ref_input_description}
            onChangeText={(text) => setDescription(text)}
            onSubmitEditing={() => ref_input_address.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View>
          <OutlinedTextField
            tintColor="orange"
            mode="outlined"
            label="Address"
            keyboardType="default"
            returnKeyType="next"
            value={address}
            ref={ref_input_address}
            onChangeText={(text) => setAddress(text)}
            onSubmitEditing={() => ref_input_lat.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View className="flex-row space-x-2">
          <View className="flex-1 w-full">
            <OutlinedTextField
              tintColor="orange"
              mode="outlined"
              label="Latitude"
              keyboardType="default"
              returnKeyType="next"
              value={lat}
              ref={ref_input_lat}
              onChangeText={(text) => setLat(text)}
              onSubmitEditing={() => ref_input_long.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View className="flex-1 w-full">
            <OutlinedTextField
              tintColor="orange"
              mode="outlined"
              label="Logitude"
              keyboardType="default"
              returnKeyType="next"
              value={long}
              ref={ref_input_long}
              onChangeText={(text) => setLong(text)}
              onSubmitEditing={() => ref_input_rating.current.focus()}
              blurOnSubmit={false}
            />
          </View>
        </View>
        <View>
          <OutlinedTextField
            tintColor="orange"
            mode="outlined"
            label="Rating"
            keyboardType="default"
            value={rating}
            ref={ref_input_rating}
            onChangeText={(text) => setRating(text)}
          />
        </View>
      </View>
      <TouchableOpacity className="bg-[#ffa31a] rounded-md p-2 m-8">
        <Text className="text-lg font-bold self-center text-white">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddSpot;
