<template>
  <div class="budget-list">
      <h2 class="title">Danh sách</h2>
    <div class="filter">
        <input type="date" id="date" @change="getDate">
        <span class="filter-item" 
            @click="getType('')"
            :class="{active: selectedType === ''}"
        >
            Tất cả
        </span>
        <span class="filter-item" 
            @click="getType('earning')"
            :class="{active: selectedType === 'earning'}"
        >
            Khoản thu
        </span>
        <span class="filter-item" 
            @click="getType('spending')"
            :class="{active: selectedType === 'spending'}"
        >
            Khoản chi
        </span>
    </div>
    <div class="header grid">
        <span>Ngày</span>
        <span>Khoản</span>
        <span>Số tiền</span>
        <span>Lý do</span>
        <span class="hidden">Ghi chú</span>
        <span class="">Nút</span>
    </div>
    <div class="wrapper" v-if="allBugets.length">
        <div class="item grid" v-for="item in allBugets" :key="item.id">
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
            <div class="actions">
                <router-link :to="{name: 'BudgetDetail', params: {id: item.id}}" class="btn-item btn-edit">
                    Sửa
                </router-link>
                <span class="btn-item btn-delete" @click="deleteBudget(item.id)">Xóa</span>
            </div>
        </div>
    </div>
    <p class="none-item" v-else>Chưa có thông tin.</p>
  </div>
</template>

<script>
import {computed} from 'vue'

export default {
    name: 'BudgetList',
    props: {
        budgetList: Array,
        selectedDate: String,
        selectedType: String
    },
    emits: ['onSelected', 'onDeleteBudget'],
    setup (props, context) {
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

        // Filter
        function getDate(e) {
            context.emit('onSelected', e.target.value)
        }

        function getType(type) {
            context.emit('onSelected', type)
        }

        const allBugets = computed(() => {
            return props.budgetList.filter((i) => {
                // filter by date && type
                if(props.selectedType !== '' && props.selectedDate !== '') {
                    return i.data().date === props.selectedDate 
                        && i.data().type === props.selectedType
                }
                
                if(props.selectedType !== '') return i.data().type === props.selectedType
                if(props.selectedDate !== '') return i.data().date === props.selectedDate

                return i
            })
        })

        // Delete Budget
        function deleteBudget(id) {
            context.emit('onDeleteBudget', id)
        }

        return {
            formatMoney,
            formatTextType,
            formatTextOption,
            formatDate,
            getDate,
            allBugets,
            getType,
            deleteBudget
        }
    }
}
</script>

<style lang="scss" scoped>
.filter {
    display: flex;
    align-items: center;
    margin: 12px 0 24px;

    text-align: center;
    
    &-title {
        margin-right: 24px;
        font-weight: 700;
    }
    &-item {
        margin-left: 12px;
        padding: 6px 12px;
        background-color: #fff;

        outline: none;
        border: 1px solid $color-gray;
        border-radius: 4px;
        transition: all ease 0.3s;
        cursor: pointer;

        &:hover, &:focus, &.active {
            background-color: $primary-color;
            border-color: transparent;
            color: #fff;
        }
    }
    input {
        margin-left: 0;
        padding: 6px 12px;
        background-color: #fff;

        outline: none;
        border: 1px solid $color-gray;
        border-radius: 4px;
        cursor: pointer;
    }
}
.grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 12px;
    align-items: center;
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

    .actions {
        display: flex;
        justify-content: center;

        .btn-item {
            padding: 6px 12px;
            border: 1px solid $color-gray;
            border-radius: 4px;
            cursor: pointer;
            transition: all ease 0.3s;

            &:hover {
                color: #fff;
                border-color: transparent;
            }
        }
        .btn-edit {
            &:hover {
                background-color: $color-orange;
            }
        }
        .btn-delete {
            margin-left: 12px;
    
            &:hover {
                background-color: $color-red;
            }
        }
    }
}
.none-item {
    margin: 32px 0;

    font-style: italic;
    text-align: center;
}

// Responsive
@media screen and (max-width: 768px) {
    .item {
        .actions {
            flex-wrap: wrap;
            align-items: center;
            
            .btn-item {
                width: 100%;
                text-align: center;
            }

            .btn-delete {
                margin-left: 0;
                margin-top: 6px;
            }
        }
    }
}
</style>