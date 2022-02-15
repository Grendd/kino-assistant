export interface LocalFavorites {
    tvrage: number | null
    thetvdb: number | null
    imdb: string | null
    showName: string
}

export const saveToLocalStorage = (key: string, value?: LocalFavorites) => {
    const storageValue = localStorage.getItem(key)

    if (!value){
        return;
    }
    if (!storageValue) {
        localStorage.setItem(key, JSON.stringify([value]));
        return;
    }

    const stringified: LocalFavorites[] = JSON.parse(storageValue)
    if (stringified.find(item => item.showName === value.showName)){
        return;
    }

    localStorage.setItem(key, JSON.stringify([...stringified, value]));
}

export const removeFromLocalStorage = (key: string, value?: LocalFavorites) => {
    const storageValue = localStorage.getItem(key)

    if (!value || !storageValue){
        return;
    }
    const stringified: LocalFavorites[] = JSON.parse(storageValue)
    const removed: LocalFavorites[] = stringified.filter(item => item.showName !== value.showName)
    localStorage.setItem(key, JSON.stringify(removed));
}

export interface LocalWatched {
    ids: number[]
}

export const saveWatchedToLocalStorage = (key: string, value?: number) => {
    const storageValue = localStorage.getItem(key)

    if (!value){
        return;
    }
    if (!storageValue) {
        localStorage.setItem(key, JSON.stringify([value]));
        return;
    }

    const stringified: number[] = JSON.parse(storageValue)
    if (stringified.find(item => item === value)){
        return;
    }

    localStorage.setItem(key, JSON.stringify([...stringified, value]));
}

export const removeWatchedFromLocalStorage = (key: string, value?: number) => {
    const storageValue = localStorage.getItem(key)

    if (!value || !storageValue){
        return;
    }
    const stringified: number[] = JSON.parse(storageValue)
    const filtered = stringified.filter(item => item !== value)
    localStorage.setItem(key, JSON.stringify(filtered));
}