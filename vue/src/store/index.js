import axios from "axios"
import { createStore } from "vuex"
import axiosClient from "../axios"


const tempSurveys = [
    {
        id: 100,
        title: "Madriñan Computer Lab First 'Real' Fullstack App",
        slug: "madrian-computer-lab-first-real-fullstack-app",
        status: "draft",
        image: "/src/assets/MadriñanComLab.png",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, amet iure doloremque asperiores ea, cupiditate impedit earum, tempora blanditiis hic nam provident. Necessitatibus fugiat facilis perspiciatis repudiandae, veniam corrupti aperiam!",
        created_at: "2021-12-20 18:00:00",
        updated_at: "2021-12-20 18:00:00",
        expire_date: "2021-12-31 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, amet iure doloremque asperiores ea, cupiditate impedit earum, tempora blanditiis hic nam provident. Necessitatibus fugiat facilis perspiciatis repudiandae, veniam corrupti aperiam!",
                data: {
                    options: [
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Philippines" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United States" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Canada" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United Kingdom" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Germany" }
                    ]
                }
            },

            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, amet iure doloremque asperiores ea, cupiditate impedit earum, tempora blanditiis hic nam provident. Necessitatibus fugiat facilis perspiciatis repudiandae, veniam corrupti aperiam!",
                data: {
                    options: [
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Philippines" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United States" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Canada" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United Kingdom" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Germany" }
                    ]
                }
            },
            
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, amet iure doloremque asperiores ea, cupiditate impedit earum, tempora blanditiis hic nam provident. Necessitatibus fugiat facilis perspiciatis repudiandae, veniam corrupti aperiam!",
                data: {
                    options: [
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Philippines" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United States" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Canada" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United Kingdom" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Germany" }
                    ]
                }
            },
            
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, amet iure doloremque asperiores ea, cupiditate impedit earum, tempora blanditiis hic nam provident. Necessitatibus fugiat facilis perspiciatis repudiandae, veniam corrupti aperiam!",
                data: {
                    options: [
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Philippines" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United States" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Canada" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United Kingdom" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Germany" }
                    ]
                }
            },
            
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, amet iure doloremque asperiores ea, cupiditate impedit earum, tempora blanditiis hic nam provident. Necessitatibus fugiat facilis perspiciatis repudiandae, veniam corrupti aperiam!",
                data: {
                    options: [
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Philippines" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United States" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Canada" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "United Kingdom" },
                        { uuid: "f8af96f2-1d80-4632-9e9e-b60670e52ea", text: "Germany" }
                    ]
                }
            }
        ]
    }
]


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

        surveys: [...tempSurveys],
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

        getSurvey({ commit }, id) {
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
        }
    },
    modules: {}
})

export default store