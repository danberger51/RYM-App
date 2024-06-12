import { useRouter } from 'next/router'

import MovieForm from "../../../Components/MovieForm"
import { useEffect, useState } from 'react';
import MoviesAPI from '../../../lib/movies';

export default function EditMovie() {

    const router = useRouter()
    const [movie, setMovie] = useState(null)

    const urlID = router.query.id

    useEffect(() => {
        let isMounted = true

        if (!router.isReady) return

        const loadMovie = async () => {
            const movie = await MoviesAPI.read(urlID)
            if (isMounted) {
                setMovie(movie)
            }
        }
        loadMovie()

        return () => isMounted = false
    }, [router])

    return (
        <>
            <h1>Edit Movie</h1>
            <MovieForm movie={movie} />
        </>
    );
}