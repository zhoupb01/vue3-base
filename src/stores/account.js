import {ref} from "vue"
import {defineStore} from "pinia"
import request from "@/tools/request"

export const useAccountStore = defineStore("account", () => {
    const id = ref()
    const username = ref()
    const avatar = ref()
    const type = ref()

    function fetchInfo() {
        request.get("/api/v1/members/info").then(resp => {
            this.username = resp.data.name
        })
    }

    return {id, username, avatar, fetchInfo, type}
})
