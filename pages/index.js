import React from "react";
import MoviesAPI from "../lib/movies";
import Movie from "../Components/Movie"
import Link from "next/link";
import styles from "../Components/Movie.module.css";
export default function HomePage({ movies }) {
    return (
        <div className={styles.pageContainer}>
            {movies.map((movie) => (
                <Movie key={movie.id} props={movie} />
            ))}
        </div>
    );
}
export async function getServerSideProps() {
    const movies = await MoviesAPI.findAll();
    return {
        props: { movies }
    };
}