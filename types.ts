export type Stat = {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

export type Pokemon = {
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
