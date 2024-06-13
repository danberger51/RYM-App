import Image from "next/image";
import styles from "./Layout.module.css"

export default function Layout({ children }) {
    return (
        <>
            <header className={styles.header} >
                <Image
                    src="/logo.png"
                    alt="Logo RYM"
                    width={160}
                    height={60}
                />
            </header>
            <div>
                {children}
            </div>
        </>
    );
}