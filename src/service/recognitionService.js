import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'https://c687-86-102-7-246.ngrok-free.app'
})

export default class recognitionService {
    static async getMarkups(photo) {
        return $api.post('/Recognition', {Image: photo})
    }

}