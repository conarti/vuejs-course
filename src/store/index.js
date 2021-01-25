import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      tasks: [],
      isLoading: false
    }
  },
  getters: {
    activeCount(state) {
      return state.tasks.filter(task => task.status === 'active').length
    }
  },
  mutations: {
    setStatus(state, { status, id }) {
      const idx = state.tasks.findIndex(task => task.id === id)
      state.tasks[idx].status = status
    },
    getTasks(state, { data }) {
      state.tasks = data ? Object.keys(data).map(id => ({
        id,
        ...data[id],
        deadline: new Date(data[id].deadline)
      })) : []
    },
    addTask(state, { newTask }) {
      state.tasks.push(newTask)
    },
    setLoadStatus(state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    async setStatus(context, { status, id }) {
      try {
        context.commit('setLoadStatus', true)
        await axios.patch('https://vue-with-http-cb609-default-rtdb.firebaseio.com/tasks/' + id + '.json', { status })
        context.commit('setLoadStatus', false)
        context.commit('setStatus', { status, id })
      } catch (e) {
        console.warn('Error while update task status in firebase:', e)
      }
    },
    async getTasks(context) {
      try {
        context.commit('setLoadStatus', true)
        const { data } = await axios.get('https://vue-with-http-cb609-default-rtdb.firebaseio.com/tasks.json')
        context.commit('setLoadStatus', false)
        context.commit('getTasks', { data })
      } catch (e) {
        console.warn('Error while getting tasks from firebase:', e)
      }
    },
    async addTask(context, payload) {
      try {
        context.commit('setLoadStatus', true)
        const { title, text } = payload

        const deadline = new Date(payload.deadline.value)
        const now = new Date()
        const isValidDate = () => now.getDay() === deadline.getDay() ? true : now.getTime() < deadline.getTime()

        const newTask = {
          title: title.value,
          text: text.value,
          deadline,
          status: isValidDate() ? 'active' : 'cancelled'
        }

        newTask.id = await axios.post('https://vue-with-http-cb609-default-rtdb.firebaseio.com/tasks.json', newTask).data

        context.commit('setLoadStatus', false)
        context.commit('addTask', { newTask })
      } catch (e) {
        console.warn('Error while adding new task to firebase:', e)
      }
    }
  },
  modules: {
  }
})
