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
  pages: [...document.querySelectorAll(".page")],
  navItems: [...document.querySelectorAll(".nav-item")],
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
  bindEvents();
  renderAll();
  startTicker();
}

function applyPageFromUrl() {
  const page = new URL(window.location.href).searchParams.get("page");
  if (["home", "stats", "tasks", "settings"].includes(page)) {
    state.currentPage = page;
  }
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
  dom.treeEditorTitle.textContent = `${config.mode === "edit" ? "Edit" : "New"} ${capitalize(config.type)}`;
  dom.treeNameInput.value = current?.name || "";
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
  dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  dom.reduceTextureToggle.checked = state.reduceTexture;
  dom.nextTimePriorityToggle.checked = state.nextRules.prioritizeTime;
  dom.nextImportantPriorityToggle.checked = state.nextRules.prioritizeImportant;

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (isStandalone) {
    dom.pwaInstallButton.textContent = "Installed";
    dom.pwaInstallButton.disabled = true;
    dom.pwaInstallNote.textContent = "This app is already running in installed mode.";
  } else if (deferredPromptEvent) {
    dom.pwaInstallButton.textContent = "Install app";
    dom.pwaInstallButton.disabled = false;
    dom.pwaInstallNote.textContent = "This device can install the app directly from here.";
  } else {
    dom.pwaInstallButton.textContent = "How to install";
    dom.pwaInstallButton.disabled = false;
    dom.pwaInstallNote.textContent = "If the prompt does not appear, use your browser menu and choose Add to Home Screen.";
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
