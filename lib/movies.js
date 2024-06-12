import { BASE_URL, getJSON, postJSON, putJSON, deleteJSON } from "./index";

const MoviesAPI = {
    findAll() {
        return getJSON(`${BASE_URL}?_sort=-id`)
    },
    create(movie) {
        return postJSON(BASE_URL, { body: movie }, true)
    },
    update(movie, movieId) {
        console.log(movie, movieId)
        return putJSON(`${BASE_URL}/${movieId}`, { body: movie }, true)
    },
    delete(movieId) {
        return deleteJSON(`${BASE_URL}/${movieId}`)
    },

    findById(movieId) {
        return getJSON(`${BASE_URL}/${movieId}`);
    }

}
export default MoviesAPI;