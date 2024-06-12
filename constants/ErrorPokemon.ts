import { Pokemon } from "@/types";

export const ERROR_POKEMON: Pokemon = {
    name: "ERROR",
    sprites: {
      front_default: "",
      back_default: "",
      back_shiny: "",
      front_shiny: "",
      back_female: null,
      back_shiny_female: null,
      front_female: null,
      front_shiny_female: null,
    },
    height: 0,
    weight: 0,
    stats: [],
    id: -1,
} as const;