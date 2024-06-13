import { useRouter } from 'next/router'

import MovieForm from "../../../Components/MovieForm"
import { useEffect, useState } from 'react';
import MoviesAPI from '../../../lib/movies';
import Link from 'next/link';

export default function EditMovie() {

    const router = useRouter()
    const [movie, setMovie] = useState([])

    const urlID = router.query.id

    useEffect(() => {
        const getMovie = async () => {
            if (!router.isReady) {
                return
            }
            const response = await MoviesAPI.findById(router.query.id)
            setMovie(response[0])
        }
        getMovie()
    }, [router.isReady]);

    return (
        <>
            <h1>Edit Movie</h1>
            <MovieForm movieToEdit={movie} />
            <button ><Link className="button" href={`/movies/${movie.id}`}>Back</Link></button >
        </>
    );
}