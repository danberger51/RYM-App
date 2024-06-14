import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MovieForm from '../../../Components/MovieForm';
import MoviesAPI from '../../../lib/movies';
import styles from "../MovieDetail.module.css";

export default function EditMovie() {
    const router = useRouter();
    const [movie, setMovie] = useState({});

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
        <div className={styles.formContainer}>
            <h1>Edit Movie</h1>
            <div className={styles.buttonFormContainer}>
                <Link href={`/movies/${movie.id}`}><p className={styles.button}>Back</p></Link>
                <MovieForm movieToEdit={movie} />
            </div>
        </div>
    );
}
