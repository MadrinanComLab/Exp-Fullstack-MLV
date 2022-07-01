import axios from "axios"
import { createStore } from "vuex"
import axiosClient from "../axios"

const store = createStore({
    state: { // THIS IS WHAT WE CHANGE WHEN WE USE mutations
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN")
        },

        currentSurvey: {
            loading: false, // IF THE SURVEY IS IN LOADING STATE
            data: {}
        },

        surveys: {
            loading: false,
            data: []
        },

        questionTypes: [ "text", "select", "radio", "checkbox", "textarea" ]
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
        },

        saveSurvey({ commit }, survey) {
            delete survey.image_url
            let response

            if (survey.id) // WE'RE GOING TO UPDATE A SURVEY
            {
                response = axiosClient
                    .put(`/survey/${ survey.id }`, survey)
                    .then((res) => {
                        commit("setCurrentSurvey", res.data) // YOU CAN SEE setCurrentSurvey IN THE MUTATION BELOW
                        return res
                    })
            }

            else // WE'RE GOING TO CREATE A NEW SURVEY
            {
                response = axiosClient
                    .post("/survey", survey)
                    .then((res) => {
                        commit("setCurrentSurvey", res.data) // YOU CAN SEE setCurrentSurvey IN THE MUTATION BELOW
                        return res
                    })
            }

            return response
        },

        getSurvey({ commit }, id) { //===================================================>>> RETRIEVING "SINGLE" RECORD OF SURVEY
            commit("setCurrentSurveyLoading", true) // setCurrentSurveyLoading WAS DEFINED IN THE mutation BELOW

            return axiosClient.get(`/survey/${ id }`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data) // setCurrentSurvey WAS DEFINED IN THE mutation BELOW
                    commit("setCurrentSurveyLoading", false)
                    return res
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false)
                    throw err
                })
        },

        deleteSurvey({ }, id) {
            // WE CREATED A DELETE HTTP REQUEST METHOD USING AXIOS
            return axiosClient.delete(`/survey/${ id }`)
        },

        getSurveys({ commit }) { //===================================================>>> RETRIEVING "MULTIPLE" RECORD OF SURVEY
            commit("setSurveysLoading", true) // 'setSurveysLoading' IS DEFINED IN mutations
            return axiosClient.get("/survey")
                .then((res) => {
                    commit("setSurveysLoading", false) 
                    commit("setSurveys", res.data) // 'setSurveys' IS DEFINED IN mutations
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
        },

        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading
        },

        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data
        },

        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading
        },

        setSurveys: (state, surveys) => {
            state.surveys.data = surveys.data
        },
    },
    modules: {}
})

export default store