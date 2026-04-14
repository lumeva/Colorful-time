const STORAGE_KEY = "colorful-time-state-v1";
const STATE_SCHEMA_VERSION = 2;

const CATEGORY_COLORS = [
  "#A2D2FF",
  "#FFD6A5",
  "#FFADAD",
  "#CAFFBF",
  "#BDB2FF",
  "#FFC3A0",
  "#D4F1BE",
  "#FF8B8B",
  "#9D81BA",
  "#BDE0FE",
];

function renderPencilIconMarkup(screenReaderText = "") {
  return `<i class="ph-bold ph-pencil-line" aria-hidden="true"></i>${screenReaderText ? `<span class="sr-only">${screenReaderText}</span>` : ""}`;
}

const THEME_OPTIONS = [
  {
    id: "paper",
    name: "Simple Paper",
    note: "奶油纸、细线、贴纸感。",
  },
  {
    id: "custom",
    name: "Custom",
    note: "更轻快、更手绘，给后面的动漫感留入口。",
  },
];

const AI_CYCLES = [
  { id: "overall", label: "总体规划", note: "季度 / 年度 · 价值观 + 目标锚定" },
  { id: "weekly", label: "月 / 周规划", note: "4周 / 7天 · 项目推进 + 复盘" },
  { id: "daily", label: "今日 / 明日", note: "24小时 · MIT + 能量管理" },
];

const AI_CYCLES_V2 = [
  { id: "overall", label: "总体规划", note: "季度 / 年度 · 价值观 + 目标锚定" },
  { id: "weekly", label: "月 / 周规划", note: "4周 / 7天 · 项目推进 + 复盘" },
  { id: "daily", label: "今日 / 明日", note: "24小时 · MIT + 能量管理" },
];

const AI_WORKFLOW_STEPS = ["选择时间周期", "填写问卷", "生成 Prompt", "复制给 AI", "粘贴结果", "预览导入"];
const AI_MBTI_OPTIONS = ["不知道", "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];
const AI_CHRONOTYPE_OPTIONS = ["清晨", "上午", "下午", "傍晚", "夜间"];
const AI_WORKSTYLE_OPTIONS = [
  { id: "A", label: "长时间专注一件事直到完成" },
  { id: "B", label: "在多个任务间切换保持新鲜感" },
  { id: "C", label: "固定时间块 + 番茄钟节奏" },
];
const AI_PROCRASTINATION_OPTIONS = ["任务模糊", "怕做错", "太无聊", "太有压力", "不知从哪开始"];
const AI_VALUE_OPTIONS = ["事业成就", "身体健康", "亲密关系", "个人成长", "财务自由", "创意表达", "社会贡献"];

const UI_LANGUAGE_STORAGE_KEY = "colorful-time-ui-language";

const LANGUAGE_CONFIG = {
  zh: {
    "nav.home": "\u9996\u9875",
    "nav.stats": "\u7EDF\u8BA1",
    "nav.tasks": "\u4EFB\u52A1",
    "nav.settings": "\u8BBE\u7F6E",
    "group.overdue": "\u903E\u671F",
    "group.today": "\u4ECA\u5929",
    "group.flexible": "\u7075\u6D3B",
    "group.completed": "\u5DF2\u5B8C\u6210",
    "todo.sort.start": "\u6392\u5E8F\u4EFB\u52A1",
    "todo.sort.done": "\u5B8C\u6210\u6392\u5E8F",
    "stats.tab.today": "\u4ECA\u65E5",
    "stats.tab.week": "\u672C\u5468",
    "stats.tab.month": "\u672C\u6708",
    "stats.tab.custom": "\u81EA\u5B9A\u4E49",
    "stats.title.today": "\u4ECA\u65E5\u8272\u5F69",
    "stats.title.week": "\u672C\u5468\u8272\u5F69",
    "stats.title.month": "\u672C\u6708\u8272\u5F69",
    "stats.title.custom": "\u81EA\u5B9A\u4E49\u8272\u5F69",
    "stats.view": "\u89C6\u56FE",
    "stats.category": "\u5206\u7C7B",
    "settings.group.planning": "\u8BA1\u5212",
    "settings.group.appearance": "\u5916\u89C2",
    "settings.group.app": "\u5E94\u7528",
    "settings.theme": "\u4E3B\u9898",
    "settings.language": "\u8BED\u8A00",
    "settings.language.zh": "\u4E2D\u6587",
    "settings.language.en": "English",
    "settings.uploadBg": "\u4E0A\u4F20\u80CC\u666F\u56FE",
    "settings.aiPlanner": "\u0041\u0049 \u751F\u6210\u65E5\u7A0B",
    "settings.downloadApk": "\u4E0B\u8F7D APK",
    "settings.paperLines": "\u663E\u793A\u7EB8\u5F20\u7EB9\u7406",
    "settings.prioritizeTime": "\u4F18\u5148\u6700\u8FD1\u65F6\u95F4\u4EFB\u52A1",
    "settings.prioritizeImportant": "\u4F18\u5148\u91CD\u8981\u4EFB\u52A1",
    "settings.completedDefault": "Completed \u9ED8\u8BA4\u5C55\u5F00",
    "settings.defaultDuration": "\u9ED8\u8BA4\u4EFB\u52A1\u65F6\u957F",
    "settings.dayStart": "\u4E00\u5929\u5F00\u59CB\u65F6\u95F4",
    "ai.title": "AI\u751F\u6210\u65E5\u7A0B",
    "ai.horizon": "\u89C4\u5212\u5C42\u7EA7",
    "ai.horizon.pick": "\u9009\u62E9\u89C4\u5212\u5C42\u7EA7",
    "ai.horizon.overall": "\u5168\u5C40\u89C4\u5212\uff08\u5B63\u5EA6/\u5E74\u5EA6\uff09",
    "ai.horizon.weekly": "\u6708/\u5468\u89C4\u5212",
    "ai.horizon.daily": "\u4ECA\u65E5/\u660E\u65E5\u89C4\u5212",
    "ai.section.questionnaire": "\u95EE\u5377",
    "ai.section.generate": "\u751F\u6210 Prompt",
    "ai.section.paste": "\u7C98\u8D34 AI \u7ED3\u679C",
    "ai.section.preview": "\u9884\u89C8\u5BFC\u5165",
    "ai.panel.overall.title": "\u5168\u5C40\u89C4\u5212",
    "ai.panel.overall.note": "\u9002\u7528\u4E8E\u9700\u8981\u5B63\u5EA6/\u5E74\u5EA6\u65B9\u5411\u7684\u60C5\u5883\u3002",
    "ai.panel.weekly.title": "\u6708/\u5468\u89C4\u5212",
    "ai.panel.weekly.note": "\u9002\u7528\u4E8E\u77ED\u5468\u671F\u590D\u76D8\u4E0E\u6267\u884C\u8BA1\u5212\u3002",
    "ai.panel.daily.title": "\u4ECA\u65E5/\u660E\u65E5\u89C4\u5212",
    "ai.panel.daily.note": "\u9002\u7528\u4E8E\u4E00\u5929\u5185\u7684\u4F18\u5148\u7EA7\u4E0E\u65F6\u95F4\u5206\u914D\u3002",
    "ai.button.generate": "\u751F\u6210 Prompt",
    "ai.button.copy": "\u590D\u5236 Prompt",
    "ai.button.preview": "\u9884\u89C8",
    "ai.button.import": "\u5BFC\u5165",
    "ai.placeholder.prompt": "Prompt \u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",
    "ai.placeholder.result": "\u5728\u8FD9\u91CC\u7C98\u8D34 AI \u8FD4\u56DE\u7684\u7ED3\u679C\u3002",
    "pwa.installed": "\u5DF2\u5B89\u88C5",
    "pwa.install": "\u6DFB\u52A0\u5230\u4E3B\u5C4F\u5E55",
    "pwa.note.installed": "\u5DF2\u5B89\u88C5\u5728\u5F53\u524D\u8BBE\u5907\u3002",
    "pwa.note.direct": "\u53EF\u76F4\u63A5\u4ECE\u8FD9\u91CC\u5B89\u88C5\u3002",
    "pwa.note.manual":
      "\u82E5\u672A\u5F39\u51FA\u5B89\u88C5\u63D0\u793A\uFF0C\u8BF7\u5728\u6D4F\u89C8\u5668\u83DC\u5355\u4E2D\u9009\u62E9\u201C\u6DFB\u52A0\u5230\u4E3B\u5C4F\u5E55\u201D\u3002",
    "pwa.manualAlert":
      "\u5F53\u524D\u672A\u89E6\u53D1\u5B89\u88C5\u63D0\u793A\u3002\u8BF7\u6253\u5F00\u6D4F\u89C8\u5668\u83DC\u5355\uFF0C\u9009\u62E9\u201C\u6DFB\u52A0\u5230\u4E3B\u5C4F\u5E55\u201D\u3002",
  },
  en: {
    "nav.home": "Home",
    "nav.stats": "Stats",
    "nav.tasks": "Tasks",
    "nav.settings": "Settings",
    "group.overdue": "Overdue",
    "group.today": "Today",
    "group.flexible": "Flexible",
    "group.completed": "Completed",
    "todo.sort.start": "Sort tasks",
    "todo.sort.done": "Done sorting",
    "stats.tab.today": "Today",
    "stats.tab.week": "Week",
    "stats.tab.month": "Month",
    "stats.tab.custom": "Custom",
    "stats.title.today": "Today's Color",
    "stats.title.week": "Weekly Color",
    "stats.title.month": "Monthly Color",
    "stats.title.custom": "Custom Color",
    "stats.view": "View",
    "stats.category": "Category",
    "settings.group.planning": "Planning",
    "settings.group.appearance": "Appearance",
    "settings.group.app": "App",
    "settings.theme": "Theme",
    "settings.language": "Language",
    "settings.language.zh": "\u4E2D\u6587",
    "settings.language.en": "English",
    "settings.uploadBg": "Upload Background",
    "settings.aiPlanner": "AI Planner",
    "settings.downloadApk": "Download APK",
    "settings.paperLines": "Show paper lines",
    "settings.prioritizeTime": "Prioritize nearest-time tasks",
    "settings.prioritizeImportant": "Prioritize important tasks",
    "settings.completedDefault": "Expand Completed by default",
    "settings.defaultDuration": "Default task duration",
    "settings.dayStart": "Day starts at",
    "ai.title": "AI Planner",
    "ai.horizon": "Planning horizon",
    "ai.horizon.pick": "Choose a planning level",
    "ai.horizon.overall": "Overall planning (Quarter / Year)",
    "ai.horizon.weekly": "Month / Week planning",
    "ai.horizon.daily": "Today / Tomorrow planning",
    "ai.section.questionnaire": "Questionnaire",
    "ai.section.generate": "Generate Prompt",
    "ai.section.paste": "Paste AI Result",
    "ai.section.preview": "Preview Import",
    "ai.panel.overall.title": "Overall planning",
    "ai.panel.overall.note": "Use this when you want quarter or year level direction.",
    "ai.panel.weekly.title": "Month / Week planning",
    "ai.panel.weekly.note": "Use this when you want a short-cycle review and execution plan.",
    "ai.panel.daily.title": "Today / Tomorrow planning",
    "ai.panel.daily.note": "Use this for day-level prioritization and time windows.",
    "ai.button.generate": "Generate Prompt",
    "ai.button.copy": "Copy Prompt",
    "ai.button.preview": "Preview",
    "ai.button.import": "Import",
    "ai.placeholder.prompt": "Prompt output will appear here.",
    "ai.placeholder.result": "Paste the AI result here.",
    "pwa.installed": "Installed",
    "pwa.install": "Add to Home",
    "pwa.note.installed": "Already installed on this device.",
    "pwa.note.direct": "Install directly from here.",
    "pwa.note.manual": "If no prompt appears, open the browser menu and choose Add to Home Screen.",
    "pwa.manualAlert": "No install prompt is available right now. Open the browser menu and choose Add to Home Screen.",
  },
};

const UI_TEXT = LANGUAGE_CONFIG;

function getUiLanguage() {
  let saved = null;
  try {
    saved = window.localStorage.getItem(UI_LANGUAGE_STORAGE_KEY);
  } catch {
    // ignore storage read failures
  }
  const current = saved || state?.ui?.language;
  if (current === "zh" || current === "en") return current;
  return String(navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function setUiLanguage(language) {
  state.ui = state.ui || {};
  state.ui.language = language === "en" ? "en" : "zh";
  try {
    window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, state.ui.language);
  } catch {
    // ignore storage write failures
  }
  document.documentElement.lang = state.ui.language === "zh" ? "zh-CN" : "en";
}

function uiText(key, fallback = "") {
  const lang = getUiLanguage();
  return UI_TEXT[lang]?.[key] || UI_TEXT.zh?.[key] || fallback || key;
}

function syncDocumentLanguage() {
  document.documentElement.lang = getUiLanguage() === "zh" ? "zh-CN" : "en";
}

function createDefaultAiState() {
  const today = new Date();
  return {
    cycle: "overall",
    promptText: "",
    resultText: "",
    overall: {
      period: "quarter",
      mbti: "不知道",
      chronotype: "",
      workStyle: "",
      procrastination: [],
      value1: "",
      value2: "",
      value3: "",
      lifeStage: "",
      challenge: "",
      domain1Name: "事业成就",
      domain1Goal: "",
      domain2Name: "身体健康",
      domain2Goal: "",
      domain3Name: "",
      domain3Goal: "",
    },
      weekly: {
        period: "week",
        start: formatInputDate(today),
        end: formatInputDate(shiftDate(today, 6)),
        review: "",
        win: "",
        missed: "",
        reason: "",
        core1: "",
        core2: "",
        core3: "",
        energy: "3",
        energyContext: "",
        special: "",
        commitments: "",
        obstacle: "",
        response: "",
      },
    daily: {
      horizon: "today",
      date: formatInputDate(today),
      body: "3",
      mood: "3",
      focus: "3",
      mit1: "",
      mit1Duration: "25",
      mit2: "",
      mit2Duration: "25",
        mit3: "",
        mit3Duration: "25",
        otherTasks: "",
        windows: "",
        windowTags: [],
        quickTask: "",
        distraction: "",
        strategy: "",
      },
  };
}

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
let taskTimeSheetMode = "draft";
let taskTimeSheetTaskId = null;

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
      <input type="checkbox" id="reduce-texture-toggle" />
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

function getAiPathValue(path) {
  return path.split(".").reduce((acc, key) => acc?.[key], state.ai);
}

function setAiPathValue(path, value) {
  const parts = path.split(".");
  let target = state.ai;
  while (parts.length > 1) {
    const key = parts.shift();
    target[key] = target[key] || {};
    target = target[key];
  }
  target[parts[0]] = value;
}

function getChronotypePeak(label) {
  const map = { 清晨: "06:00-10:00", 上午: "09:00-12:00", 下午: "13:00-16:00", 傍晚: "17:00-19:00", 夜间: "20:00-23:00" };
  return map[label] || "未填写";
}

function getAiProfileSnapshot() {
  const overall = state.ai.overall || {};
  const values = [overall.value1, overall.value2, overall.value3].filter(Boolean);
  return {
    mbti: overall.mbti || "不知道",
    chronotype: overall.chronotype || "未填写",
    workStyle: overall.workStyle || "未填写",
    procrastination: Array.isArray(overall.procrastination) && overall.procrastination.length ? overall.procrastination.join(" / ") : "未填写",
    values: values.length ? values : ["未填写"],
  };
}

function renderAiPlanner() {
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  if (!dom.aiCycleGrid || !dom.aiQuestionnaire) return;

  const cycle = state.ai.cycle || "overall";
  dom.aiCycleGrid.innerHTML = AI_CYCLES_V2
    .map((item) => `<button class="ai-cycle-card ${cycle === item.id ? "is-active" : ""}" data-ai-cycle="${item.id}" type="button"><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.note)}</span></button>`)
    .join("");
  dom.aiWorkflowStrip.innerHTML = AI_WORKFLOW_STEPS.map((step) => `<span class="ai-step-chip">${escapeHtml(step)}</span>`).join("");
  dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);

  dom.aiCycleGrid.querySelectorAll("[data-ai-cycle]").forEach((button) => {
    button.onclick = () => {
      state.ai.cycle = button.dataset.aiCycle;
      state.ui.aiPreviewItems = [];
      renderAiPlanner();
      persistState();
    };
  });

  bindAiQuestionnaireFields();

  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
  if (dom.aiResultInput) {
    dom.aiResultInput.value = state.ai.resultText || "";
    dom.aiResultInput.oninput = (event) => {
      state.ai.resultText = event.target.value;
      persistState();
    };
  }
  if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
  if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
  if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
  if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
  if (dom.aiPageBack) {
    dom.aiPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };
  }

  renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
}

function buildAiQuestionnaire(cycle) {
  if (getUiLanguage() === "en") {
    if (cycle === "overall") {
      return `
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-period">Time period</label>
        <select class="ai-input" id="ai-overall-period" data-ai-field="overall.period">
          <option value="quarter">Quarter</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-mbti">Q1 · Personality type</label>
        <select class="ai-input" id="ai-overall-mbti" data-ai-field="overall.mbti">
          ${AI_MBTI_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
      </div>
      <div class="ai-field"><label class="ai-field-label" for="ai-overall-stage">Current life/work stage</label><textarea class="ai-input ai-textarea" id="ai-overall-stage" rows="3" data-ai-field="overall.lifeStage" placeholder="For example: student / job search / early startup"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-overall-challenge">Main challenge</label><textarea class="ai-input ai-textarea" id="ai-overall-challenge" rows="3" data-ai-field="overall.challenge" placeholder="For example: too many tasks, unstable rhythm, energy fluctuations"></textarea></div>
      <div class="ai-field"><div class="ai-field-label">Target domains</div><div class="ai-domain-stack"><div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain1Name" placeholder="Domain 1" /><input class="ai-input" data-ai-field="overall.domain1Goal" placeholder="Goal direction" /></div><div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain2Name" placeholder="Domain 2" /><input class="ai-input" data-ai-field="overall.domain2Goal" placeholder="Goal direction" /></div><div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain3Name" placeholder="Domain 3 (optional)" /><input class="ai-input" data-ai-field="overall.domain3Goal" placeholder="Goal direction (optional)" /></div></div></div>
    `;
    }

    if (cycle === "weekly") {
      return `
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-period">Planning period</label><select class="ai-input" id="ai-weekly-period" data-ai-field="weekly.period"><option value="week">Week</option><option value="month">Month</option></select></div>
      <div class="ai-field"><div class="ai-field-label">Date range</div><div class="ai-two-grid"><input class="ai-input" type="date" data-ai-field="weekly.start" /><input class="ai-input" type="date" data-ai-field="weekly.end" /></div></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-win">Q1 · What went better than expected</label><textarea class="ai-input ai-textarea" id="ai-weekly-win" rows="3" data-ai-field="weekly.win"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-missed">Q1 · What you planned but missed</label><textarea class="ai-input ai-textarea" id="ai-weekly-missed" rows="3" data-ai-field="weekly.missed"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-reason">Reason analysis</label><textarea class="ai-input ai-textarea" id="ai-weekly-reason" rows="3" data-ai-field="weekly.reason"></textarea></div>
      <div class="ai-field"><div class="ai-field-label">Q2 · Core tasks (3)</div><div class="ai-three-stack"><input class="ai-input" data-ai-field="weekly.core1" placeholder="Core task 1" /><input class="ai-input" data-ai-field="weekly.core2" placeholder="Core task 2" /><input class="ai-input" data-ai-field="weekly.core3" placeholder="Core task 3" /></div></div>
      <div class="ai-field"><div class="ai-field-label">Q3 · Energy forecast</div><div class="ai-range-row"><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="weekly.energy" /><span class="ai-range-value" data-ai-display="weekly.energy"></span></div><textarea class="ai-input ai-textarea" rows="3" data-ai-field="weekly.special" placeholder="Travel / major meetings / family events, etc."></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-commitments">Q4 · Fixed commitments</label><textarea class="ai-input ai-textarea" id="ai-weekly-commitments" rows="3" data-ai-field="weekly.commitments" placeholder="Meetings, appointments, deadlines..."></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-obstacle">Q5 · Potential obstacles</label><textarea class="ai-input ai-textarea" id="ai-weekly-obstacle" rows="3" data-ai-field="weekly.obstacle"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-response">Planned response</label><textarea class="ai-input ai-textarea" id="ai-weekly-response" rows="3" data-ai-field="weekly.response"></textarea></div>
    `;
    }

    return `
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-horizon">Planning target</label><select class="ai-input" id="ai-daily-horizon" data-ai-field="daily.horizon"><option value="today">Today</option><option value="tomorrow">Tomorrow</option></select></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-date">Date</label><input class="ai-input" id="ai-daily-date" type="date" data-ai-field="daily.date" /></div>
    <div class="ai-field"><div class="ai-field-label">Q1 · Current energy state</div><div class="ai-meter-stack"><label class="ai-range-block"><span>Body</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.body" /><span class="ai-range-value" data-ai-display="daily.body"></span></label><label class="ai-range-block"><span>Mood</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.mood" /><span class="ai-range-value" data-ai-display="daily.mood"></span></label><label class="ai-range-block"><span>Focus</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.focus" /><span class="ai-range-value" data-ai-display="daily.focus"></span></label></div></div>
    <div class="ai-field"><div class="ai-field-label">Q2 · Three MITs</div><div class="ai-mit-stack">${[1, 2, 3].map((index) => `<div class="ai-mit-row"><input class="ai-input" data-ai-field="daily.mit${index}" placeholder="MIT ${index}" /><input class="ai-input ai-duration-input" type="number" min="5" step="5" data-ai-field="daily.mit${index}Duration" placeholder="Minutes" /></div>`).join("")}</div><textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.otherTasks" placeholder="Pending but non-urgent"></textarea></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-windows">Q3 · Time windows</label><textarea class="ai-input ai-textarea" id="ai-daily-windows" rows="3" data-ai-field="daily.windows" placeholder="For example: 09:00-11:00 (2h) · 15:00-16:30 (1.5h)"></textarea></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-quick">Q4 · Quick-start task</label><input class="ai-input" id="ai-daily-quick" data-ai-field="daily.quickTask" placeholder="A task you can finish within 5 minutes (optional)" /></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-distraction">Q5 · Distraction forecast</label><textarea class="ai-input ai-textarea" id="ai-daily-distraction" rows="3" data-ai-field="daily.distraction" placeholder="What is most likely to interrupt you today?"></textarea><textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.strategy" placeholder="How will you respond?"></textarea></div>
  `;
  }

  if (cycle === "overall") {
    return `
      <div class="ai-field"><label class="ai-field-label" for="ai-overall-period">时间周期</label><select class="ai-input" id="ai-overall-period" data-ai-field="overall.period"><option value="quarter">季度</option><option value="year">年度</option></select></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-overall-mbti">Q1 · 人格类型</label><select class="ai-input" id="ai-overall-mbti" data-ai-field="overall.mbti">${AI_MBTI_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select></div>
      <div class="ai-field"><div class="ai-field-label">Q2 · 时型偏好</div><div class="ai-choice-grid">${AI_CHRONOTYPE_OPTIONS.map((option) => `<label class="ai-choice-chip"><input type="radio" name="ai-overall-chronotype" data-ai-field="overall.chronotype" value="${option}" /><span>${option}</span></label>`).join("")}</div></div>
      <div class="ai-field"><div class="ai-field-label">Q3 · 工作风格</div><div class="ai-choice-stack">${AI_WORKSTYLE_OPTIONS.map((option) => `<label class="ai-choice-line"><input type="radio" name="ai-overall-workstyle" data-ai-field="overall.workStyle" value="${option.label}" /><span>${option.id}. ${option.label}</span></label>`).join("")}</div></div>
      <div class="ai-field"><div class="ai-field-label">Q4 · 拖延触发器</div><div class="ai-choice-stack">${AI_PROCRASTINATION_OPTIONS.map((option) => `<label class="ai-choice-line"><input type="checkbox" data-ai-list="overall.procrastination" value="${option}" /><span>${option}</span></label>`).join("")}</div></div>
      <div class="ai-field"><div class="ai-field-label">Q5 · 核心价值观排序</div><div class="ai-three-grid"><select class="ai-input" data-ai-field="overall.value1"><option value="">优先级 1</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select><select class="ai-input" data-ai-field="overall.value2"><option value="">优先级 2</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select><select class="ai-input" data-ai-field="overall.value3"><option value="">优先级 3</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select></div></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-overall-stage">当前阶段背景</label><textarea class="ai-input ai-textarea" id="ai-overall-stage" rows="3" data-ai-field="overall.lifeStage" placeholder="例如：学生 / 准备求职 / 创业初期"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-overall-challenge">主要挑战</label><textarea class="ai-input ai-textarea" id="ai-overall-challenge" rows="3" data-ai-field="overall.challenge" placeholder="例如：任务太多、节奏不稳、身体状态起伏"></textarea></div>
      <div class="ai-field"><div class="ai-field-label">目标领域</div><div class="ai-domain-stack"><div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain1Name" placeholder="领域 1" /><input class="ai-input" data-ai-field="overall.domain1Goal" placeholder="目标方向" /></div><div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain2Name" placeholder="领域 2" /><input class="ai-input" data-ai-field="overall.domain2Goal" placeholder="目标方向" /></div><div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain3Name" placeholder="领域 3（可选）" /><input class="ai-input" data-ai-field="overall.domain3Goal" placeholder="目标方向（可选）" /></div></div></div>
    `;
  }

  if (cycle === "weekly") {
    return `
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-period">规划周期</label><select class="ai-input" id="ai-weekly-period" data-ai-field="weekly.period"><option value="week">周</option><option value="month">月</option></select></div>
      <div class="ai-field"><div class="ai-field-label">时间范围</div><div class="ai-two-grid"><input class="ai-input" type="date" data-ai-field="weekly.start" /><input class="ai-input" type="date" data-ai-field="weekly.end" /></div></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-win">Q1 · 上期复盘：做得超预期</label><textarea class="ai-input ai-textarea" id="ai-weekly-win" rows="3" data-ai-field="weekly.win"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-missed">Q1 · 上期复盘：没做到但本来想做的</label><textarea class="ai-input ai-textarea" id="ai-weekly-missed" rows="3" data-ai-field="weekly.missed"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-reason">原因分析（我认为）</label><textarea class="ai-input ai-textarea" id="ai-weekly-reason" rows="3" data-ai-field="weekly.reason"></textarea></div>
      <div class="ai-field"><div class="ai-field-label">Q2 · 核心任务（3 件）</div><div class="ai-three-stack"><input class="ai-input" data-ai-field="weekly.core1" placeholder="核心任务 1" /><input class="ai-input" data-ai-field="weekly.core2" placeholder="核心任务 2" /><input class="ai-input" data-ai-field="weekly.core3" placeholder="核心任务 3" /></div></div>
      <div class="ai-field"><div class="ai-field-label">Q3 · 精力预判</div><div class="ai-range-row"><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="weekly.energy" /><span class="ai-range-value" data-ai-display="weekly.energy"></span></div><textarea class="ai-input ai-textarea" rows="3" data-ai-field="weekly.special" placeholder="旅行 / 重要会议 / 家庭事件等特殊情况"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-commitments">Q4 · 固定承诺</label><textarea class="ai-input ai-textarea" id="ai-weekly-commitments" rows="3" data-ai-field="weekly.commitments" placeholder="会议、约定、deadline 等"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-obstacle">Q5 · 潜在障碍</label><textarea class="ai-input ai-textarea" id="ai-weekly-obstacle" rows="3" data-ai-field="weekly.obstacle"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-response">提前应对</label><textarea class="ai-input ai-textarea" id="ai-weekly-response" rows="3" data-ai-field="weekly.response"></textarea></div>
    `;
  }

  return `
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-horizon">规划对象</label><select class="ai-input" id="ai-daily-horizon" data-ai-field="daily.horizon"><option value="today">今日</option><option value="tomorrow">明日</option></select></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-date">日期</label><input class="ai-input" id="ai-daily-date" type="date" data-ai-field="daily.date" /></div>
    <div class="ai-field"><div class="ai-field-label">Q1 · 当前能量状态</div><div class="ai-meter-stack"><label class="ai-range-block"><span>身体</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.body" /><span class="ai-range-value" data-ai-display="daily.body"></span></label><label class="ai-range-block"><span>情绪</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.mood" /><span class="ai-range-value" data-ai-display="daily.mood"></span></label><label class="ai-range-block"><span>专注力</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.focus" /><span class="ai-range-value" data-ai-display="daily.focus"></span></label></div></div>
    <div class="ai-field"><div class="ai-field-label">Q2 · 三个 MIT</div><div class="ai-mit-stack">${[1, 2, 3].map((index) => `<div class="ai-mit-row"><input class="ai-input" data-ai-field="daily.mit${index}" placeholder="MIT ${index}" /><input class="ai-input ai-duration-input" type="number" min="5" step="5" data-ai-field="daily.mit${index}Duration" placeholder="分钟" /></div>`).join("")}</div><textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.otherTasks" placeholder="待处理但非紧急"></textarea></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-windows">Q3 · 时间窗口</label><textarea class="ai-input ai-textarea" id="ai-daily-windows" rows="3" data-ai-field="daily.windows" placeholder="例如：09:00-11:00（2h） · 15:00-16:30（1.5h）"></textarea></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-quick">Q4 · 快速启动任务</label><input class="ai-input" id="ai-daily-quick" data-ai-field="daily.quickTask" placeholder="5 分钟内可完成的小事（可选）" /></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-distraction">Q5 · 干扰预测</label><textarea class="ai-input ai-textarea" id="ai-daily-distraction" rows="3" data-ai-field="daily.distraction" placeholder="今天最可能打断你的是什么？"></textarea><textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.strategy" placeholder="你打算如何处理？"></textarea></div>
  `;
}

function bindAiQuestionnaireFields() {
  if (!dom.aiQuestionnaire) return;
  dom.aiQuestionnaire.querySelectorAll("[data-ai-field]").forEach((input) => {
    const path = input.dataset.aiField;
    const value = getAiPathValue(path);
    if (input.type === "radio") {
      input.checked = value === input.value;
      input.onchange = () => {
        if (!input.checked) return;
        setAiPathValue(path, input.value);
        persistState();
      };
      return;
    }
    input.value = value ?? "";
    input.oninput = () => {
      setAiPathValue(path, input.value);
      syncAiRangeDisplays();
      persistState();
    };
    input.onchange = input.oninput;
  });

  dom.aiQuestionnaire.querySelectorAll("[data-ai-list]").forEach((input) => {
    const path = input.dataset.aiList;
    const list = getAiPathValue(path) || [];
    input.checked = list.includes(input.value);
    input.onchange = () => {
      const current = new Set(getAiPathValue(path) || []);
      if (input.checked) current.add(input.value);
      else current.delete(input.value);
      setAiPathValue(path, [...current]);
      persistState();
    };
  });
  syncAiRangeDisplays();
}

function syncAiRangeDisplays() {
  document.querySelectorAll("[data-ai-display]").forEach((node) => {
    const value = getAiPathValue(node.dataset.aiDisplay);
    node.textContent = value ? `${value}/5` : "";
  });
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  dom.apkDownloadButton = document.getElementById("apk-download-button");

  dom.themeGrid.innerHTML = [
    { id: "paper", name: "Simple Paper" },
    { id: "custom", name: "Custom" },
  ]
    .map((theme) => `<button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button"><span class="settings-theme-radio" aria-hidden="true"></span><span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span></button>`)
    .join("");

  if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
  if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
  if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";

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
    button.onclick = () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    };
  });

  if (dom.aiPlannerLink) dom.aiPlannerLink.onclick = () => { state.currentPage = "ai-planner"; renderAll(); persistState(); };
  if (dom.defaultDurationRow) {
    dom.defaultDurationRow.onclick = () => {
      const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
      if (raw == null) return;
      const minutes = Number(raw);
      if (!Number.isFinite(minutes) || minutes <= 0) return;
      state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
      renderSettings();
      persistState();
    };
  }
  if (dom.dayStartRow) {
    dom.dayStartRow.onclick = () => {
      const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
      if (raw == null) return;
      const value = raw.trim();
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) return;
      state.dayStart = value;
      renderSettings();
      persistState();
    };
  }
  if (dom.completedDefaultToggle) {
    dom.completedDefaultToggle.onchange = (event) => {
      const checked = Boolean(event.target.checked);
      state.showCompletedOpen = checked;
      state.ui.groupOpen.completed = checked;
      renderHome();
      renderSettings();
      persistState();
    };
  }
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.onchange = (event) => { state.nextRules.prioritizeTime = Boolean(event.target.checked); renderHome(); persistState(); };
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.onchange = (event) => { state.nextRules.prioritizeImportant = Boolean(event.target.checked); renderHome(); persistState(); };
  if (dom.customBackgroundRow) dom.customBackgroundRow.onclick = () => dom.customBackgroundInput?.click();
  if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
}

function buildAiPromptText() {
  const cycle = state.ai.cycle || "overall";
  const profile = getAiProfileSnapshot();
  if (cycle === "overall") {
    const form = state.ai.overall;
    const domains = [[form.domain1Name, form.domain1Goal], [form.domain2Name, form.domain2Goal], [form.domain3Name, form.domain3Goal]]
      .filter(([name, goal]) => name || goal)
      .map(([name, goal]) => `   ${name || "领域"}：${goal || "未填写"}`)
      .join("\n");
    return ["总体规划 Prompt", `${form.period === "year" ? "年度" : "季度"}`, "", "[用户画像]", `我是一个 ${form.mbti || "不知道"} 类型的人，时型偏向 ${form.chronotype || "未填写"}，核心价值观优先级为：${[form.value1, form.value2, form.value3].filter(Boolean).join(" > ") || "未填写"}。`, "", "[当前阶段背景]", `我目前处于 ${form.lifeStage || "未填写"}，主要挑战是 ${form.challenge || "未填写"}。`, "", "[目标设定请求]", `请帮我制定一个 ${form.period === "year" ? "年度" : "季度"} 的目标规划，要求：`, "1. 为以下生活域各设定 1 个 Objective 和 2-3 个 Key Results：", domains || "   事业成就：未填写", "2. 识别目标间的潜在冲突，提出优先级建议", `3. 考虑我的 ${form.mbti || "未知"} 特质，调整计划的结构方式`, "4. 输出格式：OKR 表格 + 季度里程碑路线图", "", "[输出约束]", "请确保每个 KR 是可量化的，目标总数不超过 3 个领域，并标注与核心价值观的对齐度。"].join("\n");
  }
  if (cycle === "weekly") {
    const form = state.ai.weekly;
    return ["月 / 周规划 Prompt", `${form.period === "month" ? "月度" : "周度"}`, "", "[用户画像快照]", `${profile.mbti} · ${profile.chronotype} · 主要拖延触发：${profile.procrastination}`, "", "[上期复盘]", `超预期完成：${form.win || "未填写"}`, `未完成事项：${form.missed || "未填写"}`, `原因分析（我认为）：${form.reason || "未填写"}`, "", "[本期规划请求]", `时间范围：${form.start || "未填写"} 至 ${form.end || "未填写"}`, "", "核心任务（不可忽略）：", `① ${form.core1 || "未填写"}`, `② ${form.core2 || "未填写"}`, `③ ${form.core3 || "未填写"}`, "", `固定承诺：${form.commitments || "未填写"}`, `精力预判：${form.energy || "3"}/5，特殊情况：${form.special || "无"}`, "", "[规划要求]", "1. 按艾森豪威尔矩阵对所有任务分类", `2. 将深度工作任务安排在我的认知高峰时段（${getChronotypePeak(profile.chronotype)}）`, `3. 针对我的拖延触发器「${profile.procrastination}」设计实施意图（if-then 计划）`, "4. 每天预留 20% 缓冲时间", "5. 输出：周甘特图 + 每日主题 + 应对障碍的 if-then 清单", "", `潜在障碍：${form.obstacle || "未填写"}`, `提前应对：${form.response || "未填写"}`].join("\n");
  }
  const form = state.ai.daily;
  const body = Number(form.body || 3);
  const mood = Number(form.mood || 3);
  const focus = Number(form.focus || 3);
  const average = ((body + mood + focus) / 3).toFixed(1);
  const modeAdvice = Number(average) >= 4 ? "安排深度工作在第一时间块" : Number(average) >= 2 ? "MIT 排第一，其余安排行政 / 沟通类" : "只做快速启动任务，其余推迟";
  return ["今日 / 明日规划 Prompt", "每日", "", "[今日状态]", `日期：${form.date || "未填写"} · 身体精力：${body}/5 · 情绪状态：${mood}/5 · 专注力：${focus}/5`, "", "[今日任务池]", "MIT（最重要）：", `① ${form.mit1 || "未填写"}（预计耗时 ${form.mit1Duration || state.defaultDuration} 分钟）`, `② ${form.mit2 || "未填写"}（预计耗时 ${form.mit2Duration || state.defaultDuration} 分钟）`, `③ ${form.mit3 || "未填写"}（预计耗时 ${form.mit3Duration || state.defaultDuration} 分钟）`, "", `待处理但非紧急：${form.otherTasks || "无"}`, "", "[时间与环境]", `专注时间窗口：${form.windows || "未填写"}`, `可能的干扰源：${form.distraction || "未填写"}，应对策略：${form.strategy || "未填写"}`, `快速启动任务：${form.quickTask || "无"}`, "", "[规划要求]", `1. 根据精力状态（${average}/5）判断今天适合的工作模式：${modeAdvice}`, `2. 将 MIT1 安排在认知高峰时段 ${getChronotypePeak(profile.chronotype)}`, "3. 设计今日的完成标准（什么情况算今天成功）", "4. 输出：小时级时间块安排 + 三个 MIT 的 if-then 实施意图"].join("\n");
}

function handleAiPromptGenerate() {
  state.ai.promptText = buildAiPromptText();
  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText;
  persistState();
}

async function handleAiCopyPrompt() {
  if (!state.ai.promptText) handleAiPromptGenerate();
  const value = state.ai.promptText || "";
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    if (dom.aiCopyPrompt) {
      dom.aiCopyPrompt.textContent = "已复制";
      window.setTimeout(() => {
        if (dom.aiCopyPrompt) dom.aiCopyPrompt.textContent = "复制 Prompt";
      }, 1200);
    }
  } catch {
    window.alert("复制失败，请手动复制。");
  }
}

