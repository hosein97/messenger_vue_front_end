export default function setAuth(axiosInstance) {
    const token = localStorage.getItem('token');
    if (token) {
        axiosInstance.defaults.headers.common['authorization'] = `${token}`
    } else {
        delete axiosInstance.defaults.headers.common['authorization']
    }
};