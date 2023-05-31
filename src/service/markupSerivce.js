import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'https://b277-77-35-55-132.ngrok-free.app'
})

export default class markupService {
    static async postMarkups(data) {
        return $api.post('/PhotoMarkup', {...data})
    }

}