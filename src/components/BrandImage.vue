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
    max-width: 400px;
    max-height: 400px;
    margin: 0 auto;
    img {
        object-fit: cover;
        border-radius: 4px;
    }
}
</style>