import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'https://c687-86-102-7-246.ngrok-free.app'
})

export default class markupService {
    static async postMarkups(data) {
        return $api.post('/PhotoMarkup', {...data})
    }

}