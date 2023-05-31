import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001'
})

export default class recognitionService {
    static async getMarkups(photo) {
        return $api.post('/Recognition', {image: photo})
    }

}