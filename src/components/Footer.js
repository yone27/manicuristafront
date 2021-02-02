import React from 'react'
import { PlayArrow, ArrowLeft, ArrowRight, PauseCircleOutline } from '@material-ui/icons'

import './Footer.css';
import { useSoundLayerValue } from "../data/SoundLayer";
import { useDataLayerValue } from '../data/DataLayer'

const Footer = () => {
    const [{ audio, playing }, soundDispatch] = useSoundLayerValue();
    const [{ track, tracks }, dispatch] = useDataLayerValue();

    const startPlaying = () => {
        if (track) {

            soundDispatch({
                type: "SET_PLAYING",
                playing: true
            });
        }
    };

    const stopPlaying = () => {
        if (track) {
            soundDispatch({
                type: "SET_PLAYING",
                playing: false
            });
        }
    };

    const nextTrack = () => {
        if (tracks.length) {
            tracks.map((value, index) => {
                if (value.id === track.id) {
                    // Cuando no haya mas musicas no seguira avanzando
                    if ((index + 1) < tracks.length) {
                        dispatch({
                            type: "SET_TRACK",
                            track: tracks[index + 1]
                        });

                        audio.src = tracks[index + 1].preview_url

                        soundDispatch({
                            type: 'SET_AUDIO',
                            audio: audio
                        });

                        if (playing) {
                            soundDispatch({
                                type: 'SET_PLAYING',
                                playing: true,
                            });
                        }
                    }
                }
            })
        }
    };

    const prevTrack = () => {
        if (tracks.length) {
            tracks.map((value, index) => {
                if (value.id === track.id) {
                    // Cuando no haya mas musicas no seguira retrocediendo
                    if ((index - 1) >= 0) {
                        dispatch({
                            type: "SET_TRACK",
                            track: tracks[index - 1]
                        });

                        audio.src = tracks[index - 1].preview_url

                        soundDispatch({
                            type: 'SET_AUDIO',
                            audio: audio
                        });

                        if (playing) {
                            soundDispatch({
                                type: 'SET_PLAYING',
                                playing: true,
                            });
                        }
                    }
                }
            })
        }
    };

    return (
        <footer className="footer">
            <div className="info__music">
                {
                    track && (
                        <>
                            <aside className="info__music-imgContainer">
                                <figure>
                                    <img src={track.album.images[0].url ? track.album.images[0].url : ''} className="info__music-img" alt="Img" />
                                </figure>
                            </aside>
                            <header className="info__music-content">
                                {
                                    track && (
                                        <>
                                            <h2>{track.name ? track.name : ''}</h2>
                                            <p>{track.artists.map((artist) => artist.name).join(", ") ? track.artists.map((artist) => artist.name).join(", ") : ''}</p>
                                        </>
                                    )
                                }
                            </header>
                        </>
                    )
                }
            </div>
            <div className="player">
                <button className="btn btn-back" onClick={prevTrack}><ArrowLeft /></button>
                {playing
                    ?
                    <button className="btn btn-play"><PauseCircleOutline onClick={stopPlaying} /> </button>
                    :
                    <button className="btn btn-play"><PlayArrow onClick={startPlaying} /> </button>
                }
                <button className="btn btn-next" onClick={nextTrack}><ArrowRight /></button>
            </div>
        </footer>
    );
}

export default Footer;