<template>
  <div class="card-list">
      <CardItem :cardList="cardList"/>
  </div>
</template>

<script>
import {ref} from 'vue'
import CardItem from './CardItem.vue'

export default {
    name: 'CardList',
    components: {
        CardItem
    },
    setup () {
        const cardList = ref([
            {
                name: 'Budget', 
                title: 'Quản lý thu chi', 
                description: 'Giúp bạn kiểm soát ngân sách tốt hơn.',
                color: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)'
            },
            {
                name: 'SavingsPlans', 
                title: 'Kế hoạch tiết kiệm', 
                description: 'Giúp bạn theo dõi tiến độ kế hoạch tiết kiệm.',
                color: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)'
            }
        ])


        return {
            cardList
        }
    }
}
</script>

<style lang="scss" scoped>
.card-list {
    width: 90%;
    margin: 0 auto;
    padding: 64px 0;

    display: flex;
    flex-direction: column;
}
</style>