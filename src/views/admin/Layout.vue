<script setup lang="jsx">
import {useAccountStore} from "@/stores/account"
import {ChevronDownOutline, LogOutOutline, SpeedometerOutline} from "@vicons/ionicons5"
import {NAvatar, NDropdown, NIcon, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NMenu} from "naive-ui"
import {onMounted, ref} from "vue"
import {RouterLink, RouterView, useRouter} from "vue-router"
import {removeToken} from "@/tools"

onMounted(() => {
    current.value = router.currentRoute.value.name
})

const ASIDE_MENU_OPTIONS = [
    {
        key: "AdminIndex",
        icon: () => <NIcon><SpeedometerOutline /></NIcon>,
        label: () => <RouterLink to={{name: "AdminIndex"}}>Index</RouterLink>
    },
]

const dropdownOption = [
    {
        label: "退出登录",
        key: "logout",
        icon: () => <NIcon><LogOutOutline /></NIcon>,
        props: {
            onClick() {
                removeToken()
                router.push({name: "SignIn"})
            }
        }
    }
]

const router = useRouter()
const current = ref()
const collapsed = ref(false)
const accountStore = useAccountStore()
</script>

<template>
    <NLayout :content-style="{height: '100vh'}">
        <NLayoutHeader bordered>
            <header class="h-16 bg-[#F9FAFC] flex items-center justify-between px-6">
                <h1 class="h-12">TITLE</h1>
                <NDropdown :options="dropdownOption">
                    <div class="flex items-center cursor-pointer">
                        <NAvatar round src="/default-avatar.jpg" />
                        <span class="ml-2">{{ accountStore.username }}</span>
                        <NIcon class="ml-2">
                            <ChevronDownOutline />
                        </NIcon>
                    </div>
                </NDropdown>
            </header>
        </NLayoutHeader>
        <NLayout has-sider :content-style="{height: 'calc(100vh - 4rem - 1px)'}">
            <NLayoutSider
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                :collapsed="collapsed"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
            >
                <NMenu
                    v-model:value="current"
                    :collapsed="collapsed"
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    :options="ASIDE_MENU_OPTIONS"
                />
            </NLayoutSider>
            <NLayoutContent content-class="p-3 bg-[#EDECEC]">
                <RouterView />
            </NLayoutContent>
        </NLayout>
    </NLayout>
</template>
