import React from "react";

import { StyleSheet } from "react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { styles } from "@/assets/styles";
import { Image } from "expo-image";

interface CardProps {
  img: string;
  name: string;
}

const Card: React.FC<CardProps> = ({ img, name }) => (
  <ThemedView style={localStyles.cardContainer}>
    {/* maybe lazy load the image */}
    <Image source={img} alt={name} style={styles.smallPokemonImage} />
    <ThemedText style={localStyles.textStyle}>{name}</ThemedText>
  </ThemedView>
);

export default Card;

const localStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  textStyle: {
    marginLeft: 10,
    color: "#333333",
  },
});
