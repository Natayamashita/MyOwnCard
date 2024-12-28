import { createRouter, createWebHistory } from 'vue-router';
import CardDisplay from '../components/CardDisplay.vue';
import CardCreator from '../components/CardCreator.vue';

const routes = [
  {
    path: '/cards',
    name: 'Home',
    component: CardDisplay,
  },
  {
    path: '/cards/create',
    name: 'CardCreator',
    component: CardCreator,
  }
  // add more routes as needed
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;