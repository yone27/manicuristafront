import React, { useEffect, useState } from 'react'
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons'

import ItemList from "./ItemList";
import './List.css';
import { useDataLayerValue } from '../data/DataLayer'

const List = () => {
    const [{ tracks }] = useDataLayerValue();
    const [pagination, setPagination] = useState([])
    const [pageSize] = useState(3)
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        showPagination(tracks)
    }, [tracks])

    const showPagination = (_records, test = 0) => {
        setPagination(paginate(_records, pageSize, pageNumber, test))
    }

    const paginate = (array, page_size, page_number, test) => {
        let actPageNumner = 0
        if (test === 1) {
            actPageNumner = pageNumber + 1
            return array.slice((actPageNumner - 1) * page_size, actPageNumner * page_size)
        } else if (test === 2) {
            actPageNumner = pageNumber - 1
            return array.slice((actPageNumner - 1) * page_size, actPageNumner * page_size)
        } else {
            return array.slice((page_number - 1) * page_size, page_number * page_size)
        }
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1)
        showPagination(tracks, 1)
    }

    const previusPage = () => {
        setPageNumber(pageNumber - 1)
        showPagination(tracks, 2)
    }

    return (
        <>
            <section className="grid">
                <header className="grid-header">
                    <h1 className="title">Musics</h1>
                </header>
                
                {
                    pagination.length && (
                        pagination.map((track) => (
                            <ItemList trackItem={track} key={track.id} />
                        ))
                    )
                }

            </section>
            <footer className="pagination">
                {
                    pageNumber > 1 && (
                        <button onClick={previusPage}><ArrowBackIos /></button>
                    )
                }
                {
                    (pageNumber * pageSize) < tracks.length && (
                        <button onClick={nextPage}><ArrowForwardIos /></button>
                    )
                }
            </footer>
        </>
    );
}

export default List;