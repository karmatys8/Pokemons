import React from "react";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { Stat } from "@/types";
import { styles } from "@/assets/styles";

type StatsProps = {
  statsArray: Stat[];
};

const Stats: React.FC<StatsProps> = ({ statsArray }) => (
  <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">Stats</ThemedText>
    {statsArray.map((item) => (
      <ThemedText key={item.stat.name}>
        {`${item.stat.name}: ${item.base_stat}`}
      </ThemedText>
    ))}
  </ThemedView>
);

export default Stats;
