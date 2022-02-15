export type EpisodeProps = {
    id: number
    image: {
        medium: string
        original: string
    }
    season: number
    number: number
    name: string
    summary: string
    _links: {
        self: {
            href: string
        }
    }
    airdate: string
}