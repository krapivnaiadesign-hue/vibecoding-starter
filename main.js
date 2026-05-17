import "./style.css";

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;
const INTRO_MOTION_DURATION_MS = 950;
const INTRO_MOTION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const EMERGENCY_CASE_ID = "emergency-redesign";
const SLTP_CASE_ID = "stop-loss-take-profit";
const KELPIE_CASE_ID = "ai-platform-launch";

const aboutPage = document.querySelector("#aboutPage");
const aboutStage = document.querySelector("#aboutStage");
const zoneIntro = document.querySelector("#zoneIntro");
const introIcon = document.querySelector("#introIcon");
const introMeta = document.querySelector("#introMeta");
const introStatement = document.querySelector("#introStatement");
const introMenu = document.querySelector("#introMenu");
const introPortrait = document.querySelector("#introPortrait");
const introContacts = document.querySelector("#introContacts");
const introWorkGroup = document.querySelector("#introWorkGroup");
const selectedWorkLabel = document.querySelector("#selectedWorkLabel");
const selectedWorkList = document.querySelector("#selectedWorkList");
const zoneCasePreview = document.querySelector("#zoneCasePreview");
const casePreviewInner = document.querySelector("#casePreviewInner");
const closeCaseButton = document.querySelector("#closeCaseButton");
const imageLightbox = document.querySelector("#imageLightbox");
const imageLightboxImg = document.querySelector("#imageLightboxImg");
const imageLightboxClose = document.querySelector("#imageLightboxClose");

const LIGHTBOX_EXCLUDED_ANCESTOR_IDS = new Set([
  "hoverBgLayer",
  "hoverBgLayerSltp",
  "hoverBgLayerKelpie",
]);

let imageLightboxOpen = false;

const CASE_INSET_PX = 46;

const cases = [
  {
    id: "emergency-redesign",
    companyId: "fbs",
    company: "FBS — FinTech / Trading",
    role: "Senior Product Designer (Октябрь 2024 - Февраль 2026)",
    title: "EMERGENCY REDESIGN",
    description: "Возглавила экстренный редизайн и архитектурный перезапуск iOS-приложения",
    previewType: "iphone",
    previewAsset: "/assets/cases/emergency-redesign/preview.png",
  },
  {
    id: "stop-loss-take-profit",
    companyId: "fbs",
    company: "FBS — FinTech / Trading",
    role: "Senior Product Designer (Октябрь 2024 - Февраль 2026)",
    title: "STOP LOSS / TAKE PROFIT",
    description: "Кейс о том, как я перевела график из пассивного отображения риска в место, где риском можно управлять.",
    previewType: "iphone",
    previewAsset: "/assets/cases/fbs/iphone-preview.png",
  },
  {
    id: "ai-platform-launch",
    companyId: "kelpie",
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
    const existingGroup = map.get(currentCase.companyId);

    if (existingGroup) {
      existingGroup.items.push(currentCase);
      return map;
    }

    map.set(currentCase.companyId, {
      companyId: currentCase.companyId,
      company: currentCase.company,
      role: currentCase.role,
      items: [currentCase],
    });

    return map;
  }, new Map()).values(),
);

function getCaseById(caseId) {
  return cases.find((currentCase) => currentCase.id === caseId);
}

function hasActiveCase() {
  return Boolean(activeCaseId);
}

function hasHoveredCase() {
  return Boolean(hoveredCaseId) && !hasActiveCase();
}

function getFocusCaseId() {
  if (viewState === "closing") {
    return null;
  }

  if (isCaseActiveMode() && activeCaseId) {
    return activeCaseId;
  }

  if (hoveredCaseId) {
    return hoveredCaseId;
  }

  return null;
}

function isActiveCase(caseId) {
  return isCaseActiveMode() && activeCaseId === caseId;
}

function isCaseInActiveCompany(caseId) {
  const focusCaseId = getFocusCaseId();

  if (!focusCaseId) {
    return true;
  }

  const focusCase = getCaseById(focusCaseId);
  const currentCase = getCaseById(caseId);

  if (!focusCase || !currentCase) {
    return true;
  }

  return focusCase.companyId === currentCase.companyId;
}

function getCaseOpacity(caseId) {
  if (isCaseActiveMode()) {
    return caseId === activeCaseId ? 1 : 0.5;
  }

  const focusCaseId = getFocusCaseId();

  if (!focusCaseId) {
    return 1;
  }

  return caseId === focusCaseId ? 1 : 0.5;
}

function getCompanyOpacity(companyId) {
  if (isCaseActiveMode()) {
    const focusCase = getCaseById(activeCaseId);

    if (!focusCase) {
      return 1;
    }

    return focusCase.companyId === companyId ? 1 : 0.5;
  }

  const focusCaseId = getFocusCaseId();

  if (!focusCaseId) {
    return 1;
  }

  const focusCase = getCaseById(focusCaseId);

  if (!focusCase) {
    return 1;
  }

  return focusCase.companyId === companyId ? 1 : 0.5;
}

