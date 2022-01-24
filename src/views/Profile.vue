<template>
  <div class="profile">
      <NavigationTop/>
      <div class="container">
        <div class="info">
            <div 
                class="info__avatar shadow-md"
                :style="{backgroundImage: `url(${userCurrent.photoURL})`}"
            ></div>
            <span class="info__name">
                {{userCurrent.displayName}}
            </span>
            <span class="info__email">
                {{userCurrent.email}}
            </span>
        </div>
        <div class="btn btn-update-avatar rounded" @click="openPopup">
            <i class="icofont-refresh"></i>
            <span>Cập nhật ảnh đại diện</span>
            <div class="popup" v-if="isPopup">
                <div class="popup-file">
                    <input type="text" v-model="fileAvatar" placeholder="Nhập URL ảnh">
                    <div class="actions">
                        <button class="btn" @click="handleUpdateAvatar">Cập nhật</button>
                        <button class="btn" @click.stop="isPopup = !isPopup">Đóng</button>
                    </div>
                </div>
                <div class="overlay" @click.stop="isPopup = !isPopup"></div>
            </div>
        </div>
        <router-link :to="{name: 'ResetPassword'}" class="btn rounded">
            <i class="icofont-key"></i>
            <span>Đổi mật khẩu</span>
        </router-link>
        <div class="btn btn-logout rounded" @click="logout">
            <i class="icofont-logout"></i>
            <span>Đăng xuất</span>
        </div>
      </div>
      <NavigationBottom/>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import NavigationTop from '../components/NavigationTop.vue'
import NavigationBottom from '../components/NavigationBottom.vue'
import {getUser} from '../composables/getUser'
import {useUpdateProfile} from '../composables/useUpdateProfile'
import firebase from 'firebase'

export default {
    name: 'Profile',
    components: {
        NavigationTop,
        NavigationBottom
    },
    setup () {
        const {userCurrent} = getUser()
        const router = useRouter()

        // Logout
        async function logout() {
            await firebase.auth().signOut()
            await router.push({name: 'Index'})
        }

        // Update Avatar
        const isPopup = ref(false)
        const fileAvatar = ref('')
        const {error, isPending, updateAvatar} = useUpdateProfile()

        function openPopup() {
            isPopup.value = true
        }

        async function handleUpdateAvatar() {
            await updateAvatar(fileAvatar.value)
            isPopup.value = false
            fileAvatar.value = ''
        }

        return {
            userCurrent,
            logout,
            isPopup,
            openPopup,
            fileAvatar,
            error,
            isPending,
            handleUpdateAvatar,
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    .container {
        padding: 24px;
    
        .info {
            display: flex;
            flex-direction: column;
            align-items: center;

            &__avatar {
                width: 60px;
				height: 60px;
		
				display: flex;
				align-items: center;
				justify-content: center;
		
				background-color: #fff;
                background-size: cover;
                background-repeat: no-repeat;

				border-radius: 50%;
            }

            &__name {
                margin: 12px 0 6px;
            }
            
            &__email {
                color: $color-gray;
                margin-bottom: 12px;
            }
        }

        .btn {
            display: block;
            padding: 12px;
            margin-top: 12px;

            background-color: #fff;
            color: $color-gray;

            transition: all ease 0.3s;
            cursor: pointer;

            &:hover {
                background-color: $primary-color;
                color: #fff;
            }

            span {
                margin-left: 6px;
            }
        }

        .btn-update-avatar {
            .popup {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                
                animation: fadeIn linear 0.3s;
                z-index: 1000;

                &-file {
                    width: 90%;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    right: 0;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    // justify-content: center;
                    
                    transform: translate(-50%, -50%);
                    z-index: 100;

                    input {
                        width: 100%;
                        padding: 12px;

                        color: #000;
                        outline: none;
                        border: 4px solid transparent;
                        border-radius: 4px;
                        transition: all ease 0.3s;

                        &:focus {
                            border-color: $primary-color;
                        }
                    }

                    .actions {
                        margin-top: 24px;
                        display: flex;
                        
                        .btn + .btn {
                            padding: 6px 12px;
                            margin-left: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>