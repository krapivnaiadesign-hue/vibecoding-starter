import "./style.css";

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;
const aboutPage = document.querySelector("#aboutPage");
const aboutStage = document.querySelector("#aboutStage");
const zoneIntro = document.querySelector("#zoneIntro");
const introBackgroundMask = document.querySelector("#introBackgroundMask");
const introBackgroundOverlay = document.querySelector("#introBackgroundOverlay");
const introBackground = document.querySelector("#introBackground");
const introForeground = document.querySelector("#introForeground");
const introMeta = document.querySelector("#introMeta");
const introStatement = document.querySelector("#introStatement");
const introMail = document.querySelector("#introMail");
const introLocation = document.querySelector("#introLocation");
const introVideo = document.querySelector("#introVideo");
const introMenu = document.querySelector("#introMenu");
const introLabel = document.querySelector("#introLabel");
const zoneCases = document.querySelector("#zoneCases");
const casesStack = document.querySelector("#casesStack");
const case1 = document.querySelector("#case1");
const case2 = document.querySelector("#case2");
const case3 = document.querySelector("#case3");
const caseCards = [...document.querySelectorAll("[data-case-card]")];

const CASES = {
  "case-1": {
    color: "#ff7979",
  },
  "case-2": {
    color: "#275dff",
  },
  "case-3": {
    color: "#45ff73",
  },
};

