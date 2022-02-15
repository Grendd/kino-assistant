import {FormattedShow, Show} from "../types/shows";

export const formatShows = (shows: Show[]): FormattedShow[] => {
    return shows.map(show => {
        const {image, genres, name = 'Unknown', rating, type, status, ended, id, summary, externals} = show;
        return {
            img: image?.medium || image?.original || undefined,
            name,
            id,
            isEnded: Boolean(ended),
            items: {
                genres,
                rating: rating?.average,
                status,
                type,
            },
            description: summary,
            externals: {showName: name, ...externals}

        }
    })
}