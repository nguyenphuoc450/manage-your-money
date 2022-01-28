<template>
    <div class="list-btn">
        <router-link :to="{name: 'NewBudget'}" class="btn-add">
            <i class="icofont-ui-add"></i>
            <span>Tạo mới</span>
        </router-link>
        <div class="btn-refresh" @click="getBudget">Cập nhật</div>
    </div>
</template>

<script>
export default {
    name: 'ButtonActions',
    props: {
        getBudget: Function
    },
    setup () {
        function reload() {
            window.location.reload()
        }

        return {
            reload
        }
    }
}
</script>

<style lang="scss" scoped>
.list-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 24px 0;

    .btn-add, .btn-refresh {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 120px;
        padding: 6px 0;

        color: #fff;
        
        border-radius: 50px;
        transition: all ease 0.3s;
        cursor: pointer;

        span {
            margin-left: 6px;
        }
    }

    .btn-add {
        background-color: $primary-color;
        &:hover {
            background-color: $primary-color-hover;
        }
    }

    .btn-refresh {
        margin-left: 12px;
        background-color: $color-green;

        &:hover {
            background-color: $color-green-hover;
        }
    }
}
</style>