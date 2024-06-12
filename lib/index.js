/**
 *
 * @param method HTTP-Method to be used
 * @returns {(function(String, Object, boolean=): Promise<Response|any>)|*} URL, Params, expectNoBody
 * @desc Returns a Function with desired HTTP-Method. In the returned function, url,
 * params (such as body) and whether a response Body is expected can be specified
 *
 *
 */
function createFetchFunction(method) {
    return async (url, params, expectNoBody = false) => {
        const _params = {
            method,
            headers: {
                "content-type": "application/json",
            },
            ...params
        }

        if (_params.body !== undefined) {
            _params.body = JSON.stringify(_params.body)
        }

        const response = await fetch(url, _params)

        if (!response.ok) {
            if (response.status === 401) {
                const text = await response.text()
            }

            const error = new Error("Request failed with status " + response.status)
            error.response = response
            throw error
        }
        if (expectNoBody) {
            return response
        }
        let data = await response.json();
        return data
    }
}

export const getJSON = createFetchFunction("GET")
export const BASE_URL = "https://rym-function-app01.azurewebsites.net/api/movies"
export const postJSON = createFetchFunction("POST")
export const putJSON = createFetchFunction("PUT")
export const deleteJSON = createFetchFunction("DELETE")