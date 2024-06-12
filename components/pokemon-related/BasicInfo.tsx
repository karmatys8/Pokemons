import React from "react";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { styles } from "@/assets/styles";

type InfoProps = {
  name: string;
  height: number;
  weight: number;
};

const BasicInfo: React.FC<InfoProps> = ({ name, height, weight }) => (
  <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">{`Name: ${name}`}</ThemedText>
    <ThemedText>{`Height: ${height}`}</ThemedText>
    <ThemedText>{`Weight: ${weight}`}</ThemedText>
  </ThemedView>
);

export default BasicInfo;
