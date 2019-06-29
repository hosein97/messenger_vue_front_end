import {
    http
} from '../axios';

const state = {};

const getters = {};

const actions = {
    getChats() {
        return new Promise((resolve, reject) => {
            http.get(`/api/chats`).then(response => {
                console.log(response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error.message)
            })
        });
    }


};

const mutations = {

};

export default {
    state,
    getters,
    actions,
    mutations
}