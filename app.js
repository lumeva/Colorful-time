const STORAGE_KEY = "colorful-time-state-v1";

const CATEGORY_COLORS = [
  "#6ea8ff",
  "#8bda9f",
  "#ffbe65",
  "#ff9d8d",
  "#b193ff",
  "#5ec7c0",
];

const THEME_OPTIONS = [
  {
    id: "paper",
    name: "Simple Paper",
    note: "奶油纸、细线、贴纸感。",
  },
  {
    id: "adventure",
    name: "Adventure",
    note: "更轻快、更手绘，给后面的动漫感留入口。",
  },
];

const dom = {
  body: document.body,
  appShell: document.getElementById("app-shell"),
  pages: [...document.querySelectorAll(".page")],
  navItems: [...document.querySelectorAll(".nav-item")],
  bottomNav: document.querySelector(".bottom-nav"),
  homeDate: document.getElementById("home-date"),
  timerStrip: document.getElementById("timer-strip"),
  nextScroll: document.getElementById("next-scroll"),
  todoGroups: document.getElementById("todo-groups"),
  fab: document.getElementById("fab-button"),
  scrim: document.getElementById("scrim"),
  actionSheet: document.getElementById("action-sheet"),
  todayRefresh: document.getElementById("today-refresh"),
  statsTitle: document.getElementById("stats-title"),
  statsRangeNote: document.getElementById("stats-range-note"),
  statsRangeTabs: document.getElementById("stats-range-tabs"),
  statsModeTabs: document.getElementById("stats-mode-tabs"),
  statsWheelCard: document.getElementById("stats-wheel-card"),
  statsLegend: document.getElementById("stats-legend"),
  statsTotalRow: document.getElementById("stats-total-row"),
  statsCategoryFilter: document.getElementById("stats-category-filter"),
  statsTaskFilter: document.getElementById("stats-task-filter"),
  statsBreakdown: document.getElementById("stats-breakdown"),
  trendToggle: document.getElementById("trend-toggle"),
  trendPanel: document.getElementById("trend-panel"),
  customRangeRow: document.getElementById("custom-range-row"),
  customStartDate: document.getElementById("custom-start-date"),
  customEndDate: document.getElementById("custom-end-date"),
  tasksTree: document.getElementById("tasks-tree"),
  tasksEditToggle: document.getElementById("tasks-edit-toggle"),
  addFolderButton: document.getElementById("add-folder-button"),
  themeGrid: document.getElementById("theme-grid"),
  pwaInstallButton: document.getElementById("pwa-install-button"),
  pwaInstallNote: document.getElementById("pwa-install-note"),
  nextTimePriorityToggle: document.getElementById("next-time-priority-toggle"),
  nextImportantPriorityToggle: document.getElementById("next-important-priority-toggle"),
  dayStartInput: document.getElementById("day-start-input"),
  defaultDurationSelect: document.getElementById("default-duration-select"),
  completedDefaultToggle: document.getElementById("completed-default-toggle"),
  reduceTextureToggle: document.getElementById("reduce-texture-toggle"),
  taskSheet: document.getElementById("task-sheet"),
  taskSheetTitle: document.getElementById("task-sheet-title"),
  taskForm: document.getElementById("task-form"),
  taskNameInput: document.getElementById("task-name-input"),
  taskCategoryButton: document.getElementById("task-category-button"),
  taskCategoryLabel: document.getElementById("task-category-label"),
  taskTimeButton: document.getElementById("task-time-button"),
  taskTimeLabel: document.getElementById("task-time-label"),
  taskDateLabel: document.getElementById("task-date-label"),
  taskTimeInput: document.getElementById("task-time-input"),
  taskDurationInput: document.getElementById("task-duration-input"),
  taskImportantInput: document.getElementById("task-important-input"),
  taskMoreToggle: document.getElementById("task-more-toggle"),
  taskAdvancedPanel: document.getElementById("task-advanced-panel"),
  taskRepeatSelect: document.getElementById("task-repeat-select"),
  taskWeekdaysField: document.getElementById("task-weekdays-field"),
  taskWeekdaysGrid: document.getElementById("task-weekdays-grid"),
  taskTimerMode: document.getElementById("task-timer-mode"),
  taskDateInput: document.getElementById("task-date-input"),
  taskDateQuickGrid: document.getElementById("task-date-quick-grid"),
  taskTimeClear: document.getElementById("task-time-clear"),
  taskTimeApply: document.getElementById("task-time-apply"),
  quickForm: document.getElementById("quick-form"),
  quickNameInput: document.getElementById("quick-name-input"),
  quickSuggestionList: document.getElementById("quick-suggestion-list"),
  logForm: document.getElementById("log-form"),
  logTaskInput: document.getElementById("log-task-input"),
  logSuggestionList: document.getElementById("log-suggestion-list"),
  logStartInput: document.getElementById("log-start-input"),
  logEndInput: document.getElementById("log-end-input"),
  logDurationNote: document.getElementById("log-duration-note"),
  categorySheetTitle: document.getElementById("category-sheet-title"),
  categoryBreadcrumb: document.getElementById("category-breadcrumb"),
  categoryList: document.getElementById("category-list"),
  treeEditorTitle: document.getElementById("tree-editor-title"),
  treeEditorForm: document.getElementById("tree-editor-form"),
  treeNameInput: document.getElementById("tree-name-input"),
  treeDurationField: document.getElementById("tree-duration-field"),
  treeDurationInput: document.getElementById("tree-duration-input"),
  treeColorPicker: document.getElementById("tree-color-picker"),
  treeDeleteButton: document.getElementById("tree-delete-button"),
};

let state = loadState();
let clockTicker = null;
let deferredPromptEvent = null;

state = upgradeState(state);

boot();

function boot() {
  applyPageFromUrl();
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  bindEvents();
  renderAll();
  startTicker();
}

function applyPageFromUrl() {
  const page = new URL(window.location.href).searchParams.get("page");
  if (["home", "stats", "tasks", "settings", "ai-planner"].includes(page)) {
    state.currentPage = page;
  }
}

function ensureSettingsStructure() {
  const settingsPage = document.querySelector('.page[data-page="settings"]');
  const settingsSheet = settingsPage?.querySelector(".settings-sheet");
  if (!settingsSheet || settingsSheet.dataset.layout === "v2") return;

  const heroDate = settingsPage.querySelector(".hero-date");
  const heroNote = settingsPage.querySelector(".hero-note");
  if (heroDate) heroDate.textContent = "";
  if (heroNote) heroNote.remove();

  settingsSheet.dataset.layout = "v2";
  settingsSheet.classList.add("settings-sheet-clean");
  settingsSheet.innerHTML = `
    <section class="settings-group">
      <div class="settings-group-title">App</div>
      <div class="settings-list-block">
        <button class="settings-install-button" id="pwa-install-button" type="button">Install app</button>
        <p class="settings-weak-note" id="pwa-install-note">Install on this device.</p>
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Planning</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link" id="ai-planner-link" type="button">
          <span class="settings-row-label">✨ AI 生成日程</span>
          <span class="settings-row-arrow" aria-hidden="true">›</span>
        </button>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先最近时间任务</span>
          <input type="checkbox" id="next-time-priority-toggle" checked />
        </label>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先重要任务</span>
          <input type="checkbox" id="next-important-priority-toggle" checked />
        </label>
        <button class="settings-row settings-row-link" id="default-duration-row" type="button">
          <span class="settings-row-label">默认任务时长</span>
          <span class="settings-row-trail">
            <span id="default-duration-value">25 min</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </span>
        </button>
        <button class="settings-row settings-row-link" id="day-start-row" type="button">
          <span class="settings-row-label">一天开始时间</span>
          <span class="settings-row-trail">
            <span id="day-start-value">00:00</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </span>
        </button>
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Appearance</div>
      <div class="settings-list-block settings-theme-block">
        <div class="settings-subtitle">Theme</div>
        <div class="theme-grid settings-theme-grid" id="theme-grid"></div>
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Preferences</div>
      <div class="settings-list-block">
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">Completed 默认展开</span>
          <input type="checkbox" id="completed-default-toggle" />
        </label>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">减少纸张纹理</span>
          <input type="checkbox" id="reduce-texture-toggle" />
        </label>
      </div>
    </section>

    <div class="settings-hidden-controls" aria-hidden="true">
      <input type="time" id="day-start-input" />
      <select id="default-duration-select">
        <option value="15">15 min</option>
        <option value="20">20 min</option>
        <option value="25">25 min</option>
        <option value="30">30 min</option>
        <option value="45">45 min</option>
      </select>
    </div>
  `;
}

function ensureAiPlannerPage() {
  if (document.querySelector('[data-page="ai-planner"]')) return;
  const settingsPage = document.querySelector('[data-page="settings"]');
  if (!settingsPage) return;

  const aiPage = document.createElement("section");
  aiPage.className = "page";
  aiPage.dataset.page = "ai-planner";
  aiPage.innerHTML = `
    <header class="page-hero ai-page-hero">
      <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
      <div class="hero-heading">
        <div><h1>AI 生成日程</h1></div>
      </div>
    </header>

    <section class="paper-sheet ai-sheet">
      <section class="ai-step">
        <div class="settings-group-title">① 填写信息</div>
        <div class="settings-list-block ai-fields">
          <label class="ai-field">
            <span>今天想完成什么</span>
            <textarea id="ai-focus-input" rows="3" placeholder="例如：背单词、做一套试卷、写周总结"></textarea>
          </label>
          <label class="ai-field">
            <span>已有安排 / 固定时间</span>
            <textarea id="ai-constraints-input" rows="3" placeholder="例如：10:00 后有课，晚上 11 点前睡觉"></textarea>
          </label>
          <label class="ai-field">
            <span>补充说明</span>
            <textarea id="ai-context-input" rows="3" placeholder="例如：今天想轻一点，优先最重要的两件事"></textarea>
          </label>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">② 生成 prompt</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 prompt</button>
          <textarea id="ai-prompt-output" rows="8" readonly placeholder="生成后会出现在这里"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">③ 复制去 GPT</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 prompt</button>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">④ 粘贴结果</div>
        <div class="settings-list-block ai-actions">
          <textarea id="ai-result-input" rows="8" placeholder="把 GPT 返回的计划粘贴到这里"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">⑤ 预览导入</div>
        <div class="settings-list-block ai-actions">
          <div class="sheet-button-row ai-import-actions">
            <button class="ghost-button ai-action-button" id="ai-preview-import" type="button">预览</button>
            <button class="ghost-button ai-action-button" id="ai-import-plan" type="button">导入到 To-do</button>
          </div>
          <div class="ai-preview-list" id="ai-preview-list"></div>
        </div>
      </section>
    </section>
  `;

  settingsPage.insertAdjacentElement("afterend", aiPage);
}

function refreshDynamicDomRefs() {
  dom.pages = [...document.querySelectorAll(".page")];
  dom.bottomNav = document.querySelector(".bottom-nav");
  dom.themeGrid = document.getElementById("theme-grid");
  dom.pwaInstallButton = document.getElementById("pwa-install-button");
  dom.pwaInstallNote = document.getElementById("pwa-install-note");
  dom.nextTimePriorityToggle = document.getElementById("next-time-priority-toggle");
  dom.nextImportantPriorityToggle = document.getElementById("next-important-priority-toggle");
  dom.dayStartInput = document.getElementById("day-start-input");
  dom.defaultDurationSelect = document.getElementById("default-duration-select");
  dom.completedDefaultToggle = document.getElementById("completed-default-toggle");
  dom.reduceTextureToggle = document.getElementById("reduce-texture-toggle");
  dom.aiPlannerLink = document.getElementById("ai-planner-link");
  dom.defaultDurationRow = document.getElementById("default-duration-row");
  dom.defaultDurationValue = document.getElementById("default-duration-value");
  dom.dayStartRow = document.getElementById("day-start-row");
  dom.dayStartValue = document.getElementById("day-start-value");
  dom.aiPageBack = document.getElementById("ai-page-back");
  dom.aiFocusInput = document.getElementById("ai-focus-input");
  dom.aiConstraintsInput = document.getElementById("ai-constraints-input");
  dom.aiContextInput = document.getElementById("ai-context-input");
  dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
  dom.aiPromptOutput = document.getElementById("ai-prompt-output");
  dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
  dom.aiResultInput = document.getElementById("ai-result-input");
  dom.aiPreviewImport = document.getElementById("ai-preview-import");
  dom.aiImportPlan = document.getElementById("ai-import-plan");
  dom.aiPreviewList = document.getElementById("ai-preview-list");
}

function createSeedState(baseDate = new Date()) {
  const dayStart = cloneDate(baseDate);
  dayStart.setHours(0, 0, 0, 0);

  const folders = [
    {
      id: makeId("folder"),
      name: "Study",
      expanded: true,
      categories: [
        {
          id: makeId("cat"),
          name: "Math",
          color: "#6ea8ff",
          expanded: true,
          templates: [
            { id: makeId("tpl"), name: "Do Exercises", durationMin: 30 },
            { id: makeId("tpl"), name: "Review Notes", durationMin: 25 },
            { id: makeId("tpl"), name: "整理错题", durationMin: 20 },
          ],
        },
        {
          id: makeId("cat"),
          name: "English",
          color: "#ffcb63",
          expanded: true,
          templates: [
            { id: makeId("tpl"), name: "Read Book", durationMin: 30 },
            { id: makeId("tpl"), name: "Practice Vocabulary", durationMin: 20 },
          ],
        },
      ],
    },
    {
      id: makeId("folder"),
      name: "Life",
      expanded: true,
      categories: [
        {
          id: makeId("cat"),
          name: "Daily",
          color: "#8bda9f",
          expanded: true,
          templates: [
            { id: makeId("tpl"), name: "Lunch", durationMin: 40 },
            { id: makeId("tpl"), name: "Shower", durationMin: 15 },
          ],
        },
        {
          id: makeId("cat"),
          name: "Fitness",
          color: "#ffb16f",
          expanded: true,
          templates: [{ id: makeId("tpl"), name: "Exercise", durationMin: 30 }],
        },
      ],
    },
    {
      id: makeId("folder"),
      name: "Work",
      expanded: false,
      categories: [
        {
          id: makeId("cat"),
          name: "Admin",
          color: "#ff9d8d",
          expanded: true,
          templates: [
            { id: makeId("tpl"), name: "Fill Survey", durationMin: 5 },
            { id: makeId("tpl"), name: "Reply Messages", durationMin: 10 },
          ],
        },
      ],
    },
  ];

  const lookup = buildLookupFromFolders(folders);
  const tasks = [
    createTask({
      name: "Read Book",
      time: "08:00",
      folderId: lookup.byTemplateName["Read Book"].folder.id,
      categoryId: lookup.byTemplateName["Read Book"].category.id,
      templateId: lookup.byTemplateName["Read Book"].template.id,
      durationMin: 30,
    }),
    createTask({
      name: "Exercise",
      time: "09:30",
      folderId: lookup.byTemplateName["Exercise"].folder.id,
      categoryId: lookup.byTemplateName["Exercise"].category.id,
      templateId: lookup.byTemplateName["Exercise"].template.id,
      durationMin: 30,
    }),
    createTask({
      name: "Study Math",
      time: "11:00",
      folderId: lookup.byTemplateName["Do Exercises"].folder.id,
      categoryId: lookup.byTemplateName["Do Exercises"].category.id,
      templateId: lookup.byTemplateName["Do Exercises"].template.id,
      durationMin: 45,
      important: true,
    }),
    createTask({
      name: "Lunch",
      time: "13:00",
      folderId: lookup.byTemplateName["Lunch"].folder.id,
      categoryId: lookup.byTemplateName["Lunch"].category.id,
      templateId: lookup.byTemplateName["Lunch"].template.id,
      durationMin: 40,
    }),
    createTask({
      name: "Review Notes",
      time: "18:30",
      folderId: lookup.byTemplateName["Review Notes"].folder.id,
      categoryId: lookup.byTemplateName["Review Notes"].category.id,
      templateId: lookup.byTemplateName["Review Notes"].template.id,
      durationMin: 25,
      important: true,
    }),
    createTask({
      name: "Fill Survey",
      folderId: lookup.byTemplateName["Fill Survey"].folder.id,
      categoryId: lookup.byTemplateName["Fill Survey"].category.id,
      templateId: lookup.byTemplateName["Fill Survey"].template.id,
      durationMin: 5,
      important: true,
    }),
    createTask({
      name: "Room Reset",
      folderId: lookup.byTemplateName["Shower"].folder.id,
      categoryId: lookup.byTemplateName["Shower"].category.id,
      durationMin: 15,
    }),
    createTask({
      name: "Morning Pages",
      time: "06:40",
      folderId: lookup.byTemplateName["Review Notes"].folder.id,
      categoryId: lookup.byTemplateName["Review Notes"].category.id,
      durationMin: 20,
      completed: true,
      completedAt: addMinutes(dayStart, 410).toISOString(),
    }),
  ];

  const activeTimerTask = tasks.find((task) => task.name === "Study Math");
  const sessions = [
    createSession(tasks.find((task) => task.name === "Read Book"), dayStart, 8, 10, 8, 55),
    createSession(tasks.find((task) => task.name === "Exercise"), dayStart, 9, 36, 10, 8),
    createSession(activeTimerTask, dayStart, 10, 15, 11, 45),
    createSession(tasks.find((task) => task.name === "Lunch"), dayStart, 12, 10, 12, 52),
    createSession(tasks.find((task) => task.name === "Fill Survey"), dayStart, 14, 20, 14, 35),
    createSession(tasks.find((task) => task.name === "Review Notes"), shiftDate(dayStart, -1), 19, 0, 19, 28),
    createSession(tasks.find((task) => task.name === "Exercise"), shiftDate(dayStart, -1), 9, 20, 9, 55),
    createSession(tasks.find((task) => task.name === "Read Book"), shiftDate(dayStart, -2), 8, 5, 8, 40),
    createSession(tasks.find((task) => task.name === "Lunch"), shiftDate(dayStart, -2), 12, 0, 12, 38),
    createSession(tasks.find((task) => task.name === "Review Notes"), shiftDate(dayStart, -3), 18, 30, 19, 5),
    createSession(tasks.find((task) => task.name === "Fill Survey"), shiftDate(dayStart, -3), 14, 0, 14, 10),
    createSession(tasks.find((task) => task.name === "Exercise"), shiftDate(dayStart, -4), 9, 10, 9, 40),
    createSession(tasks.find((task) => task.name === "Read Book"), shiftDate(dayStart, -5), 8, 0, 8, 25),
    createSession(tasks.find((task) => task.name === "Study Math"), shiftDate(dayStart, -5), 10, 0, 11, 20),
    createSession(tasks.find((task) => task.name === "Lunch"), shiftDate(dayStart, -6), 12, 18, 12, 55),
  ];

  return {
    currentPage: "home",
    theme: "paper",
    dayStart: "00:00",
    defaultDuration: 25,
    reduceTexture: false,
    showCompletedOpen: false,
    ui: {
      openSheet: null,
      statsRange: "today",
      statsMode: "category",
      statsCategoryFilter: "all",
      statsTaskFilter: "all",
      selectedSegment: null,
      showTrend: false,
      tasksEditMode: false,
      editingTaskId: null,
      createTaskSelection: null,
      categoryTrail: [],
      treeEditor: null,
      customRange: {
        start: formatInputDate(shiftDate(dayStart, -6)),
        end: formatInputDate(dayStart),
      },
    },
    folders,
    tasks,
    sessions,
    activeTimer: {
      taskId: activeTimerTask.id,
      startedAt: new Date(Date.now() - (25 * 60 + 32) * 1000).toISOString(),
      pausedElapsedMs: 0,
      running: true,
    },
  };
}

function createTask({
  name,
  time = "",
  folderId = null,
  categoryId = null,
  templateId = null,
  durationMin = 25,
  important = false,
  completed = false,
  completedAt = null,
}) {
  return {
    id: makeId("task"),
    name,
    scheduledMinutes: time ? parseTimeString(time) : null,
    durationMin,
    important,
    completed,
    completedAt,
    folderId,
    categoryId,
    templateId,
    createdAt: new Date().toISOString(),
  };
}

function createSession(task, day, startHour, startMinute, endHour, endMinute) {
  const start = cloneDate(day);
  start.setHours(startHour, startMinute, 0, 0);
  const end = cloneDate(day);
  end.setHours(endHour, endMinute, 0, 0);
  return {
    id: makeId("session"),
    taskId: task?.id || null,
    taskName: task?.name || "Untitled",
    categoryId: task?.categoryId || null,
    templateId: task?.templateId || null,
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

function bindEvents() {
  dom.navItems.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentPage = button.dataset.target;
      closeAllSheets();
      renderAll();
      persistState();
    });
  });

  dom.fab.addEventListener("click", () => toggleSheet("action-sheet"));
  dom.scrim.addEventListener("click", closeAllSheets);
  dom.todayRefresh.addEventListener("click", renderHome);

  document.querySelectorAll("[data-close-sheet]").forEach((button) => {
    button.addEventListener("click", closeAllSheets);
  });

  document.querySelectorAll("[data-open-sheet]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.openSheet;
      if (target === "task-sheet") {
        prepareTaskDraft();
      }
      if (target === "quick-sheet") {
        dom.quickNameInput.value = "";
      }
      if (target === "log-sheet") {
        dom.logTaskInput.value = "";
      }
      openSheet(target);
    });
  });

  dom.taskCategoryButton.addEventListener("click", () => {
    state.ui.categoryTrail = [];
    renderCategorySheet();
    openSheet("category-sheet");
  });

  dom.taskForm.addEventListener("submit", handleTaskSubmit);
  dom.quickForm.addEventListener("submit", handleQuickStart);
  dom.logForm.addEventListener("submit", handleLogTime);
  dom.tasksEditToggle.addEventListener("click", () => {
    state.ui.tasksEditMode = !state.ui.tasksEditMode;
    renderTasksTree();
    persistState();
  });

  dom.addFolderButton.addEventListener("click", () => openTreeEditor({ mode: "create", type: "folder" }));
  dom.treeEditorForm.addEventListener("submit", handleTreeEditorSubmit);
  dom.treeDeleteButton.addEventListener("click", handleTreeDelete);

  dom.quickNameInput.addEventListener("input", renderQuickSuggestions);
  dom.logTaskInput.addEventListener("input", renderLogSuggestions);
  dom.logStartInput.addEventListener("input", updateLogDuration);
  dom.logEndInput.addEventListener("input", updateLogDuration);

  dom.trendToggle.addEventListener("click", () => {
    state.ui.showTrend = !state.ui.showTrend;
    renderStats();
    persistState();
  });

  dom.dayStartInput.addEventListener("input", (event) => {
    state.dayStart = event.target.value || "00:00";
    persistState();
  });

  dom.defaultDurationSelect.addEventListener("change", (event) => {
    state.defaultDuration = Number(event.target.value);
    persistState();
  });

  dom.completedDefaultToggle.addEventListener("change", (event) => {
    state.showCompletedOpen = event.target.checked;
    renderHome();
    persistState();
  });

  dom.reduceTextureToggle.addEventListener("change", (event) => {
    state.reduceTexture = event.target.checked;
    applyBodyFlags();
    persistState();
  });

  dom.customStartDate.addEventListener("change", (event) => {
    state.ui.customRange.start = event.target.value;
    renderStats();
    persistState();
  });

  dom.customEndDate.addEventListener("change", (event) => {
    state.ui.customRange.end = event.target.value;
    renderStats();
    persistState();
  });
}

function startTicker() {
  if (clockTicker) {
    clearInterval(clockTicker);
  }
  clockTicker = setInterval(() => {
    renderHomeTimerOnly();
  }, 1000);
}

function renderAll() {
  applyTheme();
  applyBodyFlags();
  renderNavigation();
  renderHome();
  renderStats();
  renderTasksTree();
  renderSettings();
  renderQuickSuggestions();
  renderLogSuggestions();
  updateLogDuration();
}

function renderNavigation() {
  dom.pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === state.currentPage);
  });
  dom.navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.target === state.currentPage);
  });
}

function renderHome() {
  dom.homeDate.textContent = formatHeroDate(new Date());
  renderHomeTimerOnly();
  renderNextTasks();
  renderTodoGroups();
}

function renderHomeTimerOnly() {
  const timerState = getTimerPresentation();
  dom.timerStrip.innerHTML = timerState
    ? `
      <div class="timer-row">
        <div class="timer-chip" style="background:${timerState.color};">${escapeHtml(timerState.badge)}</div>
        <div class="timer-main">
          <p class="timer-name">${escapeHtml(timerState.name)}</p>
          <div class="timer-meta">
            <div class="timer-clock">${timerState.elapsed}</div>
            <p class="timer-sub">${escapeHtml(timerState.meta)}</p>
          </div>
          <div class="timer-progress">
            <span style="width:${timerState.progress}%;"></span>
          </div>
        </div>
        <div class="timer-actions">
          <button class="timer-button" id="timer-toggle" type="button">${state.activeTimer.running ? "Pause" : "Play"}</button>
          <button class="timer-button stop" id="timer-stop" type="button">Stop</button>
        </div>
      </div>
    `
    : `
      <div class="timer-row">
        <div class="timer-main">
          <p class="timer-name">No timer running</p>
          <div class="timer-meta">
            <div class="timer-clock">00:00:00</div>
            <p class="timer-sub">Quick Start 可以立刻把一件事送进现在。</p>
          </div>
          <div class="timer-progress"><span style="width:0%"></span></div>
        </div>
        <div class="timer-actions">
          <button class="timer-button" id="timer-new" type="button">Start</button>
        </div>
      </div>
    `;

  document.getElementById("timer-toggle")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-stop")?.addEventListener("click", stopTimer);
  document.getElementById("timer-new")?.addEventListener("click", () => {
    dom.quickNameInput.value = "";
    openSheet("quick-sheet");
  });
}

function renderNextTasks() {
  const nextTasks = getNextTasks();
  if (!nextTasks.length) {
    dom.nextScroll.innerHTML = `<p class="empty-note">今天的待办已经抽空了。</p>`;
    return;
  }

  dom.nextScroll.innerHTML = nextTasks
    .map((task) => {
      const meta = getTaskVisual(task);
      const badge = task.scheduledMinutes == null ? "Flexible" : formatMinutes(task.scheduledMinutes);
      return `
        <article class="next-card" style="${paperGradient(meta.color)}">
          <div class="next-topline">
            <span>${badge}</span>
            <span>${task.important ? "Starred" : meta.groupLabel}</span>
          </div>
          <h3 class="next-name">${escapeHtml(task.name)}</h3>
          <p class="next-meta">${escapeHtml(meta.shortPath)} · ${task.durationMin || state.defaultDuration} min</p>
          <div class="next-footer">
            <div class="chip-row">
              <span class="sticker">${escapeHtml(meta.categoryName)}</span>
              ${task.important ? `<span class="sticker">Important</span>` : ""}
            </div>
            <button class="timeline-start small" data-start-task="${task.id}" type="button">Start</button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.nextScroll.querySelectorAll("[data-start-task]").forEach((button) => {
    button.addEventListener("click", () => startTimerForTask(button.dataset.startTask));
  });
}

function renderTodoGroups() {
  const groups = getGroupedTasks();
  dom.todoGroups.innerHTML = [
    renderTaskGroup("Overdue", groups.overdue, "⚠"),
    renderTaskGroup("Today", groups.today, ""),
    renderTaskGroup("Flexible", groups.flexible, ""),
    renderCompletedGroup(groups.completed),
  ].join("");

  dom.todoGroups.querySelectorAll("[data-task-check]").forEach((input) => {
    input.addEventListener("change", () => toggleTaskComplete(input.dataset.taskCheck));
  });
  dom.todoGroups.querySelectorAll("[data-task-start]").forEach((button) => {
    button.addEventListener("click", () => startTimerForTask(button.dataset.taskStart));
  });
  dom.todoGroups.querySelectorAll("[data-task-edit]").forEach((button) => {
    button.addEventListener("click", () => prepareTaskDraft(button.dataset.taskEdit));
  });
  dom.todoGroups.querySelectorAll("[data-toggle-completed]").forEach((button) => {
    button.addEventListener("click", () => {
      state.showCompletedOpen = !state.showCompletedOpen;
      renderHome();
      persistState();
    });
  });
}

function renderTaskGroup(title, tasks, marker) {
  return `
    <section class="todo-group">
      <div class="group-head">
        <h3>${marker ? `${marker} ${title}` : title}</h3>
        <div class="group-dash"></div>
      </div>
      ${
        tasks.length
          ? `<div class="task-list">${tasks.map((task) => renderTaskRow(task)).join("")}</div>`
          : `<p class="empty-note">${title === "Flexible" ? "没有无时间任务。" : "这一组现在是空的。"}</p>`
      }
    </section>
  `;
}
// FINAL FLAT PASS

function alphaColor(hex, alpha) {
  const normalized = String(hex || "#b8bfd1").replace("#", "").trim();
  const full = normalized.length === 3
    ? normalized.split("").map((part) => part + part).join("")
    : normalized.padEnd(6, "0").slice(0, 6);
  const value = Number.parseInt(full, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getTaskDurationInputElement() {
  return document.getElementById("task-duration-detail-input");
}

function getTaskDurationFieldElement() {
  return document.getElementById("task-duration-field");
}

function getTaskTimeFieldElement() {
  return document.getElementById("task-time-field");
}

function getTaskCustomDateFieldElement() {
  return document.getElementById("task-custom-date-field");
}

function getTaskDurationMinutes() {
  const input = getTaskDurationInputElement();
  const value = Number(input?.value);
  return Number.isFinite(value) && value > 0 ? value : state.defaultDuration;
}

function getTaskWhenMode() {
  if (state.ui.taskWhenMode) return state.ui.taskWhenMode;
  const today = formatInputDate(new Date());
  const hasTime = Boolean(dom.taskTimeInput?.value);
  const dateValue = dom.taskDateInput?.value || "";
  if (!dateValue && !hasTime) return "any";
  if (!dateValue || dateValue === today) return "today";
  return "custom";
}

function formatTaskDateLabel(dateValue) {
  if (!dateValue) return "";
  const today = formatInputDate(new Date());
  if (dateValue === today) return "Today";
  const [year, month, day] = dateValue.split("-");
  return `${year}/${month}/${day}`;
}

function syncTaskWhenFields() {
  const mode = getTaskWhenMode();
  const durationField = getTaskDurationFieldElement();
  const timeField = getTaskTimeFieldElement();
  const dateField = getTaskCustomDateFieldElement();
  const today = formatInputDate(new Date());

  if (durationField) durationField.hidden = false;
  if (timeField) timeField.hidden = mode === "any";
  if (dateField) dateField.hidden = mode !== "custom";

  if (mode === "any") {
    dom.taskTimeInput.value = "";
    dom.taskDateInput.value = "";
  }

  if (mode === "today") {
    dom.taskDateInput.value = today;
  }

  if (mode === "custom" && !dom.taskDateInput.value) {
    dom.taskDateInput.value = today;
  }
}

function renderAll() {
  applyTheme();
  applyBodyFlags();
  renderNavigation();
  renderHome();
  renderStats();
  renderTasksTree();
  renderSettings();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  updateLogDuration();

  const importantLabel = document.querySelector(".important-row span");
  if (importantLabel) importantLabel.textContent = "⭐ Important";
}

function renderNavigation() {
  dom.pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === state.currentPage);
  });
  dom.navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.target === state.currentPage);
  });
  dom.fab.hidden = state.currentPage !== "home";
}

function renderHome() {
  dom.homeDate.textContent = formatHeroDate(new Date());
  if (dom.todayRefresh) dom.todayRefresh.hidden = true;
  renderHomeTimerOnly();
  renderNextTasks();
  renderTodoGroups();
}

function renderHomeTimerOnly() {
  const timerState = getTimerPresentation();

  if (!timerState) {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell timer-strip-shell-idle">
        <p class="timer-strip-name">Nothing running</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">00:00</div>
          <div class="timer-strip-actions">
            <button class="timer-button" id="timer-new" type="button">⏵ Start</button>
          </div>
        </div>
      </div>
    `;
  } else {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell" style="--timer-wash:${alphaColor(timerState.color, 0.1)}; --timer-line:${alphaColor(timerState.color, 0.18)};">
        <p class="timer-strip-name">${escapeHtml(timerState.name)}</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">${timerState.elapsed}</div>
          <div class="timer-strip-actions">
            <button class="timer-button" id="timer-toggle" type="button">${state.activeTimer.running ? "⏸ Pause" : "⏵ Resume"}</button>
            <button class="timer-button stop" id="timer-stop" type="button">⏹ Stop</button>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("timer-toggle")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-stop")?.addEventListener("click", stopTimer);
  document.getElementById("timer-new")?.addEventListener("click", () => {
    dom.quickNameInput.value = "";
    openSheet("quick-sheet");
  });
}

function renderNextTasks() {
  const nextTasks = getNextTasks();
  if (!nextTasks.length) {
    dom.nextScroll.innerHTML = `<p class="empty-note">Nothing queued right now.</p>`;
    return;
  }

  dom.nextScroll.innerHTML = nextTasks
    .map((task) => {
      const visual = getTaskVisual(task);
      const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
      return `
        <article class="next-card next-card-quiet" style="--next-wash:${alphaColor(visual.color, 0.12)}; --next-line:${alphaColor(visual.color, 0.2)};">
          <h3 class="next-name">${escapeHtml(task.name)}</h3>
          <p class="next-meta">${escapeHtml(visual.categoryName)}</p>
          <button class="next-play ${isLive ? "is-live" : ""}" data-start-task="${task.id}" type="button" ${isLive ? "disabled" : ""}>⏵</button>
        </article>
      `;
    })
    .join("");

  dom.nextScroll.querySelectorAll("[data-start-task]").forEach((button) => {
    if (!button.disabled) {
      button.onclick = () => startTimerForTask(button.dataset.startTask);
    }
  });
}

function renderTaskGroup(groupKey, title, tasks, completed = false) {
  const open = state.ui.groupOpen[groupKey];
  return `
    <section class="todo-group">
      <button class="group-toggle" data-toggle-group="${groupKey}" type="button">
        <h3>${title}</h3>
        <div class="group-dash"></div>
        <span class="group-caret">${open ? "▾" : "▸"}</span>
      </button>
      ${
        open
          ? tasks.length
            ? `<div class="task-list">${tasks.map((task) => renderTaskRow(task, completed)).join("")}</div>`
            : `<p class="empty-note">${title === "Flexible" ? "No flexible tasks." : "This section is empty right now."}</p>`
          : ""
      }
    </section>
  `;
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  return `
    <article class="task-row ${isCompleted ? "is-completed" : ""} ${isLive ? "is-running" : ""}" data-task-row="${task.id}">
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      <div class="task-time-block">${timeText}</div>
      <div class="task-main">
        <div class="task-title-row task-title-inline">
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
          <span class="mini-pill inline-tag" style="background:${alphaColor(visual.color, 0.16)}; color:rgba(41,57,84,0.82);">${escapeHtml(visual.categoryName)}</span>
          ${task.important ? '<span class="task-star">★</span>' : ""}
        </div>
        <div class="task-subline">
          <span class="task-duration">${task.durationMin || state.defaultDuration} min</span>
        </div>
      </div>
      <div class="task-side">
        ${
          !task.completed
            ? `<button class="flat-start ${isLive ? "is-live" : ""}" data-task-start="${task.id}" type="button" ${isLive ? "disabled" : ""}>Start</button>`
            : ""
        }
      </div>
    </article>
  `;
}

function startTimerForTask(taskId) {
  if (state.activeTimer?.taskId && state.activeTimer.running) {
    finalizeRunningSession();
  }
  const task = state.tasks.find((entry) => entry.id === taskId);
  state.activeTimer = {
    taskId,
    startedAt: new Date().toISOString(),
    pausedElapsedMs: 0,
    running: true,
    mode: task?.timerMode || "up",
    durationMin: task?.durationMin || state.defaultDuration,
  };
  closeAllSheets();
  renderAll();
  persistState();
}

function renderTaskAdvancedControls() {
  if (!dom.taskAdvancedPanel) return;
  const isOpen = Boolean(state.ui.taskAdvancedOpen);
  dom.taskAdvancedPanel.hidden = !isOpen;
  if (dom.taskMoreToggle) {
    dom.taskMoreToggle.innerHTML = `Repeat · Timer <span class="toggle-inline-arrow ${isOpen ? "is-open" : ""}">▾</span>`;
  }
  if (dom.taskWeekdaysField) dom.taskWeekdaysField.hidden = true;

  const timerMode = state.ui.taskTimerMode || "up";
  dom.taskTimerMode.innerHTML = `
    <div class="timer-mode-stack">
      <button class="timer-radio ${timerMode === "up" ? "is-active" : ""}" data-timer-mode="up" type="button">Count up</button>
      <button class="timer-radio ${timerMode === "down" ? "is-active" : ""}" data-timer-mode="down" type="button">Count down</button>
    </div>
  `;

  dom.taskTimerMode.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskTimerMode = button.dataset.timerMode;
      renderTaskAdvancedControls();
    };
  });

  dom.taskAdvancedPanel.querySelectorAll(".line-field").forEach((row) => {
    row.classList.add("plain-line");
  });
}

