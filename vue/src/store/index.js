import { createStore } from "vuex"

const store = createStore({
    state: {
        user: {
            data: {
                name: "Juan Dela Cruz",
                email: "juandelacruz@example.com",
                imgUrl: "https://thumbs.dreamstime.com/z/illustration-cute-cartoon-male-character-holding-flag-philippines-against-virus-cute-boy-cartoon-character-208966316.jpg"
            },
            token: 123
        }
    },
    getters: {},
    actions: {},
    mutations: {
        logout: (state) => {
            state.user.data = {}
            state.user.token = null
        }
    },
    modules: {}
})

export default store