export default function HomePage() {
    return (
        <div>
            <h1>Hello world!</h1>
        </div>
    )
}
export async function getStaticProps(context) {
    const movies = await moviesAPI.findAll();
    return {
        props: { movies }, revalidate: 10
    };
}