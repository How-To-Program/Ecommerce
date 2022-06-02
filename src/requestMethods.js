import axios from "axios";
import { useSelector } from "react-redux";
// const admin = useSelector(state => state.user.currentUser ? state.user.currentUser.isAdmin : state.user.currentUser)

const BASE_URL = "http://localhost:8080/api"
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTFjMzIwOGI5ZjkyNjljMDkxMGYzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTQzNTMzMCwiZXhwIjoxNjQ1Njk0NTMwfQ.41vP-_1XAfpRVB2YLlbWD3IPlzLWQ35oGinvhxwkRWM"
// const LOCAL1 = JSON.parse(localStorage.getItem("persist:root"))

const LOCAL = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null

const TOKEN = LOCAL === null ? "" : LOCAL.accessToken
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token: `Bearer ${TOKEN}`}
})