import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App);

app
    .use(store) // В данной работе не использован, но вообще можно использовать vuex для хранения списка list'ов с item'ами например
    .mount('#app')


