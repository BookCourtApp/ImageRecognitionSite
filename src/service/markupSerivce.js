import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'https://ac05-5-143-53-222.ngrok-free.app'
})

export default class markupService {
    static async postMarkups(data) {
        return $api.post('/PhotoMarkup', {...data})
    }

}