import "./style.css";

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;
const MOTION_EASING = "cubic-bezier(0.77,0,0.175,1)";
const POSITION_TRANSITION = `left 900ms ${MOTION_EASING}, top 900ms ${MOTION_EASING}, width 900ms ${MOTION_EASING}, height 900ms ${MOTION_EASING}, bottom 900ms ${MOTION_EASING}, opacity 450ms ease, transform 900ms ${MOTION_EASING}`;
const EMERGENCY_CASE_ID = "emergency-redesign";
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
  if (viewState === "hover-emergency") {
    return "hover-emergency";
  }

  if (
    viewState === "opening-emergency" ||
    viewState === "case-open-emergency" ||
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
  const LABEL = "shrink-0 w-[131px] text-[16px] leading-[20px] font-bold italic tracking-[0.48px] uppercase text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";
  const LABEL_TIGHT = "shrink-0 w-[131px] text-[16px] leading-[20px] font-bold italic tracking-[0.16px] uppercase text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";
  const LABEL_WIDE = "shrink-0 w-[236px] text-[16px] leading-[20px] font-bold italic tracking-[0.48px] uppercase text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";
  const BODY = "shrink-0 w-[570px] flex flex-col gap-[32px]";
  const TEXT = "text-[18px] leading-[21px] font-medium tracking-[0.18px] text-[rgba(179,189,210,0.8)] [font-family:var(--font-case)]";
  const TEXT_FULL = "text-[18px] leading-[21px] font-medium tracking-[0.18px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const DETAIL_LABEL = "text-[16px] leading-[20px] tracking-[0.16px] font-bold text-[#b3bdd2] [font-family:var(--font-case)]";
  const DETAIL_VALUE = "text-[16px] leading-[20px] tracking-[0.16px] italic text-[#b3bdd2] [font-family:var(--font-case)]";
  const SMALL_LABEL = "text-[15px] leading-[20px] tracking-[0.15px] font-bold capitalize text-[rgba(179,189,210,0.6)] [font-family:var(--font-case)]";
  const QUOTE = "font-bold italic text-[18px] leading-[21px] tracking-[0.18px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const CAPTION = "font-light italic text-[14px] leading-[15px] tracking-[0.14px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const BET_TITLE = "text-[18px] leading-[21px] font-bold italic tracking-[0.18px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const ROW = "flex items-start justify-between pl-[52px] pr-[154px] box-border";

  return `
    <div class="emergencyRedesignLongread flex flex-col gap-[24px] w-[1172px] overflow-hidden">

      <!-- A. Hero -->
      <div id="longreadHero" class="relative w-[1172px] h-[771px] shrink-0 overflow-hidden">
        <img
          id="heroFullImage"
          src="/assets/cases/emergency-redesign/hero-preview.png"
          alt="Emergency Redesign Hero"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <!-- Longread body -->
      <div id="longreadSections" class="flex flex-col gap-[120px] items-center w-[1172px]">

        <!-- B. Context -->
        <div class="${ROW} w-full">
          <span class="${LABEL}">Context</span>
          <div class="shrink-0 w-[570px] flex flex-col gap-[28px]">
            <p class="${TEXT}">
              Экстренный перезапуск iOS trading app под блокировкой, коротким дедлайном и неопределёнными правилами ревью.
            </p>
            <div class="flex flex-col gap-[16px]">
              <div class="flex items-center gap-[8px] text-[#b3bdd2] text-[16px] leading-[20px] tracking-[0.16px] [font-family:var(--font-case)]">
                <span class="font-bold">Роль</span>
                <span class="italic">Product Designer</span>
              </div>
              <div class="flex items-center gap-[8px] text-[#b3bdd2] text-[16px] leading-[20px] tracking-[0.16px] [font-family:var(--font-case)]">
                <span class="font-bold">Срок</span>
                <span class="italic">~1.5 months</span>
              </div>
              <div class="flex items-center gap-[8px] text-[#b3bdd2] text-[16px] leading-[20px] tracking-[0.16px] [font-family:var(--font-case)]">
                <span class="font-bold capitalize">Команда</span>
                <span class="italic">5 developers, позже пришел 2-ой дизайнер на флоу регистрации</span>
              </div>
              <div class="flex items-start w-full text-[#b3bdd2] text-[16px] leading-[20px] tracking-[0.16px] [font-family:var(--font-case)]">
                <span class="font-bold capitalize">Результат</span>
              </div>
            </div>
            <p class="${TEXT_FULL}">
              Я использовала вынужденный перезапуск как возможность не только обновить интерфейс, но и улучшить структуру продукта: сохранить ключевые торговые сценарии и заложить основу для дальнейшего развития.
            </p>
          </div>
        </div>

        <!-- C. Risk -->
        <div class="flex flex-col items-start w-full">
          <div class="${ROW} w-full">
            <span class="${LABEL}">Risk</span>
            <div class="shrink-0 w-[570px] flex flex-col items-center">
              <p class="${TEXT}">
                Старое iOS-приложение уже было заблокировано. С выходом новой iOS компания рисковала потерять текущую iOS-аудиторию — меньшую, чем Android, но значимую по выручке.
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-[12px] items-start py-[24px] w-full">
            <div class="flex items-center justify-center px-[24px] h-[481px] w-full overflow-hidden">
              <img src="/assets/cases/emergency-redesign/risk-img.png" alt="Старый интерфейс" class="w-full h-[481px] object-contain block" />
            </div>
            <div class="flex items-center justify-center px-[24px] w-full">
              <span class="${CAPTION}">Старый интерфейс</span>
            </div>
          </div>
          <div class="flex items-center pl-[315px] pr-[154px] w-full">
            <p class="w-[411px] ${QUOTE}">
              Новое приложение должно было быть достаточно другим, но при этом не ломать основные торговые сценарии.
            </p>
          </div>
        </div>

        <!-- D. From masking to rebuilding -->
        <div class="flex flex-col items-start w-full">
          <div class="${ROW} w-full">
            <span class="${LABEL_WIDE}">From masking to rebuilding</span>
            <div class="shrink-0 w-[570px] flex flex-col gap-[32px]">
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Initial ask:</span>
                <p class="${TEXT_FULL}">
                  Слегка изменить вход в продукт, онбординг и стартовые экраны, а торговую логику временно скрыть через feature toggle.
                </p>
              </div>
              <div class="w-[41px] h-[48px]">
                <img src="/assets/cases/emergency-redesign/arrow.svg" alt="" class="block w-full h-full" />
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Reframing:</span>
                <p class="${TEXT_FULL}">
                  На этом этапе я настояла, что нельзя тратить редкое окно изменений только на оболочку. Если продукт всё равно приходится пересобирать, нужно использовать этот момент не как временный обход, а как возможность усилить систему.
                </p>
              </div>
              <div class="w-[339px] h-[64px] rounded-[16px] overflow-hidden">
                <img src="/assets/cases/emergency-redesign/reframing-message.png" alt="" class="block w-full h-full object-cover" />
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Real problem:</span>
                <p class="${TEXT_FULL}">
                  Продукт накопил UX-долг и архитектурную хрупкость: перегруженная навигация, разрозненные сущности, скрытые действия и ошибки в торговом сценарии.
                </p>
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
            <div class="${ROW} w-full">
              <span class="${LABEL}">Decision space</span>
              <div class="shrink-0 w-[570px] flex flex-col items-center">
                <p class="${TEXT}">
                  У меня было три дня, чтобы построить диапазон решений, которые можно защитить и реально собрать в этих условиях.
                </p>
              </div>
            </div>
            <div class="flex items-center justify-center px-[192px] py-[32px] w-full overflow-hidden">
              <img src="/assets/cases/emergency-redesign/process-img.png" alt="Decision space" class="w-[1039px] h-[600px] object-cover block" />
            </div>
          </div>
          <div class="flex flex-col gap-[64px] items-start w-full">
            <div class="flex items-center pr-[154px] w-full">
              <p class="w-[411px] ${TEXT_FULL} tracking-[0.16px] [font-family:var(--font-case)]">
                <span class="font-medium">И в итоге на защиту и обсуждение было вынесено </span><span class="font-bold">три опции:</span>
              </p>
            </div>
            <div class="flex flex-col gap-[32px] items-start w-full">
              <div class="flex gap-[32px] items-start w-full">
                <div class="flex-1 min-w-0 flex flex-col gap-[16px] items-center">
                  <div class="flex flex-col gap-[12px] items-center h-[85px] text-center w-full">
                    <span class="${SMALL_LABEL} text-center w-full">1/ Minimal masking</span>
                    <p class="${TEXT_FULL} text-center w-full">Косметический редизайн + точечные фиксы: быстро, но почти не меняет систему.</p>
                  </div>
                  <p class="text-[18px] leading-[21px] font-medium tracking-[0.18px] text-[rgba(179,189,210,0.6)] text-center [font-family:var(--font-case)]">Fastest / lowest value</p>
                  <div class="w-[208px] h-[450px] rounded-[24px] overflow-hidden"></div>
                </div>
                <div class="flex-1 min-w-0 flex flex-col gap-[16px] items-center">
                  <div class="flex flex-col gap-[12px] items-center h-[85px] text-center w-full">
                    <span class="${SMALL_LABEL} text-center w-full">2/ Full trade-first redesign</span>
                    <p class="${TEXT_FULL} text-center w-full">Полный пересбор торгового сценария: Сильно для будущего, но рискованно для текущего релиза.</p>
                  </div>
                  <p class="text-[18px] leading-[21px] font-medium tracking-[0.18px] text-[rgba(179,189,210,0.6)] text-center [font-family:var(--font-case)]">Highest value / too risky now</p>
                  <div class="w-[204px] h-[439px] rounded-[24px] overflow-hidden"></div>
                </div>
                <div class="flex-1 min-w-0 flex flex-col gap-[16px] items-center">
                  <div class="flex flex-col gap-[12px] items-center h-[85px] text-center w-full">
                    <span class="${SMALL_LABEL} text-center w-full">3/ Structural adjustment — selected</span>
                    <p class="${TEXT_FULL} text-center w-full">Обединение Счетов + Позиций → в единый раздел. Плюс точечное закрытие UX-долга.</p>
                  </div>
                  <p class="text-[18px] leading-[21px] font-medium tracking-[0.18px] text-[rgba(179,189,210,0.6)] text-center [font-family:var(--font-case)]">Balanced value / shippable</p>
                  <div class="w-[203px] h-[439px] rounded-[24px] overflow-hidden"></div>
                </div>
              </div>
              <div class="flex items-center justify-center px-[24px] w-full">
                <span class="${CAPTION}">Первичные прототипы для защиты каждой из идей</span>
              </div>
              <div class="flex items-center py-[16px] w-full">
                <p class="w-[411px] ${QUOTE}">
                  Я выбирала не между хорошим и плохим, а между слишком слабым и слишком дорогим.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- F. Three product bets -->
        <div class="${ROW} w-full">
          <span class="${LABEL_TIGHT}">Three product bets</span>
          <div class="shrink-0 w-[570px] flex flex-col gap-[56px]">

            <!-- Bet 1 -->
            <div class="flex flex-col gap-[32px]">
              <div class="flex flex-col gap-[32px]">
                <div class="flex flex-col gap-[8px]">
                  <p class="${BET_TITLE}">1/ Капитал как единая система</p>
                  <p class="${TEXT_FULL}">Funds и Positions были разорваны, хотя пользователь мыслит их как один контур: "где мои деньги и что с ними происходит".</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Decision:</span>
                  <p class="${TEXT_FULL}">Объединить Funds + Positions в Account / Capital layer.</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Impact:</span>
                  <p class="${TEXT_FULL}">Меньше разрывов в модели капитала + место для будущей архитектуры.</p>
                </div>
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
                  <p class="${TEXT_FULL}">Trade flow страдал от конфликтующих tap-зон, скрытых категорий и слабой иерархии.</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Decision:</span>
                  <ul class="pl-[27px] ${TEXT_FULL} list-disc">
                    <li>Переработаны карточки инструментов</li>
                    <li>Убраны конфликтующие tap-зоны</li>
                    <li>Категории вынесены в явный паттерн (чипы / табы)</li>
                    <li>Переработан Виджет Денег</li>
                    <li>Затронуто взаимодействие с мини-графиком</li>
                  </ul>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Impact:</span>
                  <p class="${TEXT_FULL}">Я не переизобрела торговлю, а убрала точки путаницы</p>
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
                  <p class="${TEXT_FULL}">UI должен был быстро создать ощущение нового продукта, но не мог стать главным фокусом.</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Decision:</span>
                  <p class="${TEXT_FULL}">Минимально достаточная visual system, поддерживающая новую структуру.</p>
                </div>
                <div class="flex flex-col gap-[8px]">
                  <span class="${SMALL_LABEL}">Impact:</span>
                  <p class="${TEXT_FULL}">Сначала система, потом полировка.</p>
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

        <!-- G. Execution note -->
        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW} w-full font-bold italic [font-family:var(--font-case)]">
            <span class="${LABEL_TIGHT}">Execution note</span>
            <div class="shrink-0 w-[570px] ${QUOTE}">
              <p class="leading-[21px]">Дизайн и разработка шли параллельно: решения уходили в разработку частями, архитектура уточнялась по ходу, а перед релизом мы быстро проверили и поправили ключевые паттерны.</p>
              <p class="leading-[21px] mt-[4px]">Моя задача была не просто придумать направление, а удержать продукт целым, пока он собирался по частям.</p>
            </div>
          </div>
          <div class="w-[1172px] h-[387px] overflow-hidden">
            <img src="/assets/cases/emergency-redesign/execution-note-img.png" alt="Execution" class="w-[1172px] h-[387px] object-contain block" />
          </div>
        </div>

        <!-- H. Outcome -->
        <div class="${ROW} w-full">
          <span class="${LABEL_TIGHT}">Outcome</span>
          <div class="shrink-0 w-[570px] flex flex-col gap-[32px]">
            <div class="flex flex-col gap-[8px]">
              <span class="${SMALL_LABEL}">Бизнес</span>
              <p class="${TEXT_FULL}">iOS-канал сохранён, приложение выпущено в срок, пользователи не потеряли доступ к продукту.</p>
            </div>
            <div class="flex flex-col gap-[8px]">
              <span class="${SMALL_LABEL}">Продукт</span>
              <p class="${TEXT_FULL}">Архитектура стала более управляемой: навигация, видимость капитала и торговые взаимодействия получили более ясную модель.</p>
            </div>
            <div class="flex flex-col gap-[8px]">
              <span class="${SMALL_LABEL}">Система</span>
              <p class="${TEXT_FULL}">Появилась база под future-концепт и дальнейшее развитие продукта.</p>
            </div>
          </div>
        </div>

        <!-- I. Outcome image -->
        <div class="w-full aspect-[3454/1964] rounded-[24px] overflow-hidden">
          <img src="/assets/cases/emergency-redesign/outcome-final.png" alt="Final outcome" class="w-full h-full object-cover block rounded-[24px]" />
        </div>

      </div><!-- end #longreadSections -->
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

  if (viewState === "hover-emergency") {
    return;
  }

  if (viewState === "closing") {
    return;
  }

  const currentCase = cases.find((c) => c.id === (activeCaseId ?? hoveredCaseId));

  if (!currentCase || currentCase.id !== EMERGENCY_CASE_ID) {
    return;
  }

  if (renderedCaseId !== currentCase.id) {
    casePreviewInner.innerHTML = generateEmergencyLongread();
    renderedCaseId = currentCase.id;
    zoneCasePreview?.scrollTo({ top: 0, behavior: "auto" });
  }
}

function applyHoverLayerState() {
  const hoverBgLayer = document.querySelector("#hoverBgLayer");
  const isHover = viewState === "hover-emergency";

  if (hoverBgLayer instanceof HTMLElement) {
    hoverBgLayer.style.opacity = isHover ? "1" : "0";
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

  if (viewState === "hover-emergency") {
    zoneCasePreview.className = `${base} left-[1241px] top-0 h-[1080px] w-[679px] overflow-hidden opacity-100`;
    return;
  }

  if (viewState === "opening-emergency") {
    zoneCasePreview.className = `${base} left-[749px] top-0 h-[1080px] w-[1171px] overflow-hidden opacity-100`;
    return;
  }

  if (viewState === "case-open-emergency") {
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
    viewState === "opening-emergency";

  closeCaseButton.className = isVisible
    ? "absolute left-[1809px] top-[36px] z-[60] flex items-center justify-center border-0 bg-[rgba(179,189,210,0.1)] px-[16px] py-[4px] text-[18px] leading-[20px] font-normal italic tracking-[-0.18px] text-[#b3bdd2] opacity-100 pointer-events-auto cursor-pointer transition-opacity duration-[400ms] ease-out [font-family:var(--font-case)]"
    : "absolute left-[1809px] top-[36px] z-[60] flex items-center justify-center border-0 bg-[rgba(179,189,210,0.1)] px-[16px] py-[4px] text-[18px] leading-[20px] font-normal italic tracking-[-0.18px] text-[#b3bdd2] opacity-0 pointer-events-none transition-opacity duration-[400ms] ease-out [font-family:var(--font-case)]";
}

function applyCaseItemState() {
  const activeId =
    viewState === "hover-emergency" ||
    viewState === "opening-emergency" ||
    viewState === "case-open-emergency"
      ? EMERGENCY_CASE_ID
      : null;
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
    viewState !== "opening-emergency"
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

function attachCaseEvents() {
  const caseButtons = document.querySelectorAll("[data-case-id]");

  caseButtons.forEach((caseButton) => {
    const caseId = caseButton.dataset.caseId;

    caseButton.addEventListener("mouseenter", () => {
      if (
        caseId !== EMERGENCY_CASE_ID ||
        viewState === "closing" ||
        viewState === "opening-emergency"
      ) {
        return;
      }

      hoveredCaseId = caseId;

      if (activeCaseId === null) {
        viewState = "hover-emergency";
      }

      renderAboutState();
    });

    caseButton.addEventListener("focus", () => {
      if (
        caseId !== EMERGENCY_CASE_ID ||
        viewState === "closing" ||
        viewState === "opening-emergency"
      ) {
        return;
      }

      hoveredCaseId = caseId;

      if (activeCaseId === null) {
        viewState = "hover-emergency";
      }

      renderAboutState();
    });

    caseButton.addEventListener("click", () => {
      if (
        caseId !== EMERGENCY_CASE_ID ||
        viewState === "closing" ||
        viewState === "opening-emergency"
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
      viewState = "opening-emergency";

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

        if (viewState !== "opening-emergency") {
          return;
        }

        viewState = "case-open-emergency";

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
      viewState === "opening-emergency"
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
