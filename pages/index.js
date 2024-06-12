import React from "react";
import MoviesAPI from "../lib/movies";
import Movie from "../Components/Movie"
import Link from "next/link";

export default function HomePage({ movies }) {
    const inseratURL = '/movies/'
    return (
        <div>
            {movies.map((movie) => {
                return (
                    <div key={`inserat-${movie.id_movie}`}>
                        <div>
                            <Movie props={movie} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export async function getServerSideProps(context) {
    const movies = await MoviesAPI.findAll();
    return {
        props: { movies }
    };
}