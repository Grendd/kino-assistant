import React, {useState, FormEvent, useEffect} from 'react';
import './App.css';
import Header from "../Header";
import Search from "../Search";
import CardsBlock from "../CardsBlock";
import Spacer from "../Spacer";
import Description from "../Description";
import {formatShows} from '../../utils/format'
import {LocalFavorites} from '../../utils/localStorage'
import searchApi from "../../api/searchApi";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {closeDrawer, getIsDrawerOpen, getDrawerData, BANNER_TYPES, getDrawerType} from "../../store/reducers/drawer";
import {searchShows, getSearchShows} from "../../store/reducers/search";
import {addFavorites, getFavoritesShows} from "../../store/reducers/favorite";
import {Show} from "../../types/shows";
import {ErrorResponse} from "../../types/error";


function App() {
    const isDrawerOpen = useAppSelector(getIsDrawerOpen)
    const searchedShows = useAppSelector(getSearchShows)
    const favoriteShows = useAppSelector(getFavoritesShows)
    const popupData = useAppSelector(getDrawerData)
    const popupType = useAppSelector(getDrawerType)
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string>('')

    const search = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(closeDrawer())
        const response = await searchApi.searchAllByName(searchValue);
        const shows = response.map(answer => answer.show)
        dispatch(searchShows(formatShows(shows)));
    }
    useEffect(() => {
        const favoritesLocal = localStorage.getItem('favorites')
        if (!favoritesLocal) {
            return;
        }
        const parsed: LocalFavorites[]= JSON.parse(favoritesLocal)
        const shows = parsed.map(async(item) => {
            let response: null | Promise<ErrorResponse | Show> = null;
            Object.keys(item).forEach((key) => {
                // @ts-ignore
                const value = item[key]
                if (value === null || key === 'showName') {
                    return;
                }
                response = searchApi.searchById(value, key);
            });
            return response;
        })
        Promise.all(shows).then(items => dispatch(addFavorites(formatShows(items as unknown as Show[]))))
    }, []);
    return (
        <div className="app">
            <Header />
            <Spacer size={4} />
            <Search inputValue={searchValue} onChange={setSearchValue} onSubmit={search} />
            <div>
                <Spacer size={8} />
                {searchedShows.length > 0 && <CardsBlock cards={searchedShows} title="Search:" bannerTypeClick={BANNER_TYPES.SEARCH}/>}
                {/* @ts-ignore*/}
                {popupType === BANNER_TYPES.SEARCH && <Description className={isDrawerOpen && popupData ? 'visible' : ''} isOpen={isDrawerOpen} {...popupData}/>}
                {favoriteShows.length > 0 && <CardsBlock cards={favoriteShows} title="Favorites:" bannerTypeClick={BANNER_TYPES.FAVORITE}/>}
                {/* @ts-ignore*/}
                {popupType === BANNER_TYPES.FAVORITE && <Description className={isDrawerOpen && popupData ? 'visible' : ''} isOpen={isDrawerOpen} {...popupData}/>}
            </div>
        </div>
    );
}

export default App;
