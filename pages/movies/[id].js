import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MoviesAPI from '../../lib/movies';
import Link from 'next/link';
import styles from './Layout.module.css';

export default function MovieDetail() {
    const router = useRouter();
    const [movie, setMovie] = useState({});

    const handleDelete = async () => {
        await MoviesAPI.delete(movie.id);
        router.push(`/`);
    };

    useEffect(() => {
        const getMovie = async () => {
            if (!router.isReady) return;
            const response = await MoviesAPI.findById(router.query.id);
            setMovie(response);
        };
        getMovie();
    }, [router.isReady]);

    return (
        <div className={styles.container}>
            {movie && (
                <>
                    <div>
                        <h1>{movie.title}</h1>
                        <p>{movie.description}</p>
                        <p>{movie.director}</p>
                        <p>{movie.year}</p>
                    </div>
                    <div>
                        <button><Link href={`/`}>Back</Link></button>
                        <button><Link href={`/movies/edit/${movie.id}`}>Edit</Link></button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}
