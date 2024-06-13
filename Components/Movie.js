import Link from "next/link";

export default function Movie({ props }) {
    const MovieURL = `/movies/`
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.director}</p>
            <button><Link href={`${MovieURL}${props.id}`}>Detail</Link></button>
            <hr />
        </div >
    )
}