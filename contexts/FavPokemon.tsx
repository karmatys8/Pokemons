import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Pokemon } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type PokemonOrNull = Pokemon | null;

type FavPokemonContextType = {
  favPokemon: PokemonOrNull;
  setFavPokemon: React.Dispatch<React.SetStateAction<PokemonOrNull>>;
};

const FavPokemonContext = createContext<FavPokemonContextType | undefined>(
  undefined
);

export const useFavPokemon = () => {
  const context = useContext(FavPokemonContext);
  if (context === undefined) {
    throw new Error("useFavPokemon must be used within a FavPokemonProvider");
  }
  return context;
};

const favPokemonAtom = atomWithStorage("favPokemon", null, undefined, {
  getOnInit: true,
});

export const FavPokemonProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [favPokemon, setFavPokemon] = useAtom<PokemonOrNull>(favPokemonAtom);

  return (
    <FavPokemonContext.Provider value={{ favPokemon, setFavPokemon }}>
      {children}
    </FavPokemonContext.Provider>
  );
};
