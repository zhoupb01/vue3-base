<script setup>
import {RouterView} from "vue-router"
import {dateZhCN, NConfigProvider, NDialogProvider, NMessageProvider, zhCN} from "naive-ui"
import {useAccountStore} from "@/stores/account"
import {onMounted} from "vue"
import {getToken} from "@/tools/index.js"

onMounted(() => {
    if (getToken())
        useAccountStore().fetchInfo()
})
</script>

<template>
    <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
        <NMessageProvider>
            <NDialogProvider>
                <RouterView />
            </NDialogProvider>
        </NMessageProvider>
    </NConfigProvider>
</template>
