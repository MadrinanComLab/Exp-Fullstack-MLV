import { createStore } from "vuex"
import axiosClient from "../axios"

const store = createStore({
    state: { // THIS IS WHAT WE CHANGE WHEN WE USE mutations
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN")
        }
    },
    getters: {},
    actions: {
        register({ commit }, user)
        {
            return axiosClient.post(
                "/register", // <-- THIS IS THE ROUTE WHERE WE WANT TO SEND DATA. SINCE THE BASE URL IS http://127.0.0.1:8000/api, THEN THIS REQUEST WILL GO TO: http://127.0.0.1:8000/api/register
                user //<------- THIS CONTAINS OF DATA THAT WE WANT TO SEND TO http://127.0.0.1:8000/api/register
                ).then(({ data }) => {
                    commit("setUser", data) // YOU CAN SEE setUser IN MUTATION BELOW. setUser IS A FUNCTION AND data IS THE DATA WE WANT TO PASS
                    return data
                })

            // CODE SNIPPET WAS THE FIRST METHOD WE USE ON HOW WE SEND REQUEST (DURING FIRST TESTING OF REGISTRATION), BUT SOON REPLACE BY AXIOS
            // // CODE BELOW WILL SIMULATE A POST REQUEST...
            // return fetch(`http://127.0.0.1:8000/api/register`, {
            //     headers: {
            //         "Content-Type": "application/json",
            //         Accept: "application/json"
            //     },
            //     method: "POST",
            //     body: JSON.stringify(user),
            // })
            // .then((res) => res.json())
            // .then((res) => {
            //     commit("setUser", res)
            //     return res
            // })
        },

        login({ commit }, user)
        {
            return axiosClient.post(
                "/login", // <-- THIS IS THE ROUTE WHERE WE WANT TO SEND DATA. SINCE THE BASE URL IS http://127.0.0.1:8000/api, THEN THIS REQUEST WILL GO TO: http://127.0.0.1:8000/api/login
                user //<------- THIS CONTAINS OF DATA THAT WE WANT TO SEND TO http://127.0.0.1:8000/api/login
                ).then(({ data }) => {
                    commit("setUser", data) // YOU CAN SEE setUser IN MUTATION BELOW. setUser IS A FUNCTION AND data IS THE DATA WE WANT TO PASS
                    return data
                })
        },

        logout({ commit }) {
            return axiosClient.post("logout")
                .then(res => {
                    commit("logout") // YOU CAN SEE logout IN MUTATION BELOW.
                    return res
                })
        }
    },
    mutations: { // WE CHANGE STATE HERE IN mutations
        logout: (state) => {
            state.user.data = {}
            state.user.token = null
            sessionStorage.removeItem("TOKEN")
        },

        setUser: (state, userData) => {
            state.user.token = userData.token
            state.user.data = userData.user
            sessionStorage.setItem("TOKEN", userData.token)
        }
    },
    modules: {}
})

export default store