function parseAiPlanText(text) {
  return String(text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
    let cleaned = line.replace(/^[-*•\d\.\)\s]+/, "").trim();
    let time = "";
    let durationMin = state.defaultDuration;
    const timeMatch = cleaned.match(/^(\d{1,2}:\d{2})/);
    if (timeMatch) {
      time = timeMatch[1];
      cleaned = cleaned.slice(timeMatch[0].length).trim();
    }
    const durationMatch = cleaned.match(/(\d{1,3})\s*min(?:ute)?s?$/i);
    if (durationMatch) {
      durationMin = Number(durationMatch[1]) || state.defaultDuration;
      cleaned = cleaned.slice(0, durationMatch.index).trim();
    }
    cleaned = cleaned.replace(/[-–—:：]\s*$/, "").trim();
    return { name: cleaned || "Untitled", time, durationMin };
  });
}

function renderAiPreview(items) {
  if (!dom.aiPreviewList) return;
  if (!items.length) {
    dom.aiPreviewList.innerHTML = `<p class="empty-note">还没有可导入的内容。</p>`;
    return;
  }
  const cycle = state.ai.cycle || "overall";
  const importDate = cycle === "daily" ? state.ai.daily.date : cycle === "weekly" ? state.ai.weekly.start : "";
  dom.aiPreviewList.innerHTML = items.map((item) => `<div class="ai-preview-row"><span class="ai-preview-name">${escapeHtml(item.name)}</span><span class="ai-preview-meta">${escapeHtml(importDate || item.time || "Any time")} · ${item.durationMin} min</span></div>`).join("");
}

function handleAiPreviewImport() {
  state.ui.aiPreviewItems = parseAiPlanText(state.ai.resultText || "").filter((item) => item.name);
  renderAiPreview(state.ui.aiPreviewItems);
  persistState();
}

function handleAiImportPlan() {
  if (!Array.isArray(state.ui.aiPreviewItems) || !state.ui.aiPreviewItems.length) handleAiPreviewImport();
  const items = Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : [];
  if (!items.length) return;
  const cycle = state.ai.cycle || "overall";
  const importDate = cycle === "daily" ? state.ai.daily.date || formatInputDate(new Date()) : cycle === "weekly" ? state.ai.weekly.start || formatInputDate(new Date()) : null;
  items.slice().reverse().forEach((item) => {
    const task = createTask({ name: item.name, time: item.time, durationMin: item.durationMin });
    task.scheduledDate = importDate;
    state.tasks.unshift(task);
  });
  state.ui.aiPreviewItems = [];
  state.ai.resultText = "";
  if (dom.aiResultInput) dom.aiResultInput.value = "";
  renderAiPreview([]);
  state.currentPage = "home";
  renderAll();
  persistState();
}

function handleCustomBackgroundUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.customBackgroundImage = String(reader.result || "");
    state.theme = "custom";
    applyTheme();
    renderSettings();
    persistState();
  };
  reader.readAsDataURL(file);
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
  renderAiPlanner();
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  renderTaskTimeWheel();
  bindTaskTimeSheetControls();
  updateLogDuration();
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
  renderAiPlanner();
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  renderTaskTimeWheel();
  bindTaskTimeSheetControls();
  updateLogDuration();
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  const sortMode = state.ui.todoSortMode && !isCompleted;
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  const timeMarkup = isCompleted
    ? `<div class="task-time-block">${timeText}</div>`
    : `
        <button
          class="task-time-edit ${task.scheduledMinutes == null ? "is-empty" : ""}"
          data-task-time="${task.id}"
          type="button"
          aria-label="Set time for ${escapeHtml(task.name)}"
        >
          ${timeText}
        </button>
      `;

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
          ${task.important ? '<span class="task-star" aria-hidden="true">★</span>' : ""}
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

function renderTodoGroups() {
  const groups = getGroupedTasks();
  if (dom.todoSortToggle) {
    const sortActionLabel = state.ui.todoSortMode
      ? uiText("todo.sort.done", "Done sorting")
      : uiText("todo.sort.start", "Sort tasks");
    dom.todoSortToggle.innerHTML = renderPencilIconMarkup(sortActionLabel);
    dom.todoSortToggle.setAttribute("aria-label", sortActionLabel);
    dom.todoSortToggle.classList.toggle("is-active", Boolean(state.ui.todoSortMode));
    dom.todoSortToggle.onclick = () => {
      state.ui.todoSortMode = !state.ui.todoSortMode;
      state.ui.editingTaskNoteId = null;
      renderHome();
      persistState();
    };
  }

  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", uiText("group.overdue", "Overdue"), groups.overdue),
    renderTaskGroup("today", uiText("group.today", "Today"), groups.today),
    renderTaskGroup("flexible", uiText("group.flexible", "Flexible"), groups.flexible),
    renderTaskGroup("completed", uiText("group.completed", "Completed"), groups.completed, true),
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
  dom.todoGroups.querySelectorAll("[data-task-time]").forEach((button) => {
    button.onclick = () => openTaskTimeSheet("inline", button.dataset.taskTime);
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
        if (!draggedTodoTaskId || draggedTodoTaskId === row.dataset.taskRow) return;
        moveTaskBefore(draggedTodoTaskId, row.dataset.taskRow);
        renderHome();
        persistState();
      };
    });
  }

  bindTaskRowLongPress();
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  const sortMode = state.ui.todoSortMode && !isCompleted;
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  const timeMarkup = isCompleted
    ? `<div class="task-time-block">${timeText}</div>`
    : `
        <button
          class="task-time-edit ${task.scheduledMinutes == null ? "is-empty" : ""}"
          data-task-time="${task.id}"
          type="button"
          aria-label="Set time for ${escapeHtml(task.name)}"
        >
          ${timeText}
        </button>
      `;

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
          ${task.important ? '<span class="task-star" aria-hidden="true">&#9733;</span>' : ""}
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

function getAiPathValue(path) {
  return path.split(".").reduce((acc, key) => acc?.[key], state.ai);
}

function setAiPathValue(path, value) {
  const parts = path.split(".");
  let target = state.ai;
  while (parts.length > 1) {
    const key = parts.shift();
    target[key] = target[key] || {};
    target = target[key];
  }
  target[parts[0]] = value;
}

function getChronotypePeak(label) {
  const map = {
    清晨: "06:00-10:00",
    上午: "09:00-12:00",
    下午: "13:00-16:00",
    傍晚: "17:00-19:00",
    夜间: "20:00-23:00",
  };
  return map[label] || "未填写";
}

function getAiProfileSnapshot() {
  const overall = state.ai.overall || {};
  const values = [overall.value1, overall.value2, overall.value3].filter(Boolean);
  return {
    mbti: overall.mbti || "不知道",
    chronotype: overall.chronotype || "未填写",
    workStyle: overall.workStyle || "未填写",
    procrastination: Array.isArray(overall.procrastination) && overall.procrastination.length ? overall.procrastination.join(" / ") : "未填写",
    values: values.length ? values : ["未填写"],
  };
}

function renderAiPlanner() {
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  if (!dom.aiCycleGrid || !dom.aiQuestionnaire) return;

  const cycle = state.ai.cycle || "overall";
  dom.aiCycleGrid.innerHTML = AI_CYCLES_V2
    .map(
      (item) => `
        <button class="ai-cycle-card ${cycle === item.id ? "is-active" : ""}" data-ai-cycle="${item.id}" type="button">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.note)}</span>
        </button>
      `
    )
    .join("");

  dom.aiWorkflowStrip.innerHTML = AI_WORKFLOW_STEPS.map((step) => `<span class="ai-step-chip">${escapeHtml(step)}</span>`).join("");
  dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);

  dom.aiCycleGrid.querySelectorAll("[data-ai-cycle]").forEach((button) => {
    button.onclick = () => {
      state.ai.cycle = button.dataset.aiCycle;
      state.ui.aiPreviewItems = [];
      renderAiPlanner();
      persistState();
    };
  });

  bindAiQuestionnaireFields();

  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
  if (dom.aiResultInput) {
    dom.aiResultInput.value = state.ai.resultText || "";
    dom.aiResultInput.oninput = (event) => {
      state.ai.resultText = event.target.value;
      persistState();
    };
  }
  if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
  if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
  if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
  if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
  if (dom.aiPageBack) {
    dom.aiPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };
  }

  renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
}

