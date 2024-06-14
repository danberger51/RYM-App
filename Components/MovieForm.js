import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import MoviesAPI from '../lib/movies';
import styles from "./MovieForm.module.css"

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
        console.log("Trying to create the movie: " + JSON.stringify(movie))
        setIsLoading(true)
        if (movie.id) {
            const updatedMovie = await MoviesAPI.update(movie, movie.id)
            setMovie(updatedMovie)
            router.push(`/movies/${movie.id}`)
        } else {
            const newMovie = await MoviesAPI.create(movie)
            router.push(`/`)
        }
        setIsLoading(false)
    }
    return (
        <div className={styles['form-container-styling']}>
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
                <div className={styles.buttonContainer}><button className={styles.button} disabled={isLoading}>
                    {isLoading ? "...is lading" : "Submit"}
                </button></div>
                
            </form>
        </div>
    )
}
