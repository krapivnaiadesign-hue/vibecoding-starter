import "./style.css";

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;
const MOTION_EASING = "cubic-bezier(0.77,0,0.175,1)";
const POSITION_TRANSITION = `left 900ms ${MOTION_EASING}, top 900ms ${MOTION_EASING}, width 900ms ${MOTION_EASING}, height 900ms ${MOTION_EASING}, bottom 900ms ${MOTION_EASING}, opacity 450ms ease, transform 900ms ${MOTION_EASING}`;
const EMERGENCY_CASE_ID = "emergency-redesign";
const SLTP_CASE_ID = "stop-loss-take-profit";
const KELPIE_CASE_ID = "ai-platform-launch";
const SELECTED_WORK_LABEL_CLASS =
  "whitespace-nowrap text-[14px] leading-[17px] font-bold italic text-[rgba(179,189,210,0.72)] uppercase [font-family:var(--font-intro)]";

const aboutPage = document.querySelector("#aboutPage");
const aboutStage = document.querySelector("#aboutStage");
const zoneIntro = document.querySelector("#zoneIntro");
const introIcon = document.querySelector("#introIcon");
const introMeta = document.querySelector("#introMeta");
const introStatement = document.querySelector("#introStatement");
const introMenu = document.querySelector("#introMenu");
const introPortrait = document.querySelector("#introPortrait");
const introContacts = document.querySelector("#introContacts");
const selectedWorkBlock = document.querySelector("#selectedWorkBlock");
const selectedWorkLabel = document.querySelector("#selectedWorkLabel");
const selectedWorkList = document.querySelector("#selectedWorkList");
const zoneCasePreview = document.querySelector("#zoneCasePreview");
const casePreviewInner = document.querySelector("#casePreviewInner");
const closeCaseButton = document.querySelector("#closeCaseButton");

const cases = [
  {
    id: "emergency-redesign",
    company: "FBS — FinTech / Trading",
    role: "Senior Product Designer (Октябрь 2024 - Февраль 2026)",
    title: "EMERGENCY REDESIGN",
    description: "Возглавила экстренный редизайн и архитектурный перезапуск iOS-приложения",
    previewType: "iphone",
    previewAsset: "/assets/cases/emergency-redesign/preview.png",
  },
  {
    id: "stop-loss-take-profit",
    company: "FBS — FinTech / Trading",
    role: "Senior Product Designer (Октябрь 2024 - Февраль 2026)",
    title: "STOP LOSS / TAKE PROFIT",
    description: "Кейс о том, как я перевела график из пассивного отображения риска в место, где риском можно управлять.",
    previewType: "iphone",
    previewAsset: "/assets/cases/fbs/iphone-preview.png",
  },
  {
    id: "ai-platform-launch",
    company: "Kelpie AI Platform — Australian AI / SaaS / Startup",
    role: "Product Designer / Product Owner (Август 2025 - Сентябрь 2025)",
    title: "AI-PLATFORM LAUNCH",
    description: "Запускала MVP с нуля, собирала продуктовую архитектуру, навигацию и дизайн-систему в условиях высокой неопределённости.",
    previewType: "iphone",
    previewAsset: "/assets/cases/fbs/iphone-preview.png",
  },
];

const groupedCases = Array.from(
  cases.reduce((map, currentCase) => {
    const key = `${currentCase.company}__${currentCase.role}`;
    const existingGroup = map.get(key);

    if (existingGroup) {
      existingGroup.items.push(currentCase);
      return map;
    }

    map.set(key, {
      company: currentCase.company,
      role: currentCase.role,
      items: [currentCase],
    });

    return map;
  }, new Map()).values(),
);

const introLayouts = {
  overview: {
    zoneWidthClass: "w-[1174px]",
    zoneOpacity: "1",
    metaClass:
      "absolute left-[545px] top-[36px] z-[20] flex w-[310px] flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]",
    portraitClass:
      "absolute left-[549px] top-[146px] z-[20] h-[211px] w-[201px] overflow-hidden",
    menuClass:
      "absolute left-[194px] top-[201px] z-[30] flex w-[277px] items-center justify-between",
    contactsClass:
      "absolute bottom-[35px] left-[545px] z-[20] flex w-[310px] flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]",
    selectedWorkBlockClass:
      "absolute left-[545px] top-[436px] z-[20] flex items-start justify-center gap-[64px]",
    selectedWorkLabelClass: SELECTED_WORK_LABEL_CLASS,
    statementClass:
      "pointer-events-none absolute left-[194px] top-[178px] z-[30] m-0 w-[659px] -translate-y-full text-[18px] leading-[21px] font-bold italic text-[#b3bdd2] [font-family:var(--font-intro)] [mix-blend-mode:difference] [text-indent:277px]",
  },
  "hover-emergency": {
    zoneWidthClass: "w-[1241px]",
    zoneOpacity: "1",
    metaClass:
      "absolute left-[545px] top-[36px] z-[20] flex w-[310px] flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]",
    portraitClass:
      "absolute left-[549px] top-[146px] z-[20] h-[211px] w-[201px] overflow-hidden",
    menuClass:
      "absolute left-[194px] top-[201px] z-[30] flex w-[277px] items-center justify-between",
    contactsClass:
      "absolute bottom-[35px] left-[545px] z-[20] flex w-[310px] flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]",
    selectedWorkBlockClass:
      "absolute left-[545px] top-[436px] z-[20] flex items-start justify-center gap-[64px]",
    selectedWorkLabelClass: SELECTED_WORK_LABEL_CLASS,
    statementClass:
      "pointer-events-none absolute left-[194px] top-[178px] z-[30] m-0 w-[659px] -translate-y-full text-[18px] leading-[21px] font-bold italic text-[#b3bdd2] [font-family:var(--font-intro)] [mix-blend-mode:difference] [text-indent:277px]",
  },
  "case-open": {
    zoneWidthClass: "w-[731px]",
    zoneOpacity: "0.4",
    metaClass:
      "absolute left-[88px] top-[36px] z-[20] flex w-[310px] flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]",
    portraitClass:
      "absolute left-[89px] top-[146px] z-[20] h-[211px] w-[201px] overflow-hidden",
    menuClass:
      "absolute left-[319px] top-[201px] z-[30] flex w-[277px] items-center justify-between",
    contactsClass:
      "absolute bottom-[35px] left-[88px] z-[20] flex w-[310px] flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]",
    selectedWorkBlockClass:
      "absolute left-[88px] top-[436px] z-[20] flex items-start justify-center gap-[64px]",
    selectedWorkLabelClass: SELECTED_WORK_LABEL_CLASS,
    statementClass:
      "pointer-events-none absolute left-[89px] top-[178px] z-[30] m-0 w-[659px] -translate-y-full text-[18px] leading-[21px] font-bold italic text-[#b3bdd2] [font-family:var(--font-intro)] [mix-blend-mode:difference] [text-indent:277px]",
  },
};

const ZONE_INTRO_BASE_CLASS =
  "absolute left-0 top-0 z-[20] h-[1080px] overflow-hidden transition-[width,opacity] duration-[900ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]";

const INTRO_STATIC_CLASSES = {
  icon: "pointer-events-none absolute left-[29px] top-[calc(50%-329.5px)] z-[10] h-[25px] w-[25px] -translate-y-1/2 [mix-blend-mode:difference]",
};

let hoveredCaseId = null;
let activeCaseId = null;
let viewState = "overview";
let closeAnimationTimer = null;
let openAnimationTimer = null;
let renderedCaseId = "";

