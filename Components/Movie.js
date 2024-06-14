import Link from "next/link";
import styles from "./Movie.module.css";

export default function Movie({ props }) {
    const MovieURL = `/movies/`;
    return (
        <div className={styles.drinks}>
            <h2 className={styles.drinksTitle}>{props.title}</h2>
            <div className={styles.container}>
                <p>{props.description}</p>
                <Link href={`${MovieURL}${props.id}`}>
                    <p className={styles.button}>Detail</p>
                </Link>
            </div>
            <hr />
        </div>
    );
}
