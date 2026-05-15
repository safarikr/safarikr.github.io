const curatedBookIds = [
  "spring-yahoo",
  "macmillan-red-boots",
  "macmillan-brush-teeth",
  "macmillan-snow",
  "dino-baby",
  "dino-bungbung",
  "dino-ambulance",
  "hundred-bus",
  "hundred-rocket",
  "24store-1",
  "24store-2",
  "24store-3",
  "horror-note-1",
  "horror-note-2",
  "horror-note-3",
  "world-culture",
  "karel-sound",
  "geronimo-1",
  "geronimo-9",
  "geronimo-11",
  "geronimo-22",
  "geronimo-28",
  "franny-2",
  "lemoncello",
  "one-voice",
];

const recommendationIds = ["24store-1", "horror-note-1", "geronimo-22", "hundred-bus", "macmillan-red-boots", "dino-ambulance"];
const curatedCatalog = window.bookCatalog || {};
const mergedCatalog = window.getSafariMergedCatalog ? window.getSafariMergedCatalog() : curatedCatalog;
const sortOrderMap = new Map(curatedBookIds.map((id, index) => [id, index]));

const bookEntries = Object.entries(mergedCatalog).sort(([idA, bookA], [idB, bookB]) => {
  const curatedOrderA = sortOrderMap.has(idA) ? sortOrderMap.get(idA) : Number.MAX_SAFE_INTEGER;
  const curatedOrderB = sortOrderMap.has(idB) ? sortOrderMap.get(idB) : Number.MAX_SAFE_INTEGER;

  if (curatedOrderA !== curatedOrderB) {
    return curatedOrderA - curatedOrderB;
  }

  const importOrderA = Number.isFinite(bookA?.importOrder) ? bookA.importOrder : Number.MAX_SAFE_INTEGER;
  const importOrderB = Number.isFinite(bookB?.importOrder) ? bookB.importOrder : Number.MAX_SAFE_INTEGER;

  if (importOrderA !== importOrderB) {
    return importOrderA - importOrderB;
  }

  return String(bookA?.title || idA).localeCompare(String(bookB?.title || idB), "ko");
});

const bookGrid = document.querySelector("[data-book-grid]");
const bookEmpty = document.querySelector("[data-book-empty]");
const bookCount = document.querySelector("[data-book-count]");
const bookState = document.querySelector("[data-book-state]");
const bookSearch = document.querySelector("[data-book-search]");
const bookFilters = Array.from(document.querySelectorAll("[data-book-filter]"));
const seriesChooser = document.querySelector("[data-series-chooser]");
const seriesList = document.querySelector("[data-series-list]");
const seriesAudienceButtons = Array.from(document.querySelectorAll("[data-series-audience]"));
const recommendationGrid = document.querySelector("[data-book-recommendations]");
const featuredSeriesGrid = document.querySelector("[data-catalog-series]");
const heroTotal = document.querySelector("[data-book-hero-total]");
const heroSeries = document.querySelector("[data-book-hero-series]");
const heroAges = document.querySelector("[data-book-hero-ages]");
const loadMoreShell = document.querySelector("[data-book-load-more-shell]");
const loadMoreButton = document.querySelector("[data-book-load-more]");
const resetCatalogButton = document.querySelector("[data-book-reset]");
let rowSentinel = null;
let catalogRowObserver = null;

const filterLabels = {
  all: "전체",
  baby: "영유아",
  elementary: "초등",
  series: "시리즈",
};

const featuredCollections = [
  {
    title: "24분 편의점",
    description: "익숙한 공간과 빠른 사건 전개가 이어져 초등 저학년이 즐겁게 읽기 좋은 시리즈입니다.",
    query: "24분 편의점",
    seriesName: "24분 편의점",
    totalCount: 3,
    ids: ["24store-1", "24store-2", "24store-3"],
    tone: "peach",
  },
  {
    title: "맥밀런 월드베스트",
    description: "짧은 문장과 따뜻한 장면이 살아 있어 영유아 아이가 함께 보기 좋은 그림책 시리즈입니다.",
    query: "맥밀런 월드베스트",
    seriesName: "맥밀런 월드베스트",
    totalCount: 40,
    ids: ["spring-yahoo", "macmillan-red-boots", "macmillan-brush-teeth", "macmillan-snow"],
    tone: "mint",
  },
  {
    title: "공포의 노트",
    description: "긴장감과 유머가 균형 있게 섞여 있어 초등 독자가 몰입해서 읽기 좋은 시리즈입니다.",
    query: "공포의 노트",
    seriesName: "공포의 노트",
    totalCount: 8,
    ids: ["horror-note-1", "horror-note-2", "horror-note-3"],
    tone: "blue",
  },
  {
    title: "100층 시리즈",
    description: "층을 따라 올라가며 보는 구조라 읽어 주기와 혼자 읽기 모두에 잘 어울립니다.",
    query: "100층",
    ids: ["hundred-bus", "hundred-rocket"],
    tone: "gold",
  },
  {
    title: "공룡 시리즈",
    description: "공룡과 탈것, 모험이 또렷하게 살아 있어 반복해서 펼쳐 보기 좋은 공룡 시리즈 모음입니다.",
    query: "공룡",
    seriesName: "공룡 시리즈",
    totalCount: 5,
    ids: [
      "dino-ambulance",
      "official-1500404000075",
      "official-1500404000122",
      "official-1500404000091",
      "official-1500404000121",
    ],
    tone: "rose",
  },
  {
    title: "제로니모의 환상 모험",
    description: "모험과 판타지가 선명해서 초등 독자가 긴 호흡의 읽기로 넘어가기 좋은 대표 시리즈입니다.",
    query: "제로니모의 환상 모험",
    seriesName: "제로니모의 환상 모험",
    totalCount: 30,
    ids: ["geronimo-1", "geronimo-9", "geronimo-22", "geronimo-28"],
    tone: "blue",
  },
];

