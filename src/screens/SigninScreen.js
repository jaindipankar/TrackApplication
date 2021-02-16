import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation"; // called whenever screen is rendered
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <NavigationEvents onDidBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign in for tracker"
        errorMessage={state.errorMessage}
        submitbuttonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account?? SignUp instead"
      />
    </KeyboardAvoidingView>
  );
};
SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 70 },
});

export default SigninScreen;
