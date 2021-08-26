import axios from "axios";

const request = axios.create({
    baseURL: `http://3.141.23.218:5000/`,
    timeout: 10000,
})

request.interceptors.request.use(config => {
    config.headers['token']='123';
    return config;
}, error => {
    return Promise.reject(error)
})

request.interceptors.response.use(res => {
    if (res.data.code === 500) {
        console.log(`服务器错误`);
    }
    if (res.data.code === 501) {
        console.log(`token失效`);
    }
    return res.data;
}, error => {
    if (error.toJSON().message === 'Network Error') {
        console.log(`断网了`);
    }
    return Promise.reject(error)
})

export default request;