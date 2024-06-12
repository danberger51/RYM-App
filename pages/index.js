import React from "react";
import MoviesAPI from "../lib/movies";
import Movie from "../Components/Movie"
import Link from "next/link";
export default function HomePage({ movies }) {
    return (
        <div>
            <button><Link className="button" href={`/movies/create`}>Create</Link></button>
            {movies.map((movie) => {
                return (
                    <div key={`movie-${movie.id_movie}`}>
                        <div>
                            <Movie props={movie} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export async function getServerSideProps() {
    const movies = await MoviesAPI.findAll();
    return {
        props: { movies }
    };
}