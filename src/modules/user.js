import {
    http
} from '../axios';
import setAuth from "../set-auth";

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
};

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
};

const actions = {
    login({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            http.post(`/api/login`, {
                email: payload.email,
                password: payload.password
            }).then(response => {
                const token = 'Bearer ' + response.data.token
                localStorage.setItem('token', token)
                setAuth(http)
                resolve(response.data.message)
            }).catch(error => {
                localStorage.removeItem('token')
                reject(error.message)
            })
        });
    },
    register({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            http.post(`/api/register`, {
                username: payload.username,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation
            }).then(response => {
                const token = 'Bearer ' + response.data.token
                localStorage.setItem('token', token)
                setAuth(http)
                resolve(response.data.message)

            }).catch(error => {
                localStorage.removeItem('token')
                reject(error.message)
            })
        });
    },
    logout({
        commit
    }) {
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            setAuth(http)
            commit('logout');
            resolve()
        })
    }



};

const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, token) {
        state.status = 'success'
        state.token = token
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.token = '';
    },
    showLogin(state, show) {
        state.showLogin = show
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}