const presetSeriesOptionSeeds = [
  {
    key: "geronimo",
    label: "\uC81C\uB85C\uB2C8\uBAA8",
    seriesNames: [
      "\uC81C\uB85C\uB2C8\uBAA8\uC758 \uD658\uC0C1 \uBAA8\uD5D8",
      "\uC81C\uB85C\uB2C8\uBAA8\uC758 \uD37C\uB2C8\uC6D4\uB4DC",
      "\uC81C\uB85C\uB2C8\uBAA8\uC758 \uD658\uC0C1 \uBAA8\uD5D8 PLUS",
      "\uC81C\uB85C\uB2C8\uBAA8\uC758 \uD658\uC0C1 \uBAA8\uD5D8 \uADF8\uB798\uD53D\uB178\uBE14",
      "\uC81C\uB85C\uB2C8\uBAA8\uC758 \uD658\uC0C1 \uBAA8\uD5D8 \uB9CC\uD654",
      "\uC81C\uB85C\uB2C8\uBAA8\uC758 \uD658\uC0C1 \uBAA8\uD5D8 \uD074\uB798\uC2DD",
      "\uC288\uD37C\uD788\uC5B4\uB85C\uC988",
    ],
    titleIncludes: ["\uC81C\uB85C\uB2C8\uBAA8"],
  },
  {
    key: "franny",
    label: "\uD504\uB798\uB2C8",
    seriesNames: ["\uC5FD\uAE30 \uACFC\uD559\uC790 \uD504\uB798\uB2C8"],
    titleIncludes: ["\uC5FD\uAE30 \uACFC\uD559\uC790 \uD504\uB798\uB2C8", "\uC5FD\uAE30\uACFC\uD559\uC790 \uD504\uB798\uB2C8"],
  },
  {
    key: "lemoncello",
    label: "\uB808\uBAAC\uCCBC\uB85C",
    seriesNames: ["\uB808\uBAAC\uCCBC\uB85C \uB3C4\uC11C\uAD00"],
    titleIncludes: ["\uB808\uBAAC\uCCBC\uB85C"],
  },
  {
    key: "horror-note",
    label: "\uACF5\uD3EC\uC758 \uB178\uD2B8",
    seriesNames: ["\uACF5\uD3EC\uC758 \uB178\uD2B8"],
    titleIncludes: ["\uACF5\uD3EC\uC758 \uB178\uD2B8"],
  },
  {
    key: "24store",
    label: "24\uBD84 \uD3B8\uC758\uC810",
    seriesNames: ["24\uBD84 \uD3B8\uC758\uC810"],
    titleIncludes: ["24\uBD84 \uD3B8\uC758\uC810"],
  },
  {
    key: "macmillan",
    label: "\uB9E5\uBC00\uB7F0 \uC6D4\uB4DC\uBCA0\uC2A4\uD2B8",
    seriesNames: ["\uB9E5\uBC00\uB7F0 \uC6D4\uB4DC\uBCA0\uC2A4\uD2B8"],
  },
  {
    key: "dino",
    label: "\uACF5\uB8E1 \uC2DC\uB9AC\uC988",
    seriesNames: ["\uACF5\uB8E1 \uC2DC\uB9AC\uC988"],
    titleIncludes: ["\uACF5\uB8E1 \uAD6C\uAE09\uB300", "\uACF5\uB8E1 \uC790\uB3D9\uCC28", "\uACF5\uB8E1 \uD574\uC801\uC120", "\uACF5\uB8E1 \uC6B0\uC8FC \uB85C\uCF13", "\uACF5\uB8E1 \uB18D\uC7A5"],
  },
  {
    key: "the-track",
    label: "\uB354 \uD2B8\uB799",
    seriesNames: ["TRACK", "\uB354 \uD2B8\uB799"],
    titleIncludes: ["TRACK 1.", "TRACK 2.", "\uACE0\uC2A4\uD2B8", "\uD30C\uD2F0\uB098"],
  },
  {
    key: "i-know",
    label: "\uB098\uB294 \uC54C\uC544\uC694",
    seriesNames: ["\uB098\uB294 \uC54C\uC544\uC694!"],
  },
];

const officialSeriesLabels = [
  "24분 편의점",
  "360도 회전목마 팝업북",
  "GoGo! 방과 후 자기주도 학습만화 : 쿵",
  "가장 완전하게 만든",
  "개구쟁이 해리",
  "경고! 절대 열면 안 되는 공포의 노트",
  "구급 대장 베니와 함께하는 삐뽀삐뽀 119 어린이 교실",
  "국시꼬랭이 동네-영문",
  "그림책 홈스쿨링 리틀 사파리",
  "나는 알아요",
  "내 맘대로 드로잉 컬러링북",
  "내 친구 카렐",
  "두고 두고 읽고 싶은 우리 옛이야기",
  "똑똑 모두누리",
  "로즈 클럽의 미스터리 모험",
  "마법의 스톤 애뮬릿",
  "마스터피스",
  "만능 엽기 박사 빅터",
  "맥밀런 월드베스트 한글",
  "멍탐정 셜록 본즈",
  "방방곡곡 구석구석 옛이야기",
  "보더리스",
  "북유럽 우리 아기 첫 토이북",
  "불빛 그림책 시리즈",
  "세상의 모든 지식",
  "슈퍼히어로즈",
  "신나게 놀자!",
  "실제 크기로 보는 놀라운 동물들",
  "아장아장",
  "아주아주 놀라운 세계그림지도",
  "어린이 자기 계발",
  "엽기 과학자 프래니",
  "오솔길",
  "우리 문화 속 수수께끼",
  "우리 문화 우리 명장",
  "우리 아이 최고의 선택",
  "이럴 때 그림책",
  "자꾸자꾸 하고 싶은 두뇌 놀이책",
  "제로니모의 퍼니월드",
  "제로니모의 환상 모험",
  "제로니모의 환상 모험 PLUS",
  "제로니모의 환상 모험 그래픽노블",
  "제로니모의 환상 모험 만화",
  "제로니모의 환상 모험 클래식",
  "주춧돌",
  "지식이 번쩍! Creativity Book",
  "테아시스터즈의 판타지 모험",
  "톡톡문고",
  "톰 게이츠와 개좀비",
  "팩티비티",
  "페럴 : 까마귀와 말하는 소년",
  "폭풍 질문 왜요? 왜요?",
  "플랩을 열며 알아 가는 신나는 지식책",
  "홈런 HOME LEARN",
  "환경지킴이",
];

