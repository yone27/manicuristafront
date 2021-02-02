import React, { useState } from "react";
import { SearchOutlined } from '@material-ui/icons'

import { useDataLayerValue } from '../data/DataLayer'
import { useSoundLayerValue } from '../data/SoundLayer';
import './Search.css';

const Search = ({ spotify }) => {
    const [search, setSearch] = useState('Tania Bowra')
    const [, dispatch] = useDataLayerValue();
    const [{ repeat }, soundDispatch] = useSoundLayerValue();

    const handleSearch = async () => {
        try {
            spotify.searchTracks(search, { limit: 5 })
                .then(res => {
                    dispatch({
                        type: "SET_TRACKS",
                        tracks: res.tracks.items
                    });

                    dispatch({
                        type: "SET_TRACK",
                        track: res.tracks.items[0]
                    });

                    let audio = new Audio(res.tracks.items[0].preview_url);
                    audio.loop = repeat;

                    soundDispatch({
                        type: 'SET_AUDIO',
                        audio: audio
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error);
        }
    }

    // leer los datos del formulario
    const changeState = e => {
        // almacenando lo que el usuario escribe en el state
        setSearch(e.target.value)
    }

    return (
        <aside className="searh">
            <div className="search__container">
                <form className="search__container" onSubmit={handleSearch}>
                    <button className="search__icon" type="submit" onClick={handleSearch}><SearchOutlined /></button>
                    <input required className="search__input" type="text" placeholder="Search for songs, artist..." onKeyDown={(event) => event.key === 'Enter' && handleSearch} onChange={changeState} />
                </form>
            </div>
            <h1 className="namePage">
                Music <span>Fy</span>
            </h1>
        </aside>
    );
}

export default Search;