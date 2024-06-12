import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import MoviesAPI from '../lib/movies';

const defaultMovie = {
    "title": "",
    "director": "",
    "description": "",
    "year": 0
}

export default function PostForm({ movieToEdit = null }) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [movie, setMovie] = useState(defaultMovie)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (movieToEdit !== null) {
            setMovie(movieToEdit)
        }
        console.log(movie)
    }, [movieToEdit])

    const handleChange = (e) => {
        setError(false)
        const name = e.target.name
        const text = e.target.value
        setMovie({
            ...movie,
            ...{ [name]: text }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (movie.title == "" || movie.director == "" || movie.description == "" || movie.year == 0) {
            setError(true)
            return
        }

        setIsLoading(true)
        if (movie.id) {
            const updatedMovie = await MoviesAPI.update(movie, movie.id)
            console.log(movie)
            setMovie(updatedMovie)
            router.push(`/films/${movie.id}`)
        } else {
            console.log("Trying to create the movie: " + JSON.stringify(movie))
            const newMovie = await MoviesAPI.create(movie)
            router.push(`/movies/${newMovie.id}`)
        }
        setIsLoading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {error && <p>fields can not be empty</p>}
                    <label htmlFor="title">Title</label>
                    <div>
                        <input onChange={handleChange} value={movie.title} type="text" name="title" id="title" placeholder="Title" />
                    </div>
                </div>
                <div>
                    <label htmlFor="director">Director</label>
                    <div>
                        <textarea onChange={handleChange} value={movie.director} type="text" name="director" id="director" placeholder="director" />
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <div>
                        <textarea onChange={handleChange} value={movie.description} type="text" name="description" id="description" placeholder="description" rows="5" />
                    </div>
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <div>
                        <input onChange={handleChange} value={movie.year} type="number" name="year" id="year" placeholder="year" />
                    </div>
                </div>

                <button className={"button"} disabled={isLoading}>
                    {isLoading ? "...is lading" : "Submit"}
                </button>
            </form>
        </div>
    )
}
