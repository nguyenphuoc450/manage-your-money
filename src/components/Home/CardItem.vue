<template>
  <router-link class="card shadow-md" 
    v-for="card in cardList" 
    :key="card.name"
    :to="{name: card.name}"
    :style="{backgroundImage: card.color}"
  >
      <h2>{{card.title}}</h2>
      <p>{{card.description}}</p>
  </router-link>
</template>

<script>
export default {
    name: 'CardItem',
    props: {
        cardList: Array
    }
}
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    height: 100%;
    padding: 48px 24px;

    // background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
    color: #fff;

    border-radius: 4px;
    transition: all ease 0.3s;

    & + .card {
        margin-top: 24px;
    }

    &:hover {
        transform: scale(1.01);
    }

    h2 {
        margin-bottom: 6px;
        font-size: 24px;
        text-decoration: underline;
    }

    p {
        font-style: italic;
    }
}
</style>