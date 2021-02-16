import "../_mocklocation";
import React, { useContext, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { withNavigationFocus } from "react-navigation";
import { Context as LocationContext } from "../context/LocationContext";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import useLocation from "../hooks/useLocaton";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );
  const [err] = useLocation(isFocused || state.recording, callback);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h3>TrackCreateScreen</Text>
        <Map />
        {err ? <Text>Please enable location </Text> : null}
        <TrackForm />
      </View>
    </SafeAreaView>
  );
};
TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});

export default withNavigationFocus(TrackCreateScreen);
