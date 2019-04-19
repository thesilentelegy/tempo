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
      <span class="progress-tracker__text trunc">You're on track</span>
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

const CompletedTasksList = {
  template: `
  <ul class="completed-today">
    <li class="completed-task" v-for="completedTask in completedToday">
      <div class="progress-indicator" :class="completedTask.progress == 0 ? 'on-time' : completedTask.progress == -1 ? 'early' : 'late'"></div>
      <h3 class="completed-task__name trunc">{{ completedTask.name }}</h3>
      <p class="completed-task__duration">
        <span class="duration" v-if="completedTask.h > 0">{{completedTask.h}}<span>h</span></span> 
        <span class="duration" v-if="completedTask.m > 0">{{completedTask.m}}<span>m</span></span>
        <span class="duration">{{completedTask.s}}<span>s</span></span>
      </p>
    </li>
  </ul>`,
  data: function() {
    return {
      completedToday: [
        { name: 'Shower', progress: 0, h: 0, m: 30, s: 23 },
        { name: 'Clean room', progress: -1, h: 0, m: 26, s: 55 },
        { name: 'Play', progress: 1, h: 1, m: 12, s: 19 },
        { name: 'Nap', progress: 0, h: 0, m: 20, s: 32}
      ]
    }
  }
};

const Badge = {
  props: ['count'],
  template: `<span class="badge">{{ count }}</span>`
};

const RoutineCard = {
  props: ['info'],
  template: `
  <li class="routine-card">
    <div class="routine-control">
      <h3 class="routine-name trunc">{{info.routineName}}</h3>
      <button type="button" class="routine-select" :class="{selected: info.isSelected}" v-if="info.isSelectable"></button>
      <button type="button" class="routine-delete" v-if="info.isDeletable"><i class="icon-delete"></i></button>
    </div>
    <ul class="routine-tasks">
      <li v-for="task in info.tasks" class="routine-tasks__item trunc">{{task}}</li>
    </ul>
  </li>
  `
}

const RoutineCarousel = {
  template: `
  <div class="routine-carousel">
    <div class="carousel-control">
      <h2 class="subheader">Routines <Badge count="5"></Badge></h2>
    </div>
    <ul class="routine-list">
      <RoutineCard v-for="routine in routines" :info="routine" :key="routine.id"></RoutineCard>
    </ul>
  </div>`,
  data: function() {
    return {
      routines: [
        {
          id: 0,
          routineName: 'Weekend Stuff', isSelectable: false, isDeletable: true, isSelected: false, 
          tasks: ['Shower', 'Clean room', 'Play', 'Study', 'Walk', 'Nap']
        },
        {
          id: 1,
          routineName: 'Weekend Stuff', isSelectable: false, isDeletable: true, isSelected: false, 
          tasks: ['Sit-ups', 'Push-ups', 'Jog', 'Rest', 'Cooldown practices', 'Shower']
        }
      ]
    } 
  },
  components: {
    'Badge': Badge,
    'RoutineCard': RoutineCard
  }
};

const Home = { 
  template: `
  <div class="home-panel">
    <TopBar :panel-name="panelName"></TopBar>
    <div class="content-wrapper">
      <div class="today-activity">
        <h2 class="subheader">Doing now...</h2>
        <CurrentTask></CurrentTask>
        <h2 class="subheader">Tasks you completed <Badge count="14"></Badge></h2>
        <CompletedTasksList></CompletedTasksList>
      </div>
      <div class="routine-manager">
        <RoutineCarousel></RoutineCarousel>
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
    'RoutineCarousel': RoutineCarousel
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
