<template>
    <div class="image">
        <img src="../assets/images/index-image.jpg" alt="">
    </div>
</template>

<script>
export default {
    name: 'BrandImage'
}
</script>

<style lang="scss" scoped>
.image {
    img {
        object-fit: cover;
    }
}
</style>