function updateTaskTimeSummary() {
  if (!dom.taskTimeLabel || !dom.taskDateLabel) return;

  const quickOptions = [
    { id: "any", label: "Any time" },
    { id: "today", label: "Today" },
    { id: "custom", label: "Custom" },
  ];
  if (!state.ui.taskWhenMode) {
    state.ui.taskWhenMode = getTaskWhenMode();
  }

  dom.taskDateQuickGrid.innerHTML = quickOptions
    .map(
      (option) => `
        <button class="quick-option ${state.ui.taskWhenMode === option.id ? "is-active" : ""}" data-date-preset="${option.id}" type="button">
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.taskDateQuickGrid.querySelectorAll("[data-date-preset]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskWhenMode = button.dataset.datePreset;
      syncTaskWhenFields();
      updateTaskTimeSummary();
    };
  });

  dom.taskDateInput.onchange = () => {
    state.ui.taskWhenMode = "custom";
    syncTaskWhenFields();
    updateTaskTimeSummary();
  };

  dom.taskTimeInput.oninput = () => {
    updateTaskTimeSummary();
  };

  const durationInput = getTaskDurationInputElement();
  if (durationInput) {
    durationInput.oninput = () => updateTaskTimeSummary();
  }

  syncTaskWhenFields();

  const durationText = `${getTaskDurationMinutes()} min`;
  const timeText = dom.taskTimeInput.value ? formatMinutes(parseTimeString(dom.taskTimeInput.value)) : "Any time";

  if (state.ui.taskWhenMode === "any") {
    dom.taskTimeLabel.textContent = `Any time · ${durationText}`;
    dom.taskDateLabel.textContent = "";
    dom.taskDateLabel.hidden = true;
    return;
  }

  dom.taskTimeLabel.textContent = `${timeText} · ${durationText}`;
  dom.taskDateLabel.hidden = false;
  dom.taskDateLabel.textContent =
    state.ui.taskWhenMode === "today" ? "Today" : formatTaskDateLabel(dom.taskDateInput.value || formatInputDate(new Date()));
}

function clearTaskTimeDraft() {
  state.ui.taskWhenMode = "any";
  dom.taskDateInput.value = "";
  dom.taskTimeInput.value = "";
  syncTaskWhenFields();
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function applyTaskTimeDraft() {
  if (state.ui.taskWhenMode === "custom" && !dom.taskDateInput.value) {
    dom.taskDateInput.value = formatInputDate(new Date());
  }
  syncTaskWhenFields();
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function prepareTaskDraft(taskId = null) {
  const task = taskId ? state.tasks.find((item) => item.id === taskId) : null;
  const today = formatInputDate(new Date());
  const durationInput = getTaskDurationInputElement();

  state.ui.editingTaskId = taskId;
  state.ui.createTaskSelection = task
    ? { folderId: task.folderId, categoryId: task.categoryId, templateId: task.templateId }
    : null;

  dom.taskSheetTitle.textContent = task ? "Edit Task" : "Create Task";
  dom.taskNameInput.value = task?.name || "";
  if (durationInput) {
    durationInput.value = task?.durationMin || state.defaultDuration;
  }
  dom.taskImportantInput.checked = Boolean(task?.important);
  dom.taskRepeatSelect.value = task?.repeatMode || "none";
  state.ui.taskWeekdays = [];
  state.ui.taskTimerMode = task?.timerMode || "up";
  dom.taskDateInput.value = task?.scheduledDate || "";
  dom.taskTimeInput.value = task?.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : "";

  if (!task?.scheduledDate && task?.scheduledMinutes == null) {
    state.ui.taskWhenMode = "any";
  } else if (!task?.scheduledDate || task.scheduledDate === today) {
    state.ui.taskWhenMode = "today";
  } else {
    state.ui.taskWhenMode = "custom";
  }

  state.ui.taskAdvancedOpen = Boolean(
    task && ((task.repeatMode && task.repeatMode !== "none") || task.timerMode === "down")
  );

  updateTaskCategoryLabel();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const name = dom.taskNameInput.value.trim();
  if (!name) {
    dom.taskNameInput.focus();
    return;
  }

  const mode = state.ui.taskWhenMode || "any";
  const repeatMode = dom.taskRepeatSelect.value || "none";
  let scheduledDate = null;
  let scheduledMinutes = null;

  if (mode === "today") {
    scheduledDate = formatInputDate(new Date());
    scheduledMinutes = parseTimeString(dom.taskTimeInput.value);
  } else if (mode === "custom") {
    scheduledDate = dom.taskDateInput.value || formatInputDate(new Date());
    scheduledMinutes = parseTimeString(dom.taskTimeInput.value);
  }

  const draft = {
    name,
    scheduledDate,
    scheduledMinutes,
    durationMin: getTaskDurationMinutes(),
    important: dom.taskImportantInput.checked,
    repeatMode,
    weekdays: [],
    timerMode: state.ui.taskTimerMode || "up",
    folderId: state.ui.createTaskSelection?.folderId || null,
    categoryId: state.ui.createTaskSelection?.categoryId || null,
    templateId: state.ui.createTaskSelection?.templateId || null,
  };

  if (state.ui.editingTaskId) {
    const task = state.tasks.find((item) => item.id === state.ui.editingTaskId);
    if (task) Object.assign(task, draft);
  } else {
    state.tasks.unshift({
      id: makeId("task"),
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      ...draft,
    });
  }

  closeAllSheets();
  renderAll();
  persistState();
}

function renderStats() {
  const range = state.ui.statsRange;
  dom.statsTitle.textContent = range === "today" ? "Today's Color" : "Color Review";
  dom.statsRangeNote.textContent = range === "today" ? formatHeroDate(new Date()) : "";
  renderStatsTabs();
  renderStatsFilters();
  const stats = buildStatsDataset(range);
  renderStatsWheel(stats);
  renderStatsBreakdown(stats);
  renderTrendPanel();
  dom.customRangeRow.hidden = range !== "custom";
  dom.customStartDate.value = state.ui.customRange.start;
  dom.customEndDate.value = state.ui.customRange.end;
}

function renderStatsTabs() {
  const ranges = [
    { id: "today", label: "Today" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "custom", label: "Custom" },
  ];

  dom.statsRangeTabs.className = "range-switch";
  dom.statsRangeTabs.innerHTML = ranges
    .map(
      (option) => `
        <button class="range-tab-link ${state.ui.statsRange === option.id ? "is-active" : ""}" data-range-tab="${option.id}" type="button">
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.statsRangeTabs.querySelectorAll("[data-range-tab]").forEach((button) => {
    button.onclick = () => {
      state.ui.statsRange = button.dataset.rangeTab;
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  });

  dom.statsModeTabs.innerHTML = `<span>View:</span><strong>Category</strong>`;
}

function renderStatsFilters() {
  const options = [
    { value: "all", label: "All categories" },
    ...state.folders.map((folder) => ({ value: `folder:${folder.id}`, label: folder.name })),
    ...getAllCategories().map((category) => ({ value: `category:${category.id}`, label: category.name })),
  ];

  dom.statsCategoryFilter.innerHTML = options
    .map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`)
    .join("");

  dom.statsCategoryFilter.value = state.ui.statsCategoryFilter || "all";
  dom.statsCategoryFilter.onchange = (event) => {
    state.ui.statsCategoryFilter = event.target.value;
    state.ui.selectedSegment = null;
    renderStats();
    persistState();
  };
}

function buildStatsDataset(range) {
  const sessions = getFilteredSessions(range);
  const totalMinutes = sessions.reduce((sum, session) => sum + getSessionMinutes(session), 0);

  if (range === "today") {
    const segments = sessions.map((session, index) => {
      const start = new Date(session.start);
      const end = new Date(session.end);
      const task = state.tasks.find((entry) => entry.id === session.taskId);
      const visual = getTaskVisual(task || session);
      return {
        key: `clock-${index}`,
        startMinutes: start.getHours() * 60 + start.getMinutes(),
        endMinutes: end.getHours() * 60 + end.getMinutes(),
        color: visual.color,
        label: visual.label,
        inlineLabel: task?.name || visual.label,
        note: `${formatClock(start)} - ${formatClock(end)} · ${formatDuration(getSessionMinutes(session))}`,
        ratio: Math.max(0, (end - start) / 86400000),
      };
    });
    return {
      type: "clock",
      totalMinutes,
      segments,
      selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
      breakdown: groupBreakdown(sessions),
    };
  }

  const grouped = groupBreakdown(sessions);
  const segments = grouped.map((item, index) => ({
    key: `pie-${index}`,
    ...item,
    inlineLabel: item.label,
    note: `${formatDuration(item.minutes)} · ${item.percent}%`,
    ratio: item.minutes / Math.max(totalMinutes, 1),
  }));

  return {
    type: "pie",
    totalMinutes,
    segments,
    selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
    breakdown: grouped,
  };
}

function groupBreakdown(sessions) {
  const map = new Map();
  const filtered = sessions.filter((session) => matchesStatsCategoryFilter(session));

  filtered.forEach((session) => {
    const task = state.tasks.find((entry) => entry.id === session.taskId);
    const visual = getTaskVisual(task || session);
    const key = session.categoryId || "uncategorized";
    const label = visual.categoryName;
    if (!map.has(key)) {
      map.set(key, { key, label, color: visual.color, minutes: 0 });
    }
    map.get(key).minutes += getSessionMinutes(session);
  });

  const total = [...map.values()].reduce((sum, item) => sum + item.minutes, 0) || 1;
  return [...map.values()]
    .sort((a, b) => b.minutes - a.minutes)
    .map((item) => ({ ...item, percent: Math.round((item.minutes / total) * 100) }));
}

function getFilteredSessions(range) {
  const now = new Date();
  return state.sessions.filter((session) => {
    const start = new Date(session.start);
    if (!matchesStatsCategoryFilter(session)) return false;
    if (range === "today") return isSameDay(start, now);
    if (range === "week") return differenceInDays(now, start) < 7;
    if (range === "month") return start.getFullYear() === now.getFullYear() && start.getMonth() === now.getMonth();
    const customStart = state.ui.customRange.start ? new Date(`${state.ui.customRange.start}T00:00:00`) : null;
    const customEnd = state.ui.customRange.end ? new Date(`${state.ui.customRange.end}T23:59:59`) : null;
    if (!customStart || !customEnd) return true;
    return start >= customStart && start <= customEnd;
  });
}

function renderStatsWheel(stats) {
  const chart = state.ui.statsRange === "today" ? renderClockDialSvg(stats) : renderPieSvg(stats);
  dom.statsWheelCard.innerHTML = `
    <div class="wheel-shell">
      ${chart}
      ${
        stats.selected
          ? `<div class="stats-floating-note"><strong>${escapeHtml(stats.selected.label)}</strong><span>${escapeHtml(stats.selected.note)}</span></div>`
          : ""
      }
    </div>
  `;

  dom.statsTotalRow.innerHTML = `
    <div class="stats-total-chip">
      <strong>${formatDuration(stats.totalMinutes)}</strong>
    </div>
  `;

  dom.statsLegend.innerHTML = "";
  dom.statsWheelCard.querySelectorAll("[data-segment-key]").forEach((node) => {
    node.onclick = (event) => {
      event.stopPropagation();
      state.ui.selectedSegment = state.ui.selectedSegment === node.dataset.segmentKey ? null : node.dataset.segmentKey;
      renderStats();
      persistState();
    };
  });

  dom.statsWheelCard.onclick = (event) => {
    if (!event.target.closest("[data-segment-key]") && state.ui.selectedSegment) {
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    }
  };
}

function renderClockDialSvg(stats) {
  const cx = 160;
  const cy = 160;
  const radius = 110;
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const hour = index * 2;
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (radius + 4);
    const y1 = cy + Math.sin(angle) * (radius + 4);
    const x2 = cx + Math.cos(angle) * (radius + 14);
    const y2 = cy + Math.sin(angle) * (radius + 14);
    const tx = cx + Math.cos(angle) * (radius + 28);
    const ty = cy + Math.sin(angle) * (radius + 28);
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(86,97,126,0.24)" stroke-width="2" />
      <text x="${tx}" y="${ty}" fill="rgba(86,97,126,0.62)" font-size="11" text-anchor="middle" dominant-baseline="middle">${hour === 0 ? 24 : hour}</text>
    `;
  }).join("");

  const segments = stats.segments
    .map((segment) => {
      const startRatio = segment.startMinutes / 1440;
      const endRatio = segment.endMinutes / 1440;
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, startRatio, endRatio)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.24 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${renderChartSliceLabel({
            label: segment.inlineLabel || segment.label,
            ratio: segment.ratio,
            midpointRatio: (startRatio + endRatio) / 2,
            cx,
            cy,
            radius: radius * 0.58,
            threshold: 0.12,
          })}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 320 320" aria-label="time clock">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${ticks}
      ${segments}
    </svg>
  `;
}

function renderPieSvg(stats) {
  const cx = 160;
  const cy = 160;
  const radius = 110;

  if (!stats.segments.length) {
    return `
      <svg class="wheel-svg" viewBox="0 0 320 320" aria-label="pie chart">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      </svg>
    `;
  }

  let currentRatio = 0;
  const segments = stats.segments
    .map((segment) => {
      const start = currentRatio;
      const end = currentRatio + segment.ratio;
      currentRatio = end;
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, start, end)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.28 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${renderChartSliceLabel({
            label: segment.inlineLabel || segment.label,
            ratio: segment.ratio,
            midpointRatio: (start + end) / 2,
            cx,
            cy,
            radius: radius * 0.56,
            threshold: 0.18,
          })}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 320 320" aria-label="pie chart">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${segments}
    </svg>
  `;
}

function renderChartSliceLabel({ label, ratio, midpointRatio, cx, cy, radius, threshold }) {
  if (ratio < threshold) return "";
  const trimmed = String(label || "").trim();
  if (!trimmed) return "";
  const short = escapeHtml(trimmed.length > 9 ? `${trimmed.slice(0, 9)}…` : trimmed);
  const angle = midpointRatio * Math.PI * 2 - Math.PI / 2;
  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius;
  return `<text x="${x}" y="${y}" fill="rgba(35,52,73,0.72)" font-size="10.5" text-anchor="middle" dominant-baseline="middle">${short}</text>`;
}

function renderStatsBreakdown(stats) {
  if (!stats.breakdown.length) {
    dom.statsBreakdown.innerHTML = `<p class="empty-note">No records in this range.</p>`;
    return;
  }

  dom.statsBreakdown.innerHTML = stats.breakdown
    .map(
      (item) => `
        <div class="breakdown-row">
          <span class="breakdown-dot" style="background:${item.color};"></span>
          <span class="breakdown-name">${escapeHtml(item.label)}</span>
          <strong>${formatDuration(item.minutes)}</strong>
          <span class="breakdown-right">${item.percent}%</span>
        </div>
      `
    )
    .join("");
}

function renderTrendPanel() {
  dom.trendToggle.classList.toggle("is-open", state.ui.showTrend);
  dom.trendToggle.innerHTML = `
    <span>Weekly trend</span>
    <span class="trend-arrow">▾</span>
  `;

  dom.trendPanel.hidden = !state.ui.showTrend;
  if (!state.ui.showTrend) return;

  const trend = buildWeeklyTrend();
  dom.trendPanel.innerHTML = `
    <div class="trend-grid">
      ${trend
        .map(
          (entry) => `
            <div class="trend-row">
              <span class="trend-date">${entry.label}</span>
              <div class="trend-bar"><span style="width:${entry.width}%; background:${entry.color};"></span></div>
              <strong>${formatDuration(entry.minutes)}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTasksTree() {
  dom.tasksEditToggle.textContent = state.ui.tasksEditMode ? "Done" : "Edit";
  dom.tasksTree.innerHTML = state.folders
    .map((folder) => {
      const content = folder.expanded
        ? `<div class="folder-content">${folder.categories.map((category) => renderCategoryStackItem(folder, category)).join("")}</div>`
        : "";

      return `
        <article class="folder-block">
          <div class="folder-headline">
            <div class="folder-name">${escapeHtml(folder.name)}</div>
            <div class="tree-controls">
              <button class="tree-plus-plain" data-add-child="category" data-parent-folder="${folder.id}" type="button">+</button>
              ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="folder" data-node-id="${folder.id}" type="button">✎</button>` : ""}
              <button class="tree-toggle ${folder.expanded ? "is-open" : ""}" data-toggle-folder="${folder.id}" type="button">${folder.expanded ? "▾" : "▸"}</button>
            </div>
          </div>
          ${content}
        </article>
      `;
    })
    .join("");

  bindTreeEvents();
}

function renderCategoryStackItem(folder, category) {
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${category.templates
          .map(
            (template) => `
              <div class="template-row-flat">
                <span>${escapeHtml(template.name)}</span>
                <div class="template-tail">
                  <span class="template-duration">${template.durationMin} min</span>
                  ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="template" data-node-id="${template.id}" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">✎</button>` : ""}
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <section class="category-stack-item" style="--tree-color:${category.color};">
      <div class="category-line">
        <button class="category-toggle-line" data-toggle-category="${category.id}" type="button">
          <span class="category-color-bar"></span>
          <span class="category-inline-caret">${category.expanded ? "▾" : "▸"}</span>
          <span class="category-title">${escapeHtml(category.name)}</span>
        </button>
        <div class="tree-controls">
          <button class="tree-plus-plain" data-add-child="template" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">+</button>
          ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="category" data-node-id="${category.id}" data-parent-folder="${folder.id}" type="button">✎</button>` : ""}
        </div>
      </div>
      ${templateMarkup}
    </section>
  `;
}

function renderCompletedGroup(tasks) {
  const open = state.showCompletedOpen;
  return `
    <section class="todo-group">
      <button class="collapse-button" data-toggle-completed type="button">
        Completed · ${tasks.length} ${open ? "▾" : "▸"}
      </button>
      ${
        open
          ? tasks.length
            ? `<div class="task-list" style="margin-top:12px;">${tasks
                .map((task) => renderTaskRow(task, true))
                .join("")}</div>`
            : `<p class="empty-note">完成区还是空的。</p>`
          : ""
      }
    </section>
  `;
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  return `
    <article class="task-row ${isCompleted ? "is-completed" : ""}">
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      <div class="task-main">
        <div class="task-title-row">
          ${task.scheduledMinutes != null ? `<span class="task-time">${formatMinutes(task.scheduledMinutes)}</span>` : ""}
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
        </div>
        <div class="task-tags">
          <span class="mini-pill" style="${chipStyle(visual.color)}">${escapeHtml(visual.categoryName)}</span>
          ${task.important ? `<span class="mini-pill">Important</span>` : ""}
          ${task.durationMin ? `<span class="mini-pill">${task.durationMin} min</span>` : ""}
        </div>
      </div>
      <div class="task-side">
        ${!task.completed ? `<button class="timeline-start small" data-task-start="${task.id}" type="button">Start</button>` : ""}
        <button class="task-action" data-task-edit="${task.id}" type="button">✎</button>
      </div>
    </article>
  `;
}

function renderStats() {
  renderStatsTabs();
  renderStatsFilters();

  const range = state.ui.statsRange;
  const stats = buildStatsDataset(range);
  const rangeTitle =
    range === "today"
      ? "Today's Color"
      : range === "week"
        ? "Weekly Color"
        : range === "month"
          ? "Monthly Color"
          : "Custom Color";

  dom.statsTitle.textContent = rangeTitle;
  dom.statsRangeNote.textContent = stats.note;
  dom.customRangeRow.hidden = range !== "custom";
  dom.customStartDate.value = state.ui.customRange.start;
  dom.customEndDate.value = state.ui.customRange.end;

  renderStatsWheel(stats);
  renderStatsBreakdown(stats);
  renderTrendPanel();
}

function renderStatsTabs() {
  const rangeOptions = [
    { id: "today", label: "Today" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "custom", label: "Custom" },
  ];
  const modeOptions = [
    { id: "category", label: "By Category" },
    { id: "task", label: "By Task" },
  ];

  dom.statsRangeTabs.innerHTML = rangeOptions
    .map(
      (option) => `
      <button class="seg-button ${state.ui.statsRange === option.id ? "is-active" : ""}" data-stats-range="${option.id}" type="button">
        ${option.label}
      </button>
    `
    )
    .join("");

  dom.statsModeTabs.innerHTML = modeOptions
    .map(
      (option) => `
      <button class="seg-button ${state.ui.statsMode === option.id ? "is-active" : ""}" data-stats-mode="${option.id}" type="button">
        ${option.label}
      </button>
    `
    )
    .join("");

  dom.statsRangeTabs.querySelectorAll("[data-stats-range]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.statsRange = button.dataset.statsRange;
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    });
  });
  dom.statsModeTabs.querySelectorAll("[data-stats-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.statsMode = button.dataset.statsMode;
      renderStats();
      persistState();
    });
  });
}

