(function () {
  function normalizeTitle(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[\s!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~·ㆍ]/g, "");
  }

  function extractBookCode(url) {
    const match = String(url || "").match(/[?&]bookcode=(\d+)/i);
    return match ? match[1] : "";
  }

  function normalizeAgeText(value) {
    return String(value || "")
      .replaceAll(",", " · ")
      .replace(/\s*·\s*/g, " · ")
      .trim();
  }

  function normalizeCategoryText(value) {
    return String(value || "")
      .replaceAll(",", " · ")
      .replace(/\s*·\s*/g, " · ")
      .trim();
  }

  function extractYes24GoodsId(value) {
    const match = String(value || "").match(/goods\/(\d+)/i);
    return match ? match[1] : "";
  }

  function getOfficialCatalog() {
    return window.safariOfficialCatalog || {};
  }

  function getOfficialCoverLookup() {
    if (window.__safariOfficialCoverLookup) {
      return window.__safariOfficialCoverLookup;
    }

    const lookup = new Map();

    Object.values(getOfficialCatalog()).forEach((book) => {
      const normalizedTitle = normalizeTitle(book?.title);

      if (normalizedTitle && book?.cover && !lookup.has(normalizedTitle)) {
        lookup.set(normalizedTitle, book.cover);
      }
    });

    window.__safariOfficialCoverLookup = lookup;
    return lookup;
  }

  function getOfficialCoverFallback(book) {
    const bookCode = extractBookCode(book?.officialUrl);

    if (bookCode) {
      return `http://www.safaribook.co.kr/bookimg/img/${bookCode}.jpg`;
    }

    const officialCoverLookup = getOfficialCoverLookup();
    const titleKeys = [
      normalizeTitle(book?.title),
      normalizeTitle([book?.title, book?.subtitle].filter(Boolean).join(" ")),
    ].filter(Boolean);

    for (const key of titleKeys) {
      if (officialCoverLookup.has(key)) {
        return officialCoverLookup.get(key);
      }
    }

    return "";
  }

  function getLocalYes24Thumbnail(goodsId) {
    if (!goodsId || typeof reviewPhotoThumbnailByGoodsId === "undefined") {
      return "";
    }

    const thumbnail = reviewPhotoThumbnailByGoodsId[goodsId];

    if (typeof thumbnail === "string" && thumbnail.startsWith("./")) {
      return thumbnail;
    }

    return "";
  }

  const macmillanWorldBestCodes = new Set([
    "1500400400037",
    "1500400400023",
    "1500400400012",
    "1500400400038",
    "1500400400054",
    "1500400400046",
    "1500400400047",
    "1500400400017",
    "1500400400036",
    "1500400400016",
    "1500400400052",
    "1500400400034",
    "1500400400021",
    "1500400400020",
    "1500400400018",
    "1500400400026",
    "1500400400029",
    "1500400400061",
    "1500400400043",
    "1500400400024",
    "1500400400040",
    "1500400400014",
    "1500400400035",
    "1500400400030",
    "1500400400039",
    "1500400400033",
    "1500400400028",
    "1500400400027",
    "1500400400015",
    "1500400400051",
    "1500400400058",
    "150040040019",
    "1500400400025",
    "1500400400056",
    "1500400400032",
    "1500400400031",
    "1500400400041",
    "1500400400022",
    "1500400400013",
    "1500400400055",
  ]);

  function getSeriesOverride(title, bookCode) {
    if (macmillanWorldBestCodes.has(String(bookCode || ""))) {
      return "맥밀런 월드베스트";
    }

    const overrides = {
      "야호! 야호! 봄이 왔나 봐!": "맥밀런 월드베스트",
      "내가 정말정말 좋아하는 빨간 장화!": "맥밀런 월드베스트",
      "나는 이 닦기가 정말정말 싫어요!": "맥밀런 월드베스트",
      "눈이 좋아!": "맥밀런 월드베스트",
      "경고! 절대 열면 안 되는 공포의 노트 몬스터 도감": "공포의 노트",
      "긴급 출동! 공룡 구급대": "공룡 시리즈",
      "슈퍼 출동! 공룡 자동차": "공룡 시리즈",
      "슈퍼 모험! 공룡 해적선": "공룡 시리즈",
      "슈퍼 발사! 공룡 우주 로켓": "공룡 시리즈",
      "준비, 영차! 공룡 농장": "공룡 시리즈",
    };

    return overrides[title] || "";
  }

  function buildFallbackHighlights(book) {
    const highlights = Array.isArray(book.highlights) ? [...book.highlights] : [];

    if (!highlights.length && book.series) {
      highlights.push(book.series);
    }

    if (!highlights.length && book.age) {
      highlights.push(book.age);
    }

    if (highlights.length < 3 && book.category) {
      highlights.push(...String(book.category).split(" · ").slice(0, 2));
    }

    return highlights.filter(Boolean).slice(0, 3);
  }

  function resolveRemoteAssetSource(value) {
    const source = String(value || "").trim();

    if (!source) {
      return "";
    }

    if (
      source.startsWith("./") ||
      source.startsWith("../") ||
      source.startsWith("/") ||
      source.startsWith("data:")
    ) {
      return source;
    }

    const normalizedSource = source.startsWith("//") ? `https:${source}` : source;

    if (/^https?:\/\//i.test(normalizedSource)) {
      const proxyTarget = normalizedSource.replace(/^https?:\/\//i, "");
      return `https://images.weserv.nl/?url=${encodeURIComponent(proxyTarget)}`;
    }

    return source;
  }

  function resolveCoverSource(book) {
    const source = String(book?.cover || "").trim();
    const officialCoverFallback = getOfficialCoverFallback(book);

    if (officialCoverFallback) {
      return resolveRemoteAssetSource(officialCoverFallback);
    }

    return resolveRemoteAssetSource(source);
  }

  function resolveReviewThumbnailSource(source, fallbackThumbnail) {
    const normalizedSource = String(source || "").trim();

    if (!normalizedSource) {
      return fallbackThumbnail;
    }

    const goodsId = extractYes24GoodsId(normalizedSource);
    const localYes24Thumbnail = getLocalYes24Thumbnail(goodsId);

    if (localYes24Thumbnail) {
      return localYes24Thumbnail;
    }

    if (goodsId && fallbackThumbnail) {
      return fallbackThumbnail;
    }

    return resolveRemoteAssetSource(normalizedSource);
  }

  function normalizeReviewLinks(reviewLinks, fallbackThumbnail) {
    if (!Array.isArray(reviewLinks)) {
      return [];
    }

    return reviewLinks.map((review) => ({
      ...review,
      thumbnail: resolveReviewThumbnailSource(review?.thumbnail, fallbackThumbnail),
    }));
  }

  function normalizeBookAssets(book) {
    const resolvedCover = resolveCoverSource(book);

    return {
      ...book,
      cover: resolvedCover,
      reviewLinks: normalizeReviewLinks(book?.reviewLinks, resolvedCover),
    };
  }

  function applyOfficialOverrides(book) {
    const bookCode = String(book?.bookCode || "");

    if (bookCode === "1500440400101") {
      return normalizeBookAssets({
        ...book,
        storeUrl:
          book.storeUrl ||
          "https://smartstore.naver.com/epublic5131/search?q=%EC%88%98%ED%95%99%EC%A0%81%20%EC%82%AC%EA%B3%A0%EB%A0%A5%EC%9D%84%20%ED%8C%8D%ED%8C%8D%20%ED%82%A4%EC%9B%8C%20%EC%A3%BC%EB%8A%94%20%EC%B4%88%EB%93%B1%20%EC%88%98%ED%95%99%20%EC%8B%A0%EB%AC%B8%20-%20%EC%88%98%2C%20%EB%8F%84%ED%98%95%2C%20%EC%B8%A1%EC%A0%95",
        summary:
          "신문을 읽듯 가볍게 펼쳐 보며 수, 도형, 측정 개념을 친근하게 익힐 수 있도록 구성한 초등 수학 입문서입니다.",
        overview:
          "어려운 수학 용어를 먼저 외우기보다, 생활 속 장면과 짧은 기사 형식의 읽을거리를 따라가며 개념을 자연스럽게 이해하도록 돕는 책입니다. 초등 저학년이 부담 없이 펼쳐 보기 좋고, 집에서 부모와 함께 이야기 나누며 읽기에도 편한 흐름으로 구성했습니다.",
        description:
          "수와 도형, 측정처럼 초등 수학에서 처음 만나는 주제를 신문 형식으로 풀어내어 지루하지 않게 읽을 수 있습니다. 한 장씩 넘기며 핵심 개념을 차근차근 확인하고, 생활 속 예시와 함께 연결해 볼 수 있어 처음 수학 흥미를 붙이는 데 잘 맞는 구성이에요.",
        highlights: ["초등 수학 신문", "수·도형·측정", "초등 추천"],
        reviewLinks: [
          {
            platform: "YES24",
            eyebrow: "온라인서점",
            title: "예스24에서 도서 정보 보기",
            label: "YES24 바로가기",
            description: "도서 소개와 구매 페이지를 예스24 상품 페이지에서 바로 확인할 수 있습니다.",
            url: "https://www.yes24.com/product/goods/187029337",
            thumbnail: "https://image.yes24.com/goods/187029337/XL",
            meta: "www.yes24.com · 상품 페이지",
          },
          {
            platform: "네이버 블로그",
            eyebrow: "블로그 후기",
            title: "초등 수학 신문 블로그 후기 보기",
            label: "블로그 후기 보기",
            description: "책 사진과 함께 읽은 흐름을 정리한 실제 독서 후기로 바로 이동합니다.",
            url: "https://m.blog.naver.com/PostView.naver?blogId=mini8186&logNo=224253221821",
            thumbnail: "./assets/reviews/blog-auto/math-newspaper.jpg",
            meta: "blog.naver.com/mini8186",
          },
        ],
      });
    }

    return normalizeBookAssets(book);
  }

  function buildCuratedTitleKeys(book) {
    const keys = [];
    const title = normalizeTitle(book?.title);
    const subtitle = normalizeTitle(book?.subtitle);
    const combined = normalizeTitle([book?.title, book?.subtitle].filter(Boolean).join(" "));

    if (title) {
      keys.push(title);
    }

    if (combined && !keys.includes(combined)) {
      keys.push(combined);
    }

    if (subtitle && !keys.includes(subtitle)) {
      keys.push(subtitle);
    }

    return keys;
  }

  function titleLooksDuplicated(normalizedOfficialTitle, curatedTitleKeys) {
    return curatedTitleKeys.some((key) => {
      if (!key) {
        return false;
      }

      return (
        normalizedOfficialTitle === key ||
        normalizedOfficialTitle.startsWith(key) ||
        key.startsWith(normalizedOfficialTitle)
      );
    });
  }

  function normalizeOfficialEntry(entry) {
    const age = normalizeAgeText(entry.age);
    const category = normalizeCategoryText(entry.category);
    const seriesOverride = getSeriesOverride(entry.title, entry.bookCode);
    const series = entry.series || seriesOverride;
    const filters = Array.isArray(entry.filters) ? entry.filters.filter(Boolean) : [];

    if (series && !filters.includes("series")) {
      filters.push("series");
    }

    return applyOfficialOverrides({
      ...entry,
      age,
      series,
      category,
      filters,
      summary:
        entry.summary ||
        `${age || "다양한 연령"} 독자에게 잘 맞는 사파리 도서를 공식 목록 기준으로 정리했습니다.`,
      overview: entry.overview || "",
      description: entry.description || "",
      highlights: buildFallbackHighlights({ ...entry, age, category, series }),
      reviewLinks: Array.isArray(entry.reviewLinks) ? entry.reviewLinks : [],
    });
  }

  function buildMergedCatalog() {
    const curatedCatalog = window.bookCatalog || {};
    const officialCatalog = window.safariOfficialCatalog || {};

    const curatedCodes = new Set();
    const curatedTitleKeys = [];

    Object.values(curatedCatalog).forEach((book) => {
      const bookCode = extractBookCode(book?.officialUrl);
      if (bookCode) {
        curatedCodes.add(bookCode);
      }

      curatedTitleKeys.push(...buildCuratedTitleKeys(book));
    });

    const mergedCatalog = {};
    const officialEntries = Object.entries(officialCatalog).sort(([, bookA], [, bookB]) => {
      const orderA = Number.isFinite(bookA?.importOrder) ? bookA.importOrder : Number.MAX_SAFE_INTEGER;
      const orderB = Number.isFinite(bookB?.importOrder) ? bookB.importOrder : Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

    officialEntries.forEach(([id, book]) => {
      if (!book) {
        return;
      }

      const bookCode = String(book.bookCode || "");
      const normalizedTitle = normalizeTitle(book.title);

      if (
        (bookCode && curatedCodes.has(bookCode)) ||
        (normalizedTitle && titleLooksDuplicated(normalizedTitle, curatedTitleKeys))
      ) {
        return;
      }

      mergedCatalog[id] = normalizeOfficialEntry(book);
    });

    Object.entries(curatedCatalog).forEach(([id, book]) => {
      mergedCatalog[id] = normalizeBookAssets(book);
    });

    return mergedCatalog;
  }

  let mergedCatalogCache = null;

  window.getSafariMergedCatalog = function getSafariMergedCatalog() {
    if (!mergedCatalogCache) {
      mergedCatalogCache = buildMergedCatalog();
    }

    return mergedCatalogCache;
  };

  window.normalizeSafariTitle = normalizeTitle;
  window.extractSafariBookCode = extractBookCode;
})();
