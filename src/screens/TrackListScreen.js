import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation";
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import Spacer from "../components/Spacer";
import { FontAwesome } from "@expo/vector-icons";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  // console.log(state);
  return (
    <View>
      <NavigationEvents onWillFocus={fetchTracks} />
      <Spacer />
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("trackDetail", { _id: item._id });
              }}
            >
              <View style={styles.flatListContainer}>
                <Text style={styles.flatListtext}>{item.name}</Text>
                <FontAwesome
                  name="chevron-right"
                  size={18}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
TrackListScreen.navigationOptions = {
  title: "Tracks",
};
const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    margin: 30,
  },
  flatListtext: {
    fontSize: 20,
    margin: 25,
  },
});

export default TrackListScreen;