function renderStatsFilters() {
  const categories = getAllCategories();
  const taskOptions = getTaskSuggestions();

  dom.statsCategoryFilter.innerHTML = [
    `<option value="all">All categories</option>`,
    ...categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`),
  ].join("");
  dom.statsTaskFilter.innerHTML = [
    `<option value="all">All tasks</option>`,
    ...taskOptions.map((task) => `<option value="${task.key}">${escapeHtml(task.label)}</option>`),
  ].join("");

  dom.statsCategoryFilter.value = state.ui.statsCategoryFilter;
  dom.statsTaskFilter.value = state.ui.statsTaskFilter;
  dom.statsCategoryFilter.onchange = (event) => {
    state.ui.statsCategoryFilter = event.target.value;
    renderStats();
    persistState();
  };
  dom.statsTaskFilter.onchange = (event) => {
    state.ui.statsTaskFilter = event.target.value;
    renderStats();
    persistState();
  };
}

function renderStatsWheel(stats) {
  dom.statsWheelCard.innerHTML = `
    <div class="wheel-shell">
      ${stats.type === "clock" ? renderClockSvg(stats) : renderDonutSvg(stats)}
      <div class="wheel-center">
        <div>
          <div class="wheel-total">${formatDuration(stats.totalMinutes)}</div>
          <div class="wheel-sub">${escapeHtml(stats.centerLabel)}</div>
        </div>
      </div>
    </div>
    ${
      stats.selected
        ? `
          <div class="segment-annotation">
            <span class="annotation-dot" style="background:${stats.selected.color};"></span>
            <div>
              <strong>${escapeHtml(stats.selected.label)}</strong>
              <div class="wheel-sub">${escapeHtml(stats.selected.note)}</div>
            </div>
          </div>
        `
        : ""
    }
  `;

  dom.statsLegend.innerHTML = stats.legend
    .map(
      (item) => `
      <article class="legend-item">
        <span class="legend-dot" style="background:${item.color};"></span>
        <div class="legend-meta">
          <div class="legend-name">${escapeHtml(item.label)}</div>
          <div class="legend-sub">${formatDuration(item.minutes)} · ${item.percent}%</div>
        </div>
      </article>
    `
    )
    .join("");

  dom.statsWheelCard.querySelectorAll("[data-segment-key]").forEach((node) => {
    node.addEventListener("click", () => {
      state.ui.selectedSegment =
        state.ui.selectedSegment === node.dataset.segmentKey ? null : node.dataset.segmentKey;
      renderStats();
      persistState();
    });
  });
}

function renderStatsBreakdown(stats) {
  if (!stats.breakdown.length) {
    dom.statsBreakdown.innerHTML = `<p class="empty-note">这段时间还没有记录。</p>`;
    return;
  }

  dom.statsBreakdown.innerHTML = stats.breakdown
    .map(
      (item) => `
        <article class="breakdown-row">
          <span class="breakdown-dot" style="background:${item.color};"></span>
          <span class="breakdown-name">${escapeHtml(item.label)}</span>
          <strong>${formatDuration(item.minutes)}</strong>
          <span class="breakdown-right">${item.percent}%</span>
        </article>
      `
    )
    .join("");
}

function renderTrendPanel() {
  const label = state.ui.showTrend ? "Hide weekly trend" : "Show weekly trend";
  dom.trendToggle.querySelector("span").textContent = label;
  dom.trendPanel.hidden = !state.ui.showTrend;
  if (!state.ui.showTrend) {
    return;
  }

  const trend = buildWeeklyTrend();
  dom.trendPanel.innerHTML = `
    <div class="trend-grid">
      ${trend
        .map(
          (entry) => `
          <div class="trend-row">
            <span>${entry.label}</span>
            <div class="trend-bar"><span style="width:${entry.width}%; background:${entry.color};"></span></div>
            <strong>${formatDuration(entry.minutes)}</strong>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function renderTasksTree() {
  dom.tasksEditToggle.textContent = state.ui.tasksEditMode ? "Done" : "Edit";
  dom.tasksTree.innerHTML = state.folders
    .map((folder) => {
      const folderChildren = folder.expanded
        ? folder.categories.map((category) => renderCategoryRow(folder, category)).join("")
        : "";
      return `
        <article class="tree-row folder">
          <div class="tree-head">
            <button class="tree-toggle" data-toggle-folder="${folder.id}" type="button">${folder.expanded ? "▾" : "▸"}</button>
            <div class="tree-name">${escapeHtml(folder.name)}</div>
            <div class="tree-controls">
              <button class="tree-mini" data-add-child="category" data-parent-folder="${folder.id}" type="button">＋</button>
              ${
                state.ui.tasksEditMode
                  ? `
                    <button class="tree-mini" data-edit-node="folder" data-node-id="${folder.id}" type="button">✎</button>
                    <button class="tree-mini" data-move-folder="${folder.id}" data-direction="up" type="button">↑</button>
                    <button class="tree-mini" data-move-folder="${folder.id}" data-direction="down" type="button">↓</button>
                  `
                  : ""
              }
            </div>
          </div>
          ${folderChildren}
        </article>
      `;
    })
    .join("");

  bindTreeEvents();
}

function renderCategoryRow(folder, category) {
  const templates = category.expanded
    ? category.templates
        .map(
          (template) => `
          <article class="tree-row template">
            <div class="tree-head">
              <div class="tree-name">${escapeHtml(template.name)}</div>
              <div class="tree-sub">${template.durationMin} min</div>
              <div class="tree-controls">
                ${
                  state.ui.tasksEditMode
                    ? `<button class="tree-mini" data-edit-node="template" data-node-id="${template.id}" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">✎</button>`
                    : ""
                }
              </div>
            </div>
          </article>
        `
        )
        .join("")
    : "";

  return `
    <article class="tree-row category" style="--tree-color:${category.color};">
      <div class="tree-head">
        <button class="tree-toggle" data-toggle-category="${category.id}" type="button">${category.expanded ? "▾" : "▸"}</button>
        <div>
          <div class="tree-name">${escapeHtml(category.name)}</div>
          <div class="tree-sub">color-bound category</div>
        </div>
        <div class="tree-controls">
          <button class="tree-mini" data-add-child="template" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">＋</button>
          ${
            state.ui.tasksEditMode
              ? `<button class="tree-mini" data-edit-node="category" data-node-id="${category.id}" data-parent-folder="${folder.id}" type="button">✎</button>`
              : ""
          }
        </div>
      </div>
      ${templates}
    </article>
  `;
}

function bindTreeEvents() {
  dom.tasksTree.querySelectorAll("[data-toggle-folder]").forEach((button) => {
    button.addEventListener("click", () => {
      const folder = state.folders.find((item) => item.id === button.dataset.toggleFolder);
      if (!folder) return;
      folder.expanded = !folder.expanded;
      renderTasksTree();
      persistState();
    });
  });

  dom.tasksTree.querySelectorAll("[data-toggle-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = getAllCategories().find((item) => item.id === button.dataset.toggleCategory);
      if (!category) return;
      category.expanded = !category.expanded;
      renderTasksTree();
      persistState();
    });
  });

  dom.tasksTree.querySelectorAll("[data-add-child]").forEach((button) => {
    button.addEventListener("click", () => {
      openTreeEditor({
        mode: "create",
        type: button.dataset.addChild,
        parentFolderId: button.dataset.parentFolder || null,
        parentCategoryId: button.dataset.parentCategory || null,
      });
    });
  });

  dom.tasksTree.querySelectorAll("[data-edit-node]").forEach((button) => {
    button.addEventListener("click", () => {
      openTreeEditor({
        mode: "edit",
        type: button.dataset.editNode,
        nodeId: button.dataset.nodeId,
        parentFolderId: button.dataset.parentFolder || null,
        parentCategoryId: button.dataset.parentCategory || null,
      });
    });
  });

  dom.tasksTree.querySelectorAll("[data-move-folder]").forEach((button) => {
    button.addEventListener("click", () => {
      moveFolder(button.dataset.moveFolder, button.dataset.direction);
    });
  });
}

function renderSettings() {
  dom.themeGrid.innerHTML = THEME_OPTIONS.map(
    (theme) => `
      <button class="theme-card ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
        <div class="theme-preview ${theme.id}"></div>
        <strong>${escapeHtml(theme.name)}</strong>
        <div class="inline-note">${escapeHtml(theme.note)}</div>
      </button>
    `
  ).join("");

  dom.dayStartInput.value = state.dayStart;
  dom.defaultDurationSelect.value = String(state.defaultDuration);
  dom.completedDefaultToggle.checked = state.showCompletedOpen;
  dom.reduceTextureToggle.checked = state.reduceTexture;

  dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    });
  });
}

function renderQuickSuggestions() {
  const query = dom.quickNameInput.value.trim().toLowerCase();
  const suggestions = getTaskSuggestions()
    .filter((item) => !query || item.label.toLowerCase().includes(query))
    .slice(0, 5);
  dom.quickSuggestionList.innerHTML = suggestions
    .map((item) => `<button class="suggestion-pill" data-quick-suggestion="${item.key}" type="button">${escapeHtml(item.label)}</button>`)
    .join("");

  dom.quickSuggestionList.querySelectorAll("[data-quick-suggestion]").forEach((button) => {
    button.addEventListener("click", () => {
      const chosen = getTaskSuggestions().find((item) => item.key === button.dataset.quickSuggestion);
      if (chosen) {
        dom.quickNameInput.value = chosen.label;
      }
      renderQuickSuggestions();
    });
  });
}

function renderLogSuggestions() {
  const query = dom.logTaskInput.value.trim().toLowerCase();
  const suggestions = getTaskSuggestions()
    .filter((item) => !query || item.label.toLowerCase().includes(query))
    .slice(0, 5);
  dom.logSuggestionList.innerHTML = suggestions
    .map((item) => `<button class="suggestion-pill" data-log-suggestion="${item.key}" type="button">${escapeHtml(item.label)}</button>`)
    .join("");

  dom.logSuggestionList.querySelectorAll("[data-log-suggestion]").forEach((button) => {
    button.addEventListener("click", () => {
      const chosen = getTaskSuggestions().find((item) => item.key === button.dataset.logSuggestion);
      if (chosen) {
        dom.logTaskInput.value = chosen.label;
      }
      renderLogSuggestions();
    });
  });
}

function updateLogDuration() {
  const start = parseTimeString(dom.logStartInput.value);
  const end = parseTimeString(dom.logEndInput.value);
  const minutes = start != null && end != null && end > start ? end - start : 0;
  dom.logDurationNote.textContent = `Duration: ${minutes} min`;
}

function prepareTaskDraft(taskId = null) {
  const task = taskId ? state.tasks.find((item) => item.id === taskId) : null;
  state.ui.editingTaskId = taskId;
  state.ui.createTaskSelection = task
    ? { folderId: task.folderId, categoryId: task.categoryId, templateId: task.templateId }
    : null;

  dom.taskSheetTitle.textContent = task ? "Edit Task" : "Create Task";
  dom.taskNameInput.value = task?.name || "";
  dom.taskTimeInput.value = task?.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : "";
  dom.taskDurationInput.value = task?.durationMin || "";
  dom.taskImportantInput.checked = Boolean(task?.important);
  updateTaskCategoryLabel();
  openSheet("task-sheet");
}

function updateTaskCategoryLabel() {
  if (!state.ui.createTaskSelection?.categoryId) {
    dom.taskCategoryLabel.textContent = "Choose category";
    return;
  }
  const path = getSelectionPath(state.ui.createTaskSelection);
  dom.taskCategoryLabel.textContent = path.fullPath;
}

function renderCategorySheet() {
  const trail = state.ui.categoryTrail;
  const level = trail.length;
  dom.categorySheetTitle.textContent =
    level === 0 ? "Choose folder" : level === 1 ? "Choose category" : "Choose template";

  dom.categoryBreadcrumb.innerHTML = [
    `<button class="quick-chip" data-category-root type="button">Root</button>`,
    ...trail.map(
      (crumb, index) => `<button class="quick-chip" data-category-breadcrumb="${index}" type="button">${escapeHtml(crumb.label)}</button>`
    ),
  ].join("");

  const items = getCategoryLevelItems(trail);
  dom.categoryList.innerHTML = items
    .map((item) => {
      const colorDot = item.color ? `<span class="annotation-dot" style="background:${item.color};"></span>` : "";
      return `
        <button class="category-item" data-category-item="${item.id}" data-category-kind="${item.kind}" type="button">
          <span>${colorDot}${escapeHtml(item.label)}</span>
          <strong>${item.kind === "template" ? "Use" : "›"}</strong>
        </button>
      `;
    })
    .join("");

  dom.categoryBreadcrumb.querySelector("[data-category-root]")?.addEventListener("click", () => {
    state.ui.categoryTrail = [];
    renderCategorySheet();
  });
  dom.categoryBreadcrumb.querySelectorAll("[data-category-breadcrumb]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.categoryBreadcrumb);
      state.ui.categoryTrail = state.ui.categoryTrail.slice(0, index + 1);
      renderCategorySheet();
    });
  });
  dom.categoryList.querySelectorAll("[data-category-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = items.find((entry) => entry.id === button.dataset.categoryItem);
      if (!item) return;
      if (item.kind === "use-category") {
        state.ui.createTaskSelection = {
          folderId: item.folderId,
          categoryId: item.categoryId,
          templateId: null,
        };
        updateTaskCategoryLabel();
        openSheet("task-sheet");
        return;
      }
      if (item.kind === "folder" || item.kind === "category") {
        state.ui.categoryTrail = [...state.ui.categoryTrail, item];
        renderCategorySheet();
        return;
      }
      state.ui.createTaskSelection = {
        folderId: item.folderId,
        categoryId: item.categoryId,
        templateId: item.id,
      };
      updateTaskCategoryLabel();
      openSheet("task-sheet");
    });
  });
}

function openTreeEditor(config) {
  state.ui.treeEditor = config;
  const current = getTreeEditorCurrent(config);
  const titleMap = {
    folder: config.mode === "edit" ? "Edit Folder" : "New Folder",
    category: config.mode === "edit" ? "Edit Category" : "New Category",
    template: config.mode === "edit" ? "Edit Template" : "New Template",
  };
  dom.treeEditorTitle.textContent = titleMap[config.type] || `${config.mode === "edit" ? "Edit" : "New"} ${capitalize(config.type)}`;
  dom.treeNameInput.value = current?.name || "";
  dom.treeNameInput.placeholder = "Name";
  dom.treeDurationField.hidden = config.type !== "template";
  dom.treeDurationInput.value = current?.durationMin || "";
  dom.treeColorPicker.hidden = config.type !== "category";
  dom.treeDeleteButton.hidden = config.mode !== "edit";
  renderColorPicker(current?.color || CATEGORY_COLORS[0]);
  openSheet("tree-editor-sheet");
}

function renderColorPicker(selected) {
  if (dom.treeColorPicker.hidden) return;
  const current = selected || CATEGORY_COLORS[0];
  dom.treeColorPicker.dataset.selectedColor = current;
  dom.treeColorPicker.innerHTML = CATEGORY_COLORS.map(
    (color) => `
      <button
        class="color-swatch ${current === color ? "is-selected" : ""}"
        data-color-swatch="${color}"
        type="button"
        style="background:${color};"
      ></button>
    `
  ).join("");
  dom.treeColorPicker.querySelectorAll("[data-color-swatch]").forEach((button) => {
    button.addEventListener("click", () => renderColorPicker(button.dataset.colorSwatch));
  });
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const name = dom.taskNameInput.value.trim();
  if (!name) {
    dom.taskNameInput.focus();
    return;
  }

  const draft = {
    name,
    scheduledMinutes: parseTimeString(dom.taskTimeInput.value),
    durationMin: Number(dom.taskDurationInput.value) || state.defaultDuration,
    important: dom.taskImportantInput.checked,
    folderId: state.ui.createTaskSelection?.folderId || null,
    categoryId: state.ui.createTaskSelection?.categoryId || null,
    templateId: state.ui.createTaskSelection?.templateId || null,
  };

  if (state.ui.editingTaskId) {
    const task = state.tasks.find((item) => item.id === state.ui.editingTaskId);
    if (task) {
      Object.assign(task, draft);
    }
  } else {
    state.tasks.unshift({
      id: makeId("task"),
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      ...draft,
    });
  }

  closeAllSheets();
  renderAll();
  persistState();
}

function handleQuickStart(event) {
  event.preventDefault();
  const name = dom.quickNameInput.value.trim();
  if (!name) {
    dom.quickNameInput.focus();
    return;
  }

  const match = resolveSuggestion(name);
  let task = null;
  if (match?.type === "task") {
    task = state.tasks.find((entry) => entry.id === match.taskId) || null;
  } else if (match?.type === "template") {
    task = {
      id: makeId("task"),
      name: match.label,
      scheduledMinutes: null,
      durationMin: match.durationMin || state.defaultDuration,
      important: false,
      completed: false,
      completedAt: null,
      folderId: match.folderId,
      categoryId: match.categoryId,
      templateId: match.templateId,
      createdAt: new Date().toISOString(),
    };
    state.tasks.unshift(task);
  } else {
    task = {
      id: makeId("task"),
      name,
      scheduledMinutes: null,
      durationMin: state.defaultDuration,
      important: false,
      completed: false,
      completedAt: null,
      folderId: null,
      categoryId: null,
      templateId: null,
      createdAt: new Date().toISOString(),
    };
    state.tasks.unshift(task);
  }

  if (task) startTimerForTask(task.id);
  closeAllSheets();
  state.currentPage = "home";
  renderAll();
  persistState();
}

function handleLogTime(event) {
  event.preventDefault();
  const label = dom.logTaskInput.value.trim();
  const start = parseTimeString(dom.logStartInput.value);
  const end = parseTimeString(dom.logEndInput.value);
  if (!label || start == null || end == null || end <= start) {
    return;
  }

  const match = resolveSuggestion(label);
  let task = null;
  if (match?.type === "task") {
    task = state.tasks.find((entry) => entry.id === match.taskId) || null;
  } else if (match?.type === "template") {
    task = {
      id: makeId("task"),
      name: match.label,
      scheduledMinutes: null,
      durationMin: end - start,
      important: false,
      completed: false,
      completedAt: null,
      folderId: match.folderId,
      categoryId: match.categoryId,
      templateId: match.templateId,
      createdAt: new Date().toISOString(),
    };
    state.tasks.unshift(task);
  } else {
    task = {
      id: makeId("task"),
      name: label,
      scheduledMinutes: null,
      durationMin: end - start,
      important: false,
      completed: false,
      completedAt: null,
      folderId: null,
      categoryId: null,
      templateId: null,
      createdAt: new Date().toISOString(),
    };
    state.tasks.unshift(task);
  }

  const day = new Date();
  day.setHours(0, 0, 0, 0);
  state.sessions.unshift({
    id: makeId("session"),
    taskId: task.id,
    taskName: task.name,
    categoryId: task.categoryId,
    templateId: task.templateId,
    start: addMinutes(day, start).toISOString(),
    end: addMinutes(day, end).toISOString(),
  });

  dom.logForm.reset();
  updateLogDuration();
  closeAllSheets();
  state.currentPage = "stats";
  renderAll();
  persistState();
}

function handleTreeEditorSubmit(event) {
  event.preventDefault();
  const config = state.ui.treeEditor;
  if (!config) return;
  const name = dom.treeNameInput.value.trim();
  if (!name) {
    dom.treeNameInput.focus();
    return;
  }

  if (config.type === "folder") {
    if (config.mode === "edit") {
      const folder = state.folders.find((entry) => entry.id === config.nodeId);
      if (folder) folder.name = name;
    } else {
      state.folders.push({ id: makeId("folder"), name, expanded: true, categories: [] });
    }
  }

  if (config.type === "category") {
    const folder = state.folders.find((entry) => entry.id === config.parentFolderId);
    if (!folder) return;
    if (config.mode === "edit") {
      const category = folder.categories.find((entry) => entry.id === config.nodeId);
      if (category) {
        category.name = name;
        category.color = dom.treeColorPicker.dataset.selectedColor || category.color;
      }
    } else {
      folder.categories.push({
        id: makeId("cat"),
        name,
        color: dom.treeColorPicker.dataset.selectedColor || CATEGORY_COLORS[0],
        expanded: true,
        templates: [],
      });
      folder.expanded = true;
    }
  }

  if (config.type === "template") {
    const category = findCategory(config.parentFolderId, config.parentCategoryId);
    if (!category) return;
    const duration = Number(dom.treeDurationInput.value) || state.defaultDuration;
    if (config.mode === "edit") {
      const template = category.templates.find((entry) => entry.id === config.nodeId);
      if (template) {
        template.name = name;
        template.durationMin = duration;
      }
    } else {
      category.templates.push({ id: makeId("tpl"), name, durationMin: duration });
      category.expanded = true;
    }
  }

  closeAllSheets();
  renderAll();
  persistState();
}

function handleTreeDelete() {
  const config = state.ui.treeEditor;
  if (!config || config.mode !== "edit") return;
  if (!window.confirm("Delete this item?")) return;

  if (config.type === "folder") {
    if (folderHasLinkedItems(config.nodeId)) {
      window.alert("This folder is still used by tasks.");
      return;
    }
    state.folders = state.folders.filter((folder) => folder.id !== config.nodeId);
  }

  if (config.type === "category") {
    if (hasTasksUsingCategory(config.nodeId)) {
      window.alert("This category is still used by tasks or sessions.");
      return;
    }
    const folder = state.folders.find((entry) => entry.id === config.parentFolderId);
    if (folder) {
      folder.categories = folder.categories.filter((category) => category.id !== config.nodeId);
    }
  }

  if (config.type === "template") {
    if (hasTasksUsingTemplate(config.nodeId)) {
      window.alert("This template is still used by tasks or sessions.");
      return;
    }
    const category = findCategory(config.parentFolderId, config.parentCategoryId);
    if (category) {
      category.templates = category.templates.filter((template) => template.id !== config.nodeId);
    }
  }

  closeAllSheets();
  renderAll();
  persistState();
}

function toggleTaskComplete(taskId) {
  const task = state.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;
  if (task.completed && state.activeTimer?.taskId === task.id) {
    stopTimer();
  }
  renderHome();
  renderStats();
  persistState();
}

function startTimerForTask(taskId) {
  if (state.activeTimer?.taskId && state.activeTimer.running) {
    finalizeRunningSession();
  }
  state.activeTimer = {
    taskId,
    startedAt: new Date().toISOString(),
    pausedElapsedMs: 0,
    running: true,
  };
  closeAllSheets();
  renderHomeTimerOnly();
  persistState();
}

function toggleTimer() {
  if (!state.activeTimer) return;
  if (state.activeTimer.running) {
    state.activeTimer.pausedElapsedMs = getElapsedMs(state.activeTimer);
    state.activeTimer.running = false;
  } else {
    state.activeTimer.startedAt = new Date(Date.now() - state.activeTimer.pausedElapsedMs).toISOString();
    state.activeTimer.running = true;
  }
  renderHomeTimerOnly();
  persistState();
}

function stopTimer() {
  finalizeRunningSession();
  state.activeTimer = null;
  renderAll();
  persistState();
}

function finalizeRunningSession() {
  const active = state.activeTimer;
  if (!active?.taskId) return;
  const task = state.tasks.find((entry) => entry.id === active.taskId);
  if (!task) return;
  const elapsedMs = getElapsedMs(active);
  const end = new Date();
  const start = new Date(end.getTime() - elapsedMs);
  state.sessions.unshift({
    id: makeId("session"),
    taskId: task.id,
    taskName: task.name,
    categoryId: task.categoryId,
    templateId: task.templateId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}

function buildStatsDataset(range) {
  const sessions = getFilteredSessions(range);
  const totalMinutes = sessions.reduce((sum, session) => sum + getSessionMinutes(session), 0);
  const centerLabel =
    range === "today" ? "Tracked today" : range === "week" ? "Tracked this week" : range === "month" ? "Tracked this month" : "Tracked in range";
  const note =
    range === "today" ? formatHeroDate(new Date()) : range === "week" ? "最近 7 天" : range === "month" ? "这个月" : "你挑出来的时间段";

  if (range === "today") {
    const segments = sessions.map((session, index) => {
      const start = new Date(session.start);
      const end = new Date(session.end);
      const task = state.tasks.find((entry) => entry.id === session.taskId);
      const visual = getTaskVisual(task || session);
      return {
        key: `clock-${index}`,
        startMinutes: start.getHours() * 60 + start.getMinutes(),
        endMinutes: end.getHours() * 60 + end.getMinutes(),
        color: visual.color,
        label: visual.label,
        note: `${formatClock(start)} - ${formatClock(end)} · ${formatDuration(getSessionMinutes(session))}`,
      };
    });
    return {
      type: "clock",
      totalMinutes,
      centerLabel,
      note,
      segments,
      selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
      legend: groupBreakdown(sessions, "category").slice(0, 6),
      breakdown: groupBreakdown(sessions, state.ui.statsMode),
    };
  }

  const grouped = groupBreakdown(sessions, state.ui.statsMode);
  let current = 0;
  const segments = grouped.map((item, index) => {
    current += item.minutes;
    return { key: `donut-${index}`, ...item, note: `${formatDuration(item.minutes)} · ${item.percent}%` };
  });
  return {
    type: "donut",
    totalMinutes,
    centerLabel,
    note,
    segments,
    selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
    legend: groupBreakdown(sessions, "category").slice(0, 6),
    breakdown: grouped,
  };
}

function renderClockSvg(stats) {
  const cx = 170;
  const cy = 170;
  const radius = 122;
  const thickness = 40;
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const hour = index * 2;
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (radius + 12);
    const y1 = cy + Math.sin(angle) * (radius + 12);
    const x2 = cx + Math.cos(angle) * (radius + 22);
    const y2 = cy + Math.sin(angle) * (radius + 22);
    const tx = cx + Math.cos(angle) * (radius + 36);
    const ty = cy + Math.sin(angle) * (radius + 36);
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(86,97,126,0.28)" stroke-width="2" />
      <text x="${tx}" y="${ty}" fill="rgba(86,97,126,0.68)" font-size="12" text-anchor="middle" dominant-baseline="middle">${hour === 0 ? 24 : hour}</text>
    `;
  }).join("");

  const segments = stats.segments
    .map(
      (segment) => `
        <path
          d="${describeArc(cx, cy, radius, thickness, segment.startMinutes / 1440, segment.endMinutes / 1440)}"
          fill="${segment.color}"
          opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.4 : 0.95}"
          data-segment-key="${segment.key}"
          style="cursor:pointer"
        ></path>
      `
    )
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="time wheel">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="rgba(255,255,255,0.64)" stroke-width="${thickness + 6}" />
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="rgba(96,106,138,0.08)" stroke-width="${thickness}" />
      ${ticks}
      ${segments}
    </svg>
  `;
}

function renderDonutSvg(stats) {
  const cx = 170;
  const cy = 170;
  const radius = 122;
  const thickness = 44;
  let currentRatio = 0;
  const segments = stats.segments
    .map((segment) => {
      const start = currentRatio;
      const end = currentRatio + segment.minutes / Math.max(stats.totalMinutes, 1);
      currentRatio = end;
      return `
        <path
          d="${describeArc(cx, cy, radius, thickness, start, end)}"
          fill="${segment.color}"
          opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.42 : 0.96}"
          data-segment-key="${segment.key}"
          style="cursor:pointer"
        ></path>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="donut chart">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="rgba(96,106,138,0.08)" stroke-width="${thickness}" />
      ${segments}
    </svg>
  `;
}

function groupBreakdown(sessions, mode) {
  const map = new Map();
  const filtered = sessions.filter((session) => {
    const categoryOkay = state.ui.statsCategoryFilter === "all" || session.categoryId === state.ui.statsCategoryFilter;
    const taskOkay =
      state.ui.statsTaskFilter === "all" ||
      session.taskId === state.ui.statsTaskFilter ||
      session.templateId === state.ui.statsTaskFilter;
    return categoryOkay && taskOkay;
  });

  filtered.forEach((session) => {
    const task = state.tasks.find((entry) => entry.id === session.taskId);
    const visual = getTaskVisual(task || session);
    const key = mode === "task" ? session.taskId || session.templateId || session.taskName : session.categoryId || "uncategorized";
    const label = mode === "task" ? session.taskName : visual.categoryName;
    if (!map.has(key)) {
      map.set(key, { key, label, color: visual.color, minutes: 0 });
    }
    map.get(key).minutes += getSessionMinutes(session);
  });

  const total = [...map.values()].reduce((sum, item) => sum + item.minutes, 0) || 1;
  return [...map.values()]
    .sort((a, b) => b.minutes - a.minutes)
    .map((item) => ({ ...item, percent: Math.round((item.minutes / total) * 100) }));
}

function buildWeeklyTrend() {
  const days = Array.from({ length: 7 }, (_, index) => shiftDate(new Date(), -6 + index));
  const totals = days.map((day) => {
    const sameDaySessions = state.sessions.filter((session) => isSameDay(new Date(session.start), day));
    return {
      label: `${day.getMonth() + 1}/${day.getDate()}`,
      minutes: sameDaySessions.reduce((sum, session) => sum + getSessionMinutes(session), 0),
    };
  });
  const max = Math.max(...totals.map((entry) => entry.minutes), 1);
  return totals.map((entry, index) => ({
    ...entry,
    width: Math.round((entry.minutes / max) * 100),
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  }));
}

function getFilteredSessions(range) {
  const now = new Date();
  return state.sessions.filter((session) => {
    const start = new Date(session.start);
    const categoryOkay = state.ui.statsCategoryFilter === "all" || session.categoryId === state.ui.statsCategoryFilter;
    const taskOkay =
      state.ui.statsTaskFilter === "all" ||
      session.taskId === state.ui.statsTaskFilter ||
      session.templateId === state.ui.statsTaskFilter;
    if (!categoryOkay || !taskOkay) return false;
    if (range === "today") return isSameDay(start, now);
    if (range === "week") return differenceInDays(now, start) < 7;
    if (range === "month") return start.getFullYear() === now.getFullYear() && start.getMonth() === now.getMonth();
    const customStart = state.ui.customRange.start ? new Date(`${state.ui.customRange.start}T00:00:00`) : null;
    const customEnd = state.ui.customRange.end ? new Date(`${state.ui.customRange.end}T23:59:59`) : null;
    if (!customStart || !customEnd) return true;
    return start >= customStart && start <= customEnd;
  });
}

function getGroupedTasks() {
  const nowMinutes = getMinutesNow();
  const incomplete = state.tasks.filter((task) => !task.completed);
  const completed = state.tasks.filter((task) => task.completed);
  return {
    overdue: incomplete.filter((task) => task.scheduledMinutes != null && task.scheduledMinutes < nowMinutes).sort(sortByTime),
    today: incomplete.filter((task) => task.scheduledMinutes != null && task.scheduledMinutes >= nowMinutes).sort(sortByTime),
    flexible: incomplete.filter((task) => task.scheduledMinutes == null).sort((a, b) => Number(b.important) - Number(a.important)),
    completed: completed.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0)),
  };
}

function getNextTasks() {
  const nowMinutes = getMinutesNow();
  const incomplete = state.tasks.filter((task) => !task.completed);
  const chosen = [];
  const seen = new Set();

  incomplete
    .filter((task) => task.scheduledMinutes != null)
    .sort((a, b) => Math.abs(a.scheduledMinutes - nowMinutes) - Math.abs(b.scheduledMinutes - nowMinutes) || sortByTime(a, b))
    .slice(0, 3)
    .forEach((task) => {
      if (!seen.has(task.id)) {
        seen.add(task.id);
        chosen.push(task);
      }
    });

  incomplete
    .filter((task) => task.important)
    .sort((a, b) => (a.scheduledMinutes ?? 9999) - (b.scheduledMinutes ?? 9999))
    .forEach((task) => {
      if (!seen.has(task.id) && chosen.length < 5) {
        seen.add(task.id);
        chosen.push(task);
      }
    });

  incomplete
    .filter((task) => task.scheduledMinutes == null)
    .forEach((task) => {
      if (!seen.has(task.id) && chosen.length < 5) {
        seen.add(task.id);
        chosen.push(task);
      }
    });

  return chosen;
}

function getTaskVisual(taskLike) {
  const category = taskLike?.categoryId ? getAllCategories().find((entry) => entry.id === taskLike.categoryId) : null;
  const template = taskLike?.templateId ? getAllTemplates().find((entry) => entry.id === taskLike.templateId) : null;
  const folder = taskLike?.folderId ? state.folders.find((entry) => entry.id === taskLike.folderId) : null;
  const color = category?.color || "#b8bfd1";
  return {
    color,
    categoryName: category?.name || "Unfiled",
    label: taskLike?.name || taskLike?.taskName || template?.name || "Untitled",
    shortPath: template?.name || category?.name || folder?.name || "Unfiled",
    fullPath: [folder?.name, category?.name, template?.name].filter(Boolean).join(" / "),
    badge: category?.name || "Quick Start",
    name: taskLike?.name || taskLike?.taskName || template?.name || "Untitled",
    meta: template?.name && category?.name ? `${category.name} · ${template.name}` : category?.name || "Flexible task",
    groupLabel: taskLike?.scheduledMinutes == null ? "Flexible" : "Timeline",
  };
}

function getTimerPresentation() {
  if (!state.activeTimer?.taskId) return null;
  const task = state.tasks.find((entry) => entry.id === state.activeTimer.taskId);
  if (!task) return null;
  const visual = getTaskVisual(task);
  const elapsedMs = getElapsedMs(state.activeTimer);
  const planned = Math.max(task.durationMin || state.defaultDuration, 1) * 60000;
  return {
    color: visual.color,
    badge: visual.categoryName,
    name: task.name,
    elapsed: formatClockDuration(elapsedMs),
    progress: Math.min(100, Math.round((elapsedMs / planned) * 100)),
    meta: state.activeTimer.running ? `${visual.shortPath} · recording now` : `${visual.shortPath} · paused`,
  };
}

function getElapsedMs(timer) {
  if (!timer) return 0;
  if (!timer.running) return timer.pausedElapsedMs || 0;
  return Math.max(0, Date.now() - new Date(timer.startedAt).getTime());
}

function resolveSuggestion(label) {
  const normalized = label.trim().toLowerCase();
  return getTaskSuggestions().find((item) => item.label.toLowerCase() === normalized) || null;
}

function getTaskSuggestions() {
  const taskItems = state.tasks.map((task) => ({ key: task.id, label: task.name, type: "task", taskId: task.id }));
  const templateItems = getAllTemplates().map((entry) => ({
    key: entry.id,
    label: entry.name,
    type: "template",
    templateId: entry.id,
    categoryId: entry.categoryId,
    folderId: entry.folderId,
    durationMin: entry.durationMin,
  }));
  const unique = new Map();
  [...taskItems, ...templateItems].forEach((item) => {
    if (!unique.has(item.label.toLowerCase())) unique.set(item.label.toLowerCase(), item);
  });
  return [...unique.values()];
}

function getSelectionPath(selection) {
  const folder = state.folders.find((entry) => entry.id === selection.folderId);
  const category = getAllCategories().find((entry) => entry.id === selection.categoryId);
  const template = getAllTemplates().find((entry) => entry.id === selection.templateId);
  return { fullPath: [folder?.name, category?.name, template?.name].filter(Boolean).join(" / ") };
}

function getCategoryLevelItems(trail) {
  if (!trail.length) {
    return state.folders.map((folder) => ({ id: folder.id, label: folder.name, kind: "folder" }));
  }
  if (trail.length === 1) {
    const folder = state.folders.find((entry) => entry.id === trail[0].id);
    return (folder?.categories.map((category) => ({ id: category.id, label: category.name, kind: "category", color: category.color, folderId: folder.id })) || []);
  }
  const folder = state.folders.find((entry) => entry.id === trail[0].id);
  const category = folder?.categories.find((entry) => entry.id === trail[1].id);
  return [
    {
      id: `${category?.id}-direct`,
      label: `直接使用 ${category?.name || "这个分类"}`,
      kind: "use-category",
      color: category?.color,
      folderId: folder?.id,
      categoryId: category?.id,
    },
    ...(
      category?.templates.map((template) => ({
      id: template.id,
      label: template.name,
      kind: "template",
      color: category.color,
      folderId: folder.id,
      categoryId: category.id,
      })) || []
    ),
  ];
}

function openSheet(id) {
  closeAllSheets(false);
  state.ui.openSheet = id;
  dom.scrim.hidden = false;
  const target = document.getElementById(id);
  target?.removeAttribute("hidden");
  requestAnimationFrame(() => target?.classList.add("is-open"));
}

function toggleSheet(id) {
  if (state.ui.openSheet === id) closeAllSheets();
  else openSheet(id);
}

function closeAllSheets(persist = true) {
  state.ui.openSheet = null;
  dom.scrim.hidden = true;
  document.querySelectorAll(".sheet-panel").forEach((sheet) => {
    sheet.classList.remove("is-open");
    sheet.setAttribute("hidden", "");
  });
  if (persist) persistState();
}

function applyTheme() {
  dom.body.dataset.theme = state.theme;
  applyBodyFlags();
}

function applyBodyFlags() {
  dom.body.classList.toggle("reduce-texture", state.reduceTexture);
}

function moveFolder(folderId, direction) {
  const index = state.folders.findIndex((entry) => entry.id === folderId);
  if (index === -1) return;
  const swap = direction === "up" ? index - 1 : index + 1;
  if (swap < 0 || swap >= state.folders.length) return;
  [state.folders[index], state.folders[swap]] = [state.folders[swap], state.folders[index]];
  renderTasksTree();
  persistState();
}

function getAllCategories() {
  return state.folders.flatMap((folder) => folder.categories);
}

function getAllTemplates() {
  return state.folders.flatMap((folder) =>
    folder.categories.flatMap((category) =>
      category.templates.map((template) => ({ ...template, categoryId: category.id, folderId: folder.id }))
    )
  );
}

function findCategory(folderId, categoryId) {
  const folder = state.folders.find((entry) => entry.id === folderId);
  return folder?.categories.find((entry) => entry.id === categoryId) || null;
}

function getTreeEditorCurrent(config) {
  if (config.type === "folder") return state.folders.find((entry) => entry.id === config.nodeId) || null;
  if (config.type === "category") return findCategory(config.parentFolderId, config.nodeId);
  if (config.type === "template") {
    const category = findCategory(config.parentFolderId, config.parentCategoryId);
    return category?.templates.find((entry) => entry.id === config.nodeId) || null;
  }
  return null;
}

function buildLookupFromFolders(folders) {
  const byTemplateName = {};
  folders.forEach((folder) => {
    folder.categories.forEach((category) => {
      category.templates.forEach((template) => {
        byTemplateName[template.name] = { folder, category, template };
      });
    });
  });
  return { byTemplateName };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createSeedState();
  try {
    const parsed = JSON.parse(raw);
    const seed = createSeedState();
    return {
      ...seed,
      ...parsed,
      ui: {
        ...seed.ui,
        ...parsed.ui,
        customRange: { ...seed.ui.customRange, ...parsed.ui?.customRange },
      },
    };
  } catch (error) {
    console.warn("Failed to load saved state, resetting.", error);
    return createSeedState();
  }
}

function hasTasksUsingCategory(categoryId) {
  return state.tasks.some((task) => task.categoryId === categoryId) || state.sessions.some((session) => session.categoryId === categoryId);
}

function hasTasksUsingTemplate(templateId) {
  return state.tasks.some((task) => task.templateId === templateId) || state.sessions.some((session) => session.templateId === templateId);
}

function folderHasLinkedItems(folderId) {
  return state.tasks.some((task) => task.folderId === folderId);
}

function paperGradient(color) {
  return `background: linear-gradient(160deg, color-mix(in srgb, white 58%, ${color}), color-mix(in srgb, ${color} 22%, white)), linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.36));`;
}

function chipStyle(color) {
  return `background: color-mix(in srgb, ${color} 24%, white); color: ${color === "#ffcb63" ? "#7e5b1f" : "#294569"};`;
}

function describeArc(cx, cy, radius, thickness, startRatio, endRatio) {
  const startAngle = startRatio * 360 - 90;
  const endAngle = endRatio * 360 - 90;
  const outerStart = polarToCartesian(cx, cy, radius, endAngle);
  const outerEnd = polarToCartesian(cx, cy, radius, startAngle);
  const innerStart = polarToCartesian(cx, cy, radius - thickness, startAngle);
  const innerEnd = polarToCartesian(cx, cy, radius - thickness, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", outerStart.x, outerStart.y, "A", radius, radius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y, "L", innerStart.x, innerStart.y, "A", radius - thickness, radius - thickness, 0, largeArcFlag, 1, innerEnd.x, innerEnd.y, "Z"].join(" ");
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = (angleInDegrees * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function formatHeroDate(date) {
  const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
  return `${date.getMonth() + 1}月${date.getDate()}日 · ${weekday}`;
}

function formatMinutes(minutes) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatInputTime(minutes) {
  return formatMinutes(minutes);
}

function parseTimeString(value) {
  if (!value || !value.includes(":")) return null;
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function formatDuration(minutes) {
  if (!minutes) return "0m";
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return hour ? `${hour}h ${minute}m` : `${minute}m`;
}

function formatClock(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function formatClockDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hour = Math.floor(totalSeconds / 3600);
  const minute = Math.floor((totalSeconds % 3600) / 60);
  const second = totalSeconds % 60;
  return [hour, minute, second].map((part) => String(part).padStart(2, "0")).join(":");
}

function formatInputDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function shiftDate(date, dayOffset) {
  const copy = cloneDate(date);
  copy.setDate(copy.getDate() + dayOffset);
  return copy;
}

function cloneDate(date) {
  return new Date(date.getTime());
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function getMinutesNow() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function sortByTime(a, b) {
  return (a.scheduledMinutes ?? 9999) - (b.scheduledMinutes ?? 9999);
}

function differenceInDays(a, b) {
  const start = new Date(a);
  start.setHours(0, 0, 0, 0);
  const end = new Date(b);
  end.setHours(0, 0, 0, 0);
  return Math.abs(Math.round((start - end) / 86400000));
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getSessionMinutes(session) {
  return Math.max(1, Math.round((new Date(session.end) - new Date(session.start)) / 60000));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function makeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function boot() {
  applyPageFromUrl();
  bindEvents();
  registerPwa();
  renderAll();
  startTicker();
}

function upgradeState(current) {
  const today = formatInputDate(new Date());
  current.ui = current.ui || {};
  current.ui.groupOpen = {
    overdue: current.ui.groupOpen?.overdue ?? true,
    today: current.ui.groupOpen?.today ?? true,
    flexible: current.ui.groupOpen?.flexible ?? true,
    completed: current.ui.groupOpen?.completed ?? Boolean(current.showCompletedOpen),
  };
  current.ui.taskAdvancedOpen = current.ui.taskAdvancedOpen ?? false;
  current.ui.taskWeekdays = current.ui.taskWeekdays || [];
  current.ui.taskTimerMode = current.ui.taskTimerMode || "up";
  current.ui.taskDatePreset = current.ui.taskDatePreset || "none";
  current.nextRules = {
    prioritizeTime: current.nextRules?.prioritizeTime ?? true,
    prioritizeImportant: current.nextRules?.prioritizeImportant ?? true,
  };
  current.tasks = (current.tasks || []).map((task) => ({
    repeatMode: task.repeatMode || "none",
    weekdays: task.weekdays || [],
    timerMode: task.timerMode || "up",
    scheduledDate: task.scheduledDate || null,
    ...task,
  }));
  if (current.activeTimer?.taskId) {
    const activeTask = current.tasks.find((task) => task.id === current.activeTimer.taskId);
    current.activeTimer.mode = current.activeTimer.mode || activeTask?.timerMode || "up";
    current.activeTimer.durationMin = current.activeTimer.durationMin || activeTask?.durationMin || current.defaultDuration;
  }
  return current;
}

function bindEvents() {
  dom.navItems.forEach((button) => {
    button.onclick = () => {
      state.currentPage = button.dataset.target;
      closeAllSheets();
      renderAll();
      persistState();
    };
  });

  dom.fab.onclick = () => toggleSheet("action-sheet");
  dom.scrim.onclick = closeAllSheets;

  document.querySelectorAll("[data-close-sheet]").forEach((button) => {
    button.onclick = closeAllSheets;
  });
  document.querySelectorAll("[data-open-sheet]").forEach((button) => {
    button.onclick = () => {
      const target = button.dataset.openSheet;
      if (target === "task-sheet") prepareTaskDraft();
      if (target === "quick-sheet") dom.quickNameInput.value = "";
      if (target === "log-sheet") dom.logTaskInput.value = "";
      openSheet(target);
    };
  });

  dom.taskCategoryButton.onclick = () => {
    state.ui.categoryTrail = [];
    renderCategorySheet();
    openSheet("category-sheet");
  };
  dom.taskTimeButton.onclick = () => openTimeSheet();
  dom.taskMoreToggle.onclick = () => {
    state.ui.taskAdvancedOpen = !state.ui.taskAdvancedOpen;
    renderTaskAdvancedControls();
  };
  dom.taskRepeatSelect.onchange = () => {
    renderTaskAdvancedControls();
  };
  dom.taskTimeClear.onclick = clearTaskTimeDraft;
  dom.taskTimeApply.onclick = applyTaskTimeDraft;
  dom.taskForm.addEventListener("submit", handleTaskSubmit);
  dom.quickForm.addEventListener("submit", handleQuickStart);
  dom.logForm.addEventListener("submit", handleLogTime);

  dom.quickNameInput.oninput = renderQuickSuggestions;
  dom.logTaskInput.oninput = renderLogSuggestions;
  dom.logStartInput.oninput = updateLogDuration;
  dom.logEndInput.oninput = updateLogDuration;

  dom.trendToggle.onclick = () => {
    state.ui.showTrend = !state.ui.showTrend;
    renderStats();
    persistState();
  };

  dom.tasksEditToggle.onclick = () => {
    state.ui.tasksEditMode = !state.ui.tasksEditMode;
    renderTasksTree();
    persistState();
  };
  dom.addFolderButton.onclick = () => openTreeEditor({ mode: "create", type: "folder" });
  dom.treeEditorForm.addEventListener("submit", handleTreeEditorSubmit);
  dom.treeDeleteButton.onclick = handleTreeDelete;

  dom.dayStartInput.oninput = (event) => {
    state.dayStart = event.target.value || "00:00";
    persistState();
  };
  dom.defaultDurationSelect.onchange = (event) => {
    state.defaultDuration = Number(event.target.value);
    persistState();
  };
  dom.completedDefaultToggle.onchange = (event) => {
    state.ui.groupOpen.completed = event.target.checked;
    renderHome();
    persistState();
  };
  dom.reduceTextureToggle.onchange = (event) => {
    state.reduceTexture = event.target.checked;
    applyBodyFlags();
    persistState();
  };
  dom.nextTimePriorityToggle.onchange = (event) => {
    state.nextRules.prioritizeTime = event.target.checked;
    renderHome();
    persistState();
  };
  dom.nextImportantPriorityToggle.onchange = (event) => {
    state.nextRules.prioritizeImportant = event.target.checked;
    renderHome();
    persistState();
  };
  dom.customStartDate.onchange = (event) => {
    state.ui.customRange.start = event.target.value;
    renderStats();
    persistState();
  };
  dom.customEndDate.onchange = (event) => {
    state.ui.customRange.end = event.target.value;
    renderStats();
    persistState();
  };
  dom.pwaInstallButton.onclick = handlePwaInstall;
  if (dom.defaultDurationRow) {
    dom.defaultDurationRow.onclick = () => {
      if (typeof dom.defaultDurationSelect.showPicker === "function") dom.defaultDurationSelect.showPicker();
      else {
        dom.defaultDurationSelect.focus();
        dom.defaultDurationSelect.click();
      }
    };
  }
  if (dom.dayStartRow) {
    dom.dayStartRow.onclick = () => {
      if (typeof dom.dayStartInput.showPicker === "function") dom.dayStartInput.showPicker();
      else {
        dom.dayStartInput.focus();
        dom.dayStartInput.click();
      }
    };
  }
  if (dom.aiPlannerLink) {
    dom.aiPlannerLink.onclick = () => {
      state.currentPage = "ai-planner";
      closeAllSheets();
      renderAll();
      persistState();
    };
  }
  if (dom.aiPageBack) {
    dom.aiPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };
  }
  if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
  if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
  if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
  if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
}

function registerPwa() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPromptEvent = event;
    renderSettings();
  });
  window.addEventListener("appinstalled", () => {
    deferredPromptEvent = null;
    renderSettings();
  });
}

function renderAll() {
  applyTheme();
  applyBodyFlags();
  renderNavigation();
  renderHome();
  renderStats();
  renderTasksTree();
  renderSettings();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  updateLogDuration();
}

function renderHome() {
  dom.homeDate.textContent = formatHeroDate(new Date());
  renderHomeTimerOnly();
  renderNextTasks();
  renderTodoGroups();
}

function renderHomeTimerOnly() {
  const timerState = getTimerPresentation();
  if (!timerState) {
    dom.timerStrip.innerHTML = `
      <div class="timer-row">
        <div class="timer-main">
          <div class="timer-head">
            <p class="timer-name">No timer running</p>
          </div>
          <div class="timer-clock">00:00</div>
          <p class="timer-template">Quick Start 可以立刻把一件事送进现在。</p>
          <div class="timer-progress"><span style="width:0%"></span></div>
        </div>
        <div class="timer-actions">
          <button class="timer-button" id="timer-new" type="button">Start</button>
        </div>
      </div>
    `;
  } else {
    dom.timerStrip.innerHTML = `
      <div class="timer-row">
        <div class="timer-main">
          <div class="timer-head">
            <div class="timer-chip" style="background:${timerState.color};">${escapeHtml(timerState.badge)}</div>
            <p class="timer-name">${escapeHtml(timerState.name)}${timerState.important ? ' <span class="task-star">★</span>' : ""}</p>
          </div>
          <p class="timer-template">${escapeHtml(timerState.template)}</p>
          <div class="timer-clock">${timerState.elapsed}</div>
          <div class="timer-progress"><span style="width:${timerState.progress}%;"></span></div>
        </div>
        <div class="timer-actions">
          <button class="timer-button" id="timer-toggle" type="button">${state.activeTimer.running ? "Pause" : "Resume"}</button>
          <button class="timer-button stop" id="timer-stop" type="button">Stop</button>
        </div>
      </div>
    `;
  }

  document.getElementById("timer-toggle")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-stop")?.addEventListener("click", stopTimer);
  document.getElementById("timer-new")?.addEventListener("click", () => {
    dom.quickNameInput.value = "";
    openSheet("quick-sheet");
  });
}

function renderNextTasks() {
  const nextTasks = getNextTasks();
  if (!nextTasks.length) {
    dom.nextScroll.innerHTML = `<p class="empty-note">今天已经没有待开始的任务了。</p>`;
    return;
  }

  dom.nextScroll.innerHTML = nextTasks
    .map((task) => {
      const meta = getTaskVisual(task);
      return `
        <article class="next-card" style="${paperGradient(meta.color)}; --next-color:${meta.color};">
          <div class="next-line">
            <div class="next-time">${task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes)}</div>
            <div class="next-main">
              <div class="next-title-row">
                <h3 class="next-name">${escapeHtml(task.name)}</h3>
                ${task.important ? '<span class="task-star">★</span>' : ""}
              </div>
              <div class="chip-row">
                <span class="mini-pill">${escapeHtml(meta.categoryName)}</span>
              </div>
            </div>
            <button class="flat-start" data-start-task="${task.id}" type="button">Start</button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.nextScroll.querySelectorAll("[data-start-task]").forEach((button) => {
    button.onclick = () => startTimerForTask(button.dataset.startTask);
  });
}

