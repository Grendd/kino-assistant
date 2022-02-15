import React, {useEffect, useState} from 'react';
import {FormattedShow} from "../../types/shows";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {closeDrawer} from "../../store/reducers/drawer";
import ParamsController from "../ParamsBlock";
import searchApi from "../../api/searchApi";

import {EpisodeProps} from "../../types/episodes";
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../Modal";
import {
    removeWatchedFromLocalStorage,
    saveWatchedToLocalStorage
} from "../../utils/localStorage";
import {addWatched, getWatchedShows, removeWatched} from "../../store/reducers/watched";

import {ReactComponent as Logo} from "./eye.svg";
import {ReactComponent as LogoFilled} from "./eye-filled.svg";
import './styles.scss'

type PopupProps = {
    className?: string
    isOpen: boolean
}


const EpisodeCard = ({image, ...props}: EpisodeProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const date = props.airdate.split('-').reverse().join('-')
    const watched = useAppSelector(getWatchedShows);
    const isWatched = Boolean(watched.find(id => id === props.id))

    const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowModal(true)
    }
    const hideShow = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowModal(false)
    }

    return (
        <div className="episode" onClick={openModal}>
            {isWatched ? <LogoFilled className='episode-eye' onClick={(e) => {
                e.stopPropagation();
                removeWatchedFromLocalStorage('watchedShows', props.id)
                dispatch(removeWatched(props.id))
            }} /> : <Logo className='episode-eye' onClick={(e) => {
                e.stopPropagation();
                saveWatchedToLocalStorage('watchedShows', props.id)
                dispatch(addWatched(props.id))
            }} />}
            {image?.medium ? <img src={image.medium} alt="image"/> :
                <div style={{width: '250px', height: '140px', background: "rgba(0,0,0,0.3)"}}/>
            }
            <p>{props.name}</p>
            <p>{props.number ? `S:${props.season} Episode: ${props.number}` : 'Special'}</p>
            <Modal
                show={showModal}
                setShow={hideShow}
            >
                <ModalHeader>
                    <h2>{props.name}</h2>
                </ModalHeader>
                <ModalBody>
                    {image?.medium ? <img src={image.medium} alt="image"/> :
                        <div style={{width: '250px', height: '140px', background: "rgba(0,0,0,0.3)"}}/>
                    }
                    <div className={'episode_info'}>
                        <h3>{`Season ${props.season} Episode ${props.number}`}</h3>
                        <div className={'episode_date'}>{'Premiered: ' + date}</div>
                    </div>

                    <p style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{__html: props.summary}} />
                </ModalBody>
                <ModalFooter>
                    <button className="episode_button" onClick={(e) => hideShow(e as any)}>
                        Close
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
const Description = ({name, description, className = '', items, ...props}: FormattedShow & PopupProps) => {
    const [episodes, setEpisodes] = useState([]);
    const dispatch = useAppDispatch()

    useEffect(() => {
        try {
            Promise.resolve(searchApi.searchEpisodesById(props.id)).then(setEpisodes)
        } catch (e) {
            console.log(e)
        }
    }, [props.id])

    return (
        <div className={`description ${className}`} onClick={() => dispatch(closeDrawer())}>
            <h2>{name}</h2>
            {description && <div className="description-description" dangerouslySetInnerHTML={{__html: description}}/>}
            {items && <ParamsController items={items}/>}
            <h3>Last Episodes</h3>
            <div className='description_episodes'>
                {episodes && episodes.slice(episodes.length - 10).reverse().map((episode, i) => <EpisodeCard key={'episode-' + i} {...episode}/>)}
            </div>
        </div>
    )
}

export default Description