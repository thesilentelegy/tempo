Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentTask: {
      taskId: 't01',
      taskName: 'test',
      taskRoutine: 'r01',
      taskDuration: 5700,
      recordedDuration: 4719,
      progress: (4680 - 5700) 
    },
    completedTasks: [
      {
        taskId: 't02',
        taskName: 'Shower',
        taskRoutine: 'r01',
        timeCompleted: Date.now() + 10000,
        recordedDuration: 1823,
        progress: 0
      },
      {
        taskId: 't03',
        taskName: 'Clean room',
        taskRoutine: 'r01',
        timeCompleted: Date.now() + 90081,
        recordedDuration: 1615,
        progress: -1
      },
      {
        taskId: 't04',
        taskName: 'Play',
        taskRoutine: 'r01',
        timeCompleted: Date.now(),
        recordedDuration: 4339,
        progress: 1
      },
      {
        taskId: 't05',
        taskName: 'Nap',
        taskRoutine: 'r01',
        timeCompleted: Date.now() + 23723,
        recordedDuration: 1232,
        progress: 1
      },
      {
        taskId: 't06',
        taskName: 'Eat',
        taskRoutine: 'r01',
        timeCompleted: Date.now() - 87390,
        recordedDuration: 230920,
        progress: 0
      },
      {
        taskId: 't07',
        taskName: 'Work',
        taskRoutine: 'r01',
        timeCompleted: Date.now() + 123723,
        recordedDuration: 32891,
        progress: -1
      }
    ],
    selectedRoutine: 'r01',
    tasks: [
      {
        taskId: 't01',
        taskName: 'Shower',
        taskDuration: 1800
      },
      {
        taskId: 't02',
        taskName: 'Clean room',
        taskDuration: 2700
      },
      {
        taskId: 't03',
        taskName: 'Play',
        taskDuration: 3600
      },
      {
        taskId: 't04',
        taskName: 'Study',
        taskDuration: 7200
      },
      {
        taskId: 't05',
        taskName: 'Walk',
        taskDuration: 5400
      },
      {
        taskId: 't06',
        taskName: 'Nap',
        taskDuration: 1200
      }
    ],
    routines: [
      {
        routineId: 'r01',
        routineName: 'Weekend Stuff',
        routineTasks: [ 't01', 't02', 't03' ],
        theme: 'sun'
      },
      {
        routineId: 'r02',
        routineName: 'Test',
        routineTasks: [ 't01', 't04', 't05', 't06' ],
        theme: 'frost'
      },
      {
        routineId: 'r03',
        routineName: 'Exercise',
        routineTasks: [ 't01', 't02', 't05', 't06' ],
        theme: 'warm'
      },
      {
        routineId: 'r04',
        routineName: 'Chill Sessions',
        routineTasks: [ 't01', 't02', 't03', 't04' ],
        theme: 'mint'
      },
      {
        routineId: 'r05',
        routineName: 'Daily Chores',
        routineTasks: [ 't04', 't05', 't06' ],
        theme: 'night'
      },
      {
        routineId: 'r06',
        routineName: 'Work',
        routineTasks: [ 't01', 't02', 't03', 't04', 't05', 't06' ],
        theme: 'warm'
      }
    ]
  },
  getters: {
    getTasksById: (state) => (ids) => {
      return state.tasks.filter((item) => {
        return ids.includes(item.taskId);
      });
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

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
  </div>`,
  components: {
    'DateModule': DateModule
  }
};

const CurrentTask = {
  template: `
  <div class="current-task">
    <span class="progress-tracker">
      <span class="progress-tracker__text">{{ currentTask.taskName <= 0 ? "You're on track" : "You're spent too long here" }}</span>
    </span>
    <div class="task-info">
      <h3 class="task-info__name trunc">{{ currentTask.taskName }}</h3>
      <p class="task-info__duration"> 
        <span class="duration">{{ h }}<span>h</span></span>
        <span class="duration">{{ m }}<span>m</span></span>
        <span class="duration">{{ s }}<span>s</span></span>
      </p>
    </div>
  </div>`,
  data: function () {
    return {
      h: 0, m: 0, s: 0
    }
  },
  computed: {
    currentTask: function() {
      let dur = this.$store.state.currentTask.recordedDuration;
      this.h = Math.trunc(dur / 3600);
      this.m = Math.trunc((dur - (this.h * 3600)) / 60);
      this.s = dur - ((this.h * 3600) + (this.m * 60));
      return this.$store.state.currentTask;
    }
  }
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
    <h3 class="completed-task__name trunc">{{ info.taskName }}</h3>
    <p class="completed-task__duration">
      <span class="duration" v-if="recDur.h > 0">{{ recDur.h }}<span>h</span></span> 
      <span class="duration" v-if="recDur.m > 0">{{ recDur.m }}<span>m</span></span>
      <span class="duration">{{ recDur.s }}<span>s</span></span>
    </p>
  </li>`,
  computed: {
    recDur: function() {
      let dur = this.info.recordedDuration;
      let h = Math.trunc(dur / 3600);
      let m = Math.trunc((dur - (h * 3600)) / 60);
      let s = dur - ((h * 3600) + (m * 60));
      return { h: h, m: m, s: s };
    }
  }
};

const CompletedTasksList = {
  template: `
  <div class="completed-tasks">
    <h2 class="subheader">Tasks you completed <Badge :count="completedTasks.length"></Badge></h2>
    <ul class="completed-tasks-list">
      <CompletedTask v-for="completedTask in completedTasks" :info="completedTask" :key="completedTask.id"></CompletedTask>
    </ul>
  </div>`,
  computed: {
    completedTasks: function() {
      return this.$store.state.completedTasks.sort((a, b) => b.timeCompleted - a.timeCompleted);
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
      <button type="button" class="routine-select" :class="{selected: info.isSelected}"></button>
    </div>
    <ul class="routine-tasks">
      <li v-for="task in tasks" class="routine-tasks__item trunc">{{ task.taskName }}</li>
    </ul>
  </li>`,
  computed: {
    tasks: function() {
      return this.$store.getters.getTasksById(this.info.routineTasks);
    }
  }
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
    },
    routines: function() {
      return this.$store.state.routines;
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
      <span class="duration">{{ info.h }}<span>h</span></span>
      <span class="duration">{{ info.m }}<span>m</span></span>
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
  computed: {
    currentTasks: function() {
      return this.$store.getters.getTasksById(this.$store.state.selectedRoutine.routineTasks);
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
    <div class="content-wrapper">
      <h2 class="feature-error">Sorry, this feature is currently not available.</h2>
    </div>
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
    <div class="content-wrapper">
      <h2 class="feature-error">Sorry, this feature is currently not available.</h2>
    </div>
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
    <div class="content-wrapper">
      <h2 class="feature-error">Sorry, this feature is currently not available.</h2>
    </div>
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
  store: store,
  router: router
}).$mount('#app')
