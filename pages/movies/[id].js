import MoviesAPI from "../../lib/movies";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function movieDetail() {
    const router = useRouter()
    const [movie, setMovie] = useState([])

    const handleDelete = async () => {
        await MoviesAPI.delete(movie.id)
        router.push(`/`)
    }
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
        <div >
            <div>
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <p>{movie.director}</p>
                <p>{movie.year}</p>
            </div>

            <div >
                <Link className="button" href={`/`}>Back</Link>
                <Link className="button" href={`edit/${movie.id}`}>Edit</Link>
                <Link className="button" onClick={handleDelete} href={`/`}>Delete</Link>
            </div>

        </div>
    )
}

export async function getServerSideProps(context) {
    const movie = await MoviesAPI.findById(context.params.id)
    console.log(`der Movie:`, movie)
    return {
        props: {
            movie
        }
    }
}