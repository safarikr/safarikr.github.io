const root = document.documentElement;
const scenes = document.querySelectorAll("[data-parallax-scene]");
const reveals = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll("[data-tilt]");
const demoButtons = document.querySelectorAll("[data-demo-button]");
const faqEntries = document.querySelectorAll(".faq-entry");
const showcaseRows = Array.from(document.querySelectorAll("[data-showcase-row]"));

const preferredShowcaseIds = [
  "24store-1",
  "24store-2",
  "24store-3",
  "spring-yahoo",
  "macmillan-red-boots",
  "macmillan-brush-teeth",
  "macmillan-snow",
  "horror-note-1",
  "horror-note-2",
  "horror-note-3",
  "hundred-bus",
  "hundred-rocket",
  "official-1500440400101",
  "dino-ambulance",
  "dino-bungbung",
  "dino-baby",
  "world-culture",
  "karel-sound",
  "geronimo-1",
  "geronimo-22",
  "franny-2",
  "lemoncello",
  "one-voice",
];

const showcaseSeriesLimitMap = new Map([
  ["제로니모의 환상 모험", 2],
]);

function normalizeShowcaseTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~·ㆍ]/g, "");
}

function escapeMarkup(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildShowcaseCard(id, bookCatalog) {
  const book = bookCatalog?.[id];

  if (!book || !book.cover) {
    return "";
  }

  return `
    <a class="book-cover" href="./book-detail.html?book=${encodeURIComponent(id)}" aria-label="${escapeMarkup(book.title)} 상세 보기">
      <img src="${escapeMarkup(book.cover)}" alt="${escapeMarkup(book.title)} 표지" loading="lazy" />
    </a>
  `;
}

function buildShowcaseRows(bookCatalog) {
  const catalogEntries = Object.entries(bookCatalog || {});
  const preferredIndexMap = new Map(preferredShowcaseIds.map((id, index) => [id, index]));

  const orderedEntries = catalogEntries
    .filter(([, book]) => book?.cover)
    .sort(([idA, bookA], [idB, bookB]) => {
      const preferredA = preferredIndexMap.has(idA) ? preferredIndexMap.get(idA) : Number.MAX_SAFE_INTEGER;
      const preferredB = preferredIndexMap.has(idB) ? preferredIndexMap.get(idB) : Number.MAX_SAFE_INTEGER;

      if (preferredA !== preferredB) {
        return preferredA - preferredB;
      }

      return String(bookA?.title || idA).localeCompare(String(bookB?.title || idB), "ko");
    });

  const seenTitles = new Set();
  const seriesCountMap = new Map();
  const uniqueIds = orderedEntries
    .map(([id, book]) => {
      const normalizedTitle = normalizeShowcaseTitle(book?.title);
      const seriesName = String(book?.series || "").trim();
      const currentSeriesCount = seriesName ? seriesCountMap.get(seriesName) || 0 : 0;
      const seriesLimit = seriesName ? showcaseSeriesLimitMap.get(seriesName) : 0;

      if (!normalizedTitle || seenTitles.has(normalizedTitle)) {
        return "";
      }

      if (seriesLimit && currentSeriesCount >= seriesLimit) {
        return "";
      }

      seenTitles.add(normalizedTitle);

      if (seriesName) {
        seriesCountMap.set(seriesName, currentSeriesCount + 1);
      }

      return id;
    })
    .filter(Boolean);

  const firstRow = [];
  const secondRow = [];

  uniqueIds.forEach((id, index) => {
    if (index % 2 === 0) {
      firstRow.push(id);
      return;
    }

    secondRow.push(id);
  });

  if (!secondRow.length && firstRow.length > 1) {
    secondRow.push(...firstRow.splice(Math.ceil(firstRow.length / 2)));
  }

  return [firstRow, secondRow];
}

function renderHomeShowcase() {
  if (!showcaseRows.length) {
    return;
  }

  const showcaseCatalog =
    typeof window.getSafariMergedCatalog === "function"
      ? window.getSafariMergedCatalog()
      : window.bookCatalog;

  if (!showcaseCatalog) {
    return;
  }

  const showcaseConfig = buildShowcaseRows(showcaseCatalog);

  showcaseRows.forEach((row, index) => {
    const entries = showcaseConfig[index] || [];
    const markup = entries.map((id) => buildShowcaseCard(id, showcaseCatalog)).join("");

    if (!markup) {
      row.parentElement?.setAttribute("hidden", "hidden");
      return;
    }

    row.parentElement?.removeAttribute("hidden");
    row.style.animationDuration = `${Math.max(86, entries.length * 5)}s`;
    row.innerHTML = `${markup}${markup}`;
  });
}

function updateScrollProgress() {
  const scrollable = Math.max(document.body.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(window.scrollY / scrollable, 1);
  root.style.setProperty("--scroll-progress", progress.toFixed(4));
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
renderHomeShowcase();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

reveals.forEach((element) => revealObserver.observe(element));

function syncVisibleReveals() {
  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisibleInViewport = rect.bottom > 0 && rect.top < window.innerHeight * 0.92;

    if (isVisibleInViewport) {
      element.classList.add("is-visible");
    }
  });
}

function syncRevealForHashTarget() {
  if (!window.location.hash) {
    return;
  }

  const target = document.querySelector(window.location.hash);
  const revealParent = target?.closest(".reveal");

  if (revealParent) {
    revealParent.classList.add("is-visible");
  }
}

window.addEventListener("load", () => {
  syncRevealForHashTarget();
  syncVisibleReveals();
  window.setTimeout(syncVisibleReveals, 120);
});

window.addEventListener("hashchange", () => {
  syncRevealForHashTarget();
  window.setTimeout(syncVisibleReveals, 60);
});

window.addEventListener("resize", syncVisibleReveals, { passive: true });

let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let parallaxFrame = 0;

function renderParallax() {
  scenes.forEach((scene) => {
    const rect = scene.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const ratioX = (pointerX - centerX) / rect.width;
    const ratioY = (pointerY - centerY) / rect.height;

    scene.querySelectorAll("[data-depth]").forEach((layer) => {
      const depth = Number(layer.getAttribute("data-depth") || "10");
      const liftX = ratioX * depth;
      const liftY = ratioY * depth;
      layer.style.transform = `translate3d(${liftX}px, ${liftY}px, 0)`;
    });
  });

  parallaxFrame = 0;
}

window.addEventListener(
  "pointermove",
  (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!parallaxFrame) {
      parallaxFrame = window.requestAnimationFrame(renderParallax);
    }
  },
  { passive: true }
);