function buildAiQuestionnaire(cycle) {
  const isEn = getUiLanguage() === "en";

  if (isEn && cycle === "overall") {
    return `
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-period">Time period</label>
        <select class="ai-input" id="ai-overall-period" data-ai-field="overall.period">
          <option value="quarter">Quarter</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-mbti">Q1 · Personality type</label>
        <select class="ai-input" id="ai-overall-mbti" data-ai-field="overall.mbti">
          ${AI_MBTI_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q2 · Chronotype preference</div>
        <div class="ai-choice-grid">
          ${AI_CHRONOTYPE_OPTIONS.map((option) => `
            <label class="ai-choice-chip">
              <input type="radio" name="ai-overall-chronotype" data-ai-field="overall.chronotype" value="${option}" />
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q3 · Work style</div>
        <div class="ai-choice-stack">
          ${AI_WORKSTYLE_OPTIONS.map((option) => `
            <label class="ai-choice-line">
              <input type="radio" name="ai-overall-workstyle" data-ai-field="overall.workStyle" value="${option.label}" />
              <span>${option.id}. ${option.label}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q4 · Procrastination triggers</div>
        <div class="ai-choice-stack">
          ${AI_PROCRASTINATION_OPTIONS.map((option) => `
            <label class="ai-choice-line">
              <input type="checkbox" data-ai-list="overall.procrastination" value="${option}" />
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q5 · Core values ranking</div>
        <div class="ai-three-grid">
          <select class="ai-input" data-ai-field="overall.value1"><option value="">Priority 1</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
          <select class="ai-input" data-ai-field="overall.value2"><option value="">Priority 2</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
          <select class="ai-input" data-ai-field="overall.value3"><option value="">Priority 3</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
        </div>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-stage">Current life/work stage</label>
        <textarea class="ai-input ai-textarea" id="ai-overall-stage" rows="3" data-ai-field="overall.lifeStage" placeholder="For example: student / job search / early startup"></textarea>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-challenge">Main challenge</label>
        <textarea class="ai-input ai-textarea" id="ai-overall-challenge" rows="3" data-ai-field="overall.challenge" placeholder="For example: too many tasks, unstable rhythm, energy fluctuations"></textarea>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Target domains</div>
        <div class="ai-domain-stack">
          <div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain1Name" placeholder="Domain 1" /><input class="ai-input" data-ai-field="overall.domain1Goal" placeholder="Goal direction" /></div>
          <div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain2Name" placeholder="Domain 2" /><input class="ai-input" data-ai-field="overall.domain2Goal" placeholder="Goal direction" /></div>
          <div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain3Name" placeholder="Domain 3 (optional)" /><input class="ai-input" data-ai-field="overall.domain3Goal" placeholder="Goal direction (optional)" /></div>
        </div>
      </div>
    `;
  }

  if (isEn && cycle === "weekly") {
    return `
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-period">Planning period</label>
        <select class="ai-input" id="ai-weekly-period" data-ai-field="weekly.period">
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Date range</div>
        <div class="ai-two-grid">
          <input class="ai-input" type="date" data-ai-field="weekly.start" />
          <input class="ai-input" type="date" data-ai-field="weekly.end" />
        </div>
      </div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-win">Q1 · What went better than expected</label><textarea class="ai-input ai-textarea" id="ai-weekly-win" rows="3" data-ai-field="weekly.win"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-missed">Q1 · What you planned but missed</label><textarea class="ai-input ai-textarea" id="ai-weekly-missed" rows="3" data-ai-field="weekly.missed"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-reason">Reason analysis</label><textarea class="ai-input ai-textarea" id="ai-weekly-reason" rows="3" data-ai-field="weekly.reason"></textarea></div>
      <div class="ai-field"><div class="ai-field-label">Q2 · Core tasks (3)</div><div class="ai-three-stack"><input class="ai-input" data-ai-field="weekly.core1" placeholder="Core task 1" /><input class="ai-input" data-ai-field="weekly.core2" placeholder="Core task 2" /><input class="ai-input" data-ai-field="weekly.core3" placeholder="Core task 3" /></div></div>
      <div class="ai-field"><div class="ai-field-label">Q3 · Energy forecast</div><div class="ai-range-row"><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="weekly.energy" /><span class="ai-range-value" data-ai-display="weekly.energy"></span></div><textarea class="ai-input ai-textarea" rows="3" data-ai-field="weekly.special" placeholder="Travel / major meetings / family events, etc."></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-commitments">Q4 · Fixed commitments</label><textarea class="ai-input ai-textarea" id="ai-weekly-commitments" rows="3" data-ai-field="weekly.commitments" placeholder="Meetings, appointments, deadlines..."></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-obstacle">Q5 · Potential obstacles</label><textarea class="ai-input ai-textarea" id="ai-weekly-obstacle" rows="3" data-ai-field="weekly.obstacle"></textarea></div>
      <div class="ai-field"><label class="ai-field-label" for="ai-weekly-response">Planned response</label><textarea class="ai-input ai-textarea" id="ai-weekly-response" rows="3" data-ai-field="weekly.response"></textarea></div>
    `;
  }

  if (isEn) {
    return `
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-horizon">Planning target</label><select class="ai-input" id="ai-daily-horizon" data-ai-field="daily.horizon"><option value="today">Today</option><option value="tomorrow">Tomorrow</option></select></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-date">Date</label><input class="ai-input" id="ai-daily-date" type="date" data-ai-field="daily.date" /></div>
    <div class="ai-field"><div class="ai-field-label">Q1 · Current energy state</div><div class="ai-meter-stack"><label class="ai-range-block"><span>Body</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.body" /><span class="ai-range-value" data-ai-display="daily.body"></span></label><label class="ai-range-block"><span>Mood</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.mood" /><span class="ai-range-value" data-ai-display="daily.mood"></span></label><label class="ai-range-block"><span>Focus</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.focus" /><span class="ai-range-value" data-ai-display="daily.focus"></span></label></div></div>
    <div class="ai-field"><div class="ai-field-label">Q2 · Three MITs</div><div class="ai-mit-stack">${[1, 2, 3].map((index) => `<div class="ai-mit-row"><input class="ai-input" data-ai-field="daily.mit${index}" placeholder="MIT ${index}" /><input class="ai-input ai-duration-input" type="number" min="5" step="5" data-ai-field="daily.mit${index}Duration" placeholder="Minutes" /></div>`).join("")}</div><textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.otherTasks" placeholder="Pending but non-urgent"></textarea></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-windows">Q3 · Time windows</label><textarea class="ai-input ai-textarea" id="ai-daily-windows" rows="3" data-ai-field="daily.windows" placeholder="For example: 09:00-11:00 (2h) · 15:00-16:30 (1.5h)"></textarea></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-quick">Q4 · Quick-start task</label><input class="ai-input" id="ai-daily-quick" data-ai-field="daily.quickTask" placeholder="A task you can finish within 5 minutes (optional)" /></div>
    <div class="ai-field"><label class="ai-field-label" for="ai-daily-distraction">Q5 · Distraction forecast</label><textarea class="ai-input ai-textarea" id="ai-daily-distraction" rows="3" data-ai-field="daily.distraction" placeholder="What is most likely to interrupt you today?"></textarea><textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.strategy" placeholder="How will you respond?"></textarea></div>
  `;
  }

  if (cycle === "overall") {
    return `
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-period">时间周期</label>
        <select class="ai-input" id="ai-overall-period" data-ai-field="overall.period">
          <option value="quarter">季度</option>
          <option value="year">年度</option>
        </select>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-mbti">Q1 · 人格类型</label>
        <select class="ai-input" id="ai-overall-mbti" data-ai-field="overall.mbti">
          ${AI_MBTI_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q2 · 时型偏好</div>
        <div class="ai-choice-grid">
          ${AI_CHRONOTYPE_OPTIONS.map((option) => `
            <label class="ai-choice-chip">
              <input type="radio" name="ai-overall-chronotype" data-ai-field="overall.chronotype" value="${option}" />
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q3 · 工作风格</div>
        <div class="ai-choice-stack">
          ${AI_WORKSTYLE_OPTIONS.map((option) => `
            <label class="ai-choice-line">
              <input type="radio" name="ai-overall-workstyle" data-ai-field="overall.workStyle" value="${option.label}" />
              <span>${option.id}. ${option.label}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q4 · 拖延触发器</div>
        <div class="ai-choice-stack">
          ${AI_PROCRASTINATION_OPTIONS.map((option) => `
            <label class="ai-choice-line">
              <input type="checkbox" data-ai-list="overall.procrastination" value="${option}" />
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q5 · 核心价值观排序</div>
        <div class="ai-three-grid">
          <select class="ai-input" data-ai-field="overall.value1"><option value="">优先级 1</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
          <select class="ai-input" data-ai-field="overall.value2"><option value="">优先级 2</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
          <select class="ai-input" data-ai-field="overall.value3"><option value="">优先级 3</option>${AI_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
        </div>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-stage">当前阶段背景</label>
        <textarea class="ai-input ai-textarea" id="ai-overall-stage" rows="3" data-ai-field="overall.lifeStage" placeholder="例如：学生 / 准备求职 / 创业初期"></textarea>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-overall-challenge">主要挑战</label>
        <textarea class="ai-input ai-textarea" id="ai-overall-challenge" rows="3" data-ai-field="overall.challenge" placeholder="例如：任务太多、节奏不稳、身体状态起伏"></textarea>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">目标领域</div>
        <div class="ai-domain-stack">
          <div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain1Name" placeholder="领域 1" /><input class="ai-input" data-ai-field="overall.domain1Goal" placeholder="目标方向" /></div>
          <div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain2Name" placeholder="领域 2" /><input class="ai-input" data-ai-field="overall.domain2Goal" placeholder="目标方向" /></div>
          <div class="ai-domain-row"><input class="ai-input" data-ai-field="overall.domain3Name" placeholder="领域 3（可选）" /><input class="ai-input" data-ai-field="overall.domain3Goal" placeholder="目标方向（可选）" /></div>
        </div>
      </div>
    `;
  }

  if (cycle === "weekly") {
    return `
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-period">规划周期</label>
        <select class="ai-input" id="ai-weekly-period" data-ai-field="weekly.period">
          <option value="week">周</option>
          <option value="month">月</option>
        </select>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">时间范围</div>
        <div class="ai-two-grid">
          <input class="ai-input" type="date" data-ai-field="weekly.start" />
          <input class="ai-input" type="date" data-ai-field="weekly.end" />
        </div>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-win">Q1 · 上期复盘：做得超预期</label>
        <textarea class="ai-input ai-textarea" id="ai-weekly-win" rows="3" data-ai-field="weekly.win"></textarea>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-missed">Q1 · 上期复盘：没做到但本来想做的</label>
        <textarea class="ai-input ai-textarea" id="ai-weekly-missed" rows="3" data-ai-field="weekly.missed"></textarea>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-reason">原因分析（我认为）</label>
        <textarea class="ai-input ai-textarea" id="ai-weekly-reason" rows="3" data-ai-field="weekly.reason"></textarea>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q2 · 核心任务（3 件）</div>
        <div class="ai-three-stack">
          <input class="ai-input" data-ai-field="weekly.core1" placeholder="核心任务 1" />
          <input class="ai-input" data-ai-field="weekly.core2" placeholder="核心任务 2" />
          <input class="ai-input" data-ai-field="weekly.core3" placeholder="核心任务 3" />
        </div>
      </div>
      <div class="ai-field">
        <div class="ai-field-label">Q3 · 精力预判</div>
        <div class="ai-range-row">
          <input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="weekly.energy" />
          <span class="ai-range-value" data-ai-display="weekly.energy"></span>
        </div>
        <textarea class="ai-input ai-textarea" rows="3" data-ai-field="weekly.special" placeholder="旅行 / 重要会议 / 家庭事件等特殊情况"></textarea>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-commitments">Q4 · 固定承诺</label>
        <textarea class="ai-input ai-textarea" id="ai-weekly-commitments" rows="3" data-ai-field="weekly.commitments" placeholder="会议、约定、deadline 等"></textarea>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-obstacle">Q5 · 潜在障碍</label>
        <textarea class="ai-input ai-textarea" id="ai-weekly-obstacle" rows="3" data-ai-field="weekly.obstacle"></textarea>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-weekly-response">提前应对</label>
        <textarea class="ai-input ai-textarea" id="ai-weekly-response" rows="3" data-ai-field="weekly.response"></textarea>
      </div>
    `;
  }

  return `
    <div class="ai-field">
      <label class="ai-field-label" for="ai-daily-horizon">规划对象</label>
      <select class="ai-input" id="ai-daily-horizon" data-ai-field="daily.horizon">
        <option value="today">今日</option>
        <option value="tomorrow">明日</option>
      </select>
    </div>
    <div class="ai-field">
      <label class="ai-field-label" for="ai-daily-date">日期</label>
      <input class="ai-input" id="ai-daily-date" type="date" data-ai-field="daily.date" />
    </div>
    <div class="ai-field">
      <div class="ai-field-label">Q1 · 当前能量状态</div>
      <div class="ai-meter-stack">
        <label class="ai-range-block"><span>身体</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.body" /><span class="ai-range-value" data-ai-display="daily.body"></span></label>
        <label class="ai-range-block"><span>情绪</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.mood" /><span class="ai-range-value" data-ai-display="daily.mood"></span></label>
        <label class="ai-range-block"><span>专注力</span><input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.focus" /><span class="ai-range-value" data-ai-display="daily.focus"></span></label>
      </div>
    </div>
    <div class="ai-field">
      <div class="ai-field-label">Q2 · 三个 MIT</div>
      <div class="ai-mit-stack">
        ${[1, 2, 3].map((index) => `<div class="ai-mit-row"><input class="ai-input" data-ai-field="daily.mit${index}" placeholder="MIT ${index}" /><input class="ai-input ai-duration-input" type="number" min="5" step="5" data-ai-field="daily.mit${index}Duration" placeholder="分钟" /></div>`).join("")}
      </div>
      <textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.otherTasks" placeholder="待处理但非紧急"></textarea>
    </div>
    <div class="ai-field">
      <label class="ai-field-label" for="ai-daily-windows">Q3 · 时间窗口</label>
      <textarea class="ai-input ai-textarea" id="ai-daily-windows" rows="3" data-ai-field="daily.windows" placeholder="例如：09:00-11:00（2h） · 15:00-16:30（1.5h）"></textarea>
    </div>
    <div class="ai-field">
      <label class="ai-field-label" for="ai-daily-quick">Q4 · 快速启动任务</label>
      <input class="ai-input" id="ai-daily-quick" data-ai-field="daily.quickTask" placeholder="5 分钟内可完成的小事（可选）" />
    </div>
    <div class="ai-field">
      <label class="ai-field-label" for="ai-daily-distraction">Q5 · 干扰预测</label>
      <textarea class="ai-input ai-textarea" id="ai-daily-distraction" rows="3" data-ai-field="daily.distraction" placeholder="今天最可能打断你的是什么？"></textarea>
      <textarea class="ai-input ai-textarea" rows="3" data-ai-field="daily.strategy" placeholder="你打算如何处理？"></textarea>
    </div>
  `;
}

function bindAiQuestionnaireFields() {
  if (!dom.aiQuestionnaire) return;

  dom.aiQuestionnaire.querySelectorAll("[data-ai-field]").forEach((input) => {
    const path = input.dataset.aiField;
    const value = getAiPathValue(path);
    if (input.type === "radio") {
      input.checked = value === input.value;
      input.onchange = () => {
        if (!input.checked) return;
        setAiPathValue(path, input.value);
        persistState();
      };
      return;
    }

    input.value = value ?? "";
    input.oninput = () => {
      setAiPathValue(path, input.value);
      syncAiRangeDisplays();
      persistState();
    };
    input.onchange = input.oninput;
  });

  dom.aiQuestionnaire.querySelectorAll("[data-ai-list]").forEach((input) => {
    const path = input.dataset.aiList;
    const list = getAiPathValue(path) || [];
    input.checked = list.includes(input.value);
    input.onchange = () => {
      const current = new Set(getAiPathValue(path) || []);
      if (input.checked) current.add(input.value);
      else current.delete(input.value);
      setAiPathValue(path, [...current]);
      persistState();
    };
  });

  syncAiRangeDisplays();
}

function syncAiRangeDisplays() {
  document.querySelectorAll("[data-ai-display]").forEach((node) => {
    const value = getAiPathValue(node.dataset.aiDisplay);
    node.textContent = value ? `${value}/5` : "";
  });
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();

  dom.themeGrid.innerHTML = [
    { id: "paper", name: "Simple Paper" },
    { id: "custom", name: "Custom" },
  ]
    .map(
      (theme) => `
        <button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
          <span class="settings-theme-radio" aria-hidden="true"></span>
          <span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span>
        </button>
      `
    )
    .join("");

  if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
  if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
  if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";
  if (dom.customBackgroundRow) dom.customBackgroundRow.classList.toggle("is-disabled", state.theme !== "custom");

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
    button.onclick = () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    };
  });

  if (dom.aiPlannerLink) {
    dom.aiPlannerLink.onclick = () => {
      state.currentPage = "ai-planner";
      renderAll();
      persistState();
    };
  }
  if (dom.defaultDurationRow) {
    dom.defaultDurationRow.onclick = () => {
      const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
      if (raw == null) return;
      const minutes = Number(raw);
      if (!Number.isFinite(minutes) || minutes <= 0) return;
      state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
      renderSettings();
      persistState();
    };
  }
  if (dom.dayStartRow) {
    dom.dayStartRow.onclick = () => {
      const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
      if (raw == null) return;
      const value = raw.trim();
      if (!/^([01]\\d|2[0-3]):([0-5]\\d)$/.test(value)) return;
      state.dayStart = value;
      renderSettings();
      persistState();
    };
  }
  if (dom.completedDefaultToggle) {
    dom.completedDefaultToggle.onchange = (event) => {
      const checked = Boolean(event.target.checked);
      state.showCompletedOpen = checked;
      state.ui.groupOpen.completed = checked;
      renderHome();
      renderSettings();
      persistState();
    };
  }
  if (dom.nextTimePriorityToggle) {
    dom.nextTimePriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeTime = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.nextImportantPriorityToggle) {
    dom.nextImportantPriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeImportant = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.customBackgroundRow) dom.customBackgroundRow.onclick = () => dom.customBackgroundInput?.click();
  if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
}

function buildAiPromptText() {
  const cycle = state.ai.cycle || "overall";
  const profile = getAiProfileSnapshot();

  if (cycle === "overall") {
    const form = state.ai.overall;
    const domains = [
      [form.domain1Name, form.domain1Goal],
      [form.domain2Name, form.domain2Goal],
      [form.domain3Name, form.domain3Goal],
    ]
      .filter(([name, goal]) => name || goal)
      .map(([name, goal]) => `   ${name || "领域"}：${goal || "未填写"}`)
      .join("\n");

    return [
      "总体规划 Prompt",
      `${form.period === "year" ? "年度" : "季度"}`,
      "",
      "[用户画像]",
      `我是一个 ${form.mbti || "不知道"} 类型的人，时型偏向 ${form.chronotype || "未填写"}，核心价值观优先级为：${[form.value1, form.value2, form.value3].filter(Boolean).join(" > ") || "未填写"}。`,
      "",
      "[当前阶段背景]",
      `我目前处于 ${form.lifeStage || "未填写"}，主要挑战是 ${form.challenge || "未填写"}。`,
      "",
      "[目标设定请求]",
      `请帮我制定一个 ${form.period === "year" ? "年度" : "季度"} 的目标规划，要求：`,
      "1. 为以下生活域各设定 1 个 Objective 和 2-3 个 Key Results：",
      domains || "   事业成就：未填写",
      "2. 识别目标间的潜在冲突，提出优先级建议",
      `3. 考虑我的 ${form.mbti || "未知"} 特质，调整计划的结构方式`,
      "4. 输出格式：OKR 表格 + 季度里程碑路线图",
      "",
      "[输出约束]",
      "请确保每个 KR 是可量化的，目标总数不超过 3 个领域，并标注与核心价值观的对齐度。",
    ].join("\n");
  }

  if (cycle === "weekly") {
    const form = state.ai.weekly;
    return [
      "月 / 周规划 Prompt",
      `${form.period === "month" ? "月度" : "周度"}`,
      "",
      "[用户画像快照]",
      `${profile.mbti} · ${profile.chronotype} · 主要拖延触发：${profile.procrastination}`,
      "",
      "[上期复盘]",
      `超预期完成：${form.win || "未填写"}`,
      `未完成事项：${form.missed || "未填写"}`,
      `原因分析（我认为）：${form.reason || "未填写"}`,
      "",
      "[本期规划请求]",
      `时间范围：${form.start || "未填写"} 至 ${form.end || "未填写"}`,
      "",
      "核心任务（不可忽略）：",
      `① ${form.core1 || "未填写"}`,
      `② ${form.core2 || "未填写"}`,
      `③ ${form.core3 || "未填写"}`,
      "",
      `固定承诺：${form.commitments || "未填写"}`,
      `精力预判：${form.energy || "3"}/5，特殊情况：${form.special || "无"}`,
      "",
      "[规划要求]",
      "1. 按艾森豪威尔矩阵对所有任务分类",
      `2. 将深度工作任务安排在我的认知高峰时段（${getChronotypePeak(profile.chronotype)}）`,
      `3. 针对我的拖延触发器「${profile.procrastination}」设计实施意图（if-then 计划）`,
      "4. 每天预留 20% 缓冲时间",
      "5. 输出：周甘特图 + 每日主题 + 应对障碍的 if-then 清单",
      "",
      `潜在障碍：${form.obstacle || "未填写"}`,
      `提前应对：${form.response || "未填写"}`,
    ].join("\n");
  }

  const form = state.ai.daily;
  const body = Number(form.body || 3);
  const mood = Number(form.mood || 3);
  const focus = Number(form.focus || 3);
  const average = ((body + mood + focus) / 3).toFixed(1);
  const modeAdvice = Number(average) >= 4 ? "安排深度工作在第一时间块" : Number(average) >= 2 ? "MIT 排第一，其余安排行政 / 沟通类" : "只做快速启动任务，其余推迟";

  return [
    "今日 / 明日规划 Prompt",
    "每日",
    "",
    "[今日状态]",
    `日期：${form.date || "未填写"} · 身体精力：${body}/5 · 情绪状态：${mood}/5 · 专注力：${focus}/5`,
    "",
    "[今日任务池]",
    "MIT（最重要）：",
    `① ${form.mit1 || "未填写"}（预计耗时 ${form.mit1Duration || state.defaultDuration} 分钟）`,
    `② ${form.mit2 || "未填写"}（预计耗时 ${form.mit2Duration || state.defaultDuration} 分钟）`,
    `③ ${form.mit3 || "未填写"}（预计耗时 ${form.mit3Duration || state.defaultDuration} 分钟）`,
    "",
    `待处理但非紧急：${form.otherTasks || "无"}`,
    "",
    "[时间与环境]",
    `专注时间窗口：${form.windows || "未填写"}`,
    `可能的干扰源：${form.distraction || "未填写"}，应对策略：${form.strategy || "未填写"}`,
    `快速启动任务：${form.quickTask || "无"}`,
    "",
    "[规划要求]",
    `1. 根据精力状态（${average}/5）判断今天适合的工作模式：${modeAdvice}`,
    `2. 将 MIT1 安排在认知高峰时段 ${getChronotypePeak(profile.chronotype)}`,
    "3. 设计今日的完成标准（什么情况算今天成功）",
    "4. 输出：小时级时间块安排 + 三个 MIT 的 if-then 实施意图",
  ].join("\n");
}

function handleAiPromptGenerate() {
  state.ai.promptText = buildAiPromptText();
  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText;
  persistState();
}

async function handleAiCopyPrompt() {
  if (!state.ai.promptText) handleAiPromptGenerate();
  const value = state.ai.promptText || "";
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    if (dom.aiCopyPrompt) {
      dom.aiCopyPrompt.textContent = "已复制";
      window.setTimeout(() => {
        if (dom.aiCopyPrompt) dom.aiCopyPrompt.textContent = "复制 Prompt";
      }, 1200);
    }
  } catch {
    window.alert("复制失败，请手动复制。");
  }
}

function parseAiPlanText(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      let cleaned = line.replace(/^[-*•\d\.\)\s]+/, "").trim();
      let time = "";
      let durationMin = state.defaultDuration;

      const timeMatch = cleaned.match(/^(\d{1,2}:\d{2})/);
      if (timeMatch) {
        time = timeMatch[1];
        cleaned = cleaned.slice(timeMatch[0].length).trim();
      }

      const durationMatch = cleaned.match(/(\d{1,3})\s*min(?:ute)?s?$/i);
      if (durationMatch) {
        durationMin = Number(durationMatch[1]) || state.defaultDuration;
        cleaned = cleaned.slice(0, durationMatch.index).trim();
      }

      cleaned = cleaned.replace(/[-–—:：]\s*$/, "").trim();
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
  const cycle = state.ai.cycle || "overall";
  const importDate = cycle === "daily" ? state.ai.daily.date : cycle === "weekly" ? state.ai.weekly.start : "";
  dom.aiPreviewList.innerHTML = items
    .map(
      (item) => `
        <div class="ai-preview-row">
          <span class="ai-preview-name">${escapeHtml(item.name)}</span>
          <span class="ai-preview-meta">${escapeHtml(importDate || item.time || "Any time")} · ${item.durationMin} min</span>
        </div>
      `
    )
    .join("");
}

function handleAiPreviewImport() {
  state.ui.aiPreviewItems = parseAiPlanText(state.ai.resultText || "").filter((item) => item.name);
  renderAiPreview(state.ui.aiPreviewItems);
  persistState();
}

function handleAiImportPlan() {
  if (!Array.isArray(state.ui.aiPreviewItems) || !state.ui.aiPreviewItems.length) handleAiPreviewImport();
  const items = Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : [];
  if (!items.length) return;

  const cycle = state.ai.cycle || "overall";
  const importDate = cycle === "daily" ? state.ai.daily.date || formatInputDate(new Date()) : cycle === "weekly" ? state.ai.weekly.start || formatInputDate(new Date()) : null;

  items
    .slice()
    .reverse()
    .forEach((item) => {
      const task = createTask({
        name: item.name,
        time: item.time,
        durationMin: item.durationMin,
      });
      task.scheduledDate = importDate;
      state.tasks.unshift(task);
    });

  state.ui.aiPreviewItems = [];
  state.ai.resultText = "";
  if (dom.aiResultInput) dom.aiResultInput.value = "";
  renderAiPreview([]);
  state.currentPage = "home";
  renderAll();
  persistState();
}

function handleCustomBackgroundUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.customBackgroundImage = String(reader.result || "");
    state.theme = "custom";
    applyTheme();
    renderSettings();
    persistState();
  };
  reader.readAsDataURL(file);
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
  renderAiPlanner();
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  renderTaskTimeWheel();
  bindTaskTimeSheetControls();
  updateLogDuration();
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

  return {
    schemaVersion: STATE_SCHEMA_VERSION,
    demoSeedCleared: 1,
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
    tasks: [],
    sessions: [],
    activeTimer: null,
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
  if (task) {
    state.ui.createTaskSelection = {
      folderId: task.folderId,
      categoryId: task.categoryId,
      templateId: task.templateId,
    };
  } else if (!state.ui.createTaskSelection) {
    state.ui.createTaskSelection = null;
  }

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
  const templates = ensureCategoryTemplates(category);
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${templates
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
  if (task) {
    state.ui.createTaskSelection = {
      folderId: task.folderId,
      categoryId: task.categoryId,
      templateId: task.templateId,
    };
  } else if (!state.ui.createTaskSelection) {
    state.ui.createTaskSelection = null;
  }

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
  if (state.ui.categoryTrail.length > 1) {
    state.ui.categoryTrail = state.ui.categoryTrail.slice(0, 1);
  }
  const trail = state.ui.categoryTrail;
  const level = trail.length;
  dom.categorySheetTitle.textContent = level === 0 ? "Choose folder" : "Choose category";

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
          <strong>${item.kind === "folder" ? "›" : "Use"}</strong>
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
      if (item.kind === "category" || item.kind === "use-category") {
        state.ui.createTaskSelection = {
          folderId: item.folderId,
          categoryId: item.categoryId || item.id,
          templateId: null,
        };
        updateTaskCategoryLabel();
        openSheet("task-sheet");
        return;
      }
      if (item.kind === "folder") {
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
  const actionRow = dom.treeEditorForm?.querySelector(".sheet-button-row");
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
  if (actionRow) {
    actionRow.classList.toggle("is-single-action", config.mode !== "edit");
  }
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
    const templates = ensureCategoryTemplates(category);
    const duration = Number(dom.treeDurationInput.value) || state.defaultDuration;
    if (config.mode === "edit") {
      const template = templates.find((entry) => entry.id === config.nodeId);
      if (template) {
        template.name = name;
        template.durationMin = duration;
      }
    } else {
      templates.push({ id: makeId("tpl"), name, durationMin: duration });
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
      const templates = ensureCategoryTemplates(category);
      category.templates = templates.filter((template) => template.id !== config.nodeId);
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

function ensureCategoryTemplates(category) {
  if (!category) return [];
  const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") return Object.values(value);
    return [];
  };

  const normalizeTemplate = (template) => ({
    id: template?.id ?? makeId("tpl"),
    name: template?.name || template?.label || template?.title || template?.text || "Template",
    durationMin:
      Number(template?.durationMin) ||
      Number(template?.duration) ||
      Number(template?.minutes) ||
      state.defaultDuration,
  });

  const directTemplates = toArray(category.templates);
  if (directTemplates.length) {
    category.templates = directTemplates.map(normalizeTemplate);
    return category.templates;
  }

  const fallbackSeed = [
    ...toArray(category.children),
    ...toArray(category.items),
    ...toArray(category.subcategories),
    ...toArray(category.nodes),
    ...toArray(category.templateList),
    ...toArray(category.templatesList),
  ];

  const flattened = fallbackSeed.flatMap((entry) => {
    const nestedTemplates = toArray(entry?.templates);
    if (nestedTemplates.length) return nestedTemplates;
    const nestedItems = toArray(entry?.items);
    if (nestedItems.length) return nestedItems;
    const nestedChildren = toArray(entry?.children);
    if (nestedChildren.length) return nestedChildren;
    return [entry];
  });

  category.templates = flattened.map(normalizeTemplate).filter((template) => template.name);
  return category.templates;
}

function getAllTemplates() {
  return state.folders.flatMap((folder) =>
    folder.categories.flatMap((category) =>
      ensureCategoryTemplates(category).map((template) => ({ ...template, categoryId: category.id, folderId: folder.id }))
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, schemaVersion: STATE_SCHEMA_VERSION }));
}

const LEGACY_DEMO_TASK_SIGNATURES = [
  {
    name: "Read Book",
    scheduledMinutes: parseTimeString("08:00"),
    durationMin: 30,
    folderName: "Study",
    categoryName: "English",
    templateName: "Read Book",
    important: false,
    completed: false,
  },
  {
    name: "Exercise",
    scheduledMinutes: parseTimeString("09:30"),
    durationMin: 30,
    folderName: "Life",
    categoryName: "Fitness",
    templateName: "Exercise",
    important: false,
    completed: false,
  },
  {
    name: "Study Math",
    scheduledMinutes: parseTimeString("11:00"),
    durationMin: 45,
    folderName: "Study",
    categoryName: "Math",
    templateName: "Do Exercises",
    important: true,
    completed: false,
  },
  {
    name: "Lunch",
    scheduledMinutes: parseTimeString("13:00"),
    durationMin: 40,
    folderName: "Life",
    categoryName: "Daily",
    templateName: "Lunch",
    important: false,
    completed: false,
  },
  {
    name: "Review Notes",
    scheduledMinutes: parseTimeString("18:30"),
    durationMin: 25,
    folderName: "Study",
    categoryName: "Math",
    templateName: "Review Notes",
    important: true,
    completed: false,
  },
  {
    name: "Fill Survey",
    scheduledMinutes: null,
    durationMin: 5,
    folderName: "Work",
    categoryName: "Admin",
    templateName: "Fill Survey",
    important: true,
    completed: false,
  },
  {
    name: "Room Reset",
    scheduledMinutes: null,
    durationMin: 15,
    folderName: "Life",
    categoryName: "Daily",
    templateName: null,
    important: false,
    completed: false,
  },
  {
    name: "Morning Pages",
    scheduledMinutes: parseTimeString("06:40"),
    durationMin: 20,
    folderName: "Study",
    categoryName: "Math",
    templateName: null,
    important: false,
    completed: true,
  },
];

function buildFixtureLookupMaps(folders) {
  const folderNames = new Map();
  const categoryNames = new Map();
  const templateNames = new Map();

  (folders || []).forEach((folder) => {
    folderNames.set(folder.id, folder.name || "");
    (folder.categories || []).forEach((category) => {
      categoryNames.set(category.id, category.name || "");
      (category.templates || []).forEach((template) => {
        templateNames.set(template.id, template.name || "");
      });
    });
  });

  return { folderNames, categoryNames, templateNames };
}

function matchesLegacyDemoTask(task, lookupMaps) {
  const folderName = lookupMaps.folderNames.get(task.folderId) || "";
  const categoryName = lookupMaps.categoryNames.get(task.categoryId) || "";
  const templateName = lookupMaps.templateNames.get(task.templateId) || null;

  return LEGACY_DEMO_TASK_SIGNATURES.some(
    (signature) =>
      task.name === signature.name &&
      task.scheduledMinutes === signature.scheduledMinutes &&
      Number(task.durationMin || 0) === signature.durationMin &&
      Boolean(task.important) === signature.important &&
      Boolean(task.completed) === signature.completed &&
      folderName === signature.folderName &&
      categoryName === signature.categoryName &&
      templateName === signature.templateName
  );
}

function stripLegacyDemoFixtures(snapshot) {
  if (snapshot.demoSeedCleared === 1) {
    return snapshot;
  }

  const lookupMaps = buildFixtureLookupMaps(snapshot.folders);
  const matchedTasks = (snapshot.tasks || []).filter((task) => matchesLegacyDemoTask(task, lookupMaps));

  if (matchedTasks.length < 4) {
    return { ...snapshot, demoSeedCleared: 1 };
  }

  const matchedTaskIds = new Set(matchedTasks.map((task) => task.id));
  const matchedTaskNames = new Set(matchedTasks.map((task) => task.name));

  return {
    ...snapshot,
    demoSeedCleared: 1,
    tasks: (snapshot.tasks || []).filter((task) => !matchedTaskIds.has(task.id)),
    sessions: (snapshot.sessions || []).filter(
      (session) => !matchedTaskIds.has(session.taskId) && !matchedTaskNames.has(session.taskName)
    ),
    activeTimer: matchedTaskIds.has(snapshot.activeTimer?.taskId) ? null : snapshot.activeTimer,
  };
}

function createSeedState(baseDate = new Date()) {
  const dayStart = cloneDate(baseDate);
  dayStart.setHours(0, 0, 0, 0);

  return {
    schemaVersion: STATE_SCHEMA_VERSION,
    demoSeedCleared: 2,
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
    folders: [],
    tasks: [],
    sessions: [],
    activeTimer: null,
  };
}

function stripLegacyDemoFixtures(snapshot) {
  if (Number(snapshot.demoSeedCleared || 0) >= 2) {
    return snapshot;
  }

  const demoFolderBlueprint = {
    Study: {
      Math: ["Do Exercises", "Review Notes"],
      English: ["Read Book", "Practice Vocabulary"],
    },
    Life: {
      Daily: ["Lunch", "Shower"],
      Fitness: ["Exercise"],
    },
    Work: {
      Admin: ["Fill Survey", "Reply Messages"],
    },
  };

  const folderIds = new Set();
  const categoryIds = new Set();
  const templateIds = new Set();

  (snapshot.folders || []).forEach((folder) => {
    const folderSpec = demoFolderBlueprint[folder.name];
    if (!folderSpec) return;

    const categories = folder.categories || [];
    const folderMatches = Object.entries(folderSpec).every(([categoryName, expectedTemplates]) => {
      const category = categories.find((item) => item.name === categoryName);
      if (!category) return false;
      const templateNames = new Set((category.templates || []).map((template) => template.name));
      return expectedTemplates.every((templateName) => templateNames.has(templateName));
    });

    if (!folderMatches) return;

    folderIds.add(folder.id);
    categories.forEach((category) => {
      categoryIds.add(category.id);
      (category.templates || []).forEach((template) => templateIds.add(template.id));
    });
  });

  const lookupMaps = buildFixtureLookupMaps(snapshot.folders);
  const matchedTasks = (snapshot.tasks || []).filter(
    (task) =>
      folderIds.has(task.folderId) ||
      categoryIds.has(task.categoryId) ||
      templateIds.has(task.templateId) ||
      matchesLegacyDemoTask(task, lookupMaps)
  );
  const matchedTaskIds = new Set(matchedTasks.map((task) => task.id));
  const matchedTaskNames = new Set(matchedTasks.map((task) => task.name));

  return {
    ...snapshot,
    demoSeedCleared: 2,
    folders: (snapshot.folders || []).filter((folder) => !folderIds.has(folder.id)),
    tasks: (snapshot.tasks || []).filter((task) => !matchedTaskIds.has(task.id)),
    sessions: (snapshot.sessions || []).filter(
      (session) =>
        !matchedTaskIds.has(session.taskId) &&
        !matchedTaskNames.has(session.taskName) &&
        !folderIds.has(session.folderId) &&
        !categoryIds.has(session.categoryId) &&
        !templateIds.has(session.templateId)
    ),
    activeTimer:
      folderIds.has(snapshot.activeTimer?.folderId) ||
      categoryIds.has(snapshot.activeTimer?.categoryId) ||
      templateIds.has(snapshot.activeTimer?.templateId) ||
      matchedTaskIds.has(snapshot.activeTimer?.taskId)
        ? null
        : snapshot.activeTimer,
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createSeedState();
  try {
    const parsed = JSON.parse(raw);
    const seed = createSeedState();
    const isStaleSchema = parsed.schemaVersion !== STATE_SCHEMA_VERSION;
    const hasCoreCollections = Array.isArray(parsed.folders) && Array.isArray(parsed.tasks) && Array.isArray(parsed.sessions);
    if (isStaleSchema || !hasCoreCollections) {
      return {
        ...seed,
        theme: parsed.theme || seed.theme,
        dayStart: parsed.dayStart || seed.dayStart,
        defaultDuration: Number(parsed.defaultDuration) || seed.defaultDuration,
        nextRules: { ...seed.nextRules, ...(parsed.nextRules || {}) },
        customBackgroundImage: parsed.customBackgroundImage || "",
      };
    }
    const hydrated = {
      ...seed,
      ...parsed,
      ui: {
        ...seed.ui,
        ...parsed.ui,
        customRange: { ...seed.ui.customRange, ...parsed.ui?.customRange },
      },
    };
    return stripLegacyDemoFixtures(hydrated);
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
  if (dom.completedDefaultToggle) {
    dom.completedDefaultToggle.onchange = (event) => {
      state.ui.groupOpen.completed = event.target.checked;
      renderHome();
      persistState();
    };
  }
  if (dom.reduceTextureToggle) {
    dom.reduceTextureToggle.onchange = (event) => {
      state.reduceTexture = event.target.checked;
      applyBodyFlags();
      persistState();
    };
  }
  if (dom.nextTimePriorityToggle) {
    dom.nextTimePriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeTime = event.target.checked;
      renderHome();
      persistState();
    };
  }
  if (dom.nextImportantPriorityToggle) {
    dom.nextImportantPriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeImportant = event.target.checked;
      renderHome();
      persistState();
    };
  }
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
  if (window.__pwaListenersBound) return;
  window.__pwaListenersBound = true;

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
    renderTaskGroup("overdue", uiText("group.overdue", "Overdue"), groups.overdue),
    renderTaskGroup("today", uiText("group.today", "Today"), groups.today),
    renderTaskGroup("flexible", uiText("group.flexible", "Flexible"), groups.flexible),
    renderTaskGroup("completed", uiText("group.completed", "Completed"), groups.completed, true),
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
  if (task) {
    state.ui.createTaskSelection = {
      folderId: task.folderId,
      categoryId: task.categoryId,
      templateId: task.templateId,
    };
  } else if (!state.ui.createTaskSelection) {
    state.ui.createTaskSelection = null;
  }

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

  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent || "");
  if (isIos) {
    window.alert(
      uiText(
        "pwa.manualAlert",
        "Open the browser Share menu and choose Add to Home Screen."
      )
    );
    return;
  }

  if (!window.isSecureContext && !/^(localhost|127\.0\.0\.1)$/i.test(location.hostname)) {
    window.alert("Install prompt is unavailable on non-HTTPS pages. Please open this site over HTTPS.");
    return;
  }

  window.alert(uiText("pwa.manualAlert", "If your browser does not show an install prompt, open the browser menu and tap Add to Home Screen."));
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
    range === "today"
      ? uiText("stats.title.today", "Today's Color")
      : range === "week"
        ? uiText("stats.title.week", "Weekly Color")
        : range === "month"
          ? uiText("stats.title.month", "Monthly Color")
          : uiText("stats.title.custom", "Custom Color");
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
  const templates = ensureCategoryTemplates(category);
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${templates
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
    { id: "today", label: uiText("stats.tab.today", "Today") },
    { id: "week", label: uiText("stats.tab.week", "Week") },
    { id: "month", label: uiText("stats.tab.month", "Month") },
    { id: "custom", label: uiText("stats.tab.custom", "Custom") },
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

  dom.statsModeTabs.innerHTML = `<span>${uiText("stats.view", "View")}:</span><strong>${uiText("stats.category", "Category")}</strong>`;

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
    renderTaskGroup("overdue", uiText("group.overdue", "Overdue"), groups.overdue),
    renderTaskGroup("today", uiText("group.today", "Today"), groups.today),
    renderTaskGroup("flexible", uiText("group.flexible", "Flexible"), groups.flexible),
    renderTaskGroup("completed", uiText("group.completed", "Completed"), groups.completed, true),
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
      <div class="timer-strip-shell ${state.activeTimer.running ? "is-running" : "is-paused"}" style="--timer-wash:${alphaColor(timerState.color, state.activeTimer.running ? 0.2 : 0.12)}; --timer-color:${timerState.color};">
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
          <span class="mini-pill inline-tag" style="--tag-color:${visual.color}; background:${alphaColor(visual.color, 0.14)};">${escapeHtml(visual.categoryName)}</span>
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
  if (task) {
    state.ui.createTaskSelection = {
      folderId: task.folderId,
      categoryId: task.categoryId,
      templateId: task.templateId,
    };
  } else if (!state.ui.createTaskSelection) {
    state.ui.createTaskSelection = null;
  }

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

// Final overrides for settings / AI planner / stats filters.
function refreshDynamicDomRefs() {
  dom.pages = [...document.querySelectorAll(".page")];
  dom.bottomNav = document.querySelector(".bottom-nav");
  dom.themeGrid = document.getElementById("theme-grid");
  dom.pwaInstallButton = document.getElementById("pwa-install-button");
  dom.nextTimePriorityToggle = document.getElementById("next-time-priority-toggle");
  dom.nextImportantPriorityToggle = document.getElementById("next-important-priority-toggle");
  dom.dayStartInput = document.getElementById("day-start-input");
  dom.defaultDurationSelect = document.getElementById("default-duration-select");
  dom.completedDefaultToggle = document.getElementById("completed-default-toggle");
  dom.customBackgroundRow = document.getElementById("custom-background-row");
  dom.customBackgroundInput = document.getElementById("custom-background-input");
  dom.customBackgroundValue = document.getElementById("custom-background-value");
  dom.aiPlannerLink = document.getElementById("ai-planner-link");
  dom.defaultDurationRow = document.getElementById("default-duration-row");
  dom.defaultDurationValue = document.getElementById("default-duration-value");
  dom.dayStartRow = document.getElementById("day-start-row");
  dom.dayStartValue = document.getElementById("day-start-value");
  dom.aiPageBack = document.getElementById("ai-page-back");
  dom.aiQuestionnaire = document.getElementById("ai-questionnaire");
  dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
  dom.aiPromptOutput = document.getElementById("ai-prompt-output");
  dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
  dom.aiResultInput = document.getElementById("ai-result-input");
  dom.aiPreviewImport = document.getElementById("ai-preview-import");
  dom.aiImportPlan = document.getElementById("ai-import-plan");
  dom.aiPreviewList = document.getElementById("ai-preview-list");
}

function applyTheme() {
  const currentTheme = state.theme === "custom" ? "custom" : "paper";
  dom.body.dataset.theme = currentTheme;
  dom.body.style.removeProperty("--custom-paper-image");
  dom.body.style.removeProperty("background");
  dom.body.classList.remove("has-custom-background");

  if (currentTheme === "custom" && state.customBackgroundImage) {
    dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
    dom.body.style.background = `linear-gradient(rgba(250, 248, 244, 0.72), rgba(250, 248, 244, 0.72)), url("${state.customBackgroundImage}") center / cover no-repeat fixed`;
    dom.body.classList.add("has-custom-background");
  }

  applyBodyFlags();
}

function ensureSettingsStructure() {
  const settingsPage = document.querySelector('.page[data-page="settings"]');
  const settingsSheet = settingsPage?.querySelector(".settings-sheet");
  if (!settingsSheet) return;

  const heroDate = settingsPage.querySelector(".hero-date");
  const heroNote = settingsPage.querySelector(".hero-note");
  if (heroDate) heroDate.textContent = "";
  if (heroNote) heroNote.remove();

  settingsSheet.dataset.layout = "v6";
  settingsSheet.classList.add("settings-sheet-clean");
  settingsSheet.innerHTML = `
    <section class="settings-group">
      <div class="settings-group-title">App</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link settings-install-row" id="pwa-install-button" type="button">
          <span class="settings-row-label">Install to Home Screen</span>
        </button>
        <button class="settings-row settings-row-link settings-install-row" id="apk-download-button" type="button">
          <span class="settings-row-label">Download APK</span>
        </button>
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Planning</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link" id="ai-planner-link" type="button">
          <span class="settings-row-label">AI 生成日程</span>
          <span class="settings-row-arrow" aria-hidden="true">›</span>
        </button>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先最近时间任务</span>
          <input type="checkbox" id="next-time-priority-toggle" />
        </label>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先重要任务</span>
          <input type="checkbox" id="next-important-priority-toggle" />
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
        <div class="settings-theme-grid" id="theme-grid"></div>
        <button class="settings-row settings-row-link" id="custom-background-row" type="button">
          <span class="settings-row-label">上传背景图</span>
          <span class="settings-row-trail">
            <span id="custom-background-value">未上传</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </span>
        </button>
        <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Preferences</div>
      <div class="settings-list-block">
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">Completed 默认展开</span>
          <input type="checkbox" id="completed-default-toggle" />
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
  let aiPage = document.querySelector('[data-page="ai-planner"]');
  const settingsPage = document.querySelector('[data-page="settings"]');
  if (!settingsPage) return;
  if (!aiPage) {
    aiPage = document.createElement("section");
    aiPage.className = "page";
    aiPage.dataset.page = "ai-planner";
    settingsPage.insertAdjacentElement("afterend", aiPage);
  }

  aiPage.innerHTML = `
    <header class="page-hero ai-page-hero">
      <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
      <div class="hero-heading">
        <div><h1>AI 生成日程</h1></div>
      </div>
    </header>

    <section class="paper-sheet ai-sheet ai-sheet-compact">
      <section class="ai-step ai-cycle-select-block">
        <div class="settings-group-title">三层规划体系</div>
        <label class="filter-pill ai-cycle-select-pill">
          <span>规划层级</span>
          <select id="ai-cycle-select">
            <option value="overall">总体规划</option>
            <option value="weekly">月 / 周规划</option>
            <option value="daily">今日 / 明日</option>
          </select>
        </label>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">填写问卷</div>
        <div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">生成 Prompt</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 Prompt</button>
          <textarea id="ai-prompt-output" rows="12" readonly placeholder="Prompt"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">复制给 AI</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 Prompt</button>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">粘贴结果</div>
        <div class="settings-list-block ai-actions">
          <textarea id="ai-result-input" rows="10" placeholder="粘贴 AI 输出"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">预览导入</div>
        <div class="settings-list-block ai-actions">
          <div class="sheet-button-row ai-import-actions">
            <button class="ghost-button ai-action-button" id="ai-preview-import" type="button">预览</button>
            <button class="ghost-button ai-action-button" id="ai-import-plan" type="button">导入 To-do</button>
          </div>
          <div class="ai-preview-list" id="ai-preview-list"></div>
        </div>
      </section>
    </section>
  `;
}

function normalizeStatsCascadeState() {
  let folderValue = state.ui.statsFolderFilter || "all";
  let categoryValue = state.ui.statsSubcategoryFilter || "all";
  let templateValue = state.ui.statsTemplateFilter || "all";
  const legacy = state.ui.statsCategoryFilter || "all";

  if (!state.ui.statsFolderFilter && !state.ui.statsSubcategoryFilter && !state.ui.statsTemplateFilter) {
    if (legacy.startsWith("folder:")) {
      folderValue = legacy;
    } else if (legacy.startsWith("category:")) {
      const categoryId = legacy.slice(9);
      const owner = state.folders.find((folder) => folder.categories.some((category) => category.id === categoryId));
      folderValue = owner ? `folder:${owner.id}` : "all";
      categoryValue = legacy;
    } else if (legacy.startsWith("template:")) {
      const templateId = legacy.slice(9);
      outer: for (const folder of state.folders) {
        for (const category of folder.categories) {
          const template = category.templates.find((entry) => entry.id === templateId);
          if (template) {
            folderValue = `folder:${folder.id}`;
            categoryValue = `category:${category.id}`;
            templateValue = legacy;
            break outer;
          }
        }
      }
    }
  }

  state.ui.statsFolderFilter = folderValue;
  state.ui.statsSubcategoryFilter = categoryValue;
  state.ui.statsTemplateFilter = templateValue;
}

function updateStatsFilterState() {
  const folderValue = state.ui.statsFolderFilter || "all";
  const categoryValue = state.ui.statsSubcategoryFilter || "all";
  const templateValue = state.ui.statsTemplateFilter || "all";

  if (templateValue !== "all") state.ui.statsCategoryFilter = templateValue;
  else if (categoryValue !== "all") state.ui.statsCategoryFilter = categoryValue;
  else if (folderValue !== "all") state.ui.statsCategoryFilter = folderValue;
  else state.ui.statsCategoryFilter = "all";
}

function matchesStatsCategoryFilter(session) {
  const filterValue = state.ui.statsCategoryFilter || "all";
  if (filterValue === "all") return true;

  const task = state.tasks.find((entry) => entry.id === session.taskId);
  if (!task) return false;
  if (filterValue.startsWith("folder:")) return task.folderId === filterValue.slice(7);
  if (filterValue.startsWith("category:")) return task.categoryId === filterValue.slice(9);
  if (filterValue.startsWith("template:")) return task.templateId === filterValue.slice(9);
  return true;
}

function renderStatsFilters() {
  normalizeStatsCascadeState();

  const host = document.querySelector(".filter-row.filter-row-single");
  if (!host) return;

  const folderValue = state.ui.statsFolderFilter || "all";
  const categoryValue = state.ui.statsSubcategoryFilter || "all";
  const templateValue = state.ui.statsTemplateFilter || "all";

  const folderOptions = state.folders
    .map((folder) => `<option value="folder:${folder.id}">${escapeHtml(folder.name)}</option>`)
    .join("");

  let categorySection = "";
  let templateSection = "";

  if (folderValue !== "all") {
    const folderId = folderValue.slice(7);
    const folder = state.folders.find((entry) => entry.id === folderId);
    const categoryOptions = (folder?.categories || [])
      .map((category) => `<option value="category:${category.id}">${escapeHtml(category.name)}</option>`)
      .join("");

    categorySection = `
      <label class="filter-pill">
        <span>二级分类</span>
        <select id="stats-subcategory-filter">
          <option value="all">All</option>
          ${categoryOptions}
        </select>
      </label>
    `;

    if (categoryValue !== "all") {
      const categoryId = categoryValue.slice(9);
      const category = folder?.categories.find((entry) => entry.id === categoryId);
      const templateOptions = (category?.templates || [])
        .map((template) => `<option value="template:${template.id}">${escapeHtml(template.name)}</option>`)
        .join("");

      templateSection = `
        <label class="filter-pill">
          <span>三级任务</span>
          <select id="stats-template-filter">
            <option value="all">All</option>
            ${templateOptions}
          </select>
        </label>
      `;
    }
  }

  host.innerHTML = `
    <label class="filter-pill">
      <span>一级分类</span>
      <select id="stats-folder-filter">
        <option value="all">All</option>
        ${folderOptions}
      </select>
    </label>
    ${categorySection}
    ${templateSection}
  `;

  const folderSelect = document.getElementById("stats-folder-filter");
  const categorySelect = document.getElementById("stats-subcategory-filter");
  const templateSelect = document.getElementById("stats-template-filter");

  folderSelect.value = folderValue;
  if (categorySelect) categorySelect.value = categoryValue;
  if (templateSelect) templateSelect.value = templateValue;

  folderSelect.onchange = (event) => {
    state.ui.statsFolderFilter = event.target.value;
    state.ui.statsSubcategoryFilter = "all";
    state.ui.statsTemplateFilter = "all";
    updateStatsFilterState();
    state.ui.selectedSegment = null;
    renderStats();
    persistState();
  };

  if (categorySelect) {
    categorySelect.onchange = (event) => {
      state.ui.statsSubcategoryFilter = event.target.value;
      state.ui.statsTemplateFilter = "all";
      updateStatsFilterState();
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  }

  if (templateSelect) {
    templateSelect.onchange = (event) => {
      state.ui.statsTemplateFilter = event.target.value;
      updateStatsFilterState();
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  }
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
    note: `${formatDuration(item.minutes)}`,
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
          <strong class="breakdown-time">${formatDuration(item.minutes)}</strong>
        </article>
      `
    )
    .join("");
}

function handleCustomBackgroundUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.customBackgroundImage = String(reader.result || "");
    state.theme = "custom";
    applyTheme();
    renderSettings();
    persistState();
    if (dom.customBackgroundInput) dom.customBackgroundInput.value = "";
  };
  reader.readAsDataURL(file);
}

function renderAiPlanner() {
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  if (!dom.aiQuestionnaire) return;

  const cycle = state.ai.cycle || "overall";
  const cycleSelect = document.getElementById("ai-cycle-select");
  if (cycleSelect) {
    cycleSelect.value = cycle;
    cycleSelect.onchange = (event) => {
      state.ai.cycle = event.target.value;
      state.ui.aiPreviewItems = [];
      renderAiPlanner();
      persistState();
    };
  }

  dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);
  bindAiQuestionnaireFields();

  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
  if (dom.aiResultInput) {
    dom.aiResultInput.value = state.ai.resultText || "";
    dom.aiResultInput.oninput = (event) => {
      state.ai.resultText = event.target.value;
      persistState();
    };
  }
  if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
  if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
  if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
  if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
  if (dom.aiPageBack) {
    dom.aiPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };
  }

  renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();

  dom.themeGrid.innerHTML = [
    { id: "paper", name: "Simple Paper" },
    { id: "custom", name: "Custom" },
  ]
    .map(
      (theme) => `
        <button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
          <span class="settings-theme-radio" aria-hidden="true"></span>
          <span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span>
        </button>
      `
    )
    .join("");

  if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
  if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
  if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";

  const apkButton = document.getElementById("apk-download-button");
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (dom.pwaInstallButton) {
    dom.pwaInstallButton.textContent = isStandalone ? "Installed" : "Install to Home Screen";
    dom.pwaInstallButton.disabled = isStandalone;
    dom.pwaInstallButton.onclick = handlePwaInstall;
  }
  if (apkButton) {
    apkButton.onclick = () => {
      window.open("https://github.com/lumeva/Colorful-time/releases", "_blank", "noopener");
    };
  }

  dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
    button.onclick = () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    };
  });

  if (dom.aiPlannerLink) {
    dom.aiPlannerLink.onclick = () => {
      state.currentPage = "ai-planner";
      renderAll();
      persistState();
    };
  }
  if (dom.defaultDurationRow) {
    dom.defaultDurationRow.onclick = () => {
      const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
      if (raw == null) return;
      const minutes = Number(raw);
      if (!Number.isFinite(minutes) || minutes <= 0) return;
      state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
      renderSettings();
      persistState();
    };
  }
  if (dom.dayStartRow) {
    dom.dayStartRow.onclick = () => {
      const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
      if (raw == null) return;
      const value = raw.trim();
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) return;
      state.dayStart = value;
      renderSettings();
      persistState();
    };
  }
  if (dom.completedDefaultToggle) {
    dom.completedDefaultToggle.onchange = (event) => {
      const checked = Boolean(event.target.checked);
      state.showCompletedOpen = checked;
      state.ui.groupOpen.completed = checked;
      renderHome();
      renderSettings();
      persistState();
    };
  }
  if (dom.nextTimePriorityToggle) {
    dom.nextTimePriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeTime = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.nextImportantPriorityToggle) {
    dom.nextImportantPriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeImportant = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.customBackgroundRow) {
    dom.customBackgroundRow.onclick = () => {
      if (!dom.customBackgroundInput) return;
      dom.customBackgroundInput.value = "";
      dom.customBackgroundInput.click();
    };
  }
  if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
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
  const templates = ensureCategoryTemplates(category);
  const templateMarkup = category.expanded
    ? `
      <div class="template-list-flat">
        ${templates
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
      <div class="category-line" data-toggle-category-row="${category.id}" data-parent-folder="${folder.id}" data-category-key="${folder.id}::${category.id}" role="button" tabindex="0">
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
  const tree = dom.tasksTree;
  if (!tree) return;

  const sameId = (left, right) => String(left ?? "") === String(right ?? "");
  const toggleCategory = (folderId, categoryId) => {
    let category = null;
    if (folderId) {
      const folder = state.folders.find((item) => sameId(item.id, folderId));
      category = folder?.categories.find((item) => sameId(item.id, categoryId)) || null;
    }
    if (!category) {
      category = getAllCategories().find((item) => sameId(item.id, categoryId)) || null;
    }
    if (!category) return;
    category.expanded = !category.expanded;
    renderTasksTree();
    persistState();
  };

  const toggleFolder = (folderId) => {
    const folder = state.folders.find((item) => sameId(item.id, folderId));
    if (!folder) return;
    folder.expanded = !folder.expanded;
    renderTasksTree();
    persistState();
  };

  if (tree.dataset.boundTreeEventsV3 === "true") return;
  tree.dataset.boundTreeEventsV3 = "true";

  tree.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const editButton = target.closest("[data-edit-node]");
    if (editButton && tree.contains(editButton)) {
      openTreeEditor({
        mode: "edit",
        type: editButton.dataset.editNode,
        nodeId: editButton.dataset.nodeId,
        parentFolderId: editButton.dataset.parentFolder || null,
        parentCategoryId: editButton.dataset.parentCategory || null,
      });
      return;
    }

    const addButton = target.closest("[data-add-child]");
    if (addButton && tree.contains(addButton)) {
      if (addButton.dataset.addChild === "task") {
        state.ui.createTaskSelection = {
          folderId: addButton.dataset.parentFolder || null,
          categoryId: addButton.dataset.parentCategory || null,
          templateId: null,
        };
        prepareTaskDraft();
        return;
      }
      openTreeEditor({
        mode: "create",
        type: addButton.dataset.addChild,
        parentFolderId: addButton.dataset.parentFolder || null,
        parentCategoryId: addButton.dataset.parentCategory || null,
      });
      return;
    }

    const folderButton = target.closest("[data-toggle-folder]");
    if (folderButton && tree.contains(folderButton)) {
      toggleFolder(folderButton.dataset.toggleFolder);
      return;
    }

    const categoryButton = target.closest("[data-toggle-category]");
    if (categoryButton && tree.contains(categoryButton)) {
      const parentRow = categoryButton.closest("[data-toggle-category-row]");
      toggleCategory(
        categoryButton.dataset.parentFolder || parentRow?.dataset.parentFolder || null,
        categoryButton.dataset.toggleCategory
      );
      return;
    }

    const folderRow = target.closest("[data-toggle-folder-row]");
    if (folderRow && tree.contains(folderRow)) {
      toggleFolder(folderRow.dataset.toggleFolderRow);
      return;
    }

    const categoryRow = target.closest("[data-toggle-category-row]");
    if (categoryRow && tree.contains(categoryRow)) {
      const key = categoryRow.dataset.categoryKey || "";
      if (key.includes("::")) {
        const [folderId, categoryId] = key.split("::");
        toggleCategory(folderId, categoryId);
        return;
      }
      toggleCategory(categoryRow.dataset.parentFolder, categoryRow.dataset.toggleCategoryRow);
    }
  });

  tree.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("button,input,select,textarea,a")) return;
    const row = target.closest("[data-toggle-folder-row],[data-toggle-category-row]");
    if (!row || !tree.contains(row)) return;
    event.preventDefault();
    row.click();
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
    const labelNode = item.querySelector("span:last-child");
    if (!labelNode) return;
    if (item.dataset.target === "home") labelNode.textContent = uiText("nav.home", "Home");
    if (item.dataset.target === "stats") labelNode.textContent = uiText("nav.stats", "Stats");
    if (item.dataset.target === "tasks") labelNode.textContent = uiText("nav.tasks", "Tasks");
    if (item.dataset.target === "settings") labelNode.textContent = uiText("nav.settings", "Settings");
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
            : `<p class="empty-note">${groupKey === "flexible" ? "No flexible tasks." : "This section is empty right now."}</p>`
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
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  const timeMarkup = isCompleted
    ? `<div class="task-time-block">${timeText}</div>`
    : `
        <button
          class="task-time-edit ${task.scheduledMinutes == null ? "is-empty" : ""}"
          data-task-time="${task.id}"
          type="button"
          aria-label="Set time for ${escapeHtml(task.name)}"
        >
          ${timeText}
        </button>
      `;

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
          ${task.important ? '<span class="task-star" aria-hidden="true">★</span>' : ""}
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
    renderTaskGroup("overdue", uiText("group.overdue", "Overdue"), groups.overdue),
    renderTaskGroup("today", uiText("group.today", "Today"), groups.today),
    renderTaskGroup("flexible", uiText("group.flexible", "Flexible"), groups.flexible),
    renderTaskGroup("completed", uiText("group.completed", "Completed"), groups.completed, true),
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

  dom.todoGroups.querySelectorAll("[data-task-time]").forEach((button) => {
    button.onclick = () => openTaskTimeSheet("inline", button.dataset.taskTime);
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

function getTaskTimeSheetElement() {
  return document.getElementById("time-sheet");
}

function getTaskTimeSheetTitleElement() {
  return document.querySelector("#time-sheet .sheet-header h2");
}

function getTaskTimeWheelElement() {
  return document.getElementById("task-time-wheel");
}

function getDefaultTaskTimeMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function scrollSelectedTaskTimeOptions() {
  document.querySelectorAll(".time-wheel-option.is-selected").forEach((option) => {
    option.scrollIntoView({ block: "center", inline: "nearest" });
  });
}

function setTaskTimeWheelValue(totalMinutes, options = {}) {
  const shouldScroll = options.scroll !== false;
  const nextValue = totalMinutes == null ? "" : formatInputTime((totalMinutes + 1440) % 1440);
  dom.taskTimeInput.value = nextValue;
  updateTaskTimeSummary();
  renderTaskTimeWheel();
  if (shouldScroll) requestAnimationFrame(scrollSelectedTaskTimeOptions);
}

function adjustTaskTimeWheel(deltaMinutes) {
  const baseMinutes = parseTimeString(dom.taskTimeInput.value);
  const nextMinutes = (baseMinutes == null ? getDefaultTaskTimeMinutes() : baseMinutes) + deltaMinutes;
  setTaskTimeWheelValue(((nextMinutes % 1440) + 1440) % 1440);
}

function renderTaskTimeWheel() {
  const wheel = getTaskTimeWheelElement();
  if (!wheel || !dom.taskTimeInput) return;

  const selectedMinutes = parseTimeString(dom.taskTimeInput.value);
  const selectedHour = selectedMinutes == null ? null : Math.floor(selectedMinutes / 60);
  const selectedMinute = selectedMinutes == null ? null : selectedMinutes % 60;

  const hourItems = Array.from({ length: 24 }, (_, hour) => {
    const active = hour === selectedHour;
    return `
      <button
        class="time-wheel-option ${active ? "is-selected" : ""}"
        data-time-unit="hour"
        data-time-value="${hour}"
        type="button"
      >
        ${String(hour).padStart(2, "0")}
      </button>
    `;
  }).join("");

  const minuteItems = Array.from({ length: 60 }, (_, minute) => {
    const active = minute === selectedMinute;
    return `
      <button
        class="time-wheel-option ${active ? "is-selected" : ""}"
        data-time-unit="minute"
        data-time-value="${minute}"
        type="button"
      >
        ${String(minute).padStart(2, "0")}
      </button>
    `;
  }).join("");

  wheel.innerHTML = `
    <div class="time-wheel-shell">
      <div class="time-wheel-column" data-time-column="hour">${hourItems}</div>
      <div class="time-wheel-divider" aria-hidden="true">:</div>
      <div class="time-wheel-column" data-time-column="minute">${minuteItems}</div>
    </div>
  `;

  wheel.querySelectorAll("[data-time-unit]").forEach((button) => {
    button.onclick = () => {
      const unit = button.dataset.timeUnit;
      const value = Number(button.dataset.timeValue);
      const currentMinutes = parseTimeString(dom.taskTimeInput.value);
      const currentHour = currentMinutes == null ? new Date().getHours() : Math.floor(currentMinutes / 60);
      const currentMinute = currentMinutes == null ? new Date().getMinutes() : currentMinutes % 60;
      const nextHour = unit === "hour" ? value : currentHour;
      const nextMinute = unit === "minute" ? value : currentMinute;
      setTaskTimeWheelValue(nextHour * 60 + nextMinute, { scroll: true });
    };
  });

  requestAnimationFrame(scrollSelectedTaskTimeOptions);
}

function openTaskTimeSheet(mode = "draft", taskId = null) {
  const sheet = getTaskTimeSheetElement();
  if (!sheet || !dom.taskTimeInput) return;

  taskTimeSheetMode = mode;
  taskTimeSheetTaskId = taskId;
  sheet.classList.toggle("is-inline-time-context", mode === "inline");

  const title = getTaskTimeSheetTitleElement();
  if (title) title.textContent = mode === "inline" ? "Set time" : "Choose when";

  if (mode === "inline") {
    const task = state.tasks.find((entry) => entry.id === taskId);
    if (!task) return;
    dom.taskTimeInput.value = task.scheduledMinutes != null ? formatInputTime(task.scheduledMinutes) : "";
  }

  updateTaskTimeSummary();
  renderTaskTimeWheel();
  openSheet("time-sheet");
}

function clearTaskTimeSelection() {
  if (taskTimeSheetMode === "inline" && taskTimeSheetTaskId) {
    const task = state.tasks.find((entry) => entry.id === taskTimeSheetTaskId);
    if (task) task.scheduledMinutes = null;
    taskTimeSheetMode = "draft";
    taskTimeSheetTaskId = null;
    closeAllSheets();
    renderHome();
    persistState();
    return;
  }

  dom.taskDateInput.value = "";
  dom.taskTimeInput.value = "";
  getTaskDurationInputElement().value = "";
  state.ui.taskDatePreset = "none";
  updateTaskTimeSummary();
  renderTaskTimeWheel();
  openSheet("task-sheet");
}

function applyTaskTimeSelection() {
  if (taskTimeSheetMode === "inline" && taskTimeSheetTaskId) {
    const task = state.tasks.find((entry) => entry.id === taskTimeSheetTaskId);
    if (task) task.scheduledMinutes = parseTimeString(dom.taskTimeInput.value);
    taskTimeSheetMode = "draft";
    taskTimeSheetTaskId = null;
    closeAllSheets();
    renderHome();
    persistState();
    return;
  }

  updateTaskTimeSummary();
  renderTaskTimeWheel();
  openSheet("task-sheet");
}

function bindTaskTimeSheetControls() {
  const timeBack = document.getElementById("time-back-button");
  if (timeBack) {
    timeBack.onclick = () => {
      if (taskTimeSheetMode === "inline") {
        taskTimeSheetMode = "draft";
        taskTimeSheetTaskId = null;
        closeAllSheets();
        renderHome();
        return;
      }
      openSheet("task-sheet");
    };
  }

  if (dom.taskTimeButton) {
    dom.taskTimeButton.onclick = () => openTaskTimeSheet("draft");
  }

  if (dom.taskTimeClear) {
    dom.taskTimeClear.onclick = () => clearTaskTimeSelection();
  }

  if (dom.taskTimeApply) {
    dom.taskTimeApply.onclick = () => applyTaskTimeSelection();
  }

  document.querySelectorAll("[data-time-step]").forEach((button) => {
    button.onclick = () => adjustTaskTimeWheel(Number(button.dataset.timeStep || 0));
  });
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

if (!window.__colorfulTimeFinalSettingsPatchV2) {
  window.__colorfulTimeFinalSettingsPatchV2 = true;

  refreshDynamicDomRefs = function () {
    dom.pages = [...document.querySelectorAll(".page")];
    dom.bottomNav = document.querySelector(".bottom-nav");
    dom.themeGrid = document.getElementById("theme-grid");
    dom.pwaInstallButton = document.getElementById("pwa-install-button");
    dom.pwaInstallNote = document.getElementById("pwa-install-note");
    dom.apkDownloadButton = document.getElementById("apk-download-button");
    dom.nextTimePriorityToggle = document.getElementById("next-time-priority-toggle");
    dom.nextImportantPriorityToggle = document.getElementById("next-important-priority-toggle");
    dom.dayStartInput = document.getElementById("day-start-input");
    dom.defaultDurationSelect = document.getElementById("default-duration-select");
    dom.completedDefaultToggle = document.getElementById("completed-default-toggle");
    dom.reduceTextureToggle = document.getElementById("reduce-texture-toggle");
    dom.customBackgroundRow = document.getElementById("custom-background-row");
    dom.customBackgroundInput = document.getElementById("custom-background-input");
    dom.customBackgroundValue = document.getElementById("custom-background-value");
    dom.aiPlannerLink = document.getElementById("ai-planner-link");
    dom.defaultDurationRow = document.getElementById("default-duration-row");
    dom.defaultDurationValue = document.getElementById("default-duration-value");
    dom.dayStartRow = document.getElementById("day-start-row");
    dom.dayStartValue = document.getElementById("day-start-value");
    dom.aiPageBack = document.getElementById("ai-page-back");
    dom.aiCycleSelect = document.getElementById("ai-cycle-select");
    dom.aiQuestionnaire = document.getElementById("ai-questionnaire");
    dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
    dom.aiPromptOutput = document.getElementById("ai-prompt-output");
    dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
    dom.aiResultInput = document.getElementById("ai-result-input");
    dom.aiPreviewImport = document.getElementById("ai-preview-import");
    dom.aiImportPlan = document.getElementById("ai-import-plan");
    dom.aiPreviewList = document.getElementById("ai-preview-list");
    dom.statsFolderFilter = document.getElementById("stats-folder-filter");
    dom.statsSubcategoryFilter = document.getElementById("stats-subcategory-filter");
    dom.statsTemplateFilter = document.getElementById("stats-template-filter");
  };

  applyTheme = function () {
    const visualTheme = state.theme === "adventure" ? "adventure" : "paper";
    dom.body.dataset.theme = visualTheme;
    dom.body.classList.remove("has-custom-background");
    dom.body.style.removeProperty("--custom-paper-image");
    dom.body.style.removeProperty("background");
    if (state.theme === "custom" && state.customBackgroundImage) {
      dom.body.classList.add("has-custom-background");
      dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
      dom.body.style.background = `linear-gradient(rgba(250, 248, 244, 0.72), rgba(250, 248, 244, 0.72)), url("${state.customBackgroundImage}") center / cover no-repeat fixed`;
    }
    applyBodyFlags();
  };

  ensureSettingsStructure = function () {
    const settingsPage = document.querySelector('.page[data-page="settings"]');
    const settingsSheet = settingsPage?.querySelector(".settings-sheet");
    if (!settingsSheet) return;

    const heroDate = settingsPage.querySelector(".hero-date");
    const heroNote = settingsPage.querySelector(".hero-note");
    if (heroDate) heroDate.textContent = "";
    if (heroNote) heroNote.remove();

    settingsSheet.dataset.layout = "v10";
    settingsSheet.classList.add("settings-sheet-clean");
    settingsSheet.innerHTML = `
      <section class="settings-group">
        <div class="settings-group-title">App</div>
        <div class="settings-list-block settings-install-actions">
          <button class="settings-install-button" id="pwa-install-button" type="button">Install to Home Screen</button>
          <button class="settings-install-button" id="apk-download-button" type="button">Download APK</button>
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
            <input type="checkbox" id="next-time-priority-toggle" />
          </label>
          <label class="settings-row settings-row-toggle">
            <span class="settings-row-label">优先重要任务</span>
            <input type="checkbox" id="next-important-priority-toggle" />
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
          <div class="settings-theme-grid" id="theme-grid"></div>
          <button class="settings-row settings-row-link" id="custom-background-row" type="button">
            <span class="settings-row-label">背景图片</span>
            <span class="settings-row-trail">
              <span id="custom-background-value">未上传</span>
              <span class="settings-row-arrow" aria-hidden="true">›</span>
            </span>
          </button>
          <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
        </div>
      </section>

      <section class="settings-group">
        <div class="settings-group-title">Preferences</div>
        <div class="settings-list-block">
          <label class="settings-row settings-row-toggle">
            <span class="settings-row-label">Completed 默认展开</span>
            <input type="checkbox" id="completed-default-toggle" />
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
  };

  ensureAiPlannerPage = function () {
    let aiPage = document.querySelector('[data-page="ai-planner"]');
    const settingsPage = document.querySelector('[data-page="settings"]');
    if (!settingsPage) return;
    if (!aiPage) {
      aiPage = document.createElement("section");
      aiPage.className = "page";
      aiPage.dataset.page = "ai-planner";
      settingsPage.insertAdjacentElement("afterend", aiPage);
    }

    aiPage.innerHTML = `
      <header class="page-hero ai-page-hero">
        <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
        <div class="hero-heading">
          <div><h1>AI 生成日程</h1></div>
        </div>
      </header>

      <section class="paper-sheet ai-sheet ai-sheet-compact">
        <section class="ai-step ai-cycle-select-block">
          <div class="settings-group-title">规划层级</div>
          <label class="filter-pill ai-cycle-select-pill">
            <span>层级</span>
            <select id="ai-cycle-select">
              <option value="overall">总体规划</option>
              <option value="weekly">月 / 周规划</option>
              <option value="daily">今日 / 明日</option>
            </select>
          </label>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">填写问卷</div>
          <div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">生成 Prompt</div>
          <div class="settings-list-block ai-actions">
            <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 Prompt</button>
            <textarea id="ai-prompt-output" rows="12" readonly placeholder="生成后的 Prompt 会出现在这里"></textarea>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">复制给 AI · 粘贴结果</div>
          <div class="settings-list-block ai-actions">
            <button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 Prompt</button>
            <textarea id="ai-result-input" rows="10" placeholder="把 AI 返回的结构化计划粘贴到这里"></textarea>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">预览导入</div>
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
  };

  const normalizeStatsCascadeState = function () {
    let folderValue = state.ui.statsFolderFilter || "all";
    let categoryValue = state.ui.statsSubcategoryFilter || "all";
    let templateValue = state.ui.statsTemplateFilter || "all";
    const legacy = state.ui.statsCategoryFilter || "all";
    const categories = getAllCategories();
    const templates = getAllTemplates();

    if (!state.ui.statsFolderFilter && !state.ui.statsSubcategoryFilter && !state.ui.statsTemplateFilter) {
      if (legacy.startsWith("folder:")) folderValue = legacy.slice(7);
      else if (legacy.startsWith("category:")) categoryValue = legacy.slice(9);
      else if (legacy.startsWith("template:")) templateValue = legacy.slice(9);
      else if (legacy !== "all") {
        if (state.folders.some((folder) => folder.id === legacy)) folderValue = legacy;
        else if (categories.some((category) => category.id === legacy)) categoryValue = legacy;
        else if (templates.some((template) => template.id === legacy)) templateValue = legacy;
      }
    }

    if (templateValue !== "all") {
      const template = templates.find((entry) => entry.id === templateValue);
      if (template) {
        categoryValue = template.categoryId;
        folderValue = template.folderId;
      } else {
        templateValue = "all";
      }
    }

    if (categoryValue !== "all") {
      const ownerFolder = state.folders.find((folder) => folder.categories.some((entry) => entry.id === categoryValue));
      if (ownerFolder) folderValue = ownerFolder.id;
      else {
        categoryValue = "all";
        templateValue = "all";
      }
    }

    if (folderValue !== "all") {
      const folder = state.folders.find((entry) => entry.id === folderValue);
      if (!folder) {
        folderValue = "all";
        categoryValue = "all";
        templateValue = "all";
      } else if (categoryValue !== "all" && !folder.categories.some((entry) => entry.id === categoryValue)) {
        categoryValue = "all";
        templateValue = "all";
      } else if (categoryValue === "all") {
        templateValue = "all";
      } else {
        const category = folder.categories.find((entry) => entry.id === categoryValue);
        if (templateValue !== "all" && !category?.templates.some((entry) => entry.id === templateValue)) templateValue = "all";
      }
    } else {
      categoryValue = "all";
      templateValue = "all";
    }

    state.ui.statsFolderFilter = folderValue;
    state.ui.statsSubcategoryFilter = categoryValue;
    state.ui.statsTemplateFilter = templateValue;
    if (templateValue !== "all") state.ui.statsCategoryFilter = `template:${templateValue}`;
    else if (categoryValue !== "all") state.ui.statsCategoryFilter = `category:${categoryValue}`;
    else if (folderValue !== "all") state.ui.statsCategoryFilter = `folder:${folderValue}`;
    else state.ui.statsCategoryFilter = "all";
  };

  matchesStatsCategoryFilter = function (session) {
    normalizeStatsCascadeState();
    const folderValue = state.ui.statsFolderFilter || "all";
    const categoryValue = state.ui.statsSubcategoryFilter || "all";
    const templateValue = state.ui.statsTemplateFilter || "all";
    const task = session.taskId ? state.tasks.find((entry) => entry.id === session.taskId) : null;
    const folderId = task?.folderId || null;
    const categoryId = session.categoryId || task?.categoryId || null;
    const templateId = session.templateId || task?.templateId || null;

    if (folderValue !== "all" && folderId !== folderValue) return false;
    if (categoryValue !== "all" && categoryId !== categoryValue) return false;
    if (templateValue !== "all" && templateId !== templateValue) return false;
    return true;
  };

  renderStatsFilters = function () {
    normalizeStatsCascadeState();
    const host = dom.statsCategoryFilter?.closest(".filter-row") || document.querySelector(".filter-row.filter-row-single");
    if (!host) return;

    const folderValue = state.ui.statsFolderFilter || "all";
    const categoryValue = state.ui.statsSubcategoryFilter || "all";
    const templateValue = state.ui.statsTemplateFilter || "all";
    const selectedFolder = folderValue === "all" ? null : state.folders.find((folder) => folder.id === folderValue) || null;
    const selectedCategory = selectedFolder && categoryValue !== "all"
      ? selectedFolder.categories.find((category) => category.id === categoryValue) || null
      : null;

    host.classList.add("filter-row-single");
    host.innerHTML = `
      <div class="filter-cascade-stack">
        <label class="filter-pill">
          <span>一级分类</span>
          <select id="stats-folder-filter">
            <option value="all">All</option>
            ${state.folders.map((folder) => `<option value="${folder.id}">${escapeHtml(folder.name)}</option>`).join("")}
          </select>
        </label>
        ${
          selectedFolder
            ? `
              <label class="filter-pill">
                <span>二级分类</span>
                <select id="stats-subcategory-filter">
                  <option value="all">All</option>
                  ${selectedFolder.categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`).join("")}
                </select>
              </label>
            `
            : ""
        }
        ${
          selectedCategory
            ? `
              <label class="filter-pill">
                <span>三级任务</span>
                <select id="stats-template-filter">
                  <option value="all">All</option>
                  ${selectedCategory.templates.map((template) => `<option value="${template.id}">${escapeHtml(template.name)}</option>`).join("")}
                </select>
              </label>
            `
            : ""
        }
      </div>
    `;

    refreshDynamicDomRefs();

    if (dom.statsFolderFilter) {
      dom.statsFolderFilter.value = folderValue;
      dom.statsFolderFilter.onchange = (event) => {
        state.ui.statsFolderFilter = event.target.value;
        state.ui.statsSubcategoryFilter = "all";
        state.ui.statsTemplateFilter = "all";
        state.ui.selectedSegment = null;
        renderStats();
        persistState();
      };
    }

    if (dom.statsSubcategoryFilter) {
      dom.statsSubcategoryFilter.value = categoryValue;
      dom.statsSubcategoryFilter.onchange = (event) => {
        state.ui.statsSubcategoryFilter = event.target.value;
        state.ui.statsTemplateFilter = "all";
        state.ui.selectedSegment = null;
        renderStats();
        persistState();
      };
    }

    if (dom.statsTemplateFilter) {
      dom.statsTemplateFilter.value = templateValue;
      dom.statsTemplateFilter.onchange = (event) => {
        state.ui.statsTemplateFilter = event.target.value;
        state.ui.selectedSegment = null;
        renderStats();
        persistState();
      };
    }
  };

  buildStatsDataset = function (range) {
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
      note: `${formatDuration(item.minutes)}`,
      ratio: item.minutes / Math.max(totalMinutes, 1),
    }));

    return {
      type: "pie",
      totalMinutes,
      segments,
      selected: segments.find((entry) => entry.key === state.ui.selectedSegment) || null,
      breakdown: grouped,
    };
  };

  renderStatsBreakdown = function (stats) {
    if (!dom.statsBreakdown) return;
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
            <strong class="breakdown-time">${formatDuration(item.minutes)}</strong>
          </article>
        `
      )
      .join("");
  };

  handleCustomBackgroundUpload = function (event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.customBackgroundImage = String(reader.result || "");
      state.theme = "custom";
      applyTheme();
      renderSettings();
      persistState();
      if (dom.customBackgroundInput) dom.customBackgroundInput.value = "";
    };
    reader.readAsDataURL(file);
  };

  renderAiPlanner = function () {
    ensureAiPlannerPage();
    refreshDynamicDomRefs();
    if (!dom.aiQuestionnaire) return;

    const cycle = state.ai.cycle || "overall";
    if (dom.aiCycleSelect) {
      dom.aiCycleSelect.value = cycle;
      dom.aiCycleSelect.onchange = (event) => {
        state.ai.cycle = event.target.value;
        state.ui.aiPreviewItems = [];
        renderAiPlanner();
        persistState();
      };
    }

    dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);
    bindAiQuestionnaireFields();

    if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
    if (dom.aiResultInput) {
      dom.aiResultInput.value = state.ai.resultText || "";
      dom.aiResultInput.oninput = (event) => {
        state.ai.resultText = event.target.value;
        persistState();
      };
    }
    if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
    if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
    if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
    if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
    if (dom.aiPageBack) {
      dom.aiPageBack.onclick = () => {
        state.currentPage = "settings";
        renderAll();
        persistState();
      };
    }

    renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
  };

  renderSettings = function () {
    ensureSettingsStructure();
    ensureAiPlannerPage();
    refreshDynamicDomRefs();
    if (!dom.themeGrid) return;

    dom.themeGrid.innerHTML = [
      { id: "paper", name: "Simple Paper" },
      { id: "custom", name: "Custom" },
    ]
      .map(
        (theme) => `
          <button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
            <span class="settings-theme-radio" aria-hidden="true"></span>
            <span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span>
          </button>
        `
      )
      .join("");

    if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
    if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
    if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
    if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
    if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
    if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
    if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
    if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (dom.pwaInstallButton) {
      dom.pwaInstallButton.textContent = isStandalone ? "Installed" : "Install to Home Screen";
      dom.pwaInstallButton.disabled = isStandalone;
      dom.pwaInstallButton.onclick = handlePwaInstall;
    }
    if (dom.apkDownloadButton) {
      dom.apkDownloadButton.onclick = () => {
        window.open("https://github.com/lumeva/Colorful-time/releases", "_blank", "noopener");
      };
    }

    dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
      button.onclick = () => {
        state.theme = button.dataset.themeCard;
        applyTheme();
        renderSettings();
        persistState();
      };
    });

    if (dom.aiPlannerLink) {
      dom.aiPlannerLink.onclick = () => {
        state.currentPage = "ai-planner";
        renderAll();
        persistState();
      };
    }

    if (dom.defaultDurationRow) {
      dom.defaultDurationRow.onclick = () => {
        const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
        if (raw == null) return;
        const minutes = Number(raw);
        if (!Number.isFinite(minutes) || minutes <= 0) return;
        state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
        renderSettings();
        persistState();
      };
    }

    if (dom.dayStartRow) {
      dom.dayStartRow.onclick = () => {
        const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
        if (raw == null) return;
        const value = raw.trim();
        if (!/^([01]\\d|2[0-3]):([0-5]\\d)$/.test(value)) return;
        state.dayStart = value;
        renderSettings();
        persistState();
      };
    }

    if (dom.completedDefaultToggle) {
      dom.completedDefaultToggle.onchange = (event) => {
        const checked = Boolean(event.target.checked);
        state.showCompletedOpen = checked;
        state.ui.groupOpen.completed = checked;
        renderHome();
        renderSettings();
        persistState();
      };
    }

    if (dom.nextTimePriorityToggle) {
      dom.nextTimePriorityToggle.onchange = (event) => {
        state.nextRules.prioritizeTime = Boolean(event.target.checked);
        renderHome();
        persistState();
      };
    }

    if (dom.nextImportantPriorityToggle) {
      dom.nextImportantPriorityToggle.onchange = (event) => {
        state.nextRules.prioritizeImportant = Boolean(event.target.checked);
        renderHome();
        persistState();
      };
    }

    if (dom.customBackgroundRow) {
      dom.customBackgroundRow.onclick = () => {
        if (!dom.customBackgroundInput) return;
        dom.customBackgroundInput.value = "";
        dom.customBackgroundInput.click();
      };
    }
    if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
  };

  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  renderAll();
}

function refreshDynamicDomRefs() {
  dom.pages = [...document.querySelectorAll(".page")];
  dom.bottomNav = document.querySelector(".bottom-nav");
  dom.themeGrid = document.getElementById("theme-grid");
  dom.pwaInstallButton = document.getElementById("pwa-install-button");
  dom.pwaInstallNote = document.getElementById("pwa-install-note");
  dom.apkDownloadButton = document.getElementById("apk-download-button");
  dom.nextTimePriorityToggle = document.getElementById("next-time-priority-toggle");
  dom.nextImportantPriorityToggle = document.getElementById("next-important-priority-toggle");
  dom.dayStartInput = document.getElementById("day-start-input");
  dom.defaultDurationSelect = document.getElementById("default-duration-select");
  dom.completedDefaultToggle = document.getElementById("completed-default-toggle");
  dom.reduceTextureToggle = document.getElementById("reduce-texture-toggle");
  dom.customBackgroundRow = document.getElementById("custom-background-row");
  dom.customBackgroundInput = document.getElementById("custom-background-input");
  dom.customBackgroundValue = document.getElementById("custom-background-value");
  dom.aiPlannerLink = document.getElementById("ai-planner-link");
  dom.defaultDurationRow = document.getElementById("default-duration-row");
  dom.defaultDurationValue = document.getElementById("default-duration-value");
  dom.dayStartRow = document.getElementById("day-start-row");
  dom.dayStartValue = document.getElementById("day-start-value");
  dom.aiPageBack = document.getElementById("ai-page-back");
  dom.aiCycleSelect = document.getElementById("ai-cycle-select");
  dom.aiQuestionnaire = document.getElementById("ai-questionnaire");
  dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
  dom.aiPromptOutput = document.getElementById("ai-prompt-output");
  dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
  dom.aiResultInput = document.getElementById("ai-result-input");
  dom.aiPreviewImport = document.getElementById("ai-preview-import");
  dom.aiImportPlan = document.getElementById("ai-import-plan");
  dom.aiPreviewList = document.getElementById("ai-preview-list");
  dom.statsFolderFilter = document.getElementById("stats-folder-filter");
  dom.statsSubcategoryFilter = document.getElementById("stats-subcategory-filter");
  dom.statsTemplateFilter = document.getElementById("stats-template-filter");
}

function applyTheme() {
  const visualTheme = state.theme === "adventure" ? "adventure" : "paper";
  dom.body.dataset.theme = visualTheme;
  dom.body.classList.remove("has-custom-background");
  dom.body.style.removeProperty("--custom-paper-image");
  dom.body.style.removeProperty("background");

  if (state.theme === "custom" && state.customBackgroundImage) {
    dom.body.classList.add("has-custom-background");
    dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
    dom.body.style.background = `linear-gradient(rgba(250, 248, 244, 0.72), rgba(250, 248, 244, 0.72)), url("${state.customBackgroundImage}") center / cover no-repeat fixed`;
  }

  applyBodyFlags();
}

function ensureSettingsStructure() {
  const settingsPage = document.querySelector('.page[data-page="settings"]');
  const settingsSheet = settingsPage?.querySelector(".settings-sheet");
  if (!settingsSheet) return;

  const heroDate = settingsPage.querySelector(".hero-date");
  const heroNote = settingsPage.querySelector(".hero-note");
  if (heroDate) heroDate.textContent = "";
  if (heroNote) heroNote.remove();

  settingsSheet.dataset.layout = "v9";
  settingsSheet.classList.add("settings-sheet-clean");
  settingsSheet.innerHTML = `
    <section class="settings-group">
      <div class="settings-group-title">App</div>
      <div class="settings-list-block settings-install-actions">
        <button class="settings-install-button" id="pwa-install-button" type="button">Install to Home Screen</button>
        <button class="settings-install-button" id="apk-download-button" type="button">Download APK</button>
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
          <input type="checkbox" id="next-time-priority-toggle" />
        </label>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先重要任务</span>
          <input type="checkbox" id="next-important-priority-toggle" />
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
        <div class="settings-theme-grid" id="theme-grid"></div>
        <button class="settings-row settings-row-link" id="custom-background-row" type="button">
          <span class="settings-row-label">背景图片</span>
          <span class="settings-row-trail">
            <span id="custom-background-value">未上传</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </span>
        </button>
        <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Preferences</div>
      <div class="settings-list-block">
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">Completed 默认展开</span>
          <input type="checkbox" id="completed-default-toggle" />
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
  let aiPage = document.querySelector('[data-page="ai-planner"]');
  const settingsPage = document.querySelector('[data-page="settings"]');
  if (!settingsPage) return;
  if (!aiPage) {
    aiPage = document.createElement("section");
    aiPage.className = "page";
    aiPage.dataset.page = "ai-planner";
    settingsPage.insertAdjacentElement("afterend", aiPage);
  }

  aiPage.innerHTML = `
    <header class="page-hero ai-page-hero">
      <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
      <div class="hero-heading">
        <div><h1>AI 生成日程</h1></div>
      </div>
    </header>

    <section class="paper-sheet ai-sheet ai-sheet-compact">
      <section class="ai-step ai-cycle-select-block">
        <div class="settings-group-title">规划层级</div>
        <label class="filter-pill ai-cycle-select-pill">
          <span>层级</span>
          <select id="ai-cycle-select">
            <option value="overall">总体规划</option>
            <option value="weekly">月 / 周规划</option>
            <option value="daily">今日 / 明日</option>
          </select>
        </label>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">填写问卷</div>
        <div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">生成 Prompt</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 Prompt</button>
          <textarea id="ai-prompt-output" rows="12" readonly placeholder="生成后的 Prompt 会出现在这里"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">复制给 AI · 粘贴结果</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 Prompt</button>
          <textarea id="ai-result-input" rows="10" placeholder="把 AI 返回的结构化计划粘贴到这里"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">预览导入</div>
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
}

function normalizeStatsCascadeState() {
  let folderValue = state.ui.statsFolderFilter || "all";
  let categoryValue = state.ui.statsSubcategoryFilter || "all";
  let templateValue = state.ui.statsTemplateFilter || "all";
  const legacy = state.ui.statsCategoryFilter || "all";
  const categories = getAllCategories();
  const templates = getAllTemplates();

  if (!state.ui.statsFolderFilter && !state.ui.statsSubcategoryFilter && !state.ui.statsTemplateFilter) {
    if (legacy.startsWith("folder:")) {
      folderValue = legacy.slice(7);
    } else if (legacy.startsWith("category:")) {
      categoryValue = legacy.slice(9);
    } else if (legacy.startsWith("template:")) {
      templateValue = legacy.slice(9);
    } else if (legacy !== "all") {
      if (state.folders.some((folder) => folder.id === legacy)) folderValue = legacy;
      else if (categories.some((category) => category.id === legacy)) categoryValue = legacy;
      else if (templates.some((template) => template.id === legacy)) templateValue = legacy;
    }
  }

  if (templateValue !== "all") {
    const template = templates.find((entry) => entry.id === templateValue);
    if (template) {
      categoryValue = template.categoryId;
      folderValue = template.folderId;
    } else {
      templateValue = "all";
    }
  }

  if (categoryValue !== "all") {
    const ownerFolder = state.folders.find((folder) => folder.categories.some((entry) => entry.id === categoryValue));
    if (ownerFolder) {
      folderValue = ownerFolder.id;
    } else {
      categoryValue = "all";
      templateValue = "all";
    }
  }

  if (folderValue !== "all") {
    const folder = state.folders.find((entry) => entry.id === folderValue);
    if (!folder) {
      folderValue = "all";
      categoryValue = "all";
      templateValue = "all";
    } else if (categoryValue !== "all" && !folder.categories.some((entry) => entry.id === categoryValue)) {
      categoryValue = "all";
      templateValue = "all";
    } else if (categoryValue === "all") {
      templateValue = "all";
    } else {
      const category = folder.categories.find((entry) => entry.id === categoryValue);
      if (templateValue !== "all" && !category?.templates.some((entry) => entry.id === templateValue)) templateValue = "all";
    }
  } else {
    categoryValue = "all";
    templateValue = "all";
  }

  state.ui.statsFolderFilter = folderValue;
  state.ui.statsSubcategoryFilter = categoryValue;
  state.ui.statsTemplateFilter = templateValue;
  if (templateValue !== "all") state.ui.statsCategoryFilter = `template:${templateValue}`;
  else if (categoryValue !== "all") state.ui.statsCategoryFilter = `category:${categoryValue}`;
  else if (folderValue !== "all") state.ui.statsCategoryFilter = `folder:${folderValue}`;
  else state.ui.statsCategoryFilter = "all";
}

function matchesStatsCategoryFilter(session) {
  normalizeStatsCascadeState();
  const folderValue = state.ui.statsFolderFilter || "all";
  const categoryValue = state.ui.statsSubcategoryFilter || "all";
  const templateValue = state.ui.statsTemplateFilter || "all";
  const task = session.taskId ? state.tasks.find((entry) => entry.id === session.taskId) : null;
  const folderId = task?.folderId || null;
  const categoryId = session.categoryId || task?.categoryId || null;
  const templateId = session.templateId || task?.templateId || null;

  if (folderValue !== "all" && folderId !== folderValue) return false;
  if (categoryValue !== "all" && categoryId !== categoryValue) return false;
  if (templateValue !== "all" && templateId !== templateValue) return false;
  return true;
}

function renderStatsFilters() {
  normalizeStatsCascadeState();
  const host = dom.statsCategoryFilter?.closest(".filter-row") || document.querySelector(".filter-row.filter-row-single");
  if (!host) return;

  const folderValue = state.ui.statsFolderFilter || "all";
  const categoryValue = state.ui.statsSubcategoryFilter || "all";
  const templateValue = state.ui.statsTemplateFilter || "all";
  const selectedFolder = folderValue === "all" ? null : state.folders.find((folder) => folder.id === folderValue) || null;
  const selectedCategory = selectedFolder && categoryValue !== "all"
    ? selectedFolder.categories.find((category) => category.id === categoryValue) || null
    : null;

  host.classList.add("filter-row-single");
  host.innerHTML = `
    <div class="filter-cascade-stack">
      <label class="filter-pill">
        <span>一级分类</span>
        <select id="stats-folder-filter">
          <option value="all">All</option>
          ${state.folders.map((folder) => `<option value="${folder.id}">${escapeHtml(folder.name)}</option>`).join("")}
        </select>
      </label>
      ${
        selectedFolder
          ? `
            <label class="filter-pill">
              <span>二级分类</span>
              <select id="stats-subcategory-filter">
                <option value="all">All</option>
                ${selectedFolder.categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`).join("")}
              </select>
            </label>
          `
          : ""
      }
      ${
        selectedCategory
          ? `
            <label class="filter-pill">
              <span>三级任务</span>
              <select id="stats-template-filter">
                <option value="all">All</option>
                ${selectedCategory.templates.map((template) => `<option value="${template.id}">${escapeHtml(template.name)}</option>`).join("")}
              </select>
            </label>
          `
          : ""
      }
    </div>
  `;

  refreshDynamicDomRefs();

  if (dom.statsFolderFilter) {
    dom.statsFolderFilter.value = folderValue;
    dom.statsFolderFilter.onchange = (event) => {
      state.ui.statsFolderFilter = event.target.value;
      state.ui.statsSubcategoryFilter = "all";
      state.ui.statsTemplateFilter = "all";
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  }

  if (dom.statsSubcategoryFilter) {
    dom.statsSubcategoryFilter.value = categoryValue;
    dom.statsSubcategoryFilter.onchange = (event) => {
      state.ui.statsSubcategoryFilter = event.target.value;
      state.ui.statsTemplateFilter = "all";
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  }

  if (dom.statsTemplateFilter) {
    dom.statsTemplateFilter.value = templateValue;
    dom.statsTemplateFilter.onchange = (event) => {
      state.ui.statsTemplateFilter = event.target.value;
      state.ui.selectedSegment = null;
      renderStats();
      persistState();
    };
  }
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
    note: `${formatDuration(item.minutes)}`,
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

function renderStatsBreakdown(stats) {
  if (!dom.statsBreakdown) return;
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
          <strong class="breakdown-time">${formatDuration(item.minutes)}</strong>
        </article>
      `
    )
    .join("");
}

function handleCustomBackgroundUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.customBackgroundImage = String(reader.result || "");
    state.theme = "custom";
    applyTheme();
    renderSettings();
    persistState();
    if (dom.customBackgroundInput) dom.customBackgroundInput.value = "";
  };
  reader.readAsDataURL(file);
}

function renderAiPlanner() {
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  if (!dom.aiQuestionnaire) return;

  const cycle = state.ai.cycle || "overall";
  if (dom.aiCycleSelect) {
    dom.aiCycleSelect.value = cycle;
    dom.aiCycleSelect.onchange = (event) => {
      state.ai.cycle = event.target.value;
      state.ui.aiPreviewItems = [];
      renderAiPlanner();
      persistState();
    };
  }

  dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);
  bindAiQuestionnaireFields();

  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
  if (dom.aiResultInput) {
    dom.aiResultInput.value = state.ai.resultText || "";
    dom.aiResultInput.oninput = (event) => {
      state.ai.resultText = event.target.value;
      persistState();
    };
  }
  if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
  if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
  if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
  if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
  if (dom.aiPageBack) {
    dom.aiPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };
  }

  renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  if (!dom.themeGrid) return;

  dom.themeGrid.innerHTML = [
    { id: "paper", name: "Simple Paper" },
    { id: "custom", name: "Custom" },
  ]
    .map(
      (theme) => `
        <button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
          <span class="settings-theme-radio" aria-hidden="true"></span>
          <span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span>
        </button>
      `
    )
    .join("");

  if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
  if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
  if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (dom.pwaInstallButton) {
    dom.pwaInstallButton.textContent = isStandalone ? "Installed" : "Install to Home Screen";
    dom.pwaInstallButton.disabled = isStandalone;
    dom.pwaInstallButton.onclick = handlePwaInstall;
  }
  if (dom.apkDownloadButton) {
    dom.apkDownloadButton.onclick = () => {
      window.open("https://github.com/lumeva/Colorful-time/releases", "_blank", "noopener");
    };
  }

  dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
    button.onclick = () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    };
  });

  if (dom.aiPlannerLink) {
    dom.aiPlannerLink.onclick = () => {
      state.currentPage = "ai-planner";
      renderAll();
      persistState();
    };
  }

  if (dom.defaultDurationRow) {
    dom.defaultDurationRow.onclick = () => {
      const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
      if (raw == null) return;
      const minutes = Number(raw);
      if (!Number.isFinite(minutes) || minutes <= 0) return;
      state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
      renderSettings();
      persistState();
    };
  }

  if (dom.dayStartRow) {
    dom.dayStartRow.onclick = () => {
      const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
      if (raw == null) return;
      const value = raw.trim();
      if (!/^([01]\\d|2[0-3]):([0-5]\\d)$/.test(value)) return;
      state.dayStart = value;
      renderSettings();
      persistState();
    };
  }

  if (dom.completedDefaultToggle) {
    dom.completedDefaultToggle.onchange = (event) => {
      const checked = Boolean(event.target.checked);
      state.showCompletedOpen = checked;
      state.ui.groupOpen.completed = checked;
      renderHome();
      renderSettings();
      persistState();
    };
  }

  if (dom.nextTimePriorityToggle) {
    dom.nextTimePriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeTime = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }

  if (dom.nextImportantPriorityToggle) {
    dom.nextImportantPriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeImportant = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }

  if (dom.customBackgroundRow) {
    dom.customBackgroundRow.onclick = () => {
      if (!dom.customBackgroundInput) return;
      dom.customBackgroundInput.value = "";
      dom.customBackgroundInput.click();
    };
  }
  if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
}

function refreshDynamicDomRefs() {
  dom.pages = [...document.querySelectorAll(".page")];
  dom.bottomNav = document.querySelector(".bottom-nav");
  dom.themeGrid = document.getElementById("theme-grid");
  dom.pwaInstallButton = document.getElementById("pwa-install-button");
  dom.nextTimePriorityToggle = document.getElementById("next-time-priority-toggle");
  dom.nextImportantPriorityToggle = document.getElementById("next-important-priority-toggle");
  dom.dayStartInput = document.getElementById("day-start-input");
  dom.defaultDurationSelect = document.getElementById("default-duration-select");
  dom.completedDefaultToggle = document.getElementById("completed-default-toggle");
  dom.customBackgroundRow = document.getElementById("custom-background-row");
  dom.customBackgroundInput = document.getElementById("custom-background-input");
  dom.customBackgroundValue = document.getElementById("custom-background-value");
  dom.aiPlannerLink = document.getElementById("ai-planner-link");
  dom.defaultDurationRow = document.getElementById("default-duration-row");
  dom.defaultDurationValue = document.getElementById("default-duration-value");
  dom.dayStartRow = document.getElementById("day-start-row");
  dom.dayStartValue = document.getElementById("day-start-value");
  dom.aiPageBack = document.getElementById("ai-page-back");
  dom.aiQuestionnaire = document.getElementById("ai-questionnaire");
  dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
  dom.aiPromptOutput = document.getElementById("ai-prompt-output");
  dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
  dom.aiResultInput = document.getElementById("ai-result-input");
  dom.aiPreviewImport = document.getElementById("ai-preview-import");
  dom.aiImportPlan = document.getElementById("ai-import-plan");
  dom.aiPreviewList = document.getElementById("ai-preview-list");
}

function applyTheme() {
  const currentTheme = state.theme === "custom" ? "custom" : "paper";
  dom.body.dataset.theme = currentTheme;
  dom.body.style.removeProperty("background");
  dom.body.style.removeProperty("--custom-paper-image");
  dom.body.classList.remove("has-custom-background");

  if (currentTheme === "custom" && state.customBackgroundImage) {
    dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
    dom.body.style.background = `linear-gradient(rgba(250, 248, 244, 0.72), rgba(250, 248, 244, 0.72)), url("${state.customBackgroundImage}") center / cover no-repeat fixed`;
    dom.body.classList.add("has-custom-background");
  }

  applyBodyFlags();
}

function ensureSettingsStructure() {
  const settingsPage = document.querySelector('.page[data-page="settings"]');
  const settingsSheet = settingsPage?.querySelector(".settings-sheet");
  if (!settingsSheet) return;

  const heroDate = settingsPage.querySelector(".hero-date");
  const heroNote = settingsPage.querySelector(".hero-note");
  if (heroDate) heroDate.textContent = "";
  if (heroNote) heroNote.remove();

  settingsSheet.dataset.layout = "v5";
  settingsSheet.classList.add("settings-sheet-clean");
  settingsSheet.innerHTML = `
    <section class="settings-group">
      <div class="settings-group-title">App</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link settings-install-row" id="pwa-install-button" type="button">
          <span class="settings-row-label">Install to Home Screen</span>
        </button>
        <button class="settings-row settings-row-link settings-install-row" id="apk-download-button" type="button">
          <span class="settings-row-label">Download APK</span>
        </button>
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Planning</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link" id="ai-planner-link" type="button">
          <span class="settings-row-label">AI 生成日程</span>
          <span class="settings-row-arrow" aria-hidden="true">›</span>
        </button>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先最近时间任务</span>
          <input type="checkbox" id="next-time-priority-toggle" />
        </label>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先重要任务</span>
          <input type="checkbox" id="next-important-priority-toggle" />
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
        <div class="settings-theme-grid" id="theme-grid"></div>
        <button class="settings-row settings-row-link" id="custom-background-row" type="button">
          <span class="settings-row-label">上传背景图</span>
          <span class="settings-row-trail">
            <span id="custom-background-value">未上传</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </span>
        </button>
        <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Preferences</div>
      <div class="settings-list-block">
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">Completed 默认展开</span>
          <input type="checkbox" id="completed-default-toggle" />
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
  let aiPage = document.querySelector('[data-page="ai-planner"]');
  const settingsPage = document.querySelector('[data-page="settings"]');
  if (!settingsPage) return;
  if (!aiPage) {
    aiPage = document.createElement("section");
    aiPage.className = "page";
    aiPage.dataset.page = "ai-planner";
    settingsPage.insertAdjacentElement("afterend", aiPage);
  }

  aiPage.innerHTML = `
    <header class="page-hero ai-page-hero">
      <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
      <div class="hero-heading">
        <div><h1>AI 生成日程</h1></div>
      </div>
    </header>

    <section class="paper-sheet ai-sheet ai-sheet-compact">
      <section class="ai-step ai-cycle-select-block">
        <div class="settings-group-title">三层规划体系</div>
        <label class="filter-pill ai-cycle-select-pill">
          <span>规划层级</span>
          <select id="ai-cycle-select">
            <option value="overall">总体规划</option>
            <option value="weekly">月 / 周规划</option>
            <option value="daily">今日 / 明日</option>
          </select>
        </label>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">填写问卷</div>
        <div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">生成 Prompt</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 Prompt</button>
          <textarea id="ai-prompt-output" rows="12" readonly placeholder="Prompt"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">复制给 AI</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 Prompt</button>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">粘贴结果</div>
        <div class="settings-list-block ai-actions">
          <textarea id="ai-result-input" rows="10" placeholder="粘贴 AI 输出"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">预览导入</div>
        <div class="settings-list-block ai-actions">
          <div class="sheet-button-row ai-import-actions">
            <button class="ghost-button ai-action-button" id="ai-preview-import" type="button">预览</button>
            <button class="ghost-button ai-action-button" id="ai-import-plan" type="button">导入 To-do</button>
          </div>
          <div class="ai-preview-list" id="ai-preview-list"></div>
        </div>
      </section>
    </section>
  `;
}

function normalizeStatsCascadeState() {
  let folderValue = state.ui.statsFolderFilter || "all";
  let categoryValue = state.ui.statsSubcategoryFilter || "all";
  let templateValue = state.ui.statsTemplateFilter || "all";
  const legacy = state.ui.statsCategoryFilter || "all";

  if (!state.ui.statsFolderFilter && !state.ui.statsSubcategoryFilter && !state.ui.statsTemplateFilter) {
    if (legacy.startsWith("folder:")) {
      folderValue = legacy;
    } else if (legacy.startsWith("category:")) {
      const categoryId = legacy.slice(9);
      const owner = state.folders.find((folder) => folder.categories.some((category) => category.id === categoryId));
      folderValue = owner ? `folder:${owner.id}` : "all";
      categoryValue = legacy;
    } else if (legacy.startsWith("template:")) {
      const templateId = legacy.slice(9);
      for (const folder of state.folders) {
        for (const category of folder.categories) {
          const template = category.templates.find((entry) => entry.id === templateId);
          if (template) {
            folderValue = `folder:${folder.id}`;
            categoryValue = `category:${category.id}`;
            templateValue = legacy;
          }
        }
      }
    }
  }

  state.ui.statsFolderFilter = folderValue;
  state.ui.statsSubcategoryFilter = categoryValue;
  state.ui.statsTemplateFilter = templateValue;
}

function updateStatsFilterState() {
  const folderValue = state.ui.statsFolderFilter || "all";
  const categoryValue = state.ui.statsSubcategoryFilter || "all";
  const templateValue = state.ui.statsTemplateFilter || "all";

  if (templateValue !== "all") state.ui.statsCategoryFilter = templateValue;
  else if (categoryValue !== "all") state.ui.statsCategoryFilter = categoryValue;
  else if (folderValue !== "all") state.ui.statsCategoryFilter = folderValue;
  else state.ui.statsCategoryFilter = "all";
}

function matchesStatsCategoryFilter(session) {
  const filterValue = state.ui.statsCategoryFilter || "all";
  if (filterValue === "all") return true;

  const task = state.tasks.find((entry) => entry.id === session.taskId);
  if (!task) return false;

  if (filterValue.startsWith("folder:")) return task.folderId === filterValue.slice(7);
  if (filterValue.startsWith("category:")) return task.categoryId === filterValue.slice(9);
  if (filterValue.startsWith("template:")) return task.templateId === filterValue.slice(9);
  return true;
}

function renderStatsFilters() {
  normalizeStatsCascadeState();

  const host = dom.statsCategoryFilter?.closest(".filter-row") || document.querySelector(".filter-row.filter-row-single");
  if (!host) return;

  const folderValue = state.ui.statsFolderFilter || "all";
  const categoryValue = state.ui.statsSubcategoryFilter || "all";
  const templateValue = state.ui.statsTemplateFilter || "all";

  const folderOptions = state.folders
    .map((folder) => `<option value="folder:${folder.id}">${escapeHtml(folder.name)}</option>`)
    .join("");

  let categorySection = "";
  let templateSection = "";

  if (folderValue !== "all") {
    const folderId = folderValue.slice(7);
    const folder = state.folders.find((entry) => entry.id === folderId);
    const categoryOptions = (folder?.categories || [])
      .map((category) => `<option value="category:${category.id}">${escapeHtml(category.name)}</option>`)
      .join("");

    categorySection = `
      <label class="filter-pill">
        <span>二级分类</span>
        <select id="stats-subcategory-filter">
          <option value="all">All</option>
          ${categoryOptions}
        </select>
      </label>
    `;

    if (categoryValue !== "all") {
      const categoryId = categoryValue.slice(9);
      const category = folder?.categories.find((entry) => entry.id === categoryId);
      const templateOptions = (category?.templates || [])
        .map((template) => `<option value="template:${template.id}">${escapeHtml(template.name)}</option>`)
        .join("");

      templateSection = `
        <label class="filter-pill">
          <span>三级任务</span>
          <select id="stats-template-filter">
            <option value="all">All</option>
            ${templateOptions}
          </select>
        </label>
      `;
    }
  }

  host.innerHTML = `
    <label class="filter-pill">
      <span>一级分类</span>
      <select id="stats-folder-filter">
        <option value="all">All</option>
        ${folderOptions}
      </select>
    </label>
    ${categorySection}
    ${templateSection}
  `;

  const folderSelect = document.getElementById("stats-folder-filter");
  const categorySelect = document.getElementById("stats-subcategory-filter");
  const templateSelect = document.getElementById("stats-template-filter");

  if (folderSelect) folderSelect.value = folderValue;
  if (categorySelect) categorySelect.value = categoryValue;
  if (templateSelect) templateSelect.value = templateValue;

  folderSelect?.addEventListener("change", (event) => {
    state.ui.statsFolderFilter = event.target.value;
    state.ui.statsSubcategoryFilter = "all";
    state.ui.statsTemplateFilter = "all";
    updateStatsFilterState();
    state.ui.selectedSegment = null;
    renderStats();
    persistState();
  });

  categorySelect?.addEventListener("change", (event) => {
    state.ui.statsSubcategoryFilter = event.target.value;
    state.ui.statsTemplateFilter = "all";
    updateStatsFilterState();
    state.ui.selectedSegment = null;
    renderStats();
    persistState();
  });

  templateSelect?.addEventListener("change", (event) => {
    state.ui.statsTemplateFilter = event.target.value;
    updateStatsFilterState();
    state.ui.selectedSegment = null;
    renderStats();
    persistState();
  });
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
    note: `${formatDuration(item.minutes)}`,
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
          <strong class="breakdown-time">${formatDuration(item.minutes)}</strong>
        </article>
      `
    )
    .join("");
}

function handleCustomBackgroundUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.customBackgroundImage = String(reader.result || "");
    state.theme = "custom";
    applyTheme();
    renderSettings();
    persistState();
    if (dom.customBackgroundInput) dom.customBackgroundInput.value = "";
  };
  reader.readAsDataURL(file);
}

function renderAiPlanner() {
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  if (!dom.aiQuestionnaire) return;

  const cycle = state.ai.cycle || "overall";
  const cycleSelect = document.getElementById("ai-cycle-select");
  if (cycleSelect) {
    cycleSelect.value = cycle;
    cycleSelect.onchange = (event) => {
      state.ai.cycle = event.target.value;
      state.ui.aiPreviewItems = [];
      renderAiPlanner();
      persistState();
    };
  }

  dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);
  bindAiQuestionnaireFields();

  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
  if (dom.aiResultInput) {
    dom.aiResultInput.value = state.ai.resultText || "";
    dom.aiResultInput.oninput = (event) => {
      state.ai.resultText = event.target.value;
      persistState();
    };
  }
  if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
  if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
  if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
  if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
  if (dom.aiPageBack) {
    dom.aiPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };
  }

  renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();

  dom.themeGrid.innerHTML = [
    { id: "paper", name: "Simple Paper" },
    { id: "custom", name: "Custom" },
  ]
    .map(
      (theme) => `
        <button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
          <span class="settings-theme-radio" aria-hidden="true"></span>
          <span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span>
        </button>
      `
    )
    .join("");

  if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
  if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
  if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";

  const apkButton = document.getElementById("apk-download-button");
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (dom.pwaInstallButton) {
    dom.pwaInstallButton.textContent = isStandalone ? "Installed" : "Install to Home Screen";
    dom.pwaInstallButton.disabled = isStandalone;
    dom.pwaInstallButton.onclick = handlePwaInstall;
  }
  if (apkButton) {
    apkButton.onclick = () => {
      window.open("https://github.com/lumeva/Colorful-time/releases", "_blank", "noopener");
    };
  }

  dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
    button.onclick = () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    };
  });

  if (dom.aiPlannerLink) {
    dom.aiPlannerLink.onclick = () => {
      state.currentPage = "ai-planner";
      renderAll();
      persistState();
    };
  }
  if (dom.defaultDurationRow) {
    dom.defaultDurationRow.onclick = () => {
      const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
      if (raw == null) return;
      const minutes = Number(raw);
      if (!Number.isFinite(minutes) || minutes <= 0) return;
      state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
      renderSettings();
      persistState();
    };
  }
  if (dom.dayStartRow) {
    dom.dayStartRow.onclick = () => {
      const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
      if (raw == null) return;
      const value = raw.trim();
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) return;
      state.dayStart = value;
      renderSettings();
      persistState();
    };
  }
  if (dom.completedDefaultToggle) {
    dom.completedDefaultToggle.onchange = (event) => {
      const checked = Boolean(event.target.checked);
      state.showCompletedOpen = checked;
      state.ui.groupOpen.completed = checked;
      renderHome();
      renderSettings();
      persistState();
    };
  }
  if (dom.nextTimePriorityToggle) {
    dom.nextTimePriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeTime = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.nextImportantPriorityToggle) {
    dom.nextImportantPriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeImportant = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.customBackgroundRow) {
    dom.customBackgroundRow.onclick = () => {
      if (!dom.customBackgroundInput) return;
      dom.customBackgroundInput.value = "";
      dom.customBackgroundInput.click();
    };
  }
  if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
}

function applyTheme() {
  const currentTheme = state.theme === "custom" ? "custom" : "paper";
  dom.body.dataset.theme = currentTheme;

  if (currentTheme === "custom" && state.customBackgroundImage) {
    dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
    dom.body.style.background = `linear-gradient(rgba(250, 248, 244, 0.72), rgba(250, 248, 244, 0.72)), url("${state.customBackgroundImage}") center / cover no-repeat fixed`;
    dom.body.classList.add("has-custom-background");
  } else {
    dom.body.style.removeProperty("--custom-paper-image");
    dom.body.style.removeProperty("background");
    dom.body.classList.remove("has-custom-background");
  }

  applyBodyFlags();
}

function ensureSettingsStructure() {
  const settingsPage = document.querySelector('.page[data-page="settings"]');
  const settingsSheet = settingsPage?.querySelector(".settings-sheet");
  if (!settingsSheet) return;

  const heroDate = settingsPage.querySelector(".hero-date");
  const heroNote = settingsPage.querySelector(".hero-note");
  if (heroDate) heroDate.textContent = "";
  if (heroNote) heroNote.remove();

  settingsSheet.dataset.layout = "v4";
  settingsSheet.classList.add("settings-sheet-clean");
  settingsSheet.innerHTML = `
    <section class="settings-group">
      <div class="settings-group-title">App</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link settings-install-row" id="pwa-install-button" type="button">
          <span class="settings-row-label">Install to Home Screen</span>
        </button>
        <button class="settings-row settings-row-link settings-install-row" id="apk-download-button" type="button">
          <span class="settings-row-label">Download APK</span>
        </button>
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Planning</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link" id="ai-planner-link" type="button">
          <span class="settings-row-label">AI 生成日程</span>
          <span class="settings-row-arrow" aria-hidden="true">›</span>
        </button>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先最近时间任务</span>
          <input type="checkbox" id="next-time-priority-toggle" />
        </label>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先重要任务</span>
          <input type="checkbox" id="next-important-priority-toggle" />
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
        <div class="settings-theme-grid" id="theme-grid"></div>
        <button class="settings-row settings-row-link" id="custom-background-row" type="button">
          <span class="settings-row-label">上传背景图</span>
          <span class="settings-row-trail">
            <span id="custom-background-value">未上传</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </span>
        </button>
        <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Preferences</div>
      <div class="settings-list-block">
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">Completed 默认展开</span>
          <input type="checkbox" id="completed-default-toggle" />
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
  let aiPage = document.querySelector('[data-page="ai-planner"]');
  const settingsPage = document.querySelector('[data-page="settings"]');
  if (!settingsPage) return;
  if (!aiPage) {
    aiPage = document.createElement("section");
    aiPage.className = "page";
    aiPage.dataset.page = "ai-planner";
    settingsPage.insertAdjacentElement("afterend", aiPage);
  }

  aiPage.innerHTML = `
    <header class="page-hero ai-page-hero">
      <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
      <div class="hero-heading">
        <div><h1>AI 生成日程</h1></div>
      </div>
    </header>

    <section class="paper-sheet ai-sheet ai-sheet-compact">
      <section class="ai-step ai-cycle-select-block">
        <div class="settings-group-title">三层规划体系</div>
        <label class="filter-pill ai-cycle-select-pill">
          <select id="ai-cycle-select">
            <option value="overall">总体规划</option>
            <option value="weekly">月 / 周规划</option>
            <option value="daily">今日 / 明日</option>
          </select>
        </label>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">填写问卷</div>
        <div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">生成 Prompt</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 Prompt</button>
          <textarea id="ai-prompt-output" rows="12" readonly placeholder="Prompt"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">复制给 AI</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 Prompt</button>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">粘贴结果</div>
        <div class="settings-list-block ai-actions">
          <textarea id="ai-result-input" rows="10" placeholder="粘贴 AI 输出"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">预览导入</div>
        <div class="settings-list-block ai-actions">
          <div class="sheet-button-row ai-import-actions">
            <button class="ghost-button ai-action-button" id="ai-preview-import" type="button">预览</button>
            <button class="ghost-button ai-action-button" id="ai-import-plan" type="button">导入 To-do</button>
          </div>
          <div class="ai-preview-list" id="ai-preview-list"></div>
        </div>
      </section>
    </section>
  `;
}

function matchesStatsCategoryFilter(session) {
  const filterValue = state.ui.statsCategoryFilter || "all";
  if (filterValue === "all") return true;

  const task = state.tasks.find((entry) => entry.id === session.taskId);
  if (!task) return false;

  if (filterValue.startsWith("folder:")) return task.folderId === filterValue.slice(7);
  if (filterValue.startsWith("category:")) return task.categoryId === filterValue.slice(9);
  if (filterValue.startsWith("template:")) return task.templateId === filterValue.slice(9);
  return true;
}

function renderStatsFilters() {
  const folderOptions = state.folders.map((folder) => `<option value="folder:${folder.id}">${escapeHtml(folder.name)}</option>`);
  const categoryOptions = state.folders.flatMap((folder) =>
    folder.categories.map((category) => `<option value="category:${category.id}">${escapeHtml(category.name)}</option>`)
  );
  const templateOptions = state.folders.flatMap((folder) =>
    folder.categories.flatMap((category) =>
      category.templates.map((template) => `<option value="template:${template.id}">${escapeHtml(template.name)}</option>`)
    )
  );

  dom.statsCategoryFilter.innerHTML = `
    <option value="all">All</option>
    <optgroup label="一级分类">
      ${folderOptions.join("")}
    </optgroup>
    <optgroup label="二级分类">
      ${categoryOptions.join("")}
    </optgroup>
    <optgroup label="三级任务">
      ${templateOptions.join("")}
    </optgroup>
  `;
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
    note: `${formatDuration(item.minutes)}`,
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
          <strong class="breakdown-time">${formatDuration(item.minutes)}</strong>
        </article>
      `
    )
    .join("");
}

function handleCustomBackgroundUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.customBackgroundImage = String(reader.result || "");
    state.theme = "custom";
    applyTheme();
    renderSettings();
    persistState();
    if (dom.customBackgroundInput) dom.customBackgroundInput.value = "";
  };
  reader.readAsDataURL(file);
}

function renderAiPlanner() {
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  if (!dom.aiQuestionnaire) return;

  const cycle = state.ai.cycle || "overall";
  const cycleSelect = document.getElementById("ai-cycle-select");
  if (cycleSelect) {
    cycleSelect.value = cycle;
    cycleSelect.onchange = (event) => {
      state.ai.cycle = event.target.value;
      state.ui.aiPreviewItems = [];
      renderAiPlanner();
      persistState();
    };
  }

  dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);
  bindAiQuestionnaireFields();

  if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
  if (dom.aiResultInput) {
    dom.aiResultInput.value = state.ai.resultText || "";
    dom.aiResultInput.oninput = (event) => {
      state.ai.resultText = event.target.value;
      persistState();
    };
  }
  if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
  if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
  if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
  if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
  if (dom.aiPageBack) {
    dom.aiPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };
  }

  renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();

  dom.themeGrid.innerHTML = [
    { id: "paper", name: "Simple Paper" },
    { id: "custom", name: "Custom" },
  ]
    .map(
      (theme) => `
        <button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button">
          <span class="settings-theme-radio" aria-hidden="true"></span>
          <span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span>
        </button>
      `
    )
    .join("");

  if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
  if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
  if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (dom.pwaInstallButton) {
    dom.pwaInstallButton.textContent = isStandalone ? "Installed" : "Install to Home Screen";
    dom.pwaInstallButton.disabled = isStandalone;
    dom.pwaInstallButton.onclick = handlePwaInstall;
  }
  if (dom.apkDownloadButton) {
    dom.apkDownloadButton.onclick = () => {
      window.open("https://github.com/lumeva/Colorful-time/releases", "_blank", "noopener");
    };
  }

  dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
    button.onclick = () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    };
  });

  if (dom.aiPlannerLink) {
    dom.aiPlannerLink.onclick = () => {
      state.currentPage = "ai-planner";
      renderAll();
      persistState();
    };
  }
  if (dom.defaultDurationRow) {
    dom.defaultDurationRow.onclick = () => {
      const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
      if (raw == null) return;
      const minutes = Number(raw);
      if (!Number.isFinite(minutes) || minutes <= 0) return;
      state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
      renderSettings();
      persistState();
    };
  }
  if (dom.dayStartRow) {
    dom.dayStartRow.onclick = () => {
      const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
      if (raw == null) return;
      const value = raw.trim();
      if (!/^([01]\\d|2[0-3]):([0-5]\\d)$/.test(value)) return;
      state.dayStart = value;
      renderSettings();
      persistState();
    };
  }
  if (dom.completedDefaultToggle) {
    dom.completedDefaultToggle.onchange = (event) => {
      const checked = Boolean(event.target.checked);
      state.showCompletedOpen = checked;
      state.ui.groupOpen.completed = checked;
      renderHome();
      renderSettings();
      persistState();
    };
  }
  if (dom.nextTimePriorityToggle) {
    dom.nextTimePriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeTime = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.nextImportantPriorityToggle) {
    dom.nextImportantPriorityToggle.onchange = (event) => {
      state.nextRules.prioritizeImportant = Boolean(event.target.checked);
      renderHome();
      persistState();
    };
  }
  if (dom.customBackgroundRow) {
    dom.customBackgroundRow.onclick = () => {
      if (!dom.customBackgroundInput) return;
      dom.customBackgroundInput.value = "";
      dom.customBackgroundInput.click();
    };
  }
  if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
}

function renderSettings() {
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();

  dom.themeGrid.innerHTML = [
    { id: "paper", name: "Simple Paper" },
    { id: "custom", name: "Custom" },
  ]
    .map((theme) => `<button class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}" data-theme-card="${theme.id}" type="button"><span class="settings-theme-radio" aria-hidden="true"></span><span class="settings-theme-copy"><strong>${escapeHtml(theme.name)}</strong></span></button>`)
    .join("");

  if (dom.defaultDurationSelect) dom.defaultDurationSelect.value = String(state.defaultDuration);
  if (dom.dayStartInput) dom.dayStartInput.value = state.dayStart || "00:00";
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.checked = Boolean(state.ui.groupOpen?.completed);
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.checked = Boolean(state.nextRules.prioritizeTime);
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.checked = Boolean(state.nextRules.prioritizeImportant);
  if (dom.defaultDurationValue) dom.defaultDurationValue.textContent = `${state.defaultDuration} min`;
  if (dom.dayStartValue) dom.dayStartValue.textContent = state.dayStart || "00:00";
  if (dom.customBackgroundValue) dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";

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
    button.onclick = () => {
      state.theme = button.dataset.themeCard;
      applyTheme();
      renderSettings();
      persistState();
    };
  });

  if (dom.aiPlannerLink) dom.aiPlannerLink.onclick = () => { state.currentPage = "ai-planner"; renderAll(); persistState(); };
  if (dom.defaultDurationRow) dom.defaultDurationRow.onclick = () => {
    const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
    if (raw == null) return;
    const minutes = Number(raw);
    if (!Number.isFinite(minutes) || minutes <= 0) return;
    state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
    renderSettings();
    persistState();
  };
  if (dom.dayStartRow) dom.dayStartRow.onclick = () => {
    const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
    if (raw == null) return;
    const value = raw.trim();
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) return;
    state.dayStart = value;
    renderSettings();
    persistState();
  };
  if (dom.completedDefaultToggle) dom.completedDefaultToggle.onchange = (event) => {
    const checked = Boolean(event.target.checked);
    state.showCompletedOpen = checked;
    state.ui.groupOpen.completed = checked;
    renderHome();
    renderSettings();
    persistState();
  };
  if (dom.nextTimePriorityToggle) dom.nextTimePriorityToggle.onchange = (event) => { state.nextRules.prioritizeTime = Boolean(event.target.checked); renderHome(); persistState(); };
  if (dom.nextImportantPriorityToggle) dom.nextImportantPriorityToggle.onchange = (event) => { state.nextRules.prioritizeImportant = Boolean(event.target.checked); renderHome(); persistState(); };
  if (dom.customBackgroundRow) dom.customBackgroundRow.onclick = () => dom.customBackgroundInput?.click();
  if (dom.customBackgroundInput) dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
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
  renderAiPlanner();
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  updateLogDuration();
}