function renderTodoGroups() {
  const groups = getGroupedTasks();
  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", "Overdue", groups.overdue),
    renderTaskGroup("today", "Today", groups.today),
    renderTaskGroup("flexible", "Flexible", groups.flexible),
    renderTaskGroup("completed", "Completed", groups.completed, true),
  ].join("");

  dom.todoGroups.querySelectorAll("[data-task-check]").forEach((input) => {
    input.onchange = () => toggleTaskComplete(input.dataset.taskCheck);
  });
  dom.todoGroups.querySelectorAll("[data-task-start]").forEach((button) => {
    button.onclick = () => startTimerForTask(button.dataset.taskStart);
  });
  dom.todoGroups.querySelectorAll("[data-task-edit]").forEach((button) => {
    button.onclick = () => prepareTaskDraft(button.dataset.taskEdit);
  });
  dom.todoGroups.querySelectorAll("[data-toggle-group]").forEach((button) => {
    button.onclick = () => {
      const groupKey = button.dataset.toggleGroup;
      state.ui.groupOpen[groupKey] = !state.ui.groupOpen[groupKey];
      renderHome();
      persistState();
    };
  });
}

function renderTaskGroup(groupKey, title, tasks, completed = false) {
  const open = state.ui.groupOpen[groupKey];
  return `
    <section class="todo-group">
      <button class="group-toggle" data-toggle-group="${groupKey}" type="button">
        <h3>${title}</h3>
        <div class="group-dash"></div>
        <span class="group-caret">${open ? "▴" : "▾"}</span>
      </button>
      ${
        open
          ? tasks.length
            ? `<div class="task-list">${tasks.map((task) => renderTaskRow(task, completed)).join("")}</div>`
            : `<p class="empty-note">${title === "Flexible" ? "没有无时间任务。" : "这一组现在是空的。"}</p>`
          : ""
      }
    </section>
  `;
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  return `
    <article class="task-row ${isCompleted ? "is-completed" : ""}">
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      <div class="task-time-block">${timeText}</div>
      <div class="task-main">
        <div class="task-title-row">
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
          ${task.important ? '<span class="task-star">★</span>' : ""}
        </div>
        <div class="task-tags">
          <span class="mini-pill" style="${chipStyle(visual.color)}">${escapeHtml(visual.categoryName)}</span>
        </div>
      </div>
      <div class="task-side">
        <div class="task-duration-row">
          <span class="task-duration">${task.durationMin || state.defaultDuration} min</span>
          <button class="task-action" data-task-edit="${task.id}" type="button">✎</button>
        </div>
        ${!task.completed ? `<button class="flat-start" data-task-start="${task.id}" type="button">Start</button>` : ""}
      </div>
    </article>
  `;
}

function getGroupedTasks() {
  const today = formatInputDate(new Date());
  const nowMinutes = getMinutesNow();
  const incomplete = state.tasks.filter((task) => !task.completed);
  const completed = state.tasks.filter((task) => task.completed);
  return {
    overdue: incomplete
      .filter((task) => isTaskOverdue(task, today, nowMinutes))
      .sort(sortTasksForHome),
    today: incomplete
      .filter((task) => isTaskForToday(task, today, nowMinutes))
      .sort(sortTasksForHome),
    flexible: incomplete
      .filter((task) => isTaskFlexible(task, today))
      .sort(sortTasksForHome),
    completed: completed.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0)),
  };
}

function getNextTasks() {
  const nowMinutes = getMinutesNow();
  const today = formatInputDate(new Date());
  const available = state.tasks.filter((task) => !task.completed && isTaskVisibleOnHome(task, today));
  const chosen = [];
  const seen = new Set();

  if (state.nextRules.prioritizeTime) {
    available
      .filter((task) => task.scheduledMinutes != null)
      .sort((a, b) => Math.abs((a.scheduledMinutes ?? 0) - nowMinutes) - Math.abs((b.scheduledMinutes ?? 0) - nowMinutes))
      .slice(0, 3)
      .forEach((task) => {
        if (!seen.has(task.id)) {
          seen.add(task.id);
          chosen.push(task);
        }
      });
  }

  if (state.nextRules.prioritizeImportant) {
    available
      .filter((task) => task.important)
      .sort(sortTasksForHome)
      .forEach((task) => {
        if (!seen.has(task.id) && chosen.length < 5) {
          seen.add(task.id);
          chosen.push(task);
        }
      });
  }

  available
    .filter((task) => task.scheduledMinutes == null)
    .sort(sortTasksForHome)
    .forEach((task) => {
      if (!seen.has(task.id) && chosen.length < 5) {
        seen.add(task.id);
        chosen.push(task);
      }
    });

  return chosen.slice(0, 5);
}

function sortTasksForHome(a, b) {
  const aDate = a.scheduledDate || "";
  const bDate = b.scheduledDate || "";
  return aDate.localeCompare(bDate) || (a.scheduledMinutes ?? 9999) - (b.scheduledMinutes ?? 9999) || Number(b.important) - Number(a.important);
}

function isTaskVisibleOnHome(task, today) {
  return !task.scheduledDate || task.scheduledDate <= today;
}

function isTaskOverdue(task, today, nowMinutes) {
  if (!isTaskVisibleOnHome(task, today)) return false;
  if (task.scheduledDate && task.scheduledDate < today) return true;
  return task.scheduledDate === today && task.scheduledMinutes != null && task.scheduledMinutes < nowMinutes;
}

function isTaskForToday(task, today, nowMinutes) {
  if (task.scheduledDate && task.scheduledDate !== today) return false;
  return task.scheduledMinutes != null && !isTaskOverdue(task, today, nowMinutes);
}

function isTaskFlexible(task, today) {
  if (task.scheduledMinutes != null) return false;
  return !task.scheduledDate || task.scheduledDate === today;
}

function getTimerPresentation() {
  if (!state.activeTimer?.taskId) return null;
  const task = state.tasks.find((entry) => entry.id === state.activeTimer.taskId);
  if (!task) return null;
  const visual = getTaskVisual(task);
  const elapsedMs = getElapsedMs(state.activeTimer);
  const planned = Math.max(state.activeTimer.durationMin || task.durationMin || state.defaultDuration, 1) * 60000;
  const remaining = Math.max(0, planned - elapsedMs);
  return {
    color: visual.color,
    badge: visual.categoryName,
    name: task.name,
    template: visual.shortPath,
    important: Boolean(task.important),
    elapsed: state.activeTimer.mode === "down" ? formatAdaptiveDuration(remaining) : formatAdaptiveDuration(elapsedMs),
    progress: Math.min(100, Math.round((elapsedMs / planned) * 100)),
  };
}

function formatAdaptiveDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hour = Math.floor(totalSeconds / 3600);
  const minute = Math.floor((totalSeconds % 3600) / 60);
  const second = totalSeconds % 60;
  if (hour > 0) {
    return [hour, minute, second].map((part) => String(part).padStart(2, "0")).join(":");
  }
  return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

function startTimerForTask(taskId) {
  if (state.activeTimer?.taskId && state.activeTimer.running) {
    finalizeRunningSession();
  }
  const task = state.tasks.find((entry) => entry.id === taskId);
  state.activeTimer = {
    taskId,
    startedAt: new Date().toISOString(),
    pausedElapsedMs: 0,
    running: true,
    mode: task?.timerMode || "up",
    durationMin: task?.durationMin || state.defaultDuration,
  };
  closeAllSheets();
  renderAll();
  persistState();
}

function renderHomeTimerOnly() {
  const timerState = getTimerPresentation();
  if (!timerState) {
    dom.timerStrip.innerHTML = `
      <div class="timer-row">
        <div class="timer-main">
          <div class="timer-head">
            <p class="timer-name">No timer running</p>
          </div>
          <p class="timer-template">Quick Start can send one thing straight into now.</p>
          <div class="timer-clock">00:00</div>
          <div class="timer-progress"><span style="width:0%"></span></div>
        </div>
        <div class="timer-actions">
          <button class="timer-button" id="timer-new" type="button">Start</button>
        </div>
      </div>
    `;
  } else {
    dom.timerStrip.innerHTML = `
      <div class="timer-row">
        <div class="timer-main">
          <div class="timer-head">
            <p class="timer-name">${escapeHtml(timerState.name)}${timerState.important ? ' <span class="task-star">★</span>' : ""}</p>
            <div class="timer-chip" style="${chipStyle(timerState.color)}">${escapeHtml(timerState.badge)}</div>
          </div>
          <p class="timer-template">${escapeHtml(timerState.template)} · ${state.activeTimer.running ? "recording now" : "paused"}</p>
          <div class="timer-clock">${timerState.elapsed}</div>
          <div class="timer-progress"><span style="width:${timerState.progress}%;"></span></div>
        </div>
        <div class="timer-actions">
          <button class="timer-button" id="timer-toggle" type="button">${state.activeTimer.running ? "Pause" : "Resume"}</button>
          <button class="timer-button stop" id="timer-stop" type="button">Stop</button>
        </div>
      </div>
    `;
  }

  document.getElementById("timer-toggle")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-stop")?.addEventListener("click", stopTimer);
  document.getElementById("timer-new")?.addEventListener("click", () => {
    dom.quickNameInput.value = "";
    openSheet("quick-sheet");
  });
}

function renderTaskAdvancedControls() {
  if (!dom.taskAdvancedPanel) return;
  const isOpen = Boolean(state.ui.taskAdvancedOpen);
  dom.taskAdvancedPanel.hidden = !isOpen;
  dom.taskMoreToggle.textContent = `More settings ${isOpen ? "▴" : "▾"}`;

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const showWeekdays = repeatMode === "weekly" || repeatMode === "custom";
  dom.taskWeekdaysField.hidden = !showWeekdays;

  const weekdayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  dom.taskWeekdaysGrid.innerHTML = weekdayOptions
    .map(
      (day) => `
        <button
          class="weekday-chip ${state.ui.taskWeekdays.includes(day) ? "is-active" : ""}"
          data-weekday-chip="${day}"
          type="button"
        >
          ${day}
        </button>
      `
    )
    .join("");

  dom.taskWeekdaysGrid.querySelectorAll("[data-weekday-chip]").forEach((button) => {
    button.onclick = () => {
      const day = button.dataset.weekdayChip;
      const hasDay = state.ui.taskWeekdays.includes(day);
      state.ui.taskWeekdays = hasDay
        ? state.ui.taskWeekdays.filter((entry) => entry !== day)
        : [...state.ui.taskWeekdays, day];
      renderTaskAdvancedControls();
    };
  });

  dom.taskTimerMode.innerHTML = [
    { id: "up", label: "Count up" },
    { id: "down", label: "Count down" },
  ]
    .map(
      (option) => `
        <button
          class="mini-seg-button ${state.ui.taskTimerMode === option.id ? "is-active" : ""}"
          data-timer-mode="${option.id}"
          type="button"
        >
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.taskTimerMode.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskTimerMode = button.dataset.timerMode;
      renderTaskAdvancedControls();
    };
  });
}

function openTimeSheet() {
  updateTaskTimeSummary();
  openSheet("time-sheet");
}

function updateTaskTimeSummary() {
  if (!dom.taskTimeLabel || !dom.taskDateLabel) return;

  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));
  const quickOptions = [
    { id: "none", label: "No date" },
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
    { id: "pick", label: "Pick date" },
  ];

  dom.taskDateQuickGrid.innerHTML = quickOptions
    .map(
      (option) => `
        <button class="quick-option ${state.ui.taskDatePreset === option.id ? "is-active" : ""}" data-date-preset="${option.id}" type="button">
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.taskDateQuickGrid.querySelectorAll("[data-date-preset]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskDatePreset = button.dataset.datePreset;
      if (state.ui.taskDatePreset === "none") {
        dom.taskDateInput.value = "";
      }
      if (state.ui.taskDatePreset === "today") {
        dom.taskDateInput.value = today;
      }
      if (state.ui.taskDatePreset === "tomorrow") {
        dom.taskDateInput.value = tomorrow;
      }
      if (state.ui.taskDatePreset === "pick" && !dom.taskDateInput.value) {
        dom.taskDateInput.value = today;
      }
      updateTaskTimeSummary();
    };
  });

  dom.taskDateInput.onchange = () => {
    if (!dom.taskDateInput.value) {
      state.ui.taskDatePreset = "none";
    } else if (dom.taskDateInput.value === today) {
      state.ui.taskDatePreset = "today";
    } else if (dom.taskDateInput.value === tomorrow) {
      state.ui.taskDatePreset = "tomorrow";
    } else {
      state.ui.taskDatePreset = "pick";
    }
    updateTaskTimeSummary();
  };

  dom.taskTimeInput.oninput = () => updateTaskTimeSummary();

  const dateValue = getTaskDraftDate();
  const timeValue = parseTimeString(dom.taskTimeInput.value);
  dom.taskTimeLabel.textContent = timeValue == null ? "Any time" : formatMinutes(timeValue);
  dom.taskDateLabel.textContent = formatTaskDateNote(dateValue);
}

