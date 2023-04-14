import { StyleSheet, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const Button = ({ handlePress, iconName, color, size, text }) => {
  return (
    <Pressable
      onPress={handlePress ? handlePress : null}
      style={styles.iconButton}
    >
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
      <Text style={[styles.iconButtonText, { color: color }]}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButtonText: {
    color: "gray",
    marginLeft: 5,
    fontWeight: "500",
  },
});
