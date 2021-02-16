import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};
const clearErrorMessage = (dispatch) => () => {
  console.log("clear error message clled");
  dispatch({ type: "clear_error_message" });
};
const tryLocalSign = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("trackList");
  } else {
    navigate("loginFlow");
  }
};
const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("./signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signin",
        payload: response.data.token,
      });
      navigate("trackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signup",
      });
    }
  };
};
const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("./signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signin",
        payload: response.data.token,
      });
      navigate("trackList");
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signin",
      });
    }
  };
};
const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  };
};
export const { Provider, Context } = createDataContext(
  authReducer, // reducer function
  { signup, signin, signout, clearErrorMessage, tryLocalSign },
  { token: null, errorMessage: "" } // state
);