function clearTaskTimeDraft() {
  dom.taskDateInput.value = "";
  dom.taskTimeInput.value = "";
  state.ui.taskDatePreset = "none";
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function applyTaskTimeDraft() {
  if (state.ui.taskDatePreset === "pick" && !dom.taskDateInput.value) {
    state.ui.taskDatePreset = "none";
  }
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function getTaskDraftDate() {
  if (state.ui.taskDatePreset === "today") return formatInputDate(new Date());
  if (state.ui.taskDatePreset === "tomorrow") return formatInputDate(shiftDate(new Date(), 1));
  if (state.ui.taskDatePreset === "pick") return dom.taskDateInput.value || null;
  return dom.taskDateInput.value || null;
}

function formatTaskDateNote(dateValue) {
  if (!dateValue) return "No date";
  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));
  if (dateValue === today) return "Today";
  if (dateValue === tomorrow) return "Tomorrow";
  const date = new Date(`${dateValue}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function prepareTaskDraft(taskId = null) {
  const task = taskId ? state.tasks.find((item) => item.id === taskId) : null;
  state.ui.editingTaskId = taskId;
  state.ui.createTaskSelection = task
    ? { folderId: task.folderId, categoryId: task.categoryId, templateId: task.templateId }
    : null;

  dom.taskSheetTitle.textContent = task ? "Edit Task" : "Create Task";
  dom.taskNameInput.value = task?.name || "";
  dom.taskDurationInput.value = task?.durationMin || "";
  dom.taskImportantInput.checked = Boolean(task?.important);
  dom.taskRepeatSelect.value = task?.repeatMode || "none";
  state.ui.taskWeekdays = [...(task?.weekdays || [])];
  state.ui.taskTimerMode = task?.timerMode || "up";
  dom.taskDateInput.value = task?.scheduledDate || "";
  dom.taskTimeInput.value = task?.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : "";

  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));
  if (!task?.scheduledDate) {
    state.ui.taskDatePreset = "none";
  } else if (task.scheduledDate === today) {
    state.ui.taskDatePreset = "today";
  } else if (task.scheduledDate === tomorrow) {
    state.ui.taskDatePreset = "tomorrow";
  } else {
    state.ui.taskDatePreset = "pick";
  }

  state.ui.taskAdvancedOpen = Boolean(
    task && ((task.repeatMode && task.repeatMode !== "none") || task.timerMode === "down" || (task.weekdays || []).length)
  );

  updateTaskCategoryLabel();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const name = dom.taskNameInput.value.trim();
  if (!name) {
    dom.taskNameInput.focus();
    return;
  }

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const draft = {
    name,
    scheduledDate: getTaskDraftDate(),
    scheduledMinutes: parseTimeString(dom.taskTimeInput.value),
    durationMin: Number(dom.taskDurationInput.value) || state.defaultDuration,
    important: dom.taskImportantInput.checked,
    repeatMode,
    weekdays: repeatMode === "weekly" || repeatMode === "custom" ? [...state.ui.taskWeekdays] : [],
    timerMode: state.ui.taskTimerMode || "up",
    folderId: state.ui.createTaskSelection?.folderId || null,
    categoryId: state.ui.createTaskSelection?.categoryId || null,
    templateId: state.ui.createTaskSelection?.templateId || null,
  };

  if (state.ui.editingTaskId) {
    const task = state.tasks.find((item) => item.id === state.ui.editingTaskId);
    if (task) {
      Object.assign(task, draft);
    }
  } else {
    state.tasks.unshift({
      id: makeId("task"),
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      ...draft,
    });
  }

  closeAllSheets();
  renderAll();
  persistState();
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  dom.themeGrid.innerHTML = THEME_OPTIONS.map(
    (theme) => `
      <button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
        <span class="settings-theme-radio" aria-hidden="true"></span>
        <span class="settings-theme-copy">
          <strong>${escapeHtml(theme.name)}</strong>
        </span>
      </button>
    `
  ).join("");

  dom.dayStartInput.value = state.dayStart;
  dom.defaultDurationSelect.value = String(state.defaultDuration);
  dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  dom.reduceTextureToggle.checked = state.reduceTexture;
  dom.nextTimePriorityToggle.checked = state.nextRules.prioritizeTime;
  dom.nextImportantPriorityToggle.checked = state.nextRules.prioritizeImportant;
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (isStandalone) {
    dom.pwaInstallButton.textContent = "Installed";
    dom.pwaInstallButton.disabled = true;
    dom.pwaInstallNote.textContent = "Already installed on this device.";
  } else if (deferredPromptEvent) {
    dom.pwaInstallButton.textContent = "Install app";
    dom.pwaInstallButton.disabled = false;
    dom.pwaInstallNote.textContent = "Install directly from here.";
  } else {
    dom.pwaInstallButton.textContent = "Install app";
    dom.pwaInstallButton.disabled = false;
    dom.pwaInstallNote.textContent = "If no prompt appears, use your browser menu and choose Add to Home Screen.";
  }

  dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    });
  });
}

async function handlePwaInstall() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (isStandalone) {
    renderSettings();
    return;
  }

  if (deferredPromptEvent) {
    deferredPromptEvent.prompt();
    try {
      await deferredPromptEvent.userChoice;
    } catch {
      // ignore aborted prompt
    }
    deferredPromptEvent = null;
    renderSettings();
    return;
  }

  window.alert("If your browser does not show an install prompt, open the browser menu and tap Add to Home Screen.");
}

function buildAiPromptText() {
  const todayTasks = getGroupedTasks().today.concat(getGroupedTasks().flexible).filter((task) => !task.completed);
  const taskLines = todayTasks
    .slice(0, 10)
    .map((task) => {
      const visual = getTaskVisual(task);
      const time = task.scheduledMinutes == null ? "Any time" : formatMinutes(task.scheduledMinutes);
      return `- ${time} | ${task.name} | ${visual.categoryName} | ${task.durationMin || state.defaultDuration} min`;
    })
    .join("\n");

  return [
    "Please help me create a clean day plan.",
    "",
    "User input:",
    dom.aiFocusInput?.value.trim() || "-",
    "",
    "Fixed times / constraints:",
    dom.aiConstraintsInput?.value.trim() || "-",
    "",
    "Extra notes:",
    dom.aiContextInput?.value.trim() || "-",
    "",
    "Current tasks:",
    taskLines || "- None",
    "",
    "Output format:",
    "- One task per line",
    "- Prefer HH:MM Task Name - 25 min",
    "- Keep it concise",
  ].join("\n");
}

function handleAiPromptGenerate() {
  if (!dom.aiPromptOutput) return;
  dom.aiPromptOutput.value = buildAiPromptText();
}

async function handleAiCopyPrompt() {
  if (!dom.aiPromptOutput?.value) handleAiPromptGenerate();
  const value = dom.aiPromptOutput?.value || "";
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    dom.aiCopyPrompt.textContent = "已复制";
    window.setTimeout(() => {
      if (dom.aiCopyPrompt) dom.aiCopyPrompt.textContent = "复制 prompt";
    }, 1200);
  } catch {
    window.alert("Copy failed. Please copy the prompt manually.");
  }
}

function parseAiPlanText(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      let cleaned = line.replace(/^[-*•\d.\)\s、]+/, "").trim();
      let time = "";
      let durationMin = state.defaultDuration;

      const timeMatch = cleaned.match(/^(\d{1,2}:\d{2})\s*/);
      if (timeMatch) {
        time = timeMatch[1];
        cleaned = cleaned.slice(timeMatch[0].length).trim();
      }

      const durationMatch = cleaned.match(/(?:-|—|–|\(|（)?\s*(\d{1,3})\s*min(?:ute)?s?\)?$/i);
      if (durationMatch) {
        durationMin = Number(durationMatch[1]) || state.defaultDuration;
        cleaned = cleaned.slice(0, durationMatch.index).trim();
      }

      cleaned = cleaned.replace(/\s*[-—–:：]\s*$/, "").trim();

      return {
        name: cleaned || "Untitled",
        time,
        durationMin,
      };
    });
}

function renderAiPreview(items) {
  if (!dom.aiPreviewList) return;
  if (!items.length) {
    dom.aiPreviewList.innerHTML = `<p class="empty-note">还没有可导入的内容。</p>`;
    return;
  }
  dom.aiPreviewList.innerHTML = items
    .map(
      (item) => `
        <div class="ai-preview-row">
          <span class="ai-preview-name">${escapeHtml(item.name)}</span>
          <span class="ai-preview-meta">${escapeHtml(item.time || "Any time")} · ${item.durationMin} min</span>
        </div>
      `
    )
    .join("");
}

function handleAiPreviewImport() {
  state.ui.aiPreviewItems = parseAiPlanText(dom.aiResultInput?.value || "").filter((item) => item.name);
  renderAiPreview(state.ui.aiPreviewItems);
}

function handleAiImportPlan() {
  const previewItems = Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : [];
  if (!previewItems.length) {
    handleAiPreviewImport();
  }
  const items = Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : [];
  if (!items.length) return;

  items
    .slice()
    .reverse()
    .forEach((item) => {
      state.tasks.unshift(
        createTask({
          name: item.name,
          time: item.time,
          durationMin: item.durationMin,
        })
      );
    });

  state.ui.aiPreviewItems = [];
  if (dom.aiResultInput) dom.aiResultInput.value = "";
  renderAiPreview([]);
  state.currentPage = "home";
  renderAll();
  persistState();
}

function renderStats() {
  renderStatsTabs();
  renderStatsFilters();

  const range = state.ui.statsRange;
  const stats = buildStatsDataset(range);
  dom.statsTitle.textContent =
    range === "today" ? "Today's Color" : range === "week" ? "Weekly Color" : range === "month" ? "Monthly Color" : "Custom Color";
  dom.statsRangeNote.textContent = stats.note;
  dom.customRangeRow.hidden = range !== "custom";
  dom.customStartDate.value = state.ui.customRange.start;
  dom.customEndDate.value = state.ui.customRange.end;

  renderStatsWheel(stats);
  renderStatsBreakdown(stats);
  renderTrendPanel();
}

function renderStatsWheel(stats) {
  const chart = state.ui.statsRange === "today" ? renderClockDialSvg(stats) : renderPieSvg(stats);
  dom.statsWheelCard.innerHTML = `
    <div class="wheel-shell">
      ${chart}
      ${
        stats.selected
          ? `<div class="stats-floating-note"><strong>${escapeHtml(stats.selected.label)}</strong><span>${escapeHtml(stats.selected.note)}</span></div>`
          : ""
      }
    </div>
  `;

  dom.statsTotalRow.innerHTML = `
    <div class="stats-total-chip">
      <strong>${formatDuration(stats.totalMinutes)}</strong>
      <span>${escapeHtml(stats.centerLabel)}</span>
    </div>
  `;

  dom.statsLegend.innerHTML = "";
  dom.statsWheelCard.querySelectorAll("[data-segment-key]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      state.ui.selectedSegment = state.ui.selectedSegment === node.dataset.segmentKey ? null : node.dataset.segmentKey;
      renderStats();
      persistState();
    });
  });

  dom.statsWheelCard.onclick = (event) => {
    if (!event.target.closest("[data-segment-key]") && state.ui.selectedSegment) {
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    }
  };
}

function renderClockDialSvg(stats) {
  const cx = 170;
  const cy = 170;
  const outerRadius = 126;
  const innerRadius = 58;
  const thickness = outerRadius - innerRadius;
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const hour = index * 2;
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (outerRadius + 6);
    const y1 = cy + Math.sin(angle) * (outerRadius + 6);
    const x2 = cx + Math.cos(angle) * (outerRadius + 18);
    const y2 = cy + Math.sin(angle) * (outerRadius + 18);
    const tx = cx + Math.cos(angle) * (outerRadius + 32);
    const ty = cy + Math.sin(angle) * (outerRadius + 32);
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(86,97,126,0.24)" stroke-width="2" />
      <text x="${tx}" y="${ty}" fill="rgba(86,97,126,0.68)" font-size="12" text-anchor="middle" dominant-baseline="middle">${hour === 0 ? 24 : hour}</text>
    `;
  }).join("");

  const segments = stats.segments
    .map(
      (segment) => `
        <path
          d="${describeArc(cx, cy, outerRadius, thickness, segment.startMinutes / 1440, segment.endMinutes / 1440)}"
          fill="${segment.color}"
          opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.26 : 0.96}"
          data-segment-key="${segment.key}"
          style="cursor:pointer"
        ></path>
      `
    )
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="time clock">
      <circle cx="${cx}" cy="${cy}" r="${outerRadius}" fill="none" stroke="rgba(96,106,138,0.08)" stroke-width="${thickness}" />
      ${ticks}
      ${segments}
    </svg>
  `;
}

function renderPieSvg(stats) {
  const cx = 170;
  const cy = 170;
  const radius = 126;

  if (!stats.segments.length) {
    return `
      <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="pie chart">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      </svg>
    `;
  }

  if (stats.segments.length === 1) {
    const segment = stats.segments[0];
    return `
      <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="pie chart">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
        <circle
          cx="${cx}"
          cy="${cy}"
          r="${radius}"
          fill="${segment.color}"
          opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.28 : 0.96}"
          data-segment-key="${segment.key}"
          style="cursor:pointer"
        ></circle>
      </svg>
    `;
  }

  let currentRatio = 0;
  const segments = stats.segments
    .map((segment) => {
      const start = currentRatio;
      const end = currentRatio + segment.minutes / Math.max(stats.totalMinutes, 1);
      currentRatio = end;
      return `
        <path
          d="${describePieSlice(cx, cy, radius, start, end)}"
          fill="${segment.color}"
          opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.28 : 0.96}"
          data-segment-key="${segment.key}"
          style="cursor:pointer"
        ></path>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="pie chart">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${segments}
    </svg>
  `;
}

function describePieSlice(cx, cy, radius, startRatio, endRatio) {
  const startAngle = startRatio * 360 - 90;
  const endAngle = endRatio * 360 - 90;
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", cx, cy, "L", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y, "Z"].join(" ");
}

function renderTrendPanel() {
  const label = state.ui.showTrend ? "Hide weekly trend" : "Show weekly trend";
  dom.trendToggle.querySelector("span").textContent = label;
  dom.trendPanel.hidden = !state.ui.showTrend;
  if (!state.ui.showTrend) return;

  const trend = buildWeeklyTrend();
  dom.trendPanel.innerHTML = `
    <div class="trend-grid">
      ${trend
        .map(
          (entry) => `
            <div class="trend-row">
              <span>${entry.label}</span>
              <div class="trend-bar"><span style="width:${entry.width}%; background:${entry.color};"></span></div>
              <strong>${formatDuration(entry.minutes)}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTasksTree() {
  dom.tasksEditToggle.textContent = state.ui.tasksEditMode ? "Done" : "Edit";
  dom.tasksTree.innerHTML = state.folders
    .map((folder) => {
      const content = folder.expanded
        ? `
          <div class="folder-content">
            ${folder.categories.map((category) => renderCategoryStackItem(folder, category)).join("")}
          </div>
        `
        : "";

      return `
        <article class="folder-block">
          <div class="folder-headline">
            <button class="tree-toggle" data-toggle-folder="${folder.id}" type="button">${folder.expanded ? "▾" : "▸"}</button>
            <div class="folder-name">${escapeHtml(folder.name)}</div>
            <div class="tree-controls">
              <button class="tree-mini" data-add-child="category" data-parent-folder="${folder.id}" type="button">+</button>
              ${
                state.ui.tasksEditMode
                  ? `
                    <button class="tree-mini" data-edit-node="folder" data-node-id="${folder.id}" type="button">✎</button>
                    <button class="tree-mini" data-move-folder="${folder.id}" data-direction="up" type="button">↑</button>
                    <button class="tree-mini" data-move-folder="${folder.id}" data-direction="down" type="button">↓</button>
                  `
                  : ""
              }
            </div>
          </div>
          ${content}
        </article>
      `;
    })
    .join("");

  bindTreeEvents();
}

function renderCategoryStackItem(folder, category) {
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${category.templates
          .map(
            (template) => `
              <div class="template-row-flat">
                <span>${escapeHtml(template.name)}</span>
                <span class="template-duration">${template.durationMin} min</span>
                ${
                  state.ui.tasksEditMode
                    ? `<button class="tree-mini" data-edit-node="template" data-node-id="${template.id}" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">✎</button>`
                    : ""
                }
              </div>
            `
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <section class="category-stack-item" style="--tree-color:${category.color};">
      <div class="category-line">
        <button class="tree-toggle" data-toggle-category="${category.id}" type="button">${category.expanded ? "▾" : "▸"}</button>
        <div class="category-anchor">
          <span class="category-color-bar"></span>
          <div class="category-title">${escapeHtml(category.name)}</div>
        </div>
        <div class="tree-controls">
          <button class="tree-mini" data-add-child="template" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">+</button>
          ${
            state.ui.tasksEditMode
              ? `<button class="tree-mini" data-edit-node="category" data-node-id="${category.id}" data-parent-folder="${folder.id}" type="button">✎</button>`
              : ""
          }
        </div>
      </div>
      ${templateMarkup}
    </section>
  `;
}

function renderStats() {
  renderStatsTabs();
  renderStatsFilters();

  const range = state.ui.statsRange;
  const stats = buildStatsDataset(range);
  dom.statsTitle.textContent =
    range === "today" ? "Today's Color" : range === "week" ? "Weekly Color" : range === "month" ? "Monthly Color" : "Custom Color";
  dom.statsRangeNote.textContent = stats.note;
  dom.customRangeRow.hidden = range !== "custom";
  dom.customStartDate.value = state.ui.customRange.start;
  dom.customEndDate.value = state.ui.customRange.end;

  renderStatsWheel(stats);
  renderStatsBreakdown(stats);
  renderTrendPanel();
}

function renderStatsTabs() {
  const rangeOptions = [
    { id: "today", label: "Today" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "custom", label: "Custom" },
  ];

  dom.statsRangeTabs.className = "range-switch";
  dom.statsRangeTabs.innerHTML = rangeOptions
    .map(
      (option) => `
        <button class="range-tab-link ${state.ui.statsRange === option.id ? "is-active" : ""}" data-stats-range="${option.id}" type="button">
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.statsModeTabs.innerHTML = `<span>View:</span><strong>Category</strong>`;

  dom.statsRangeTabs.querySelectorAll("[data-stats-range]").forEach((button) => {
    button.onclick = () => {
      state.ui.statsRange = button.dataset.statsRange;
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  });
}

function renderStatsFilters() {
  const options = [
    { value: "all", label: "All categories" },
    ...state.folders.map((folder) => ({ value: `folder:${folder.id}`, label: folder.name })),
    ...state.folders.flatMap((folder) =>
      folder.categories.map((category) => ({ value: `category:${category.id}`, label: `${folder.name} / ${category.name}` }))
    ),
  ];

  dom.statsCategoryFilter.innerHTML = options
    .map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`)
    .join("");
  dom.statsCategoryFilter.value = state.ui.statsCategoryFilter || "all";
  dom.statsCategoryFilter.onchange = (event) => {
    state.ui.statsCategoryFilter = event.target.value;
    state.ui.selectedSegment = null;
    renderStats();
    persistState();
  };
}

function buildStatsDataset(range) {
  const sessions = getFilteredSessions(range);
  const totalMinutes = sessions.reduce((sum, session) => sum + getSessionMinutes(session), 0);
  const note =
    range === "today" ? formatHeroDate(new Date()) : range === "week" ? "Last 7 days" : range === "month" ? "This month" : "Picked range";

  if (range === "today") {
    const segments = sessions.map((session, index) => {
      const start = new Date(session.start);
      const end = new Date(session.end);
      const task = state.tasks.find((entry) => entry.id === session.taskId);
      const visual = getTaskVisual(task || session);
      return {
        key: `clock-${index}`,
        startMinutes: start.getHours() * 60 + start.getMinutes(),
        endMinutes: end.getHours() * 60 + end.getMinutes(),
        color: visual.color,
        label: visual.label,
        note: `${formatClock(start)} - ${formatClock(end)} · ${formatDuration(getSessionMinutes(session))}`,
        ratio: Math.max(0, (end - start) / 86400000),
      };
    });
    return {
      type: "clock",
      totalMinutes,
      centerLabel: "",
      note,
      segments,
      selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
      breakdown: groupBreakdown(sessions),
    };
  }

  const grouped = groupBreakdown(sessions);
  const segments = grouped.map((item, index) => ({
    key: `pie-${index}`,
    ...item,
    note: `${formatDuration(item.minutes)} · ${item.percent}%`,
    ratio: item.minutes / Math.max(totalMinutes, 1),
  }));

  return {
    type: "pie",
    totalMinutes,
    centerLabel: "",
    note,
    segments,
    selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
    breakdown: grouped,
  };
}

function groupBreakdown(sessions) {
  const map = new Map();
  const filtered = sessions.filter((session) => matchesStatsCategoryFilter(session));

  filtered.forEach((session) => {
    const task = state.tasks.find((entry) => entry.id === session.taskId);
    const visual = getTaskVisual(task || session);
    const key = session.categoryId || "uncategorized";
    const label = visual.categoryName;
    if (!map.has(key)) {
      map.set(key, { key, label, color: visual.color, minutes: 0 });
    }
    map.get(key).minutes += getSessionMinutes(session);
  });

  const total = [...map.values()].reduce((sum, item) => sum + item.minutes, 0) || 1;
  return [...map.values()]
    .sort((a, b) => b.minutes - a.minutes)
    .map((item) => ({ ...item, percent: Math.round((item.minutes / total) * 100) }));
}

function matchesStatsCategoryFilter(session) {
  const filterValue = state.ui.statsCategoryFilter || "all";
  if (filterValue === "all") return true;

  const task = state.tasks.find((entry) => entry.id === session.taskId);
  if (!task) return false;

  if (filterValue.startsWith("folder:")) {
    return task.folderId === filterValue.slice(7);
  }
  if (filterValue.startsWith("category:")) {
    return task.categoryId === filterValue.slice(9);
  }
  return true;
}

function getFilteredSessions(range) {
  const now = new Date();
  return state.sessions.filter((session) => {
    const start = new Date(session.start);
    if (!matchesStatsCategoryFilter(session)) return false;
    if (range === "today") return isSameDay(start, now);
    if (range === "week") return differenceInDays(now, start) < 7;
    if (range === "month") return start.getFullYear() === now.getFullYear() && start.getMonth() === now.getMonth();
    const customStart = state.ui.customRange.start ? new Date(`${state.ui.customRange.start}T00:00:00`) : null;
    const customEnd = state.ui.customRange.end ? new Date(`${state.ui.customRange.end}T23:59:59`) : null;
    if (!customStart || !customEnd) return true;
    return start >= customStart && start <= customEnd;
  });
}

function renderStatsWheel(stats) {
  const chart = state.ui.statsRange === "today" ? renderClockDialSvg(stats) : renderPieSvg(stats);
  dom.statsWheelCard.innerHTML = `
    <div class="wheel-shell">
      ${chart}
      ${
        stats.selected
          ? `<div class="stats-floating-note"><strong>${escapeHtml(stats.selected.label)}</strong><span>${escapeHtml(stats.selected.note)}</span></div>`
          : ""
      }
    </div>
  `;

  dom.statsTotalRow.innerHTML = `
    <div class="stats-total-chip">
      <strong>${formatDuration(stats.totalMinutes)}</strong>
    </div>
  `;

  dom.statsLegend.innerHTML = "";
  dom.statsWheelCard.querySelectorAll("[data-segment-key]").forEach((node) => {
    node.onclick = (event) => {
      event.stopPropagation();
      state.ui.selectedSegment = state.ui.selectedSegment === node.dataset.segmentKey ? null : node.dataset.segmentKey;
      renderStats();
      persistState();
    };
  });

  dom.statsWheelCard.onclick = (event) => {
    if (!event.target.closest("[data-segment-key]") && state.ui.selectedSegment) {
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    }
  };
}

function renderClockDialSvg(stats) {
  const cx = 170;
  const cy = 170;
  const radius = 126;
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const hour = index * 2;
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (radius + 6);
    const y1 = cy + Math.sin(angle) * (radius + 6);
    const x2 = cx + Math.cos(angle) * (radius + 18);
    const y2 = cy + Math.sin(angle) * (radius + 18);
    const tx = cx + Math.cos(angle) * (radius + 32);
    const ty = cy + Math.sin(angle) * (radius + 32);
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(86,97,126,0.24)" stroke-width="2" />
      <text x="${tx}" y="${ty}" fill="rgba(86,97,126,0.64)" font-size="12" text-anchor="middle" dominant-baseline="middle">${hour === 0 ? 24 : hour}</text>
    `;
  }).join("");

  const segments = stats.segments
    .map((segment) => {
      const label = renderSegmentLabel({
        label: segment.label,
        ratio: segment.ratio,
        midpointRatio: (segment.startMinutes / 1440 + segment.endMinutes / 1440) / 2,
        cx,
        cy,
        radius: radius * 0.58,
      });
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, segment.startMinutes / 1440, segment.endMinutes / 1440)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.24 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${label}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="time clock">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${ticks}
      ${segments}
    </svg>
  `;
}

function renderPieSvg(stats) {
  const cx = 170;
  const cy = 170;
  const radius = 126;

  if (!stats.segments.length) {
    return `
      <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="pie chart">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      </svg>
    `;
  }

  let currentRatio = 0;
  const segments = stats.segments
    .map((segment) => {
      const start = currentRatio;
      const end = currentRatio + segment.ratio;
      currentRatio = end;
      const label = renderSegmentLabel({
        label: segment.label,
        ratio: segment.ratio,
        midpointRatio: (start + end) / 2,
        cx,
        cy,
        radius: radius * 0.56,
      });
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, start, end)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.28 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${label}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="pie chart">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${segments}
    </svg>
  `;
}

function renderSegmentLabel({ label, ratio, midpointRatio, cx, cy, radius }) {
  if (ratio < 0.08) return "";
  const shortened = escapeHtml(label.length > 10 ? `${label.slice(0, 10)}…` : label);
  const angle = midpointRatio * Math.PI * 2 - Math.PI / 2;
  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius;
  return `<text x="${x}" y="${y}" fill="rgba(35,52,73,0.72)" font-size="10.5" text-anchor="middle" dominant-baseline="middle">${shortened}</text>`;
}

function renderTasksTree() {
  dom.tasksTree.innerHTML = state.folders
    .map((folder) => {
      const content = folder.expanded
        ? `<div class="folder-content">${folder.categories.map((category) => renderCategoryStackItem(folder, category)).join("")}</div>`
        : "";

      return `
        <article class="folder-block">
          <div class="folder-headline">
            <div class="folder-name">${escapeHtml(folder.name)}</div>
            <div class="tree-controls">
              <button class="tree-plus-plain" data-add-child="category" data-parent-folder="${folder.id}" type="button">+</button>
              ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="folder" data-node-id="${folder.id}" type="button">✎</button>` : ""}
              <button class="tree-toggle ${folder.expanded ? "is-open" : ""}" data-toggle-folder="${folder.id}" type="button">▾</button>
            </div>
          </div>
          ${content}
        </article>
      `;
    })
    .join("");

  bindTreeEvents();
}

function renderCategoryStackItem(folder, category) {
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${category.templates
          .map(
            (template) => `
              <div class="template-row-flat">
                <span>${escapeHtml(template.name)}</span>
                <span class="template-duration">${template.durationMin} min</span>
                ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="template" data-node-id="${template.id}" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">✎</button>` : ""}
              </div>
            `
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <section class="category-stack-item" style="--tree-color:${category.color};">
      <div class="category-line">
        <button class="category-toggle-line" data-toggle-category="${category.id}" type="button">
          <span class="category-color-bar"></span>
          <span class="category-inline-caret ${category.expanded ? "is-open" : ""}">▸</span>
          <span class="category-title">${escapeHtml(category.name)}</span>
        </button>
        <div class="tree-controls">
          <button class="tree-plus-plain" data-add-child="template" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">+</button>
          ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="category" data-node-id="${category.id}" data-parent-folder="${folder.id}" type="button">✎</button>` : ""}
        </div>
      </div>
      ${templateMarkup}
    </section>
  `;
}

function toggleTaskComplete(taskId) {
  const task = state.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  const completing = !task.completed;
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;

  if (task.completed && state.activeTimer?.taskId === task.id) {
    stopTimer();
    return;
  }

  const rerender = () => {
    renderHome();
    renderStats();
    persistState();
  };

  if (completing) {
    window.setTimeout(rerender, 180);
  } else {
    rerender();
  }
}
function renderHomeTimerOnly() {
  const timerState = getTimerPresentation();
  if (!timerState) {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell timer-strip-shell-idle">
        <p class="timer-strip-name">Nothing running</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">00:00</div>
          <div class="timer-strip-actions">
            <button class="timer-button" id="timer-new" type="button">⏵ Start</button>
          </div>
        </div>
      </div>
    `;
  } else {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell" style="--timer-wash:${alphaColor(timerState.color, 0.1)}; --timer-line:${alphaColor(timerState.color, 0.18)};">
        <p class="timer-strip-name">${escapeHtml(timerState.name)}</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">${timerState.elapsed}</div>
          <div class="timer-strip-actions">
            <button class="timer-button" id="timer-toggle" type="button">${state.activeTimer.running ? "⏸ Pause" : "⏵ Resume"}</button>
            <button class="timer-button stop" id="timer-stop" type="button">⏹ Stop</button>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("timer-toggle")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-stop")?.addEventListener("click", stopTimer);
  document.getElementById("timer-new")?.addEventListener("click", () => {
    dom.quickNameInput.value = "";
    openSheet("quick-sheet");
  });
}

function renderNextTasks() {
  const nextTasks = getNextTasks();
  if (!nextTasks.length) {
    dom.nextScroll.innerHTML = `<p class="empty-note">Nothing queued right now.</p>`;
    return;
  }

  dom.nextScroll.innerHTML = nextTasks
    .map((task) => {
      const visual = getTaskVisual(task);
      const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
      return `
        <article class="next-card next-card-quiet" style="--next-wash:${alphaColor(visual.color, 0.12)}; --next-line:${alphaColor(visual.color, 0.2)};">
          <h3 class="next-name">${escapeHtml(task.name)}</h3>
          <p class="next-meta">${escapeHtml(visual.categoryName)}</p>
          <button class="next-play ${isLive ? "is-live" : ""}" data-start-task="${task.id}" type="button" ${isLive ? "disabled" : ""}>⏵</button>
        </article>
      `;
    })
    .join("");

  dom.nextScroll.querySelectorAll("[data-start-task]").forEach((button) => {
    if (!button.disabled) {
      button.onclick = () => startTimerForTask(button.dataset.startTask);
    }
  });
}

function renderTodoGroups() {
  const groups = getGroupedTasks();
  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", "Overdue", groups.overdue),
    renderTaskGroup("today", "Today", groups.today),
    renderTaskGroup("flexible", "Flexible", groups.flexible),
    renderTaskGroup("completed", "Completed", groups.completed, true),
  ].join("");

  dom.todoGroups.querySelectorAll("[data-task-check]").forEach((input) => {
    input.onchange = () => toggleTaskComplete(input.dataset.taskCheck);
  });
  dom.todoGroups.querySelectorAll("[data-task-start]").forEach((button) => {
    if (!button.disabled) {
      button.onclick = () => startTimerForTask(button.dataset.taskStart);
    }
  });
  dom.todoGroups.querySelectorAll("[data-toggle-group]").forEach((button) => {
    button.onclick = () => {
      const groupKey = button.dataset.toggleGroup;
      state.ui.groupOpen[groupKey] = !state.ui.groupOpen[groupKey];
      renderHome();
      persistState();
    };
  });

  bindTaskRowLongPress();
}

function renderTaskGroup(groupKey, title, tasks, completed = false) {
  const open = state.ui.groupOpen[groupKey];
  return `
    <section class="todo-group">
      <button class="group-toggle" data-toggle-group="${groupKey}" type="button">
        <h3>${title}</h3>
        <div class="group-dash"></div>
        <span class="group-caret ${open ? "is-open" : ""}"></span>
      </button>
      ${
        open
          ? tasks.length
            ? `<div class="task-list">${tasks.map((task) => renderTaskRow(task, completed)).join("")}</div>`
            : `<p class="empty-note">${title === "Flexible" ? "No flexible tasks." : "This section is empty right now."}</p>`
          : ""
      }
    </section>
  `;
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  return `
    <article class="task-row ${isCompleted ? "is-completed" : ""} ${isLive ? "is-running" : ""}" data-task-row="${task.id}">
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      <div class="task-time-block">${timeText}</div>
      <div class="task-main">
        <div class="task-title-row task-title-inline">
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
          <span class="mini-pill inline-tag" style="background:${alphaColor(visual.color, 0.16)}; color:rgba(41,57,84,0.82);">${escapeHtml(visual.categoryName)}</span>
          ${task.important ? '<span class="task-star">★</span>' : ""}
        </div>
        <div class="task-subline">
          <span class="task-duration">${task.durationMin || state.defaultDuration} min</span>
        </div>
      </div>
      <div class="task-side">
        ${
          !task.completed
            ? `<button class="flat-start ${isLive ? "is-live" : ""}" data-task-start="${task.id}" type="button" ${isLive ? "disabled" : ""}>Start</button>`
            : ""
        }
      </div>
    </article>
  `;
}

function bindTaskRowLongPress() {
  let pressTimer = null;
  let activeTaskId = null;
  const clearPress = () => {
    if (pressTimer) {
      window.clearTimeout(pressTimer);
      pressTimer = null;
    }
    activeTaskId = null;
  };

  dom.todoGroups.querySelectorAll("[data-task-row]").forEach((row) => {
    row.onpointerdown = (event) => {
      if (event.target.closest(".task-check") || event.target.closest("[data-task-start]")) return;
      activeTaskId = row.dataset.taskRow;
      pressTimer = window.setTimeout(() => {
        if (activeTaskId) {
          prepareTaskDraft(activeTaskId);
        }
        clearPress();
      }, 420);
    };
    row.onpointerup = clearPress;
    row.onpointerleave = clearPress;
    row.onpointercancel = clearPress;
    row.onpointermove = clearPress;
  });
}

function renderStatsWheel(stats) {
  const chart = state.ui.statsRange === "today" ? renderClockDialSvg(stats) : renderPieSvg(stats);
  dom.statsWheelCard.innerHTML = `
    <div class="wheel-shell">
      ${chart}
      ${
        stats.selected
          ? `<div class="stats-floating-note"><strong>${escapeHtml(stats.selected.label)}</strong><span>${escapeHtml(stats.selected.note)}</span></div>`
          : ""
      }
    </div>
  `;

  dom.statsTotalRow.innerHTML = `
    <div class="stats-total-chip">
      <strong>${formatDuration(stats.totalMinutes)}</strong>
    </div>
  `;

  dom.statsLegend.innerHTML = "";
  dom.statsWheelCard.querySelectorAll("[data-segment-key]").forEach((node) => {
    node.onclick = (event) => {
      event.stopPropagation();
      state.ui.selectedSegment = state.ui.selectedSegment === node.dataset.segmentKey ? null : node.dataset.segmentKey;
      renderStats();
      persistState();
    };
  });

  dom.statsWheelCard.onclick = (event) => {
    if (!event.target.closest("[data-segment-key]") && state.ui.selectedSegment) {
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    }
  };
}

function renderClockDialSvg(stats) {
  const cx = 160;
  const cy = 160;
  const radius = 110;
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const hour = index * 2;
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (radius + 4);
    const y1 = cy + Math.sin(angle) * (radius + 4);
    const x2 = cx + Math.cos(angle) * (radius + 14);
    const y2 = cy + Math.sin(angle) * (radius + 14);
    const tx = cx + Math.cos(angle) * (radius + 28);
    const ty = cy + Math.sin(angle) * (radius + 28);
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(86,97,126,0.24)" stroke-width="2" />
      <text x="${tx}" y="${ty}" fill="rgba(86,97,126,0.62)" font-size="11" text-anchor="middle" dominant-baseline="middle">${hour === 0 ? 24 : hour}</text>
    `;
  }).join("");

  const segments = stats.segments
    .map((segment) => {
      const startRatio = segment.startMinutes / 1440;
      const endRatio = segment.endMinutes / 1440;
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, startRatio, endRatio)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.24 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${renderChartSliceLabel({
            label: segment.inlineLabel || segment.label,
            ratio: segment.ratio,
            midpointRatio: (startRatio + endRatio) / 2,
            cx,
            cy,
            radius: radius * 0.58,
            threshold: 0.12,
          })}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 320 320" aria-label="time clock">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${ticks}
      ${segments}
    </svg>
  `;
}

