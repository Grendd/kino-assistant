export interface Show {
    genres: string[];
    image: {
        medium: string;
        original: string;
    };
    name: string;
    status: string
    rating: {
        average: number;
    }
    type: string;
    ended: string | null
    externals: {
        tvrage: number | null
        thetvdb: number | null
        imdb: string | null
    }
    id: number
    summary: string
    _links: {
        previousepisode: {
            href: string
        }
    }
}

export interface searchResponse {
    score: number;
    show: Show;
}

export type FormattedShow = {
    img?: string;
    name?: string;
    isEnded: boolean;
    items: {
        genres: string[],
        rating: number,
        status: string,
        type: string,
    },
    id: number
    description?: string
    externals: {
        tvrage: number | null
        thetvdb: number | null
        imdb: string | null
        showName: string
    }
}