tiltCards.forEach((card) => {
  let frame = 0;

  const draw = (x, y) => {
    const rect = card.getBoundingClientRect();
    const ratioX = (x - rect.left) / rect.width - 0.5;
    const ratioY = (y - rect.top) / rect.height - 0.5;
    const rotateY = ratioX * 8;
    const rotateX = ratioY * -8;
    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -4px, 0)`;
    frame = 0;
  };

  card.addEventListener("pointermove", (event) => {
    if (!frame) {
      frame = window.requestAnimationFrame(() => draw(event.clientX, event.clientY));
    }
  });

  card.addEventListener("pointerleave", () => {
    if (frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
    card.style.transform = "";
  });
});

demoButtons.forEach((button) => {
  let resetTimer = 0;

  button.addEventListener("click", () => {
    if (button.dataset.state === "playing") {
      return;
    }

    button.dataset.state = "playing";
    button.textContent = "미리듣는 중...";

    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      button.dataset.state = "idle";
      button.textContent = "30초 미리듣기";
    }, 2600);
  });
});

faqEntries.forEach((entry, index) => {
  const button = entry.querySelector(".faq-item");
  const answer = entry.querySelector(".faq-answer");

  if (!button || !answer) {
    return;
  }

  if (entry.classList.contains("is-open")) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
    button.setAttribute("aria-expanded", "true");
  } else {
    answer.style.maxHeight = "0px";
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", () => {
    const isOpen = entry.classList.contains("is-open");

    faqEntries.forEach((otherEntry) => {
      const otherButton = otherEntry.querySelector(".faq-item");
      const otherAnswer = otherEntry.querySelector(".faq-answer");

      if (!otherButton || !otherAnswer) {
        return;
      }

      otherEntry.classList.remove("is-open");
      otherButton.setAttribute("aria-expanded", "false");
      otherAnswer.style.maxHeight = "0px";
    });

    if (!isOpen) {
      entry.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });

  if (index === 0 && entry.classList.contains("is-open")) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  }
});
