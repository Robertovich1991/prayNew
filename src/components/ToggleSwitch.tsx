import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ToggleSwitch = () => {
  const [selected, setSelected] = useState<"monthly" | "annual">("monthly");

  return (
    <View style={styles.container}>
      {/* Monthly Button */}
      <TouchableOpacity
        style={[styles.option, selected === "monthly" && styles.selected]}
        onPress={() => setSelected("monthly")}
      >
        <Text
          style={[styles.text, selected === "monthly" && styles.selectedText]}
        >
          Monthly
        </Text>
      </TouchableOpacity>

      {/* Annual Button */}
      <TouchableOpacity
        style={[styles.option, selected === "annual" && styles.selected]}
        onPress={() => setSelected("annual")}
      >
        <Text
          style={[styles.text, selected === "annual" && styles.selectedText]}
        >
          Annual
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#222", // dark background
    padding: 3,
    zIndex:9
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#d8c07d", // gold color
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  selectedText: {
    color: "#fff", // white text for selected
    fontWeight: "600",
  },
});

export default ToggleSwitch;
