<template>
    <div class="top-header">
		<div class="user">
			<div class="user__info">
				<div class="user__info-avatar shadow-md"></div>
				<h2 class="user__info-name">Hi, {{userCurrent.displayName}}</h2>
			</div>
			<div class="user__notify">
				<i class="icofont-alarm"></i>
			</div>
		</div>
    </div>
</template>

<script>
import {getUser} from '../../composables/getUser'

export default {
    name: 'TopHeader',
    setup () {
        const {userCurrent} = getUser()

        return {
            userCurrent,
        }
    }
}
</script>
<style lang="scss" scoped>
.top-header {
	padding: 12px;
	background: $primary-color;  

	.user {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&__info {
			display: flex;
			align-items: center;
			&-avatar {
				width: 40px;
				height: 40px;
		
				display: flex;
				align-items: center;
				justify-content: center;
		
				background-color: #fff;
				color: #fff;
		
				border-radius: 50%;
			}
		
			&-name {
				margin-left: 12px;
		
				color: #fff;
				font-weight: 500;
				font-style: italic;;
			}
		}

		&__notify {
			color: #fff;
			font-size: 20px;
			cursor: pointer;
		}
	}
}
</style>