function upgradeState(current) {
  const next = current || createSeedState();
  const today = new Date();
  const aiDefaults = createDefaultAiState();

  next.ui = next.ui || {};
  next.ui.groupOpen = {
    overdue: next.ui.groupOpen?.overdue ?? true,
    today: next.ui.groupOpen?.today ?? true,
    flexible: next.ui.groupOpen?.flexible ?? true,
    completed: next.ui.groupOpen?.completed ?? Boolean(next.showCompletedOpen),
  };
  next.ui.taskAdvancedOpen = next.ui.taskAdvancedOpen ?? false;
  next.ui.taskWeekdays = next.ui.taskWeekdays || [];
  next.ui.taskTimerMode = next.ui.taskTimerMode || "up";
  next.ui.taskDatePreset = next.ui.taskDatePreset || "none";
  next.ui.aiPreviewItems = Array.isArray(next.ui.aiPreviewItems) ? next.ui.aiPreviewItems : [];
  next.ui.language = next.ui.language === "zh" || next.ui.language === "en" ? next.ui.language : getUiLanguage();
  next.ui.customRange = next.ui.customRange || {
    start: formatInputDate(shiftDate(today, -6)),
    end: formatInputDate(today),
  };

  next.nextRules = {
    prioritizeTime: next.nextRules?.prioritizeTime ?? true,
    prioritizeImportant: next.nextRules?.prioritizeImportant ?? true,
  };
  next.theme = next.theme === "custom" ? "custom" : next.theme || "paper";
  next.customBackgroundImage = next.customBackgroundImage || "";
  next.dayStart = next.dayStart || "00:00";
  next.defaultDuration = Number(next.defaultDuration) || 25;
  next.showCompletedOpen = Boolean(next.ui.groupOpen.completed);
  next.ai = { ...aiDefaults, ...(next.ai || {}) };
  next.ai.overall = { ...aiDefaults.overall, ...(next.ai.overall || {}) };
  next.ai.weekly = { ...aiDefaults.weekly, ...(next.ai.weekly || {}) };
  next.ai.daily = { ...aiDefaults.daily, ...(next.ai.daily || {}) };
  next.ai.overall.procrastination = Array.isArray(next.ai.overall.procrastination) ? next.ai.overall.procrastination : [];
  next.ai.promptText = next.ai.promptText || "";
  next.ai.resultText = next.ai.resultText || "";

  next.tasks = (next.tasks || []).map((task) => ({
    repeatMode: task.repeatMode || "none",
    weekdays: task.weekdays || [],
    timerMode: task.timerMode || "up",
    scheduledDate: task.scheduledDate || null,
    ...task,
  }));

  if (next.activeTimer?.taskId) {
    const activeTask = next.tasks.find((task) => task.id === next.activeTimer.taskId);
    next.activeTimer.mode = next.activeTimer.mode || activeTask?.timerMode || "up";
    next.activeTimer.durationMin = next.activeTimer.durationMin || activeTask?.durationMin || next.defaultDuration;
  }

  return next;
}

