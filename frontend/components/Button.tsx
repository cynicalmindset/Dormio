import { Pressable, StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

type Props = {
  title: string;
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ title, onPress }: Props) => {

  const scale = useSharedValue(1);
  const wave = useSharedValue(0);
  const textOpacity = useSharedValue(1);

  // button scale animation
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  // expanding wave
  const waveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: wave.value }]
  }));

  // text fade animation
  const textAnimation = useAnimatedStyle(() => ({
    opacity: textOpacity.value
  }));

  const startAnimation = () => {

    scale.value = withSpring(0.9);

    textOpacity.value = withTiming(0, { duration: 200 });

    wave.value = withTiming(20, { duration: 700 }, () => {
      runOnJS(onPress)();
    });
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>

      {/* expanding color wave */}
      <Animated.View style={[styles.wave, waveStyle]} />

      <AnimatedPressable
        onPress={startAnimation}
        style={[styles.button, buttonStyle]}
      >

        <Animated.Text style={[styles.text, textAnimation]}>
          {title}
        </Animated.Text>

      </AnimatedPressable>

    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 60,
    backgroundColor: "#FF3A0A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },

  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "white"
  },

  wave: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "#FF3A0A",
    borderRadius: 1000,
    zIndex: 1,
    transform: [{ scale: 0 }]
  }
});