const INTRO_CLASSES = {
  zoneIntro:
    "absolute left-[4px] top-0 z-[30] h-[1080px] w-[1019px] overflow-visible transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  zoneIntroOpen:
    "absolute left-[4px] top-0 z-[30] h-[1080px] w-[437px] overflow-visible transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introBackgroundMask:
    "absolute left-0 top-0 z-0 h-[1080px] w-[1019px] overflow-hidden pointer-events-none transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introBackgroundMaskOpen:
    "absolute left-0 top-0 z-0 h-[1080px] w-[437px] overflow-hidden pointer-events-none transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introBackgroundOverlay:
    "absolute inset-0 z-[1] bg-black/16",
  introBackground:
    "pointer-events-none absolute left-0 top-0 z-0 h-[1080px] w-[1019px] object-cover opacity-[0.46] [transform:rotate(180deg)_scaleY(-1)] transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introBackgroundOpen:
    "pointer-events-none absolute bottom-0 left-0 z-0 h-[1080px] w-[437px] object-cover opacity-[0.46] [transform:rotate(180deg)_scaleY(-1)] transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introForeground:
    "absolute left-0 top-0 z-[40] h-[1080px] w-[1019px] overflow-visible transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introForegroundOpen:
    "absolute left-0 top-0 z-[40] h-[1080px] w-[437px] overflow-visible transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introMeta:
    "absolute left-[76px] top-[96px] z-[40] grid w-[307px] grid-cols-[141px_1fr] text-[16px] leading-[20px] tracking-[0.16px] text-[rgba(179,189,210,0.7)] [font-family:var(--font-meta)] transition-[left] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introMetaOpen:
    "absolute left-[76px] top-[96px] z-[40] grid w-[307px] grid-cols-[141px_1fr] text-[16px] leading-[20px] tracking-[0.16px] text-[rgba(179,189,210,0.7)] [font-family:var(--font-meta)] transition-[left] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introStatement:
    "pointer-events-none absolute left-[76px] top-[209px] z-[50] m-0 w-[873px] -translate-y-full text-[17px] leading-[22px] font-bold italic tracking-[3.4px] text-[#b3bdd2] [font-family:var(--font-statement)] [mix-blend-mode:difference] [text-indent:307px] transition-[left,width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introStatementOpen:
    "pointer-events-none absolute left-[76px] top-[209px] z-[50] m-0 w-[788px] -translate-y-full text-[17px] leading-[22px] font-bold italic tracking-[3.4px] text-[#b3bdd2] [font-family:var(--font-statement)] [mix-blend-mode:difference] [text-indent:307px] transition-[left,width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introMail:
    "absolute left-[76px] top-[241px] z-[40] w-[306px] text-[16px] leading-[20px] font-semibold tracking-[0.16px] text-[rgba(179,189,210,0.7)] no-underline [font-family:var(--font-meta)] transition-[left] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introMailOpen:
    "absolute left-[76px] top-[241px] z-[40] w-[306px] text-[16px] leading-[20px] font-semibold tracking-[0.16px] text-[rgba(179,189,210,0.7)] no-underline [font-family:var(--font-meta)] transition-[left] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introLocation:
    "absolute left-[76px] top-[265px] z-[40] m-0 w-[306px] text-[16px] leading-[20px] tracking-[0.16px] text-[rgba(179,189,210,0.7)] [font-family:var(--font-meta)] transition-[left] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introLocationOpen:
    "absolute left-[76px] top-[265px] z-[40] m-0 w-[306px] text-[16px] leading-[20px] tracking-[0.16px] text-[rgba(179,189,210,0.7)] [font-family:var(--font-meta)] transition-[left] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introVideo:
    "absolute left-[404px] top-[773px] z-[43] block h-[144px] w-[139px] overflow-hidden object-cover opacity-80 grayscale brightness-[0.75] contrast-[1.05] transition-[left,top,width,height,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introVideoOpen:
    "absolute left-1/2 top-[773px] z-[43] block h-[144px] w-[139px] -translate-x-1/2 overflow-hidden object-cover opacity-80 grayscale brightness-[0.75] contrast-[1.05] transition-[left,top,width,height,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introMenu:
    "absolute left-[382px] top-[299px] z-[44] flex items-center gap-[23px] transition-[left,top] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introMenuOpen:
    "absolute left-[174px] top-[299px] z-[44] flex items-center gap-[23px] transition-[left,top] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introLabel:
    "absolute left-[383px] top-[953px] z-[44] flex w-[181px] flex-col items-center justify-center gap-[8px] opacity-[0.77] [mix-blend-mode:difference] transition-[left,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  introLabelOpen:
    "absolute left-1/2 top-[953px] z-[44] flex w-[181px] -translate-x-1/2 flex-col items-center justify-center gap-[8px] opacity-[0.77] [mix-blend-mode:difference] transition-[left,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  zoneCases:
    "absolute right-0 top-1/2 z-[10] h-[1093px] w-[897px] -translate-y-1/2 overflow-hidden transition-[width] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  zoneCasesOpen:
    "absolute right-0 top-1/2 z-[10] h-[1093px] w-[1479px] -translate-y-1/2 overflow-hidden transition-[width,right] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  casesStack:
    "absolute left-1/2 top-1/2 z-[10] flex w-[307px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[24px] p-[16px] transition-[width,left,top,transform,height,opacity] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
  casesStackOpen:
    "absolute right-0 top-1/2 z-[10] flex w-[1477px] -translate-y-1/2 flex-col items-end justify-center gap-[24px] p-[16px] transition-[width,left,right,top,transform,height,opacity] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]",
};

const CASE_BASE_CLASS =
  "block shrink-0 rounded-[8px] transition-[width,height,opacity] duration-[700ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]";

const CASE_COLORS = {
  "case-1": "bg-[#ff7979]",
  "case-2": "bg-[#275dff]",
  "case-3": "bg-[#45ff73]",
};

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

function getCaseClass(caseId, state, activeCaseId) {
  const colorClass = CASE_COLORS[caseId];

  if (state === "case-open") {
    if (caseId === activeCaseId) {
      return `${CASE_BASE_CLASS} ${colorClass} h-[823px] w-full hover:scale-100`;
    }

    return `${CASE_BASE_CLASS} ${colorClass} h-[75px] w-[75px] hover:scale-100`;
  }

  return `${CASE_BASE_CLASS} ${colorClass} h-[180px] w-[180px] hover:scale-[1.02]`;
}

