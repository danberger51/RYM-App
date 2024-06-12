import MoviesAPI from "../../lib/movies";
import { useRouter } from "next/router";
import Link from "next/link";

export default function movieDetail({ movie }) {
    const router = useRouter()

    const handleDelete = async () => {
        await MoviesAPI.delete(movie)
        router.push(`/`)
    }
    return (
        <div className={styles['detail-container-styling']}>
            <div>
                <h1>{movie.title}</h1>
                <p></p>
                <p>{movie.director}</p>
                <p>{movie.year}</p>
            </div>

            <div className={styles['detail-buttons-container']}>
                <Link className="button" href={`/`}>Back</Link>
                <Link className="button" href={`edit/${movie.id}`}>Edit</Link>
                <Link className="button" onClick={handleDelete} href={`/`}>Delete</Link>
            </div>

        </div>
    )
}

export async function getServerSideProps(context) {
    const movie = await MoviesAPI.findById(context.params.id)
    return {
        props: {
            movie
        }
    }
}