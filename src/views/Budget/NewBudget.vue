<template>
    <NavigationTop/>
  <div class="new-budget fadeIn">
      <h2 class="title">Tạo mới khoản thu/ khoản chi</h2>
      <form class="form" @submit.prevent="createNewBudget">
          <select id="type" v-model="form.type">
              <option value="spending">Khoản chi</option>
              <option value="earning">Khoản thu</option>
          </select>
          <input type="date" class="my-3" v-model="form.date">
          <input type="number" placeholder="Số tiền" v-model="form.money">
          <select id="spending" class="my-3" 
            v-if="form.type === 'spending'"
            v-model="form.option"
          >
              <option value="">Chọn</option>
              <option v-for="s in spendingOptions" :key="s.value" :value="s.value">
                  {{s.name}}
              </option>
          </select>
          <select id="earning" class="my-3" 
            v-if="form.type === 'earning'"
            v-model="form.option"
          >
              <option value="">Chọn</option>
              <option v-for="e in earningOptions" :key="e.value" :value="e.value">
                  {{e.name}}
              </option>
          </select>
          <input type="text" placeholder="Ghi chú" class="mb-3" v-model="form.note">
          <button class="btn" v-if="!isPending">Tạo mới</button>
          <button class="btn" v-if="isPending">Loading...</button>
          <p :class="[message === 'Đã thêm thành công.' ? 'success-message' : 'error-message']">{{message}}</p>
          <p class="error-message">{{error}}</p>
      </form>
  </div>
</template>

<script>
import NavigationTop from '../../components/NavigationTop.vue'
import {ref} from 'vue'
import {useCollection} from '../../composables/useCollection'
import {useUser} from '../../composables/useUser'

export default {
    name: 'NewBudget',
    components: {
        NavigationTop
    },
    setup () {
        const form = ref({
            type: 'spending',
            date: '',
            money: '',
            option: '',
            note: ''
        })
        const message = ref('')
        const {error, isPending, addValueCollection} = useCollection()
        const {userCurrent} = useUser()

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

        async function createNewBudget() {
            message.value = ''
            
            if (form.value.date === '' || form.value.money === '' || form.value.option === '') {
                message.value= 'Vui lòng không để trống.'
            } else {
                const newBudget = {
                    type: form.value.type,
                    date: form.value.date,
                    money: parseInt(form.value.money),
                    option: form.value.option,
                    note: form.value.note,
                    uid: userCurrent.value.uid
                }

                if(!error.value) {
                    await addValueCollection('budget', newBudget)
                    message.value = 'Đã thêm thành công.'
                    form.value.date = ''
                    form.value.money = ''
                    form.value.option = ''
                    form.value.note = ''
                }
            }
        }
        
        return {
            form,
            message,
            spendingOptions,
            earningOptions,
            createNewBudget,
            isPending,
            error,
        }
    }
}
</script>

<style lang="scss" scoped>
.new-budget {
    padding: 32px 0;
}
.error-message, .success-message {
    margin-top: 6px;
}
</style>