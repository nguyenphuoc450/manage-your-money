<template>
  <div class="list-total">
    <div class="total-money shadow-sm">
        <h2>Tổng tiền:</h2>
        <span class="safe" v-if="totalMoney > 0">+{{formatMoney(totalMoney)}}</span>
        <span class="warning" v-else>{{formatMoney(totalMoney)}}</span>
    </div>
    <div class="grid">
        <div class="total-earning shadow-sm">
            <h2>Tổng khoản thu:</h2>
            <span class="safe">+{{formatMoney(totalEarning)}}</span>
        </div>
        <div class="total-spending shadow-sm">
            <h2>Tổng khoản chi:</h2>
            <span class="warning">-{{formatMoney(totalSpending)}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'  

export default {
    name: 'TotalMoney',
    props: {
        budgetList: Array
    },
    setup (props) {
        
        const totalEarning = computed(() => {
            return props.budgetList.reduce((preValue, currentValue) => {
                if(currentValue.data().type === 'earning') {
                    return preValue += currentValue.data().money
                } else {
                    return preValue += 0
                }
            }, 0)
        })

        const totalSpending = computed(() => {
            return props.budgetList.reduce((preValue, currentValue) => {
                if(currentValue.data().type === 'spending') {
                    return preValue += currentValue.data().money
                } else {
                    return preValue += 0
                }
            }, 0)
        })

        const totalMoney = computed(() => {
            return totalEarning.value - totalSpending.value
        })


        function formatMoney(money) {
            return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        }

        return {
            totalEarning,
            totalSpending,
            totalMoney,
            formatMoney
        }
    }
}
</script>

<style lang="scss" scoped>
.list-total {
    h2 {
        // color: $color-gray;
        font-style: italic;
    }
    span {
        color: $color-dark-blue;
        font-size: 14px;
    }
    .total-money {
        padding: 12px;
        background-color: #fff;
        border-radius: 4px;
    }
    .grid {
        margin-top: 12px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 12px;

        text-align: left;

        .total-earning, .total-spending {
            height: 100%;
            padding: 12px;
            background-color: #fff;
            border-radius: 4px;
        }
    }
    .warning {
        color: $color-red;
    } 
    .safe {
        color: $color-green;
    }
}
</style>