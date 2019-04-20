//var Vue = require('vue');
//var VueRouter = require('vue-router');
//var Vuex = require('vuex');

Vue.use(VueRouter);
Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     currentTask: {
//       taskProgress: 'ontime',
//       taskName: 'Study',
//       taskDuration: ,
//     },
//     currentRoutine: null,
//     completedTasksToday: [],
//     currentTasks: [],
//     routines: [],
//     taskHistory: [],
//     historyLastUpdated: null
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// });

const DateModule = {
  template: `
  <span class="top-bar__date">
    <span class="date__day">{{ formattedDay }}</span>
    <span class="date__exact">{{ formattedDate }}</span>
  </span>`,
  data: function() {
    return {
      formattedDay: null,
      formattedDate: null
    }
  },
  methods: {
    updateDate() {
      this.formattedDay = moment().format('dddd');
      this.formattedDate = moment().format('MMM DD');
    }
  },
  created() {
    this.formattedDay = moment().format('dddd');
    this.formattedDate = moment().format('MMM DD');
    setInterval(() => this.updateDate(), 1000);
  }
};

const TopBar = {
  props: ['panelName'],
  template: `
  <div class="top-bar">
    <h1 class="top-bar__title">{{ panelName }}</h1>
    <DateModule></DateModule>
  </div>
  `,
  components: {
    'DateModule': DateModule
  }
};

const CurrentTask = {
  template: `
  <div class="current-task">
    <span class="progress-tracker">
      <span class="progress-tracker__text">You're on track</span>
    </span>
    <div class="task-info">
      <h3 class="task-info__name">Study</h3>
      <p class="task-info__duration"> 
        <span class="duration">01<span>h</span></span>
        <span class="duration">52<span>m</span></span>
        <span class="duration">36<span>s</span></span>
      </p>
    </div>
  </div>
  `
};

const Badge = {
  props: ['count'],
  template: `<span class="badge" v-if="count > 0">{{ count }}</span>`
};

const CompletedTask = {
  props: ['info'],
  template: `
  <li class="completed-tasks-list__item">
    <div class="progress-indicator" :class="info.progress == 0 ? 'on-time' : info.progress == -1 ? 'early' : 'late'"></div>
    <h3 class="completed-task__name trunc">{{ info.name }}</h3>
    <p class="completed-task__duration">
      <span class="duration" v-if="info.h > 0">{{info.h}}<span>h</span></span> 
      <span class="duration" v-if="info.m > 0">{{info.m}}<span>m</span></span>
      <span class="duration">{{info.s}}<span>s</span></span>
    </p>
  </li>`
};

const CompletedTasksList = {
  template: `
  <div class="completed-tasks">
    <h2 class="subheader">Tasks you completed <Badge :count="completedTasks.length"></Badge></h2>
    <ul class="completed-tasks-list">
      <CompletedTask v-for="completedTask in completedTasks" :info="completedTask" :key="completedTask.id"></CompletedTask>
    </ul>
  </div>`,
  data: function() {
    return {
      completedTasks: [
        { id: 0, name: 'Shower', progress: 0, h: 0, m: 30, s: 23 },
        { id: 1, name: 'Clean room', progress: -1, h: 0, m: 26, s: 55 },
        { id: 2, name: 'Play', progress: 1, h: 1, m: 12, s: 19 },
        { id: 3, name: 'Nap', progress: 0, h: 0, m: 20, s: 32}
      ]
    }
  },
  components: {
    'Badge': Badge,
    'CompletedTask': CompletedTask
  }
};

const RoutineCard = {
  props: ['info'],
  template: `
  <li class="routine-card" :class="'grad-' + info.theme">
    <div class="routine-control">
      <h3 class="routine-name trunc">{{info.routineName}}</h3>
      <button type="button" class="routine-select" :class="{selected: info.isSelected}" v-if="info.isSelectable"></button>
      <button type="button" class="routine-delete" v-if="info.isDeletable"><i class="icon-delete"></i></button>
    </div>
    <ul class="routine-tasks">
      <li v-for="task in info.tasks" class="routine-tasks__item trunc">{{task}}</li>
    </ul>
  </li>`
}

const RoutineCarousel = {
  template: `
  <div class="routine-carousel">
    <div class="carousel-control">
      <h2 class="subheader">Routines <Badge :count="routines.length"></Badge></h2>
      <div class="carousel-control__buttons">
        <button type="button" class="carousel__button" @click="scrollLeft"><i class="icon-arrow-left"></i></button>
        <button type="button" class="carousel__button" @click="scrollRight"><i class="icon-arrow-right"></i></button>
      </div>
    </div>
    <div class="carousel-wrapper">
      <ul class="routine-list">
        <RoutineCard v-for="routine in routines" :info="routine" :key="routine.id"></RoutineCard>
      </ul> 
    </div>
  </div>`,
  data: function() {
    return {
      routines: [
        {
          id: 0,
          routineName: 'Weekend Stuff', isSelectable: true, isDeletable: false, isSelected: true, 
          tasks: ['Shower', 'Clean room', 'Play', 'Study', 'Walk', 'Nap'],
          theme: 'sun'
        },
        {
          id: 1,
          routineName: 'Exercise', isSelectable: true, isDeletable: false, isSelected: false, 
          tasks: ['Sit-ups', 'Push-ups', 'Jog', 'Rest', 'Cooldown practices', 'Shower'],
          theme: 'frost'
        },
        {
          id: 2,
          routineName: 'Weekend Stuff', isSelectable: true, isDeletable: false, isSelected: false, 
          tasks: ['Shower', 'Clean room', 'Play', 'Study', 'Walk', 'Nap'],
          theme: 'night'
        },
        {
          id: 3,
          routineName: 'Exercise', isSelectable: true, isDeletable: false, isSelected: false, 
          tasks: ['Sit-ups', 'Push-ups', 'Jog', 'Rest', 'Cooldown practices', 'Shower'],
          theme: 'mint'
        },
        {
          id: 4,
          routineName: 'Exercise', isSelectable: true, isDeletable: false, isSelected: false, 
          tasks: ['Sit-ups', 'Push-ups', 'Jog', 'Rest', 'Cooldown practices', 'Shower'],
          theme: 'warm'
        }
      ]
    } 
  },
  computed: {
    carouselData: function() {
      const carouselNode = document.querySelector(".routine-list");
      const cardNode = carouselNode.querySelector(".routine-card");
      let cardWidth = cardNode.offsetWidth;
      let cardStyle = cardNode.currentStyle || window.getComputedStyle(cardNode);
      let cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
      let cardCount = carouselNode.querySelectorAll(".routine-card").length;
      let offset = 0;
      let maxX = -((cardWidth + cardMarginRight) * (cardCount - 1));
      return {
        carouselNode: carouselNode, cardNode: cardNode, cardWidth: cardWidth, cardStyle: cardStyle, cardMarginRight: cardMarginRight, 
        cardCount: cardCount, offset: offset, maxX: maxX
      }
    }
  },
  methods: {
    scrollLeft: function() {
      if (this.carouselData.offset !== 0) {
        this.carouselData.offset += this.carouselData.cardWidth + this.carouselData.cardMarginRight;
        this.carouselData.carouselNode.style.transform = `translateX(${this.carouselData.offset}px)`;
      }
    },
    scrollRight: function() {
      if (this.carouselData.offset !== this.carouselData.maxX) {
        this.carouselData.offset -= this.carouselData.cardWidth + this.carouselData.cardMarginRight;
        this.carouselData.carouselNode.style.transform = `translateX(${this.carouselData.offset}px)`;
      }
    }
  },
  components: {
    'Badge': Badge,
    'RoutineCard': RoutineCard
  }
};

const CurrentTasksCard = {
  props: ['info'],
  template: `
  <li class="current-task-card">
    <h3 class="current-task__name trunc">{{ info.name }}</h3>
    <p class="current-task__duration"> 
      <span class="duration">{{ info.m }}<span>h</span></span>
      <span class="duration">{{ info.h }}<span>m</span></span>
    </p>
  </li>`
};

const CurrentTasksList = {
  template: `
  <div class="current-tasks">
    <h2 class="subheader">Current tasks</h2>
    <ul class="current-tasks-list">
      <CurrentTasksCard v-for="currentTask in currentTasks" :info="currentTask" :key="currentTask.info"></CurrentTasksCard>
    </ul>
  </div>`,
  data: function() {
    return {
      currentTasks: [
        { id: 0, name: 'Shower', h: 0, m: 30 },
        { id: 1, name: 'Clean room', h: 0, m: 45 },
        { id: 2, name: 'Play', h: 1, m: 0 },
        { id: 3, name: 'Study', h: 2, m: 0 },
        { id: 4, name: 'Walk', h: 1, m: 30 },
        { id: 5, name: 'Nap', h: 0, m: 20 }
      ]
    }
  },
  components: {
    'CurrentTasksCard': CurrentTasksCard
  }
}

const Home = { 
  template: `
  <div class="home-panel is-unselectable">
    <TopBar :panel-name="panelName"></TopBar>
    <div class="content-wrapper">
      <div class="today-activity">
        <h2 class="subheader">Doing now...</h2>
        <CurrentTask></CurrentTask>
        <CompletedTasksList></CompletedTasksList>
      </div>
      <div class="routine-manager">
        <RoutineCarousel></RoutineCarousel>
        <CurrentTasksList></CurrentTasksList>
      </div>
    </div>
  </div>`,
  data: function() {
    return {
      panelName: 'Home',
    }
  },
  components: {
    'TopBar': TopBar,
    'CurrentTask': CurrentTask,
    'Badge': Badge,
    'CompletedTasksList': CompletedTasksList,
    'RoutineCarousel': RoutineCarousel,
    'CurrentTasksList': CurrentTasksList
  }
};

const Tasks = { 
  template: `
  <div class="tasks-panel">
    <TopBar :panel-name="panelName"></TopBar>
  </div>`,
  data: function() {
    return {
      panelName: 'Tasks',
    }
  },
  components: {
    'TopBar': TopBar
  }
};

const Activity = { 
  template: `
  <div class="activity-panel">
    <TopBar :panel-name="panelName"></TopBar>
  </div>`,
  data: function() {
    return {
      panelName: 'Activity',
    }
  },
  components: {
    'TopBar': TopBar
  }
};

const Settings = { 
  template: `
  <div class="settings-panel">
    <TopBar :panel-name="panelName"></TopBar>
  </div>`,
  data: function() {
    return {
      panelName: 'Settings',
    }
  },
  components: {
    'TopBar': TopBar
  }
};

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/tasks', component: Tasks },
  { path: '/activity', component: Activity },
  { path: '/settings', component: Settings }
]
const router = new VueRouter({
  routes: routes
})

const app = new Vue({
  router: router
}).$mount('#app')
