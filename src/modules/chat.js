import {
    http
} from '../axios';

const state = {};

const getters = {};

const actions = {
    getChats() {
        return new Promise((resolve, reject) => {
            http.get(`/api/chats`).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.message)
            })
        });
    },
    getChatMessages({}, {
        chatId
    }) {
        return new Promise((resolve, reject) => {
            http.get(`/api/chats/${chatId}`).then(response => {
                console.log(response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error.message)
            })
        });
    },

    addMessage({}, payload) {
        return new Promise((resolve, reject) => {
            http.post(`/api/chats/${payload.chatId}`, {
                text: payload.text
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                localStorage.removeItem('token')
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