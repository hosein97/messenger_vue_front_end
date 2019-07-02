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
    getPermissions({}, {
        chatId
    }) {
        return new Promise((resolve, reject) => {
            http.get(`/api/chats/${chatId}/permissions`).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.message)
            })
        });
    },
    getMembers({}, {
        chatId
    }) {
        return new Promise((resolve, reject) => {
            http.get(`/api/chats/${chatId}/members`).then(response => {
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
                reject(error.message)
            })
        });
    },

    addChat({}, payload) {
        return new Promise((resolve, reject) => {
            http.post(`/api/chat`, {
                usernames: payload.usernames,
                chat_name: payload.chatName,
                is_group: payload.isGroup
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.message)
            })
        });
    },
    addMemberToChat({}, payload) {
        return new Promise((resolve, reject) => {
            http.post(`/api/chats/${payload.chatId}/members/add`, {
                usernames: payload.usernames
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.message)
            })
        });
    },
    deleteMemberFromChat({}, payload) {
        return new Promise((resolve, reject) => {
            http.post(`/api/chats/${payload.chatId}/members/delete`, {
                usernames: payload.usernames
            }).then(response => {
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