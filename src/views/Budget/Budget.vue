<template>
  <NavigationTop/>
  <div class="budget fadeIn">
      <div class="container">
        <h2 class="title mb-6">Quản lý thu chi</h2>
        <TotalMoney :budgetList="budgetList"/>
        <ButtonActions :getBudget="getBudget"/>
        <BudgetList 
            :budgetList="budgetList"
            :selectedDate="selectedDate"
            :selectedType="selectedType"
            @onSelected="handleSelected"
            @onDeleteBudget="deleteBudget"
        />
      </div>
  </div>
</template>

<script>
import NavigationTop from '../../components/NavigationTop.vue'
import TotalMoney from '../../components/Budget/TotalMoney.vue'
import ButtonActions from '../../components/Budget/ButtonActions.vue'
import BudgetList from '../../components/Budget/BudgetList.vue'
import {ref} from 'vue'
import firebase from 'firebase'
import {useUser} from '../../composables/useUser'

export default {
    name: 'Budget',
    components: {
        NavigationTop,
        TotalMoney,
        ButtonActions,
        BudgetList
    },
    setup () {
        const {userCurrent} = useUser()
        const list = ref([])
        const budgetList = ref([])
        const selectedType = ref('')
        const selectedDate = ref('')

        // Get budget from collection by user id
        async function getBudget() {
            await firebase.firestore().collection('budget').get()
            .then((response) => list.value = response.docs)

            // filter data by current user
            budgetList.value = await list.value.filter((d) => {
                return d.data().uid === userCurrent.value.uid
            })

            selectedType.value = ''
            selectedDate.value = ''

        }
        getBudget()

        // Delete Budget
        async function deleteBudget(id) {
            confirm('Bạn có chắc muốn xóa?')
            if(confirm == true) {
                await firebase.firestore().collection('budget').doc(id).delete()
                .then(() => alert('Đã xóa thành công'))
                .catch((error) => console.log(error))
                await getBudget()
            }
        }

        function handleSelected(e) {
            if (e === 'earning' || e === 'spending') selectedType.value = e
            if (e.includes('-')) selectedDate.value = e
            if(e === '') {
                selectedType.value = e
                selectedDate.value = e
            }
        }

        return {
            budgetList,
            getBudget,
            deleteBudget,
            selectedType,
            selectedDate,
            handleSelected,
        }
    }
}
</script>

<style lang="scss" scoped>
.budget {
    padding: 32px 12px;
}
</style>