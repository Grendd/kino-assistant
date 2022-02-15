import config from "../configs/default";
import {searchResponse, Show} from "../types/shows";
import {ErrorResponse} from "../types/error";


class searchApi {
    static searchAllByName = async(query: string): Promise<searchResponse[]> => {
        return await fetch(`${config.searchApi}/search/shows?q=:${query}`, {
        }).then((response) => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).catch(err => console.log(err))
    }

    static searchById = async(query: string, idName: string): Promise<Show | ErrorResponse> => {
        return await fetch(`${config.searchApi}/lookup/shows?${idName}=${query}`, {
        }).then((response) => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).catch(err => console.log(err))
    }

    static searchEpisodesById = async(showId: number): Promise<any> => {
            return await fetch(`${config.searchApi}/shows/${showId}/episodes`, {
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            }).catch(err => console.log(err))
        }
}

export default searchApi


