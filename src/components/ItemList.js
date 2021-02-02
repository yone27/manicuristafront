import React, { useEffect, useState } from "react"

import { useDataLayerValue } from '../data/DataLayer';
import { useSoundLayerValue } from '../data/SoundLayer';
import AlertDialogSlide from './AlertDialogSlide';
import { PlayArrow, PauseCircleOutline } from '@material-ui/icons'

import './ItemList.css';

const ItemList = ({ trackItem }) => {
    const [{ track }, dispatch] = useDataLayerValue();
    const [{ playing, audio }, soundDispatch] = useSoundLayerValue();

    const changeTrack = async (e, trackItem) => {

        let oldTrack = track;
        dispatch({
            type: 'SET_TRACK',
            track: trackItem
        });

        // Si selecciona otra ponla
        if (oldTrack.preview_url !== trackItem.preview_url) {
            audio.src = trackItem.preview_url
            soundDispatch({
                type: 'SET_AUDIO',
                audio: audio
            });

            soundDispatch({
                type: 'SET_PLAYING',
                playing: true,
            });
        } else {
            // Si selecciona la misma pausala
            soundDispatch({
                type: 'SET_PLAYING',
                playing: !playing,
            });
        }
    };

    return (
        <article className={track.id === trackItem.id ? 'grid-item card active': 'grid-item card'}>
            <aside className="card__aside" onClick={(e) => changeTrack(e, trackItem)}>
                <figure>
                    {
                    track.id === trackItem.id ?
                        (
                            playing
                        ?
                        <button className="btn btn-play btn-pause"><PauseCircleOutline /> </button>
                        :
                        <button className="btn btn-play"><PlayArrow /> </button>
                        )
                        : (
                            <button className="btn btn-play"><PlayArrow /> </button>
                        )
                    }
                    <img src={trackItem.album.images[0].url} className="card__img" alt="Mi Img" />
                </figure>
            </aside>
            <header className="card__header">
                {/* <h3 className="card__title">{trackItem.name}</h3> */}
                <p>{trackItem.artists.map((artist) => artist.name).join(", ")}</p>
            </header>
            <footer className="card__action">
                {/* <p className="card__time">{trackItem.duration_ms}</p> */}
                <AlertDialogSlide track={trackItem} />
            </footer>
        </article>
    );
}

export default ItemList;