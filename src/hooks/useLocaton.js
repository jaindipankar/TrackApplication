import { useState, useEffect } from "react";
import {
  Accuracy,
  watchPositionAsync,
  requestPermissionsAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState("");

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      await requestPermissionsAsync();
      subscriber = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        callback
      );
      try {
      } catch (e) {
        setErr(e);
      }
    };
    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) subscriber.remove();
      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);
  return [err];
};
