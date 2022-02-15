import React from 'react';
import './styles.scss'
import type {FormattedShow} from "../../types/shows";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
    BannerType,
    closeDrawer,
    getDrawerData,
    getIsDrawerOpen,
    openDrawer
} from "../../store/reducers/drawer";
import {ReactComponent as Logo } from './star.svg';
import {ReactComponent as LogoFilled } from './star-filled.svg';
import {addFavorite, getFavoritesShows, removeFavorite} from "../../store/reducers/favorite";
import {removeFromLocalStorage, saveToLocalStorage} from "../../utils/localStorage";

type CardProps = {
    clickType: BannerType
}
function Card(props: FormattedShow & CardProps) {
    const {img, name, externals, clickType} = props;
    const dispatch = useAppDispatch();
    const IsDrowerOpen = useAppSelector(getIsDrawerOpen);
    const drawerData = useAppSelector(getDrawerData);
    const isLastClicked = drawerData && drawerData.id === props.id
    const favorites = useAppSelector(getFavoritesShows)
    const isFavorite = Boolean(favorites.find(item => item.id === props.id))
    const popupController = (type: BannerType) => IsDrowerOpen && isLastClicked ? closeDrawer() : openDrawer({data: props, type});

    return (
        <div className="card" onClick={() => dispatch(popupController(clickType))}>
            {isFavorite ? <LogoFilled className='card-star' onClick={(e) => {
                e.stopPropagation();
                removeFromLocalStorage('favorites', externals)
                dispatch(removeFavorite(props))
            }} /> : <Logo className='card-star' onClick={(e) => {
                e.stopPropagation();
                saveToLocalStorage('favorites', externals)
                dispatch(addFavorite(props))
            }} />}
            {img ? <img className='card-img' src={img} alt="film image"/> :
                <div style={{width: '210px', height: '295px'}} />}
            <h3>{name}</h3>
        </div>
    );
}

export default Card;