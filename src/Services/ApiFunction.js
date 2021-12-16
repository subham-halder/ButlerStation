import axios from 'axios';
import { CONTANT_TYPE, BASE_URL, GEOCODE_API, API_KEY } from './Constant';

export const fetchLocationData = (url, params) => {
    return new Promise(async function (resolve, reject) {
        const responce = axios.get(`${GEOCODE_API}${url}${API_KEY}`, {})
            .then((respo) => {
                console.log("Get function response ==> ", respo)
                resolve(respo)
            })
            .catch((error) => {
                console.log("Get function error ==> ", error)
                reject(error)
            })
    })

}
