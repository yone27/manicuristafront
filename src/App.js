import React, { useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-js"

import List from "./components/List"
import Search from "./components/Search"
import Footer from "./components/Footer"
import Login from "./login//Login"
import './App.css'
import { getTokenFromUrl } from "./spotify"
import { useDataLayerValue } from './data/DataLayer'

const spotify = new SpotifyWebApi()

const App = () => {
    const [{ token }, dispatch] = useDataLayerValue();

    useEffect(() => {
        // const hash = getTokenFromUrl();
        // window.location.hash = "";
        // let _token = hash.access_token;
        const _token = "BQBYiE64mK6uqbgmNjYZ4i8x-PlZTTxpCi7lDEOU1euqjwTBRD0Wlhe5ZoyqU2WuoaDkyfaPmXfB5j6lzmnbx9W15lpgH_Nu9OnHeEmAKHs8XJ15_eIJHx_oIkTfkWnv_A6IY6MDHKZDCy36HXkgjSihGMSWOOolAhcIVX_cJZIOLbol";
        if (_token) {
            dispatch({
                type: "SET_TOKEN",
                token: _token
            });

            spotify.setAccessToken(_token);
        }
    }, []);

    // useEffect(() => {
    //     const hash = getTokenFromUrl();
    //     window.location.hash = "";
    //     let _token = hash.access_token;
    //     if (_token) {
    //         s.setAccessToken(_token);
    //         dispatch({
    //             type: "SET_SPOTIFY",
    //             spotify: s,
    //         });

    //         s.getMe().then((user) => {
    //             dispatch({
    //                 type: "SET_USER",
    //                 user,
    //             });
    //         });
    //     }
    // }, [token, dispatch]);

    return (
        <>
            {token ? (
                <>
                    <main className="section">
                        <Search spotify={spotify} />
                        <List />
                    </main>
                    <Footer />
                </>
            ) : <Login />}
        </>
    );
}

export default App;
