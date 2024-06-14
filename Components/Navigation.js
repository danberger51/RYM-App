import Link from "next/link"
import { useRouter } from 'next/router'
import styles from "./Navigation.module.css"

export default function Navigation() {
    const router = useRouter()

    return (
        <div className={styles.navigation}>
            <div className={styles.buttonContainer}>
                <ul>
                    <li>
                        <Link href="/movies/create">
                            <p className={styles.button}>Create</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <p className={styles.button}>Home</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
