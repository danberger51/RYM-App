import MovieForm from "../../Components/MovieForm"
import Link from "next/link";

export default function CreatePage() {
    return (
        <>
            <h1>Create Movie</h1>
            <MovieForm />
            <button><Link className="button" href={`/`}>Back</Link></button>
        </>
    );
}