const officialSeriesAliases = {
  "경고! 절대 열면 안 되는 공포의 노트": {
    seriesNames: ["\uACF5\uD3EC\uC758 \uB178\uD2B8"],
    titleIncludes: ["\uACF5\uD3EC\uC758 \uB178\uD2B8", "경고! 절대 열면 안 되는 공포의 노트"],
  },
  "나는 알아요": {
    seriesNames: ["\uB098\uB294 \uC54C\uC544\uC694!", "\uB098\uB294 \uC54C\uC544\uC694"],
    titleIncludes: ["\uB098\uB294 \uC54C\uC544\uC694!", "\uB098\uB294 \uC54C\uC544\uC694"],
  },
  "맥밀런 월드베스트 한글": {
    seriesNames: ["\uB9E5\uBC00\uB7F0 \uC6D4\uB4DC\uBCA0\uC2A4\uD2B8"],
    titleIncludes: ["\uB9E5\uBC00\uB7F0 \uC6D4\uB4DC\uBCA0\uC2A4\uD2B8"],
  },
  "불빛 그림책 시리즈": {
    titleIncludes: ["불빛 그림책"],
  },
  "슈퍼히어로즈": {
    titleIncludes: ["\uC288\uD37C\uD788\uC5B4\uB85C\uC988"],
  },
};
const mergedOfficialSeriesLabels = new Set([
  "24분 편의점",
  "경고! 절대 열면 안 되는 공포의 노트",
  "나는 알아요",
  "맥밀런 월드베스트 한글",
  "엽기 과학자 프래니",
  "제로니모의 환상 모험",
  "제로니모의 환상 모험 PLUS",
  "제로니모의 환상 모험 그래픽노블",
  "제로니모의 환상 모험 만화",
  "제로니모의 환상 모험 클래식",
  "제로니모의 퍼니월드",
  "슈퍼히어로즈",
]);
const officialSeriesSource = Array.isArray(window.safariOfficialSeriesData) ? window.safariOfficialSeriesData : [];
const officialSeriesByLabel = new Map(officialSeriesSource.map((series) => [series.label, series]));
const seriesAudienceKeys = {
  age04: "age-0-4",
  age37: "age-3-7",
  grade14: "grade-1-4",
  upperTeen: "grade-upper-teen",
};
const seriesAudienceOrder = {
  [seriesAudienceKeys.age04]: 0,
  [seriesAudienceKeys.age37]: 1,
  [seriesAudienceKeys.grade14]: 2,
  [seriesAudienceKeys.upperTeen]: 3,
};
const seriesDisplayLabelOverrides = {
  "불빛 그림책 시리즈": "불빛 그림책",
};
const customSeriesOptionSeeds = [
  {
    key: "geronimo",
    label: "제로니모",
    officialLabels: [
      "제로니모의 환상 모험",
      "제로니모의 퍼니월드",
      "제로니모의 환상 모험 PLUS",
      "제로니모의 환상 모험 그래픽노블",
      "제로니모의 환상 모험 만화",
      "제로니모의 환상 모험 클래식",
      "슈퍼히어로즈",
    ],
    titleIncludes: ["제로니모"],
    preferredAudience: seriesAudienceKeys.grade14,
  },
  {
    key: "franny",
    label: "프래니",
    officialLabels: ["엽기 과학자 프래니"],
    titleIncludes: ["엽기 과학자 프래니", "엽기과학자 프래니"],
    preferredAudience: seriesAudienceKeys.grade14,
  },
  {
    key: "lemoncello",
    label: "레몬첼로",
    seriesNames: ["레몬첼로 도서관"],
    titleIncludes: ["레몬첼로"],
    preferredAudience: seriesAudienceKeys.upperTeen,
  },
  {
    key: "horror-note",
    label: "공포의 노트",
    officialLabels: ["경고! 절대 열면 안 되는 공포의 노트"],
    titleIncludes: ["공포의 노트"],
    preferredAudience: seriesAudienceKeys.grade14,
  },
  {
    key: "24store",
    label: "24분 편의점",
    officialLabels: ["24분 편의점"],
    titleIncludes: ["24분 편의점"],
    preferredAudience: seriesAudienceKeys.grade14,
  },
  {
    key: "macmillan",
    label: "맥밀런 월드베스트",
    officialLabels: ["맥밀런 월드베스트 한글"],
    preferredAudience: seriesAudienceKeys.age37,
  },
  {
    key: "dino",
    label: "공룡 시리즈",
    titleIncludes: ["공룡 구급대", "공룡 자동차", "공룡 해적선", "공룡 우주 로켓", "공룡 농장"],
    preferredAudience: seriesAudienceKeys.age37,
  },
  {
    key: "the-track",
    label: "더 트랙",
    seriesNames: ["TRACK", "더 트랙"],
    titleIncludes: ["TRACK 1.", "TRACK 2."],
    preferredAudience: seriesAudienceKeys.upperTeen,
  },
  {
    key: "i-know",
    label: "나는 알아요",
    officialLabels: ["나는 알아요"],
    preferredAudience: seriesAudienceKeys.grade14,
  },
];
const PAGE_SIZE = Number.MAX_SAFE_INTEGER;
const EAGER_COVER_COUNT = 14;
const seriesTextOptions = buildSeriesTextOptions();
let activeFilter = "all";
let activeQuery = "";
let activeQueryLabel = "";
let activeSeriesAudience = seriesAudienceKeys.age04;
let visibleBookCount = PAGE_SIZE;
let renderSequence = 0;
let deferredRenderTimer = 0;
let scrollAnimationFrame = 0;
let scrollSettleTimer = 0;
let scrollWaitToken = 0;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function truncateText(value, maxLength) {
  const text = String(value || "").trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}…`;
}

function buildSeriesToken(key) {
  return `__series__:${key}`;
}

function matchesSeriesOption(book, option) {
  const title = String(book?.title || "");
  const series = String(book?.series || "");

  if (Array.isArray(option?.seriesNames) && option.seriesNames.some((name) => name === series)) {
    return true;
  }

  if (Array.isArray(option?.titleIncludes) && option.titleIncludes.some((keyword) => title.includes(keyword))) {
    return true;
  }

  return false;
}

function entryMatchesSeriesOption(id, book, option) {
  if (Array.isArray(option?.matchIds) && option.matchIds.length) {
    return option.matchIds.includes(id);
  }

  return matchesSeriesOption(book, option);
}

function detectSeriesAudience(book) {
  const text = [book?.age, book?.category, book?.title, book?.summary]
    .filter(Boolean)
    .join(" ");

  if (/\uACE0\uD559\uB144|\uCCAD\uC18C\uB144/u.test(text)) {
    return seriesAudienceKeys.upperTeen;
  }

  if (/\uCD08\uB4F1/u.test(text) || (Array.isArray(book?.filters) && book.filters.includes("elementary"))) {
    return seriesAudienceKeys.grade14;
  }

  if (
    /\uC601\uC544|0~|0\uc138|1\uc138|2\uc138|\uC544\uAE30|\uC601\uC720\uC544/u.test(text) ||
    (Array.isArray(book?.filters) && book.filters.includes("baby") && !/\uC720\uC544/u.test(text))
  ) {
    return seriesAudienceKeys.age04;
  }

  return seriesAudienceKeys.age37;
}

function resolveOptionAudience(books) {
  const counts = {
    [seriesAudienceKeys.age04]: 0,
    [seriesAudienceKeys.age37]: 0,
    [seriesAudienceKeys.grade14]: 0,
    [seriesAudienceKeys.upperTeen]: 0,
  };

  books.forEach((book) => {
    counts[detectSeriesAudience(book)] += 1;
  });

  if (counts[seriesAudienceKeys.upperTeen] >= counts[seriesAudienceKeys.grade14] && counts[seriesAudienceKeys.upperTeen] >= counts[seriesAudienceKeys.age37] && counts[seriesAudienceKeys.upperTeen] >= counts[seriesAudienceKeys.age04]) {
    return seriesAudienceKeys.upperTeen;
  }

  if (counts[seriesAudienceKeys.grade14] >= counts[seriesAudienceKeys.age37] && counts[seriesAudienceKeys.grade14] >= counts[seriesAudienceKeys.age04]) {
    return seriesAudienceKeys.grade14;
  }

  if (counts[seriesAudienceKeys.age37] >= counts[seriesAudienceKeys.age04]) {
    return seriesAudienceKeys.age37;
  }

  return seriesAudienceKeys.age04;
}

function getBookCode(book) {
  return String(book?.bookCode || window.extractSafariBookCode?.(book?.officialUrl) || "").trim();
}

function buildBookCodeEntryLookup() {
  const lookup = new Map();

  bookEntries.forEach(([id, book]) => {
    const bookCode = getBookCode(book);

    if (!bookCode) {
      return;
    }

    if (!lookup.has(bookCode)) {
      lookup.set(bookCode, []);
    }

    lookup.get(bookCode).push(id);
  });

  return lookup;
}

function resolveSeriesAudienceFromAge(age, fallbackBooks) {
  const text = String(age || "").trim();

  if (/고학년|청소년/u.test(text)) {
    return seriesAudienceKeys.upperTeen;
  }

  if (/초등 전학년|초등 저학년|초등 1~|초등1~|초등 2~|초등 3~|초등$/u.test(text) || /6~10|6세~10세/u.test(text)) {
    return seriesAudienceKeys.grade14;
  }

  if (/영아|0~|0세|1세|2세|아장아장|토이북/u.test(text)) {
    return seriesAudienceKeys.age04;
  }

  if (/유아|3~|3-|3세|4세|5세|6세|7세|4~8|5세~초등 저학년|100세 그림책/u.test(text)) {
    return seriesAudienceKeys.age37;
  }

  return resolveOptionAudience(fallbackBooks);
}

function uniqueIds(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function mapOfficialSeriesMatchIds(seriesRecord, bookCodeEntryLookup) {
  const matchIds = [];

  (seriesRecord?.bookCodes || []).forEach((bookCode) => {
    const entryIds = bookCodeEntryLookup.get(String(bookCode || "").trim());

    if (entryIds?.length) {
      matchIds.push(...entryIds);
    }
  });

  return uniqueIds(matchIds);
}

function buildCustomSeriesOption(seed, order, bookCodeEntryLookup) {
  const officialRecords = (seed.officialLabels || [])
    .map((label) => officialSeriesByLabel.get(label))
    .filter(Boolean);
  const officialMatchIds = officialRecords.flatMap((record) => mapOfficialSeriesMatchIds(record, bookCodeEntryLookup));
  const titleMatchIds = bookEntries
    .filter(([, book]) => {
      const title = String(book?.title || "");
      return Array.isArray(seed.titleIncludes) && seed.titleIncludes.some((keyword) => title.includes(keyword));
    })
    .map(([id]) => id);
  const matchIds = uniqueIds([...officialMatchIds, ...titleMatchIds]);

  if (!matchIds.length) {
    return null;
  }

  const matchedBooks = matchIds.map((id) => mergedCatalog[id]).filter(Boolean);
  const primaryRecord = officialRecords[0];

  return {
    key: seed.key,
    label: seed.label,
    seriesNames: uniqueIds([seed.label, ...(seed.seriesNames || []), ...(seed.officialLabels || [])]),
    titleIncludes: seed.titleIncludes || [],
    token: buildSeriesToken(seed.key),
    totalCount: matchIds.length,
    matchIds,
    audience: seed.preferredAudience || resolveSeriesAudienceFromAge(primaryRecord?.age, matchedBooks),
    sortIndex: order,
  };
}

function buildSeriesTextOptions() {
  const bookCodeEntryLookup = buildBookCodeEntryLookup();
  const options = [];
  const usedOfficialLabels = new Set();

  customSeriesOptionSeeds.forEach((seed, index) => {
    const option = buildCustomSeriesOption(seed, index, bookCodeEntryLookup);

    if (!option) {
      return;
    }

    (seed.officialLabels || []).forEach((label) => usedOfficialLabels.add(label));
    options.push(option);
  });

  officialSeriesSource.forEach((seriesRecord) => {
    if (usedOfficialLabels.has(seriesRecord.label)) {
      return;
    }

    const matchIds = mapOfficialSeriesMatchIds(seriesRecord, bookCodeEntryLookup);

    if (!matchIds.length) {
      return;
    }

    const matchedBooks = matchIds.map((id) => mergedCatalog[id]).filter(Boolean);
    const label = seriesDisplayLabelOverrides[seriesRecord.label] || seriesRecord.label;

    options.push({
      key: `official-${seriesRecord.scode}`,
      label,
      seriesNames: uniqueIds([label, seriesRecord.label]),
      token: buildSeriesToken(`official-${seriesRecord.scode}`),
      totalCount: matchIds.length,
      matchIds,
      audience: resolveSeriesAudienceFromAge(seriesRecord.age, matchedBooks),
      sortIndex: customSeriesOptionSeeds.length + options.length,
    });
  });

  return options.sort((optionA, optionB) => {
    const audienceDiff = (seriesAudienceOrder[optionA.audience] || 0) - (seriesAudienceOrder[optionB.audience] || 0);

    if (audienceDiff !== 0) {
      return audienceDiff;
    }

    if (optionA.sortIndex !== optionB.sortIndex) {
      return optionA.sortIndex - optionB.sortIndex;
    }

    return optionA.label.localeCompare(optionB.label, "ko");
  });
}

function getActiveSeriesOption() {
  if (!activeQuery.startsWith("__series__:")) {
    return null;
  }

  return seriesTextOptions.find((option) => option.token === activeQuery) || null;
}

function syncSeriesAudienceTabs() {
  seriesAudienceButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.seriesAudience === activeSeriesAudience);
  });
}

function bindSeriesAudienceTabs() {
  seriesAudienceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeSeriesAudience = button.dataset.seriesAudience || seriesAudienceKeys.age04;
      syncSeriesAudienceTabs();

      const activeSeriesOption = getActiveSeriesOption();
      if (activeSeriesOption && activeSeriesOption.audience !== activeSeriesAudience) {
        activeQuery = "";
        activeQueryLabel = "";
      }

      renderSeriesTextList();
      renderBooks();
    });
  });
}

function setActiveFilter(nextFilter) {
  activeFilter = nextFilter;
  bookFilters.forEach((item) => item.classList.toggle("active", item.dataset.bookFilter === nextFilter));

  if (seriesChooser) {
    seriesChooser.hidden = nextFilter !== "series";
  }
}

function renderSeriesTextList() {
  if (!seriesList) {
    return;
  }

  syncSeriesAudienceTabs();
  const activeSeriesOption = getActiveSeriesOption();
  const visibleSeriesOptions = seriesTextOptions.filter((option) => option.audience === activeSeriesAudience);

  seriesList.innerHTML = visibleSeriesOptions
    .map((option) => {
      const isActive = activeSeriesOption?.key === option.key;
      const className = ["series-text-button", isActive ? "is-active" : ""].filter(Boolean).join(" ");

      return `<button class="${className}" type="button" data-series-option="${escapeHtml(option.key)}">${escapeHtml(option.label)}</button>`;
    })
    .join("");

  seriesList.querySelectorAll("[data-series-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const seriesKey = button.dataset.seriesOption || "";
      const option = seriesTextOptions.find((item) => item.key === seriesKey);

      if (!option) {
        return;
      }

      cancelPendingCatalogAnimation();
      resetVisibleBooks();
      setActiveFilter("series");
      activeSeriesAudience = option.audience || seriesAudienceKeys.age04;
      activeQuery = option.token;
      activeQueryLabel = option.label;

      if (bookSearch) {
        bookSearch.value = option.label;
      }

      renderSeriesTextList();
      renderBooks();
    });
  });
}

function resetVisibleBooks() {
  visibleBookCount = PAGE_SIZE;
}

function resetCatalogView() {
  cancelPendingCatalogAnimation();
  activeQuery = "";
  activeQueryLabel = "";
  resetVisibleBooks();
  setActiveFilter("all");

  if (bookSearch) {
    bookSearch.value = "";
  }

  renderSeriesTextList();
  renderBooks();
}

function bookMatchesFilter(book) {
  if (activeFilter === "all") {
    return true;
  }

  if (activeFilter === "series") {
    return true;
  }

  return Array.isArray(book.filters) && book.filters.includes(activeFilter);
}

function bookMatchesQuery(id, book) {
  const activeSeriesOption = activeFilter === "series" ? getActiveSeriesOption() : null;

  if (activeSeriesOption) {
    return entryMatchesSeriesOption(id, book, activeSeriesOption);
  }

  if (!activeQuery) {
    return true;
  }

  const haystack = [
    book.title,
    book.subtitle,
    book.series,
    book.age,
    book.category,
    book.summary,
    book.description,
    ...(book.highlights || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(activeQuery);
}

function buildTagMarkup(book) {
  const tags = [book.series, ...(book.highlights || []).slice(0, 2)];

  return tags
    .filter(Boolean)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function buildCardTopline(book) {
  const parts = [];

  if (book.age) {
    parts.push(`<span class="catalog-kicker">${escapeHtml(book.age)}</span>`);
  }

  if (book.series) {
    parts.push(`<span class="catalog-series-name">${escapeHtml(book.series)}</span>`);
  }

  if (!parts.length) {
    return "";
  }

  return `<div class="catalog-topline">${parts.join("")}</div>`;
}

function buildBookCardMarkup(id, book, extraClass = "") {
  const subtitle = book.subtitle ? `<span class="catalog-subtitle">${escapeHtml(book.subtitle)}</span>` : "";
  const summary = truncateText(book.summary, 56);
  const category = book.category || "사파리 도서";
  const linkLabel = `${book.title} 상세 보기`;
  const cardClassName = ["catalog-card", "catalog-link", "is-visible", extraClass].filter(Boolean).join(" ");

  return `
    <a class="${cardClassName}" href="./book-detail.html?book=${encodeURIComponent(id)}" data-tilt aria-label="${escapeHtml(linkLabel)}">
      <div class="catalog-cover-frame">
        <img class="catalog-cover-image" src="${escapeHtml(book.cover)}" alt="${escapeHtml(book.title)} 표지" loading="lazy" />
      </div>
      <div class="catalog-copy">
        ${buildCardTopline(book)}
        <strong>${escapeHtml(book.title)}</strong>
        ${subtitle}
        <p>${escapeHtml(summary)}</p>
        <div class="card-tags">${buildTagMarkup(book)}</div>
        <div class="catalog-card-footer">
          <span class="catalog-meta-chip">${escapeHtml(category)}</span>
          <span class="catalog-cta">표지와 리뷰 보기</span>
        </div>
      </div>
    </a>
  `;
}

function getStateLabel(filteredCount, visibleCount) {
  const filterLabel = filterLabels[activeFilter] || "전체";
  const queryLabel = activeQueryLabel ? `검색어 “${activeQueryLabel}”` : "검색어 없음";
  const visibleLabel = filteredCount > visibleCount ? `${visibleCount}권 표시 중` : `${filteredCount}권 표시 중`;

  return `전체 ${bookEntries.length}권 · ${filterLabel} · ${queryLabel} · ${visibleLabel}`;
}

function updateLoadMore(filteredCount) {
  if (!loadMoreShell || !loadMoreButton) {
    return;
  }

  const hasMore = filteredCount > visibleBookCount;
  loadMoreShell.hidden = !hasMore;

  if (!hasMore) {
    return;
  }

  const remainingCount = filteredCount - visibleBookCount;
  const nextCount = Math.min(PAGE_SIZE, remainingCount);
  loadMoreButton.textContent = `${nextCount}권 더 보기`;
}

function getCatalogColumnCount() {
  if (window.innerWidth <= 720) {
    return 2;
  }

  if (window.innerWidth <= 920) {
    return 3;
  }

  if (window.innerWidth <= 1280) {
    return 6;
  }

  return 7;
}

function ensureRowSentinel() {
  if (!bookGrid || !bookGrid.parentElement) {
    return null;
  }

  if (rowSentinel?.isConnected) {
    return rowSentinel;
  }

  rowSentinel = document.createElement("div");
  rowSentinel.className = "catalog-row-sentinel";
  rowSentinel.setAttribute("data-catalog-row-sentinel", "");
  rowSentinel.hidden = true;

  const parent = bookGrid.parentElement;
  const referenceNode = loadMoreShell || bookEmpty || bookGrid.nextSibling;
  parent.insertBefore(rowSentinel, referenceNode || null);

  return rowSentinel;
}

function disconnectRowObserver() {
  if (catalogRowObserver) {
    catalogRowObserver.disconnect();
    catalogRowObserver = null;
  }
}

function scheduleCatalogCard(callback) {
  window.setTimeout(() => {
    window.requestAnimationFrame(callback);
  }, 24);
}

function applyCatalogImagePriority(card, index) {
  const image = card?.querySelector(".catalog-cover-image");

  if (!image) {
    return;
  }

  image.decoding = "async";

  if (index < 4) {
    image.loading = "eager";
    image.fetchPriority = "high";
    return;
  }

  if (index < EAGER_COVER_COUNT) {
    image.loading = "eager";
    image.fetchPriority = "auto";
    return;
  }

  image.loading = "lazy";
  image.fetchPriority = "low";
}

function renderBookGridInRows(entries, filteredCount) {
  renderSequence += 1;
  const sequence = renderSequence;
  const columnCount = getCatalogColumnCount();
  const sentinel = ensureRowSentinel();
  let startIndex = 0;
  let renderedCount = 0;

  bookGrid.innerHTML = "";
  bookGrid.classList.add("is-streaming");
  disconnectRowObserver();

  if (sentinel) {
    sentinel.hidden = true;
  }

  const syncProgress = () => {
    if (bookCount) {
      bookCount.textContent = `${filteredCount}권을 보고 있어요`;
    }

    if (bookState) {
      bookState.textContent = getStateLabel(filteredCount, renderedCount);
    }
  };

  const finishStreaming = () => {
    bookGrid.classList.remove("is-streaming");
    disconnectRowObserver();

    if (sentinel) {
      sentinel.hidden = true;
    }

    updateLoadMore(filteredCount);
  };

  const armNextRowObserver = () => {
    if (!sentinel || startIndex >= entries.length || sequence !== renderSequence) {
      finishStreaming();
      return;
    }

    sentinel.hidden = false;
    disconnectRowObserver();

    catalogRowObserver = new IntersectionObserver(
      (observerEntries) => {
        const shouldLoadNextRow = observerEntries.some((entry) => entry.isIntersecting);

        if (!shouldLoadNextRow) {
          return;
        }

        disconnectRowObserver();
        sentinel.hidden = true;
        streamNextRow();
      },
      {
        rootMargin: "0px 0px 220px 0px",
        threshold: 0.01,
      }
    );

    catalogRowObserver.observe(sentinel);
  };

  const streamNextRow = () => {
    if (sequence !== renderSequence) {
      return;
    }

    const rowEntries = entries.slice(startIndex, startIndex + columnCount);
    if (!rowEntries.length) {
      finishStreaming();
      return;
    }

    if (startIndex === 0) {
      const firstRowMarkup = rowEntries
        .map(([id, book]) => buildBookCardMarkup(id, book, "is-stream-enter"))
        .join("");

      bookGrid.insertAdjacentHTML("beforeend", firstRowMarkup);

      Array.from(bookGrid.children)
        .slice(-rowEntries.length)
        .forEach((card, rowIndex) => applyCatalogImagePriority(card, rowIndex));

      startIndex += rowEntries.length;
      renderedCount = startIndex;
      syncProgress();
      armNextRowObserver();
      return;
    }

    let rowOffset = 0;

    const streamCard = () => {
      if (sequence !== renderSequence) {
        return;
      }

      const currentEntry = rowEntries[rowOffset];

      if (!currentEntry) {
        startIndex += rowEntries.length;
        renderedCount = startIndex;
        syncProgress();
        armNextRowObserver();
        return;
      }

      const [id, book] = currentEntry;
      bookGrid.insertAdjacentHTML("beforeend", buildBookCardMarkup(id, book, "is-stream-enter"));
      applyCatalogImagePriority(bookGrid.lastElementChild, startIndex + rowOffset);
      rowOffset += 1;
      scheduleCatalogCard(streamCard);
    };

    streamCard();
  };

  if (!entries.length) {
    renderedCount = 0;
    syncProgress();
    finishStreaming();
    return;
  }

  renderedCount = 0;
  syncProgress();
  streamNextRow();
}

function cancelPendingCatalogAnimation() {
  renderSequence += 1;
  scrollWaitToken += 1;

  window.clearTimeout(deferredRenderTimer);
  deferredRenderTimer = 0;
  window.clearTimeout(scrollSettleTimer);
  scrollSettleTimer = 0;

  if (scrollAnimationFrame) {
    window.cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = 0;
  }

  disconnectRowObserver();

  if (bookGrid) {
    bookGrid.classList.remove("is-streaming");
  }

  if (rowSentinel) {
    rowSentinel.hidden = true;
  }
}

function queueRenderBooks(delay = 0) {
  window.clearTimeout(deferredRenderTimer);
  deferredRenderTimer = 0;

  const runRender = () => {
    deferredRenderTimer = 0;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        renderBooks();
      });
    });
  };

  if (delay <= 0) {
    runRender();
    return;
  }

  deferredRenderTimer = window.setTimeout(() => {
    runRender();
  }, delay);
}

function getCatalogScrollTop(section) {
  const sectionTop = window.scrollY + section.getBoundingClientRect().top;
  const headerOffset = window.innerWidth <= 760 ? 16 : 90;
  return Math.max(sectionTop - headerOffset, 0);
}

function animateCatalogScroll(section) {
  if (!section) {
    return Promise.resolve();
  }

  const targetY = getCatalogScrollTop(section);

  if (Math.abs(window.scrollY - targetY) < 6) {
    window.scrollTo({ top: targetY });
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const token = ++scrollWaitToken;
    let isSettled = false;

    const finish = () => {
      if (isSettled) {
        return;
      }

      isSettled = true;
      window.clearTimeout(scrollSettleTimer);
      scrollSettleTimer = 0;

      if (scrollAnimationFrame) {
        window.cancelAnimationFrame(scrollAnimationFrame);
        scrollAnimationFrame = 0;
      }

      if ("onscrollend" in window) {
        window.removeEventListener("scrollend", handleScrollEnd);
      }

      resolve();
    };

    const finishIfCurrent = () => {
      if (token !== scrollWaitToken) {
        finish();
        return;
      }

      finish();
    };

    const checkPosition = () => {
      if (token !== scrollWaitToken) {
        finish();
        return;
      }

      const remainingDistance = Math.abs(window.scrollY - targetY);
      if (remainingDistance <= 12) {
        finish();
        return;
      }

      scrollAnimationFrame = window.requestAnimationFrame(checkPosition);
    };

    const handleScrollEnd = () => {
      if (Math.abs(window.scrollY - targetY) <= 18) {
        finishIfCurrent();
      }
    };

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    }

    window.scrollTo({ top: targetY, behavior: "smooth" });
    scrollAnimationFrame = window.requestAnimationFrame(checkPosition);
    scrollSettleTimer = window.setTimeout(finishIfCurrent, 760);
  });
}

function prepareDeferredCatalogRender() {
  if (!bookGrid) {
    return;
  }

  disconnectRowObserver();
  bookGrid.classList.remove("is-streaming");
  bookGrid.innerHTML = "";

  if (bookEmpty) {
    bookEmpty.hidden = true;
  }

  if (loadMoreShell) {
    loadMoreShell.hidden = true;
  }

  if (rowSentinel) {
    rowSentinel.hidden = true;
  }
}

function getSeriesSortInfo(seriesKey, title) {
  const safeTitle = String(title || "");

  return getResolvedSeriesSortInfo(seriesKey, safeTitle);

  if (seriesKey === "geronimo") {
    const fantasyMatch = safeTitle.match(/\uD658\uC0C1\s?\uBAA8\uD5D8\s*(\d+)/u);
    const plusMatch = safeTitle.match(/\uD50C\uB7EC\uC2A4\s*(\d+)/u);
    const funnyMatch = safeTitle.match(/\uD37C\uB2C8\uC6D4\uB4DC\s*(\d+)/u);
    const graphicMatch = safeTitle.match(/\uADF8\uB798\uD53D\uB178\uBE14\s*(\d+)/u);
    const heroMatch = safeTitle.match(/\uC288\uD37C\uD788\uC5B4\uB85C\uC988\s*(\d+)/u);

    if (fantasyMatch) return { rank: Number(fantasyMatch[1]), label: safeTitle };
    if (safeTitle.includes("\uC2A4\uD398\uC15C")) return { rank: 100, label: safeTitle };
    if (plusMatch) return { rank: 200 + Number(plusMatch[1]), label: safeTitle };
    if (funnyMatch) return { rank: 300 + Number(funnyMatch[1]), label: safeTitle };
    if (graphicMatch) return { rank: 400 + Number(graphicMatch[1]), label: safeTitle };
    if (heroMatch) return { rank: 500 + Number(heroMatch[1]), label: safeTitle };
  }

  if (seriesKey === "horror-note") {
    const monsterGuide = safeTitle.includes("\uBAAC\uC2A4\uD130 \uB3C4\uAC10");
    const match = safeTitle.match(/\uACF5\uD3EC\uC758\s?\uB178\uD2B8\s*(\d+)/u);
    return {
      rank: monsterGuide ? 999 : match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesKey === "franny") {
    const special = safeTitle.includes("\uD2B9\uBCC4\uD310") || safeTitle.includes("\uAC8C\uC784\uBD81");
    const match = safeTitle.match(/\uD504\uB798\uB2C8\s*(\d+)/u);
    return {
      rank: special ? 500 + (match ? Number(match[1]) : 0) : match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesKey === "24store") {
    const match = safeTitle.match(/24\uBD84\s?\uD3B8\uC758\uC810\s*(\d+)/u);
    return {
      rank: match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesName === "제로니모의 환상 모험") {
    const match = safeTitle.match(/^제로니모의 환상 모험\s*(\d+)\s*[:.]/);
    return {
      rank: match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesName === "공포의 노트") {
    const monsterGuide = safeTitle.includes("몬스터 도감");
    const match = safeTitle.match(/공포의 노트\s*(\d+)/);
    return {
      rank: monsterGuide ? 999 : match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  return {
    rank: Number.MAX_SAFE_INTEGER,
    label: safeTitle,
  };
}

function getResolvedSeriesSortInfo(seriesKey, title) {
  const safeTitle = String(title || "");

  if (seriesKey === "geronimo") {
    const fantasyMatch = safeTitle.match(/\uD658\uC0C1\s?\uBAA8\uD5D8\s*(\d+)/u);
    const plusMatch = safeTitle.match(/\uD50C\uB7EC\uC2A4\s*(\d+)/u);
    const funnyMatch = safeTitle.match(/\uD37C\uB2C8\uC6D4\uB4DC\s*(\d+)/u);
    const graphicMatch = safeTitle.match(/\uADF8\uB798\uD53D\uB178\uBE14\s*(\d+)/u);
    const heroMatch = safeTitle.match(/\uC288\uD37C\uD788\uC5B4\uB85C\uC988\s*(\d+)/u);

    if (fantasyMatch) {
      return { rank: Number(fantasyMatch[1]), label: safeTitle };
    }

    if (safeTitle.includes("\uC2A4\uD398\uC15C")) {
      return { rank: 100, label: safeTitle };
    }

    if (plusMatch) {
      return { rank: 200 + Number(plusMatch[1]), label: safeTitle };
    }

    if (funnyMatch) {
      return { rank: 300 + Number(funnyMatch[1]), label: safeTitle };
    }

    if (graphicMatch) {
      return { rank: 400 + Number(graphicMatch[1]), label: safeTitle };
    }

    if (heroMatch) {
      return { rank: 500 + Number(heroMatch[1]), label: safeTitle };
    }

    return { rank: 900, label: safeTitle };
  }

  if (seriesKey === "horror-note") {
    const monsterGuide = safeTitle.includes("\uBAAC\uC2A4\uD130 \uB3C4\uAC10");
    const match = safeTitle.match(/\uACF5\uD3EC\uC758\s?\uB178\uD2B8\s*(\d+)/u);

    return {
      rank: monsterGuide ? 999 : match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesKey === "franny") {
    const special = safeTitle.includes("\uD2B9\uBCC4\uD310") || safeTitle.includes("\uAC8C\uC784\uBD81");
    const match = safeTitle.match(/\uD504\uB798\uB2C8\s*(\d+)/u);

    return {
      rank: special ? 500 + (match ? Number(match[1]) : 0) : match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesKey === "24store") {
    const match = safeTitle.match(/24\uBD84\s?\uD3B8\uC758\uC810\s*(\d+)/u);

    return {
      rank: match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesKey === "the-track") {
    const match = safeTitle.match(/TRACK\s*(\d+)/iu);

    return {
      rank: match ? Number(match[1]) : Number.MAX_SAFE_INTEGER,
      label: safeTitle,
    };
  }

  if (seriesKey === "dino") {
    const dinoRanks = [
      "\uAE34\uAE09 \uCD9C\uB3D9! \uACF5\uB8E1 \uAD6C\uAE09\uB300",
      "\uC288\uD37C \uCD9C\uB3D9! \uACF5\uB8E1 \uC790\uB3D9\uCC28",
      "\uC288\uD37C \uBAA8\uD5D8! \uACF5\uB8E1 \uD574\uC801\uC120",
      "\uC288\uD37C \uBC1C\uC0AC! \uACF5\uB8E1 \uC6B0\uC8FC \uB85C\uCF13",
      "\uC900\uBE44, \uC601\uCC28! \uACF5\uB8E1 \uB18D\uC7A5",
    ];
    const rank = dinoRanks.findIndex((item) => safeTitle.includes(item));

    return {
      rank: rank === -1 ? Number.MAX_SAFE_INTEGER : rank + 1,
      label: safeTitle,
    };
  }

  if (seriesKey === "lemoncello") {
    const lemoncelloRanks = [
      "\uD0C8\uCD9C \uAC8C\uC784",
      "\uB3C4\uC11C\uAD00 \uC62C\uB9BC\uD53D",
      "\uCD5C\uCCA8\uB2E8 \uB17C\uD53D\uC158 \uAC8C\uC784 \uB808\uC774\uC2A4",
    ];
    const rank = lemoncelloRanks.findIndex((item) => safeTitle.includes(item));

    return {
      rank: rank === -1 ? Number.MAX_SAFE_INTEGER : rank + 1,
      label: safeTitle,
    };
  }

  if (seriesKey === "i-know") {
    const match = safeTitle.match(/:\s*(.+)$/u);

    return {
      rank: Number.MAX_SAFE_INTEGER,
      label: match ? match[1] : safeTitle,
    };
  }

  return {
    rank: Number.MAX_SAFE_INTEGER,
    label: safeTitle,
  };
}

function sortFilteredEntries(entries) {
  const activeSeriesOption = activeFilter === "series" ? getActiveSeriesOption() : null;

  if (!activeSeriesOption) {
    return entries;
  }

  return [...entries].sort(([idA, bookA], [idB, bookB]) => {
    const infoA = getResolvedSeriesSortInfo(activeSeriesOption.key, bookA?.title || idA);
    const infoB = getResolvedSeriesSortInfo(activeSeriesOption.key, bookB?.title || idB);

    if (infoA.rank !== infoB.rank) {
      return infoA.rank - infoB.rank;
    }

    return infoA.label.localeCompare(infoB.label, "ko");
  });
}

function renderBooks() {
  if (!bookGrid) {
    return;
  }

  const waitingForSeriesSelection = activeFilter === "series" && !getActiveSeriesOption();

  if (waitingForSeriesSelection) {
    cancelPendingCatalogAnimation();
    bookGrid.innerHTML = "";

    if (bookCount) {
      bookCount.textContent = "시리즈를 먼저 골라 주세요";
    }

    if (bookState) {
      bookState.textContent = "연령대 안에서 원하는 시리즈를 선택하면 도서 목록이 바로 열립니다.";
    }

    if (bookEmpty) {
      bookEmpty.hidden = false;
      bookEmpty.textContent = "시리즈를 먼저 선택해 주세요. 선택한 시리즈의 도서 목록만 아래에 표시됩니다.";
    }

    updateLoadMore(0);
    renderSeriesTextList();
    return;
  }

  const filteredEntries = sortFilteredEntries(
    bookEntries.filter(([id, book]) => bookMatchesFilter(book) && bookMatchesQuery(id, book))
  );
  const visibleEntries = filteredEntries.slice(0, visibleBookCount);

  renderBookGridInRows(visibleEntries, filteredEntries.length);
  renderSeriesTextList();

  if (bookEmpty) {
    bookEmpty.hidden = filteredEntries.length !== 0;
    if (!bookEmpty.hidden) {
      bookEmpty.textContent = "조건에 맞는 도서를 찾지 못했어요. 검색어 또는 시리즈를 다시 골라 보세요.";
    }
  }
}

function updateLoadMore() {
  if (!loadMoreShell) {
    return;
  }

  loadMoreShell.hidden = true;
  loadMoreShell.style.display = "none";
}

function buildCollectionCardMarkup(collection) {
  const books = collection.ids
    .map((id) => [id, curatedCatalog[id] || mergedCatalog[id]])
    .filter(([, book]) => book);

  const totalCount = Number.isFinite(collection.totalCount)
    ? collection.totalCount
    : collection.seriesName
      ? Object.values(mergedCatalog).filter((book) => book?.series === collection.seriesName).length
      : books.length;

  const covers = books
    .slice(0, 3)
    .map(
      ([, book]) => `
        <img src="${escapeHtml(book.cover)}" alt="${escapeHtml(book.title)} 표지" loading="lazy" />
      `
    )
    .join("");

  const titles = books
    .slice(0, 3)
    .map(([, book]) => `<li>${escapeHtml(book.title)}</li>`)
    .join("");

  const leadId = books[0]?.[0];

  return `
    <article class="collection-card tone-${escapeHtml(collection.tone)}">
      <div class="collection-card-head">
        <div>
          <span class="collection-kicker">${escapeHtml(totalCount)}권 시리즈</span>
          <strong>${escapeHtml(collection.title)}</strong>
        </div>
        <span class="collection-query">${escapeHtml(collection.query)}</span>
      </div>
      <p>${escapeHtml(collection.description)}</p>
      <div class="collection-cover-strip">${covers}</div>
      <ul class="collection-list list-reset">${titles}</ul>
      <div class="collection-actions">
        <button class="ghost-button collection-trigger" type="button" data-series-query="${escapeHtml(collection.query)}">이 시리즈만 보기 <span class="arrow">→</span></button>
        ${leadId ? `<a class="pill-link collection-detail-link" href="./book-detail.html?book=${encodeURIComponent(leadId)}">대표 도서 보기</a>` : ""}
      </div>
    </article>
  `;
}

function renderFeaturedCollections() {
  if (!featuredSeriesGrid) {
    return;
  }

  featuredSeriesGrid.innerHTML = featuredCollections.map((collection) => buildCollectionCardMarkup(collection)).join("");

  featuredSeriesGrid.querySelectorAll("[data-series-query]").forEach((button) => {
    button.addEventListener("click", () => {
      const query = button.dataset.seriesQuery || "";
      const matchedCollection = featuredCollections.find((collection) => collection.query === query);
      const catalogSection = document.querySelector("#catalog-section");
      const needsDeferredRender = Boolean(matchedCollection?.totalCount && matchedCollection.totalCount >= 20);

      activeQuery = query.toLowerCase();
      activeQueryLabel = query;
      resetVisibleBooks();
      setActiveFilter("series");

      if (bookSearch) {
        bookSearch.value = matchedCollection?.seriesName || query;
      }

      if (matchedCollection?.seriesName) {
        const matchedSeriesOption = seriesTextOptions.find(
          (option) => option.label === matchedCollection.seriesName || (option.seriesNames || []).includes(matchedCollection.seriesName)
        );

        if (matchedSeriesOption) {
          activeSeriesAudience = matchedSeriesOption.audience || activeSeriesAudience;
          activeQuery = matchedSeriesOption.token;
          activeQueryLabel = matchedSeriesOption.label;
        } else {
          activeQuery = matchedCollection.seriesName.toLowerCase();
          activeQueryLabel = matchedCollection.seriesName;
        }
        renderSeriesTextList();
      }

      if (bookCount) {
        bookCount.textContent = `${activeQueryLabel} 시리즈를 불러오는 중이에요`;
      }

      if (bookState) {
        bookState.textContent = needsDeferredRender
          ? "먼저 목록 위치로 부드럽게 이동한 뒤, 책이 한 권씩 왼쪽에서 오른쪽으로 자연스럽게 이어지게 할게요."
          : "목록 위치로 이동한 뒤 바로 보여드릴게요.";
      }

      cancelPendingCatalogAnimation();

      if (needsDeferredRender) {
        prepareDeferredCatalogRender();
      }

      animateCatalogScroll(catalogSection).then(() => {
        queueRenderBooks(needsDeferredRender ? 90 : 30);
      });
    });
  });
}

function renderRecommendations() {
  if (!recommendationGrid) {
    return;
  }

  const recommendationMarkup = recommendationIds
    .map((id) => [id, curatedCatalog[id] || mergedCatalog[id]])
    .filter(([, book]) => book)
    .map(
      ([id, book]) => `
        <a class="compact-recommend-card" href="./book-detail.html?book=${encodeURIComponent(id)}">
          <img src="${escapeHtml(book.cover)}" alt="${escapeHtml(book.title)} 표지" loading="lazy" />
          <div>
            <strong>${escapeHtml(book.title)}</strong>
            <span>${escapeHtml(truncateText(book.summary, 64))}</span>
          </div>
        </a>
      `
    )
    .join("");

  recommendationGrid.innerHTML = recommendationMarkup;
}

bookFilters.forEach((button) => {
  button.addEventListener("click", () => {
    cancelPendingCatalogAnimation();
    resetVisibleBooks();
    const nextFilter = button.dataset.bookFilter || "all";
    setActiveFilter(nextFilter);

    if (nextFilter === "series") {
      activeQuery = "";
      activeQueryLabel = "";

      if (bookSearch) {
        bookSearch.value = "";
      }
    }

    renderSeriesTextList();
    renderBooks();
  });
});

if (resetCatalogButton) {
  resetCatalogButton.addEventListener("click", () => {
    resetCatalogView();
  });
}

if (bookSearch) {
  bookSearch.addEventListener("input", (event) => {
    cancelPendingCatalogAnimation();
    activeQueryLabel = event.target.value.trim();
    activeQuery = activeQueryLabel.toLowerCase();
    resetVisibleBooks();
    renderSeriesTextList();
    renderBooks();
  });
}

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", () => {
    cancelPendingCatalogAnimation();
    visibleBookCount += PAGE_SIZE;
    renderBooks();
  });
}

if (loadMoreShell) {
  loadMoreShell.hidden = true;
  loadMoreShell.style.display = "none";
}

if (heroTotal) {
  heroTotal.textContent = `${bookEntries.length}권`;
}

if (heroSeries) {
  const seriesCount = new Set(bookEntries.map(([, book]) => book.series).filter(Boolean)).size;
  heroSeries.textContent = `${seriesCount}개`;
}

if (heroAges) {
  const ageCount = ["baby", "elementary"].filter((filter) =>
    bookEntries.some(([, book]) => Array.isArray(book.filters) && book.filters.includes(filter))
  ).length;
  heroAges.textContent = `${ageCount}축`;
}

if (heroAges) {
  const heroBrowseCard = heroAges.closest(".catalog-stat-card");
  const heroBrowseLabel = heroBrowseCard?.querySelector("span");
  const heroBrowseDescription = heroBrowseCard?.querySelector("p");

  heroAges.textContent = "시리즈+검색";

  if (heroBrowseLabel) {
    heroBrowseLabel.textContent = "빠른 찾기";
  }

  if (heroBrowseDescription) {
    heroBrowseDescription.textContent = "시리즈와 검색어로 원하는 책을 바로 좁혀 볼 수 있어요.";
  }
}

bindSeriesAudienceTabs();
renderFeaturedCollections();
renderSeriesTextList();
renderBooks();
renderRecommendations();