function renderPieSvg(stats) {
  const cx = 160;
  const cy = 160;
  const radius = 110;

  if (!stats.segments.length) {
    return `
      <svg class="wheel-svg" viewBox="0 0 320 320" aria-label="pie chart">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      </svg>
    `;
  }

  let currentRatio = 0;
  const segments = stats.segments
    .map((segment) => {
      const start = currentRatio;
      const end = currentRatio + segment.ratio;
      currentRatio = end;
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, start, end)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.28 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${renderChartSliceLabel({
            label: segment.inlineLabel || segment.label,
            ratio: segment.ratio,
            midpointRatio: (start + end) / 2,
            cx,
            cy,
            radius: radius * 0.56,
            threshold: 0.18,
          })}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 320 320" aria-label="pie chart">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${segments}
    </svg>
  `;
}

function renderTrendPanel() {
  dom.trendToggle.classList.toggle("is-open", state.ui.showTrend);
  dom.trendToggle.innerHTML = `
    <span>Weekly trend</span>
    <span class="trend-arrow">▾</span>
  `;

  dom.trendPanel.hidden = !state.ui.showTrend;
  if (!state.ui.showTrend) return;

  const trend = buildWeeklyTrend();
  dom.trendPanel.innerHTML = `
    <div class="trend-grid">
      ${trend
        .map(
          (entry) => `
            <div class="trend-row">
              <span class="trend-date">${entry.label}</span>
              <div class="trend-bar"><span style="width:${entry.width}%; background:${entry.color};"></span></div>
              <strong>${formatDuration(entry.minutes)}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTasksTree() {
  dom.tasksEditToggle.innerHTML = `<span aria-hidden="true">✎</span><span class="sr-only">Edit</span>`;
  dom.tasksEditToggle.setAttribute("aria-label", state.ui.tasksEditMode ? "Done editing" : "Edit tasks");
  dom.tasksEditToggle.classList.toggle("is-active", state.ui.tasksEditMode);
  dom.tasksTree.innerHTML = state.folders
    .map((folder) => {
      const content = folder.expanded
        ? `<div class="folder-content">${folder.categories.map((category) => renderCategoryStackItem(folder, category)).join("")}</div>`
        : "";

      return `
        <article class="folder-block">
          <div class="folder-headline">
            <div class="folder-name">${escapeHtml(folder.name)}</div>
            <div class="tree-controls">
              <button class="tree-plus-plain" data-add-child="category" data-parent-folder="${folder.id}" type="button">+</button>
              ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="folder" data-node-id="${folder.id}" type="button">✎</button>` : ""}
              <button class="tree-toggle ${folder.expanded ? "is-open" : ""}" data-toggle-folder="${folder.id}" type="button">${folder.expanded ? "▾" : "▸"}</button>
            </div>
          </div>
          ${content}
        </article>
      `;
    })
    .join("");

  bindTreeEvents();
}

function renderCategoryStackItem(folder, category) {
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${category.templates
          .map(
            (template) => `
              <div class="template-row-flat">
                <span>${escapeHtml(template.name)}</span>
                <div class="template-tail">
                  <span class="template-duration">${template.durationMin} min</span>
                  ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="template" data-node-id="${template.id}" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">✎</button>` : ""}
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <section class="category-stack-item" style="--tree-color:${category.color};">
      <div class="category-line">
        <button class="category-toggle-line" data-toggle-category="${category.id}" type="button">
          <span class="category-color-bar"></span>
          <span class="category-inline-caret">${category.expanded ? "▾" : "▸"}</span>
          <span class="category-title">${escapeHtml(category.name)}</span>
        </button>
        <div class="tree-controls">
          <button class="tree-plus-plain" data-add-child="template" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">+</button>
          ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="category" data-node-id="${category.id}" data-parent-folder="${folder.id}" type="button">✎</button>` : ""}
        </div>
      </div>
      ${templateMarkup}
    </section>
  `;
}

dom.taskDurationInput = document.getElementById("task-duration-detail-input");
dom.draftTab = document.getElementById("draft-tab");
dom.draftDrawer = document.getElementById("draft-drawer");
dom.draftClose = document.getElementById("draft-close");
dom.draftForm = document.getElementById("draft-form");
dom.draftInput = document.getElementById("draft-input");
dom.draftList = document.getElementById("draft-list");

state.drafts = Array.isArray(state.drafts) ? state.drafts : [];
state.ui = state.ui || {};
state.ui.draftOpen = Boolean(state.ui.draftOpen);

let draggedDraftId = null;

function updateOverlayState() {
  dom.scrim.hidden = !state.ui.openSheet && !state.ui.draftOpen;
}

function openSheet(id) {
  state.ui.draftOpen = false;
  state.ui.openSheet = id;
  document.querySelectorAll(".sheet-panel").forEach((sheet) => {
    if (sheet.id === id) {
      sheet.removeAttribute("hidden");
      requestAnimationFrame(() => sheet.classList.add("is-open"));
    } else {
      sheet.classList.remove("is-open");
      sheet.setAttribute("hidden", "");
    }
  });
  updateOverlayState();
}

function closeAllSheets(persist = true) {
  state.ui.openSheet = null;
  state.ui.draftOpen = false;
  document.querySelectorAll(".sheet-panel").forEach((sheet) => {
    sheet.classList.remove("is-open");
    sheet.setAttribute("hidden", "");
  });
  updateOverlayState();
  renderDraftDrawer();
  if (persist) persistState();
}

function openDraftDrawer() {
  state.ui.openSheet = null;
  document.querySelectorAll(".sheet-panel").forEach((sheet) => {
    sheet.classList.remove("is-open");
    sheet.setAttribute("hidden", "");
  });
  state.ui.draftOpen = true;
  updateOverlayState();
  renderDraftDrawer();
  persistState();
}

function closeDraftDrawer(persist = true) {
  state.ui.draftOpen = false;
  updateOverlayState();
  renderDraftDrawer();
  if (persist) persistState();
}

function toggleDraftDrawer() {
  if (state.ui.draftOpen) closeDraftDrawer();
  else openDraftDrawer();
}

function formatDraftCardColor(index) {
  const palette = ["#f6eaa8", "#cdeaf2", "#dbeec6", "#f6d1da", "#f6e3b2", "#d4e3fb"];
  return palette[index % palette.length];
}

function renderDraftDrawer() {
  if (!dom.draftDrawer || !dom.draftTab || !dom.draftList) return;

  dom.draftTab.setAttribute("aria-expanded", String(state.ui.draftOpen));
  dom.draftDrawer.hidden = false;
  dom.draftDrawer.classList.toggle("is-open", state.ui.draftOpen);
  dom.draftDrawer.querySelector("h2").textContent = "草稿纸";

  if (!state.drafts.length) {
    dom.draftList.innerHTML = `<p class="empty-note draft-empty">临时想法、顺手一句、今晚要安排的东西，都先塞在这里。</p>`;
    return;
  }

  dom.draftList.innerHTML = state.drafts
    .map(
      (draft, index) => `
        <article
          class="draft-note"
          draggable="true"
          data-draft-note="${draft.id}"
          style="--draft-note:${formatDraftCardColor(index)};"
        >
          <p>${escapeHtml(draft.text)}</p>
          <div class="draft-note-actions">
            <button class="draft-note-button" data-draft-to-task="${draft.id}" type="button">To-do</button>
            <button class="draft-note-button" data-draft-delete="${draft.id}" type="button">×</button>
          </div>
        </article>
      `
    )
    .join("");

  dom.draftList.querySelectorAll("[data-draft-to-task]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      const draft = state.drafts.find((entry) => entry.id === button.dataset.draftToTask);
      if (!draft) return;
      state.tasks.unshift({
        id: makeId("task"),
        name: draft.text.split("\n")[0].trim() || "Untitled",
        scheduledMinutes: null,
        durationMin: state.defaultDuration,
        important: false,
        completed: false,
        completedAt: null,
        folderId: null,
        categoryId: null,
        templateId: null,
        scheduledDate: null,
        repeatMode: "none",
        weekdays: [],
        timerMode: "up",
        createdAt: new Date().toISOString(),
      });
      state.drafts = state.drafts.filter((entry) => entry.id !== draft.id);
      renderAll();
      persistState();
    };
  });

  dom.draftList.querySelectorAll("[data-draft-delete]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      state.drafts = state.drafts.filter((entry) => entry.id !== button.dataset.draftDelete);
      renderDraftDrawer();
      persistState();
    };
  });

  dom.draftList.querySelectorAll("[data-draft-note]").forEach((note) => {
    note.ondragstart = () => {
      draggedDraftId = note.dataset.draftNote;
      note.classList.add("is-dragging");
    };
    note.ondragend = () => {
      draggedDraftId = null;
      note.classList.remove("is-dragging");
    };
    note.ondragover = (event) => {
      event.preventDefault();
    };
    note.ondrop = (event) => {
      event.preventDefault();
      if (!draggedDraftId || draggedDraftId === note.dataset.draftNote) return;
      const sourceIndex = state.drafts.findIndex((entry) => entry.id === draggedDraftId);
      const targetIndex = state.drafts.findIndex((entry) => entry.id === note.dataset.draftNote);
      if (sourceIndex < 0 || targetIndex < 0) return;
      const [source] = state.drafts.splice(sourceIndex, 1);
      state.drafts.splice(targetIndex, 0, source);
      renderDraftDrawer();
      persistState();
    };
  });
}

function bindDraftEvents() {
  if (!dom.draftTab || dom.draftTab.dataset.bound === "true") return;
  dom.draftTab.dataset.bound = "true";
  dom.draftTab.onclick = toggleDraftDrawer;
  dom.draftClose.onclick = () => closeDraftDrawer();
  dom.draftForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = dom.draftInput.value.trim();
    if (!text) {
      dom.draftInput.focus();
      return;
    }
    state.drafts.unshift({
      id: makeId("draft"),
      text,
      createdAt: new Date().toISOString(),
    });
    dom.draftInput.value = "";
    renderDraftDrawer();
    persistState();
  });
}

function renderAll() {
  applyTheme();
  applyBodyFlags();
  renderNavigation();
  renderHome();
  renderStats();
  renderTasksTree();
  renderSettings();
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  updateLogDuration();
}

function renderNavigation() {
  dom.pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === state.currentPage);
  });
  dom.navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.target === state.currentPage);
  });
  if (dom.bottomNav) dom.bottomNav.hidden = state.currentPage === "ai-planner";
  dom.fab.hidden = state.currentPage !== "home";
  updateOverlayState();
}

function buildTimerButton(kind, label) {
  return `
    <button class="timer-button ${kind}" id="timer-${kind}" type="button">
      <span class="timer-glyph ${kind}" aria-hidden="true"></span>
      <span>${label}</span>
    </button>
  `;
}

function renderHomeTimerOnly() {
  const timerState = getTimerPresentation();
  if (!timerState) {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell timer-strip-shell-idle">
        <p class="timer-strip-name">Nothing running</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">00:00</div>
          <div class="timer-strip-actions">
            ${buildTimerButton("new", "Start")}
          </div>
        </div>
      </div>
    `;
  } else {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell" style="--timer-wash:${alphaColor(timerState.color, 0.08)};">
        <p class="timer-strip-name">${escapeHtml(timerState.name)}</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">${timerState.elapsed}</div>
          <div class="timer-strip-actions">
            ${buildTimerButton(state.activeTimer.running ? "pause" : "resume", state.activeTimer.running ? "Pause" : "Resume")}
            ${buildTimerButton("stop", "Stop")}
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("timer-pause")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-resume")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-stop")?.addEventListener("click", stopTimer);
  document.getElementById("timer-new")?.addEventListener("click", () => {
    dom.quickNameInput.value = "";
    openSheet("quick-sheet");
  });
}

function renderNextTasks() {
  const nextTasks = getNextTasks();
  if (!nextTasks.length) {
    dom.nextScroll.innerHTML = `<p class="empty-note">Nothing queued right now.</p>`;
    return;
  }

  dom.nextScroll.innerHTML = nextTasks
    .map((task) => {
      const visual = getTaskVisual(task);
      const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
      return `
        <article class="next-card next-card-quiet" style="--next-wash:${alphaColor(visual.color, 0.08)};">
          <div class="next-inline">
            <div class="next-copy">
              <h3 class="next-name">${escapeHtml(task.name)}</h3>
              <p class="next-meta">${escapeHtml(visual.categoryName)}</p>
            </div>
            <button class="next-play ${isLive ? "is-live" : ""}" data-start-task="${task.id}" type="button" ${isLive ? "disabled" : ""} aria-label="Start task">
              <span class="play-glyph" aria-hidden="true"></span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.nextScroll.querySelectorAll("[data-start-task]").forEach((button) => {
    if (!button.disabled) {
      button.onclick = () => startTimerForTask(button.dataset.startTask);
    }
  });
}

function renderTaskGroup(groupKey, title, tasks, completed = false) {
  const open = state.ui.groupOpen[groupKey];
  return `
    <section class="todo-group">
      <button class="group-toggle" data-toggle-group="${groupKey}" type="button">
        <h3>${title}</h3>
        <div class="group-dash"></div>
        <span class="group-arrow ${open ? "is-open" : ""}" aria-hidden="true"></span>
      </button>
      ${
        open
          ? tasks.length
            ? `<div class="task-list">${tasks.map((task) => renderTaskRow(task, completed)).join("")}</div>`
            : `<p class="empty-note">${title === "Flexible" ? "No flexible tasks." : "This section is empty right now."}</p>`
          : ""
      }
    </section>
  `;
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  return `
    <article class="task-row ${isCompleted ? "is-completed" : ""} ${isLive ? "is-running" : ""}" data-task-row="${task.id}">
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      <div class="task-time-block">${timeText}</div>
      <div class="task-main">
        <div class="task-title-row task-title-inline">
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
          <span class="mini-pill inline-tag" style="background:${alphaColor(visual.color, 0.14)};">${escapeHtml(visual.categoryName)}</span>
          ${task.important ? '<span class="task-star">★</span>' : ""}
        </div>
        <div class="task-subline">
          <span class="task-duration">${task.durationMin || state.defaultDuration} min</span>
        </div>
      </div>
      <div class="task-side">
        ${
          !task.completed
            ? `<button class="flat-start ${isLive ? "is-live" : ""}" data-task-start="${task.id}" type="button" ${isLive ? "disabled" : ""}>Start</button>`
            : ""
        }
      </div>
    </article>
  `;
}

function prepareTaskDraft(taskId = null) {
  const task = taskId ? state.tasks.find((item) => item.id === taskId) : null;
  const durationInput = getTaskDurationInputElement();
  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));

  state.ui.editingTaskId = taskId;
  state.ui.createTaskSelection = task
    ? { folderId: task.folderId, categoryId: task.categoryId, templateId: task.templateId }
    : null;

  dom.taskSheetTitle.textContent = task ? "Edit Task" : "Create Task";
  dom.taskNameInput.value = task?.name || "";
  if (durationInput) durationInput.value = task?.durationMin || "";
  dom.taskImportantInput.checked = Boolean(task?.important);
  dom.taskRepeatSelect.value = task?.repeatMode || "none";
  state.ui.taskWeekdays = [...(task?.weekdays || [])];
  state.ui.taskTimerMode = task?.timerMode || "up";
  dom.taskDateInput.value = task?.scheduledDate || "";
  dom.taskTimeInput.value = task?.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : "";

  if (!task?.scheduledDate) {
    state.ui.taskDatePreset = "none";
  } else if (task.scheduledDate === today) {
    state.ui.taskDatePreset = "today";
  } else if (task.scheduledDate === tomorrow) {
    state.ui.taskDatePreset = "tomorrow";
  } else {
    state.ui.taskDatePreset = "pick";
  }

  state.ui.taskAdvancedOpen = Boolean(
    task && ((task.repeatMode && task.repeatMode !== "none") || task.timerMode === "down" || (task.weekdays || []).length)
  );

  updateTaskCategoryLabel();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const name = dom.taskNameInput.value.trim();
  const durationInput = getTaskDurationInputElement();
  if (!name) {
    dom.taskNameInput.focus();
    return;
  }

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const draft = {
    name,
    scheduledDate: getTaskDraftDate(),
    scheduledMinutes: parseTimeString(dom.taskTimeInput.value),
    durationMin: Number(durationInput?.value) || state.defaultDuration,
    important: dom.taskImportantInput.checked,
    repeatMode,
    weekdays: repeatMode === "weekly" || repeatMode === "custom" ? [...state.ui.taskWeekdays] : [],
    timerMode: state.ui.taskTimerMode || "up",
    folderId: state.ui.createTaskSelection?.folderId || null,
    categoryId: state.ui.createTaskSelection?.categoryId || null,
    templateId: state.ui.createTaskSelection?.templateId || null,
  };

  if (state.ui.editingTaskId) {
    const task = state.tasks.find((item) => item.id === state.ui.editingTaskId);
    if (task) Object.assign(task, draft);
  } else {
    state.tasks.unshift({
      id: makeId("task"),
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      ...draft,
    });
  }

  closeAllSheets();
  renderAll();
  persistState();
}

function renderStats() {
  renderStatsTabs();
  renderStatsFilters();

  const range = state.ui.statsRange;
  const stats = buildStatsDataset(range);
  dom.statsTitle.textContent =
    range === "today" ? "Today's Color" : range === "week" ? "Weekly Color" : range === "month" ? "Monthly Color" : "Custom Color";
  dom.statsRangeNote.textContent = range === "today" ? formatHeroDate(new Date()) : "";
  dom.customRangeRow.hidden = range !== "custom";
  dom.customStartDate.value = state.ui.customRange.start;
  dom.customEndDate.value = state.ui.customRange.end;

  renderStatsWheel(stats);
  renderStatsBreakdown(stats);
  renderTrendPanel();
}

function renderStatsTabs() {
  const rangeOptions = [
    { id: "today", label: "Today" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "custom", label: "Custom" },
  ];

  dom.statsRangeTabs.className = "range-switch";
  dom.statsRangeTabs.innerHTML = rangeOptions
    .map(
      (option) => `
        <button class="range-tab-link ${state.ui.statsRange === option.id ? "is-active" : ""}" data-stats-range="${option.id}" type="button">
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.statsModeTabs.innerHTML = `<span>View:</span><strong>Category</strong>`;
  dom.statsRangeTabs.querySelectorAll("[data-stats-range]").forEach((button) => {
    button.onclick = () => {
      state.ui.statsRange = button.dataset.statsRange;
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  });
}

function renderStatsFilters() {
  const options = [
    { value: "all", label: "All" },
    ...state.folders.map((folder) => ({ value: `folder:${folder.id}`, label: folder.name })),
    ...state.folders.flatMap((folder) =>
      folder.categories.map((category) => ({ value: `category:${category.id}`, label: `${folder.name} / ${category.name}` }))
    ),
  ];

  dom.statsCategoryFilter.innerHTML = options
    .map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`)
    .join("");
  dom.statsCategoryFilter.value = state.ui.statsCategoryFilter || "all";
  dom.statsCategoryFilter.onchange = (event) => {
    state.ui.statsCategoryFilter = event.target.value;
    state.ui.selectedSegment = null;
    renderStats();
    persistState();
  };
}

function buildStatsDataset(range) {
  const sessions = getFilteredSessions(range);
  const totalMinutes = sessions.reduce((sum, session) => sum + getSessionMinutes(session), 0);

  if (range === "today") {
    const segments = sessions.map((session, index) => {
      const start = new Date(session.start);
      const end = new Date(session.end);
      const task = state.tasks.find((entry) => entry.id === session.taskId);
      const visual = getTaskVisual(task || session);
      return {
        key: `clock-${index}`,
        startMinutes: start.getHours() * 60 + start.getMinutes(),
        endMinutes: end.getHours() * 60 + end.getMinutes(),
        color: visual.color,
        label: visual.label,
        note: `${formatClock(start)} - ${formatClock(end)} · ${formatDuration(getSessionMinutes(session))}`,
        ratio: Math.max(0, (end - start) / 86400000),
      };
    });
    return {
      type: "clock",
      totalMinutes,
      segments,
      selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
      breakdown: groupBreakdown(sessions),
    };
  }

  const grouped = groupBreakdown(sessions);
  const segments = grouped.map((item, index) => ({
    key: `pie-${index}`,
    ...item,
    note: `${formatDuration(item.minutes)} · ${item.percent}%`,
    ratio: item.minutes / Math.max(totalMinutes, 1),
  }));

  return {
    type: "pie",
    totalMinutes,
    segments,
    selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
    breakdown: grouped,
  };
}

function renderStatsWheel(stats) {
  const chart = state.ui.statsRange === "today" ? renderClockDialSvg(stats) : renderPieSvg(stats);
  dom.statsWheelCard.innerHTML = `
    <div class="wheel-shell">
      ${chart}
      ${
        stats.selected
          ? `<div class="stats-floating-note"><strong>${escapeHtml(stats.selected.label)}</strong><span>${escapeHtml(stats.selected.note)}</span></div>`
          : ""
      }
    </div>
  `;

  dom.statsTotalRow.innerHTML = `<div class="stats-total-chip"><strong>${formatDuration(stats.totalMinutes)}</strong></div>`;
  dom.statsLegend.innerHTML = "";

  dom.statsWheelCard.querySelectorAll("[data-segment-key]").forEach((node) => {
    node.onclick = (event) => {
      event.stopPropagation();
      state.ui.selectedSegment = state.ui.selectedSegment === node.dataset.segmentKey ? null : node.dataset.segmentKey;
      renderStats();
      persistState();
    };
  });

  dom.statsWheelCard.onclick = (event) => {
    if (!event.target.closest("[data-segment-key]") && state.ui.selectedSegment) {
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    }
  };
}

function renderClockDialSvg(stats) {
  const cx = 170;
  const cy = 170;
  const radius = 130;
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const hour = index * 2;
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (radius + 4);
    const y1 = cy + Math.sin(angle) * (radius + 4);
    const x2 = cx + Math.cos(angle) * (radius + 15);
    const y2 = cy + Math.sin(angle) * (radius + 15);
    const tx = cx + Math.cos(angle) * (radius + 29);
    const ty = cy + Math.sin(angle) * (radius + 29);
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(86,97,126,0.22)" stroke-width="2" />
      <text x="${tx}" y="${ty}" fill="rgba(86,97,126,0.62)" font-size="12" text-anchor="middle" dominant-baseline="middle">${hour === 0 ? 24 : hour}</text>
    `;
  }).join("");

  const segments = stats.segments
    .map((segment) => {
      const startRatio = segment.startMinutes / 1440;
      const endRatio = segment.endMinutes / 1440;
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, startRatio, endRatio)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.24 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${renderSegmentLabel({
            label: segment.label,
            ratio: segment.ratio,
            midpointRatio: (startRatio + endRatio) / 2,
            cx,
            cy,
            radius: radius * 0.58,
            threshold: 0.12,
          })}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="time clock">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${ticks}
      ${segments}
    </svg>
  `;
}

function renderPieSvg(stats) {
  const cx = 170;
  const cy = 170;
  const radius = 130;

  if (!stats.segments.length) {
    return `
      <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="pie chart">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      </svg>
    `;
  }

  let currentRatio = 0;
  const segments = stats.segments
    .map((segment) => {
      const start = currentRatio;
      const end = currentRatio + segment.ratio;
      currentRatio = end;
      return `
        <g>
          <path
            d="${describePieSlice(cx, cy, radius, start, end)}"
            fill="${segment.color}"
            opacity="${state.ui.selectedSegment && state.ui.selectedSegment !== segment.key ? 0.28 : 0.96}"
            data-segment-key="${segment.key}"
            style="cursor:pointer"
          ></path>
          ${renderSegmentLabel({
            label: segment.label,
            ratio: segment.ratio,
            midpointRatio: (start + end) / 2,
            cx,
            cy,
            radius: radius * 0.56,
            threshold: 0.16,
          })}
        </g>
      `;
    })
    .join("");

  return `
    <svg class="wheel-svg" viewBox="0 0 340 340" aria-label="pie chart">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(96,106,138,0.08)" />
      ${segments}
    </svg>
  `;
}

function renderSegmentLabel({ label, ratio, midpointRatio, cx, cy, radius, threshold = 0.1 }) {
  if (ratio < threshold) return "";
  const shortened = escapeHtml(label.length > 11 ? `${label.slice(0, 11)}…` : label);
  const angle = midpointRatio * Math.PI * 2 - Math.PI / 2;
  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius;
  return `<text x="${x}" y="${y}" fill="rgba(35,52,73,0.74)" font-size="10.5" text-anchor="middle" dominant-baseline="middle">${shortened}</text>`;
}

