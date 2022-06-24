import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Registration from "../views/Registration.vue"

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard
    },
    
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router