export interface Stat {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

export interface Pokemon {
    height: number,
    id: number,
    name: string,
    sprites: {
        back_default: string,
        back_female: string | null,
        back_shiny: string,
        back_shiny_female: string | null,
        front_default: string,
        front_female: string | null,
        front_shiny: string,
        front_shiny_female: string | null,
    },
    stats: Stat[],
    weight: number
}

export const errorPokemon = {
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
  };