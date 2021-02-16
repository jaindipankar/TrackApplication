import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  // console.log(state);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <NavigationEvents
        onWillBlur={clearErrorMessage}
        onWillFocus={clearErrorMessage}
      />
      <AuthForm
        headerText="Sign up for tracker"
        errorMessage={state.errorMessage}
        submitbuttonText="Sign Up"
        onSubmit={({ email, password }) => signup({ email, password })}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account Sign in instead"
      />
    </KeyboardAvoidingView>
  );
};
SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 70 },
});

export default SignupScreen;
