import React, { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "../components/Spacer";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  // console.log(state);
  const _id = navigation.getParam("_id");
  const track = state.find((t) => t._id === _id);
  // console.log(track);
  const initialCoords = track.locations[0].coords;
  return (
    <View>
      <Text h4 style={styles.text}>
        {track.name}
      </Text>
      <Spacer />
      <Spacer />
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
        style={{ height: 300 }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </View>
  );
};
TrackDetailScreen.navigationOptions = {
  title: "Track List",
};
const styles = StyleSheet.create({
  text: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default TrackDetailScreen;
