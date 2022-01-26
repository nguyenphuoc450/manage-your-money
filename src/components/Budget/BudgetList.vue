<template>
  <div class="budget-list">
    <p>Filter: Ngày - Tất cả - Khoản thu - Khoản chi.</p>
    <div class="header grid">
        <span>Ngày</span>
        <span>Khoản</span>
        <span>Số tiền</span>
        <span>Lý do</span>
        <span class="hidden">Ghi chú</span>
    </div>
    <div class="item grid" v-for="item in budgetList" :key="item.id">
        <span>
            {{formatDate(item.data().date)}}
        </span>
        <span>
            {{formatTextType(item.data().type)}}
        </span>
        <span v-if="item.data().type === 'spending'" class="type--spending">
            -{{formatMoney(item.data().money)}}
        </span>
        <span v-else class="type--earning">
            +{{formatMoney(item.data().money)}}
        </span>
        <span>
            {{formatTextOption(item.data().option)}}
        </span>
        <span class="hidden">{{item.data().note}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BudgetList',
    props: {
        budgetList: Array
    },
    setup () {
        function formatMoney(money) {
            return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        }

        function formatTextType(type) {
            return type === 'spending'  ? 'Chi' : 'Thu'
        }

        function formatTextOption(option) {
            const options = ['eating', 'gasoline', 'shopping', 'house-money', 'other', 'salary', 'bonus', 'overtime', 'sell']
            const index = options.findIndex((text) => text.includes(option))
            const texts = ['Ăn uống', 'Đổ xăng', 'Mua đồ', 'Tiền nhà', 'Khác', 'Tiền lương', 'Tiền thưởng', 'Làm thêm', 'Bán đồ']
            return texts[index]
        }

        function formatDate(date) {
           return date.split("-").reverse().join("/"); 
        }

        return {
            formatMoney,
            formatTextType,
            formatTextOption,
            formatDate
        }
    }
}
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 12px;
}
.header {
    margin-top: 12px;
    span {
        font-weight: 700;
        text-align: center;
    }
}
.item {
    padding: 12px 0;
    span {
        text-align: center;
        font-size: 14px;
    }

    .type--spending {
        color: $color-red;
    }
    .type--earning {
        color: $color-green;
    }
}
</style>