function updateStageScale() {
  if (!aboutPage || !aboutStage) {
    return;
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scale = Math.min(viewportWidth / STAGE_WIDTH, viewportHeight / STAGE_HEIGHT);
  const frameWidth = STAGE_WIDTH * scale;
  const frameHeight = STAGE_HEIGHT * scale;

  aboutPage.style.width = `${frameWidth}px`;
  aboutPage.style.height = `${frameHeight}px`;
  aboutPage.style.setProperty("--stage-scale", String(scale));
  aboutStage.style.transform = `scale(${scale})`;
}

function getIntroLayoutKey() {
  if (viewState === "hover-emergency" || viewState === "hover-sltp" || viewState === "hover-kelpie") {
    return "hover-emergency";
  }

  if (
    viewState === "opening-emergency" ||
    viewState === "case-open-emergency" ||
    viewState === "opening-sltp" ||
    viewState === "case-open-sltp" ||
    viewState === "opening-kelpie" ||
    viewState === "case-open-kelpie" ||
    viewState === "closing"
  ) {
    return "case-open";
  }

  return "overview";
}

function renderSelectedWorkList() {
  if (!selectedWorkList) {
    return;
  }

  selectedWorkList.innerHTML = groupedCases
    .map(
      (group) => `
        <section class="flex w-full flex-col gap-[36px]" data-group-company="${group.company}">
          <div class="flex w-full flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]">
            <p class="m-0 text-[15px] leading-[18px] font-bold">${group.company}</p>
            <p class="m-0 text-[15px] leading-[18px] font-normal">${group.role}</p>
          </div>
          <div class="flex w-full flex-col gap-[32px]">
            ${group.items
              .map(
                (currentCase) => `
                  <button
                    type="button"
                    data-case-id="${currentCase.id}"
                    aria-label="${currentCase.id === KELPIE_CASE_ID ? "Open AI-Platform Launch case" : currentCase.title}"
                    class="group/case flex w-full cursor-pointer appearance-none flex-col gap-[12px] border-0 bg-transparent pl-[32px] text-left transition-[opacity,filter] duration-[250ms] ease-out [font-family:var(--font-intro)]"
                  >
                    <div class="flex w-full items-start gap-[9px]">
                      <span
                        data-case-title
                        class="min-w-0 flex-1 text-[15px] leading-[18px] font-bold italic text-[rgba(179,189,210,0.72)] uppercase transition-[color,opacity,text-decoration-color] duration-[250ms] ease-out"
                      >
                        ${currentCase.title}
                      </span>
                      <span
                        data-case-plus
                        class="text-[18px] leading-[18px] font-normal text-[rgba(179,189,210,0.72)] transition-[color,opacity] duration-[250ms] ease-out"
                      >
                        +
                      </span>
                    </div>
                    <p
                      data-case-description
                      class="m-0 text-[14px] leading-[17px] font-normal text-[rgba(179,189,210,0.55)] transition-[color,opacity] duration-[250ms] ease-out"
                    >
                      ${currentCase.description}
                    </p>
                  </button>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function applyMotionTransition(element) {
  if (!element) {
    return;
  }

  element.style.transition = POSITION_TRANSITION;
}

function initializeAnimatedElements() {
  [
    introMeta,
    introStatement,
    introMenu,
    introPortrait,
    introContacts,
    selectedWorkBlock,
  ].forEach(applyMotionTransition);
}

function generateEmergencyLongread() {
  const LABEL = "shrink-0 w-[150px] text-[16px] leading-[20px] font-bold italic tracking-[0.48px] uppercase text-[#8d97ab] [font-family:var(--font-case)]";
  const BODY = "shrink-0 w-[600px] flex flex-col";
  const ROW = "flex items-start gap-[120px] pl-[56px] pr-[154px] box-border w-full";
  const BODY_INSET = "flex pl-[326px] pr-[154px] box-border w-full";
  const HEADLINE = "text-[24px] leading-[28px] font-bold italic tracking-[0.24px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const TEXT = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[rgba(141,151,171,0.8)] [font-family:var(--font-case)]";
  const EMPH = "font-bold italic text-[#b3bdd2] [font-family:var(--font-case)]";
  const DETAIL_LABEL = "text-[16px] leading-[20px] tracking-[0.16px] font-bold text-[#8d97ab] [font-family:var(--font-case)]";
  const DETAIL_VALUE = "text-[16px] leading-[20px] tracking-[0.16px] italic text-[#8d97ab] [font-family:var(--font-case)]";
  const SMALL_LABEL = "text-[15px] leading-[20px] tracking-[0.15px] font-bold capitalize text-[#8d97ab] [font-family:var(--font-case)]";
  const QUOTE = "font-bold italic text-[18px] leading-[22px] tracking-[0px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const CAPTION = "font-normal italic text-[14px] leading-[15px] tracking-[0.14px] text-[#8d97ab] [font-family:var(--font-case)]";
  const BET_TITLE = "text-[18px] leading-[21px] font-bold italic tracking-[0.18px] text-[#8d97ab] [font-family:var(--font-case)]";
  const TEXT_MUTED = "text-[16px] leading-[20px] font-bold tracking-[0.16px] text-[rgba(141,151,171,0.6)] text-center capitalize [font-family:var(--font-case)]";
  const OPTION_INTRO = "text-[18px] leading-[21px] font-medium tracking-[0px] text-[#8d97ab] text-center [font-family:var(--font-case)]";
  const LABEL_TIGHT = LABEL;
  const LABEL_WIDE = LABEL;
  const TEXT_FULL = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[#b3bdd2] [font-family:var(--font-case)]";

  return `
    <div class="emergencyRedesignLongread flex flex-col gap-[24px] w-[1172px] overflow-hidden">

      <!-- A. Hero -->
      <div id="longreadHero" class="relative w-[1172px] h-[700px] shrink-0 overflow-hidden">
        <div class="absolute left-[248px] top-[16px] h-[684px] w-[501px]">
          <img
            src="/assets/cases/emergency-redesign/future-img.png"
            alt="Emergency Redesign Future concept"
            class="block h-full w-full object-cover"
          />
        </div>
        <div class="absolute left-[744px] top-[495px] w-[279px] flex flex-col items-start">
          <p class="text-[14px] leading-[18px] font-medium tracking-[0.14px] text-[rgba(179,189,210,0.5)] [font-family:var(--font-case)]">
            <span>* </span><span class="font-bold italic">Future-концепт</span><span> торгового сценария: прототип более глубокой пересборки продукта, который не вошёл в релиз, но стал ориентиром для части архитектурных решений.</span>
          </p>
        </div>
        <a
          href="https://www.figma.com/proto/sd1M2O8MsgRhs90rvup2qr/FUTURE?node-id=40000024-12422&viewport=-4866%2C-179%2C0.45&t=qqtQZVUOBUav2Vya-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=40000024%3A12422&page-id=0%3A1"
          target="_blank"
          rel="noopener noreferrer"
          class="emergencyPrototypeOpenBtn absolute left-[744px] top-[618px] flex items-center justify-center bg-[rgba(179,189,210,0.1)] px-[12px] py-[6px] text-[16px] leading-[20px] font-normal italic tracking-[-0.16px] text-[#b3bdd2] no-underline [font-family:var(--font-case)]"
        >Открыть прототип</a>
      </div>

      <!-- Longread body -->
      <div id="longreadSections" class="flex flex-col gap-[120px] items-center w-[1172px]">

        <!-- B. Context -->
        <div class="${ROW}">
          <span class="${LABEL}">Context</span>
          <div class="${BODY} gap-[28px]">
            <p class="${HEADLINE}">
              Экстренный перезапуск iOS trading app под блокировкой, коротким дедлайном и неопределёнными правилами ревью.
            </p>
            <div class="flex flex-col gap-[16px]">
              <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                <span class="font-bold">Роль</span>
                <span class="${DETAIL_VALUE}">Product Designer</span>
              </div>
              <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                <span class="font-bold capitalize">Срок</span>
                <span class="${DETAIL_VALUE}">~1.5 months</span>
              </div>
              <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                <span class="font-bold capitalize">Команда</span>
                <span class="${DETAIL_VALUE}">5 developers, позже пришел 2-ой дизайнер на флоу регистрации</span>
              </div>
            </div>
            <p class="${TEXT}">
              <span class="${EMPH}">Я использовала вынужденный перезапуск как возможность не только обновить интерфейс, но и улучшить структуру продукта:</span>
              сохранить ключевые торговые сценарии и заложить основу для дальнейшего развития.
            </p>
          </div>
        </div>

        <!-- C. Risk -->
        <div class="flex flex-col items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Risk</span>
            <div class="${BODY}">
              <p class="${TEXT}">
                <span>Старое </span><span class="${EMPH}">iOS-приложение уже было заблокировано в сторе </span><span>(просто не досмотрели за требованиями AppStore регуляции). </span>
                <span class="${EMPH}">С выходом новой iOS 26 компания рисковала потерять всю текущую iOS-аудиторию</span><span> — меньшую, чем Android, но значимую по выручке.</span>
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-[12px] items-center justify-center py-[32px] w-full">
            <div class="h-[464px] w-[752px] overflow-hidden">
              <img src="/assets/cases/emergency-redesign/risk-img.png" alt="Старый интерфейс" class="w-full h-full object-contain block" />
            </div>
            <span class="${CAPTION}">Старый интерфейс</span>
          </div>
          <div class="${BODY_INSET}">
            <p class="${QUOTE}">
              <span>Новое приложение должно было быть достаточно другим, </span><span>но при этом не ломать основные торговые сценарии.</span>
            </p>
          </div>
        </div>

        <!-- D. From masking to rebuilding -->
        <div class="flex flex-col items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL_WIDE}">From masking to rebuilding</span>
            <div class="${BODY} gap-[32px]">
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Initial ask:</span>
                <p class="${TEXT}">Слегка изменить вход в продукт, онбординг и стартовые экраны, а торговую логику временно скрыть через feature toggle.</p>
              </div>
              <div class="w-[41px] h-[48px]">
                <img src="/assets/cases/emergency-redesign/arrow.svg" alt="" class="block w-full h-full" />
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Reframing:</span>
                <p class="${TEXT}">На этом этапе я настояла, что нельзя тратить редкое окно изменений только на оболочку. Если продукт всё равно приходится пересобирать, нужно использовать этот момент не как временный обход, а как возможность усилить систему.</p>
              </div>
              <div class="w-[339px] h-[64px] rounded-[16px] overflow-hidden">
                <img src="/assets/cases/emergency-redesign/guys-img.png" alt="" class="block w-full h-full object-cover" />
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Real problem:</span>
                <p class="${TEXT}">Продукт <span class="${EMPH}">накопил UX-долг</span> и архитектурно <span class="${EMPH}">не выдерживал масштабирование</span>: перегруженная навигация, разрозненные сущности, скрытые действия и ошибки в торговом сценарии.</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[12px] items-start py-[32px] w-full">
            <div class="flex items-center justify-center px-[24px] h-[496px] w-full overflow-hidden">
              <img src="/assets/cases/emergency-redesign/from-masking-to-rebuilding-img.png" alt="" class="w-full h-full object-contain block" />
            </div>
            <div class="flex items-center justify-center px-[24px] w-full">
              <span class="${CAPTION}">Старый интерфейс</span>
            </div>
          </div>
        </div>

        <!-- E. Decision space -->
        <div class="flex flex-col gap-[64px] items-start w-full">
          <div class="flex flex-col items-start w-full">
            <div class="${ROW}">
              <span class="${LABEL}">Decision space</span>
              <div class="${BODY}">
                <p class="${TEXT}"><span>У меня было </span><span class="${EMPH}">три дня, чтобы построить диапазон решений</span><span>, которые можно защитить и реально собрать в этих условиях.</span></p>
              </div>
            </div>
            <div class="flex items-center justify-center px-[192px] py-[32px] w-full overflow-hidden">
              <img src="/assets/cases/emergency-redesign/process-img.png" alt="Decision space" class="w-[1039px] h-[600px] object-cover block" />
            </div>
          </div>
          <div class="flex flex-col gap-[64px] items-start w-full">
            <div class="flex items-center justify-center w-full">
              <p class="${OPTION_INTRO} w-[411px]">И в итоге на защиту и обсуждение было вынесено три опции:</p>
            </div>
            <div class="flex flex-col gap-[32px] items-start w-full">
              <div class="flex gap-[33px] items-start px-[32px] w-full">
                <div class="flex-1 min-w-0 flex flex-col gap-[24px] items-center">
                  <div class="flex flex-col gap-[12px] items-center h-[115px] text-center w-full">
                    <span class="${TEXT_MUTED} w-full">1/ Minimal Masking</span>
                    <div class="flex flex-col h-[90px] w-full text-center">
                      <p class="mb-0 ${OPTION_INTRO}">Косметический редизайн + пару ux фиксов:</p>
                      <p class="mb-0 ${TEXT}">но прежняя архитектура &gt; риск повторной блокировки</p>
                    </div>
                  </div>
                  <div class="w-[208px] h-[450px] rounded-[24px] overflow-hidden">
                    <video src="/assets/cases/emergency-redesign/Minimal-Masking.mov" autoplay loop muted playsinline class="w-full h-full object-cover block"></video>
                  </div>
                  <p class="${TEXT_MUTED}">Fastest / lowest value</p>
                </div>
                <div class="flex-1 min-w-0 flex flex-col gap-[24px] items-center">
                  <div class="flex flex-col gap-[12px] items-center h-[115px] text-center w-full">
                    <span class="${TEXT_MUTED} w-full">2/ Full Trade-First Redesign</span>
                    <div class="flex flex-col h-[90px] w-full text-center">
                      <p class="mb-0 ${OPTION_INTRO}">Полный пересбор торгового сценария:</p>
                      <p class="mb-0 ${TEXT}">вынесения торговли на первый уровень. Заложение будущего фундамента</p>
                    </div>
                  </div>
                  <div class="w-[204px] h-[439px] rounded-[24px] overflow-hidden">
                    <video src="/assets/cases/emergency-redesign/Full-redesign.mov" autoplay loop muted playsinline class="w-full h-full object-cover block"></video>
                  </div>
                  <p class="${TEXT_MUTED}">Highest value / too risky now</p>
                </div>
                <div class="flex-1 min-w-0 flex flex-col gap-[24px] items-center">
                  <div class="flex flex-col gap-[12px] items-center h-[115px] text-center w-full">
                    <span class="${TEXT_MUTED} w-full">3/ Structural Adjustment</span>
                    <div class="flex flex-col h-[90px] w-full text-center">
                      <p class="mb-0 ${OPTION_INTRO}">Объединение Счетов и Позиций + закрытие части UX-долга.</p>
                      <p class="mb-0 ${TEXT}">Заметное отличие от старой структуры, но собираемое в срок</p>
                    </div>
                  </div>
                  <div class="w-[203px] h-[439px] rounded-[24px] overflow-hidden">
                    <video src="/assets/cases/emergency-redesign/Structural-adjustment.mov" autoplay loop muted playsinline class="w-full h-full object-cover block"></video>
                  </div>
                  <p class="${TEXT_MUTED}">Balanced value / shippable</p>
                </div>
              </div>
              <div class="flex items-center justify-center px-[24px] w-full">
                <span class="${CAPTION}">Первичные прототипы для защиты каждой из идей</span>
              </div>
            </div>
          </div>
        </div>

        <!-- E2. Trade-off & Decision -->
        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Trade-off &amp; Decision</span>
            <div class="${BODY} gap-[32px]">
              <p class="${TEXT}">Я представляла направления редизайна перед лидами команд и советом управляющих — около 50 человек.</p>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Цель встречи:</span>
                <p class="${TEXT}">Согласовать направление, чтобы скорее перейти к реализации.</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[20px] items-center w-full">
            <div class="relative h-[450px] w-[786px]">
              <div class="absolute left-0 top-0 h-[321px] w-[585px] border border-white overflow-hidden">
                <img src="/assets/cases/emergency-redesign/trade-off-slide-01.png" alt="" class="block h-full w-full object-cover" />
              </div>
              <div class="absolute left-[201px] top-[129px] h-[321px] w-[585px] border border-white shadow-[0px_4px_36.4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                <img src="/assets/cases/emergency-redesign/trade-off-slide-02.png" alt="" class="block h-full w-full object-cover" />
              </div>
            </div>
            <span class="${CAPTION}">Слайды из презентации на команды</span>
          </div>
          <div class="${BODY_INSET}">
            <div class="${BODY} gap-[8px]">
              <span class="${SMALL_LABEL}">Финальное решение:</span>
              <div class="${TEXT}">
                <p class="mb-0">Обединение Счетов + Позиций → в единый раздел</p>
                <p class="mb-0">Плюс точечное закрытие UX-долга.</p>
                <ol class="pl-[27px] list-decimal mt-[8px]">
                  <li>Делал продукт заметно другим,</li>
                  <li>Был реализуем в срок</li>
                  <li>Не ломал его полностью,</li>
                  <li>И давал реальную продуктовую пользу.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <!-- F. Key decision -->
        <div class="${ROW}">
          <span class="${LABEL}">Key decision</span>
          <div class="${BODY} gap-[56px]">

            <!-- Bet 1 -->
            <div class="flex flex-col gap-[32px]">
              <div class="flex flex-col gap-[32px]">
                <div class="flex flex-col gap-[8px]">
                  <p class="${BET_TITLE}">1/ Капитал как единая система</p>
                  <p class="${TEXT}"><span class="${EMPH}">Funds</span> и <span class="${EMPH}">Positions</span> были разорваны, хотя пользователь мыслит их как один контур: "где мои деньги и что с ними происходит".</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Decision:</span>
                  <p class="${TEXT}">Объединить <span class="${EMPH}">Funds + Positions</span> в единый раздел</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Impact:</span>
                  <p class="${TEXT}">Меньше разрывов в модели капитала + место для будущей архитектуры.</p>
                </div>
                <p class="${EMPH}">Баллов к решению прибавляло то, что такая логика уже была реализована у одно из лидеров рынка.</p>
              </div>
              <div class="w-full h-[670px] overflow-hidden">
                <img src="/assets/cases/emergency-redesign/capital-system-img.png" alt="Capital system" class="w-full h-full object-cover block" />
              </div>
            </div>

            <!-- Bet 2 -->
            <div class="flex flex-col gap-[32px] pb-[32px]">
              <div class="flex flex-col gap-[32px]">
                <div class="flex flex-col gap-[8px]">
                  <p class="${BET_TITLE}">2/ Упрощение взаимодействия с торговлей</p>
                  <p class="${TEXT}">Trade flow страдал от конфликтующих tap-зон, скрытых категорий и слабой иерархии.</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Decision:</span>
                  <ul class="pl-[27px] ${TEXT} list-disc">
                    <li>Переработаны карточки инструментов</li>
                    <li>Убраны конфликтующие tap-зоны</li>
                    <li>Категории вынесены в явный паттерн (чипы / табы)</li>
                    <li>Переработан Виджет Денег</li>
                    <li>Затронуто взаимодействие с мини-графиком</li>
                  </ul>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Impact:</span>
                  <p class="${TEXT}">Я не переизобрела торговлю, а убрала точки путаницы</p>
                </div>
              </div>
              <div class="w-full aspect-[1710/1092] overflow-hidden">
                <img src="/assets/cases/emergency-redesign/simple-trade-img.png" alt="Simple trade" class="w-full h-full object-cover block" />
              </div>
            </div>

            <!-- Bet 3 -->
            <div class="flex flex-col gap-[56px] pb-[32px]">
              <div class="flex flex-col gap-[32px]">
                <div class="flex flex-col gap-[8px]">
                  <p class="${BET_TITLE}">3/ Визуальное обновление</p>
                  <p class="${TEXT}">UI должен был быстро создать ощущение нового продукта, но не мог стать главным фокусом.</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Decision:</span>
                  <p class="${TEXT}">Минимально достаточная visual system, поддерживающая новую структуру.</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Impact:</span>
                  <p class="${TEXT}">Сначала система, потом полировка.</p>
                </div>
              </div>
              <div class="flex gap-[56px] items-start w-full">
                <img src="/assets/cases/emergency-redesign/hero-bg-03.png" alt="" class="w-[253px] h-[336px] rounded-[16px] object-cover shadow-[0px_0px_18.5px_2px_rgba(0,0,0,0.25)]" />
                <img src="/assets/cases/emergency-redesign/hero-bg-01.png" alt="" class="w-[208px] h-[118px] rounded-[16px] object-cover shadow-[0px_0px_18.5px_2px_rgba(0,0,0,0.25)]" />
                <img src="/assets/cases/emergency-redesign/hero-bg-02.png" alt="" class="w-[189px] h-[166px] rounded-[16px] object-cover shadow-[0px_0px_18.5px_2px_rgba(0,0,0,0.25)]" />
                <img src="/assets/cases/emergency-redesign/hero-bg-05.png" alt="" class="w-[208px] h-[172px] rounded-[16px] object-cover shadow-[0px_0px_18.5px_2px_rgba(0,0,0,0.25)]" />
              </div>
            </div>

          </div>
        </div>

        <!-- G. Execution node -->
        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Execution node</span>
            <div class="${BODY} gap-[32px]">
              <p class="${TEXT}"><span class="${EMPH}">Дизайн и разработка шли параллельно:</span> решения уходили в разработку частями, архитектура уточнялась по ходу, а перед релизом мы быстро проверили и поправили ключевые паттерны.</p>
              <p class="${TEXT}">Моя задача была не просто придумать направление, а удержать продукт целым, пока он собирался по частям.</p>
            </div>
          </div>
          <div class="w-[1172px] h-[387px] overflow-hidden">
            <img src="/assets/cases/emergency-redesign/execution-note-img.png" alt="Execution" class="w-[1172px] h-[387px] object-contain block" />
          </div>
        </div>

        <!-- H. Outcome -->
        <div class="flex flex-col gap-[32px] items-center w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Outcome</span>
            <div class="${BODY} gap-[32px]">
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Бизнес</span>
                <p class="${TEXT}"><span class="${EMPH}">iOS-канал сохранён</span>, приложение выпущено в срок, пользователи не потеряли доступ к продукту.</p>
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Продукт</span>
                <p class="${TEXT}"><span class="${EMPH}">Архитектура стала более управляемой:</span> навигация, видимость капитала и торговые взаимодействия получили более ясную модель.</p>
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Система</span>
                <p class="${TEXT}">Появилась <span class="${EMPH}">база под future-концепт</span> и дальнейшее развитие продукта.</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center w-full">
            <img
              src="/assets/cases/emergency-redesign/outcome-composite.png"
              alt="Slack review и Figma workspace"
              class="block w-[1066px] max-w-full h-auto rounded-[24px]"
            />
          </div>
          <div class="flex w-full pl-[322px] pr-[154px] box-border">
            <div class="${BODY} gap-[8px]">
              <span class="${SMALL_LABEL}">P.S.</span>
              <div class="${TEXT}">
                <p class="mb-0">На этом эта история, конечно, не закончилась.</p>
                <p class="mb-0">Немного порадовалась и дальше предстояла работа:</p>
                <ul class="pl-[27px] list-disc mt-[8px]">
                  <li>По <span class="${EMPH}">быстрым доработкам</span> перед запуском уже на пользователей на основе коридорок и обратной связи от команд</li>
                  <li><span class="${EMPH}">Доставка концепции и правил работы</span> с новым интерфейсом <span class="${EMPH}">на других дизайнеров;</span></li>
                  <li>В перерывах, моления на то, чтобы все таки не раскрыли и не заблочили</li>
                  <li>Закрывание косяков, которые в спешке конечно же были допущены</li>
                  <li><span class="${EMPH}">Доработка Future-концепции, подготовка к уже основательным UX исследованиям</span></li>
                  <li>Подтягивание старой андроид версии до новой ios</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div><!-- end #longreadSections -->
    </div>
  `;
}

function generateSLTPLongread() {
  const LABEL = "shrink-0 w-[150px] text-[16px] leading-[20px] font-bold italic tracking-[0.48px] uppercase text-[#8d97ab] [font-family:var(--font-case)]";
  const BODY = "shrink-0 w-[600px] flex flex-col";
  const ROW = "flex items-start gap-[120px] pl-[56px] pr-[154px] box-border w-full";
  const HEADLINE = "text-[24px] leading-[28px] font-bold italic tracking-[0.24px] text-[rgba(179,189,210,0.8)] [font-family:var(--font-case)]";
  const TEXT = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[rgba(141,151,171,0.8)] [font-family:var(--font-case)]";
  const EMPH = "font-bold italic text-[#b3bdd2] [font-family:var(--font-case)]";
  const DETAIL_LABEL = "text-[16px] leading-[20px] tracking-[0.16px] font-bold text-[#8d97ab] [font-family:var(--font-case)]";
  const DETAIL_VALUE = "text-[16px] leading-[20px] tracking-[0.16px] italic text-[#8d97ab] [font-family:var(--font-case)]";
  const SMALL_LABEL = "text-[15px] leading-[20px] tracking-[0.15px] font-bold text-[#8d97ab] [font-family:var(--font-case)]";
  const SMALL_NOTE = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[rgba(141,151,171,0.6)] [font-family:var(--font-case)]";
  const NOTE_MUTED = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[rgba(141,151,171,0.6)] [font-family:var(--font-case)]";
  const CAPTION = "font-normal italic text-[14px] leading-[15px] tracking-[0.14px] text-[#8d97ab] [font-family:var(--font-case)]";
  const BET_TITLE = "text-[18px] leading-[21px] font-bold italic tracking-[0px] text-[#8d97ab] [font-family:var(--font-case)]";
  const LIST_MUTED = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[rgba(141,151,171,0.6)] [font-family:var(--font-case)]";
  const CARD_TITLE = "text-[18px] leading-[22px] font-medium tracking-[0px] text-[rgba(179,189,210,0.8)] text-center [font-family:var(--font-case)]";
  const CARD_DESC = "text-[14px] leading-[18px] font-medium tracking-[0px] text-[rgba(179,189,210,0.6)] text-center [font-family:var(--font-case)]";
  const CARD_FOOTER = "text-[14px] leading-[18px] font-medium tracking-[0px] text-[rgba(179,189,210,0.6)] text-center [font-family:var(--font-case)]";
  const GRID_TITLE = "text-[18px] leading-[21px] font-bold italic tracking-[0px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const LINK = "font-bold italic text-[18px] leading-[22px] tracking-[0px] text-[#b3bdd2] underline [font-family:var(--font-case)]";

  return `
    <div class="sltpLongread flex flex-col gap-[24px] w-[1172px] overflow-hidden">

      <!-- Hero -->
      <div class="relative w-[1172px] h-[700px] shrink-0 overflow-hidden">
        <div class="absolute left-[calc(50%-127.5px)] top-[42px] h-[604px] w-[601px] -translate-x-1/2">
          <img src="/assets/cases/sltp/preview-sltp.png" alt="SLTP Preview" class="block h-full w-[81.66%] object-cover" />
        </div>
        <div class="absolute left-[639px] top-[553px] w-[291px] flex flex-col items-start">
          <p class="text-[14px] leading-[22px] font-medium tracking-[0.14px] text-[rgba(179,189,210,0.5)] [font-family:var(--font-case)]">* SL/TP — механика автоматического закрытия позиции:<br/>Stop Loss ограничивает потери,<br/>Take Profit фиксирует прибыль.</p>
        </div>
      </div>

      <!-- Longread body -->
      <div class="flex flex-col gap-[120px] items-center w-[1172px] pb-[120px]">

        <!-- Context -->
        <div class="${ROW}">
          <span class="${LABEL}">Context</span>
          <div class="${BODY} gap-[28px]">
            <p class="${HEADLINE}">Как перевести график из пассивного отображения в инструмент управления позицией и риском</p>
            <div class="flex flex-col gap-[16px]">
              <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                <span class="font-bold">Роль</span>
                <span class="${DETAIL_VALUE}">Product Designer</span>
              </div>
              <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                <span class="font-bold capitalize">Figma</span>
                <a href="https://www.figma.com/design/gzd7rk7vdzarXyDEUDzVGf/SL_TP?node-id=233-70776" target="_blank" rel="noopener noreferrer" class="${DETAIL_VALUE} underline">переход на фигму</a>
              </div>
              <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                <span class="font-bold capitalize">Процесс</span>
                <span class="${DETAIL_VALUE}">Research → interaction model → behavior system</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Problem -->
        <div class="${ROW}">
          <span class="${LABEL}">Problem</span>
          <div class="${BODY} gap-[32px]">
            <div class="${SMALL_NOTE}">
              <p class="mb-0">* SL/TP — механика автоматического закрытия позиции:</p>
              <p class="mb-0">Stop Loss ограничивает потери,</p>
              <p>Take Profit фиксирует прибыль.</p>
            </div>
            <div class="${TEXT}">
              <p class="mb-0"><span>SL/TP в нашем приложении </span><span class="${EMPH}">настраивались вне графика</span><span>, поэтому пользователь:</span></p>
              <ul class="pl-[27px] list-disc mt-[8px]">
                <li><span class="${EMPH}">не видел уровень</span> в момент действия,</li>
                <li><span class="${EMPH}">управлял риском через разорванный сценарий</span>,</li>
                <li><span class="${EMPH}">терял скорость и контроль</span> в активной торговле.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Best practice не было -->
        <div class="flex flex-col items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Best practice не было</span>
            <div class="${BODY} gap-[32px]">
              <div class="${TEXT}">
                <p class="mb-0">Я пошла исследовать конкурентов, изучить фичу и ее потенциал.</p>
                <a href="https://www.figma.com/design/gzd7rk7vdzarXyDEUDzVGf/SL_TP?node-id=40000053-132980" target="_blank" rel="noopener noreferrer" class="underline">Figma</a>
              </div>
              <div class="h-[28px] w-[23px]">
                <img src="/assets/cases/emergency-redesign/arrow.svg" alt="" class="block h-full w-full" />
              </div>
              <div class="flex flex-col gap-[16px]">
                <p class="${EMPH}">Задача была разобраться</p>
                <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                  <li>как SL/TP устроен у конкурентов,</li>
                  <li>какие паттерны реально ускоряют работу,</li>
                  <li>где текущая фича в продукте уже слабая,</li>
                  <li>какие расширения вообще бывают у этой механики.</li>
                  <li>проверила конкурентные сценарии руками, чтобы оценить не только паттерны, но и ощущение контроля: скорость, точность, риск ошибки, поведение при нескольких уровнях.</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[12px] items-start py-[32px] w-full">
            <div class="flex items-center justify-center w-full h-[424px] overflow-hidden">
              <img src="/assets/cases/sltp/risk-img.png" alt="Research" class="w-[939px] h-[424px] object-cover rounded-[24px] shadow-[0px_4px_121.5px_0px_rgba(0,0,0,0.25)] block" />
            </div>
            <div class="flex items-center justify-center px-[24px] w-full">
              <span class="${CAPTION}">Кусочки ресерча</span>
            </div>
          </div>

          <!-- After research -->
          <div class="${ROW}">
            <span class="${LABEL}">After research</span>
            <div class="${BODY} gap-[16px]">
              <p class="${EMPH}">Ключевая сложность была в проектировании логики взаимодействия</p>
              <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                <li>скорость vs контроль</li>
                <li>что происходит напрямую на графике</li>
                <li>нужны ли доп точки управления</li>
                <li>как избежать случайных изменений без потери скорости взаимодействия</li>
                <li>какие действия должны быть мгновенными, а какие — подтверждаемыми</li>
                <li>и тд</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 4 interaction models -->
        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">4 interaction models.</span>
            <div class="${BODY}">
              <p class="${TEXT}">Ни один существующий паттерн не решает задачу полностью, поэтому дальше я собирала собственные interaction-модели, комбинируя сильные стороны разных подходов.</p>
            </div>
          </div>
          <div class="flex flex-col gap-[32px] items-center justify-center px-[32px] w-full">
            <div class="flex gap-[8px] items-start w-full">
              <div class="sltp-card flex-1 min-w-0 flex flex-col gap-[16px] h-[740px] items-center justify-center bg-[#121212] rounded-[24px]">
                <div class="flex flex-col gap-[8px] h-[85px] items-center text-center px-[16px] w-full">
                  <p class="${CARD_TITLE} w-full">Inline-only</p>
                  <p class="${CARD_DESC} w-full">Управление прямо<br/>на тегах SL/TP.</p>
                </div>
                <div class="h-[549px] w-[253px]">
                  <img src="/assets/cases/sltp/inline-only-img.png" alt="Inline-only" class="w-full h-full object-contain block" />
                </div>
                <p class="${CARD_FOOTER} h-[55px] w-[228px]">+ быстро<br/>− перегружает график</p>
              </div>
              <div class="sltp-card flex-1 min-w-0 flex flex-col gap-[16px] h-[740px] items-center justify-center bg-[#121212] rounded-[24px]">
                <div class="flex flex-col gap-[8px] h-[85px] items-center text-center px-[16px] w-full">
                  <p class="${CARD_TITLE} w-full">Panel-only</p>
                  <p class="${CARD_DESC} w-full">Все инструменты в панели управления, отдельно от графика.</p>
                </div>
                <div class="h-[549px] w-[253px]">
                  <img src="/assets/cases/sltp/panel-only-img.png" alt="Panel-only" class="w-full h-full object-contain block" />
                </div>
                <p class="${CARD_FOOTER} h-[55px] w-[228px]">+ чисто<br/>− действие отрывается от уровня</p>
              </div>
              <div class="sltp-card flex-1 min-w-0 flex flex-col gap-[16px] h-[740px] items-center justify-center bg-[#121212] rounded-[24px]">
                <div class="flex flex-col gap-[8px] h-[85px] items-center text-center px-[16px] w-full">
                  <p class="${CARD_TITLE} w-full">Hybrid</p>
                  <p class="${CARD_DESC} w-full">Действия в панеле, а на графике только изменение значений.</p>
                </div>
                <div class="h-[549px] w-[253px]">
                  <img src="/assets/cases/sltp/hybrid-img.png" alt="Hybrid" class="w-full h-full object-contain block" />
                </div>
                <p class="${CARD_FOOTER} h-[55px] w-[228px]">+ разделяет управление уровнем и позицией<br/>− требует сложной state-логики</p>
              </div>
              <div class="sltp-card flex-1 min-w-0 flex flex-col gap-[16px] h-[740px] items-center justify-center bg-[#121212] rounded-[24px]">
                <div class="flex flex-col gap-[8px] h-[85px] items-center text-center px-[16px] w-full">
                  <p class="${CARD_TITLE} w-full">Movable Hybrid</p>
                  <p class="${CARD_DESC} w-full">Гибридный вариант с подвижной панелью.</p>
                </div>
                <div class="h-[549px] w-[253px]">
                  <img src="/assets/cases/sltp/movable-hybrid-img.png" alt="Movable Hybrid" class="w-full h-full object-contain block" />
                </div>
                <p class="${CARD_FOOTER} h-[55px] w-[228px]">+ гибкость<br/>− лишняя сложность</p>
              </div>
            </div>
            <div class="flex items-center justify-end px-[24px] w-full">
              <span class="text-[14px] leading-[15px] font-normal italic tracking-[0.14px] text-[rgba(179,189,210,0.5)] [font-family:var(--font-case)]">Сырые прототипы для защиты каждой из идей</span>
            </div>
          </div>
        </div>

        <!-- Final interaction model -->
        <div class="${ROW}">
          <span class="${LABEL}">Final interaction model</span>
          <div class="flex flex-col gap-[32px] flex-1 min-w-0">
            <div class="${BODY} gap-[32px]">
              <p class="${EMPH}">После обсуждений с командой, коридорный исследований выбором стали два варианта: inline-only and hybrid</p>
              <div class="flex flex-col gap-[16px]">
                <span class="${SMALL_LABEL}">Final decision:</span>
                <p class="${TEXT}">В итоге выбрали Hybrid, потому что он лучше разделял управление позицией и управление конкретным уровнем.</p>
              </div>
              <p class="${NOTE_MUTED}">*Оба финальных варианта уже закрывали базовые действия. Разница была не в наличии функций, а в том, насколько логично они были организованы.<br/>+ были проведены количественные исследования <a href="https://www.figma.com/design/p4Yp3a3PqZgo0xNenaFWQA/%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D1%82%D0%B8%D0%BF-SL_TP-%D0%B4%D0%BB%D1%8F-%D0%B8%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F?node-id=0-1" target="_blank" rel="noopener noreferrer" class="underline">с прототипами</a> на реальных пользователях целевых стран (600 человек)</p>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Логика разделения:</span>
                <div class="${TEXT}">
                  <p class="mb-[8px]"><span class="${EMPH}">Редактирование и удаление конкретного SL/TP</span> — через линии на графике.</p>
                  <p class="mb-[8px]"><span class="${EMPH}">Добавление SL/TP</span> на позицию и закрытие позиции — в панели управления.</p>
                  <p><span class="${EMPH}">Точные настройки</span> — через шторку.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3 KEY DECISIONS -->
        <div class="${ROW}">
          <span class="${LABEL}">3 KEY DECISIONS</span>
          <div class="flex flex-col gap-[120px] flex-1 min-w-0 max-w-[846px]">

            <div class="flex flex-col gap-[32px] w-full">
              <div class="${BODY} gap-[14px]">
                <p class="${BET_TITLE}">1/ Dual flow</p>
                <p class="${TEXT}"><span class="${EMPH}">Быстрые действия</span> — на графике.<br/><span class="${EMPH}">Точные настройки</span> — в шторке.</p>
                <p class="${TEXT}">Точная настройка через шторку не может быть запасным входом. Она должна быть частью flow. И если она становится полноценной частью сценария, её нужно было усилить.</p>
              </div>
              <div class="flex flex-col gap-[24px] w-full">
                <div class="w-[570px] h-[398px]">
                  <img src="/assets/cases/sltp/ui-fixes-1.png" alt="UI fixes" class="w-full h-full object-contain block" />
                </div>
                <p class="${TEXT}">Также были точечные UI фиксы</p>
                <div class="w-[570px] h-[394px] rounded-[24px] overflow-hidden">
                  <img src="/assets/cases/sltp/ui-fixes-2.png" alt="UI fixes 2" class="w-full h-full object-contain rounded-[24px] block" />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-[32px] w-full">
              <div class="${BODY} gap-[14px]">
                <p class="${BET_TITLE}">2/ Visibility logic</p>
                <p class="${TEXT}">Вкл/выкл отображения SL/TP планировалось только в Chart settings.</p>
              </div>
              <div class="w-[305px] h-[246px]">
                <img src="/assets/cases/sltp/visibility-settings.png" alt="Visibility settings" class="w-full h-full object-contain block" />
              </div>
              <p class="${TEXT} w-[600px]">Но ранее сделанный инструмент Рисования на графике — уже мог скрывать позиции на графике.</p>
              <div class="${BODY} gap-[8px]">
                <span class="${SMALL_LABEL}">Конфликт:</span>
                <p class="${TEXT}">SL/TP скрыты из шторки инструментов рисования, а toggle в Chart settings включён.</p>
              </div>
              <div class="${BODY} gap-[8px]">
                <p class="${BET_TITLE}">Решение: развести роли</p>
                <div class="${TEXT}">
                  <p class="mb-0"><span class="${EMPH}">Chart settings</span> — постоянная видимость.</p>
                  <p class="mb-0"><span class="${EMPH}">Drawing tools</span> — временное скрытие.</p>
                  <p>UI объясняет активное скрытие.</p>
                </div>
              </div>
              <div class="w-[569px] h-[607px] rounded-[24px] overflow-hidden">
                <img src="/assets/cases/sltp/visibility-logic.png" alt="Visibility logic" class="w-full h-full object-cover rounded-[24px] block" />
              </div>
            </div>

            <div class="flex flex-col gap-[32px] w-full">
              <div class="${BODY} gap-[14px]">
                <p class="${BET_TITLE}">3/ Small screens</p>
                <p class="${TEXT}">Значительная часть пользователей работала с маленьких и не самых новых телефонов.<br/>Поэтому line controls проектировались отдельно для тесного пространства.</p>
              </div>
              <div class="flex flex-col gap-[32px] w-full">
                <div class="w-full aspect-[1984/1374] rounded-[16px] overflow-hidden">
                  <img src="/assets/cases/sltp/small-screens-1.png" alt="Small screens" class="w-full h-full object-cover rounded-[16px] block" />
                </div>
                <div class="w-[707px] h-[138px] rounded-[16px] overflow-hidden">
                  <img src="/assets/cases/sltp/small-screens-2.png" alt="Small screens detail" class="w-full h-full object-cover rounded-[16px] block" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- State explosion -->
        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">State explosion</span>
            <div class="${BODY} gap-[32px]">
              <p class="${EMPH}">Количество состояний и переходов быстро росло, поэтому часть работы ушла в проектирование правил поведения системы.</p>
              <div class="grid grid-cols-2 gap-[16px] w-full">
                <div class="flex flex-col gap-[8px]">
                  <p class="${GRID_TITLE}">Calculation logic</p>
                  <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                    <li>price / pips / %</li>
                    <li>realtime recalculation</li>
                    <li>P&amp;L synchronization</li>
                  </ul>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <p class="${GRID_TITLE}">Warning system</p>
                  <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                    <li>invalid levels</li>
                    <li>&quot;too close to market&quot;</li>
                    <li>unsaved changes</li>
                  </ul>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <p class="${GRID_TITLE}">Chart behavior</p>
                  <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                    <li>active / inactive states</li>
                    <li>visibility logic</li>
                    <li>multi-position handling</li>
                    <li>confirmation states</li>
                  </ul>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <p class="${GRID_TITLE}">State synchronization</p>
                  <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                    <li>edit &lt;-&gt; apply</li>
                    <li>multiple interaction paths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center w-full">
            <div class="w-[700px] h-[334px] rounded-[24px] overflow-hidden">
              <img src="/assets/cases/sltp/behavior-system.png" alt="Behavior system" class="w-full h-full object-cover rounded-[24px] block" />
            </div>
          </div>
        </div>

        <!-- Design System -->
        <div class="${ROW}">
          <span class="${LABEL}">Design System</span>
          <div class="${BODY} gap-[24px]">
            <p class="${EMPH}">Потребовались новые системные компоненты</p>
            <p class="${TEXT}">Все компоненты я проработала на очень хорошем уровне детализации с учетом будущих кейсов использования</p>
            <a href="https://www.figma.com/design/gzd7rk7vdzarXyDEUDzVGf/SL_TP?node-id=40000056-132983" target="_blank" rel="noopener noreferrer" class="${LINK}">Figma</a>
            <div class="${LIST_MUTED}">
              <p>Lego-Field</p>
              <p>Slider</p>
              <p>Contextual menu</p>
              <p>Chips</p>
              <p>Control lines</p>
            </div>
          </div>
        </div>

        <!-- Outcome -->
        <div class="flex flex-col gap-[64px] items-center w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Outcome</span>
            <div class="${BODY} gap-[16px]">
              <p class="${EMPH}">В результате я не просто добавила SL/TP на график, а собрала устойчивую модель управления позицией:</p>
              <div class="${TEXT}">
                <p class="mb-0">С <span class="${EMPH}">быстрыми действиями</span> на графике,</p>
                <p class="mb-0"><span class="${EMPH}">Точной настройкой</span> через шторку</p>
                <p><span class="${EMPH}">Понятной логикой поведения</span> в сложных сценариях.</p>
              </div>
            </div>
          </div>
          <div class="w-[1172px] h-[559px] shrink-0">
            <img src="/assets/cases/sltp/result-img.png" alt="Result" class="w-full h-full object-contain block" />
          </div>
        </div>

      </div>
    </div>
  `;
}

function generateKelpieLongread() {
  const LABEL = "shrink-0 w-[131px] text-[16px] leading-[20px] font-bold italic tracking-[0.48px] uppercase text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";
  const LABEL_WIDE = "shrink-0 w-[148px] text-[16px] leading-[20px] font-bold italic tracking-[0.48px] uppercase text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";
  const TEXT = "text-[18px] leading-[22px] font-medium tracking-[0.18px] text-[rgba(179,189,210,0.8)] [font-family:var(--font-case)]";
  const TEXT_MUTED = "text-[18px] leading-[22px] font-medium tracking-[0.18px] text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";
  const TEXT_FULL = "text-[18px] leading-[22px] font-medium tracking-[0.18px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const DETAIL_LABEL = "text-[16px] leading-[20px] tracking-[0.16px] font-bold text-[#b3bdd2] [font-family:var(--font-case)]";
  const DETAIL_VALUE = "text-[16px] leading-[20px] tracking-[0.16px] italic text-[#b3bdd2] [font-family:var(--font-case)]";
  const QUOTE = "font-bold italic text-[18px] leading-[22px] tracking-[0.18px] text-[rgba(179,189,210,0.8)] [font-family:var(--font-case)]";
  const QUOTE_FULL = "font-bold italic text-[18px] leading-[22px] tracking-[0.18px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const HIGHLIGHT = "font-bold italic text-[18px] leading-[21px] tracking-[0.18px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const CAPTION = "font-light italic text-[14px] leading-[15px] tracking-[0.14px] text-[rgba(179,189,210,0.5)] text-center [font-family:var(--font-case)]";
  const ROW = "flex items-start justify-between pl-[52px] pr-[154px] box-border";
  const LIST = "pl-[27px] list-disc text-[18px] leading-[22px] font-normal tracking-[0.18px] text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";

  return `
    <div class="kelpieLongread flex flex-col gap-[24px] w-[1172px] overflow-hidden">

      <div id="longreadHero" class="relative w-[1172px] h-[771px] shrink-0 overflow-hidden">
        <img
          src="/assets/cases/kelpie/preview/kelpie-hero.png"
          alt="Kelpie AI Platform"
          class="block h-full w-full object-cover"
        />
      </div>

      <div class="flex flex-col gap-[120px] items-center w-[1172px] pb-[120px]">

        <div class="flex flex-col gap-[64px] items-start w-full">
          <div class="${ROW} w-full">
            <span class="${LABEL}">Context</span>
            <div class="shrink-0 w-[570px] flex flex-col gap-[28px]">
              <div class="${QUOTE}">
                <p class="mb-0">Как за 4 недели превратить хаотичный набор сложного функционала в понятную, масштабируемую AI-платформу, готовую к запуску на пользователей.</p>
                <p>+ и получить оффер на роль Product Owner / Design Lead.</p>
              </div>
              <div class="flex flex-col gap-[16px]">
                <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                  <span class="font-bold">Роль</span>
                  <span class="${DETAIL_VALUE}">Lead Product Designer</span>
                </div>
                <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                  <span class="font-bold capitalize">Фокус</span>
                  <span class="${DETAIL_VALUE}">продуктовая архитектура, UX-логика, MVP, дизайн-система</span>
                </div>
                <div class="flex items-center gap-[8px] ${DETAIL_LABEL}">
                  <span class="font-bold capitalize">Срок</span>
                  <span class="${DETAIL_VALUE}">4 недели</span>
                </div>
                <div class="flex items-start gap-[8px] ${DETAIL_LABEL}">
                  <span class="font-bold capitalize shrink-0">Продукт:</span>
                  <span class="${DETAIL_VALUE}">Kelpie — AI-augmented workplace: рабочая среда, где люди, документы, чаты, workflows, события и AI-агенты связаны в единую систему работы.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="${ROW} w-full">
            <span class="${LABEL}">Проблема</span>
            <div class="shrink-0 w-[570px] flex flex-col gap-[32px]">
              <p class="${TEXT}">Клиент пришёл с запросом на быстрый UX/UI-polish перед запуском.<br/>Еще до входа стало понятно: проблема была не в визуале.</p>
              <div class="flex flex-col gap-[16px]">
                <p class="${TEXT_MUTED}">В системе уже были наброски AI-assistant, agents, workflows, chats, files, совместный редактор документов, events и admin-зоны, но <span class="font-bold italic text-[#b3bdd2]">ни один из разделов не был логически проработан</span> и <span class="font-bold italic text-[#b3bdd2]">между ними не было ясной навигационной модели</span>:</p>
                <p class="${TEXT_MUTED}">Фигмы не было, все собиралось срузу в код.</p>
                <p class="${TEXT}">Продукт не читался как единая рабочая среда.</p>
                <div class="${TEXT_MUTED}">
                  <p class="mb-0">Было не понятно:</p>
                  <ul class="${LIST}">
                    <li>где начинается работа;</li>
                    <li>чем AI Assistant отличается от agents и workflows;</li>
                    <li>где запускать процесс;</li>
                    <li>где следить за выполнением;</li>
                    <li>где появляются результаты;</li>
                    <li>как в работу включаются коллеги и AI.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-[24px] items-start w-full">
            <div class="relative w-full h-[580px]">
              <img src="/assets/cases/kelpie/longread/staging-01.png" alt="" class="absolute left-0 top-0 h-[440px] w-[810px] rounded-[16px] object-cover opacity-[0.85]" />
              <img src="/assets/cases/kelpie/longread/staging-02.png" alt="" class="absolute right-0 bottom-0 h-[440px] w-[812px] rounded-[16px] object-cover" />
            </div>
            <p class="${CAPTION} w-full">состояние продукта, которое было на моменте моего подключения к работе</p>
          </div>
        </div>

        <div class="flex flex-col gap-[64px] items-start w-full">
          <div class="${ROW} w-full">
            <span class="${LABEL_WIDE}">Deep dive за 3 дня</span>
            <div class="shrink-0 w-[570px] flex flex-col gap-[32px]">
              <p class="${TEXT}">Быстро стало ясно: если сразу идти в UI, мы просто красиво оформим хаос. Поэтому несмотря на острую нехватку времени я настояила на моем глубокогом погружении.</p>
              <div class="${TEXT}">
                <p class="mb-0">За <span class="font-bold italic">три дня</span> я параллельно разбирала GitHub, staging, текущие фичи, backend-ограничения и AI-assisted разбор кода.</p>
                <p class="mb-0">&nbsp;</p>
                <p class="mb-0">Одновременно декомпозировала платформу на ключевые сущности — AI Assistant, agents, workflows, events, workspace, chats, Beach, Files, artifacts, settings — и собирала сырые карты в Figma, чтобы увидеть связи между разделами, сценариями и состояниями.</p>
                <p>На непотнятных участках собирала HTML прототипы через нейронку, чтобы хоть как-то разобрать заложенную логику.</p>
              </div>
              <div class="flex justify-center w-full">
                <img src="/assets/cases/kelpie/longread/giphy.gif" alt="" class="size-[279px] object-cover" />
              </div>
              <p class="${QUOTE}">Это было погружение в работающий хаос и только после этого стало возможно проектировать интерфейс не как набор экранов, а как рабочую архитектуру продукта.</p>
            </div>
          </div>

          <div class="flex flex-col gap-[12px] items-start w-full py-[24px]">
            <div class="flex items-center justify-center w-full h-[531px] overflow-hidden">
              <img src="/assets/cases/kelpie/longread/research-img.png" alt="" class="w-full h-full object-contain block" />
            </div>
            <p class="${CAPTION} w-full">Кусочки ресерча</p>
          </div>

          <div class="${ROW} w-full">
            <span class="${LABEL_WIDE}">REFRAMING THE TASK</span>
            <div class="shrink-0 w-[570px] flex flex-col gap-[24px]">
              <div class="${TEXT}">
                <p class="mb-0"><span class="font-bold italic">Было:</span> “Быстро отполировать экраны перед запуском.”</p>
                <p><span class="font-bold italic">Стало:</span> “Собрать рабочую модель AI-офиса — и сделать так, чтобы интерфейс её выражал.”</p>
              </div>
              <div class="${TEXT_MUTED}">
                <p class="mb-0">Перед визуальным слоем я разложила продукт на ключевые сущности:</p>
                <p class="mb-0">&nbsp;</p>
                <p class="mb-0 font-bold text-[#b3bdd2]">AI Assistant · Agents · Workflows · Events · Workspace · Chats · Beach / Files · Artifacts · Admin settings</p>
                <p class="mb-0">&nbsp;</p>
                <p>Дальше я проверяла не отдельные экраны, а связи между ними:<br/>как пользователь переходит от запроса к AI → к запуску workflow → к мониторингу → к результату → к совместной работе.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW} w-full">
            <span class="${LABEL_WIDE}">Scope/delivery</span>
            <div class="shrink-0 w-[570px] flex flex-col gap-[24px]">
              <p class="${QUOTE_FULL}">Объём MVP оказался ближе к зрелому продукту, чем к быстрому launch package: почти каждый модуль требовал архитектурного решения, состояний и детализации.</p>
              <p class="${TEXT_MUTED}">Был необходим второй дизайнер для делегирования вторичных сценариев.</p>
              <p class="${TEXT}">
                <span class="font-bold text-[#b3bdd2]">Мой фокус:</span> core architecture, роли модулей, ключевые сценарии и продуктовая модель.<br/>
                <span class="font-bold text-[#b3bdd2]">Фокус второго дизайнера:</span> вторичные экраны, состояния, UI-polish, детализация компонентов и поддержка фреймов.
              </p>
            </div>
          </div>
          <div class="w-full overflow-hidden">
            <img src="/assets/cases/kelpie/longread/scope-diagram.png" alt="" class="w-full h-auto block" />
          </div>
        </div>

        <div class="${ROW} w-full items-start">
          <span class="${LABEL}">Scope/<br/>delivery</span>
          <div class="shrink-0 w-[570px] flex flex-col gap-[120px]">

            <div class="flex flex-col gap-[24px]">
              <p class="${HIGHLIGHT}">1/ Cжала платформу до 4 рабочих слоёв</p>
              <p class="${TEXT_FULL}">Вместо длинного списка разделов я собрала Kelpie как AI-офис с четырьмя понятными слоями:</p>
              <ol class="${LIST} list-decimal text-[#b3bdd2]">
                <li class="mb-[8px]"><span class="font-bold">Workflow Library</span><br/>Что система и AI-агенты умеют делать.</li>
                <li class="mb-[8px]"><span class="font-bold">Command Centre</span><br/>Что происходит сейчас: запущенные процессы, события, approvals, ошибки и действия.</li>
                <li class="mb-[8px]"><span class="font-bold">Beach / Files</span><br/>Где живут документы, материалы, артефакты и результаты.</li>
                <li><span class="font-bold">Chats / Collaboration</span><br/>Где люди и AI взаимодействуют вокруг работы.</li>
              </ol>
              <div class="w-full overflow-hidden">
                <img src="/assets/cases/kelpie/longread/layers-img.png" alt="" class="w-full h-auto block" />
              </div>
              <p class="${QUOTE_FULL}">Это позволило не упростить продукт искусственно, а сделать его читаемым.</p>
            </div>

            <div class="flex flex-col gap-[24px]">
              <p class="${HIGHLIGHT}">2/ Я ввела функциональную онтологию продукта</p>
              <p class="${TEXT_FULL}">Каждый экран я проверяла через пять режимов работы пользователя:</p>
              <p class="${TEXT_MUTED}">
                <span class="font-bold italic text-[#b3bdd2]">Discovery</span> — найти, что умеет система.<br/>
                <span class="font-bold italic text-[#b3bdd2]">Run</span> — запустить или продолжить работу.<br/>
                <span class="font-bold italic text-[#b3bdd2]">Monitoring</span> — видеть процессы, статусы и события.<br/>
                <span class="font-bold italic text-[#b3bdd2]">Collaboration</span> — взаимодействовать с людьми и AI.<br/>
                <span class="font-bold italic text-[#b3bdd2]">Outputs</span> — находить документы, артефакты и результаты.
              </p>
              <div class="w-full overflow-hidden">
                <img src="/assets/cases/kelpie/longread/ontology-img.png" alt="" class="w-full h-auto block" />
              </div>
              <p class="${TEXT_FULL}">Пользователь сейчас ищет, запускает, наблюдает, взаимодействует или работает с результатом?</p>
            </div>

            <div class="flex flex-col gap-[24px]">
              <p class="${HIGHLIGHT}">3/ Навигация под ограничением: Widgets / Sections</p>
              <p class="${QUOTE_FULL}">Строгое ограничение от заказчика было: ни в коем случае не типичный SaaS sidebar в качестве меню и навигации.</p>
              <p class="${TEXT_FULL}"><span class="font-bold italic">Мультирежимность:</span> Widgets / Sections стали способом разделить обзор и глубокую работу: widgets показывают жизнь системы, sections дают доступ к полноценным рабочим зонам.</p>
              <p class="${TEXT_FULL}">В дальнейших планах было попробовать спроектировать экран Widgets в качестве некого меню навигации, анализа и работы с платформой - чтобы из одного экрана воспроизводить всю работу по платформе.</p>
              <div class="w-full overflow-hidden">
                <img src="/assets/cases/kelpie/longread/nav-widgets-img.png" alt="" class="w-full h-auto block" />
              </div>
            </div>

            <div class="flex flex-col gap-[24px]">
              <p class="${HIGHLIGHT}">4/ Сделала Command Centre слоем управления работой</p>
              <p class="${TEXT_FULL}">Он связал три уровня:</p>
              <ol class="${LIST} list-decimal text-[#b3bdd2]">
                <li class="mb-[8px]"><span class="font-bold italic">Events Feed</span><br/>События со всей платформы: prompts, AI responses, workflow actions, approvals, failures, chats, artifacts.</li>
                <li class="mb-[8px]"><span class="font-bold italic">Workspace</span><br/>Погружение в конкретную работу: chat, logs, details, artifacts, execution.</li>
                <li><span class="font-bold italic">Side Panel</span><br/>Быстрый доступ к текущей активности из любой точки интерфейса.</li>
              </ol>
              <p class="${TEXT_FULL}"><span class="font-bold italic">Важные события стали actionable:</span><br/>approve, reject, retry, open workspace, view logs, show chat, download artifacts.</p>
              <div class="w-full overflow-hidden">
                <img src="/assets/cases/kelpie/longread/commandcentre-img.png" alt="" class="w-full h-auto block" />
              </div>
              <p class="${QUOTE_FULL}">Я перевела технический шум в управляемый рабочий слой, где пользователь понимает, что происходит, где нужен его вклад и куда перейти дальше.</p>
            </div>

            <div class="flex flex-col gap-[24px]">
              <p class="${HIGHLIGHT}">5/ Экран Welcome стал легким входом в сложный продукт</p>
              <p class="${TEXT_FULL}">Первый экран не должен был сразу обрушивать на пользователя всю сложность AI-платформы — <span class="font-bold italic">поэтому Welcome стал спокойным первым слоем.</span></p>
              <p class="${QUOTE_FULL}">Cначала — простой вход через assistant;<br/>Дальше — раскрытие widgets и sections;<br/>Затем — переход в Command Centre, Workflow Library, Beach, Chats и Files.</p>
              <p class="${TEXT_FULL}">Это не было “идеальным” решением на бумаге.<br/>Это MVP-компромисс: сначала снизить тревожность и когнитивную нагрузку, потом постепенно раскрывать платформу.</p>
              <div class="w-full overflow-hidden">
                <img src="/assets/cases/kelpie/longread/welcome-img.png" alt="" class="w-full h-auto block" />
              </div>
            </div>

          </div>
        </div>

        <div class="flex flex-col gap-[64px] items-center w-full">
          <div class="${ROW} w-full">
            <span class="${LABEL}">Results</span>
            <div class="shrink-0 w-[570px] flex flex-col gap-[12px]">
              <p class="${QUOTE_FULL}">Цель:</p>
              <p class="${TEXT_MUTED}">Подготовка к запуску для 40 компаний с целевым показателем 70% User Trust</p>
              <p class="${QUOTE_FULL}">Scope:</p>
              <p class="${TEXT_MUTED}">Реализовано и детально проработано 8 ключевых модулей системы (Command Centre, Library, Beach и др.). + часть вспомогательный внеплановых разделов (calendar, mail, contact) По итогу было заложено и проработано даже больше, чем могло реализоваться разработкой в срок запуска.</p>
              <p class="${QUOTE_FULL}">Delivery:</p>
              <p class="${TEXT_MUTED}">За 4 недели хаотичный staging превращен в архитектурно устойчивую платформу</p>
              <p class="${QUOTE_FULL}">Market Validation:</p>
              <p class="${QUOTE_FULL}">По итогам запуска получила оффер на роль Product Owner / Design Lead.</p>
            </div>
          </div>
          <div class="w-[1088px] h-[775px] shrink-0 overflow-hidden rounded-[24px] shadow-[0px_4px_27.5px_19px_rgba(0,0,0,0.25)]">
            <img src="/assets/cases/kelpie/longread/outcome-img.png" alt="" class="w-full h-full object-cover block" />
          </div>
        </div>

      </div>
    </div>
  `;
}

function renderPreviewContent() {
  if (!casePreviewInner) {
    return;
  }

  if (viewState === "overview") {
    if (renderedCaseId) {
      casePreviewInner.innerHTML = "";
      renderedCaseId = "";
    }
    return;
  }

  if (viewState === "hover-emergency" || viewState === "hover-sltp" || viewState === "hover-kelpie") {
    if (casePreviewInner.innerHTML) {
      casePreviewInner.innerHTML = "";
      renderedCaseId = "";
    }
    return;
  }

  if (viewState === "closing") {
    return;
  }

  const currentCase = cases.find((c) => c.id === (activeCaseId ?? hoveredCaseId));

  if (!currentCase) {
    return;
  }

  if (
    currentCase.id !== EMERGENCY_CASE_ID &&
    currentCase.id !== SLTP_CASE_ID &&
    currentCase.id !== KELPIE_CASE_ID
  ) {
    return;
  }

  if (renderedCaseId !== currentCase.id) {
    if (currentCase.id === EMERGENCY_CASE_ID) {
      casePreviewInner.innerHTML = generateEmergencyLongread();
    } else if (currentCase.id === SLTP_CASE_ID) {
      casePreviewInner.innerHTML = generateSLTPLongread();
    } else if (currentCase.id === KELPIE_CASE_ID) {
      casePreviewInner.innerHTML = generateKelpieLongread();
    }
    renderedCaseId = currentCase.id;
    zoneCasePreview?.scrollTo({ top: 0, behavior: "auto" });
  }
}

function applyHoverLayerState() {
  const hoverBgLayer = document.querySelector("#hoverBgLayer");
  const hoverBgLayerSltp = document.querySelector("#hoverBgLayerSltp");
  const hoverBgLayerKelpie = document.querySelector("#hoverBgLayerKelpie");

  if (hoverBgLayer instanceof HTMLElement) {
    hoverBgLayer.style.opacity = viewState === "hover-emergency" ? "1" : "0";
  }

  if (hoverBgLayerSltp instanceof HTMLElement) {
    hoverBgLayerSltp.style.opacity = viewState === "hover-sltp" ? "1" : "0";
  }

  if (hoverBgLayerKelpie instanceof HTMLElement) {
    hoverBgLayerKelpie.style.opacity = viewState === "hover-kelpie" ? "1" : "0";
  }
}

function applyIntroState() {
  const layoutKey = getIntroLayoutKey();
  const currentLayout = introLayouts[layoutKey];

  if (!zoneIntro || !currentLayout) {
    return;
  }

  zoneIntro.className = `${ZONE_INTRO_BASE_CLASS} ${currentLayout.zoneWidthClass}`;
  zoneIntro.style.opacity = currentLayout.zoneOpacity;

  if (introIcon) {
    introIcon.className = INTRO_STATIC_CLASSES.icon;
  }

  if (introStatement) {
    introStatement.className = currentLayout.statementClass;
  }

  if (introMeta) {
    introMeta.className = currentLayout.metaClass;
  }

  if (introPortrait) {
    introPortrait.className = currentLayout.portraitClass;
  }

  if (introMenu) {
    introMenu.className = currentLayout.menuClass;
  }

  if (introContacts) {
    introContacts.className = currentLayout.contactsClass;
  }

  if (selectedWorkBlock) {
    selectedWorkBlock.className = currentLayout.selectedWorkBlockClass;
  }

  if (selectedWorkLabel) {
    selectedWorkLabel.className = currentLayout.selectedWorkLabelClass;
  }
}

function applyPreviewState() {
  if (!zoneCasePreview) {
    return;
  }

  const base = "absolute z-[10] transition-[left,width,height,opacity] duration-[900ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]";

  if (viewState === "overview") {
    zoneCasePreview.className = `${base} left-[1941px] top-0 h-[1080px] w-[679px] overflow-hidden opacity-0 pointer-events-none`;
    return;
  }

  if (viewState === "hover-emergency" || viewState === "hover-sltp" || viewState === "hover-kelpie") {
    zoneCasePreview.className = `${base} left-[1241px] top-0 h-[1080px] w-[679px] overflow-hidden opacity-100`;
    return;
  }

  if (viewState === "opening-emergency" || viewState === "opening-sltp" || viewState === "opening-kelpie") {
    zoneCasePreview.className = `${base} left-[749px] top-0 h-[1080px] w-[1171px] overflow-hidden opacity-100`;
    return;
  }

  if (viewState === "case-open-emergency" || viewState === "case-open-sltp" || viewState === "case-open-kelpie") {
    zoneCasePreview.className = `${base} left-[749px] top-0 h-[1080px] w-[1171px] overflow-x-hidden overflow-y-auto overscroll-contain opacity-100`;
    return;
  }

  if (viewState === "closing") {
    zoneCasePreview.className = `${base} left-[1941px] top-0 h-[1080px] w-[1171px] overflow-hidden opacity-100 pointer-events-none`;
    return;
  }
}

function applyCloseButtonState() {
  if (!closeCaseButton) {
    return;
  }

  const isVisible =
    viewState === "case-open-emergency" ||
    viewState === "opening-emergency" ||
    viewState === "case-open-sltp" ||
    viewState === "opening-sltp" ||
    viewState === "case-open-kelpie" ||
    viewState === "opening-kelpie";

  closeCaseButton.className = isVisible
    ? "absolute left-[1809px] top-[36px] z-[60] flex items-center justify-center border-0 bg-[rgba(179,189,210,0.1)] px-[16px] py-[4px] text-[18px] leading-[20px] font-normal italic tracking-[-0.18px] text-[#b3bdd2] opacity-100 pointer-events-auto cursor-pointer transition-opacity duration-[400ms] ease-out [font-family:var(--font-case)]"
    : "absolute left-[1809px] top-[36px] z-[60] flex items-center justify-center border-0 bg-[rgba(179,189,210,0.1)] px-[16px] py-[4px] text-[18px] leading-[20px] font-normal italic tracking-[-0.18px] text-[#b3bdd2] opacity-0 pointer-events-none transition-opacity duration-[400ms] ease-out [font-family:var(--font-case)]";
}

function applyCaseItemState() {
  let activeId = null;

  if (
    viewState === "hover-emergency" ||
    viewState === "opening-emergency" ||
    viewState === "case-open-emergency"
  ) {
    activeId = EMERGENCY_CASE_ID;
  } else if (
    viewState === "hover-sltp" ||
    viewState === "opening-sltp" ||
    viewState === "case-open-sltp"
  ) {
    activeId = SLTP_CASE_ID;
  } else if (
    viewState === "hover-kelpie" ||
    viewState === "opening-kelpie" ||
    viewState === "case-open-kelpie"
  ) {
    activeId = KELPIE_CASE_ID;
  }
  const caseButtons = document.querySelectorAll("[data-case-id]");
  const groupSections = document.querySelectorAll("[data-group-company]");

  groupSections.forEach((groupSection) => {
    if (!activeId) {
      groupSection.classList.remove("opacity-30");
      return;
    }

    const containsActive = groupSection.querySelector(
      `[data-case-id="${activeId}"]`,
    );

    groupSection.classList.toggle("opacity-30", !containsActive);
    groupSection.classList.toggle("opacity-100", Boolean(containsActive));
  });

  caseButtons.forEach((caseButton) => {
    const isActive = caseButton.dataset.caseId === activeId;
    const title = caseButton.querySelector("[data-case-title]");
    const description = caseButton.querySelector("[data-case-description]");
    const plus = caseButton.querySelector("[data-case-plus]");

    caseButton.classList.toggle("opacity-[0.35]", Boolean(activeId) && !isActive);
    caseButton.classList.toggle("opacity-100", !activeId || isActive);
    caseButton.classList.toggle("opacity-30", Boolean(activeId) && !isActive);

    title?.classList.toggle("text-[#b3bdd2]", isActive);
    title?.classList.toggle("text-[rgba(179,189,210,0.72)]", !isActive);
    title?.classList.toggle("underline", isActive);
    title?.classList.toggle("[text-underline-offset:3px]", isActive);

    description?.classList.toggle("text-[rgba(179,189,210,0.8)]", isActive);
    description?.classList.toggle("text-[rgba(179,189,210,0.55)]", !isActive);

    plus?.classList.toggle("text-[#b3bdd2]", isActive);
    plus?.classList.toggle("text-[rgba(179,189,210,0.72)]", !isActive);
  });
}

function renderAboutState() {
  if (!aboutPage) {
    return;
  }

  aboutPage.dataset.state = viewState;
  aboutPage.dataset.activeCase = activeCaseId ?? "";
  aboutPage.dataset.hoveredCase = hoveredCaseId ?? "";

  applyIntroState();
  applyPreviewState();
  applyCloseButtonState();
  applyCaseItemState();
  renderPreviewContent();
  applyHoverLayerState();
}

function resetToOverview() {
  if (openAnimationTimer) {
    clearTimeout(openAnimationTimer);
    openAnimationTimer = null;
  }

  if (closeAnimationTimer) {
    clearTimeout(closeAnimationTimer);
    closeAnimationTimer = null;
  }

  hoveredCaseId = null;
  activeCaseId = null;
  viewState = "overview";

  if (casePreviewInner) {
    casePreviewInner.style.transition = "";
    casePreviewInner.style.transform = "";
  }

  renderAboutState();
}

function handleClose() {
  if (
    viewState !== "case-open-emergency" &&
    viewState !== "opening-emergency" &&
    viewState !== "case-open-sltp" &&
    viewState !== "opening-sltp" &&
    viewState !== "case-open-kelpie" &&
    viewState !== "opening-kelpie"
  ) {
    return;
  }

  if (openAnimationTimer) {
    clearTimeout(openAnimationTimer);
    openAnimationTimer = null;
  }

  if (closeAnimationTimer) {
    clearTimeout(closeAnimationTimer);
  }

  viewState = "closing";

  if (casePreviewInner) {
    casePreviewInner.style.transition = `transform 600ms ${MOTION_EASING}`;
    casePreviewInner.style.transform = "translateX(1200px)";
  }

  applyCloseButtonState();

  closeAnimationTimer = window.setTimeout(() => {
    hoveredCaseId = null;

    aboutPage.dataset.state = viewState;
    aboutPage.dataset.activeCase = activeCaseId ?? "";
    aboutPage.dataset.hoveredCase = hoveredCaseId ?? "";

    applyPreviewState();
    applyCaseItemState();
    applyHoverLayerState();

    const overviewLayout = introLayouts["overview"];
    if (zoneIntro && overviewLayout) {
      zoneIntro.className = `${ZONE_INTRO_BASE_CLASS} ${overviewLayout.zoneWidthClass}`;
      zoneIntro.style.opacity = overviewLayout.zoneOpacity;
      if (introMeta) introMeta.className = overviewLayout.metaClass;
      if (introPortrait) introPortrait.className = overviewLayout.portraitClass;
      if (introMenu) introMenu.className = overviewLayout.menuClass;
      if (introContacts) introContacts.className = overviewLayout.contactsClass;
      if (introStatement) introStatement.className = overviewLayout.statementClass;
      if (selectedWorkBlock) selectedWorkBlock.className = overviewLayout.selectedWorkBlockClass;
      if (selectedWorkLabel) selectedWorkLabel.className = overviewLayout.selectedWorkLabelClass;
    }
  }, 150);

  window.setTimeout(() => {
    closeAnimationTimer = null;
    activeCaseId = null;
    hoveredCaseId = null;
    viewState = "overview";

    if (casePreviewInner) {
      casePreviewInner.style.transition = "";
      casePreviewInner.style.transform = "";
    }

    renderAboutState();
  }, 150 + 900);
}

function getHoverStateForCase(caseId) {
  if (caseId === EMERGENCY_CASE_ID) return "hover-emergency";
  if (caseId === SLTP_CASE_ID) return "hover-sltp";
  if (caseId === KELPIE_CASE_ID) return "hover-kelpie";
  return null;
}

function getOpeningStateForCase(caseId) {
  if (caseId === EMERGENCY_CASE_ID) return "opening-emergency";
  if (caseId === SLTP_CASE_ID) return "opening-sltp";
  if (caseId === KELPIE_CASE_ID) return "opening-kelpie";
  return null;
}

function getCaseOpenStateForCase(caseId) {
  if (caseId === EMERGENCY_CASE_ID) return "case-open-emergency";
  if (caseId === SLTP_CASE_ID) return "case-open-sltp";
  if (caseId === KELPIE_CASE_ID) return "case-open-kelpie";
  return null;
}

function attachCaseEvents() {
  const caseButtons = document.querySelectorAll("[data-case-id]");

  caseButtons.forEach((caseButton) => {
    const caseId = caseButton.dataset.caseId;
    const hoverState = getHoverStateForCase(caseId);
    const openingState = getOpeningStateForCase(caseId);
    const caseOpenState = getCaseOpenStateForCase(caseId);

    if (!hoverState) return;

    caseButton.addEventListener("mouseenter", () => {
      if (
        viewState === "closing" ||
        viewState.startsWith("opening-")
      ) {
        return;
      }

      hoveredCaseId = caseId;

      if (activeCaseId === null) {
        viewState = hoverState;
      }

      renderAboutState();
    });

    caseButton.addEventListener("focus", () => {
      if (
        viewState === "closing" ||
        viewState.startsWith("opening-")
      ) {
        return;
      }

      hoveredCaseId = caseId;

      if (activeCaseId === null) {
        viewState = hoverState;
      }

      renderAboutState();
    });

    caseButton.addEventListener("click", () => {
      if (
        viewState === "closing" ||
        viewState.startsWith("opening-")
      ) {
        return;
      }

      if (openAnimationTimer) {
        clearTimeout(openAnimationTimer);
        openAnimationTimer = null;
      }

      if (closeAnimationTimer) {
        clearTimeout(closeAnimationTimer);
        closeAnimationTimer = null;
      }

      activeCaseId = caseId;
      hoveredCaseId = caseId;
      viewState = openingState;

      aboutPage.dataset.state = viewState;
      aboutPage.dataset.activeCase = activeCaseId ?? "";
      aboutPage.dataset.hoveredCase = hoveredCaseId ?? "";

      renderPreviewContent();

      if (casePreviewInner) {
        casePreviewInner.style.transition = "none";
        casePreviewInner.style.transform = "translateX(1200px)";
      }

      applyIntroState();
      applyPreviewState();
      applyCloseButtonState();
      applyCaseItemState();
      applyHoverLayerState();

      if (casePreviewInner) {
        casePreviewInner.getBoundingClientRect();
        casePreviewInner.style.transition = `transform 900ms ${MOTION_EASING}`;
        casePreviewInner.style.transform = "translateX(0)";
      }

      openAnimationTimer = window.setTimeout(() => {
        openAnimationTimer = null;

        if (viewState !== openingState) {
          return;
        }

        viewState = caseOpenState;

        if (casePreviewInner) {
          casePreviewInner.style.transition = "";
          casePreviewInner.style.transform = "";
        }

        renderAboutState();
      }, 900);
    });
  });
}

selectedWorkBlock?.addEventListener("mouseleave", () => {
  if (activeCaseId !== null) {
    return;
  }

  hoveredCaseId = null;
  viewState = "overview";
  renderAboutState();
});

closeCaseButton?.addEventListener("click", () => {
  handleClose();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && viewState !== "overview") {
    if (
      viewState === "case-open-emergency" ||
      viewState === "opening-emergency" ||
      viewState === "case-open-sltp" ||
      viewState === "opening-sltp" ||
      viewState === "case-open-kelpie" ||
      viewState === "opening-kelpie"
    ) {
      handleClose();
      return;
    }

    resetToOverview();
  }
});

window.addEventListener("resize", updateStageScale);
window.addEventListener("orientationchange", updateStageScale);

renderSelectedWorkList();
initializeAnimatedElements();
attachCaseEvents();
updateStageScale();
renderAboutState();