function applyIntroStateClasses(isCaseOpen) {
  if (
    !zoneIntro ||
    !introBackgroundMask ||
    !introBackgroundOverlay ||
    !introBackground ||
    !introForeground ||
    !introMeta ||
    !introStatement ||
    !introMail ||
    !introLocation ||
    !introVideo ||
    !introMenu ||
    !introLabel ||
    !zoneCases ||
    !casesStack
  ) {
    return;
  }

  zoneIntro.className = isCaseOpen ? INTRO_CLASSES.zoneIntroOpen : INTRO_CLASSES.zoneIntro;
  introBackgroundMask.className = isCaseOpen
    ? INTRO_CLASSES.introBackgroundMaskOpen
    : INTRO_CLASSES.introBackgroundMask;
  introBackgroundOverlay.className = INTRO_CLASSES.introBackgroundOverlay;
  introBackground.className = isCaseOpen
    ? INTRO_CLASSES.introBackgroundOpen
    : INTRO_CLASSES.introBackground;
  introForeground.className = isCaseOpen
    ? INTRO_CLASSES.introForegroundOpen
    : INTRO_CLASSES.introForeground;
  introMeta.className = isCaseOpen ? INTRO_CLASSES.introMetaOpen : INTRO_CLASSES.introMeta;
  introStatement.className = isCaseOpen
    ? INTRO_CLASSES.introStatementOpen
    : INTRO_CLASSES.introStatement;
  introMail.className = isCaseOpen ? INTRO_CLASSES.introMailOpen : INTRO_CLASSES.introMail;
  introLocation.className = isCaseOpen
    ? INTRO_CLASSES.introLocationOpen
    : INTRO_CLASSES.introLocation;
  introVideo.className = isCaseOpen ? INTRO_CLASSES.introVideoOpen : INTRO_CLASSES.introVideo;
  introMenu.className = isCaseOpen ? INTRO_CLASSES.introMenuOpen : INTRO_CLASSES.introMenu;
  introLabel.className = isCaseOpen ? INTRO_CLASSES.introLabelOpen : INTRO_CLASSES.introLabel;
  zoneCases.className = isCaseOpen ? INTRO_CLASSES.zoneCasesOpen : INTRO_CLASSES.zoneCases;
  casesStack.className = isCaseOpen ? INTRO_CLASSES.casesStackOpen : INTRO_CLASSES.casesStack;
}

function setCaseOrders(activeCaseId, state) {
  const orderMap = state === "case-open"
    ? {
        [activeCaseId]: 0,
        ...Object.fromEntries(
          caseCards
            .filter((card) => card.dataset.caseCard !== activeCaseId)
            .map((card, index) => [card.dataset.caseCard, index + 1]),
        ),
      }
    : { "case-1": 0, "case-2": 1, "case-3": 2 };

  caseCards.forEach((card) => {
    card.style.order = String(orderMap[card.dataset.caseCard] ?? 0);
  });
}

function setPageState(state, activeCaseId = "case-1") {
  if (!aboutPage || !case1 || !case2 || !case3) {
    return;
  }

  const isCaseOpen = state === "case-open";
  const nextActiveCase = CASES[activeCaseId] ? activeCaseId : "case-1";

  aboutPage.dataset.state = isCaseOpen ? "case-open" : "intro";
  aboutPage.dataset.activeCase = isCaseOpen ? nextActiveCase : "";

  applyIntroStateClasses(isCaseOpen);
  setCaseOrders(nextActiveCase, isCaseOpen ? "case-open" : "intro");

  case1.className = getCaseClass("case-1", isCaseOpen ? "case-open" : "intro", nextActiveCase);
  case2.className = getCaseClass("case-2", isCaseOpen ? "case-open" : "intro", nextActiveCase);
  case3.className = getCaseClass("case-3", isCaseOpen ? "case-open" : "intro", nextActiveCase);

  if (!isCaseOpen) {
    return;
  }

  caseCards.forEach((card) => {
    card.style.backgroundColor = CASES[card.dataset.caseCard].color;
  });
}

caseCards.forEach((card) => {
  card.addEventListener("click", () => {
    setPageState("case-open", card.dataset.caseCard);
  });
});

zoneIntro?.addEventListener("click", () => {
  if (aboutPage?.dataset.state === "case-open") {
    setPageState("intro");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && aboutPage?.dataset.state === "case-open") {
    setPageState("intro");
  }
});

window.addEventListener("resize", updateStageScale);
window.addEventListener("orientationchange", updateStageScale);

updateStageScale();
setPageState("intro");