function boot() {
  applyPageFromUrl();
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  bindEvents();
  registerPwa();
  renderAll();
  startTicker();
}

function applyTheme() {
  const currentTheme = state.theme === "custom" ? "custom" : "paper";
  dom.body.dataset.theme = currentTheme;
  if (currentTheme === "custom" && state.customBackgroundImage) {
    dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
    dom.body.classList.add("has-custom-background");
  } else {
    dom.body.style.removeProperty("--custom-paper-image");
    dom.body.classList.remove("has-custom-background");
  }
  applyBodyFlags();
}

function applyBodyFlags() {
  dom.body.classList.toggle("reduce-texture", Boolean(state.reduceTexture));
}

function ensureSettingsStructure() {
  const settingsPage = document.querySelector('.page[data-page="settings"]');
  const settingsSheet = settingsPage?.querySelector(".settings-sheet");
  if (!settingsSheet) return;

  const heroDate = settingsPage.querySelector(".hero-date");
  const heroNote = settingsPage.querySelector(".hero-note");
  if (heroDate) heroDate.textContent = "";
  if (heroNote) heroNote.remove();

  settingsSheet.dataset.layout = "v3";
  settingsSheet.classList.add("settings-sheet-clean");
  settingsSheet.innerHTML = `
    <section class="settings-group">
      <div class="settings-group-title">App</div>
      <div class="settings-list-block">
        <button class="settings-install-button" id="pwa-install-button" type="button">Install app</button>
        <p class="settings-weak-note" id="pwa-install-note">Install directly from here.</p>
      </div>
    </section>
    <section class="settings-group">
      <div class="settings-group-title">Planning</div>
      <div class="settings-list-block">
        <button class="settings-row settings-row-link" id="ai-planner-link" type="button">
          <span class="settings-row-label">✨ AI 生成日程</span>
          <span class="settings-row-arrow" aria-hidden="true">›</span>
        </button>
        <label class="settings-row settings-row-toggle"><span class="settings-row-label">优先最近时间任务</span><input type="checkbox" id="next-time-priority-toggle" /></label>
        <label class="settings-row settings-row-toggle"><span class="settings-row-label">优先重要任务</span><input type="checkbox" id="next-important-priority-toggle" /></label>
        <button class="settings-row settings-row-link" id="default-duration-row" type="button">
          <span class="settings-row-label">默认任务时长</span>
          <span class="settings-row-trail"><span id="default-duration-value">25 min</span><span class="settings-row-arrow" aria-hidden="true">›</span></span>
        </button>
        <button class="settings-row settings-row-link" id="day-start-row" type="button">
          <span class="settings-row-label">一天开始时间</span>
          <span class="settings-row-trail"><span id="day-start-value">00:00</span><span class="settings-row-arrow" aria-hidden="true">›</span></span>
        </button>
      </div>
    </section>
    <section class="settings-group">
      <div class="settings-group-title">Appearance</div>
      <div class="settings-list-block settings-theme-block">
        <div class="settings-subtitle">Theme</div>
        <div class="settings-theme-grid" id="theme-grid"></div>
        <button class="settings-row settings-row-link" id="custom-background-row" type="button">
          <span class="settings-row-label">背景图片</span>
          <span class="settings-row-trail"><span id="custom-background-value">未上传</span><span class="settings-row-arrow" aria-hidden="true">›</span></span>
        </button>
        <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
      </div>
    </section>
    <section class="settings-group">
      <div class="settings-group-title">Preferences</div>
      <div class="settings-list-block">
        <label class="settings-row settings-row-toggle"><span class="settings-row-label">Completed 默认展开</span><input type="checkbox" id="completed-default-toggle" /></label>
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
      <input type="checkbox" id="reduce-texture-toggle" />
    </div>
  `;
}

function ensureAiPlannerPage() {
  let aiPage = document.querySelector('[data-page="ai-planner"]');
  const settingsPage = document.querySelector('[data-page="settings"]');
  if (!settingsPage) return;
  if (!aiPage) {
    aiPage = document.createElement("section");
    aiPage.className = "page";
    aiPage.dataset.page = "ai-planner";
    settingsPage.insertAdjacentElement("afterend", aiPage);
  }

  aiPage.innerHTML = `
    <header class="page-hero ai-page-hero">
      <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
      <div class="hero-heading"><div><h1>AI 生成日程</h1></div></div>
    </header>
    <section class="paper-sheet ai-sheet">
      <section class="ai-step"><div class="settings-group-title">三层规划体系</div><div class="ai-cycle-grid" id="ai-cycle-grid"></div></section>
      <section class="ai-step"><div class="settings-group-title">完整工作流</div><div class="settings-list-block ai-workflow-strip" id="ai-workflow-strip"></div></section>
      <section class="ai-step"><div class="settings-group-title">填写问卷</div><div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div></section>
      <section class="ai-step"><div class="settings-group-title">生成 Prompt</div><div class="settings-list-block ai-actions"><button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 Prompt</button><textarea id="ai-prompt-output" rows="12" readonly placeholder="生成后的 Prompt 会出现在这里"></textarea></div></section>
      <section class="ai-step"><div class="settings-group-title">复制给 AI · 粘贴结果</div><div class="settings-list-block ai-actions"><button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 Prompt</button><textarea id="ai-result-input" rows="10" placeholder="把 AI 返回的结构化计划粘贴到这里"></textarea></div></section>
      <section class="ai-step"><div class="settings-group-title">预览导入</div><div class="settings-list-block ai-actions"><div class="sheet-button-row ai-import-actions"><button class="ghost-button ai-action-button" id="ai-preview-import" type="button">预览</button><button class="ghost-button ai-action-button" id="ai-import-plan" type="button">导入到 To-do</button></div><div class="ai-preview-list" id="ai-preview-list"></div></div></section>
    </section>
  `;
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
  dom.customBackgroundRow = document.getElementById("custom-background-row");
  dom.customBackgroundInput = document.getElementById("custom-background-input");
  dom.customBackgroundValue = document.getElementById("custom-background-value");
  dom.aiPlannerLink = document.getElementById("ai-planner-link");
  dom.defaultDurationRow = document.getElementById("default-duration-row");
  dom.defaultDurationValue = document.getElementById("default-duration-value");
  dom.dayStartRow = document.getElementById("day-start-row");
  dom.dayStartValue = document.getElementById("day-start-value");
  dom.aiPageBack = document.getElementById("ai-page-back");
  dom.aiCycleGrid = document.getElementById("ai-cycle-grid");
  dom.aiWorkflowStrip = document.getElementById("ai-workflow-strip");
  dom.aiQuestionnaire = document.getElementById("ai-questionnaire");
  dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
  dom.aiPromptOutput = document.getElementById("ai-prompt-output");
  dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
  dom.aiResultInput = document.getElementById("ai-result-input");
  dom.aiPreviewImport = document.getElementById("ai-preview-import");
  dom.aiImportPlan = document.getElementById("ai-import-plan");
  dom.aiPreviewList = document.getElementById("ai-preview-list");
}

function upgradeState(current) {
  const next = current || createSeedState();
  const today = new Date();
  const aiDefaults = createDefaultAiState();

  next.ui = next.ui || {};
  next.ui.groupOpen = {
    overdue: next.ui.groupOpen?.overdue ?? true,
    today: next.ui.groupOpen?.today ?? true,
    flexible: next.ui.groupOpen?.flexible ?? true,
    completed: next.ui.groupOpen?.completed ?? Boolean(next.showCompletedOpen),
  };
  next.ui.taskAdvancedOpen = next.ui.taskAdvancedOpen ?? false;
  next.ui.taskWeekdays = next.ui.taskWeekdays || [];
  next.ui.taskTimerMode = next.ui.taskTimerMode || "up";
  next.ui.taskDatePreset = next.ui.taskDatePreset || "none";
  next.ui.aiPreviewItems = Array.isArray(next.ui.aiPreviewItems) ? next.ui.aiPreviewItems : [];
  next.ui.customRange = next.ui.customRange || {
    start: formatInputDate(shiftDate(today, -6)),
    end: formatInputDate(today),
  };

  next.nextRules = {
    prioritizeTime: next.nextRules?.prioritizeTime ?? true,
    prioritizeImportant: next.nextRules?.prioritizeImportant ?? true,
  };
  next.theme = next.theme === "custom" ? "custom" : next.theme || "paper";
  next.customBackgroundImage = next.customBackgroundImage || "";
  next.dayStart = next.dayStart || "00:00";
  next.defaultDuration = Number(next.defaultDuration) || 25;
  next.showCompletedOpen = Boolean(next.ui.groupOpen.completed);
  next.ai = { ...aiDefaults, ...(next.ai || {}) };
  next.ai.overall = { ...aiDefaults.overall, ...(next.ai.overall || {}) };
  next.ai.weekly = { ...aiDefaults.weekly, ...(next.ai.weekly || {}) };
  next.ai.daily = { ...aiDefaults.daily, ...(next.ai.daily || {}) };
  next.ai.overall.procrastination = Array.isArray(next.ai.overall.procrastination) ? next.ai.overall.procrastination : [];
  next.ai.promptText = next.ai.promptText || "";
  next.ai.resultText = next.ai.resultText || "";

  next.tasks = (next.tasks || []).map((task) => ({
    repeatMode: task.repeatMode || "none",
    weekdays: task.weekdays || [],
    timerMode: task.timerMode || "up",
    scheduledDate: task.scheduledDate || null,
    ...task,
  }));

  if (next.activeTimer?.taskId) {
    const activeTask = next.tasks.find((task) => task.id === next.activeTimer.taskId);
    next.activeTimer.mode = next.activeTimer.mode || activeTask?.timerMode || "up";
    next.activeTimer.durationMin = next.activeTimer.durationMin || activeTask?.durationMin || next.defaultDuration;
  }

  return next;
}

function boot() {
  applyPageFromUrl();
  ensureSettingsStructure();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  bindEvents();
  registerPwa();
  renderAll();
  startTicker();
}

function applyTheme() {
  const currentTheme = state.theme === "custom" ? "custom" : "paper";
  dom.body.dataset.theme = currentTheme;
  if (currentTheme === "custom" && state.customBackgroundImage) {
    dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
    dom.body.classList.add("has-custom-background");
  } else {
    dom.body.style.removeProperty("--custom-paper-image");
    dom.body.classList.remove("has-custom-background");
  }
  applyBodyFlags();
}

function applyBodyFlags() {
  dom.body.classList.toggle("reduce-texture", Boolean(state.reduceTexture));
}

