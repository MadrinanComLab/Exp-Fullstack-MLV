import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "../components/DefaultLayout.vue"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Registration from "../views/Registration.vue"
import Survey from "../views/Survey.vue"
import store from "../store"

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: DefaultLayout,
        meta: { requiresAuth: true }, // THIS WILL MAKE RESTRICTION IN ACCESSING DASHBOARD, IF USER HASN'T LOGGED IN, THEN HE/SHE CAN'T ACCESS THE PAGE
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard
            },
            
            {
                path: "/survey",
                name: "Survey",
                component: Survey
            }
        ]
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

router.beforeEach((to, from, next) => {
    // BELOW IS A SIMPLE VALIDATION
    if (to.meta.requiresAuth && !store.state.user.token) 
    {
        next({ name: "Login" })
    }

    else 
    {
        next()
    }
})

export default router