<script setup>
import { ref, reactive } from "vue"
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui"
import request from "@/tools/request"
import { useAccountStore } from "@/stores/account"
import { useRouter } from "vue-router"
import { setToken } from "@/tools"

const rules = {
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, message: "长度在 3 到 16 个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur", },
        { min: 6, message: "长度在 6 到 16 个字符", trigger: "blur" }
    ],
}

const form = reactive({
    username: "",
    password: "",
})

const formRef = ref()
const message = useMessage()
const accountStore = useAccountStore()
const router = useRouter()

function handleSignIn() {
    formRef.value?.validate(errors => {
        if (errors)
            return
        request.post("/api/v1/users/login", {
            id_number: form.username,
            password: form.password
        }).then(resp => {
            setToken(resp.token)
            message.success("登录成功")
            router.push({ name: "Admin" })
            accountStore.fetchInfo()
        }).catch(err => {
            message.error(err)
        })
    })
}
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <NCard title="登录" hoverable :segmented="{ content: true }" class="w-[500px]">
            <NForm :model="form" :rules="rules" ref="formRef">
                <NFormItem label="用户名" path="username">
                    <NInput type="text" placeholder="请输入用户名" v-model:value="form.username" />
                </NFormItem>
                <NFormItem label="密码" path="password">
                    <NInput type="password" placeholder="请输入密码" show-password-on="mousedown" v-model:value="form.password" @keydown.enter="handleSignIn" />
                </NFormItem>
                <NButton type="primary" block @click="handleSignIn">登 录</NButton>
            </NForm>
        </NCard>
    </div>
</template>
