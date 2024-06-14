// MovieDetail.js

import MoviesAPI from "../../lib/movies";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";

export default function MovieDetail() {
    const router = useRouter();
    const [movie, setMovie] = useState({});

    const handleDelete = async () => {
        await MoviesAPI.delete(movie.id);
        router.push(`/`);
    };

    useEffect(() => {
        const getMovie = async () => {
            if (!router.isReady) {
                return;
            }
            const response = await MoviesAPI.findById(router.query.id);
            setMovie(response[0]);
        };
        getMovie();
    }, [router.isReady]);

    return (
        <div className={styles.container}>
            <div className={styles.movieInfo}>
                <h1>{movie.title}</h1>
                <p><strong>Description:</strong> {movie.description}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Year:</strong> {movie.year}</p>
            </div>

            <div className={styles.buttonContainer}>
                <Link href={`/`}><p className={styles.button}>Back</p></Link>
                <Link href={`edit/${movie.id}`}><p className={styles.button}>Edit</p></Link>
                <button className={styles.button} onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const movie = await MoviesAPI.findById(context.params.id);
    return {
        props: {
            movie,
        },
    };
}
