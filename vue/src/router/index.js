import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "../components/DefaultLayout.vue"
import AuthLayout from "../components/AuthLayout.vue"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Registration from "../views/Registration.vue"
import Survey from "../views/Survey.vue"
import SurveyView from "../views/SurveyView.vue"
import store from "../store"

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: DefaultLayout,
        meta: { requiresAuth: true }, // THIS WILL MAKE RESTRICTION IN ACCESSING DASHBOARD, IF USER HASN'T LOGGED IN, THEN HE/SHE CAN'T ACCESS THE PAGE
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
            { path: "/survey", name: "Survey", component: Survey },
            { path: "/survey/create", name: "SurveyCreate", component: SurveyView },
            { path: "/survey/:id", name: "SurveyView", component: SurveyView }
        ]
    },
    
    {
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        meta: { isGuest: true }, // THIS WILL BE USED FOR VALIDATION
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login
            },
            
            {
                path: "/register",
                name: "Registration",
                component: Registration
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // BELOW IS A SIMPLE VALIDATION
    // IF NOT YET LOGGED IN, THEN USER HAS TO LOGIN BEFORE ACCESSING SPECIFIC PAGE
    if (to.meta.requiresAuth && !store.state.user.token) 
    {
        next({ name: "Login" })
    }

    // IN CASE THAT USER IS ALL READY LOGGED IN AND ACCIDENTALLY GOES TO LOGIN OR REGISTRATION PAGE, WE'LL REDIRECT TO Dashboard PAGE
    else if (store.state.user.token && (to.meta.isGuest)) 
    {
        next({ name: "Dashboard" })
    }

    else 
    {
        next()
    }
})

export default router