function renderTrendPanel() {
  dom.trendToggle.classList.toggle("is-open", state.ui.showTrend);
  dom.trendToggle.innerHTML = `
    <span>Weekly trend</span>
    <span class="trend-arrow">${state.ui.showTrend ? "▾" : "▸"}</span>
  `;

  dom.trendPanel.hidden = !state.ui.showTrend;
  if (!state.ui.showTrend) return;

  const trend = buildWeeklyTrend();
  dom.trendPanel.innerHTML = `
    <div class="trend-grid">
      ${trend
        .map(
          (entry) => `
            <div class="trend-row">
              <span class="trend-date">${entry.label}</span>
              <div class="trend-bar"><span style="width:${entry.width}%; background:${entry.color};"></span></div>
              <strong>${formatDuration(entry.minutes)}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTasksTree() {
  dom.tasksEditToggle.innerHTML = `<span aria-hidden="true">✎</span><span class="sr-only">${state.ui.tasksEditMode ? "Done editing" : "Edit tasks"}</span>`;
  dom.tasksEditToggle.setAttribute("aria-label", state.ui.tasksEditMode ? "Done editing" : "Edit tasks");
  dom.tasksEditToggle.classList.toggle("is-active", Boolean(state.ui.tasksEditMode));
  dom.tasksTree.innerHTML = state.folders
    .map((folder) => {
      const content = folder.expanded
        ? `<div class="folder-content">${folder.categories.map((category) => renderCategoryStackItem(folder, category)).join("")}</div>`
        : "";

      return `
        <article class="folder-block">
          <div class="folder-headline" data-toggle-folder-row="${folder.id}" role="button" tabindex="0">
            <div class="folder-name">${escapeHtml(folder.name)}</div>
            <div class="tree-controls">
              <button class="tree-plus-plain" data-add-child="category" data-parent-folder="${folder.id}" type="button">+</button>
              ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="folder" data-node-id="${folder.id}" type="button" aria-label="Edit folder">✎</button>` : ""}
            </div>
          </div>
          ${content}
        </article>
      `;
    })
    .join("");

  bindTreeEvents();
}

function renderCategoryStackItem(folder, category) {
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${category.templates
          .map(
            (template) => `
              <div class="template-row-flat">
                <span>${escapeHtml(template.name)}</span>
                <div class="template-tail">
                  <span class="template-duration">${template.durationMin} min</span>
                  ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="template" data-node-id="${template.id}" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button" aria-label="Edit template">✎</button>` : ""}
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <section class="category-stack-item" style="--tree-color:${category.color};">
      <div class="category-line" data-toggle-category-row="${category.id}" role="button" tabindex="0">
        <div class="category-toggle-line">
          <span class="category-color-bar"></span>
          <span class="category-title">${escapeHtml(category.name)}</span>
        </div>
        <div class="tree-controls">
          <button class="tree-plus-plain" data-add-child="task" data-parent-folder="${folder.id}" data-parent-category="${category.id}" type="button">+</button>
          ${state.ui.tasksEditMode ? `<button class="tree-mini" data-edit-node="category" data-node-id="${category.id}" data-parent-folder="${folder.id}" type="button" aria-label="Edit category">✎</button>` : ""}
        </div>
      </div>
      ${templateMarkup}
    </section>
  `;
}

function bindTreeEvents() {
  dom.tasksTree.querySelectorAll("[data-toggle-folder-row]").forEach((row) => {
    row.onclick = (event) => {
      if (event.target.closest("button")) return;
      const folder = state.folders.find((item) => item.id === row.dataset.toggleFolderRow);
      if (!folder) return;
      folder.expanded = !folder.expanded;
      renderTasksTree();
      persistState();
    };
    row.onkeydown = (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      row.click();
    };
  });

  dom.tasksTree.querySelectorAll("[data-toggle-category-row]").forEach((row) => {
    row.onclick = (event) => {
      if (event.target.closest("button")) return;
      const category = getAllCategories().find((item) => item.id === row.dataset.toggleCategoryRow);
      if (!category) return;
      category.expanded = !category.expanded;
      renderTasksTree();
      persistState();
    };
    row.onkeydown = (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      row.click();
    };
  });

  dom.tasksTree.querySelectorAll("[data-add-child]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      if (button.dataset.addChild === "task") {
        state.ui.createTaskSelection = {
          folderId: button.dataset.parentFolder || null,
          categoryId: button.dataset.parentCategory || null,
          templateId: null,
        };
        prepareTaskDraft();
        return;
      }
      openTreeEditor({
        mode: "create",
        type: button.dataset.addChild,
        parentFolderId: button.dataset.parentFolder || null,
        parentCategoryId: button.dataset.parentCategory || null,
      });
    };
  });

  dom.tasksTree.querySelectorAll("[data-edit-node]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      openTreeEditor({
        mode: "edit",
        type: button.dataset.editNode,
        nodeId: button.dataset.nodeId,
        parentFolderId: button.dataset.parentFolder || null,
        parentCategoryId: button.dataset.parentCategory || null,
      });
    };
  });
}

dom.todoSortToggle = document.getElementById("todo-sort-toggle");

state.ui.todoSortMode = Boolean(state.ui.todoSortMode);
state.ui.editingTaskNoteId = state.ui.editingTaskNoteId || null;
state.ui.draftTabTop = typeof state.ui.draftTabTop === "number" ? state.ui.draftTabTop : 34;
state.tasks = (state.tasks || []).map((task, index) => ({
  note: task.note || "",
  manualOrder: Number.isFinite(task.manualOrder) ? task.manualOrder : index,
  ...task,
}));

let draggedTodoTaskId = null;

function ensureUiCopy() {
  const actionTitle = document.querySelector("#action-sheet .sheet-header h2");
  if (actionTitle) actionTitle.textContent = "Add";

  const taskKicker = document.querySelector("#task-sheet .sheet-kicker");
  if (taskKicker) taskKicker.textContent = "";
  if (dom.taskNameInput) dom.taskNameInput.placeholder = "Task Name";
  if (dom.quickNameInput) dom.quickNameInput.placeholder = "Task Name";
  if (dom.logTaskInput) dom.logTaskInput.placeholder = "Task Name";
  if (dom.treeNameInput) dom.treeNameInput.placeholder = "Name";

  const quickTitle = document.querySelector("#quick-sheet .sheet-header h2");
  if (quickTitle) quickTitle.textContent = "Quick Start";
  const quickKicker = document.querySelector("#quick-sheet .sheet-kicker");
  if (quickKicker) quickKicker.textContent = "";
  const quickSubmit = document.querySelector("#quick-sheet .primary-button");
  if (quickSubmit) quickSubmit.textContent = "Start";

  const logTitle = document.querySelector("#log-sheet .sheet-header h2");
  if (logTitle) logTitle.textContent = "Log Time";
  const logKicker = document.querySelector("#log-sheet .sheet-kicker");
  if (logKicker) logKicker.textContent = "";

  const timeKicker = document.querySelector("#time-sheet .sheet-kicker");
  if (timeKicker) timeKicker.textContent = "";

  if (!document.getElementById("time-back-button")) {
    const header = document.querySelector("#time-sheet .sheet-header");
    if (header) {
      const button = document.createElement("button");
      button.type = "button";
      button.id = "time-back-button";
      button.className = "sheet-back";
      button.setAttribute("aria-label", "Back");
      button.textContent = "‹";
      header.insertBefore(button, header.firstElementChild);
    }
  }

  document.getElementById("time-back-button")?.addEventListener("click", () => openSheet("task-sheet"));
}

function reindexTaskOrder() {
  state.tasks.forEach((task, index) => {
    task.manualOrder = index;
  });
}

function taskManualRank(task) {
  return Number.isFinite(task.manualOrder) ? task.manualOrder : Number.MAX_SAFE_INTEGER;
}

function sortTasksForHome(a, b) {
  const aDate = a.scheduledDate || "";
  const bDate = b.scheduledDate || "";
  return (
    aDate.localeCompare(bDate) ||
    taskManualRank(a) - taskManualRank(b) ||
    (a.scheduledMinutes ?? 9999) - (b.scheduledMinutes ?? 9999) ||
    Number(b.important) - Number(a.important)
  );
}

function renderDraftDrawer() {
  if (!dom.draftDrawer || !dom.draftTab || !dom.draftList) return;

  dom.draftTab.style.top = `${state.ui.draftTabTop}%`;
  dom.draftTab.setAttribute("aria-expanded", String(state.ui.draftOpen));
  dom.draftDrawer.hidden = false;
  dom.draftDrawer.classList.toggle("is-open", state.ui.draftOpen);

  if (!state.drafts.length) {
    dom.draftList.innerHTML = `<p class="empty-note draft-empty">临时想法先放这里。</p>`;
    return;
  }

  dom.draftList.innerHTML = state.drafts
    .map(
      (draft, index) => `
        <button
          class="draft-note"
          draggable="true"
          data-draft-note="${draft.id}"
          type="button"
          style="--draft-note:${formatDraftCardColor(index)};"
        >
          <span class="draft-note-text">${escapeHtml(draft.text)}</span>
          <span class="draft-note-close" data-draft-delete="${draft.id}" aria-label="Delete">×</span>
        </button>
      `
    )
    .join("");

  dom.draftList.querySelectorAll("[data-draft-delete]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      state.drafts = state.drafts.filter((entry) => entry.id !== button.dataset.draftDelete);
      renderDraftDrawer();
      persistState();
    };
  });

  dom.draftList.querySelectorAll("[data-draft-note]").forEach((note) => {
    note.onclick = () => {
      const draft = state.drafts.find((entry) => entry.id === note.dataset.draftNote);
      if (!draft) return;
      prepareTaskDraft();
      dom.taskNameInput.value = draft.text;
      openSheet("task-sheet");
    };
    note.ondragstart = () => {
      note.classList.add("is-dragging");
    };
    note.ondragend = () => {
      note.classList.remove("is-dragging");
    };
  });

  dom.draftList.ondragover = (event) => event.preventDefault();
  dom.draftList.ondrop = (event) => {
    event.preventDefault();
  };
}

function bindDraftEvents() {
  if (!dom.draftTab || dom.draftTab.dataset.bound === "true") return;
  dom.draftTab.dataset.bound = "true";

  let draftDragging = false;
  let dragMoved = false;
  let startY = 0;
  let startTop = state.ui.draftTabTop;

  dom.draftTab.onpointerdown = (event) => {
    draftDragging = true;
    dragMoved = false;
    startY = event.clientY;
    startTop = state.ui.draftTabTop;
    dom.draftTab.setPointerCapture?.(event.pointerId);
  };
  dom.draftTab.onpointermove = (event) => {
    if (!draftDragging) return;
    const deltaPercent = ((event.clientY - startY) / window.innerHeight) * 100;
    if (Math.abs(deltaPercent) > 1) dragMoved = true;
    state.ui.draftTabTop = Math.max(12, Math.min(80, startTop + deltaPercent));
    dom.draftTab.style.top = `${state.ui.draftTabTop}%`;
  };
  dom.draftTab.onpointerup = (event) => {
    dom.draftTab.releasePointerCapture?.(event.pointerId);
    if (!dragMoved) toggleDraftDrawer();
    draftDragging = false;
    persistState();
  };
  dom.draftTab.onpointercancel = () => {
    draftDragging = false;
  };

  dom.draftClose.onclick = () => closeDraftDrawer();
  dom.draftForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = dom.draftInput.value.trim();
    if (!text) {
      dom.draftInput.focus();
      return;
    }
    state.drafts.unshift({
      id: makeId("draft"),
      text: text.slice(0, 32),
      createdAt: new Date().toISOString(),
    });
    dom.draftInput.value = "";
    renderDraftDrawer();
    persistState();
  });
}

function renderAll() {
  applyTheme();
  applyBodyFlags();
  ensureUiCopy();
  renderNavigation();
  renderHome();
  renderStats();
  renderTasksTree();
  renderSettings();
  renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  updateLogDuration();
}

function renderNavigation() {
  dom.pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === state.currentPage);
  });
  dom.navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.target === state.currentPage);
  });
  dom.fab.hidden = state.currentPage !== "home";
  updateOverlayState();
}

function renderNextTasks() {
  const nextTasks = getNextTasks();
  if (!nextTasks.length) {
    dom.nextScroll.innerHTML = `<p class="empty-note">Nothing queued right now.</p>`;
    return;
  }

  dom.nextScroll.innerHTML = nextTasks
    .map((task) => {
      const visual = getTaskVisual(task);
      const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
      return `
        <article class="next-card next-card-quiet" style="--next-wash:${alphaColor(visual.color, 0.08)};">
          <div class="next-inline">
            <div class="next-copy">
              <h3 class="next-name">${escapeHtml(task.name)}</h3>
              <p class="next-meta">${escapeHtml(visual.categoryName)}</p>
            </div>
            <button class="next-play ${isLive ? "is-live" : ""}" data-start-task="${task.id}" type="button" ${isLive ? "disabled" : ""} aria-label="Start task">
              <span class="play-glyph" aria-hidden="true"></span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.nextScroll.querySelectorAll("[data-start-task]").forEach((button) => {
    if (!button.disabled) {
      button.onclick = () => startTimerForTask(button.dataset.startTask);
    }
  });
}

function renderTaskGroup(groupKey, title, tasks, completed = false) {
  const open = state.ui.groupOpen[groupKey];
  return `
    <section class="todo-group" data-group-key="${groupKey}">
      <button class="group-toggle" data-toggle-group="${groupKey}" type="button">
        <h3>${title}</h3>
        <div class="group-dash"></div>
        <span class="group-arrow ${open ? "is-open" : ""}" aria-hidden="true"></span>
      </button>
      ${
        open
          ? tasks.length
            ? `<div class="task-list">${tasks.map((task) => renderTaskRow(task, completed)).join("")}</div>`
            : `<p class="empty-note">${title === "Flexible" ? "No flexible tasks." : "This section is empty right now."}</p>`
          : ""
      }
    </section>
  `;
}

function renderTaskNote(task) {
  if (state.ui.todoSortMode) {
    if (state.ui.editingTaskNoteId === task.id || task.note) {
      return `
        <input
          class="task-note-input"
          data-task-note-input="${task.id}"
          type="text"
          maxlength="15"
          value="${escapeHtml(task.note || "")}"
          placeholder="备注"
        />
      `;
    }
    return `<button class="task-note-slot" data-note-open="${task.id}" type="button" aria-label="Add note"></button>`;
  }

  return task.note ? `<span class="task-note-textline">${escapeHtml(task.note)}</span>` : "";
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  const sortMode = state.ui.todoSortMode && !isCompleted;
  const timeMarkup = sortMode
    ? `<input class="task-time-edit" data-task-time="${task.id}" type="time" value="${task.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : ""}" />`
    : `<div class="task-time-block">${task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes)}</div>`;

  return `
    <article
      class="task-row ${isCompleted ? "is-completed" : ""} ${isLive ? "is-running" : ""} ${sortMode ? "is-sortable" : ""}"
      data-task-row="${task.id}"
      ${sortMode ? 'draggable="true"' : ""}
    >
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      ${timeMarkup}
      <div class="task-main">
        <div class="task-title-row task-title-inline">
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
          <span class="mini-pill inline-tag" style="background:${alphaColor(visual.color, 0.14)};">${escapeHtml(visual.categoryName)}</span>
          ${task.important ? '<span class="task-star">★</span>' : ""}
        </div>
        <div class="task-subline">
          <span class="task-duration">${task.durationMin || state.defaultDuration} min</span>
          ${renderTaskNote(task)}
        </div>
      </div>
      <div class="task-side">
        ${!task.completed ? `<button class="flat-start ${isLive ? "is-live" : ""}" data-task-start="${task.id}" type="button" ${isLive ? "disabled" : ""}>Start</button>` : ""}
        <button class="task-edit-inline" data-task-edit="${task.id}" type="button">Edit</button>
      </div>
    </article>
  `;
}

function moveTaskBefore(dragId, targetId) {
  if (!dragId || !targetId || dragId === targetId) return;
  const from = state.tasks.findIndex((task) => task.id === dragId);
  const to = state.tasks.findIndex((task) => task.id === targetId);
  if (from < 0 || to < 0) return;
  const [moved] = state.tasks.splice(from, 1);
  const nextIndex = state.tasks.findIndex((task) => task.id === targetId);
  state.tasks.splice(nextIndex, 0, moved);
  reindexTaskOrder();
}

function saveTaskNote(taskId, value) {
  const task = state.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  task.note = value.trim().slice(0, 15);
  state.ui.editingTaskNoteId = null;
  renderHome();
  persistState();
}

function bindTaskRowLongPress() {
  let pressTimer = null;
  let activeTaskId = null;
  let startPoint = null;

  const clearPress = () => {
    if (pressTimer) {
      window.clearTimeout(pressTimer);
      pressTimer = null;
    }
    activeTaskId = null;
    startPoint = null;
  };

  dom.todoGroups.querySelectorAll("[data-task-row]").forEach((row) => {
    row.oncontextmenu = (event) => {
      event.preventDefault();
      if (state.ui.todoSortMode) return;
      prepareTaskDraft(row.dataset.taskRow);
    };

    row.onpointerdown = (event) => {
      if (state.ui.todoSortMode) return;
      if (event.target.closest(".task-check") || event.target.closest("[data-task-start]") || event.target.closest("[data-task-edit]")) return;
      activeTaskId = row.dataset.taskRow;
      startPoint = { x: event.clientX, y: event.clientY };
      pressTimer = window.setTimeout(() => {
        if (activeTaskId) prepareTaskDraft(activeTaskId);
        clearPress();
      }, 420);
    };

    row.onpointermove = (event) => {
      if (!startPoint) return;
      const deltaX = Math.abs(event.clientX - startPoint.x);
      const deltaY = Math.abs(event.clientY - startPoint.y);
      if (deltaX > 8 || deltaY > 8) clearPress();
    };

    row.onpointerup = clearPress;
    row.onpointercancel = clearPress;
  });
}

function renderTodoGroups() {
  const groups = getGroupedTasks();
  if (dom.todoSortToggle) {
    dom.todoSortToggle.textContent = state.ui.todoSortMode ? "Done" : "Sort";
    dom.todoSortToggle.onclick = () => {
      state.ui.todoSortMode = !state.ui.todoSortMode;
      state.ui.editingTaskNoteId = null;
      renderHome();
      persistState();
    };
  }

  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", "Overdue", groups.overdue),
    renderTaskGroup("today", "Today", groups.today),
    renderTaskGroup("flexible", "Flexible", groups.flexible),
    renderTaskGroup("completed", "Completed", groups.completed, true),
  ].join("");

  dom.todoGroups.querySelectorAll("[data-task-check]").forEach((input) => {
    input.onchange = () => toggleTaskComplete(input.dataset.taskCheck);
  });
  dom.todoGroups.querySelectorAll("[data-task-start]").forEach((button) => {
    if (!button.disabled) button.onclick = () => startTimerForTask(button.dataset.taskStart);
  });
  dom.todoGroups.querySelectorAll("[data-task-edit]").forEach((button) => {
    button.onclick = () => prepareTaskDraft(button.dataset.taskEdit);
  });
  dom.todoGroups.querySelectorAll("[data-toggle-group]").forEach((button) => {
    button.onclick = () => {
      const groupKey = button.dataset.toggleGroup;
      state.ui.groupOpen[groupKey] = !state.ui.groupOpen[groupKey];
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-task-time]").forEach((input) => {
    input.onchange = () => {
      const task = state.tasks.find((entry) => entry.id === input.dataset.taskTime);
      if (!task) return;
      task.scheduledMinutes = parseTimeString(input.value);
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-note-open]").forEach((button) => {
    button.onclick = () => {
      state.ui.editingTaskNoteId = button.dataset.noteOpen;
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-task-note-input]").forEach((input) => {
    input.onclick = (event) => event.stopPropagation();
    input.onkeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveTaskNote(input.dataset.taskNoteInput, input.value);
      }
      if (event.key === "Escape") {
        state.ui.editingTaskNoteId = null;
        renderHome();
      }
    };
    input.onblur = () => saveTaskNote(input.dataset.taskNoteInput, input.value);
  });

  if (state.ui.todoSortMode) {
    dom.todoGroups.querySelectorAll("[data-task-row]").forEach((row) => {
      row.ondragstart = () => {
        draggedTodoTaskId = row.dataset.taskRow;
        row.classList.add("is-dragging");
      };
      row.ondragover = (event) => {
        event.preventDefault();
        row.classList.add("is-drop-target");
      };
      row.ondragleave = () => row.classList.remove("is-drop-target");
      row.ondragend = () => {
        draggedTodoTaskId = null;
        row.classList.remove("is-dragging");
        row.classList.remove("is-drop-target");
      };
      row.ondrop = (event) => {
        event.preventDefault();
        row.classList.remove("is-drop-target");
        moveTaskBefore(draggedTodoTaskId, row.dataset.taskRow);
        renderHome();
        persistState();
      };
    });
  }

  bindTaskRowLongPress();
}

function renderTaskAdvancedControls() {
  if (!dom.taskAdvancedPanel) return;
  const isOpen = Boolean(state.ui.taskAdvancedOpen);
  dom.taskAdvancedPanel.hidden = !isOpen;
  dom.taskMoreToggle.textContent = `More settings ${isOpen ? "▴" : "▾"}`;

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const showWeekdays = repeatMode === "weekly";
  dom.taskWeekdaysField.hidden = !showWeekdays;

  const weekdayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  dom.taskWeekdaysGrid.innerHTML = weekdayOptions
    .map(
      (day) => `
        <button class="weekday-chip ${state.ui.taskWeekdays.includes(day) ? "is-active" : ""}" data-weekday-chip="${day}" type="button">
          ${day}
        </button>
      `
    )
    .join("");

  dom.taskWeekdaysGrid.querySelectorAll("[data-weekday-chip]").forEach((button) => {
    button.onclick = () => {
      const day = button.dataset.weekdayChip;
      if (state.ui.taskWeekdays.includes(day)) {
        state.ui.taskWeekdays = state.ui.taskWeekdays.filter((entry) => entry !== day);
      } else {
        state.ui.taskWeekdays = [...state.ui.taskWeekdays, day];
      }
      renderTaskAdvancedControls();
    };
  });

  const timerMode = state.ui.taskTimerMode || "up";
  dom.taskTimerMode.innerHTML = `
    <div class="timer-mode-stack">
      <button class="timer-radio ${timerMode === "up" ? "is-active" : ""}" data-timer-mode="up" type="button">Count up</button>
      <button class="timer-radio ${timerMode === "down" ? "is-active" : ""}" data-timer-mode="down" type="button">Count down</button>
    </div>
  `;
  dom.taskTimerMode.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskTimerMode = button.dataset.timerMode;
      renderTaskAdvancedControls();
    };
  });
}

function updateTaskTimeSummary() {
  if (!dom.taskTimeLabel || !dom.taskDateLabel) return;

  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));
  const quickOptions = [
    { id: "none", label: "No date" },
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
  ];

  dom.taskDateQuickGrid.innerHTML = quickOptions
    .map(
      (option) => `
        <button class="quick-option ${state.ui.taskDatePreset === option.id ? "is-active" : ""}" data-date-preset="${option.id}" type="button">
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.taskDateQuickGrid.querySelectorAll("[data-date-preset]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskDatePreset = button.dataset.datePreset;
      if (state.ui.taskDatePreset === "none") dom.taskDateInput.value = "";
      if (state.ui.taskDatePreset === "today") dom.taskDateInput.value = today;
      if (state.ui.taskDatePreset === "tomorrow") dom.taskDateInput.value = tomorrow;
      updateTaskTimeSummary();
    };
  });

  dom.taskDateInput.onchange = () => {
    if (!dom.taskDateInput.value) state.ui.taskDatePreset = "none";
    else if (dom.taskDateInput.value === today) state.ui.taskDatePreset = "today";
    else if (dom.taskDateInput.value === tomorrow) state.ui.taskDatePreset = "tomorrow";
    else state.ui.taskDatePreset = "none";
    updateTaskTimeSummary();
  };
  dom.taskTimeInput.oninput = () => updateTaskTimeSummary();
  getTaskDurationInputElement().oninput = () => updateTaskTimeSummary();

  const timeValue = parseTimeString(dom.taskTimeInput.value);
  const dateValue = getTaskDraftDate();
  dom.taskTimeLabel.textContent = timeValue == null ? "Any time" : formatMinutes(timeValue);
  dom.taskDateLabel.textContent = formatTaskDateNote(dateValue);

  const dateField = document.getElementById("task-custom-date-field");
  const timeField = document.getElementById("task-time-field");
  const durationField = document.getElementById("task-duration-field");
  if (dateField) dateField.hidden = false;
  if (timeField) timeField.hidden = false;
  if (durationField) durationField.hidden = false;
}

function getTaskDraftDate() {
  if (state.ui.taskDatePreset === "today") return formatInputDate(new Date());
  if (state.ui.taskDatePreset === "tomorrow") return formatInputDate(shiftDate(new Date(), 1));
  return dom.taskDateInput.value || null;
}

function prepareTaskDraft(taskId = null) {
  const task = taskId ? state.tasks.find((item) => item.id === taskId) : null;
  const durationInput = getTaskDurationInputElement();
  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));

  state.ui.editingTaskId = taskId;
  state.ui.createTaskSelection = task
    ? { folderId: task.folderId, categoryId: task.categoryId, templateId: task.templateId }
    : null;

  dom.taskSheetTitle.textContent = task ? "Edit Task" : "Create Task";
  dom.taskNameInput.value = task?.name || "";
  if (durationInput) durationInput.value = task?.durationMin || "";
  dom.taskImportantInput.checked = Boolean(task?.important);
  dom.taskRepeatSelect.value = task?.repeatMode === "weekly" ? "weekly" : task?.repeatMode === "daily" ? "daily" : "none";
  state.ui.taskWeekdays = [...(task?.weekdays || [])];
  state.ui.taskTimerMode = task?.timerMode || "up";
  dom.taskDateInput.value = task?.scheduledDate || "";
  dom.taskTimeInput.value = task?.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : "";

  if (!task?.scheduledDate) state.ui.taskDatePreset = "none";
  else if (task.scheduledDate === today) state.ui.taskDatePreset = "today";
  else if (task.scheduledDate === tomorrow) state.ui.taskDatePreset = "tomorrow";
  else state.ui.taskDatePreset = "none";

  state.ui.taskAdvancedOpen = Boolean(task && ((task.repeatMode && task.repeatMode !== "none") || task.timerMode === "down" || (task.weekdays || []).length));

  updateTaskCategoryLabel();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const name = dom.taskNameInput.value.trim();
  const durationInput = getTaskDurationInputElement();
  if (!name) {
    dom.taskNameInput.focus();
    return;
  }

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const draft = {
    name,
    scheduledDate: getTaskDraftDate(),
    scheduledMinutes: parseTimeString(dom.taskTimeInput.value),
    durationMin: Number(durationInput?.value) || state.defaultDuration,
    important: dom.taskImportantInput.checked,
    repeatMode,
    weekdays: repeatMode === "weekly" ? [...state.ui.taskWeekdays] : [],
    timerMode: state.ui.taskTimerMode || "up",
    folderId: state.ui.createTaskSelection?.folderId || null,
    categoryId: state.ui.createTaskSelection?.categoryId || null,
    templateId: state.ui.createTaskSelection?.templateId || null,
  };

  if (state.ui.editingTaskId) {
    const task = state.tasks.find((item) => item.id === state.ui.editingTaskId);
    if (task) Object.assign(task, draft);
  } else {
    state.tasks.unshift({
      id: makeId("task"),
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      note: "",
      manualOrder: -1,
      ...draft,
    });
    reindexTaskOrder();
  }

  closeAllSheets();
  renderAll();
  persistState();
}

let draggedDraftCardId = null;

state.ui.draftTabTop = typeof state.ui.draftTabTop === "number" ? state.ui.draftTabTop : 34;
state.ui.draftTabSide = state.ui.draftTabSide === "left" ? "left" : "right";

function bindActionCardsFinal() {
  document.querySelectorAll("#action-sheet [data-open-sheet]").forEach((button) => {
    if (button.dataset.finalBound === "true") return;
    button.dataset.finalBound = "true";
    button.onclick = () => {
      const target = button.dataset.openSheet;
      if (target === "task-sheet") {
        prepareTaskDraft();
        return;
      }
      if (target === "quick-sheet") {
        dom.quickNameInput.value = "";
        openSheet("quick-sheet");
        return;
      }
      if (target === "log-sheet") {
        dom.logTaskInput.value = "";
        openSheet("log-sheet");
      }
    };
  });
}

function ensureUiCopy() {
  bindActionCardsFinal();

  document.querySelectorAll("#action-sheet .action-card span").forEach((node) => node.remove());

  const titleMap = [
    ["#action-sheet .sheet-header h2", "Add"],
    ["#quick-sheet .sheet-header h2", "Quick Start"],
    ["#log-sheet .sheet-header h2", "Log Time"],
    ["#time-sheet .sheet-header h2", "Choose when"],
  ];
  titleMap.forEach(([selector, text]) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  });

  [
    "#task-sheet .sheet-kicker",
    "#quick-sheet .sheet-kicker",
    "#log-sheet .sheet-kicker",
    "#time-sheet .sheet-kicker",
    "#draft-drawer .sheet-kicker",
  ].forEach((selector) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = "";
  });

  const taskHeader = document.querySelector("#task-sheet .sheet-header h2");
  if (taskHeader) taskHeader.textContent = state.ui.editingTaskId ? "Edit Task" : "Create Task";

  if (dom.taskNameInput) dom.taskNameInput.placeholder = "Task Name";
  if (dom.quickNameInput) dom.quickNameInput.placeholder = "Task Name";
  if (dom.logTaskInput) dom.logTaskInput.placeholder = "Task Name";

  const quickSubmit = document.querySelector("#quick-sheet .primary-button");
  if (quickSubmit) quickSubmit.textContent = "Start";

  const taskNameLabel = document.querySelector("#task-sheet .task-name-line > span");
  const categoryLabel = dom.taskCategoryButton?.querySelector("span");
  const quickLabel = document.querySelector("#quick-sheet #quick-form > .line-field > span");
  const logLabel = document.querySelector("#log-sheet #log-form > .line-field:first-of-type > span");
  const treeNameLabel = document.querySelector("#tree-editor-form .line-field > span");
  [taskNameLabel, categoryLabel, quickLabel, logLabel, treeNameLabel].forEach((node) => {
    if (node) node.classList.add("sr-only");
  });

  if (dom.taskRepeatSelect) {
    const current = dom.taskRepeatSelect.value;
    dom.taskRepeatSelect.innerHTML = `
      <option value="none">None</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
    `;
    dom.taskRepeatSelect.value = ["none", "daily", "weekly"].includes(current) ? current : "none";
    dom.taskRepeatSelect.onchange = () => renderTaskAdvancedControls();
  }

  if (dom.taskMoreToggle) {
    dom.taskMoreToggle.onclick = () => {
      state.ui.taskAdvancedOpen = !state.ui.taskAdvancedOpen;
      renderTaskAdvancedControls();
    };
  }

  if (dom.taskTimeButton) {
    dom.taskTimeButton.onclick = () => openSheet("time-sheet");
  }

  if (dom.taskTimeClear) {
    dom.taskTimeClear.onclick = () => {
      dom.taskDateInput.value = "";
      dom.taskTimeInput.value = "";
      getTaskDurationInputElement().value = "";
      state.ui.taskDatePreset = "none";
      updateTaskTimeSummary();
      openSheet("task-sheet");
    };
  }

  if (dom.taskTimeApply) {
    dom.taskTimeApply.onclick = () => {
      updateTaskTimeSummary();
      openSheet("task-sheet");
    };
  }

  if (dom.draftForm && !dom.draftForm.querySelector(".draft-compose-row")) {
    const row = document.createElement("div");
    row.className = "draft-compose-row";
    const inputWrap = dom.draftForm.querySelector(".draft-input-wrap");
    const saveButton = dom.draftForm.querySelector(".draft-save");
    if (inputWrap && saveButton) {
      row.append(inputWrap, saveButton);
      dom.draftForm.append(row);
    }
  }

  if (dom.draftTab) dom.draftTab.textContent = "Draft";
  const draftTitle = document.querySelector("#draft-drawer h2");
  if (draftTitle) draftTitle.textContent = "Draft";
  const draftSave = dom.draftForm?.querySelector(".draft-save");
  if (draftSave) draftSave.textContent = "Add";

  const fixedTimeBack = document.getElementById("time-back-button");
  if (fixedTimeBack) {
    fixedTimeBack.textContent = "<";
    fixedTimeBack.onclick = () => openSheet("task-sheet");
  }

  if (dom.todoSortToggle) {
    dom.todoSortToggle.innerHTML = `<span aria-hidden="true">✎</span><span class="sr-only">Sort</span>`;
    dom.todoSortToggle.setAttribute("aria-label", state.ui.todoSortMode ? "Done sorting" : "Sort tasks");
    dom.todoSortToggle.classList.toggle("is-active", Boolean(state.ui.todoSortMode));
  }

  const timeBack = document.getElementById("time-back-button");
  if (timeBack) {
    timeBack.textContent = "‹";
    timeBack.onclick = () => openSheet("task-sheet");
  }
}

function moveDraftBefore(dragId, targetId) {
  if (!dragId || !targetId || dragId === targetId) return;
  const from = state.drafts.findIndex((entry) => entry.id === dragId);
  const to = state.drafts.findIndex((entry) => entry.id === targetId);
  if (from < 0 || to < 0) return;
  const [moved] = state.drafts.splice(from, 1);
  const insertAt = state.drafts.findIndex((entry) => entry.id === targetId);
  state.drafts.splice(insertAt, 0, moved);
}

function renderDraftDrawer() {
  if (!dom.draftDrawer || !dom.draftTab || !dom.draftList) return;

  dom.draftTab.style.top = `${state.ui.draftTabTop}%`;
  dom.draftTab.setAttribute("aria-expanded", String(state.ui.draftOpen));
  dom.draftDrawer.hidden = false;
  dom.draftDrawer.classList.toggle("is-open", state.ui.draftOpen);

  if (!state.drafts.length) {
    dom.draftList.innerHTML = `<p class="empty-note draft-empty">Nothing here yet.</p>`;
    return;
  }

  dom.draftList.innerHTML = state.drafts
    .map(
      (draft, index) => `
        <button
          class="draft-note"
          draggable="true"
          data-draft-note="${draft.id}"
          type="button"
          style="--draft-note:${formatDraftCardColor(index)};"
        >
          <span class="draft-note-text">${escapeHtml(draft.text)}</span>
          <span class="draft-note-foot">
            <span class="draft-note-tag">To-do</span>
            <span class="draft-note-close" data-draft-delete="${draft.id}" aria-label="Delete">×</span>
          </span>
        </button>
      `
    )
    .join("");

  dom.draftList.querySelectorAll("[data-draft-delete]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      state.drafts = state.drafts.filter((entry) => entry.id !== button.dataset.draftDelete);
      renderDraftDrawer();
      persistState();
    };
  });

  dom.draftList.querySelectorAll("[data-draft-note]").forEach((note) => {
    note.onclick = () => {
      const draft = state.drafts.find((entry) => entry.id === note.dataset.draftNote);
      if (!draft) return;
      prepareTaskDraft();
      dom.taskNameInput.value = draft.text;
      openSheet("task-sheet");
    };
    note.ondragstart = (event) => {
      draggedDraftCardId = note.dataset.draftNote;
      note.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
    };
    note.ondragover = (event) => {
      event.preventDefault();
      note.classList.add("is-drop-target");
    };
    note.ondragleave = () => note.classList.remove("is-drop-target");
    note.ondragend = () => {
      draggedDraftCardId = null;
      note.classList.remove("is-dragging");
      note.classList.remove("is-drop-target");
    };
    note.ondrop = (event) => {
      event.preventDefault();
      note.classList.remove("is-drop-target");
      moveDraftBefore(draggedDraftCardId, note.dataset.draftNote);
      renderDraftDrawer();
      persistState();
    };
  });
}

function bindDraftEvents() {
  if (!dom.draftTab || dom.draftTab.dataset.finalBound === "true") return;
  dom.draftTab.dataset.finalBound = "true";

  let draftDragging = false;
  let dragMoved = false;
  let startY = 0;
  let startTop = state.ui.draftTabTop;

  dom.draftTab.onclick = (event) => {
    event.preventDefault();
  };

  dom.draftTab.onpointerdown = (event) => {
    draftDragging = true;
    dragMoved = false;
    startY = event.clientY;
    startTop = state.ui.draftTabTop;
    dom.draftTab.setPointerCapture?.(event.pointerId);
  };

  dom.draftTab.onpointermove = (event) => {
    if (!draftDragging) return;
    const deltaPercent = ((event.clientY - startY) / window.innerHeight) * 100;
    if (Math.abs(deltaPercent) > 1) dragMoved = true;
    state.ui.draftTabTop = Math.max(12, Math.min(80, startTop + deltaPercent));
    dom.draftTab.style.top = `${state.ui.draftTabTop}%`;
  };

  dom.draftTab.onpointerup = (event) => {
    dom.draftTab.releasePointerCapture?.(event.pointerId);
    if (!dragMoved) toggleDraftDrawer();
    draftDragging = false;
    persistState();
  };

  dom.draftTab.onpointercancel = () => {
    draftDragging = false;
  };

  if (dom.draftClose) {
    dom.draftClose.onclick = () => closeDraftDrawer();
  }

  if (dom.draftForm && dom.draftForm.dataset.finalSubmitBound !== "true") {
    dom.draftForm.dataset.finalSubmitBound = "true";
    dom.draftForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const text = dom.draftInput.value.trim();
        if (!text) {
          dom.draftInput.focus();
          return;
        }
        state.drafts.unshift({
          id: makeId("draft"),
          text: text.slice(0, 32),
          createdAt: new Date().toISOString(),
        });
        dom.draftInput.value = "";
        renderDraftDrawer();
        persistState();
      },
      true
    );
  }
}

function renderHomeTimerOnly() {
  const timerState = getTimerPresentation();
  if (!timerState) {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell timer-strip-shell-idle">
        <p class="timer-strip-name">Nothing running</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">00:00</div>
          <div class="timer-strip-actions">
            ${buildTimerButton("new", "Start")}
          </div>
        </div>
      </div>
    `;
  } else {
    dom.timerStrip.innerHTML = `
      <div class="timer-strip-shell" style="--timer-wash:${alphaColor(timerState.color, 0.08)};">
        <p class="timer-strip-name">${escapeHtml(timerState.name)}</p>
        <div class="timer-strip-bottom">
          <div class="timer-strip-clock">${timerState.elapsed}</div>
          <div class="timer-strip-actions">
            ${buildTimerButton(state.activeTimer.running ? "pause" : "resume", state.activeTimer.running ? "Pause" : "Resume")}
            ${buildTimerButton("stop", "Stop")}
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("timer-pause")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-resume")?.addEventListener("click", toggleTimer);
  document.getElementById("timer-stop")?.addEventListener("click", stopTimer);
  document.getElementById("timer-new")?.addEventListener("click", () => {
    dom.quickNameInput.value = "";
    openSheet("quick-sheet");
  });
}

function renderNextTasks() {
  const nextTasks = getNextTasks();
  if (!nextTasks.length) {
    dom.nextScroll.innerHTML = `<p class="empty-note">Nothing queued right now.</p>`;
    return;
  }

  dom.nextScroll.innerHTML = nextTasks
    .map((task) => {
      const visual = getTaskVisual(task);
      const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
      return `
        <article class="next-card next-card-quiet" style="--next-wash:${alphaColor(visual.color, 0.08)};">
          <div class="next-inline">
            <div class="next-copy">
              <h3 class="next-name">${escapeHtml(task.name)}</h3>
              <p class="next-meta">${escapeHtml(visual.categoryName)}</p>
            </div>
            <button class="next-play ${isLive ? "is-live" : ""}" data-start-task="${task.id}" type="button" ${isLive ? "disabled" : ""} aria-label="Start task">
              <span class="play-glyph" aria-hidden="true"></span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.nextScroll.querySelectorAll("[data-start-task]").forEach((button) => {
    if (!button.disabled) button.onclick = () => startTimerForTask(button.dataset.startTask);
  });
}

function renderTaskGroup(groupKey, title, tasks, completed = false) {
  const open = state.ui.groupOpen[groupKey];
  return `
    <section class="todo-group" data-group-key="${groupKey}">
      <button class="group-toggle" data-toggle-group="${groupKey}" type="button" aria-expanded="${open ? "true" : "false"}">
        <h3>${title}</h3>
        <div class="group-dash"></div>
        <span class="group-arrow ${open ? "is-open" : ""}" aria-hidden="true"></span>
      </button>
      ${
        open
          ? tasks.length
            ? `<div class="task-list">${tasks.map((task) => renderTaskRow(task, completed)).join("")}</div>`
            : `<p class="empty-note">${title === "Flexible" ? "No flexible tasks." : "This section is empty right now."}</p>`
          : ""
      }
    </section>
  `;
}

