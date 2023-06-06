import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5078'
})

export default class markupService {
    static async postMarkups(data) {
        return $api.post('/PhotoMarkup', {...data})
    }

}