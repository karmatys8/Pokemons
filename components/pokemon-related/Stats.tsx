import React from "react";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { Stat } from "@/assets/types";
import { styles } from "@/assets/styles";

interface StatsProps {
  statsArray: Stat[];
}

const Stats: React.FC<StatsProps> = ({ statsArray }) => (
  <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">Stats</ThemedText>
    {/* <FlatList
          data={favPokemon?.stats ?? []}
          renderItem={({item}) => <ThemedText>{`${item.stat.name}: ${item.base_stat}`}</ThemedText>}
          keyExtractor={item => item.stat.name}
        /> */}
    {statsArray.map((item) => (
      <ThemedText
        key={item.stat.name}
      >{`${item.stat.name}: ${item.base_stat}`}</ThemedText>
    ))}
  </ThemedView>
);

export default Stats;