function ensureSettingsStructure() {
  const settingsPage = document.querySelector('.page[data-page="settings"]');
  const settingsSheet = settingsPage?.querySelector(".settings-sheet");
  if (!settingsSheet) return;

  const heroDate = settingsPage.querySelector(".hero-date");
  const heroNote = settingsPage.querySelector(".hero-note");
  if (heroDate) heroDate.textContent = "";
  if (heroNote) heroNote.remove();

  settingsSheet.dataset.layout = "v3";
  settingsSheet.classList.add("settings-sheet-clean");
  settingsSheet.innerHTML = `
    <section class="settings-group">
      <div class="settings-group-title">App</div>
      <div class="settings-list-block">
        <button class="settings-install-button" id="pwa-install-button" type="button">Install app</button>
        <p class="settings-weak-note" id="pwa-install-note">Install directly from here.</p>
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
          <input type="checkbox" id="next-time-priority-toggle" />
        </label>
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">优先重要任务</span>
          <input type="checkbox" id="next-important-priority-toggle" />
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
        <div class="settings-theme-grid" id="theme-grid"></div>
        <button class="settings-row settings-row-link" id="custom-background-row" type="button">
          <span class="settings-row-label">背景图片</span>
          <span class="settings-row-trail">
            <span id="custom-background-value">未上传</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </span>
        </button>
        <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
      </div>
    </section>

    <section class="settings-group">
      <div class="settings-group-title">Preferences</div>
      <div class="settings-list-block">
        <label class="settings-row settings-row-toggle">
          <span class="settings-row-label">Completed 默认展开</span>
          <input type="checkbox" id="completed-default-toggle" />
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
  let aiPage = document.querySelector('[data-page="ai-planner"]');
  const settingsPage = document.querySelector('[data-page="settings"]');
  if (!settingsPage) return;
  if (!aiPage) {
    aiPage = document.createElement("section");
    aiPage.className = "page";
    aiPage.dataset.page = "ai-planner";
    settingsPage.insertAdjacentElement("afterend", aiPage);
  }

  aiPage.innerHTML = `
    <header class="page-hero ai-page-hero">
      <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">‹</button>
      <div class="hero-heading">
        <div><h1>AI 生成日程</h1></div>
      </div>
    </header>

    <section class="paper-sheet ai-sheet">
      <section class="ai-step">
        <div class="settings-group-title">三层规划体系</div>
        <div class="ai-cycle-grid" id="ai-cycle-grid"></div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">完整工作流</div>
        <div class="settings-list-block ai-workflow-strip" id="ai-workflow-strip"></div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">填写问卷</div>
        <div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">生成 Prompt</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">生成 Prompt</button>
          <textarea id="ai-prompt-output" rows="12" readonly placeholder="生成后的 Prompt 会出现在这里"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">复制给 AI · 粘贴结果</div>
        <div class="settings-list-block ai-actions">
          <button class="ghost-button ai-action-button" id="ai-copy-prompt" type="button">复制 Prompt</button>
          <textarea id="ai-result-input" rows="10" placeholder="把 AI 返回的结构化计划粘贴到这里"></textarea>
        </div>
      </section>

      <section class="ai-step">
        <div class="settings-group-title">预览导入</div>
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
  dom.customBackgroundRow = document.getElementById("custom-background-row");
  dom.customBackgroundInput = document.getElementById("custom-background-input");
  dom.customBackgroundValue = document.getElementById("custom-background-value");
  dom.aiPlannerLink = document.getElementById("ai-planner-link");
  dom.defaultDurationRow = document.getElementById("default-duration-row");
  dom.defaultDurationValue = document.getElementById("default-duration-value");
  dom.dayStartRow = document.getElementById("day-start-row");
  dom.dayStartValue = document.getElementById("day-start-value");
  dom.aiPageBack = document.getElementById("ai-page-back");
  dom.aiCycleGrid = document.getElementById("ai-cycle-grid");
  dom.aiWorkflowStrip = document.getElementById("ai-workflow-strip");
  dom.aiQuestionnaire = document.getElementById("ai-questionnaire");
  dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
  dom.aiPromptOutput = document.getElementById("ai-prompt-output");
  dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
  dom.aiResultInput = document.getElementById("ai-result-input");
  dom.aiPreviewImport = document.getElementById("ai-preview-import");
  dom.aiImportPlan = document.getElementById("ai-import-plan");
  dom.aiPreviewList = document.getElementById("ai-preview-list");
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
  if (task) {
    state.ui.createTaskSelection = {
      folderId: task.folderId,
      categoryId: task.categoryId,
      templateId: task.templateId,
    };
  } else if (!state.ui.createTaskSelection) {
    state.ui.createTaskSelection = null;
  }

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
  syncDocumentLanguage();

  const navTextByPage = {
    home: uiText("nav.home", "Home"),
    stats: uiText("nav.stats", "Stats"),
    tasks: uiText("nav.tasks", "Tasks"),
    settings: uiText("nav.settings", "Settings"),
  };
  dom.navItems.forEach((item) => {
    const labelNode = item.querySelector("span:last-child");
    const text = navTextByPage[item.dataset.target];
    if (labelNode && text) labelNode.textContent = text;
  });

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
    const sortActionLabel = state.ui.todoSortMode
      ? uiText("todo.sort.done", "Done sorting")
      : uiText("todo.sort.start", "Sort tasks");
    dom.todoSortToggle.innerHTML = renderPencilIconMarkup(sortActionLabel);
    dom.todoSortToggle.setAttribute("aria-label", sortActionLabel);
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
      <div class="timer-strip-shell ${state.activeTimer.running ? "is-running" : "is-paused"}" style="--timer-wash:${alphaColor(timerState.color, state.activeTimer.running ? 0.2 : 0.12)}; --timer-color:${timerState.color};">
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
            : `<p class="empty-note">${groupKey === "flexible" ? "No flexible tasks." : "This section is empty right now."}</p>`
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
    renderTaskGroup("overdue", uiText("group.overdue", "Overdue"), groups.overdue),
    renderTaskGroup("today", uiText("group.today", "Today"), groups.today),
    renderTaskGroup("flexible", uiText("group.flexible", "Flexible"), groups.flexible),
    renderTaskGroup("completed", uiText("group.completed", "Completed"), groups.completed, true),
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
  if (task) {
    state.ui.createTaskSelection = {
      folderId: task.folderId,
      categoryId: task.categoryId,
      templateId: task.templateId,
    };
  } else if (!state.ui.createTaskSelection) {
    state.ui.createTaskSelection = null;
  }

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
  renderAiPlanner();
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
  const categoryBack = document.getElementById("category-back-button");
  if (categoryBack) {
    categoryBack.textContent = "<";
    categoryBack.onclick = () => openSheet("task-sheet");
  }

  if (dom.todoSortToggle) {
    const sortActionLabel = state.ui.todoSortMode
      ? uiText("todo.sort.done", "Done sorting")
      : uiText("todo.sort.start", "Sort tasks");
    dom.todoSortToggle.innerHTML = renderPencilIconMarkup(sortActionLabel);
    dom.todoSortToggle.setAttribute("aria-label", sortActionLabel);
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
    const sortActionLabel = state.ui.todoSortMode
      ? uiText("todo.sort.done", "Done sorting")
      : uiText("todo.sort.start", "Sort tasks");
    dom.todoSortToggle.innerHTML = renderPencilIconMarkup(sortActionLabel);
    dom.todoSortToggle.setAttribute("aria-label", sortActionLabel);
    dom.todoSortToggle.classList.toggle("is-active", Boolean(state.ui.todoSortMode));
    dom.todoSortToggle.onclick = () => {
      state.ui.todoSortMode = !state.ui.todoSortMode;
      state.ui.editingTaskNoteId = null;
      renderHome();
      persistState();
    };
  }

  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", uiText("group.overdue", "Overdue"), groups.overdue),
    renderTaskGroup("today", uiText("group.today", "Today"), groups.today),
    renderTaskGroup("flexible", uiText("group.flexible", "Flexible"), groups.flexible),
    renderTaskGroup("completed", uiText("group.completed", "Completed"), groups.completed, true),
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
  if (showWeekdays) {
    dom.taskWeekdaysField.removeAttribute("hidden");
    dom.taskWeekdaysField.style.display = "grid";
  } else {
    dom.taskWeekdaysField.setAttribute("hidden", "");
    dom.taskWeekdaysField.style.display = "none";
  }

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
if (!window.__cleanAdventureUiFinalPass) {
  window.__cleanAdventureUiFinalPass = true;

  const cleanAdventureBaseRefresh = refreshDynamicDomRefs;
  refreshDynamicDomRefs = function () {
    cleanAdventureBaseRefresh();
    dom.statsPickerSheet = document.getElementById("stats-picker-sheet");
    dom.statsPickerTitle = document.getElementById("stats-picker-title");
    dom.statsPickerBreadcrumb = document.getElementById("stats-picker-breadcrumb");
    dom.statsPickerList = document.getElementById("stats-picker-list");
    dom.statsCascadeButton = document.getElementById("stats-cascade-button");
    dom.aiCycleGrid = document.getElementById("ai-cycle-grid");
    dom.aiWorkflowStrip = document.getElementById("ai-workflow-strip");
    dom.aiQuestionnaire = document.getElementById("ai-questionnaire");
    dom.aiGeneratePrompt = document.getElementById("ai-generate-prompt");
    dom.aiPromptOutput = document.getElementById("ai-prompt-output");
    dom.aiCopyPrompt = document.getElementById("ai-copy-prompt");
    dom.aiResultInput = document.getElementById("ai-result-input");
    dom.aiPreviewImport = document.getElementById("ai-preview-import");
    dom.aiImportPlan = document.getElementById("ai-import-plan");
    dom.aiPreviewList = document.getElementById("ai-preview-list");
  };

  const getFolderContextById = (folderId) => state.folders.find((folder) => folder.id === folderId) || null;

  const getCategoryContextById = (categoryId) => {
    for (const folder of state.folders) {
      const category = folder.categories.find((entry) => entry.id === categoryId);
      if (category) return { folder, category };
    }
    return null;
  };

  const getTemplateContextById = (templateId) => {
    for (const folder of state.folders) {
      for (const category of folder.categories) {
        const template = category.templates.find((entry) => entry.id === templateId);
        if (template) return { folder, category, template };
      }
    }
    return null;
  };

  const syncStatsCascadeState = (selection) => {
    state.ui.statsCascadeSelection = selection;
    state.ui.statsFolderFilter = selection.folderId;
    state.ui.statsSubcategoryFilter = selection.categoryId;
    state.ui.statsTemplateFilter = selection.templateId;
  };

  const ensureStatsCascadeSelection = () => {
    const current = state.ui.statsCascadeSelection || {};
    let folderId = current.folderId || state.ui.statsFolderFilter || "all";
    let categoryId = current.categoryId || state.ui.statsSubcategoryFilter || "all";
    let templateId = current.templateId || state.ui.statsTemplateFilter || "all";

    if (folderId === "all") {
      categoryId = "all";
      templateId = "all";
    } else if (categoryId === "all") {
      templateId = "all";
    }

    const selection = { folderId, categoryId, templateId };
    syncStatsCascadeState(selection);
    state.ui.statsPickerTrail = Array.isArray(state.ui.statsPickerTrail) ? state.ui.statsPickerTrail : [];
    return selection;
  };

  const buildStatsCategoryTree = () =>
    state.folders.reduce((tree, folder, folderIndex) => {
      const fallbackColor = CATEGORY_COLORS[folderIndex % CATEGORY_COLORS.length];
      tree[folder.id] = {
        id: folder.id,
        kind: "folder",
        label: folder.name,
        color: fallbackColor,
        children: folder.categories.reduce((categoryMap, category) => {
          categoryMap[category.id] = {
            id: category.id,
            kind: "category",
            label: category.name,
            color: category.color || fallbackColor,
            children: category.templates.reduce((templateMap, template) => {
              templateMap[template.id] = {
                id: template.id,
                kind: "template",
                label: template.name,
                color: category.color || fallbackColor,
              };
              return templateMap;
            }, {}),
          };
          return categoryMap;
        }, {}),
      };
      return tree;
    }, {});

  const buildStatsPickerTrailFromSelection = (selection, tree) => {
    const trail = [];
    if (selection.folderId !== "all" && tree[selection.folderId]) {
      trail.push({ id: selection.folderId, kind: "folder", label: tree[selection.folderId].label, color: tree[selection.folderId].color });
    }
    if (selection.folderId !== "all" && selection.categoryId !== "all" && tree[selection.folderId]?.children?.[selection.categoryId]) {
      const category = tree[selection.folderId].children[selection.categoryId];
      trail.push({ id: selection.categoryId, kind: "category", label: category.label, color: category.color, folderId: selection.folderId });
    }
    return trail;
  };

  const formatStatsCascadeLabel = (selection) => {
    const folder = selection.folderId === "all" ? null : getFolderContextById(selection.folderId);
    const categoryContext = selection.categoryId === "all" ? null : getCategoryContextById(selection.categoryId);
    const templateContext = selection.templateId === "all" ? null : getTemplateContextById(selection.templateId);
    return [folder?.name || "All", categoryContext?.category.name || "All", templateContext?.template.name || "All"].join(" / ");
  };

  const getStatsPickerItems = (trail, tree) => {
    if (!trail.length) {
      return [{ kind: "all-root", id: "all-root", label: "All", color: "#FFCC33" }, ...Object.values(tree).map((folder) => ({ ...folder }))];
    }

    if (trail.length === 1) {
      const folder = tree[trail[0].id];
      if (!folder) return [];
      return [{ kind: "all-category", id: `all-${folder.id}`, label: "All", color: folder.color, folderId: folder.id }, ...Object.values(folder.children).map((category) => ({ ...category, folderId: folder.id }))];
    }

    const folder = tree[trail[0].id];
    const category = folder?.children?.[trail[1].id];
    if (!folder || !category) return [];

    return [{ kind: "all-template", id: `all-${category.id}`, label: "All", color: category.color, folderId: folder.id, categoryId: category.id }, ...Object.values(category.children).map((template) => ({ ...template, folderId: folder.id, categoryId: category.id }))];
  };

  const getStatsPickerTaskCount = (item, tree) => {
    if (item.kind === "template") return 1;
    if (item.kind === "all-root") {
      return Object.values(tree).reduce((sum, folder) => sum + Object.values(folder.children || {}).reduce((folderSum, category) => folderSum + Object.keys(category.children || {}).length, 0), 0);
    }
    if (item.kind === "folder" || item.kind === "all-category") {
      const folder = tree[item.folderId || item.id];
      if (!folder) return 0;
      return Object.values(folder.children || {}).reduce((sum, category) => sum + Object.keys(category.children || {}).length, 0);
    }
    if (item.kind === "category" || item.kind === "all-template") {
      const category = tree[item.folderId]?.children?.[item.categoryId || item.id];
      return category ? Object.keys(category.children || {}).length : 0;
    }
    return 0;
  };

  const applyStatsCascadeSelection = (nextSelection) => {
    const selection = { folderId: nextSelection.folderId || "all", categoryId: nextSelection.categoryId || "all", templateId: nextSelection.templateId || "all" };
    syncStatsCascadeState(selection);
    state.ui.statsPickerTrail = [];
    state.ui.selectedSegment = null;
    closeAllSheets(false);
    renderStats();
    persistState();
  };

  const formatStatsPickerCount = (count) => `${count} task${count === 1 ? "" : "s"}`;
  const getStatsPickerDisplayCount = (item) => {
    if (item.kind === "all-root") return state.tasks.length;
    if (item.kind === "folder" || item.kind === "all-category") {
      const folderId = item.folderId || item.id;
      return state.tasks.filter((task) => task.folderId === folderId).length;
    }
    if (item.kind === "category" || item.kind === "all-template") {
      const folderId = item.folderId;
      const categoryId = item.categoryId || item.id;
      return state.tasks.filter((task) => task.folderId === folderId && task.categoryId === categoryId).length;
    }
    if (item.kind === "template") {
      return state.tasks.filter((task) => task.templateId === item.id).length;
    }
    return 0;
  };

  matchesStatsCategoryFilter = function (session) {
    const selection = ensureStatsCascadeSelection();
    if (selection.folderId === "all") return true;

    const task = state.tasks.find((entry) => entry.id === session.taskId);
    if (!task) return false;
    if (task.folderId !== selection.folderId) return false;
    if (selection.categoryId !== "all" && task.categoryId !== selection.categoryId) return false;
    if (selection.templateId !== "all" && task.templateId !== selection.templateId) return false;
    return true;
  };

  renderStatsFilters = function () {
    const host = document.querySelector(".filter-row.filter-row-single");
    if (!host) return;

    const selection = ensureStatsCascadeSelection();
    host.innerHTML = `
      <button class="filter-pill stats-cascade-button" id="stats-cascade-button" type="button" aria-haspopup="dialog" aria-controls="stats-picker-sheet">
        <span class="stats-cascade-copy">
          <small>Category</small>
          <strong>${escapeHtml(formatStatsCascadeLabel(selection))}</strong>
        </span>
        <span class="stats-cascade-arrow" aria-hidden="true"></span>
      </button>
    `;

    dom.statsCascadeButton = document.getElementById("stats-cascade-button");
    if (dom.statsCascadeButton) {
      dom.statsCascadeButton.onclick = () => {
        const tree = buildStatsCategoryTree();
        state.ui.statsPickerTrail = buildStatsPickerTrailFromSelection(ensureStatsCascadeSelection(), tree);
        openSheet("stats-picker-sheet");
        renderStatsPickerSheet();
        persistState();
      };
    }

    renderStatsPickerSheet();
  };

  renderStatsPickerSheet = function () {
    if (!dom.statsPickerTitle || !dom.statsPickerBreadcrumb || !dom.statsPickerList) return;

    const tree = buildStatsCategoryTree();
    const selection = ensureStatsCascadeSelection();
    const seededTrail = Array.isArray(state.ui.statsPickerTrail)
      ? state.ui.statsPickerTrail
      : buildStatsPickerTrailFromSelection(selection, tree);
    const trail = [];

    if (seededTrail[0] && tree[seededTrail[0].id]) {
      trail.push({ id: seededTrail[0].id, kind: "folder", label: tree[seededTrail[0].id].label, color: tree[seededTrail[0].id].color });
    }
    if (seededTrail[1] && trail[0] && tree[trail[0].id]?.children?.[seededTrail[1].id]) {
      const category = tree[trail[0].id].children[seededTrail[1].id];
      trail.push({ id: seededTrail[1].id, kind: "category", label: category.label, color: category.color, folderId: trail[0].id });
    }
    state.ui.statsPickerTrail = trail;

    const titleByDepth = ["\u9009\u62e9\u4e00\u7ea7\u5206\u7c7b", "\u9009\u62e9\u4e8c\u7ea7\u5206\u7c7b", "\u9009\u62e9\u4e09\u7ea7\u4efb\u52a1"];
    dom.statsPickerTitle.textContent = titleByDepth[Math.min(trail.length, titleByDepth.length - 1)];

    dom.statsPickerBreadcrumb.innerHTML = `
      <div class="stats-picker-toolbar">
        <button class="stats-picker-back" id="stats-picker-back" type="button" ${trail.length ? "" : "disabled"}>&lt; Back</button>
      </div>
    `;

    document.getElementById("stats-picker-back")?.addEventListener("click", () => {
      if (!state.ui.statsPickerTrail.length) return;
      state.ui.statsPickerTrail = state.ui.statsPickerTrail.slice(0, -1);
      renderStatsPickerSheet();
      persistState();
    });

    const items = getStatsPickerItems(trail, tree);
    dom.statsPickerList.innerHTML = items
      .map((item, index) => {
        const count = getStatsPickerDisplayCount(item);
        const swatchColor = item.color || CATEGORY_COLORS[index % CATEGORY_COLORS.length] || "#73D2FF";
        return `
          <button
            class="stats-picker-option"
            type="button"
            data-stats-picker-item="${escapeHtml(item.id)}"
          >
            <div class="stats-picker-option-main">
              <span class="stats-picker-swatch" style="--picker-color:${swatchColor}; background:${swatchColor};"></span>
              <span class="stats-picker-copy">
                <strong>${escapeHtml(item.label)}</strong>
                <small>${escapeHtml(formatStatsPickerCount(count))}</small>
              </span>
            </div>
          </button>
        `;
      })
      .join("");

    dom.statsPickerList.querySelectorAll("[data-stats-picker-item]").forEach((button, index) => {
      const item = items[index];
      button.onclick = () => {
        if (item.kind === "all-root") {
          applyStatsCascadeSelection({ folderId: "all", categoryId: "all", templateId: "all" });
          return;
        }
        if (item.kind === "folder") {
          state.ui.statsPickerTrail = [{ id: item.id, kind: "folder", label: item.label, color: item.color }];
          renderStatsPickerSheet();
          persistState();
          return;
        }
        if (item.kind === "all-category") {
          applyStatsCascadeSelection({ folderId: item.folderId, categoryId: "all", templateId: "all" });
          return;
        }
        if (item.kind === "category") {
          state.ui.statsPickerTrail = [
            { id: item.folderId, kind: "folder", label: tree[item.folderId]?.label || item.folderId, color: tree[item.folderId]?.color || item.color },
            { id: item.id, kind: "category", label: item.label, color: item.color, folderId: item.folderId },
          ];
          renderStatsPickerSheet();
          persistState();
          return;
        }
        if (item.kind === "all-template") {
          applyStatsCascadeSelection({ folderId: item.folderId, categoryId: item.categoryId, templateId: "all" });
          return;
        }
        if (item.kind === "template") {
          applyStatsCascadeSelection({ folderId: item.folderId, categoryId: item.categoryId, templateId: item.id });
        }
      };
    });
  };

  renderTrendPanel = function () {
    if (!dom.trendToggle || !dom.trendPanel) return;

    dom.trendToggle.classList.toggle("is-open", Boolean(state.ui.showTrend));
    dom.trendToggle.innerHTML = `
      <span>Weekly trend</span>
      <span class="trend-arrow">${state.ui.showTrend ? "\u25b4" : "\u25be"}</span>
    `;
    dom.trendToggle.onclick = () => {
      state.ui.showTrend = !state.ui.showTrend;
      renderTrendPanel();
      persistState();
    };

    dom.trendPanel.hidden = !state.ui.showTrend;
    if (!state.ui.showTrend) {
      dom.trendPanel.innerHTML = "";
      return;
    }

    const palette = ["#73D2FF", "#FFCC33"];
    const trend = buildWeeklyTrend();
    dom.trendPanel.innerHTML = `
      <div class="trend-grid">
        ${trend
          .map((entry, index) => {
            const width = entry.minutes > 0 ? Math.max(entry.width, 12) : 0;
            return `
              <div class="trend-row">
                <span class="trend-date">${escapeHtml(entry.label)}</span>
                <div class="trend-bar">
                  <span style="width:${width}%; --trend-fill:${palette[index % palette.length]};"></span>
                </div>
                <strong>${formatDuration(entry.minutes)}</strong>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  };

  renderStatsWheel = function (stats) {
    if (!dom.statsWheelCard || !dom.statsLegend || !dom.statsTotalRow) return;

    const chart = state.ui.statsRange === "today" ? renderClockDialSvg(stats) : renderPieSvg(stats);
    dom.statsWheelCard.innerHTML = `
      <div class="wheel-shell wheel-shell-comic">
        ${chart}
        ${
          stats.selected
            ? `
              <div class="stats-floating-note-comic">
                <strong>${escapeHtml(stats.selected.label)}</strong>
                <span>${escapeHtml(stats.selected.note)}</span>
              </div>
            `
            : ""
        }
      </div>
    `;

    dom.statsLegend.innerHTML = stats.breakdown
      .map(
        (item) => `
          <span class="stats-legend-chip">
            <span class="stats-legend-dot" style="--legend-color:${item.color}; background:${item.color};"></span>
            <span>${escapeHtml(item.label)}</span>
          </span>
        `
      )
      .join("");

    dom.statsTotalRow.innerHTML = `
      <div class="stats-speech-bubble">
        <strong>${formatDuration(stats.totalMinutes)}</strong>
        <span>Inside this range</span>
      </div>
    `;
  };

  renderStatsBreakdown = function (stats) {
    if (!dom.statsBreakdown) return;
    if (!stats.breakdown.length) {
      dom.statsBreakdown.innerHTML = `<p class="empty-note">Nothing in this range yet.</p>`;
      return;
    }

    dom.statsBreakdown.innerHTML = stats.breakdown
      .map(
        (item) => `
          <article class="breakdown-row breakdown-sticker" style="--sticker-color:${item.color};">
            <div class="breakdown-primary">
              <span class="breakdown-dot" style="--sticker-color:${item.color}; background:${item.color};"></span>
              <span class="breakdown-name">${escapeHtml(item.label)}</span>
            </div>
            <strong class="breakdown-time">${formatDuration(item.minutes)}</strong>
          </article>
        `
      )
      .join("");
  };

  ensureAiPlannerPage = function () {
    let aiPage = document.querySelector('[data-page="ai-planner"]');
    const settingsPage = document.querySelector('[data-page="settings"]');
    if (!settingsPage) return;
    if (!aiPage) {
      aiPage = document.createElement("section");
      aiPage.className = "page";
      aiPage.dataset.page = "ai-planner";
      settingsPage.insertAdjacentElement("afterend", aiPage);
    }

    aiPage.innerHTML = `
      <header class="page-hero ai-page-hero">
        <div class="ai-page-topbar">
          <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">
            <span class="ai-page-back-symbol">&lt;</span>
          </button>
          <h1 class="ai-page-title">\u0041\u0049\u751f\u6210\u65e5\u7a0b</h1>
        </div>
      </header>

      <section class="paper-sheet ai-sheet ai-sheet-compact">
        <section class="ai-step">
          <div class="settings-group-title">\u8ba1\u5212\u5c42\u7ea7</div>
          <div class="ai-cycle-grid" id="ai-cycle-grid"></div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">\u5b8c\u6574\u6d41\u7a0b</div>
          <div class="settings-list-block ai-workflow-strip" id="ai-workflow-strip"></div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">\u586b\u5199\u95ee\u5377</div>
          <div class="settings-list-block ai-questionnaire" id="ai-questionnaire"></div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">\u751f\u6210 Prompt</div>
          <div class="settings-list-block ai-actions">
            <div class="ai-card-tools">
              <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">Generate Prompt</button>
            </div>
            <div class="ai-textarea-wrap">
              <button class="ghost-button ai-action-button ai-inline-copy" id="ai-copy-prompt" type="button">Copy Prompt</button>
              <textarea id="ai-prompt-output" rows="12" readonly placeholder="Prompt output will appear here."></textarea>
            </div>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">\u7c98\u8d34 AI \u7ed3\u679c</div>
          <div class="settings-list-block ai-actions">
            <textarea id="ai-result-input" rows="10" placeholder="Paste the AI result here."></textarea>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">\u9884\u89c8\u5bfc\u5165</div>
          <div class="settings-list-block ai-actions">
            <div class="sheet-button-row ai-import-actions">
              <button class="ghost-button ai-action-button" id="ai-preview-import" type="button">Preview</button>
              <button class="ghost-button ai-action-button" id="ai-import-plan" type="button">Import</button>
            </div>
            <div class="ai-preview-list" id="ai-preview-list"></div>
          </div>
        </section>
      </section>
    `;
  };

  const buildAiQuestionnaireZh = buildAiQuestionnaire;
  buildAiQuestionnaire = function (cycle) {
    if (getUiLanguage() === "zh") {
      return buildAiQuestionnaireZh(cycle);
    }
    const EN_MBTI_OPTIONS = ["I don't know", "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];
    const EN_CHRONOTYPE_OPTIONS = ["Early morning", "Morning", "Afternoon", "Dusk", "Night"];
    const EN_WORKSTYLE_OPTIONS = [
      { id: "A", label: "Deep focus on one task until completion" },
      { id: "B", label: "Switch between tasks to keep momentum" },
      { id: "C", label: "Fixed time blocks + Pomodoro rhythm" },
    ];
    const EN_PROCRASTINATION_OPTIONS = ["Task is unclear", "Fear of doing it wrong", "Too boring", "Too much pressure", "No clear starting point"];
    const EN_VALUE_OPTIONS = ["Career achievement", "Health", "Relationships", "Personal growth", "Financial freedom", "Creative expression", "Social contribution"];
    if (cycle === "overall") {
      return `
        <div class="ai-field">
          <label class="ai-field-label" for="ai-overall-period">Planning horizon</label>
          <select class="ai-input" id="ai-overall-period" data-ai-field="overall.period">
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div class="ai-field">
          <label class="ai-field-label" for="ai-overall-mbti">Q1 · Personality type (MBTI)</label>
          <div class="ai-question-copy">Choose the closest profile if you know it. If not, pick "I don't know" and move on.</div>
          <div class="ai-question-note">Theory note: personality preference can shape how goals feel motivating or draining.</div>
          <select class="ai-input" id="ai-overall-mbti" data-ai-field="overall.mbti">
            ${EN_MBTI_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}
          </select>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q2 · Chronotype</div>
          <div class="ai-question-copy">When do you usually feel the most mentally alive?</div>
          <div class="ai-question-note">Theory note: matching planning rhythm to circadian preference reduces friction.</div>
          <div class="ai-choice-grid">
            ${EN_CHRONOTYPE_OPTIONS.map((option) => `
              <label class="ai-choice-chip">
                <input type="radio" name="ai-overall-chronotype" data-ai-field="overall.chronotype" value="${option}" />
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q3 · Work style</div>
          <div class="ai-question-copy">Which pattern feels most natural when you work on meaningful goals?</div>
          <div class="ai-question-note">Theory note: execution style affects how plans should be chunked and sequenced.</div>
          <div class="ai-choice-stack">
            ${EN_WORKSTYLE_OPTIONS.map((option) => `
              <label class="ai-choice-line">
                <input type="radio" name="ai-overall-workstyle" data-ai-field="overall.workStyle" value="${option.label}" />
                <span>${option.id}. ${option.label}</span>
              </label>
            `).join("")}
          </div>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q4 · Procrastination triggers</div>
          <div class="ai-question-copy">Select the patterns that usually make you stall.</div>
          <div class="ai-question-note">Theory note: identifying triggers makes future planning more realistic and compassionate.</div>
          <div class="ai-choice-stack">
            ${EN_PROCRASTINATION_OPTIONS.map((option) => `
              <label class="ai-choice-line">
                <input type="checkbox" data-ai-list="overall.procrastination" value="${option}" />
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q5 · Top values</div>
          <div class="ai-question-copy">Pick the three values you most want your plan to protect.</div>
          <div class="ai-question-note">Theory note: value-aligned goals are easier to sustain over longer horizons.</div>
          <div class="ai-three-grid">
            <select class="ai-input" data-ai-field="overall.value1"><option value="">Top value 1</option>${EN_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
            <select class="ai-input" data-ai-field="overall.value2"><option value="">Top value 2</option>${EN_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
            <select class="ai-input" data-ai-field="overall.value3"><option value="">Top value 3</option>${EN_VALUE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join("")}</select>
          </div>
        </div>
        <div class="ai-field">
          <label class="ai-field-label" for="ai-overall-life-stage">Q6 · Current season</label>
          <div class="ai-question-copy">What larger life context are you planning inside right now?</div>
          <div class="ai-question-note">Theory note: the same goal means something different in different life seasons.</div>
          <input class="ai-input" id="ai-overall-life-stage" data-ai-field="overall.lifeStage" placeholder="Student, job search, startup, recovery..." />
        </div>
        <div class="ai-field">
          <label class="ai-field-label" for="ai-overall-challenge">Q7 · Main challenge</label>
          <div class="ai-question-copy">What is making planning difficult right now?</div>
          <div class="ai-question-note">Theory note: naming the real friction makes better plans than pretending it is not there.</div>
          <textarea class="ai-input ai-textarea" id="ai-overall-challenge" rows="3" data-ai-field="overall.challenge" placeholder="What is making planning difficult right now?"></textarea>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q8 · Three life domains</div>
          <div class="ai-question-copy">Choose three domains you want this quarter or year to move forward.</div>
          <div class="ai-question-note">Theory note: broad life balance is easier to maintain when goals are grouped by domain.</div>
          <div class="ai-quarterly-domain-stack">
            ${[1, 2, 3]
              .map(
                (index) => `
                  <div class="ai-quarterly-domain-card">
                    <div class="ai-quarterly-domain-row">
                      <select class="ai-input" data-ai-field="overall.domain${index}Name">
                        <option value="">Domain ${index}</option>
                        <option value="Career / Study">Career / Study</option>
                        <option value="Health">Health</option>
                        <option value="Relationships">Relationships</option>
                        <option value="Finance">Finance</option>
                        <option value="Creativity">Creativity</option>
                        <option value="Home / Life admin">Home / Life admin</option>
                        <option value="Spirituality">Spirituality</option>
                        <option value="Fun / Adventure">Fun / Adventure</option>
                      </select>
                      <input class="ai-input" data-ai-field="overall.domain${index}Goal" placeholder="Goal content" />
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (cycle === "weekly") {
      return `
        <div class="ai-field">
          <label class="ai-field-label" for="ai-weekly-period">Planning span</label>
          <select class="ai-input" id="ai-weekly-period" data-ai-field="weekly.period">
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Date range</div>
          <div class="ai-choice-grid">
            <input class="ai-input" type="date" data-ai-field="weekly.start" />
            <input class="ai-input" type="date" data-ai-field="weekly.end" />
          </div>
        </div>
        <div class="ai-field">
          <label class="ai-field-label" for="ai-weekly-review">Q1 · Review</label>
          <div class="ai-question-copy">What went better than expected last week or month? What did not happen even though you meant to do it?</div>
          <div class="ai-question-note">Theory note: growth mindset + Kolb review loop.</div>
          <textarea class="ai-input ai-textarea" id="ai-weekly-review" rows="3" data-ai-field="weekly.review" placeholder="Things that went better than expected... unfinished things and why..."></textarea>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q2 · Core tasks</div>
          <div class="ai-question-copy">If you could only finish three things this cycle, what would they be?</div>
          <div class="ai-question-note">Theory note: essentialism. Fewer priorities usually means stronger follow-through.</div>
          <div class="ai-three-grid ai-core-task-grid">
            <input class="ai-input" data-ai-field="weekly.core1" placeholder="① Core task" />
            <input class="ai-input" data-ai-field="weekly.core2" placeholder="② Core task" />
            <input class="ai-input" data-ai-field="weekly.core3" placeholder="③ Core task" />
          </div>
        </div>
        <div class="ai-field">
          <label class="ai-field-label" for="ai-weekly-energy">Q3 · Energy</label>
          <div class="ai-question-copy">How do you expect your overall energy to feel this cycle? Any special context?</div>
          <div class="ai-question-note">Theory note: energy management works better when you predict the dips before they arrive.</div>
          <div class="ai-weekly-energy-card">
            <div class="ai-weekly-energy-row">
              <input class="ai-range" id="ai-weekly-energy" type="range" min="1" max="5" step="1" data-ai-field="weekly.energy" />
              <span class="ai-range-value" data-ai-display="weekly.energy"></span>
            </div>
            <input class="ai-input" data-ai-field="weekly.energyContext" placeholder="Special context (meetings, travel, recovery, deadlines...)" />
          </div>
        </div>
        <div class="ai-field">
          <label class="ai-field-label" for="ai-weekly-commitments">Q4 · Hard commitments</label>
          <div class="ai-question-copy">What fixed commitments already exist in this cycle?</div>
          <div class="ai-question-note">Theory note: GTD starts with capturing the immovable pieces first.</div>
          <textarea class="ai-input ai-textarea" id="ai-weekly-commitments" rows="3" data-ai-field="weekly.commitments" placeholder="Meetings, appointments, classes, deadlines..."></textarea>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q5 · Obstacles</div>
          <div class="ai-question-copy">What might get in your way, and how do you want to respond if it happens?</div>
          <div class="ai-question-note">Theory note: implementation intentions make plans more resilient.</div>
          <div class="ai-obstacle-row">
            <textarea class="ai-input ai-textarea" id="ai-weekly-obstacle" rows="3" data-ai-field="weekly.obstacle" placeholder="Possible obstacle"></textarea>
            <div class="ai-obstacle-arrow" aria-hidden="true">➔</div>
            <textarea class="ai-input ai-textarea" id="ai-weekly-response" rows="3" data-ai-field="weekly.response" placeholder="Response strategy"></textarea>
          </div>
        </div>
      `;
    }
  
    return `
      <div class="ai-field">
        <label class="ai-field-label" for="ai-daily-horizon">Plan for</label>
        <select class="ai-input" id="ai-daily-horizon" data-ai-field="daily.horizon">
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>
      <div class="ai-field">
        <label class="ai-field-label" for="ai-daily-date">Date</label>
          <input class="ai-input" id="ai-daily-date" type="date" data-ai-field="daily.date" />
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q1 · Current energy</div>
          <div class="ai-question-copy">Score your state right now across three dimensions.</div>
          <div class="ai-question-note">Theory note: if several dimensions are low, maintenance tasks are often the wiser plan.</div>
          <div class="ai-meter-stack ai-daily-energy-grid">
            <label class="ai-range-block">
              <span>🏃 Body</span>
              <input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.body" />
              <span class="ai-range-value" data-ai-display="daily.body"></span>
            </label>
            <label class="ai-range-block">
              <span>🌈 Mood</span>
              <input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.mood" />
              <span class="ai-range-value" data-ai-display="daily.mood"></span>
            </label>
            <label class="ai-range-block">
              <span>🎯 Focus</span>
              <input class="ai-range" type="range" min="1" max="5" step="1" data-ai-field="daily.focus" />
              <span class="ai-range-value" data-ai-display="daily.focus"></span>
            </label>
          </div>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q2 · 3 MITs</div>
          <div class="ai-question-copy">If these three get done, today still counts as a win.</div>
          <div class="ai-question-note">Theory note: MIT planning works best when the scope is concrete and time-bounded.</div>
          <div class="ai-mit-stack">
            ${[1, 2, 3]
              .map(
                (index) => `
                  <div class="ai-mit-row ai-daily-mit-row">
                    <input class="ai-input" data-ai-field="daily.mit${index}" placeholder="${["①", "②", "③"][index - 1]} Most important task" />
                    <input class="ai-input ai-duration-input" type="number" min="5" step="5" data-ai-field="daily.mit${index}Duration" placeholder="Est. min" />
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q3 · Time windows</div>
          <div class="ai-question-copy">How many interruption-free focus windows do you actually have today?</div>
          <div class="ai-question-note">Theory note: deep work depends on protecting a few real windows, not fantasy hours.</div>
          <div class="ai-window-tag-grid">
            ${["Early morning", "Morning", "Afternoon", "Evening"]
              .map(
                (window) => `
                  <label class="ai-choice-chip ai-window-tag">
                    <input type="checkbox" data-ai-list="daily.windowTags" value="${window}" />
                    <span>${window}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="ai-field">
          <label class="ai-field-label" for="ai-daily-quick">Q4 · Kickstart</label>
          <div class="ai-question-copy">What is one five-minute action that would help you get moving?</div>
          <div class="ai-question-note">Theory note: small activation lowers the threshold for starting.</div>
          <input class="ai-input" id="ai-daily-quick" data-ai-field="daily.quickTask" placeholder="For example: clear desk, reply to one email..." />
        </div>
        <div class="ai-field">
          <div class="ai-field-label">Q5 · Distraction</div>
          <div class="ai-question-copy">What is most likely to break your attention today, and how will you protect against it?</div>
          <div class="ai-question-note">Theory note: attention management improves when the defense is chosen in advance.</div>
          <div class="ai-two-grid ai-daily-guard-grid">
            <textarea class="ai-input ai-textarea" id="ai-daily-distraction" rows="3" data-ai-field="daily.distraction" placeholder="Distraction source"></textarea>
            <textarea class="ai-input ai-textarea" id="ai-daily-strategy" rows="3" data-ai-field="daily.strategy" placeholder="Protection mechanism"></textarea>
          </div>
        </div>
      `;
    };

  renderAiPlanner = function () {
    ensureAiPlannerPage();
    refreshDynamicDomRefs();
    if (!dom.aiCycleGrid || !dom.aiWorkflowStrip || !dom.aiQuestionnaire) return;

    const cycle = state.ai.cycle || "overall";
    const cycles = AI_CYCLES_V2 || AI_CYCLES;
    const workflowSteps = AI_WORKFLOW_STEPS || ["Choose cycle", "Fill survey", "Generate", "Copy", "Paste", "Import"];

    dom.aiCycleGrid.innerHTML = cycles
      .map(
        (item) => `
          <button class="ai-cycle-card ${cycle === item.id ? "is-active" : ""}" data-ai-cycle="${item.id}" type="button">
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(item.note)}</span>
          </button>
        `
      )
      .join("");
    dom.aiWorkflowStrip.innerHTML = workflowSteps.map((step) => `<span class="ai-step-chip">${escapeHtml(step)}</span>`).join("");
    dom.aiQuestionnaire.innerHTML = buildAiQuestionnaire(cycle);

    dom.aiCycleGrid.querySelectorAll("[data-ai-cycle]").forEach((button) => {
      button.onclick = () => {
        state.ai.cycle = button.dataset.aiCycle;
        state.ui.aiPreviewItems = [];
        renderAiPlanner();
        persistState();
      };
    });

    bindAiQuestionnaireFields();

    if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
    if (dom.aiResultInput) {
      dom.aiResultInput.value = state.ai.resultText || "";
      dom.aiResultInput.oninput = (event) => {
        state.ai.resultText = event.target.value;
        persistState();
      };
    }
    if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
    if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
    if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
    if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
    if (dom.aiPageBack) {
      dom.aiPageBack.onclick = () => {
        state.currentPage = "settings";
        renderAll();
        persistState();
      };
    }

    renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
  };

  buildAiPromptText = function () {
    const cycle = state.ai.cycle || "overall";
    const overall = state.ai.overall || {};
    const weekly = state.ai.weekly || {};
    const daily = state.ai.daily || {};
    const text = (value, fallback = "未填写") => {
      if (value === 0) return "0";
      const normalized = String(value ?? "").trim();
      return normalized || fallback;
    };
    const listText = (value, fallback = "未填写") => {
      if (Array.isArray(value)) {
        const items = value.map((item) => String(item ?? "").trim()).filter(Boolean);
        return items.length ? items.join("、") : fallback;
      }
      return text(value, fallback);
    };
    const chronotypePeaks = {
      清晨: "06:00-10:00",
      上午: "09:00-12:00",
      下午: "13:00-16:00",
      傍晚: "17:00-19:00",
      夜间: "20:00-23:00",
    };
    const colorPalette = [
      ["阿宝蓝", "#A2D2FF"],
      ["老皮黄", "#FFD6A5"],
      ["泡泡糖粉", "#FFADAD"],
      ["BMO绿", "#CAFFBF"],
      ["团块紫", "#BDB2FF"],
      ["火焰橘", "#FFC3A0"],
      ["柠檬绿", "#D4F1BE"],
      ["薄荷红", "#FF8B8B"],
      ["玛瑟琳暗紫", "#9D81BA"],
      ["寒冰蓝", "#BDE0FE"],
    ];
    const categoryPaths = (state.folders || [])
      .flatMap((folder) =>
        (folder.categories || []).map((category) => `${text(folder.name, "未命名一级分类")} > ${text(category.name, "未命名二级分类")}`)
      )
      .filter(Boolean);
    const categorySection = categoryPaths.length
      ? categoryPaths.map((path, index) => `${index + 1}. ${path}`).join("\n")
      : "当前还没有现成分类。如果最终计划里确实需要新分类，请写入 newCategories。";
    const renderJsonFooter = (planType) => {
      const startTimeRule = planType === "daily" ? '"08:00"' : "null";
      const startTimeNote =
        planType === "daily"
          ? '4. daily 模式允许 startTime，格式必须为 "HH:MM"。'
          : "4. overall / weekly 模式的 startTime 必须为 null。";
      return [
        "",
        "【当前分类体系】",
        categorySection,
        "",
        "【可用颜色】",
        ...colorPalette.map(([name, hex], index) => `${index + 1}. ${name}: ${hex}`),
        "",
        "【输出约束】",
        "当我回答完你的澄清问题，并明确让你输出最终计划时，请只输出一个 JSON 对象。",
        "不要输出 Markdown 代码块，不要输出解释文字，不要输出注释。",
        "JSON 结构必须为：",
        "{",
        '  "version": "1.0",',
        `  "planType": "${planType}",`,
        '  "tasks": [',
        "    {",
        '      "title": "任务名称",',
        '      "folder": "一级分类名称",',
        '      "category": "二级分类名称",',
        '      "template": null,',
        '      "color": "阿宝蓝",',
        '      "duration": 30,',
        `      "startTime": ${startTimeRule},`,
        '      "isImportant": false',
        "    }",
        "  ],",
        '  "newCategories": []',
        "}",
        "规则：",
        "1. 优先使用我当前已有的一级/二级分类路径，不要随意新建分类。",
        "2. 如果没有合适分类，请把建议的新分类写进 newCategories，不要直接混入 tasks。",
        "3. color 只能从上面的 10 个颜色名里选择。",
        startTimeNote,
        "5. title / folder / category / color / duration / isImportant 都必须填写。",
        "6. JSON 内部不要有任何注释，确保格式 100% 正确以便我系统自动识别。",
      ].join("\n");
    };

    if (cycle === "overall") {
      const values = [overall.value1, overall.value2, overall.value3].map((value) => text(value)).join(" > ");
      const domains = [1, 2, 3]
        .map((index) => ({
          name: text(overall[`domain${index}Name`]),
          goal: text(overall[`domain${index}Goal`]),
        }))
        .map((item, index) => `领域${index + 1} (${item.name}): ${item.goal}`)
        .join("\n");

      return [
        "【角色设定】",
        "你现在是我的顶级生产力教练兼心理咨询师。请在一个持续的对话窗口中，陪我完成我的年度/季度规划。",
        "",
        "【我的用户画像】",
        `我是一个 ${text(overall.mbti)} 类型的人，时型偏向 ${text(overall.chronotype)}，我的核心价值观优先级为：${values}。`,
        `我倾向的工作风格是 ${text(overall.workStyle)}，最容易导致我拖延的触发器是 ${listText(overall.procrastination)}。`,
        "",
        "【当前阶段背景】",
        `我目前处于：${text(overall.lifeStage)}。`,
        `我面临的主要挑战是：${text(overall.challenge)}。`,
        "",
        "【初步设想的3个领域目标】",
        domains,
        "",
        "【你的首要任务（非常重要）】",
        "收到以上信息后，请不要立刻给我生成最终的规划表格！",
        "第一步，请先以教练的口吻回应我，指出我的目标与我的 MBTI/价值观 是否匹配。",
        "第二步，向我提出 2-3 个关键问题（例如：我每周有多少实际空闲时间？这些目标的具体可衡量标准是什么？），以便你更深入了解我。",
        "等我回答完你的问题后，你再为我输出最终的 OKR 路线图。",
        "明白的话，请开始你的教练提问：",
        renderJsonFooter("overall"),
      ].join("\n");
    }

    if (cycle === "weekly") {
      const reviewRaw = text(weekly.review);
      const reviewParts = String(weekly.review || "")
        .split(/\r?\n+/)
        .map((part) => part.trim())
        .filter(Boolean);
      const reviewWins = reviewParts[0] || reviewRaw;
      const reviewIssues = reviewParts.slice(1).join(" / ") || reviewRaw;
      const peakWindow = chronotypePeaks[text(overall.chronotype)] || "未填写";
      return [
        "【角色设定】",
        "你是我的私人生产力教练。现在我们要开始进行【月/周度】的执行规划。",
        "",
        "【上下文信息】",
        `我的用户画像（已在 LocalStorage 中）：${text(overall.mbti)} · ${text(overall.chronotype)} · 拖延触发：${listText(overall.procrastination)}。`,
        "",
        "【复盘数据】",
        `超预期完成：${reviewWins}`,
        `存在的问题：${reviewIssues}`,
        "",
        "【本期规划数据】",
        `核心任务 (3 MITs)：${text(weekly.core1)}, ${text(weekly.core2)}, ${text(weekly.core3)}`,
        `固定承诺：${text(weekly.commitments, "无")}`,
        `精力状态：${text(weekly.energy, "3")}/5，特殊情况：${text(weekly.energyContext, "无")}`,
        `预见的障碍：${text(weekly.obstacle, "无")} -> 应对策略：${text(weekly.response, "无")}`,
        "",
        "【你的教练指令】",
        "第一步：请基于我的精力状态和复盘结果，评价我的 3 个核心任务是否合理（是否太重或太轻？）。",
        "第二步：请根据我的 MBTI 类型（特别是 P/J 倾向），帮我安排缓冲时间。",
        "第三步：请向我确认：除了以上固定承诺，我每天大概能拿出多少小时的“专注窗口”？",
        "在我回答完你的确认问题后，请输出：",
        "按艾森豪威尔矩阵分类的任务清单。",
        `一份包含每日主题的周规划（需将核心任务对齐我的认知高峰时段：${peakWindow}）。`,
        "针对障碍的 if-then 执行清单。",
        renderJsonFooter("weekly"),
      ].join("\n");
    }

    const body = Number(daily.body || 3);
    const mood = Number(daily.mood || 3);
    const focus = Number(daily.focus || 3);
    const average = (body + mood + focus) / 3;
    const averageText = Number.isInteger(average) ? String(average) : average.toFixed(1);
    const dailyDate = text(daily.date || formatInputDate(new Date()));
    const focusWindows = Array.isArray(daily.windowTags) && daily.windowTags.length ? daily.windowTags.join("、") : "未填写";
    const peakWindow = chronotypePeaks[text(overall.chronotype)] || "未填写";

    return [
      "【角色设定】",
      "你是我的私人执行助理。现在请为我安排【今日/明日】的具体执行计划。",
      "",
      "【我的当前状态】",
      `日期：${dailyDate}`,
      `能量得分：身体 ${body}/5 · 情绪 ${mood}/5 · 专注力 ${focus}/5`,
      `综合平均分：${averageText}/5`,
      "",
      "【今日待办池】",
      "三大核心任务 (MITs)：",
      `${text(daily.mit1)} (预计 ${text(daily.mit1Duration, String(state.defaultDuration || 30))} min)`,
      `${text(daily.mit2)} (预计 ${text(daily.mit2Duration, String(state.defaultDuration || 30))} min)`,
      `${text(daily.mit3)} (预计 ${text(daily.mit3Duration, String(state.defaultDuration || 30))} min)`,
      `启动任务：${text(daily.quickTask, "无")}`,
      `专注窗口：${focusWindows}`,
      `干扰源及对策：${text(daily.distraction, "无")} -> ${text(daily.strategy, "无")}`,
      "",
      "【你的助理任务】",
      "状态自适应规划（核心）：",
      `如果平均分 ≥ 4：请催促我立刻开始 MIT1，并安排在我的高峰时段 ${peakWindow}。`,
      "如果平均分在 2-3：请建议我先做“启动任务”，然后只攻克 MIT1，其余任务灵活调整。",
      "如果平均分 ≤ 1：请温柔地劝我休息，或者只做一些机械性的行政琐事。",
      "确认提问：",
      "请问我：‘除了这三件事，今天还有什么绝对不能漏掉的杂事（琐碎但必须做）吗？’",
      "输出要求：",
      "在我回答后，请输出：",
      "小时级时间块安排表。",
      "三个 MIT 的 if-then 实施意图。",
      "今日“完成标准”（一句话总结，达到什么状态今天就算成功）。",
      renderJsonFooter("daily"),
    ].join("\n");
  };

  handleAiCopyPrompt = async function () {
    if (!state.ai.promptText) handleAiPromptGenerate();
    const value = state.ai.promptText || dom.aiPromptOutput?.value || "";
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      if (dom.aiCopyPrompt) {
        dom.aiCopyPrompt.textContent = "Copied";
        window.setTimeout(() => {
          if (dom.aiCopyPrompt) dom.aiCopyPrompt.textContent = "Copy Prompt";
        }, 1200);
      }
    } catch {
      if (dom.aiCopyPrompt) {
        dom.aiCopyPrompt.textContent = "Copy failed";
        window.setTimeout(() => {
          if (dom.aiCopyPrompt) dom.aiCopyPrompt.textContent = "Copy Prompt";
        }, 1400);
      }
    }
  };

  const AI_IMPORT_COLOR_MAP = {
    阿宝蓝: "#A2D2FF",
    老皮黄: "#FFD6A5",
    泡泡糖粉: "#FFADAD",
    BMO绿: "#CAFFBF",
    团块紫: "#BDB2FF",
    火焰橘: "#FFC3A0",
    柠檬绿: "#D4F1BE",
    薄荷红: "#FF8B8B",
    玛瑟琳暗紫: "#9D81BA",
    寒冰蓝: "#BDE0FE",
  };
  const normalizeAiImportKey = (value) => String(value ?? "").trim().toLowerCase();
  const cleanAiJsonText = (value) => {
    const source = String(value ?? "").trim();
    const fenced = source.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    return fenced ? fenced[1].trim() : source;
  };
  const getAiImportDate = () => {
    const cycle = state.ai.cycle || "overall";
    if (cycle === "daily") return state.ai.daily.date || formatInputDate(new Date());
    if (cycle === "weekly") return state.ai.weekly.start || formatInputDate(new Date());
    return null;
  };

  const legacyParseAiPlanText = parseAiPlanText;
  const findAiImportResolution = (item) => {
    const folderName = String(item.folderName ?? "").trim();
    const categoryName = String(item.categoryName ?? "").trim();
    const templateName = String(item.templateName ?? "").trim();
    const colorName = String(item.colorName ?? "").trim();
    const colorHex = AI_IMPORT_COLOR_MAP[colorName] || item.colorHex || CATEGORY_COLORS[0];

    const folderKey = normalizeAiImportKey(folderName);
    const categoryKey = normalizeAiImportKey(categoryName);
    const templateKey = normalizeAiImportKey(templateName || item.title);

    let folder = null;
    let category = null;
    let template = null;

    if (folderKey) folder = state.folders.find((entry) => normalizeAiImportKey(entry.name) === folderKey) || null;

    if (folder && categoryKey) {
      category = (folder.categories || []).find((entry) => normalizeAiImportKey(entry.name) === categoryKey) || null;
    } else if (!folder && categoryKey) {
      const globalMatches = state.folders.flatMap((entry) =>
        (entry.categories || [])
          .filter((categoryEntry) => normalizeAiImportKey(categoryEntry.name) === categoryKey)
          .map((categoryEntry) => ({ folder: entry, category: categoryEntry }))
      );
      if (globalMatches.length === 1) {
        folder = globalMatches[0].folder;
        category = globalMatches[0].category;
      }
    }

    if (category && templateKey) {
      template = (category.templates || []).find((entry) => normalizeAiImportKey(entry.name) === templateKey) || null;
    }

    if (folder && category) {
      return {
        ...item,
        folderName: folder.name,
        categoryName: category.name,
        folderId: folder.id,
        categoryId: category.id,
        templateId: template?.id || null,
        colorHex: category.color || colorHex,
        status: "matched",
        statusLabel: "Matched",
      };
    }

    if (folderName && categoryName) {
      return {
        ...item,
        colorHex,
        status: "create",
        statusLabel: "Create path",
      };
    }

    return {
      ...item,
      colorHex,
      status: "review",
      statusLabel: "Needs review",
    };
  };

  parseAiPlanText = function (rawText) {
    const source = String(rawText ?? "").trim();
    if (!source) return [];

    try {
      const payload = JSON.parse(cleanAiJsonText(source));
      if (payload && typeof payload === "object" && Array.isArray(payload.tasks)) {
        return payload.tasks
          .map((task, index) =>
            findAiImportResolution({
              id: `ai-json-${index}`,
              title: String(task?.title ?? "").trim() || `Untitled ${index + 1}`,
              folderName: String(task?.folder ?? "").trim(),
              categoryName: String(task?.category ?? "").trim(),
              templateName: task?.template == null ? "" : String(task.template).trim(),
              colorName: String(task?.color ?? "").trim(),
              colorHex: "",
              durationMin: Number(task?.duration) > 0 ? Math.round(Number(task.duration)) : state.defaultDuration,
              time:
                typeof task?.startTime === "string" && /^([01]\d|2[0-3]):([0-5]\d)$/.test(task.startTime.trim())
                  ? task.startTime.trim()
                  : "",
              isImportant: Boolean(task?.isImportant),
              selected: true,
            })
          )
          .filter((item) => item.title);
      }
    } catch {
      // fall back to legacy plain-text parsing
    }

    return legacyParseAiPlanText(source).map((item, index) =>
      findAiImportResolution({
        id: `ai-legacy-${index}`,
        title: item.name,
        folderName: "",
        categoryName: "",
        templateName: "",
        colorName: "",
        colorHex: "",
        durationMin: item.durationMin,
        time: item.time || "",
        isImportant: false,
        selected: true,
      })
    );
  };

  renderAiPreview = function (items) {
    if (!dom.aiPreviewList) return;
    if (!items.length) {
      dom.aiPreviewList.innerHTML = `<p class="empty-note">No importable items yet.</p>`;
      return;
    }

    const importDate = getAiImportDate();
    dom.aiPreviewList.innerHTML = items
      .map(
        (item, index) => `
          <label class="ai-preview-row ai-preview-row-rich ${item.selected === false ? "is-off" : ""}">
            <input class="ai-preview-check" type="checkbox" data-ai-preview-index="${index}" ${item.selected === false ? "" : "checked"} />
            <div class="ai-preview-main">
              <span class="ai-preview-name">${escapeHtml(item.title)}${item.isImportant ? ' <span class="ai-preview-important" aria-hidden="true">★</span>' : ""}</span>
              <span class="ai-preview-meta">${escapeHtml(item.folderName || "No folder")} / ${escapeHtml(item.categoryName || "No category")} · ${escapeHtml(importDate || item.time || "Any date")} · ${item.durationMin} min</span>
            </div>
            <span class="ai-preview-status ai-preview-status-${item.status}">${escapeHtml(item.statusLabel)}</span>
          </label>
        `
      )
      .join("");

    dom.aiPreviewList.querySelectorAll("[data-ai-preview-index]").forEach((input) => {
      input.onchange = () => {
        const index = Number(input.dataset.aiPreviewIndex);
        if (!Number.isFinite(index) || !Array.isArray(state.ui.aiPreviewItems) || !state.ui.aiPreviewItems[index]) return;
        state.ui.aiPreviewItems[index].selected = Boolean(input.checked);
        persistState();
      };
    });
  };

  handleAiPreviewImport = function () {
    const source = dom.aiResultInput?.value || state.ai.resultText || "";
    state.ui.aiPreviewItems = parseAiPlanText(source).filter((item) => item.title);
    renderAiPreview(state.ui.aiPreviewItems);
    persistState();
  };

  handleAiImportPlan = function () {
    if (!Array.isArray(state.ui.aiPreviewItems) || !state.ui.aiPreviewItems.length) handleAiPreviewImport();
    const items = Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems.filter((item) => item.selected !== false) : [];
    if (!items.length) return;

    const importDate = getAiImportDate();

    items
      .slice()
      .reverse()
      .forEach((item) => {
        let folder = item.folderId ? state.folders.find((entry) => entry.id === item.folderId) || null : null;
        let category = folder && item.categoryId ? (folder.categories || []).find((entry) => entry.id === item.categoryId) || null : null;

        if ((!folder || !category) && item.folderName && item.categoryName) {
          const folderKey = normalizeAiImportKey(item.folderName);
          const categoryKey = normalizeAiImportKey(item.categoryName);

          folder = state.folders.find((entry) => normalizeAiImportKey(entry.name) === folderKey) || null;
          if (!folder) {
            folder = {
              id: makeId("folder"),
              name: item.folderName,
              expanded: true,
              categories: [],
            };
            state.folders.push(folder);
          }

          category = (folder.categories || []).find((entry) => normalizeAiImportKey(entry.name) === categoryKey) || null;
          if (!category) {
            category = {
              id: makeId("cat"),
              name: item.categoryName,
              color: item.colorHex || CATEGORY_COLORS[0],
              expanded: true,
              templates: [],
            };
            folder.categories.push(category);
          }
        }

        const template =
          category && (category.templates || []).length
            ? (category.templates || []).find((entry) => normalizeAiImportKey(entry.name) === normalizeAiImportKey(item.templateName || item.title)) || null
            : null;

        state.tasks.unshift({
          id: makeId("task"),
          createdAt: new Date().toISOString(),
          completed: false,
          completedAt: null,
          note: "",
          manualOrder: -1,
          name: item.title,
          scheduledDate: importDate,
          scheduledMinutes: item.time ? parseTimeString(item.time) : null,
          durationMin: item.durationMin || state.defaultDuration,
          important: Boolean(item.isImportant),
          repeatMode: "none",
          weekdays: [],
          timerMode: "up",
          folderId: folder?.id || null,
          categoryId: category?.id || null,
          templateId: template?.id || null,
        });
      });

    if (typeof reindexTaskOrder === "function") reindexTaskOrder();

    state.ui.aiPreviewItems = [];
    state.ai.resultText = "";
    state.ai.promptText = "";
    if (dom.aiResultInput) dom.aiResultInput.value = "";
    if (dom.aiPromptOutput) dom.aiPromptOutput.value = "";
    renderAiPreview([]);
    saveAiPlannerMemory();
    renderAll();
    persistState();
    window.alert("🎉 计划已同步！");
  };

  ensureStatsCascadeSelection();
  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  renderAll();
}
if (!window.__settingsCandyTune) {
  window.__settingsCandyTune = true;

  ensureSettingsStructure = function () {
    const settingsPage = document.querySelector('.page[data-page="settings"]');
    const settingsSheet = settingsPage?.querySelector(".settings-sheet");
    if (!settingsSheet) return;

    const heroDate = settingsPage.querySelector(".hero-date");
    const heroNote = settingsPage.querySelector(".hero-note");
    if (heroDate) heroDate.textContent = "";
    if (heroNote) heroNote.remove();

    settingsSheet.dataset.layout = "v5";
    settingsSheet.classList.add("settings-sheet-clean", "settings-sheet-candy");
    settingsSheet.innerHTML = `
      <section class="settings-group settings-group-app">
        <div class="settings-group-title">App</div>
        <div class="settings-list-block">
          <div class="settings-install-actions">
            <button class="settings-install-button settings-install-row" id="pwa-install-button" data-icon="📱" type="button">Install to Home Screen</button>
            <button class="settings-row settings-row-link settings-install-row" id="apk-download-button" data-icon="📦" type="button">
              <span class="settings-row-label">Download APK</span>
            </button>
          </div>
          <p class="settings-weak-note" id="pwa-install-note">Install directly from here.</p>
        </div>
      </section>

      <section class="settings-group settings-group-planning">
        <div class="settings-group-title">Planning</div>
        <div class="settings-list-block">
          <button class="settings-row settings-row-link" id="ai-planner-link" data-icon="🤖" data-tilt="a" type="button">
            <span class="settings-row-label">AI 生成日程</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </button>
          <label class="settings-row settings-row-toggle" data-icon="⏳" data-tilt="b">
            <span class="settings-row-label">优先最近时间任务</span>
            <input type="checkbox" id="next-time-priority-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="⭐" data-tilt="c">
            <span class="settings-row-label">优先重要任务</span>
            <input type="checkbox" id="next-important-priority-toggle" />
          </label>
          <button class="settings-row settings-row-link" id="default-duration-row" data-icon="⏱️" data-tilt="d" type="button">
            <span class="settings-row-label">默认任务时长</span>
            <span class="settings-row-trail">
              <span id="default-duration-value">25 min</span>
              <span class="settings-row-arrow" aria-hidden="true">›</span>
            </span>
          </button>
          <button class="settings-row settings-row-link" id="day-start-row" data-icon="🌅" data-tilt="a" type="button">
            <span class="settings-row-label">一天开始时间</span>
            <span class="settings-row-trail">
              <span id="day-start-value">00:00</span>
              <span class="settings-row-arrow" aria-hidden="true">›</span>
            </span>
          </button>
        </div>
      </section>

      <section class="settings-group settings-group-appearance">
        <div class="settings-group-title">Appearance</div>
        <div class="settings-list-block settings-theme-block">
          <div class="settings-subtitle">Theme</div>
          <div class="settings-theme-grid" id="theme-grid"></div>
          <button class="settings-row settings-row-link" id="custom-background-row" data-icon="🖼️" data-tilt="b" type="button">
            <span class="settings-row-label">上传背景图</span>
            <span class="settings-row-trail">
              <span id="custom-background-value">未上传</span>
              <span class="settings-row-arrow" aria-hidden="true">›</span>
            </span>
          </button>
          <label class="settings-row settings-row-toggle" data-icon="✅" data-tilt="c">
            <span class="settings-row-label">Completed 默认展开</span>
            <input type="checkbox" id="completed-default-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="馃“?" data-tilt="c">
            <span class="settings-row-label">鏄剧ず鑳屾櫙妯嚎绾圭悊</span>
            <input type="checkbox" id="reduce-texture-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="馃搹" data-tilt="c">
            <span class="settings-row-label">Show paper lines</span>
            <input type="checkbox" id="reduce-texture-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="馃搹" data-tilt="c">
            <span class="settings-row-label">Show paper lines</span>
            <input type="checkbox" id="reduce-texture-toggle" />
          </label>
          <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
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
  };

  const settingsCandyBaseRender = renderSettings;
  renderSettings = function () {
    settingsCandyBaseRender();

    dom.apkDownloadButton = document.getElementById("apk-download-button");

    if (dom.customBackgroundValue) {
      dom.customBackgroundValue.textContent = state.customBackgroundImage ? "已上传" : "未上传";
    }
    if (dom.apkDownloadButton) {
      dom.apkDownloadButton.onclick = () => {
        window.open("https://github.com/lumeva/Colorful-time/releases", "_blank", "noopener");
      };
    }
    if (dom.defaultDurationRow) {
      dom.defaultDurationRow.onclick = () => {
        const raw = window.prompt("默认任务时长（分钟）", String(state.defaultDuration));
        if (raw == null) return;
        const minutes = Number(raw);
        if (!Number.isFinite(minutes) || minutes <= 0) return;
        state.defaultDuration = Math.min(240, Math.max(5, Math.round(minutes)));
        renderSettings();
        persistState();
      };
    }
    if (dom.dayStartRow) {
      dom.dayStartRow.onclick = () => {
        const raw = window.prompt("一天开始时间（HH:MM）", state.dayStart || "00:00");
        if (raw == null) return;
        const value = raw.trim();
        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) return;
        state.dayStart = value;
        renderSettings();
        persistState();
      };
    }
  };

  ensureSettingsStructure();
  refreshDynamicDomRefs();
  renderSettings();
}

if (!window.__aiPlannerLayoutAndIconPass) {
  window.__aiPlannerLayoutAndIconPass = true;
  const AI_PLANNER_MEMORY_KEY = "colorful-time-ai-memory-v1";
  let aiPlannerMemoryHydrated = false;

  const applyPhosphorEditIcons = () => {
    if (dom.todoSortToggle) {
      dom.todoSortToggle.innerHTML = renderPencilIconMarkup(state.ui.todoSortMode ? "Done sorting" : "Sort");
      dom.todoSortToggle.setAttribute("aria-label", state.ui.todoSortMode ? "Done sorting" : "Sort tasks");
      dom.todoSortToggle.classList.toggle("is-active", Boolean(state.ui.todoSortMode));
    }

    if (dom.tasksEditToggle) {
      dom.tasksEditToggle.innerHTML = renderPencilIconMarkup(state.ui.tasksEditMode ? "Done editing" : "Edit tasks");
      dom.tasksEditToggle.setAttribute("aria-label", state.ui.tasksEditMode ? "Done editing" : "Edit tasks");
      dom.tasksEditToggle.classList.toggle("is-active", Boolean(state.ui.tasksEditMode));
    }

    document.querySelectorAll("[data-edit-node]").forEach((button) => {
      button.innerHTML = renderPencilIconMarkup();
    });
  };

  const hydrateAiPlannerMemory = () => {
    if (aiPlannerMemoryHydrated) return;
    aiPlannerMemoryHydrated = true;

    try {
      const raw = window.localStorage.getItem(AI_PLANNER_MEMORY_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;

      state.ai = {
        ...state.ai,
        cycle: saved.cycle || state.ai.cycle,
        overall: { ...(state.ai.overall || {}), ...(saved.overall || {}) },
        weekly: { ...(state.ai.weekly || {}), ...(saved.weekly || {}) },
        daily: { ...(state.ai.daily || {}), ...(saved.daily || {}) },
      };
    } catch (error) {
      console.warn("Failed to hydrate AI planner memory", error);
    }
  };

  const saveAiPlannerMemory = () => {
    try {
      window.localStorage.setItem(
        AI_PLANNER_MEMORY_KEY,
        JSON.stringify({
          cycle: state.ai.cycle || "overall",
          overall: state.ai.overall || {},
          weekly: state.ai.weekly || {},
          daily: state.ai.daily || {},
        })
      );
    } catch (error) {
      console.warn("Failed to save AI planner memory", error);
    }
  };

  const AI_PLANNER_LAYOUT = "forms-v2";
  const AI_IMPORT_COLOR_MAP = {
    阿宝蓝: "#A2D2FF",
    老皮黄: "#FFD6A5",
    泡泡糖粉: "#FFADAD",
    BMO绿: "#CAFFBF",
    团块紫: "#BDB2FF",
    火焰橘: "#FFC3A0",
    柠檬绿: "#D4F1BE",
    薄荷红: "#FF8B8B",
    玛瑟琳暗紫: "#9D81BA",
    寒冰蓝: "#BDE0FE",
  };
  const normalizeAiImportKey = (value) => String(value ?? "").trim().toLowerCase();
  const cleanAiJsonText = (value) => {
    const source = String(value ?? "").trim();
    const fenced = source.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    return fenced ? fenced[1].trim() : source;
  };
  const getAiImportDate = () => {
    const cycle = state.ai.cycle || "overall";
    if (cycle === "daily") return state.ai.daily.date || formatInputDate(new Date());
    if (cycle === "weekly") return state.ai.weekly.start || formatInputDate(new Date());
    return null;
  };
  const syncAiPlannerPageShell = () => {
    const aiPage = document.querySelector('[data-page="ai-planner"]');
    if (!aiPage) return;
    const cycle = state.ai.cycle || "overall";
    const cycleSelect = aiPage.querySelector("#ai-cycle-select");
    if (cycleSelect) cycleSelect.value = cycle;
    aiPage.querySelectorAll("[data-ai-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.aiPanel === cycle);
    });
  };

  ensureAiPlannerPage = function () {
    let aiPage = document.querySelector('[data-page="ai-planner"]');
    const settingsPage = document.querySelector('[data-page="settings"]');
    if (!settingsPage) return;
    if (!aiPage) {
      aiPage = document.createElement("section");
      aiPage.className = "page";
      aiPage.dataset.page = "ai-planner";
      settingsPage.insertAdjacentElement("afterend", aiPage);
    }

    const needsRebuild =
      aiPage.dataset.aiPlannerLayout !== AI_PLANNER_LAYOUT ||
      aiPage.dataset.aiPlannerLang !== getUiLanguage() ||
      !aiPage.querySelector('[data-ai-panel="overall"]') ||
      !aiPage.querySelector("#ai-cycle-select");

    if (needsRebuild) {
      aiPage.dataset.aiPlannerLayout = AI_PLANNER_LAYOUT;
      aiPage.dataset.aiPlannerLang = getUiLanguage();
      aiPage.innerHTML = `
      <header class="page-hero ai-page-hero">
        <div class="ai-page-topbar">
          <button class="sheet-back ai-page-back" id="ai-page-back" type="button" aria-label="Back">
            <span class="ai-page-back-symbol">&lt;</span>
          </button>
          <h1 class="ai-page-title">${uiText("ai.title", "AI Planner")}</h1>
        </div>
      </header>

      <section class="paper-sheet ai-sheet ai-sheet-compact">
        <section class="ai-step">
          <div class="settings-group-title">${uiText("ai.horizon", "Planning horizon")}</div>
          <div class="settings-list-block ai-planning-select-card">
            <label class="ai-field" for="ai-cycle-select">
              <span class="ai-field-label">${uiText("ai.horizon.pick", "Choose a planning level")}</span>
              <select class="ai-input" id="ai-cycle-select">
                <option value="overall">${uiText("ai.horizon.overall", "Overall planning (Quarter / Year)")}</option>
                <option value="weekly">${uiText("ai.horizon.weekly", "Month / Week planning")}</option>
                <option value="daily">${uiText("ai.horizon.daily", "Today / Tomorrow planning")}</option>
              </select>
            </label>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">${uiText("ai.section.questionnaire", "Questionnaire")}</div>
          <div class="settings-list-block ai-questionnaire" id="ai-questionnaire">
            <div class="ai-form-panel" data-ai-panel="overall">
              <div class="ai-form-panel-head">
                <strong>${uiText("ai.panel.overall.title", "Overall planning")}</strong>
                <span>${uiText("ai.panel.overall.note", "Use this when you want quarter or year level direction.")}</span>
              </div>
              <div class="ai-form-panel-body">${buildAiQuestionnaire("overall")}</div>
            </div>
            <div class="ai-form-panel" data-ai-panel="weekly">
              <div class="ai-form-panel-head">
                <strong>${uiText("ai.panel.weekly.title", "Month / Week planning")}</strong>
                <span>${uiText("ai.panel.weekly.note", "Use this when you want a short-cycle review and execution plan.")}</span>
              </div>
              <div class="ai-form-panel-body">${buildAiQuestionnaire("weekly")}</div>
            </div>
            <div class="ai-form-panel" data-ai-panel="daily">
              <div class="ai-form-panel-head">
                <strong>${uiText("ai.panel.daily.title", "Today / Tomorrow planning")}</strong>
                <span>${uiText("ai.panel.daily.note", "Use this for day-level prioritization and time windows.")}</span>
              </div>
              <div class="ai-form-panel-body">${buildAiQuestionnaire("daily")}</div>
            </div>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">${uiText("ai.section.generate", "Generate Prompt")}</div>
          <div class="settings-list-block ai-actions">
            <div class="ai-card-tools">
              <button class="ghost-button ai-action-button" id="ai-generate-prompt" type="button">${uiText("ai.button.generate", "Generate Prompt")}</button>
            </div>
            <div class="ai-textarea-wrap">
              <button class="ghost-button ai-action-button ai-inline-copy" id="ai-copy-prompt" type="button">${uiText("ai.button.copy", "Copy Prompt")}</button>
              <textarea id="ai-prompt-output" rows="12" readonly placeholder="${uiText("ai.placeholder.prompt", "Prompt output will appear here.")}"></textarea>
            </div>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">${uiText("ai.section.paste", "Paste AI Result")}</div>
          <div class="settings-list-block ai-actions">
            <textarea id="ai-result-input" rows="10" placeholder="${uiText("ai.placeholder.result", "Paste the AI result here.")}"></textarea>
          </div>
        </section>

        <section class="ai-step">
          <div class="settings-group-title">${uiText("ai.section.preview", "Preview Import")}</div>
          <div class="settings-list-block ai-actions">
            <div class="sheet-button-row ai-import-actions">
              <button class="ghost-button ai-action-button" id="ai-preview-import" type="button">${uiText("ai.button.preview", "Preview")}</button>
              <button class="ghost-button ai-action-button" id="ai-import-plan" type="button">${uiText("ai.button.import", "Import")}</button>
            </div>
            <div class="ai-preview-list" id="ai-preview-list"></div>
          </div>
        </section>
      </section>
    `;
    }

    syncAiPlannerPageShell();
  };

  bindAiQuestionnaireFields = function () {
    if (!dom.aiQuestionnaire) return;

    dom.aiQuestionnaire.querySelectorAll("[data-ai-field]").forEach((input) => {
      const path = input.dataset.aiField;
      const value = getAiPathValue(path);
      if (input.type === "radio") {
        input.checked = value === input.value;
        input.onchange = () => {
          if (!input.checked) return;
          setAiPathValue(path, input.value);
          syncAiRangeDisplays();
          saveAiPlannerMemory();
          persistState();
        };
        return;
      }

      input.value = value ?? "";
      input.oninput = () => {
        setAiPathValue(path, input.value);
        syncAiRangeDisplays();
        saveAiPlannerMemory();
        persistState();
      };
      input.onchange = input.oninput;
    });

    dom.aiQuestionnaire.querySelectorAll("[data-ai-list]").forEach((input) => {
      const path = input.dataset.aiList;
      const list = getAiPathValue(path) || [];
      input.checked = list.includes(input.value);
      input.onchange = () => {
        const current = new Set(getAiPathValue(path) || []);
        if (input.checked) current.add(input.value);
        else current.delete(input.value);
        setAiPathValue(path, [...current]);
        saveAiPlannerMemory();
        persistState();
      };
    });

    syncAiRangeDisplays();
  };

  renderAiPlanner = function () {
    hydrateAiPlannerMemory();
    ensureAiPlannerPage();
    refreshDynamicDomRefs();
    dom.aiCycleSelect = document.getElementById("ai-cycle-select");
    if (!dom.aiCycleSelect || !dom.aiQuestionnaire) return;

    syncAiPlannerPageShell();

    dom.aiCycleSelect.onchange = () => {
      state.ai.cycle = dom.aiCycleSelect.value || "overall";
      state.ui.aiPreviewItems = [];
      saveAiPlannerMemory();
      persistState();
      renderAiPlanner();
    };

    bindAiQuestionnaireFields();

    if (dom.aiPromptOutput) dom.aiPromptOutput.value = state.ai.promptText || "";
    if (dom.aiResultInput) {
      dom.aiResultInput.value = state.ai.resultText || "";
      dom.aiResultInput.oninput = (event) => {
        state.ai.resultText = event.target.value;
        saveAiPlannerMemory();
        persistState();
      };
    }
    if (dom.aiGeneratePrompt) dom.aiGeneratePrompt.onclick = handleAiPromptGenerate;
    if (dom.aiCopyPrompt) dom.aiCopyPrompt.onclick = handleAiCopyPrompt;
    if (dom.aiPreviewImport) dom.aiPreviewImport.onclick = handleAiPreviewImport;
    if (dom.aiImportPlan) dom.aiImportPlan.onclick = handleAiImportPlan;
    if (dom.aiPageBack) {
      dom.aiPageBack.onclick = () => {
        state.currentPage = "settings";
        renderAll();
        persistState();
      };
    }

    renderAiPreview(Array.isArray(state.ui.aiPreviewItems) ? state.ui.aiPreviewItems : []);
  };

  handleAiPromptGenerate = function () {
    const value = buildAiPromptText();
    state.ai.promptText = value;
    if (dom.aiPromptOutput) dom.aiPromptOutput.value = value;
    saveAiPlannerMemory();
    persistState();
  };

  const baseRenderTasksTreeWithPencil = renderTasksTree;
  renderTasksTree = function () {
    baseRenderTasksTreeWithPencil();
    applyPhosphorEditIcons();
  };

  const baseRenderTodoGroupsWithPencil = renderTodoGroups;
  renderTodoGroups = function () {
    baseRenderTodoGroupsWithPencil();
    applyPhosphorEditIcons();
  };

  const baseRenderAllWithPencil = renderAll;
  renderAll = function () {
    baseRenderAllWithPencil();
    if (state.currentPage === "ai-planner") renderAiPlanner();
    applyPhosphorEditIcons();
  };

  ensureAiPlannerPage();
  refreshDynamicDomRefs();
  applyPhosphorEditIcons();
  renderAll();
}

if (!window.__settingsAdventureMinimalPass) {
  window.__settingsAdventureMinimalPass = true;

  const normalizeSettingsTheme = () => {
    if (state.theme === "adventure") return "adventure";
    if (state.theme === "minimalist") return "minimalist";
    if (state.theme === "custom" && state.customBackgroundImage) return "minimalist";
    return "adventure";
  };

  const setSettingsRowLabel = (rowNode, text) => {
    if (!rowNode) return;
    const labelNode = rowNode.querySelector(".settings-row-label");
    if (labelNode) labelNode.textContent = text;
    else rowNode.innerHTML = `<span class="settings-row-label">${escapeHtml(text)}</span>`;
  };

  const buildThemeCardsByLanguage = () => {
    const isZh = getUiLanguage() === "zh";
    return [
      {
        id: "adventure",
        label: isZh ? "\uD83D\uDDE1\uFE0F \u82F1\u96C4\u5192\u9669" : "\uD83D\uDDE1\uFE0F Adventure",
        tilt: "a",
      },
      {
        id: "minimalist",
        label: isZh ? "\u2601\uFE0F \u6781\u7B80\u900F\u660E" : "\u2601\uFE0F Minimalist",
        tilt: "b",
      },
    ];
  };

  const syncPwaInstallUi = () => {
    if (!dom.pwaInstallButton) return;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    setSettingsRowLabel(dom.pwaInstallButton, isStandalone ? uiText("pwa.installed", "Installed") : uiText("pwa.install", "Add to Home"));
    dom.pwaInstallButton.disabled = isStandalone;
    dom.pwaInstallButton.onclick = handlePwaInstall;

    if (dom.pwaInstallNote) {
      if (isStandalone) dom.pwaInstallNote.textContent = uiText("pwa.note.installed", "Already installed on this device.");
      else if (deferredPromptEvent) dom.pwaInstallNote.textContent = uiText("pwa.note.direct", "Install directly from here.");
      else dom.pwaInstallNote.textContent = uiText("pwa.note.manual", "If no prompt appears, open the browser menu and choose Add to Home Screen.");
    }
  };

  const syncSettingsLanguageUi = () => {
    syncDocumentLanguage();

    const setText = (selector, text) => {
      const node = document.querySelector(selector);
      if (node) node.textContent = text;
    };

    setText(".settings-group-planning .settings-group-title", uiText("settings.group.planning", "Planning"));
    setText(".settings-group-appearance .settings-group-title", uiText("settings.group.appearance", "Appearance"));
    setText(".settings-group-app .settings-group-title", uiText("settings.group.app", "App"));
    setText(".settings-group-appearance .settings-subtitle", uiText("settings.theme", "Theme"));
    setText("#ui-language-label", uiText("settings.language", "Language"));
    setText("#custom-background-row span:last-child", uiText("settings.uploadBg", "Upload Background"));
    setText("#settings-priority-time-label", uiText("settings.prioritizeTime", "Prioritize nearest-time tasks"));
    setText("#settings-priority-important-label", uiText("settings.prioritizeImportant", "Prioritize important tasks"));
    setText("#settings-completed-label", uiText("settings.completedDefault", "Expand Completed by default"));
    setText("#settings-default-duration-label", uiText("settings.defaultDuration", "Default task duration"));
    setText("#settings-day-start-label", uiText("settings.dayStart", "Day starts at"));

    setSettingsRowLabel(dom.aiPlannerLink, uiText("settings.aiPlanner", "AI Planner"));
    setSettingsRowLabel(dom.apkDownloadButton, uiText("settings.downloadApk", "Download APK"));

    const reduceTextureLabel = dom.reduceTextureToggle?.closest(".settings-row")?.querySelector(".settings-row-label");
    if (reduceTextureLabel) reduceTextureLabel.textContent = uiText("settings.paperLines", "Show paper lines");

    const languageValue = document.getElementById("ui-language-value");
    if (languageValue) {
      languageValue.textContent =
        getUiLanguage() === "zh" ? uiText("settings.language.zh", "\u4E2D\u6587") : uiText("settings.language.en", "English");
    }

    const languageRow = document.getElementById("ui-language-row");
    if (languageRow) {
      languageRow.onclick = () => {
        setUiLanguage(getUiLanguage() === "zh" ? "en" : "zh");
        renderAll();
        persistState();
      };
    }

    syncPwaInstallUi();
  };

  applyTheme = function () {
    const visualTheme = normalizeSettingsTheme();
    state.theme = visualTheme;

    dom.body.dataset.theme = visualTheme === "adventure" ? "adventure" : "paper";
    dom.body.classList.toggle("theme-adventure", visualTheme === "adventure");
    dom.body.classList.toggle("theme-minimalist", visualTheme === "minimalist");
    dom.body.style.removeProperty("--custom-paper-image");
    dom.body.classList.remove("has-custom-background");

    if (visualTheme === "minimalist" && state.customBackgroundImage) {
      dom.body.style.setProperty("--custom-paper-image", `url("${state.customBackgroundImage}")`);
      dom.body.classList.add("has-custom-background");
    }

    applyBodyFlags();
  };

  handleCustomBackgroundUpload = function (event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      state.customBackgroundImage = String(reader.result || "");
      state.theme = "minimalist";
      applyTheme();
      renderSettings();
      persistState();
      if (dom.customBackgroundInput) dom.customBackgroundInput.value = "";
    };
    reader.readAsDataURL(file);
  };

  ensureSettingsStructure = function () {
    const settingsPage = document.querySelector('.page[data-page="settings"]');
    const settingsSheet = settingsPage?.querySelector(".settings-sheet");
    if (!settingsSheet) return;

    const heroDate = settingsPage.querySelector(".hero-date");
    const heroNote = settingsPage.querySelector(".hero-note");
    if (heroDate) heroDate.textContent = "";
    if (heroNote) heroNote.remove();

    settingsSheet.dataset.layout = "v8";
    settingsSheet.classList.add("settings-sheet-clean", "settings-sheet-candy");
    settingsSheet.innerHTML = `
      <section class="settings-group settings-group-app">
        <div class="settings-group-title">App</div>
        <div class="settings-list-block">
          <div class="settings-install-actions settings-install-actions-grid">
            <button class="settings-install-button settings-install-row" id="pwa-install-button" data-icon="📱" data-tilt="a" type="button">
              <span class="settings-row-label">Add to Home</span>
            </button>
            <button class="settings-row settings-row-link settings-install-row" id="apk-download-button" data-icon="📦" data-tilt="b" type="button">
              <span class="settings-row-label">Download APK</span>
            </button>
          </div>
        </div>
      </section>

      <section class="settings-group settings-group-planning">
        <div class="settings-group-title">Planning</div>
        <div class="settings-list-block">
          <button class="settings-row settings-row-link" id="ai-planner-link" data-icon="🤖" data-tilt="a" type="button">
            <span class="settings-row-label">AI 生成日程</span>
            <span class="settings-row-arrow" aria-hidden="true">›</span>
          </button>
          <label class="settings-row settings-row-toggle" data-icon="⏳" data-tilt="b">
            <span class="settings-row-label">优先最近时间任务</span>
            <input type="checkbox" id="next-time-priority-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="⭐" data-tilt="c">
            <span class="settings-row-label">优先重要任务</span>
            <input type="checkbox" id="next-important-priority-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="✅" data-tilt="d">
            <span class="settings-row-label">Completed 默认展开</span>
            <input type="checkbox" id="completed-default-toggle" />
          </label>
          <button class="settings-row settings-row-link" id="default-duration-row" data-icon="⏱️" data-tilt="a" type="button">
            <span class="settings-row-label">默认任务时长</span>
            <span class="settings-row-trail">
              <span id="default-duration-value">25 min</span>
              <span class="settings-row-arrow" aria-hidden="true">›</span>
            </span>
          </button>
          <button class="settings-row settings-row-link" id="day-start-row" data-icon="🌅" data-tilt="b" type="button">
            <span class="settings-row-label">一天开始时间</span>
            <span class="settings-row-trail">
              <span id="day-start-value">00:00</span>
              <span class="settings-row-arrow" aria-hidden="true">›</span>
            </span>
          </button>
        </div>
      </section>

      <section class="settings-group settings-group-appearance">
        <div class="settings-group-title">Appearance</div>
        <div class="settings-list-block settings-theme-block">
          <div class="settings-subtitle">Theme</div>
          <div class="settings-theme-grid" id="theme-grid"></div>
          <div class="settings-upload-wrap">
            <button class="settings-upload-button" id="custom-background-row" type="button">
              <span aria-hidden="true">🖼️</span>
              <span>上传背景图</span>
            </button>
          </div>
          <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
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
  };

  const settingsAdventureBaseRender = renderSettings;
  renderSettings = function () {
    state.theme = normalizeSettingsTheme();
    settingsAdventureBaseRender();
    refreshDynamicDomRefs();

    dom.apkDownloadButton = document.getElementById("apk-download-button");

    if (!dom.reduceTextureToggle && dom.customBackgroundInput) {
      const textureToggleRow = document.createElement("label");
      textureToggleRow.className = "settings-row settings-row-toggle";
      textureToggleRow.dataset.icon = "📏";
      textureToggleRow.dataset.tilt = "c";
      textureToggleRow.innerHTML =
        '<span class="settings-row-label">Show paper lines</span><input type="checkbox" id="reduce-texture-toggle" />';
      dom.customBackgroundInput.insertAdjacentElement("beforebegin", textureToggleRow);
      dom.reduceTextureToggle = document.getElementById("reduce-texture-toggle");
    }

    if (dom.themeGrid) {
      dom.themeGrid.innerHTML = [
        { id: "adventure", label: "🗡️ 英雄冒险", tilt: "a" },
        { id: "minimalist", label: "☁️ 极简透明", tilt: "b" },
      ]
        .map(
          (theme) => `
            <button
              class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}"
              data-theme-card="${theme.id}"
              data-tilt="${theme.tilt}"
              type="button"
            >
              <span class="settings-theme-copy"><strong>${escapeHtml(theme.label)}</strong></span>
              <span class="settings-theme-radio" aria-hidden="true"></span>
            </button>
          `
        )
        .join("");

      dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
        button.onclick = () => {
          state.theme = button.dataset.themeCard;
          applyTheme();
          renderSettings();
          persistState();
        };
      });
    }

    syncPwaInstallUi();

    if (dom.apkDownloadButton) {
      dom.apkDownloadButton.onclick = () => {
        window.open("https://github.com/lumeva/Colorful-time/releases", "_blank", "noopener");
      };
    }

    if (dom.customBackgroundRow) {
      const canUploadBackground = state.theme === "minimalist";
      dom.customBackgroundRow.disabled = !canUploadBackground;
      dom.customBackgroundRow.classList.toggle("is-disabled", !canUploadBackground);
      dom.customBackgroundRow.classList.toggle("is-enabled", canUploadBackground);
      dom.customBackgroundRow.onclick = () => {
        if (!canUploadBackground || !dom.customBackgroundInput) return;
        dom.customBackgroundInput.value = "";
        dom.customBackgroundInput.click();
      };
    }

    if (dom.customBackgroundInput) {
      dom.customBackgroundInput.onchange = handleCustomBackgroundUpload;
    }

    if (dom.reduceTextureToggle) {
      dom.reduceTextureToggle.checked = !Boolean(state.reduceTexture);
      dom.reduceTextureToggle.onchange = (event) => {
        state.reduceTexture = !Boolean(event.target.checked);
        applyBodyFlags();
        persistState();
      };
    }
  };

  ensureSettingsStructure = function () {
    const settingsPage = document.querySelector('.page[data-page="settings"]');
    const settingsSheet = settingsPage?.querySelector(".settings-sheet");
    if (!settingsSheet) return;

    const heroDate = settingsPage.querySelector(".hero-date");
    const heroNote = settingsPage.querySelector(".hero-note");
    if (heroDate) heroDate.textContent = "";
    if (heroNote) heroNote.remove();

    settingsSheet.dataset.layout = "v8";
    settingsSheet.classList.add("settings-sheet-clean", "settings-sheet-candy");
    settingsSheet.innerHTML = `
      <section class="settings-group settings-group-planning">
        <div class="settings-group-title">Planning</div>
        <div class="settings-list-block">
          <button class="settings-row settings-row-link" id="ai-planner-link" data-icon="\uD83E\uDD16" data-tilt="a" type="button">
            <span class="settings-row-label">\u0041\u0049 \u751F\u6210\u65E5\u7A0B</span>
            <span class="settings-row-arrow" aria-hidden="true">&rsaquo;</span>
          </button>
          <label class="settings-row settings-row-toggle" data-icon="\u23F3" data-tilt="b">
            <span class="settings-row-label" id="settings-priority-time-label">\u4F18\u5148\u6700\u8FD1\u65F6\u95F4\u4EFB\u52A1</span>
            <input type="checkbox" id="next-time-priority-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="\u2B50" data-tilt="c">
            <span class="settings-row-label" id="settings-priority-important-label">\u4F18\u5148\u91CD\u8981\u4EFB\u52A1</span>
            <input type="checkbox" id="next-important-priority-toggle" />
          </label>
          <label class="settings-row settings-row-toggle" data-icon="\u2705" data-tilt="d">
            <span class="settings-row-label" id="settings-completed-label">Completed \u9ED8\u8BA4\u5C55\u5F00</span>
            <input type="checkbox" id="completed-default-toggle" />
          </label>
          <button class="settings-row settings-row-link" id="default-duration-row" data-icon="\u23F1\uFE0F" data-tilt="a" type="button">
            <span class="settings-row-label" id="settings-default-duration-label">\u9ED8\u8BA4\u4EFB\u52A1\u65F6\u957F</span>
            <span class="settings-row-trail">
              <span id="default-duration-value">25 min</span>
              <span class="settings-row-arrow" aria-hidden="true">&rsaquo;</span>
            </span>
          </button>
          <button class="settings-row settings-row-link" id="day-start-row" data-icon="\uD83C\uDF18" data-tilt="b" type="button">
            <span class="settings-row-label" id="settings-day-start-label">\u4E00\u5929\u5F00\u59CB\u65F6\u95F4</span>
            <span class="settings-row-trail">
              <span id="day-start-value">00:00</span>
              <span class="settings-row-arrow" aria-hidden="true">&rsaquo;</span>
            </span>
          </button>
        </div>
      </section>

      <section class="settings-group settings-group-appearance">
        <div class="settings-group-title">Appearance</div>
        <div class="settings-list-block settings-theme-block">
          <div class="settings-subtitle">Theme</div>
          <div class="settings-theme-grid" id="theme-grid"></div>
          <div class="settings-upload-wrap">
            <button class="settings-upload-button" id="custom-background-row" type="button">
              <span aria-hidden="true">\uD83D\uDDBC\uFE0F</span>
              <span>\u4E0A\u4F20\u80CC\u666F\u56FE</span>
            </button>
          </div>
          <button class="settings-row settings-row-link" id="ui-language-row" data-icon="\uD83C\uDF10" data-tilt="d" type="button">
            <span class="settings-row-label" id="ui-language-label">\u8BED\u8A00</span>
            <span class="settings-row-trail">
              <span id="ui-language-value">\u4E2D\u6587</span>
              <span class="settings-row-arrow" aria-hidden="true">&rsaquo;</span>
            </span>
          </button>
          <input class="settings-hidden-file" id="custom-background-input" type="file" accept="image/*" />
        </div>
      </section>

      <section class="settings-group settings-group-app">
        <div class="settings-group-title">App</div>
        <div class="settings-list-block">
          <div class="settings-install-actions settings-install-actions-grid">
            <button class="settings-install-button settings-install-row" id="pwa-install-button" data-icon="\uD83D\uDCF1" data-tilt="a" type="button">
              <span class="settings-row-label">Add to Home</span>
            </button>
            <button class="settings-row settings-row-link settings-install-row" id="apk-download-button" data-icon="\uD83D\uDCE6" data-tilt="b" type="button">
              <span class="settings-row-label">Download APK</span>
            </button>
          </div>
          <p class="settings-weak-note" id="pwa-install-note"></p>
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
  };

  const settingsAdventureFinalRender = renderSettings;
  renderSettings = function () {
    settingsAdventureFinalRender();

    const textureToggleRow = dom.reduceTextureToggle?.closest(".settings-row");
    if (textureToggleRow) {
      textureToggleRow.dataset.icon = String.fromCodePoint(0x1F4CF);
    }

    if (dom.themeGrid) {
      dom.themeGrid.innerHTML = buildThemeCardsByLanguage()
        .map(
          (theme) => `
            <button
              class="settings-theme-option ${state.theme === theme.id ? "is-active" : ""}"
              data-theme-card="${theme.id}"
              data-tilt="${theme.tilt}"
              type="button"
            >
              <span class="settings-theme-copy"><strong>${escapeHtml(theme.label)}</strong></span>
              <span class="settings-theme-radio" aria-hidden="true"></span>
            </button>
          `
        )
        .join("");

      dom.themeGrid.querySelectorAll("[data-theme-card]").forEach((button) => {
        button.onclick = () => {
          state.theme = button.dataset.themeCard;
          applyTheme();
          renderSettings();
          persistState();
        };
      });
    }

    syncSettingsLanguageUi();
  };

  applyTheme();
  ensureSettingsStructure();
  refreshDynamicDomRefs();
  renderSettings();
}

if (!window.__settingsBackupPass) {
  window.__settingsBackupPass = true;

  function buildBackupPayload() {
    return {
      backupFormat: "colorful-time-backup",
      backupVersion: 1,
      schemaVersion: STATE_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      appVersion: "local-web",
      state,
    };
  }

  function restoreBackupState(candidate) {
    const seed = createSeedState();
    const source = candidate?.backupFormat === "colorful-time-backup" && candidate?.state
      ? candidate.state
      : candidate?.state && typeof candidate.state === "object"
        ? candidate.state
        : candidate;

    if (!source || typeof source !== "object") {
      throw new Error("Backup payload is empty.");
    }

    if (!Array.isArray(source.folders) || !Array.isArray(source.tasks) || !Array.isArray(source.sessions)) {
      throw new Error("Backup payload is missing folders, tasks, or sessions.");
    }

    const restored = upgradeState({
      ...seed,
      ...source,
      ui: {
        ...seed.ui,
        ...(source.ui || {}),
        customRange: {
          ...seed.ui.customRange,
          ...(source.ui?.customRange || {}),
        },
      },
    });

    restored.currentPage = "settings";
    restored.ui.openSheet = null;
    restored.ui.treeEditor = null;
    restored.ui.selectedSegment = null;
    restored.ui.categoryTrail = Array.isArray(restored.ui.categoryTrail) ? restored.ui.categoryTrail : [];
    return restored;
  }

  function handleBackupExport() {
    try {
      const payload = buildBackupPayload();
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `colorful-time-backup-${stamp}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Backup export failed", error);
      window.alert("导出备份失败，请重试。");
    }
  }

  function handleBackupImportFile(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ""));
        if (!window.confirm("导入备份会覆盖当前设备上的本地数据，是否继续？")) {
          event.target.value = "";
          return;
        }

        state = restoreBackupState(parsed);
        closeAllSheets(false);
        applyTheme();
        ensureSettingsStructure();
        ensureAiPlannerPage();
        refreshDynamicDomRefs();
        renderAll();
        persistState();
        window.alert("备份已导入。");
      } catch (error) {
        console.error("Backup import failed", error);
        window.alert("导入失败：文件格式不正确，或不是此应用的备份。");
      } finally {
        event.target.value = "";
      }
    };
    reader.onerror = () => {
      console.error("Backup file read failed", reader.error);
      window.alert("读取备份文件失败。");
      event.target.value = "";
    };
    reader.readAsText(file, "utf-8");
  }

  const settingsBackupBaseRefresh = refreshDynamicDomRefs;
  refreshDynamicDomRefs = function () {
    settingsBackupBaseRefresh();
    dom.backupExportButton = document.getElementById("backup-export-button");
    dom.backupImportButton = document.getElementById("backup-import-button");
    dom.backupImportInput = document.getElementById("backup-import-input");
  };

  const settingsBackupBaseEnsure = ensureSettingsStructure;
  ensureSettingsStructure = function () {
    settingsBackupBaseEnsure();

    const appBlock = document.querySelector(".settings-group-app .settings-list-block");
    if (!appBlock || appBlock.querySelector(".settings-backup-actions")) return;

    const backupActions = document.createElement("div");
    backupActions.className = "settings-install-actions settings-install-actions-grid settings-backup-actions";
    backupActions.innerHTML = `
      <button class="settings-row settings-row-link settings-install-row" id="backup-export-button" data-icon="馃捀" data-tilt="c" type="button">
        <span class="settings-row-label">导出备份</span>
      </button>
      <button class="settings-row settings-row-link settings-install-row" id="backup-import-button" data-icon="馃搶" data-tilt="d" type="button">
        <span class="settings-row-label">导入备份</span>
      </button>
      <input class="settings-hidden-file" id="backup-import-input" type="file" accept="application/json,.json" />
    `;
    appBlock.appendChild(backupActions);

    const backupNote = document.createElement("p");
    backupNote.className = "settings-weak-note settings-backup-note";
    backupNote.textContent = "包含分类结构、颜色、任务、时间记录与本地设置。";
    appBlock.appendChild(backupNote);
  };

  const settingsBackupBaseRender = renderSettings;
  renderSettings = function () {
    settingsBackupBaseRender();
    refreshDynamicDomRefs();

    if (dom.backupExportButton) {
      dom.backupExportButton.onclick = handleBackupExport;
    }

    if (dom.backupImportButton) {
      dom.backupImportButton.onclick = () => {
        if (!dom.backupImportInput) return;
        dom.backupImportInput.value = "";
        dom.backupImportInput.click();
      };
    }

    if (dom.backupImportInput) {
      dom.backupImportInput.onchange = handleBackupImportFile;
    }
  };

  ensureSettingsStructure();
  refreshDynamicDomRefs();
  if (state.currentPage === "settings") {
    renderSettings();
  }
}

