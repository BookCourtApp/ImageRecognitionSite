import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5078'
})

export default class recognitionService {
    static async getMarkups(photo) {
        return $api.post('/Recognition', {Image: photo})
    }

}