function getCaseTranslateX(caseId) {
  if (!isCaseActiveMode()) {
    return 0;
  }

  return caseId === activeCaseId ? 0 : -CASE_INSET_PX;
}

function getCaseOffset(caseId) {
  return getCaseTranslateX(caseId);
}

function isCaseActiveMode() {
  return Boolean(activeCaseId) && viewState !== "closing";
}

function getPreviewMode() {
  if (viewState === "closing") {
    return "overview";
  }

  if (
    activeCaseId ||
    viewState.startsWith("opening-") ||
    viewState.startsWith("case-open-")
  ) {
    return "open";
  }

  if (
    viewState === "hover-emergency" ||
    viewState === "hover-sltp" ||
    viewState === "hover-kelpie"
  ) {
    return "hover";
  }

  return "overview";
}

function syncPortfolioAttributes() {
  if (!aboutPage) {
    return;
  }

  aboutPage.dataset.state = viewState;
  aboutPage.dataset.activeCase = activeCaseId ?? "";
  aboutPage.dataset.hoveredCase = hoveredCaseId ?? "";
  aboutPage.dataset.caseActive = isCaseActiveMode() ? "true" : "false";
  aboutPage.dataset.preview = getPreviewMode();
}

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

function renderSelectedWorkList() {
  if (!selectedWorkList) {
    return;
  }

  selectedWorkList.innerHTML = groupedCases
    .map(
      (group) => `
        <section class="flex w-full flex-col gap-[36px]" data-company-id="${group.companyId}">
          <div data-company-heading class="intro-case-motion flex w-full flex-col gap-[12px] text-[rgba(179,189,210,0.72)] [font-family:var(--font-intro)]">
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
                    class="intro-case-motion group/case flex w-full cursor-pointer appearance-none flex-col gap-[12px] border-0 bg-transparent pl-[46px] text-left [font-family:var(--font-intro)]"
                  >
                    <div class="flex w-full items-start gap-[9px]">
                      <span
                        data-case-title
                        class="min-w-0 flex-1 text-[15px] leading-[18px] font-bold italic text-[rgba(179,189,210,0.72)] uppercase"
                      >
                        ${currentCase.title}
                      </span>
                      <span
                        data-case-plus
                        class="text-[18px] leading-[18px] font-normal text-[rgba(179,189,210,0.72)]"
                      >
                        +
                      </span>
                    </div>
                    <p
                      data-case-description
                      class="m-0 text-[14px] leading-[17px] font-normal text-[rgba(179,189,210,0.55)]"
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

function initializeAnimatedElements() {
  // Motion is driven by CSS (.intro-motion / .intro-case-motion + data-* on #aboutPage).
}

function isZoomableImage(img) {
  if (!(img instanceof HTMLImageElement) || !img.src) {
    return false;
  }

  const src = img.currentSrc || img.src;
  if (/\.svg(\?|#|$)/i.test(src)) {
    return false;
  }

  if (img.id === "introIcon" || img.id === "imageLightboxImg") {
    return false;
  }

  if (img.closest("[data-no-image-lightbox]") || img.hasAttribute("data-no-image-lightbox")) {
    return false;
  }

  if (getComputedStyle(img).pointerEvents === "none") {
    return false;
  }

  let node = img.parentElement;
  while (node) {
    if (node.id && LIGHTBOX_EXCLUDED_ANCESTOR_IDS.has(node.id)) {
      return false;
    }

    if (node === imageLightbox) {
      return false;
    }

    node = node.parentElement;
  }

  return true;
}

function openImageLightbox(img) {
  if (!imageLightbox || !imageLightboxImg) {
    return;
  }

  imageLightboxImg.src = img.currentSrc || img.src;
  imageLightboxImg.alt = img.alt || "";
  imageLightbox.classList.remove("opacity-0", "pointer-events-none");
  imageLightbox.classList.add("opacity-100", "pointer-events-auto");
  imageLightbox.setAttribute("aria-hidden", "false");
  imageLightboxOpen = true;
}

function closeImageLightbox() {
  if (!imageLightboxOpen || !imageLightbox || !imageLightboxImg) {
    return;
  }

  imageLightbox.classList.add("opacity-0", "pointer-events-none");
  imageLightbox.classList.remove("opacity-100", "pointer-events-auto");
  imageLightbox.setAttribute("aria-hidden", "true");
  imageLightboxImg.removeAttribute("src");
  imageLightboxImg.alt = "";
  imageLightboxOpen = false;
}

function handleImageLightboxClick(event) {
  const img = event.target.closest("img");
  if (!img || !isZoomableImage(img)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  openImageLightbox(img);
}

function initImageLightbox() {
  if (!imageLightbox || !imageLightboxImg) {
    return;
  }

  document.addEventListener("click", handleImageLightboxClick, true);

  document.addEventListener(
    "mouseover",
    (event) => {
      const img = event.target.closest("img");
      if (img && isZoomableImage(img)) {
        img.style.cursor = "zoom-in";
      }
    },
    true,
  );

  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox || event.target === imageLightboxClose) {
      closeImageLightbox();
    }
  });

  imageLightboxClose?.addEventListener("click", (event) => {
    event.stopPropagation();
    closeImageLightbox();
  });
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
            src="/assets/cases/emergency-redesign/future_img.png"
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
              <img src="/assets/cases/emergency-redesign/Risk_img.png" alt="Старый интерфейс" class="w-full h-full object-contain block" />
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
                <p class="${TEXT}">Слегка изменить вход в продукт, онбординг и стартовые экраны, а торговую логику временно скрыть через feature toggle. → помимо прочего это решение не одобряли юристы компании из-за рисков распознования и повторной блокировки</p>
              </div>
              <div class="w-[41px] h-[48px]">
                <img src="/assets/cases/emergency-redesign/arrow.svg" alt="" class="block w-full h-full" />
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Reframing:</span>
                <p class="${TEXT}">На этом этапе настояла, что если продукт всё равно приходится пересобирать, нужно использовать этот момент не как временный обход и наделать костылей, а как возможность усилить систему и подойти к этому основательно насколько позволяет время.</p>
              </div>
              <div class="w-[339px] h-[64px] rounded-[16px] overflow-hidden">
                <img src="/assets/cases/emergency-redesign/Gays_img.png" alt="" class="block w-full h-full object-cover" />
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Real problem:</span>
                <p class="${TEXT}">Продукт <span class="${EMPH}">накопил UX-долг</span> и архитектурно <span class="${EMPH}">не выдерживал масштабирование</span>: перегруженная навигация, разрозненные сущности, скрытые действия и ошибки в торговом сценарии.</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[12px] items-start py-[32px] w-full">
            <div class="flex items-center justify-center px-[24px] h-[496px] w-full overflow-hidden">
              <img src="/assets/cases/emergency-redesign/FromMaskingToRebuilding_img.png" alt="" class="w-full h-full object-contain block" />
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
            <div class="flex w-full items-center justify-center px-[192px] py-[32px]">
              <div class="relative h-[600px] w-[1039px] max-w-full shrink-0">
                <img src="/assets/cases/emergency-redesign/process_img.png" alt="Decision space" class="block size-full object-contain" />
              </div>
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
                  <div class="w-[312px] h-[675px] shrink-0 overflow-hidden rounded-[24px]">
                    <video src="/assets/cases/emergency-redesign/Minimal-Masking.mov" autoplay loop muted playsinline class="size-full object-cover block"></video>
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
                  <div class="w-[312px] h-[675px] shrink-0 overflow-hidden rounded-[24px]">
                    <video src="/assets/cases/emergency-redesign/Full-redesign.mov" autoplay loop muted playsinline class="size-full object-cover block"></video>
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
                  <div class="w-[312px] h-[675px] shrink-0 overflow-hidden rounded-[24px]">
                    <video src="/assets/cases/emergency-redesign/Structural-adjustment.mov" autoplay loop muted playsinline class="size-full object-cover block"></video>
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
            <div class="relative h-[450px] w-[786px] shrink-0 overflow-hidden">
              <img src="/assets/cases/emergency-redesign/presentation_img.png" alt="" class="block size-full object-contain" />
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
              <div class="w-full overflow-hidden">
                <img src="/assets/cases/emergency-redesign/FundsPosition_img.png" alt="Capital system" class="block w-full h-auto object-contain" />
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
                <img src="/assets/cases/emergency-redesign/SimpleTrade_img.png" alt="Simple trade" class="w-full h-full object-cover block" />
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
              <div class="w-full overflow-hidden">
                <img src="/assets/cases/emergency-redesign/visual_img.png" alt="" class="block w-full h-auto object-contain" />
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
            <img src="/assets/cases/emergency-redesign/ExecutionNote_img.png" alt="Execution" class="w-[1172px] h-[387px] object-contain block" />
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
              <div class="w-full aspect-[425/97] overflow-hidden">
                <img src="/assets/cases/emergency-redesign/business_img.png" alt="" class="block size-full object-cover object-left" />
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Продукт</span>
                <p class="${TEXT}"><span class="${EMPH}">Архитектура стала более управляемой:</span> навигация, видимость капитала и торговые взаимодействия получили более ясную модель.</p>
              </div>
              <div class="flex flex-col gap-[8px]">
                <span class="${SMALL_LABEL}">Система</span>
                <p class="${TEXT}">Появилась <span class="${EMPH}">база под future-концепт</span> и дальнейшее развитие продукта.</p>
              </div>
              <div class="h-[97px] w-[588px] max-w-full overflow-hidden">
                <img src="/assets/cases/emergency-redesign/system_img.png" alt="" class="block size-full object-cover object-left" />
              </div>
            </div>
          </div>
          <div class="flex w-full pl-[322px] pr-[154px] box-border">
            <div class="flex flex-col gap-[8px] w-full max-w-[600px]">
              <span class="${SMALL_LABEL}">P.S.</span>
              <div class="${TEXT}">
                <p class="mb-0">На этом эта история, конечно, не закончилась.</p>
                <p class="mb-0">Немного порадовалась и дальше предстояла работа:</p>
                <p class="mb-0">&nbsp;</p>
                <ul class="pl-[27px] list-disc">
                  <li class="mb-0">По <span class="${EMPH}">быстрым доработкам</span> перед запуском уже на пользователей на основе коридорок и обратной связи от команд</li>
                  <li class="mb-0"><span class="${EMPH}">Доставка концепции и правил работы</span> с новым интерфейсом <span class="${EMPH}">на других дизайнеров;</span></li>
                  <li class="mb-0">В перерывах, моления на то, чтобы все таки не раскрыли и не заблочили</li>
                  <li class="mb-0">Закрывание косяков, которые в спешке конечно же были допущены</li>
                  <li class="mb-0"><span class="${EMPH}">Доработка Future-концепции, подготовка к уже основательным UX исследованиям</span></li>
                  <li>Подтягивание старой андроид версии до новой ios</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="h-[607px] w-[1068px] max-w-full shrink-0 overflow-hidden rounded-[24px]">
            <img src="/assets/cases/emergency-redesign/outcome_img.png" alt="Slack review и Figma workspace" class="block size-full object-cover rounded-[24px]" />
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
                <a href="https://www.figma.com/design/gzd7rk7vdzarXyDEUDzVGf/SL_TP?node-id=40000053-132980" target="_blank" rel="noopener noreferrer" class="underline">Figma с ресерчем</a>
              </div>
              <div class="h-[28px] w-[23px]">
                <img src="/assets/cases/emergency-redesign/arrow.svg" alt="" class="block h-full w-full" />
              </div>
              <div class="flex flex-col gap-[16px]">
                <p class="${EMPH}">Задача была разобраться</p>
                <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                  <li>что это за механика</li>
                  <li><span class="${EMPH}">как SL/TP устроен</span> у конкурентов, <span class="${EMPH}">какие паттерны реально улучшают работу</span>,</li>
                  <li><span class="${EMPH}">где текущая фича</span> в продукте уже<span class="${EMPH}"> слабая</span>,</li>
                  <li><span class="${EMPH}">какие расширения</span> вообще бывают у этой механики.</li>
                  <li><span class="${EMPH}">проверила конкурентные сценарии руками</span>, чтобы оценить не только паттерны, но и <span class="${EMPH}">понять ощущения: скорость, точность, риск ошибки, поведение при нескольких уровнях</span>.</li>
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
            </div>
            <div class="w-[399px] h-[802px] overflow-hidden rounded-[24px] bg-black">
              <video src="/assets/cases/sltp/FinalDesision_Vid.mov" autoplay loop muted playsinline class="w-full h-full object-cover block"></video>
            </div>
            <div class="${BODY} gap-[8px]">
              <span class="${SMALL_LABEL}">Логика разделения:</span>
              <div class="${TEXT}">
                <p class="mb-[8px]"><span class="${EMPH}">Редактирование и удаление конкретного SL/TP</span> — через линии на графике.</p>
                <p class="mb-[8px]"><span class="${EMPH}">Добавление SL/TP</span> на позицию и закрытие позиции — в панели управления.</p>
                <p><span class="${EMPH}">Точные настройки</span> — через шторку.</p>
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
  const LABEL = "shrink-0 w-[150px] text-[16px] leading-[20px] font-bold italic tracking-[0.48px] uppercase text-[#8d97ab] [font-family:var(--font-case)]";
  const BODY = "shrink-0 w-[600px] max-w-[600px] flex flex-col";
  const ROW = "flex items-start gap-[120px] pl-[56px] pr-[154px] box-border w-full";
  const BODY_INSET = "flex pl-[326px] pr-[154px] box-border w-full";
  const HEADLINE = "text-[24px] leading-[28px] font-bold italic tracking-[0.24px] text-[#b3bdd2] [font-family:var(--font-case)]";
  const TEXT = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[rgba(141,151,171,0.8)] [font-family:var(--font-case)]";
  const EMPH = "font-bold italic text-[#b3bdd2] [font-family:var(--font-case)]";
  const DETAIL_LABEL = "text-[16px] leading-[20px] tracking-[0.16px] font-bold text-[#8d97ab] [font-family:var(--font-case)]";
  const DETAIL_VALUE = "text-[16px] leading-[20px] tracking-[0.16px] italic text-[#8d97ab] [font-family:var(--font-case)]";
  const BET_TITLE = "text-[18px] leading-[21px] font-bold italic tracking-[0px] text-[#8d97ab] [font-family:var(--font-case)]";
  const LIST_MUTED = "text-[18px] leading-[22px] font-normal tracking-[0px] text-[rgba(141,151,171,0.6)] [font-family:var(--font-case)]";
  const CAPTION = "font-normal italic text-[14px] leading-[15px] tracking-[0.14px] text-[#8d97ab] [font-family:var(--font-case)]";
  const SUBLABEL = "text-[18px] leading-[22px] font-bold italic tracking-[0px] text-[#b3bdd2] [font-family:var(--font-case)]";

  return `
    <div class="kelpieLongread flex flex-col gap-[24px] w-[1172px] overflow-x-visible overflow-y-visible">

      <div id="longreadHero" class="relative w-[1172px] h-[700px] shrink-0 overflow-hidden">
        <img
          src="/assets/cases/kelpie/preview/kelpie-hero.png"
          alt="Kelpie AI Platform"
          class="block h-full w-full object-contain bg-black"
        />
      </div>

      <div class="flex flex-col gap-[120px] items-center w-[1172px] pb-[120px]">

        <!-- Context -->
        <div class="${ROW}">
          <span class="${LABEL}">Context</span>
          <div class="${BODY} gap-[28px]">
            <div class="${HEADLINE} w-full max-w-[600px]">
              <p class="mb-0">Как за 4 недели превратить хаотичный набор сложного функционала в понятную, масштабируемую AI-платформу, готовую к запуску на пользователей.</p>
              <p class="mb-0">&nbsp;</p>
              <p>+ получить оффер на роль Product Owner / Design Lead.</p>
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

        <!-- Problem -->
        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Problem</span>
            <div class="${BODY}">
              <p class="${TEXT}">
                <span>Клиент пришёл с запросом на быстрый UX/UI-polish перед запуском.<br/>Еще до входа стало понятно: </span>
                <span class="${EMPH}">проблема была не в визуале.</span>
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-[12px] items-start w-full">
            <div class="flex items-center justify-center w-full h-[530px] overflow-hidden rounded-[24px] bg-black">
              <img src="/assets/cases/kelpie/longread/staging_img.png" alt="" class="w-full h-full object-contain block" />
            </div>
            <p class="${CAPTION} w-full text-center">состояние продукта, которое было на моменте моего подключения к работе</p>
          </div>
          <div class="${BODY_INSET}">
            <div class="${BODY} gap-[16px]">
              <p class="${LIST_MUTED}">
                <span class="font-normal">В системе уже были наброски </span>AI-assistant, agents, workflows, chats, files, совместный редактор документов, events и admin-зоны, но <span class="${EMPH}">ни один из разделов не был логически проработан и между ними не было ясной навигационной модели</span>:
              </p>
              <p class="${LIST_MUTED}">Фигмы не было, все собиралось сразу в код.</p>
              <p class="${TEXT}">Продукт <span class="${EMPH}">не читался как единая рабочая среда</span>.</p>
              <div class="${LIST_MUTED}">
                <p class="mb-0 ${EMPH}">Было не понятно:</p>
                <ul class="pl-[27px] list-disc mt-[8px]">
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

        <!-- Deep dive -->
        <div class="flex flex-col items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Deep dive</span>
            <div class="${BODY} gap-[32px]">
              <p class="${TEXT}">Быстро стало ясно: если сразу идти в UI, мы просто красиво оформим хаос. Поэтому несмотря на острую нехватку времени настояла на моем глубокогом погружении в текущую систему и продукт.</p>
              <div class="${TEXT}">
                <p class="mb-0">Несколько дней я <span class="${EMPH}">параллельно разбирала GitHub, staging, текущие фичи, backend-ограничения и AI-assisted разбор кода.</span></p>
                <p class="mb-0">&nbsp;</p>
                <p class="mb-0"><span class="${EMPH}">Декомпозировала платформу на ключевые сущности</span> — AI Assistant, agents, workflows, events, workspace, chats, Beach, Files, artifacts, settings — и <span class="${EMPH}">собирала сырые карты в Figma, чтобы увидеть связи между разделами, сценариями и состояниями</span>.</p>
                <p class="mb-0">&nbsp;</p>
                <p>На непотнятных участках <span class="${EMPH}">собирала HTML прототипы</span> через нейронку, чтобы хоть как-то <span class="${EMPH}">разобрать заложенную логику</span>.</p>
              </div>
              <div class="flex justify-center w-full">
                <img src="/assets/cases/kelpie/longread/giphy.gif" alt="" class="size-[279px] object-cover" />
              </div>
              <p class="${EMPH}">Это было погружение в работающий хаос и только после этого стало возможно проектировать интерфейс не как набор экранов, а как рабочую архитектуру продукта.</p>
            </div>
          </div>
          <div class="flex flex-col gap-[12px] items-start py-[24px] w-full">
            <div class="flex items-center justify-center w-full">
              <img src="/assets/cases/kelpie/longread/deepdive_img.png" alt="" class="w-[1119px] max-w-full h-auto rounded-[16px] object-contain block bg-black" />
            </div>
            <p class="${CAPTION} w-full text-center">Кусочки ресерча</p>
          </div>
        </div>

        <!-- After research -->
        <div class="${ROW}">
          <span class="${LABEL}">REFRAMING THE TASK</span>
          <div class="${BODY} gap-[16px]">
            <div class="${TEXT}">
              <p class="mb-0"><span class="${EMPH}">Было:</span> “Быстро отполировать экраны перед запуском.”</p>
              <p><span class="${EMPH}">Стало:</span> “Собрать рабочую модель AI-офиса — и сделать так, чтобы интерфейс её выражал.”</p>
            </div>
            <div class="${LIST_MUTED}">
              <p class="mb-0">Перед визуальным слоем я разложила продукт на ключевые сущности: <span class="font-bold text-[#b3bdd2]">AI Assistant · Agents · Workflows · Events · Workspace · Chats · Beach / Files · Artifacts · Admin settings</span></p>
              <p class="mb-0">&nbsp;</p>
              <p>Дальше я <span class="${EMPH}">проверяла не отдельные экраны, а связи между ними</span>:<br/>как пользователь переходит от запроса к AI → к запуску workflow → к мониторингу → к результату → к совместной работе.</p>
            </div>
          </div>
        </div>

        <!-- Scope/delivery -->
        <div class="flex flex-col gap-[32px] items-start w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Scope/delivery</span>
            <div class="${BODY} gap-[40px]">
              <p class="${TEXT}"><span class="${EMPH}">Объём MVP оказался ближе к зрелому продукту, чем к быстрому launch package:</span> почти каждый модуль требовал архитектурного решения, состояний и детализации.</p>
              <p class="${TEXT}">Был необходим второй дизайнер для делегирования вторичных сценариев.</p>
              <p class="${LIST_MUTED}">
                <span class="font-bold text-[#b3bdd2]">Мой фокус: </span>
                <span class="font-normal text-[rgba(141,151,171,0.8)]">core architecture, роли модулей, ключевые сценарии и продуктовая модель.</span><br/>
                <span class="font-bold text-[#b3bdd2]">Фокус второго дизайнера: </span>
                <span class="font-normal text-[rgba(141,151,171,0.8)]">вторичные экраны, состояния, UI-polish, детализация компонентов и поддержка фреймов.</span>
              </p>
            </div>
          </div>
          <div class="w-full overflow-hidden">
            <img src="/assets/cases/kelpie/longread/workflow_img.png" alt="" class="w-[1185px] max-w-full h-auto object-contain block bg-black" />
          </div>
        </div>

        <!-- 3 KEY DECISIONS -->
        <div class="${ROW} items-start">
          <span class="${LABEL}">3 KEY DECISIONS</span>
          <div class="flex flex-col gap-[120px] flex-1 min-w-0 max-w-[846px]">

            <div class="flex flex-col gap-[32px] w-full">
              <div class="${BODY} gap-[24px]">
                <p class="${BET_TITLE}">1/ Cжала платформу до 4 рабочих слоёв</p>
                <p class="${TEXT}">Вместо длинного списка разделов я собрала Kelpie как AI-офис с четырьмя понятными слоями:</p>
                <ol class="pl-[27px] list-decimal ${LIST_MUTED}">
                  <li class="mb-[8px]"><span class="font-bold text-[#b3bdd2]">Workflow Library</span><br/>Что система и AI-агенты умеют делать.</li>
                  <li class="mb-[8px]"><span class="font-bold text-[#b3bdd2]">Command Centre</span><br/>Что происходит сейчас: запущенные процессы, события, approvals, ошибки и действия.</li>
                  <li class="mb-[8px]"><span class="font-bold text-[#b3bdd2]">Beach / Files</span><br/>Где живут документы, материалы, артефакты и результаты.</li>
                  <li><span class="font-bold text-[#b3bdd2]">Chats / Collaboration</span><br/>Где люди и AI взаимодействуют вокруг работы.</li>
                </ol>
              </div>
              <div class="w-full max-w-[926px] overflow-hidden rounded-[14px]">
                <img src="/assets/cases/kelpie/longread/layers_img.png" alt="" class="w-full h-auto object-contain block bg-black" />
              </div>
              <p class="${EMPH} w-[600px]">Это позволило не упростить продукт искусственно, а сделать его читаемым.</p>
            </div>

            <div class="flex flex-col gap-[32px] w-full">
              <div class="${BODY} gap-[24px]">
                <p class="${BET_TITLE}">2/ Ввела функциональную онтологию продукта</p>
                <p class="${TEXT}">Каждый экран я проверяла через пять режимов работы пользователя:</p>
                <p class="${LIST_MUTED}">
                  <span class="${EMPH}">Discovery</span> — найти, что умеет система.<br/>
                  <span class="${EMPH}">Run</span> — запустить или продолжить работу.<br/>
                  <span class="${EMPH}">Monitoring</span> — видеть процессы, статусы и события.<br/>
                  <span class="${EMPH}">Collaboration</span> — взаимодействовать с людьми и AI.<br/>
                  <span class="${EMPH}">Outputs</span> — находить документы, артефакты и результаты.
                </p>
              </div>
              <p class="${EMPH} w-[600px]">Пользователь сейчас ищет, запускает, наблюдает, взаимодействует или работает с результатом?</p>
              <div class="w-full max-w-[730px] overflow-hidden rounded-[16px]">
                <img src="/assets/cases/kelpie/longread/ontology_img.png" alt="" class="w-full h-auto object-contain block bg-black" />
              </div>
            </div>

            <div class="flex flex-col gap-[32px] w-full overflow-visible">
              <div class="${BODY} gap-[24px]">
                <p class="${BET_TITLE}">3/ Навигация под ограничением: Widgets / Sections</p>
                <p class="${TEXT}"><span class="${EMPH}">Строгое ограничение от заказчика: </span>ни в коем случае не делать типичный SaaS sidebar в качестве меню и навигации.</p>
                <div class="${TEXT}">
                  <p class="mb-[8px]">Из этого появилась <span class="${EMPH}">мультирежимность.</span></p>
                  <p class="mb-[8px]"><span class="${EMPH}">Разделение на режимы Widgets / Sections</span> стали способом разделить обзор и глубокую работу:</p>
                  <ul class="pl-[27px] list-disc ${LIST_MUTED}">
                    <li>Widgets показывают жизнь системы</li>
                    <li>Sections дают доступ к полноценным рабочим зонам.</li>
                  </ul>
                </div>
              </div>
              <div class="relative -ml-[326px] w-[1172px] aspect-[1408/589] shrink-0 overflow-hidden rounded-[24px] bg-black">
                <video src="/assets/cases/kelpie/longread/widjetsSections_vid.mov" autoplay loop muted playsinline class="absolute inset-0 size-full object-cover block"></video>
              </div>
              <div class="${BODY}">
                <p class="${TEXT}">В дальнейших планах было попробовать <span class="${EMPH}">спроектировать экран Widgets в качестве некого меню навигации</span>, анализа и работы с платформой - чтобы <span class="${EMPH}">из одного экрана воспроизводить всю работу по платформе.</span></p>
              </div>
            </div>

            <div class="flex flex-col gap-[32px] w-full">
              <div class="${BODY} gap-[16px]">
                <p class="${BET_TITLE}">4/ Сделала Command Centre слоем управления работой</p>
                <p class="${TEXT}">Он связал три уровня:</p>
                <ol class="pl-[27px] list-decimal ${TEXT}">
                  <li class="mb-[16px]"><span class="${EMPH}">Events Feed</span><br/>События со всей платформы: prompts, AI responses, workflow actions, approvals, failures, chats, artifacts.</li>
                  <li class="mb-[16px]"><span class="${EMPH}">Workspace</span><br/>Погружение в конкретную работу: chat, logs, details, artifacts, execution.</li>
                  <li><span class="${EMPH}">Side Panel</span><br/>Быстрый доступ к текущей активности из любой точки интерфейса.</li>
                </ol>
                <p class="${TEXT}"><span class="${EMPH}">Важные события стали actionable:</span><br/>approve, reject, retry, open workspace, view logs, show chat, download artifacts.</p>
              </div>
              <div class="relative -ml-[326px] h-[908px] w-[1269px] shrink-0 overflow-hidden rounded-[14px]">
                <img src="/assets/cases/kelpie/longread/commandcentre_img.png" alt="" class="size-full object-contain block bg-black" />
              </div>
              <p class="${EMPH} w-[600px]">Я перевела технический шум в управляемый рабочий слой, где пользователь понимает, что происходит, где нужен его вклад и куда перейти дальше.</p>
            </div>

            <div class="flex flex-col gap-[32px] w-full">
              <div class="${BODY} gap-[24px]">
                <p class="${BET_TITLE}">5/ Экран Welcome стал легким входом в сложный продукт</p>
                <p class="${TEXT}">Первый экран не должен был сразу обрушивать на пользователя всю сложность AI-платформы — <span class="${EMPH}">поэтому Welcome стал спокойным первым слоем.</span></p>
                <p class="${TEXT}">
                  <span class="font-normal text-[rgba(141,151,171,0.8)]">Cначала</span> — простой вход через assistant;<br/>
                  <span class="font-normal text-[rgba(141,151,171,0.8)]">Дальше</span> — раскрытие widgets и sections;<br/>
                  <span class="font-normal text-[rgba(141,151,171,0.8)]">Затем </span>— переход в Command Centre, Workflow Library, Beach, Chats и Files.
                </p>
                <p class="${TEXT}">Это не было “идеальным” решением.<br/>Это <span class="${EMPH}">MVP-компромисс</span> для продаж и первых пользователей: сначала снизить тревожность и когнитивную нагрузку, потом постепенно раскрывать платформу.</p>
              </div>
              <div class="relative -ml-[326px] h-[908px] w-[1269px] shrink-0 overflow-hidden rounded-[14px]">
                <img src="/assets/cases/kelpie/longread/welcome_img.png" alt="" class="size-full object-contain block bg-black" />
              </div>
            </div>

          </div>
        </div>

        <!-- Results -->
        <div class="flex flex-col gap-[32px] items-center w-full">
          <div class="${ROW}">
            <span class="${LABEL}">Results</span>
            <div class="${BODY} gap-[32px]">
              <div class="flex flex-col gap-[8px]">
                <p class="${SUBLABEL}">Задача:</p>
                <p class="${TEXT}">Подготовка <span class="${EMPH}">к запуску для 40 компаний</span> с целевым показателем 70% User Trust</p>
              </div>
              <p class="${HEADLINE}">За 4 недели хаотичный staging превращен в архитектурно устойчивую платформу</p>
              <div class="flex flex-col gap-[8px]">
                <p class="${SUBLABEL}">Scope:</p>
                <div class="${TEXT}">
                  <p class="mb-0">Реализовано и детально <span class="${EMPH}">проработано 8 ключевых модулей</span> системы (Command Centre, Library, Beach и др.).</p>
                  <p class="mb-0">+ часть вспомогательных внеплановых разделов (calendar, mail, contact)</p>
                  <p class="mb-0">&nbsp;</p>
                  <p class="${EMPH}">По итогу было заложено и проработано даже больше, чем могло реализоваться разработкой в срок запуска.</p>
                </div>
              </div>
              <div class="flex flex-col gap-[12px]">
                <p class="${SUBLABEL}">Market Validation:</p>
                <p class="${EMPH}">По итогам запуска получила оффер на роль Product Owner / Design Lead.</p>
              </div>
            </div>
          </div>
          <div class="w-[1088px] max-w-full h-[775px] shrink-0 overflow-hidden rounded-[24px] shadow-[0px_4px_27.5px_19px_rgba(0,0,0,0.25)]">
            <img src="/assets/cases/kelpie/longread/delivery_img.png" alt="" class="w-full h-full object-contain block bg-black" />
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

function applyCaseItemState() {
  const caseButtons = document.querySelectorAll("[data-case-id]");
  const companyHeadings = document.querySelectorAll("[data-company-heading]");

  companyHeadings.forEach((heading) => {
    const companySection = heading.closest("[data-company-id]");
    const companyId = companySection?.dataset.companyId;

    if (!companyId) {
      return;
    }

    heading.style.opacity = String(getCompanyOpacity(companyId));
  });

  caseButtons.forEach((caseButton) => {
    const caseId = caseButton.dataset.caseId;

    if (!caseId) {
      return;
    }

    const isActive = isActiveCase(caseId);
    const isFocused = getFocusCaseId() === caseId;
    const title = caseButton.querySelector("[data-case-title]");
    const description = caseButton.querySelector("[data-case-description]");
    const plus = caseButton.querySelector("[data-case-plus]");

    caseButton.style.opacity = String(getCaseOpacity(caseId));
    caseButton.style.transform = `translate3d(${getCaseTranslateX(caseId)}px, 0, 0)`;

    title?.classList.toggle("text-[#b3bdd2]", isFocused);
    title?.classList.toggle("text-[rgba(179,189,210,0.72)]", !isFocused);

    description?.classList.toggle("text-[rgba(179,189,210,0.8)]", isFocused);
    description?.classList.toggle("text-[rgba(179,189,210,0.55)]", !isFocused);

    plus?.classList.toggle("text-[#b3bdd2]", isFocused);
    plus?.classList.toggle("text-[rgba(179,189,210,0.72)]", !isFocused);

    if (plus) {
      plus.textContent = isActive ? "−" : "+";
    }
  });
}

function renderAboutState() {
  if (!aboutPage) {
    return;
  }

  syncPortfolioAttributes();
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
  renderAboutState();

  closeAnimationTimer = window.setTimeout(() => {
    closeAnimationTimer = null;
    activeCaseId = null;
    hoveredCaseId = null;
    viewState = "overview";
    renderAboutState();
  }, INTRO_MOTION_DURATION_MS);
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

      if (activeCaseId !== null) {
        return;
      }

      hoveredCaseId = caseId;
      viewState = hoverState;
      renderAboutState();
    });

    caseButton.addEventListener("focus", () => {
      if (
        viewState === "closing" ||
        viewState.startsWith("opening-")
      ) {
        return;
      }

      if (activeCaseId !== null) {
        return;
      }

      hoveredCaseId = caseId;
      viewState = hoverState;
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

      renderPreviewContent();

      requestAnimationFrame(() => {
        renderAboutState();
      });

      openAnimationTimer = window.setTimeout(() => {
        openAnimationTimer = null;

        if (viewState !== openingState) {
          return;
        }

        viewState = caseOpenState;
        renderAboutState();
      }, INTRO_MOTION_DURATION_MS);
    });
  });
}

introWorkGroup?.addEventListener("mouseleave", () => {
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
  if (event.key === "Escape" && imageLightboxOpen) {
    closeImageLightbox();
    return;
  }

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
initImageLightbox();
attachCaseEvents();
updateStageScale();
renderAboutState();
