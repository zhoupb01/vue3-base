import {createRouter, createWebHistory} from "vue-router"
import {getToken} from "@/tools"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: {name: "SignIn"}
        },
        {
            path: "/sign-in",
            name: "SignIn",
            meta: {
                title: "登录"
            },
            component: () => import("../views/SignIn.vue"),
        },
        {
            path: "/admin",
            meta: {
                auth: true,
            },
            component: () => import("../views/admin/Layout.vue"),
            children: [
                {
                    path: "",
                    name: "Admin",
                    redirect: {name: "AdminIndex"}
                },
                {
                    path: "index",
                    name: "AdminIndex",
                    meta: {
                        title: "仪表盘"
                    },
                    component: () => import("../views/admin/Index.vue"),
                }
            ]
        }
    ],
})

router.beforeEach((to) => {
    const token = getToken()
    if (to.meta.auth && !token) {
        return {
            name: "SignIn"
        }
    }
    // if (to.name === "SignIn" && token) {
    //     return {
    //         name: "Index"
    //     }
    // }
    if (to.meta.title) {
        document.title = `${to.meta.title}`
    }
})


export default router