function renderTaskNote(task) {
  if (state.ui.todoSortMode) {
    if (state.ui.editingTaskNoteId === task.id || task.note) {
      return `
        <input
          class="task-note-input"
          data-task-note-input="${task.id}"
          type="text"
          maxlength="15"
          value="${escapeHtml(task.note || "")}"
          placeholder=""
        />
      `;
    }
    return `<button class="task-note-slot" data-note-open="${task.id}" type="button" aria-label="Add note"></button>`;
  }

  return task.note ? `<span class="task-note-textline">${escapeHtml(task.note)}</span>` : "";
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  const sortMode = state.ui.todoSortMode && !isCompleted;
  const timeMarkup = sortMode
    ? `<input class="task-time-edit" data-task-time="${task.id}" type="time" value="${task.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : ""}" />`
    : `<div class="task-time-block">${task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes)}</div>`;

  return `
    <article
      class="task-row ${isCompleted ? "is-completed" : ""} ${isLive ? "is-running" : ""} ${sortMode ? "is-sortable" : ""}"
      data-task-row="${task.id}"
      ${sortMode ? 'draggable="true"' : ""}
    >
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      ${timeMarkup}
      <div class="task-main">
        <div class="task-title-row task-title-inline">
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
          <span class="mini-pill inline-tag" style="background:${alphaColor(visual.color, 0.14)};">${escapeHtml(visual.categoryName)}</span>
          ${task.important ? '<span class="task-star">★</span>' : ""}
        </div>
        <div class="task-subline">
          <span class="task-duration">${task.durationMin || state.defaultDuration} min</span>
          ${renderTaskNote(task)}
        </div>
      </div>
      <div class="task-side">
        ${!task.completed ? `<button class="flat-start ${isLive ? "is-live" : ""}" data-task-start="${task.id}" type="button" ${isLive ? "disabled" : ""}>Start</button>` : ""}
        <button class="task-edit-inline" data-task-edit="${task.id}" type="button">Edit</button>
      </div>
    </article>
  `;
}

function bindTaskRowLongPress() {
  let pressTimer = null;
  let activeTaskId = null;
  let startPoint = null;

  const clearPress = () => {
    if (pressTimer) {
      window.clearTimeout(pressTimer);
      pressTimer = null;
    }
    activeTaskId = null;
    startPoint = null;
  };

  dom.todoGroups.querySelectorAll("[data-task-row]").forEach((row) => {
    row.oncontextmenu = (event) => {
      event.preventDefault();
      if (state.ui.todoSortMode) return;
      prepareTaskDraft(row.dataset.taskRow);
    };

    row.onpointerdown = (event) => {
      if (state.ui.todoSortMode) return;
      if (event.target.closest(".task-check") || event.target.closest("[data-task-start]") || event.target.closest("[data-task-edit]") || event.target.closest("[data-note-open]") || event.target.closest("[data-task-note-input]") || event.target.closest("[data-task-time]")) {
        return;
      }
      activeTaskId = row.dataset.taskRow;
      startPoint = { x: event.clientX, y: event.clientY };
      pressTimer = window.setTimeout(() => {
        if (activeTaskId) prepareTaskDraft(activeTaskId);
        clearPress();
      }, 460);
    };

    row.onpointermove = (event) => {
      if (!startPoint) return;
      const deltaX = Math.abs(event.clientX - startPoint.x);
      const deltaY = Math.abs(event.clientY - startPoint.y);
      if (deltaX > 14 || deltaY > 14) clearPress();
    };

    row.onpointerup = clearPress;
    row.onpointercancel = clearPress;
  });
}

function renderTodoGroups() {
  const groups = getGroupedTasks();
  if (dom.todoSortToggle) {
    dom.todoSortToggle.textContent = state.ui.todoSortMode ? "Done" : "Sort";
    dom.todoSortToggle.onclick = () => {
      state.ui.todoSortMode = !state.ui.todoSortMode;
      state.ui.editingTaskNoteId = null;
      renderHome();
      persistState();
    };
  }

  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", "Overdue", groups.overdue),
    renderTaskGroup("today", "Today", groups.today),
    renderTaskGroup("flexible", "Flexible", groups.flexible),
    renderTaskGroup("completed", "Completed", groups.completed, true),
  ].join("");

  dom.todoGroups.querySelectorAll("[data-task-check]").forEach((input) => {
    input.onchange = () => toggleTaskComplete(input.dataset.taskCheck);
  });
  dom.todoGroups.querySelectorAll("[data-task-start]").forEach((button) => {
    if (!button.disabled) button.onclick = () => startTimerForTask(button.dataset.taskStart);
  });
  dom.todoGroups.querySelectorAll("[data-task-edit]").forEach((button) => {
    button.onclick = () => prepareTaskDraft(button.dataset.taskEdit);
  });
  dom.todoGroups.querySelectorAll("[data-toggle-group]").forEach((button) => {
    button.onclick = () => {
      const groupKey = button.dataset.toggleGroup;
      state.ui.groupOpen[groupKey] = !state.ui.groupOpen[groupKey];
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-task-time]").forEach((input) => {
    input.onchange = () => {
      const task = state.tasks.find((entry) => entry.id === input.dataset.taskTime);
      if (!task) return;
      task.scheduledMinutes = parseTimeString(input.value);
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-note-open]").forEach((button) => {
    button.onclick = () => {
      state.ui.editingTaskNoteId = button.dataset.noteOpen;
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-task-note-input]").forEach((input) => {
    input.onclick = (event) => event.stopPropagation();
    input.onkeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveTaskNote(input.dataset.taskNoteInput, input.value);
      }
      if (event.key === "Escape") {
        state.ui.editingTaskNoteId = null;
        renderHome();
      }
    };
    input.onblur = () => saveTaskNote(input.dataset.taskNoteInput, input.value);
  });

  if (state.ui.todoSortMode) {
    dom.todoGroups.querySelectorAll("[data-task-row]").forEach((row) => {
      row.ondragstart = (event) => {
        draggedTodoTaskId = row.dataset.taskRow;
        row.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
      };
      row.ondragover = (event) => {
        event.preventDefault();
        row.classList.add("is-drop-target");
      };
      row.ondragleave = () => row.classList.remove("is-drop-target");
      row.ondragend = () => {
        draggedTodoTaskId = null;
        row.classList.remove("is-dragging");
        row.classList.remove("is-drop-target");
      };
      row.ondrop = (event) => {
        event.preventDefault();
        row.classList.remove("is-drop-target");
        moveTaskBefore(draggedTodoTaskId, row.dataset.taskRow);
        renderHome();
        persistState();
      };
    });
  }

  bindTaskRowLongPress();
}

function renderTaskAdvancedControls() {
  if (!dom.taskAdvancedPanel) return;
  const isOpen = Boolean(state.ui.taskAdvancedOpen);
  dom.taskAdvancedPanel.hidden = !isOpen;
  dom.taskMoreToggle.textContent = `More settings ${isOpen ? "▴" : "▾"}`;

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const showWeekdays = repeatMode === "weekly";
  dom.taskWeekdaysField.hidden = !showWeekdays;

  const weekdayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  dom.taskWeekdaysGrid.innerHTML = weekdayOptions
    .map(
      (day) => `
        <button class="weekday-chip ${state.ui.taskWeekdays.includes(day) ? "is-active" : ""}" data-weekday-chip="${day}" type="button">
          ${day}
        </button>
      `
    )
    .join("");

  dom.taskWeekdaysGrid.querySelectorAll("[data-weekday-chip]").forEach((button) => {
    button.onclick = () => {
      const day = button.dataset.weekdayChip;
      if (state.ui.taskWeekdays.includes(day)) {
        state.ui.taskWeekdays = state.ui.taskWeekdays.filter((entry) => entry !== day);
      } else {
        state.ui.taskWeekdays = [...state.ui.taskWeekdays, day];
      }
      renderTaskAdvancedControls();
    };
  });

  const timerMode = state.ui.taskTimerMode || "up";
  dom.taskTimerMode.innerHTML = `
    <div class="timer-mode-stack">
      <button class="timer-radio ${timerMode === "up" ? "is-active" : ""}" data-timer-mode="up" type="button">Count up</button>
      <button class="timer-radio ${timerMode === "down" ? "is-active" : ""}" data-timer-mode="down" type="button">Count down</button>
    </div>
  `;
  dom.taskTimerMode.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskTimerMode = button.dataset.timerMode;
      renderTaskAdvancedControls();
    };
  });
}

function updateTaskTimeSummary() {
  if (!dom.taskTimeLabel || !dom.taskDateLabel) return;

  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));
  const quickOptions = [
    { id: "none", label: "No date" },
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
  ];

  dom.taskDateQuickGrid.innerHTML = quickOptions
    .map(
      (option) => `
        <button class="quick-option ${state.ui.taskDatePreset === option.id ? "is-active" : ""}" data-date-preset="${option.id}" type="button">
          ${option.label}
        </button>
      `
    )
    .join("");

  dom.taskDateQuickGrid.querySelectorAll("[data-date-preset]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskDatePreset = button.dataset.datePreset;
      if (state.ui.taskDatePreset === "none") dom.taskDateInput.value = "";
      if (state.ui.taskDatePreset === "today") dom.taskDateInput.value = today;
      if (state.ui.taskDatePreset === "tomorrow") dom.taskDateInput.value = tomorrow;
      updateTaskTimeSummary();
    };
  });

  dom.taskDateInput.onchange = () => {
    if (!dom.taskDateInput.value) state.ui.taskDatePreset = "none";
    else if (dom.taskDateInput.value === today) state.ui.taskDatePreset = "today";
    else if (dom.taskDateInput.value === tomorrow) state.ui.taskDatePreset = "tomorrow";
    else state.ui.taskDatePreset = "none";
    updateTaskTimeSummary();
  };
  dom.taskTimeInput.oninput = () => updateTaskTimeSummary();
  getTaskDurationInputElement().oninput = () => updateTaskTimeSummary();

  const timeValue = parseTimeString(dom.taskTimeInput.value);
  const dateValue = getTaskDraftDate();
  dom.taskTimeLabel.textContent = timeValue == null ? "Any time" : formatMinutes(timeValue);
  dom.taskDateLabel.textContent = formatTaskDateNote(dateValue);
}

function getTaskDraftDate() {
  if (state.ui.taskDatePreset === "today") return formatInputDate(new Date());
  if (state.ui.taskDatePreset === "tomorrow") return formatInputDate(shiftDate(new Date(), 1));
  return dom.taskDateInput.value || null;
}

function prepareTaskDraft(taskId = null) {
  const task = taskId ? state.tasks.find((item) => item.id === taskId) : null;
  const durationInput = getTaskDurationInputElement();
  const today = formatInputDate(new Date());
  const tomorrow = formatInputDate(shiftDate(new Date(), 1));

  state.ui.editingTaskId = taskId;
  state.ui.createTaskSelection = task
    ? { folderId: task.folderId, categoryId: task.categoryId, templateId: task.templateId }
    : null;

  dom.taskSheetTitle.textContent = task ? "Edit Task" : "Create Task";
  dom.taskNameInput.value = task?.name || "";
  if (durationInput) durationInput.value = task?.durationMin || "";
  dom.taskImportantInput.checked = Boolean(task?.important);
  dom.taskRepeatSelect.value = task?.repeatMode === "weekly" ? "weekly" : task?.repeatMode === "daily" ? "daily" : "none";
  state.ui.taskWeekdays = [...(task?.weekdays || [])];
  state.ui.taskTimerMode = task?.timerMode || "up";
  dom.taskDateInput.value = task?.scheduledDate || "";
  dom.taskTimeInput.value = task?.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : "";

  if (!task?.scheduledDate) state.ui.taskDatePreset = "none";
  else if (task.scheduledDate === today) state.ui.taskDatePreset = "today";
  else if (task.scheduledDate === tomorrow) state.ui.taskDatePreset = "tomorrow";
  else state.ui.taskDatePreset = "none";

  state.ui.taskAdvancedOpen = Boolean(task && ((task.repeatMode && task.repeatMode !== "none") || task.timerMode === "down" || (task.weekdays || []).length));

  updateTaskCategoryLabel();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  openSheet("task-sheet");
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const name = dom.taskNameInput.value.trim();
  const durationInput = getTaskDurationInputElement();
  if (!name) {
    dom.taskNameInput.focus();
    return;
  }

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const draft = {
    name,
    scheduledDate: getTaskDraftDate(),
    scheduledMinutes: parseTimeString(dom.taskTimeInput.value),
    durationMin: Number(durationInput?.value) || state.defaultDuration,
    important: dom.taskImportantInput.checked,
    repeatMode,
    weekdays: repeatMode === "weekly" ? [...state.ui.taskWeekdays] : [],
    timerMode: state.ui.taskTimerMode || "up",
    folderId: state.ui.createTaskSelection?.folderId || null,
    categoryId: state.ui.createTaskSelection?.categoryId || null,
    templateId: state.ui.createTaskSelection?.templateId || null,
  };

  if (state.ui.editingTaskId) {
    const task = state.tasks.find((item) => item.id === state.ui.editingTaskId);
    if (task) Object.assign(task, draft);
  } else {
    state.tasks.unshift({
      id: makeId("task"),
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      note: "",
      manualOrder: -1,
      ...draft,
    });
    reindexTaskOrder();
  }

  closeAllSheets();
  renderAll();
  persistState();
}

function renderAll() {
  applyTheme();
  applyBodyFlags();
  ensureUiCopy();
  renderNavigation();
  renderHome();
  renderStats();
  renderTasksTree();
  renderSettings();
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  updateLogDuration();
}

bindDraftEvents();
ensureUiCopy();
reindexTaskOrder();
renderAll();

function ensureUiCopy() {
  bindActionCardsFinal();

  document.querySelectorAll("#action-sheet .action-card span").forEach((node) => node.remove());

  const titleMap = [
    ["#action-sheet .sheet-header h2", "Add"],
    ["#quick-sheet .sheet-header h2", "Quick Start"],
    ["#log-sheet .sheet-header h2", "Log Time"],
    ["#time-sheet .sheet-header h2", "Choose when"],
  ];
  titleMap.forEach(([selector, text]) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  });

  [
    "#task-sheet .sheet-kicker",
    "#quick-sheet .sheet-kicker",
    "#log-sheet .sheet-kicker",
    "#time-sheet .sheet-kicker",
    "#draft-drawer .sheet-kicker",
    "#tree-editor-sheet .sheet-kicker",
  ].forEach((selector) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = "";
  });

  const taskHeader = document.querySelector("#task-sheet .sheet-header h2");
  if (taskHeader) taskHeader.textContent = state.ui.editingTaskId ? "Edit Task" : "Create Task";

  if (dom.taskNameInput) dom.taskNameInput.placeholder = "Task Name";
  if (dom.quickNameInput) dom.quickNameInput.placeholder = "Task Name";
  if (dom.logTaskInput) dom.logTaskInput.placeholder = "Task Name";
  if (dom.treeNameInput) dom.treeNameInput.placeholder = "Name";

  const quickSubmit = document.querySelector("#quick-sheet .primary-button");
  if (quickSubmit) quickSubmit.textContent = "Start";

  const taskNameLabel = document.querySelector("#task-sheet .task-name-line > span");
  const categoryLabel = dom.taskCategoryButton?.querySelector("span");
  const quickLabel = document.querySelector("#quick-sheet #quick-form > .line-field > span");
  const logLabel = document.querySelector("#log-sheet #log-form > .line-field:first-of-type > span");
  const treeNameLabel = document.querySelector("#tree-editor-form .line-field > span");
  [taskNameLabel, categoryLabel, quickLabel, logLabel, treeNameLabel].forEach((node) => {
    if (node) node.classList.add("sr-only");
  });

  if (dom.taskRepeatSelect) {
    const current = dom.taskRepeatSelect.value;
    dom.taskRepeatSelect.innerHTML = `
      <option value="none">None</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
    `;
    dom.taskRepeatSelect.value = ["none", "daily", "weekly"].includes(current) ? current : "none";
    dom.taskRepeatSelect.onchange = () => {
      if (dom.taskRepeatSelect.value !== "weekly") state.ui.taskWeekdays = [];
      renderTaskAdvancedControls();
    };
  }

  if (dom.taskMoreToggle) {
    dom.taskMoreToggle.onclick = () => {
      state.ui.taskAdvancedOpen = !state.ui.taskAdvancedOpen;
      renderTaskAdvancedControls();
    };
  }

  if (dom.taskTimeButton) dom.taskTimeButton.onclick = () => openSheet("time-sheet");

  if (dom.taskTimeClear) {
    dom.taskTimeClear.onclick = () => {
      dom.taskDateInput.value = "";
      dom.taskTimeInput.value = "";
      getTaskDurationInputElement().value = "";
      state.ui.taskDatePreset = "none";
      updateTaskTimeSummary();
      openSheet("task-sheet");
    };
  }

  if (dom.taskTimeApply) {
    dom.taskTimeApply.onclick = () => {
      updateTaskTimeSummary();
      openSheet("task-sheet");
    };
  }

  if (dom.draftForm && !dom.draftForm.querySelector(".draft-compose-row")) {
    const row = document.createElement("div");
    row.className = "draft-compose-row";
    const inputWrap = dom.draftForm.querySelector(".draft-input-wrap");
    const saveButton = dom.draftForm.querySelector(".draft-save");
    if (inputWrap && saveButton) {
      row.append(inputWrap, saveButton);
      dom.draftForm.append(row);
    }
  }

  if (dom.draftTab) dom.draftTab.textContent = "Draft";
  const draftTitle = document.querySelector("#draft-drawer h2");
  if (draftTitle) draftTitle.textContent = "Draft";
  const draftSave = dom.draftForm?.querySelector(".draft-save");
  if (draftSave) draftSave.textContent = "Add";

  const timeBack = document.getElementById("time-back-button");
  if (timeBack) {
    timeBack.textContent = "<";
    timeBack.onclick = () => openSheet("task-sheet");
  }

  if (dom.todoSortToggle) {
    dom.todoSortToggle.innerHTML = `<span aria-hidden="true">✎</span><span class="sr-only">Sort</span>`;
    dom.todoSortToggle.setAttribute("aria-label", state.ui.todoSortMode ? "Done sorting" : "Sort tasks");
    dom.todoSortToggle.classList.toggle("is-active", Boolean(state.ui.todoSortMode));
  }

  if (dom.tasksEditToggle) {
    dom.tasksEditToggle.innerHTML = `<span aria-hidden="true">✎</span><span class="sr-only">Edit</span>`;
    dom.tasksEditToggle.setAttribute("aria-label", state.ui.tasksEditMode ? "Done editing" : "Edit tasks");
    dom.tasksEditToggle.classList.toggle("is-active", Boolean(state.ui.tasksEditMode));
  }

  if (dom.addFolderButton) {
    dom.addFolderButton.textContent = "+";
    dom.addFolderButton.setAttribute("aria-label", "New folder");
  }
}

function renderDraftDrawer() {
  if (!dom.draftDrawer || !dom.draftTab || !dom.draftList) return;

  const isLeft = state.ui.draftTabSide === "left";
  dom.draftTab.style.top = `${state.ui.draftTabTop}%`;
  dom.draftTab.classList.toggle("is-left", isLeft);
  dom.draftDrawer.classList.toggle("is-left", isLeft);
  dom.draftTab.setAttribute("aria-expanded", String(state.ui.draftOpen));
  dom.draftDrawer.hidden = false;
  dom.draftDrawer.classList.toggle("is-open", state.ui.draftOpen);

  if (!state.drafts.length) {
    dom.draftList.innerHTML = `<p class="empty-note draft-empty">Nothing here yet.</p>`;
    return;
  }

  dom.draftList.innerHTML = state.drafts
    .map(
      (draft, index) => `
        <button
          class="draft-note"
          draggable="true"
          data-draft-note="${draft.id}"
          type="button"
          style="--draft-note:${formatDraftCardColor(index)};"
        >
          <span class="draft-note-text">${escapeHtml(draft.text)}</span>
          <span class="draft-note-close" data-draft-delete="${draft.id}" aria-label="Delete">×</span>
        </button>
      `
    )
    .join("");

  dom.draftList.querySelectorAll("[data-draft-delete]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      state.drafts = state.drafts.filter((entry) => entry.id !== button.dataset.draftDelete);
      renderDraftDrawer();
      persistState();
    };
  });

  dom.draftList.querySelectorAll("[data-draft-note]").forEach((note) => {
    note.onclick = () => {
      const draft = state.drafts.find((entry) => entry.id === note.dataset.draftNote);
      if (!draft) return;
      prepareTaskDraft();
      dom.taskNameInput.value = draft.text;
      openSheet("task-sheet");
    };
    note.ondragstart = (event) => {
      draggedDraftCardId = note.dataset.draftNote;
      note.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
    };
    note.ondragover = (event) => {
      event.preventDefault();
      note.classList.add("is-drop-target");
    };
    note.ondragleave = () => note.classList.remove("is-drop-target");
    note.ondragend = () => {
      draggedDraftCardId = null;
      note.classList.remove("is-dragging");
      note.classList.remove("is-drop-target");
    };
    note.ondrop = (event) => {
      event.preventDefault();
      note.classList.remove("is-drop-target");
      moveDraftBefore(draggedDraftCardId, note.dataset.draftNote);
      renderDraftDrawer();
      persistState();
    };
  });
}

function bindDraftEvents() {
  if (!dom.draftTab || dom.draftTab.dataset.finalBoundV2 === "true") return;
  dom.draftTab.dataset.finalBoundV2 = "true";

  let draftDragging = false;
  let dragMoved = false;
  let startX = 0;
  let startY = 0;
  let startTop = state.ui.draftTabTop;

  const applyLiveDraftPosition = (clientX) => {
    const nextSide = clientX <= window.innerWidth / 2 ? "left" : "right";
    if (state.ui.draftTabSide !== nextSide) {
      state.ui.draftTabSide = nextSide;
      dom.draftTab.classList.toggle("is-left", nextSide === "left");
      dom.draftDrawer.classList.toggle("is-left", nextSide === "left");
    }
  };

  dom.draftTab.onclick = (event) => {
    event.preventDefault();
  };

  dom.draftTab.onpointerdown = (event) => {
    draftDragging = true;
    dragMoved = false;
    startX = event.clientX;
    startY = event.clientY;
    startTop = state.ui.draftTabTop;
    dom.draftTab.setPointerCapture?.(event.pointerId);
  };

  dom.draftTab.onpointermove = (event) => {
    if (!draftDragging) return;
    const deltaPercent = ((event.clientY - startY) / window.innerHeight) * 100;
    const deltaX = Math.abs(event.clientX - startX);
    const deltaY = Math.abs(event.clientY - startY);
    if (deltaX > 4 || deltaY > 4) dragMoved = true;
    state.ui.draftTabTop = Math.max(10, Math.min(84, startTop + deltaPercent));
    dom.draftTab.style.top = `${state.ui.draftTabTop}%`;
    applyLiveDraftPosition(event.clientX);
  };

  dom.draftTab.onpointerup = (event) => {
    dom.draftTab.releasePointerCapture?.(event.pointerId);
    applyLiveDraftPosition(event.clientX);
    if (!dragMoved) toggleDraftDrawer();
    draftDragging = false;
    renderDraftDrawer();
    persistState();
  };

  dom.draftTab.onpointercancel = () => {
    draftDragging = false;
    renderDraftDrawer();
  };

  if (dom.draftClose) dom.draftClose.onclick = () => closeDraftDrawer();

  if (dom.draftForm && dom.draftForm.dataset.finalSubmitBoundV2 !== "true") {
    dom.draftForm.dataset.finalSubmitBoundV2 = "true";
    dom.draftForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const text = dom.draftInput.value.trim();
        if (!text) {
          dom.draftInput.focus();
          return;
        }
        state.drafts.unshift({
          id: makeId("draft"),
          text: text.slice(0, 32),
          createdAt: new Date().toISOString(),
        });
        dom.draftInput.value = "";
        renderDraftDrawer();
        persistState();
      },
      true
    );
  }
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  const sortMode = state.ui.todoSortMode && !isCompleted;
  const timeMarkup = sortMode
    ? `<input class="task-time-edit" data-task-time="${task.id}" type="time" value="${task.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : ""}" />`
    : `<div class="task-time-block">${task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes)}</div>`;

  return `
    <article
      class="task-row ${isCompleted ? "is-completed" : ""} ${isLive ? "is-running" : ""} ${sortMode ? "is-sortable" : ""}"
      data-task-row="${task.id}"
      ${sortMode ? 'draggable="true"' : ""}
    >
      <label class="task-check">
        <input type="checkbox" data-task-check="${task.id}" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>
      ${timeMarkup}
      <div class="task-main">
        <div class="task-title-row task-title-inline">
          <h4 class="task-name">${escapeHtml(task.name)}</h4>
          <span class="mini-pill inline-tag" style="background:${alphaColor(visual.color, 0.14)};">${escapeHtml(visual.categoryName)}</span>
          ${task.important ? '<span class="task-star">★</span>' : ""}
        </div>
        <div class="task-subline">
          <span class="task-duration">${task.durationMin || state.defaultDuration} min</span>
          ${renderTaskNote(task)}
        </div>
      </div>
      <div class="task-side">
        ${!task.completed ? `<button class="flat-start ${isLive ? "is-live" : ""}" data-task-start="${task.id}" type="button" ${isLive ? "disabled" : ""}>Start</button>` : ""}
      </div>
    </article>
  `;
}

function bindTaskRowLongPress() {
  let pressTimer = null;
  let activeTaskId = null;
  let startPoint = null;

  const clearPress = () => {
    if (pressTimer) {
      window.clearTimeout(pressTimer);
      pressTimer = null;
    }
    activeTaskId = null;
    startPoint = null;
  };

  dom.todoGroups.querySelectorAll("[data-task-row]").forEach((row) => {
    row.oncontextmenu = (event) => {
      event.preventDefault();
      if (state.ui.todoSortMode) return;
      prepareTaskDraft(row.dataset.taskRow);
    };

    row.onpointerdown = (event) => {
      if (state.ui.todoSortMode) return;
      if (
        event.target.closest(".task-check") ||
        event.target.closest("[data-task-start]") ||
        event.target.closest("[data-note-open]") ||
        event.target.closest("[data-task-note-input]") ||
        event.target.closest("[data-task-time]")
      ) {
        return;
      }
      activeTaskId = row.dataset.taskRow;
      startPoint = { x: event.clientX, y: event.clientY };
      pressTimer = window.setTimeout(() => {
        if (activeTaskId) prepareTaskDraft(activeTaskId);
        clearPress();
      }, 460);
    };

    row.onpointermove = (event) => {
      if (!startPoint) return;
      const deltaX = Math.abs(event.clientX - startPoint.x);
      const deltaY = Math.abs(event.clientY - startPoint.y);
      if (deltaX > 14 || deltaY > 14) clearPress();
    };

    row.onpointerup = clearPress;
    row.onpointercancel = clearPress;
  });
}

function renderTodoGroups() {
  const groups = getGroupedTasks();
  if (dom.todoSortToggle) {
    dom.todoSortToggle.innerHTML = `<span aria-hidden="true">✎</span><span class="sr-only">Sort</span>`;
    dom.todoSortToggle.setAttribute("aria-label", state.ui.todoSortMode ? "Done sorting" : "Sort tasks");
    dom.todoSortToggle.classList.toggle("is-active", Boolean(state.ui.todoSortMode));
    dom.todoSortToggle.onclick = () => {
      state.ui.todoSortMode = !state.ui.todoSortMode;
      state.ui.editingTaskNoteId = null;
      renderHome();
      persistState();
    };
  }

  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", "Overdue", groups.overdue),
    renderTaskGroup("today", "Today", groups.today),
    renderTaskGroup("flexible", "Flexible", groups.flexible),
    renderTaskGroup("completed", "Completed", groups.completed, true),
  ].join("");

  dom.todoGroups.querySelectorAll("[data-task-check]").forEach((input) => {
    input.onchange = () => toggleTaskComplete(input.dataset.taskCheck);
  });
  dom.todoGroups.querySelectorAll("[data-task-start]").forEach((button) => {
    if (!button.disabled) button.onclick = () => startTimerForTask(button.dataset.taskStart);
  });
  dom.todoGroups.querySelectorAll("[data-toggle-group]").forEach((button) => {
    button.onclick = () => {
      const groupKey = button.dataset.toggleGroup;
      state.ui.groupOpen[groupKey] = !state.ui.groupOpen[groupKey];
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-task-time]").forEach((input) => {
    input.onchange = () => {
      const task = state.tasks.find((entry) => entry.id === input.dataset.taskTime);
      if (!task) return;
      task.scheduledMinutes = parseTimeString(input.value);
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-note-open]").forEach((button) => {
    button.onclick = () => {
      state.ui.editingTaskNoteId = button.dataset.noteOpen;
      renderHome();
      persistState();
    };
  });

  dom.todoGroups.querySelectorAll("[data-task-note-input]").forEach((input) => {
    input.onclick = (event) => event.stopPropagation();
    input.onkeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveTaskNote(input.dataset.taskNoteInput, input.value);
      }
      if (event.key === "Escape") {
        state.ui.editingTaskNoteId = null;
        renderHome();
      }
    };
    input.onblur = () => saveTaskNote(input.dataset.taskNoteInput, input.value);
  });

  if (state.ui.todoSortMode) {
    dom.todoGroups.querySelectorAll("[data-task-row]").forEach((row) => {
      row.ondragstart = (event) => {
        draggedTodoTaskId = row.dataset.taskRow;
        row.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
      };
      row.ondragover = (event) => {
        event.preventDefault();
        row.classList.add("is-drop-target");
      };
      row.ondragleave = () => row.classList.remove("is-drop-target");
      row.ondragend = () => {
        draggedTodoTaskId = null;
        row.classList.remove("is-dragging");
        row.classList.remove("is-drop-target");
      };
      row.ondrop = (event) => {
        event.preventDefault();
        row.classList.remove("is-drop-target");
        moveTaskBefore(draggedTodoTaskId, row.dataset.taskRow);
        renderHome();
        persistState();
      };
    });
  }

  bindTaskRowLongPress();
}

function renderTaskAdvancedControls() {
  if (!dom.taskAdvancedPanel) return;
  const isOpen = Boolean(state.ui.taskAdvancedOpen);
  dom.taskAdvancedPanel.hidden = !isOpen;
  if (dom.taskMoreToggle) dom.taskMoreToggle.textContent = `More settings ${isOpen ? "▴" : "▾"}`;

  const repeatMode = dom.taskRepeatSelect.value || "none";
  const showWeekdays = repeatMode === "weekly";
  dom.taskWeekdaysField.hidden = !showWeekdays;
  dom.taskWeekdaysField.style.display = showWeekdays ? "" : "none";

  const weekdayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  dom.taskWeekdaysGrid.innerHTML = weekdayOptions
    .map(
      (day) => `
        <button class="weekday-chip ${state.ui.taskWeekdays.includes(day) ? "is-active" : ""}" data-weekday-chip="${day}" type="button">
          ${day}
        </button>
      `
    )
    .join("");

  dom.taskWeekdaysGrid.querySelectorAll("[data-weekday-chip]").forEach((button) => {
    button.onclick = () => {
      const day = button.dataset.weekdayChip;
      if (state.ui.taskWeekdays.includes(day)) {
        state.ui.taskWeekdays = state.ui.taskWeekdays.filter((entry) => entry !== day);
      } else {
        state.ui.taskWeekdays = [...state.ui.taskWeekdays, day];
      }
      renderTaskAdvancedControls();
    };
  });

  const timerMode = state.ui.taskTimerMode || "up";
  dom.taskTimerMode.innerHTML = `
    <div class="timer-mode-stack">
      <button class="timer-radio ${timerMode === "up" ? "is-active" : ""}" data-timer-mode="up" type="button">Count up</button>
      <button class="timer-radio ${timerMode === "down" ? "is-active" : ""}" data-timer-mode="down" type="button">Count down</button>
    </div>
  `;
  dom.taskTimerMode.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.onclick = () => {
      state.ui.taskTimerMode = button.dataset.timerMode;
      renderTaskAdvancedControls();
    };
  });
}
