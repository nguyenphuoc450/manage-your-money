<template>
  <NavigationTop/>
  <div class="budget-edit fadeIn">
      <div class="container">
        <h2 class="title" v-if="budget.type === 'earning'">
          Sửa khoản thu - {{formatDate(budget.date)}}
        </h2>
        <h2 class="title" v-if="budget.type === 'spending'">
          Sửa khoản chi - {{formatDate(budget.date)}} 
        </h2>
        <form class="form" @submit.prevent="editBudget">
            <select id="type" v-model="budget.type" disabled>
                <option value="spending">Khoản chi</option>
                <option value="earning">Khoản thu</option>
            </select>
            <input type="date" class="my-3" v-model="budget.date">
            <input type="number" placeholder="Số tiền" v-model="budget.money">
            <select id="spending" class="my-3" 
                v-if="budget.type === 'spending'"
                v-model="budget.option"
            >
                <option value="">Chọn</option>
                <option v-for="s in spendingOptions" :key="s.value" :value="s.value">
                    {{s.name}}
                </option>
            </select>
            <select id="earning" class="my-3" 
                v-if="budget.type === 'earning'"
                v-model="budget.option"
            >
                <option value="">Chọn</option>
                <option v-for="e in earningOptions" :key="e.value" :value="e.value">
                    {{e.name}}
                </option>
            </select>
            <input type="text" placeholder="Ghi chú" class="mb-3" v-model="budget.note">
            <button class="btn" v-if="!isPending">Sửa</button>
            <button class="btn" v-if="isPending">Loading...</button>
            <p 
                :class="[message === 'Đã sửa thành công.' ? 'success-message' : 'error-message']"
            >
                {{message}}
            </p>
            <p class="error-message">{{error}}</p>
        </form>
      </div>
  </div>
</template>

<script>
import NavigationTop from '../../components/NavigationTop.vue'
import {ref} from 'vue'
import firebase from 'firebase'
import {useRouter} from 'vue-router'

export default {
    name: 'BudgetDetail',
    components: {
      NavigationTop
    },
    props: ['id'],
    setup (props) {
      const budget = ref({
            type: '',
            date: '',
            money: '',
            option: '',
            note: ''
      })
      const isPending = ref(false)
      const message = ref('')
      const router = useRouter()

      const spendingOptions = ref([
          {name: 'Ăn uống', value: "eating"},
          {name: 'Đổ xăng', value: "gasoline"},
          {name: 'Mua đồ', value: "shopping"},
          {name: 'Tiền nhà', value: "house-money"},
          {name: 'Khác', value: "other"},
      ])

      const earningOptions = ref([
            {name: 'Tiền lương', value: "salary"},
            {name: 'Tiền thưởng', value: "bonus"},
            {name: 'Làm thêm', value: "overtime"},
            {name: 'Bán đồ', value: "sell"},
            {name: 'Khác', value: "other"},
        ])

      function formatDate(date) {
           return date.split("-").reverse().join("/"); 
      }

      async function getBudgetById() {
        await firebase.firestore().collection('budget').doc(props.id).get()
          .then((rs) => {
            budget.value.type = rs.data().type
            budget.value.date = rs.data().date
            budget.value.money = rs.data().money
            budget.value.option = rs.data().option
            budget.value.note = rs.data().note
          })
          .catch((err) => {
            console.log(err)
          })
      }
      getBudgetById()

      async function editBudget() {
        isPending.value = true
        await firebase.firestore().collection('budget').doc(props.id).update({
          date: budget.value.date,
          money: parseInt(budget.value.money),
          option: budget.value.option,
          note: budget.value.note,
        })
        .then(() => {
          isPending.value = false
          message.value = "Đã sửa thành công."
          setTimeout(() => {
            message.value = ''
            router.push({name: 'Budget'})
          }, 2000)
        })
        .catch(err => {
          message.value = 'Đã sửa thất bại'
          console.log(err)
        })
      }

      return {
        budget,
        message,
        spendingOptions,
        earningOptions,
        formatDate,
        isPending,
        editBudget
      }
    }
}
</script>

<style lang="scss" scoped>
.budget-edit {
    padding: 32px 0;
}
.error-message, .success-message {
    margin-top: 6px;
}
</style>