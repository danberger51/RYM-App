// CreatePage.js

import MovieForm from "../../Components/MovieForm";
import Link from "next/link";
import styles from "../movies/MovieDetail.module.css";

export default function CreatePage() {
    return (
        <div className={styles.formContainer}>
            <h1>Create Movie</h1>
            <div className={styles.buttonFormContainer}>
                <Link href={`/`}><p className={styles.button}>Back</p></Link>
                <MovieForm/>
            </div>
        </div>
    );
}
