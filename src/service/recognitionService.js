import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'https://ac05-5-143-53-222.ngrok-free.app'
})

export default class recognitionService {
    static async getMarkups(photo) {
        return $api.post('/Recognition', {Image: photo})
    }

}