if (!window.__settingsBackupPagePass) {
  window.__settingsBackupPagePass = true;

  function buildBackupPayloadV2() {
    return {
      backupFormat: "colorful-time-backup",
      backupVersion: 1,
      schemaVersion: STATE_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      appVersion: "local-web",
      state,
    };
  }

  function restoreBackupStateV2(candidate) {
    const seed = createSeedState();
    const source = candidate?.backupFormat === "colorful-time-backup" && candidate?.state
      ? candidate.state
      : candidate?.state && typeof candidate.state === "object"
        ? candidate.state
        : candidate;

    if (!source || typeof source !== "object") {
      throw new Error("Backup payload is empty.");
    }

    if (!Array.isArray(source.folders) || !Array.isArray(source.tasks) || !Array.isArray(source.sessions)) {
      throw new Error("Backup payload is missing folders, tasks, or sessions.");
    }

    const restored = upgradeState({
      ...seed,
      ...source,
      ui: {
        ...seed.ui,
        ...(source.ui || {}),
        customRange: {
          ...seed.ui.customRange,
          ...(source.ui?.customRange || {}),
        },
      },
    });

    restored.currentPage = "backup";
    restored.ui.openSheet = null;
    restored.ui.treeEditor = null;
    restored.ui.selectedSegment = null;
    restored.ui.categoryTrail = Array.isArray(restored.ui.categoryTrail) ? restored.ui.categoryTrail : [];
    return restored;
  }

  function ensureBackupPage() {
    let backupPage = document.querySelector('[data-page="backup"]');
    const anchorPage =
      document.querySelector('[data-page="ai-planner"]') ||
      document.querySelector('[data-page="settings"]');
    if (!anchorPage) return;

    if (!backupPage) {
      backupPage = document.createElement("section");
      backupPage.className = "page";
      backupPage.dataset.page = "backup";
      anchorPage.insertAdjacentElement("afterend", backupPage);
    }

    backupPage.innerHTML = `
      <header class="page-hero backup-page-hero">
        <div class="backup-page-topbar">
          <button class="sheet-back backup-page-back" id="backup-page-back" type="button" aria-label="Back">&lt;</button>
          <div class="hero-heading">
            <div><h1>Backup</h1></div>
          </div>
        </div>
      </header>

      <section class="paper-sheet backup-page-sheet">
        <div class="settings-list-block backup-actions-stack">
          <button class="settings-row settings-row-link backup-action-row" id="backup-page-export" data-icon="" data-tilt="a" type="button">
            <span class="settings-row-label">导出备份</span>
          </button>
          <button class="settings-row settings-row-link backup-action-row" id="backup-page-import" data-icon="" data-tilt="b" type="button">
            <span class="settings-row-label">导入备份</span>
          </button>
          <input class="settings-hidden-file" id="backup-page-import-input" type="file" accept="application/json,.json" />
        </div>
      </section>
    `;
  }

  function syncSettingsBackupEntry() {
    const appBlock = document.querySelector(".settings-group-app .settings-list-block");
    if (!appBlock) return;

    appBlock.querySelectorAll(".settings-backup-actions, .settings-backup-note, #backup-export-button, #backup-import-button, #backup-import-input").forEach((node) => {
      const holder = node.closest(".settings-backup-actions");
      if (holder) holder.remove();
      else node.remove();
    });

    let backupEntry = document.getElementById("backup-center-link");
    if (!backupEntry) {
      backupEntry = document.createElement("button");
      backupEntry.className = "settings-row settings-row-link settings-backup-entry";
      backupEntry.id = "backup-center-link";
      backupEntry.type = "button";
      backupEntry.dataset.icon = "";
      backupEntry.dataset.tilt = "c";
      backupEntry.innerHTML = `
        <span class="settings-row-label">备份与恢复</span>
        <span class="settings-row-trail">
          <span class="settings-row-arrow" aria-hidden="true">›</span>
        </span>
      `;
      appBlock.appendChild(backupEntry);
    }

    backupEntry.onclick = () => {
      state.currentPage = "backup";
      renderAll();
      persistState();
    };
  }

  function handleBackupExportV2() {
    try {
      const payload = buildBackupPayloadV2();
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `colorful-time-backup-${stamp}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Backup export failed", error);
      window.alert("导出备份失败，请重试。");
    }
  }

  function handleBackupImportFileV2(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ""));
        if (!window.confirm("导入备份会覆盖当前设备上的本地数据，是否继续？")) {
          event.target.value = "";
          return;
        }

        state = restoreBackupStateV2(parsed);
        closeAllSheets(false);
        ensureSettingsStructure();
        ensureAiPlannerPage();
        ensureBackupPage();
        refreshDynamicDomRefs();
        applyTheme();
        renderAll();
        persistState();
        window.alert("备份已导入。");
      } catch (error) {
        console.error("Backup import failed", error);
        window.alert("导入失败：文件格式不正确，或不是此应用的备份。");
      } finally {
        event.target.value = "";
      }
    };
    reader.onerror = () => {
      console.error("Backup file read failed", reader.error);
      window.alert("读取备份文件失败。");
      event.target.value = "";
    };
    reader.readAsText(file, "utf-8");
  }

  function ensureBackupPage() {
    let backupPage = document.querySelector('[data-page="backup"]');
    const anchorPage =
      document.querySelector('[data-page="ai-planner"]') ||
      document.querySelector('[data-page="settings"]');
    if (!anchorPage) return;

    if (!backupPage) {
      backupPage = document.createElement("section");
      backupPage.className = "page";
      backupPage.dataset.page = "backup";
      anchorPage.insertAdjacentElement("afterend", backupPage);
    }

    backupPage.innerHTML = `
      <header class="page-hero backup-page-hero">
        <div class="ai-page-topbar backup-page-topbar">
          <button class="sheet-back ai-page-back backup-page-back" id="backup-page-back" type="button" aria-label="Back">
            <span class="ai-page-back-symbol">&lt;</span>
          </button>
          <h1 class="ai-page-title">\uD83D\uDCBE \u5907\u4EFD\u4E0E\u6062\u590D</h1>
        </div>
      </header>

      <section class="backup-page-sheet">
        <section class="settings-group backup-settings-group">
          <div class="settings-group-title">\u672C\u5730\u5907\u4EFD</div>
          <div class="settings-list-block backup-actions-stack">
            <button class="settings-row settings-row-link backup-action-row" id="backup-page-export" data-icon="\uD83D\uDCE4" data-tilt="a" type="button">
              <span class="settings-row-label">\u5BFC\u51FA\u5907\u4EFD</span>
            </button>
            <button class="settings-row settings-row-link backup-action-row" id="backup-page-import" data-icon="\uD83D\uDCE5" data-tilt="b" type="button">
              <span class="settings-row-label">\u5BFC\u5165\u5907\u4EFD</span>
            </button>
            <input class="settings-hidden-file" id="backup-page-import-input" type="file" accept="application/json,.json" />
          </div>
        </section>
      </section>
    `;
  }

  function syncSettingsBackupEntry() {
    const appBlock = document.querySelector(".settings-group-app .settings-list-block");
    if (!appBlock) return;

    appBlock
      .querySelectorAll(".settings-backup-actions, .settings-backup-note, #backup-export-button, #backup-import-button, #backup-import-input")
      .forEach((node) => {
        const holder = node.closest(".settings-backup-actions");
        if (holder) holder.remove();
        else node.remove();
      });

    let backupEntry = document.getElementById("backup-center-link");
    if (!backupEntry) {
      backupEntry = document.createElement("button");
      backupEntry.className = "settings-row settings-row-link settings-backup-entry";
      backupEntry.id = "backup-center-link";
      backupEntry.type = "button";
      backupEntry.dataset.tilt = "c";
      appBlock.appendChild(backupEntry);
    }

    backupEntry.dataset.icon = String.fromCodePoint(0x1F4BE);
    backupEntry.innerHTML = `
      <span class="settings-row-label">\u5907\u4EFD\u4E0E\u6062\u590D</span>
      <span class="settings-row-trail">
        <span class="settings-row-arrow" aria-hidden="true">&rsaquo;</span>
      </span>
    `;
    backupEntry.onclick = () => {
      state.currentPage = "backup";
      renderAll();
      persistState();
    };
  }

  function handleBackupExportV2() {
    try {
      const payload = buildBackupPayloadV2();
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `colorful-time-backup-${stamp}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Backup export failed", error);
      window.alert("\u5BFC\u51FA\u5907\u4EFD\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
    }
  }

  function handleBackupImportFileV2(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ""));
        if (!window.confirm("\u5BFC\u5165\u5907\u4EFD\u4F1A\u8986\u76D6\u5F53\u524D\u8BBE\u5907\u4E0A\u7684\u672C\u5730\u6570\u636E\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) {
          event.target.value = "";
          return;
        }

        state = restoreBackupStateV2(parsed);
        closeAllSheets(false);
        ensureSettingsStructure();
        ensureAiPlannerPage();
        ensureBackupPage();
        refreshDynamicDomRefs();
        applyTheme();
        renderAll();
        persistState();
        window.alert("\u5907\u4EFD\u5DF2\u5BFC\u5165\u3002");
      } catch (error) {
        console.error("Backup import failed", error);
        window.alert("\u5BFC\u5165\u5931\u8D25\uFF1A\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u6216\u4E0D\u662F\u6B64\u5E94\u7528\u7684\u5907\u4EFD\u3002");
      } finally {
        event.target.value = "";
      }
    };
    reader.onerror = () => {
      console.error("Backup file read failed", reader.error);
      window.alert("\u8BFB\u53D6\u5907\u4EFD\u6587\u4EF6\u5931\u8D25\u3002");
      event.target.value = "";
    };
    reader.readAsText(file, "utf-8");
  }

  function renderBackupPage() {
    if (!dom.backupPageBack) return;

    dom.backupPageBack.onclick = () => {
      state.currentPage = "settings";
      renderAll();
      persistState();
    };

    if (dom.backupPageExport) {
      dom.backupPageExport.onclick = handleBackupExportV2;
    }

    if (dom.backupPageImport) {
      dom.backupPageImport.onclick = () => {
        if (!dom.backupPageImportInput) return;
        dom.backupPageImportInput.value = "";
        dom.backupPageImportInput.click();
      };
    }

    if (dom.backupPageImportInput) {
      dom.backupPageImportInput.onchange = handleBackupImportFileV2;
    }
  }

  const backupPageBaseRefresh = refreshDynamicDomRefs;
  refreshDynamicDomRefs = function () {
    backupPageBaseRefresh();
    dom.backupCenterLink = document.getElementById("backup-center-link");
    dom.backupPageBack = document.getElementById("backup-page-back");
    dom.backupPageExport = document.getElementById("backup-page-export");
    dom.backupPageImport = document.getElementById("backup-page-import");
    dom.backupPageImportInput = document.getElementById("backup-page-import-input");
  };

  const backupPageBaseRenderSettings = renderSettings;
  renderSettings = function () {
    backupPageBaseRenderSettings();
    refreshDynamicDomRefs();
    syncSettingsBackupEntry();
  };

  const backupPageBaseRenderAll = renderAll;
  renderAll = function () {
    ensureBackupPage();
    refreshDynamicDomRefs();
    backupPageBaseRenderAll();
    if (state.currentPage === "backup") {
      renderBackupPage();
    }
  };

  ensureBackupPage();
  refreshDynamicDomRefs();
  if (state.currentPage === "settings") {
    syncSettingsBackupEntry();
  }
}

