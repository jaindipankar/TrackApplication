import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.container}>
        <Text h3>AccountScreen</Text>
        <Spacer>
          <Button title="Sign Out" onPress={signout} />
        </Spacer>
      </View>
    </SafeAreaView>
  );
};
AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});

export default AccountScreen;