if (!window.__homeTimerAndStatusLogicPass) {
  window.__homeTimerAndStatusLogicPass = true;

  isTaskVisibleOnHome = function (task, today) {
    return !task.completed && (!task.scheduledDate || task.scheduledDate <= today);
  };

  isTaskOverdue = function (task, today) {
    if (!isTaskVisibleOnHome(task, today)) return false;
    return Boolean(task.scheduledDate) && task.scheduledDate < today;
  };

  isTaskForToday = function (task, today) {
    if (task.completed) return false;
    if (task.scheduledDate && task.scheduledDate !== today) return false;
    if (task.scheduledDate === today) return true;
    return task.scheduledMinutes != null;
  };

  isTaskFlexible = function (task, today) {
    if (task.completed) return false;
    if (task.scheduledDate && task.scheduledDate !== today) return false;
    return task.scheduledMinutes == null && (!task.scheduledDate || task.scheduledDate === today);
  };

  getGroupedTasks = function () {
    const today = formatInputDate(new Date());
    const incomplete = state.tasks.filter((task) => !task.completed);
    const completed = state.tasks.filter((task) => task.completed);

    return {
      overdue: incomplete.filter((task) => isTaskOverdue(task, today)).sort(sortTasksForHome),
      today: incomplete.filter((task) => isTaskForToday(task, today)).sort(sortTasksForHome),
      flexible: incomplete.filter((task) => isTaskFlexible(task, today)).sort(sortTasksForHome),
      completed: completed.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0)),
    };
  };

  finalizeRunningSession = function () {
    const active = state.activeTimer;
    if (!active?.taskId) return;

    const task = state.tasks.find((entry) => entry.id === active.taskId);
    if (!task) return;

    const elapsedMs = getElapsedMs(active);
    if (elapsedMs < 1000) return;

    const endMs = active.running
      ? Date.now()
      : new Date(active.startedAt).getTime() + (active.pausedElapsedMs || 0);
    const startMs = endMs - elapsedMs;

    state.sessions.unshift({
      id: makeId("session"),
      taskId: task.id,
      taskName: task.name,
      folderId: task.folderId || null,
      categoryId: task.categoryId || null,
      templateId: task.templateId || null,
      start: new Date(startMs).toISOString(),
      end: new Date(endMs).toISOString(),
    });
  };

  startTimerForTask = function (taskId) {
    const task = state.tasks.find((entry) => entry.id === taskId);
    if (!task) return;

    if (state.activeTimer?.taskId) {
      finalizeRunningSession();
    }

    state.activeTimer = {
      taskId,
      startedAt: new Date().toISOString(),
      pausedElapsedMs: 0,
      running: true,
      mode: task.timerMode || "up",
      durationMin: task.durationMin || state.defaultDuration,
    };

    closeAllSheets();
    renderHome();
    renderStats();
    persistState();
  };

  toggleTimer = function () {
    if (!state.activeTimer) return;

    if (state.activeTimer.running) {
      state.activeTimer.pausedElapsedMs = getElapsedMs(state.activeTimer);
      state.activeTimer.running = false;
    } else {
      state.activeTimer.startedAt = new Date(Date.now() - (state.activeTimer.pausedElapsedMs || 0)).toISOString();
      state.activeTimer.running = true;
    }

    renderHome();
    persistState();
  };

  stopTimer = function () {
    if (!state.activeTimer?.taskId) return;

    finalizeRunningSession();
    state.activeTimer = null;
    renderAll();
    persistState();
  };

  renderHomeTimerOnly = function () {
    const timerState = getTimerPresentation();

    if (!timerState) {
      dom.timerStrip.innerHTML = `
        <div class="timer-strip-shell timer-strip-shell-idle">
          <p class="timer-strip-name">Nothing running</p>
          <div class="timer-strip-bottom">
            <div class="timer-strip-clock">00:00</div>
            <div class="timer-strip-actions">
              <button class="timer-button new" id="timer-new" type="button">Start</button>
            </div>
          </div>
        </div>
      `;
    } else {
      const timerStateClass = state.activeTimer?.running ? "is-running" : "is-paused";
      dom.timerStrip.innerHTML = `
        <div class="timer-strip-shell ${timerStateClass}" style="--timer-wash:${alphaColor(timerState.color, 0.14)}; --timer-line:${alphaColor(timerState.color, 0.22)};">
          <p class="timer-strip-name">${escapeHtml(timerState.name)}</p>
          <div class="timer-strip-bottom">
            <div class="timer-strip-clock">${timerState.elapsed}</div>
            <div class="timer-strip-actions">
              <button class="timer-button ${state.activeTimer.running ? "pause" : "resume"}" id="timer-toggle" type="button">${state.activeTimer.running ? "Pause" : "Resume"}</button>
              <button class="timer-button stop" id="timer-stop" type="button">Stop</button>
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
  };
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
  renderAiPlanner();
  renderDraftDrawer();
  renderQuickSuggestions();
  renderLogSuggestions();
  renderTaskAdvancedControls();
  updateTaskTimeSummary();
  renderTaskTimeWheel();
  bindTaskTimeSheetControls();
  updateLogDuration();
}

function renderTaskRow(task, isCompleted = false) {
  const visual = getTaskVisual(task);
  const isLive = state.activeTimer?.taskId === task.id && state.activeTimer.running;
  const sortMode = state.ui.todoSortMode && !isCompleted;
  const timeText = task.scheduledMinutes == null ? "--:--" : formatMinutes(task.scheduledMinutes);
  const timeMarkup = isCompleted
    ? `<div class="task-time-block">${timeText}</div>`
    : `
        <button
          class="task-time-edit ${task.scheduledMinutes == null ? "is-empty" : ""}"
          data-task-time="${task.id}"
          type="button"
          aria-label="Set time for ${escapeHtml(task.name)}"
        >
          ${timeText}
        </button>
      `;

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
          ${task.important ? '<span class="task-star" aria-hidden="true"></span>' : ""}
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

function renderTodoGroups() {
  const groups = getGroupedTasks();
  if (dom.todoSortToggle) {
    const sortActionLabel = state.ui.todoSortMode
      ? uiText("todo.sort.done", "Done sorting")
      : uiText("todo.sort.start", "Sort tasks");
    dom.todoSortToggle.innerHTML = renderPencilIconMarkup(sortActionLabel);
    dom.todoSortToggle.setAttribute("aria-label", sortActionLabel);
    dom.todoSortToggle.classList.toggle("is-active", Boolean(state.ui.todoSortMode));
    dom.todoSortToggle.onclick = () => {
      state.ui.todoSortMode = !state.ui.todoSortMode;
      state.ui.editingTaskNoteId = null;
      renderHome();
      persistState();
    };
  }

  dom.todoGroups.innerHTML = [
    renderTaskGroup("overdue", uiText("group.overdue", "Overdue"), groups.overdue),
    renderTaskGroup("today", uiText("group.today", "Today"), groups.today),
    renderTaskGroup("flexible", uiText("group.flexible", "Flexible"), groups.flexible),
    renderTaskGroup("completed", uiText("group.completed", "Completed"), groups.completed, true),
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
  dom.todoGroups.querySelectorAll("[data-task-time]").forEach((button) => {
    button.onclick = () => openTaskTimeSheet("inline", button.dataset.taskTime);
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
        if (!draggedTodoTaskId || draggedTodoTaskId === row.dataset.taskRow) return;
        moveTaskBefore(draggedTodoTaskId, row.dataset.taskRow);
        renderHome();
        persistState();
      };
    });
  }

  bindTaskRowLongPress();
}



