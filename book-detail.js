const detailRoot = document.querySelector("[data-book-detail-root]");
const detailCatalog = window.getSafariMergedCatalog ? window.getSafariMergedCatalog() : window.bookCatalog || {};
const detailParams = new URLSearchParams(window.location.search);
const detailBookId = detailParams.get("book");
const detailBook = detailCatalog[detailBookId];
const indexedBlogReviews = window.safariBlogReviewIndex || {};

function escapeDetailHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getPlatformClass(platform) {
  if (platform.includes("YES24") || platform.includes("알라딘") || platform.includes("교보")) {
    return "platform-store";
  }

  if (platform.includes("블로그")) {
    return "platform-blog";
  }

  if (platform.includes("카페")) {
    return "platform-cafe";
  }

  return "platform-social";
}

function getReviewTone(platform) {
  if (platform.includes("YES24") || platform.includes("알라딘") || platform.includes("교보")) {
    return {
      eyebrow: "온라인서점",
      title: "구매자 평점과 포토 후기를 확인해 보세요",
      footer: "리뷰 페이지 열기",
    };
  }

  if (platform.includes("블로그")) {
    return {
      eyebrow: "블로그 후기",
      title: "실사용 사진과 긴 감상을 함께 볼 수 있어요",
      footer: "블로그 리뷰 열기",
    };
  }

  if (platform.includes("카페")) {
    return {
      eyebrow: "실구매 반응",
      title: "추천 댓글과 생생한 체험 반응",
      footer: "카페 리뷰 열기",
    };
  }

  return {
    eyebrow: "짧은 감상",
    title: "플랫폼에서 관련 후기를 더 살펴보세요",
    footer: "리뷰 보기",
  };
}

function getDisplayUrl(url) {
  return url.replace(/^https?:\/\//, "");
}

function getStoreButtonLabel(url) {
  const normalized = String(url || "").toLowerCase();

  if (normalized.includes("yes24.com")) {
    return "YES24에서 보기";
  }

  if (normalized.includes("smartstore.naver.com")) {
    return "네이버 스마트스토어에서 보기";
  }

  if (normalized.includes("aladin.co.kr")) {
    return "알라딘에서 보기";
  }

  if (normalized.includes("kyobobook.co.kr")) {
    return "교보문고에서 보기";
  }

  return "구매처에서 보기";
}

function buildNaverBlogSearchUrl(query) {
  return `https://search.naver.com/search.naver?where=blog&sm=tab_jum&query=${encodeURIComponent(query)}`;
}

function buildSearchReviewThumbnail(book, tone) {
  const palette =
    tone === "blog"
      ? {
          start: "#dff1e7",
          end: "#eef8f3",
          accent: "#7bb79c",
          chip: "BLOG REVIEW",
        }
      : {
          start: "#f4eadf",
          end: "#fbf6ef",
          accent: "#c59c71",
          chip: "STORE REVIEW",
        };

  const title = String(book.title || "사파리 도서")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  const series = String(book.series || book.category || "사파리 도서")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="540" viewBox="0 0 720 540">
      <defs>
        <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.start}" />
          <stop offset="100%" stop-color="${palette.end}" />
        </linearGradient>
      </defs>
      <rect width="720" height="540" rx="36" fill="url(#card)" />
      <circle cx="620" cy="92" r="92" fill="rgba(255,255,255,0.46)" />
      <circle cx="118" cy="430" r="120" fill="rgba(255,255,255,0.3)" />
      <rect x="52" y="54" width="196" height="48" rx="24" fill="rgba(255,255,255,0.72)" />
      <text x="86" y="85" fill="${palette.accent}" font-family="SUIT, sans-serif" font-size="22" font-weight="700">${palette.chip}</text>
      <text x="56" y="170" fill="#2f2824" font-family="SUIT, sans-serif" font-size="42" font-weight="800">${title.slice(0, 18)}</text>
      <text x="56" y="224" fill="#2f2824" font-family="SUIT, sans-serif" font-size="42" font-weight="800">${title.slice(18, 36)}</text>
      <text x="56" y="298" fill="#76665b" font-family="SUIT, sans-serif" font-size="24" font-weight="600">${series.slice(0, 28)}</text>
      <rect x="56" y="356" width="270" height="18" rx="9" fill="rgba(255,255,255,0.8)" />
      <rect x="56" y="394" width="360" height="18" rx="9" fill="rgba(255,255,255,0.74)" />
      <rect x="56" y="432" width="228" height="18" rx="9" fill="rgba(255,255,255,0.66)" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildFallbackReviewLinks(book) {
  const title = String(book.title || "사파리 도서");
  const blogQuery = title;

  return [
    {
      platform: "YES24 검색",
      eyebrow: "온라인서점",
      title: `예스24에서 ${title} 찾아보기`,
      label: "예스24 검색 열기",
      description: "구매 가능한 판본과 관련 리뷰를 예스24 검색 결과에서 바로 확인할 수 있습니다.",
      url: `https://www.yes24.com/Product/Search?query=${encodeURIComponent(title)}`,
      thumbnail: book.cover || buildSearchReviewThumbnail(book, "store"),
      meta: "www.yes24.com · 검색 결과",
    },
    {
      platform: "네이버 블로그",
      eyebrow: "블로그 모아보기",
      title: `${title} 블로그 후기 더 보기`,
      label: "블로그 후기 찾기",
      description: "책 제목으로 찾은 네이버 블로그 첫 리뷰를 바로 연결합니다.",
      url: buildNaverBlogSearchUrl(blogQuery),
      thumbnail: buildSearchReviewThumbnail(book, "blog"),
      meta: "search.naver.com · 블로그 검색",
      resolveTitle: title,
    },
  ];
}

function getResolvedReviewLinks(bookId, book) {
  const baseLinks =
    Array.isArray(book.reviewLinks) && book.reviewLinks.length ? [...book.reviewLinks] : buildFallbackReviewLinks(book);

  const normalizedLinks = baseLinks.filter((item) => {
    if (!item?.url) {
      return false;
    }

    if (bookId === "karel-sound" && item.url === "https://sarak.yes24.com/review/21200011") {
      return false;
    }

    return true;
  });

  if (bookId === "spring-yahoo") {
    const hasReaderReview = normalizedLinks.some((item) => item.url === "https://sarak.yes24.com/review/21200011");

    if (!hasReaderReview) {
      normalizedLinks.push({
        platform: "YES24 독자 후기",
        eyebrow: "사진형 후기",
        title: "야호! 야호! 봄이 왔나 봐! 독자 후기 보기",
        label: "독자 후기 열기",
        description: "책 사진과 함께 봄 그림책 반응을 자세히 적어 둔 실제 독자 후기로 바로 이동합니다.",
        url: "https://sarak.yes24.com/review/21200011",
        thumbnail: "./assets/reviews/spring-yahoo-reader.jpg",
        meta: "sarak.yes24.com · 독자 후기",
      });
    }
  }

  return normalizedLinks;
}

function getAgeFilters(book) {
  return (book.filters || []).filter((filter) => ["baby", "preschool", "elementary"].includes(filter));
}

function hasSharedAge(book, target) {
  const sourceAgeFilters = getAgeFilters(book);
  const targetAgeFilters = getAgeFilters(target);

  if (!sourceAgeFilters.length || !targetAgeFilters.length) {
    return false;
  }

  return sourceAgeFilters.some((filter) => targetAgeFilters.includes(filter));
}

function buildStoryParagraphs(book) {
  const paragraphs = [];
  const seen = new Set();

  const push = (value) => {
    if (!value) {
      return;
    }

    const normalized = String(value).trim();

    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    paragraphs.push(normalized);
  };

  push(book.overview);
  push(book.summary);
  push(book.description);

  const highlightText = (book.highlights || []).slice(0, 2).join(", ");
  const seriesPrefix = book.series ? `${book.series} 흐름 안에서 ` : "";
  const agePrefix = book.age ? `${book.age} 독자가 부담 없이 따라갈 수 있도록 ` : "";

  push(
    `${seriesPrefix}${agePrefix}구성이 정돈되어 있고, ${
      highlightText ? `${highlightText} 포인트가 자연스럽게 살아 있어` : "핵심 장면과 정서가 또렷하게 살아 있어"
    } 읽어 준 뒤에도 책 이야기를 이어가기 좋습니다.`
  );

  return paragraphs;
}

function buildReaderGuideItems(book) {
  const items = [];
  const seriesText = book.series ? `${book.series} 시리즈를 좋아하는 독자` : "";
  const ageText = book.age ? `${book.age} 연령대가 편하게 따라가기 좋은 구성` : "";
  const categoryText = book.category ? `${book.category} 관심이 있는 아이에게 특히 잘 맞는 흐름` : "";
  const highlightText = (book.highlights || []).slice(0, 2).join(" · ");

  if (seriesText) {
    items.push(seriesText);
  }

  if (ageText) {
    items.push(ageText);
  }

  if (categoryText) {
    items.push(categoryText);
  }

  if (highlightText) {
    items.push(`${highlightText} 포인트를 중심으로 읽기 좋음`);
  }

  return items.slice(0, 3);
}

function getRelatedBooks(bookId, book) {
  const allBooks = Object.entries(detailCatalog).filter(([id, item]) => id !== bookId && item);
  const sameSeries = allBooks
    .filter(([, item]) => book.series && item.series === book.series)
    .sort(([, a], [, b]) => (a.title || "").localeCompare(b.title || "", "ko"));

  const similarAge = allBooks
    .filter(([, item]) => item.series !== book.series && hasSharedAge(book, item))
    .sort(([, a], [, b]) => {
      const categoryScoreA = a.category === book.category ? 1 : 0;
      const categoryScoreB = b.category === book.category ? 1 : 0;
      return categoryScoreB - categoryScoreA || (a.title || "").localeCompare(b.title || "", "ko");
    });

  const merged = [...sameSeries, ...similarAge];
  const unique = [];
  const seenIds = new Set();

  merged.forEach(([id, item]) => {
    if (!seenIds.has(id)) {
      seenIds.add(id);
      unique.push([id, item]);
    }
  });

  return unique.slice(0, 4);
}

function buildMetaItem(label, value) {
  if (!value) {
    return "";
  }

  return `
    <div class="detail-meta-item">
      <dt>${escapeDetailHtml(label)}</dt>
      <dd>${escapeDetailHtml(value)}</dd>
    </div>
  `;
}

function buildReviewCardDataAttributes(review) {
  if (!review.resolveTitle) {
    return "";
  }

  return ` data-review-kind="blog" data-review-resolve-title="${escapeDetailHtml(review.resolveTitle)}"`;
}

function buildReviewCard(book, review) {
  const tone = getReviewTone(review.platform);
  const eyebrow = review.eyebrow || tone.eyebrow;
  const title = review.title || tone.title;
  const footer = review.label || tone.footer;
  const meta = review.meta || getDisplayUrl(review.url);
  const thumbnail = review.thumbnail || book.cover;

  return `
    <a class="review-link-card ${getPlatformClass(review.platform)}" href="${escapeDetailHtml(review.url)}" target="_blank" rel="noreferrer"${buildReviewCardDataAttributes(review)}>
      <div class="review-link-media">
        <img src="${escapeDetailHtml(thumbnail)}" alt="${escapeDetailHtml(title)}" loading="lazy" data-review-thumb />
        <span class="review-platform-chip">${escapeDetailHtml(review.platform)}</span>
      </div>
      <div class="review-link-copy">
        <span class="review-link-eyebrow" data-review-eyebrow>${escapeDetailHtml(eyebrow)}</span>
        <strong class="review-link-title" data-review-title>${escapeDetailHtml(title)}</strong>
        <p data-review-description>${escapeDetailHtml(review.description)}</p>
        <div class="review-link-footer">
          <span class="review-link-cta" data-review-label>${escapeDetailHtml(footer)}</span>
          <span class="review-link-url" data-review-meta>${escapeDetailHtml(meta)}</span>
        </div>
      </div>
    </a>
  `;
}

const resolvedBlogReviewCache = new Map();

function getIndexedBlogReview(title) {
  if (!title) {
    return null;
  }

  const indexedReview = indexedBlogReviews[title];

  if (!indexedReview?.url) {
    return null;
  }

  return {
    ok: true,
    query: title,
    url: indexedReview.url,
    thumbnail: indexedReview.thumbnail || "",
    meta: indexedReview.meta || getDisplayUrl(indexedReview.url),
    postTitle: indexedReview.postTitle || "",
  };
}

async function fetchResolvedBlogReview(title) {
  if (!title) {
    return null;
  }

  if (!resolvedBlogReviewCache.has(title)) {
    const indexedReview = getIndexedBlogReview(title);
    const request = Promise.resolve(indexedReview || null);

    resolvedBlogReviewCache.set(title, request);
  }

  return resolvedBlogReviewCache.get(title);
}

function applyResolvedBlogReview(card, bookTitle, resolvedReview) {
  if (!card || !resolvedReview?.ok || !resolvedReview.url) {
    return;
  }

  card.href = resolvedReview.url;

  const thumb = card.querySelector("[data-review-thumb]");
  const label = card.querySelector("[data-review-label]");
  const meta = card.querySelector("[data-review-meta]");
  const description = card.querySelector("[data-review-description]");
  const title = card.querySelector("[data-review-title]");

  if (thumb && resolvedReview.thumbnail) {
    thumb.src = resolvedReview.thumbnail;
  }

  if (title && resolvedReview.postTitle) {
    title.textContent = resolvedReview.postTitle;
  }

  if (label) {
    label.textContent = "블로그 후기 열기";
  }

  if (meta && resolvedReview.meta) {
    meta.textContent = resolvedReview.meta;
  }

  if (description) {
    description.textContent = `${bookTitle}를 제목으로 찾은 네이버 블로그 첫 리뷰입니다.`;
  }
}

async function hydrateResolvedBlogReviews() {
  const reviewCards = Array.from(document.querySelectorAll("[data-review-kind='blog'][data-review-resolve-title]"));

  if (!reviewCards.length) {
    return;
  }

  await Promise.all(
    reviewCards.map(async (card) => {
      const resolveTitle = card.dataset.reviewResolveTitle;
      const resolvedReview = await fetchResolvedBlogReview(resolveTitle);
      applyResolvedBlogReview(card, resolveTitle, resolvedReview);
    })
  );
}

function buildRelatedCard(id, book) {
  return `
    <a class="related-book-card" href="./book-detail.html?book=${encodeURIComponent(id)}">
      <img src="${escapeDetailHtml(book.cover)}" alt="${escapeDetailHtml(book.title)} 표지" loading="lazy" />
      <div>
        <strong>${escapeDetailHtml(book.title)}</strong>
        <span>${escapeDetailHtml(book.summary)}</span>
      </div>
    </a>
  `;
}

function renderMissingState() {
  if (!detailRoot) {
    return;
  }

  detailRoot.innerHTML = `
    <section class="detail-shell detail-shell-empty reveal is-visible">
      <div class="detail-empty-card">
        <div class="eyebrow">Book Detail</div>
        <h1>도서를 찾지 못했어요</h1>
        <p>목록에서 다시 책을 고르면 표지, 소개, 리뷰 모음, 스토어 연결이 함께 보입니다.</p>
        <div class="hero-actions">
          <a class="button" href="./books.html">도서 목록으로 가기 <span class="arrow">→</span></a>
          <a class="button-secondary" href="./index.html">메인 보기 <span class="arrow">→</span></a>
        </div>
      </div>
    </section>
  `;
}

function renderDetailPage(bookId, book) {
  if (!detailRoot) {
    return;
  }

  const subtitle = book.subtitle ? `<p class="detail-subtitle">${escapeDetailHtml(book.subtitle)}</p>` : "";
  const authorLine = [book.author, book.illustrator ? `그림 ${book.illustrator}` : "", book.translator ? `옮김 ${book.translator}` : ""]
    .filter(Boolean)
    .join(" · ");
  const authorMarkup = authorLine ? `<p class="detail-author-line">${escapeDetailHtml(authorLine)}</p>` : "";
  const topMeta = [book.series || "사파리 도서", book.age, book.category].filter(Boolean);
  const storyParagraphs = buildStoryParagraphs(book);
  const readerGuideItems = buildReaderGuideItems(book);
  const reviewLinks = getResolvedReviewLinks(bookId, book);
  const chipMarkup =
    Array.isArray(book.highlights) && book.highlights.length
      ? `<div class="detail-chip-row">${book.highlights
          .map((item) => `<span class="detail-chip">${escapeDetailHtml(item)}</span>`)
          .join("")}</div>`
      : "";
  const relatedMarkup = getRelatedBooks(bookId, book)
    .map(([id, item]) => buildRelatedCard(id, item))
    .join("");

  detailRoot.innerHTML = `
    <div class="book-breadcrumb reveal">
      <a href="./books.html">도서 목록</a>
      <span>/</span>
      <strong>${escapeDetailHtml(book.title)}</strong>
    </div>

    <article class="detail-shell">
      <section class="detail-hero">
        <aside class="detail-cover-column reveal">
          <div class="detail-cover-frame" data-tilt>
            <img src="${escapeDetailHtml(book.cover)}" alt="${escapeDetailHtml(book.title)} 표지" />
          </div>
          <div class="detail-cover-note">
            <strong>${escapeDetailHtml(book.series || "사파리 도서")}</strong>
            <p>${escapeDetailHtml(book.summary)}</p>
          </div>
        </aside>

        <div class="detail-main-card reveal">
          <div class="detail-top-row">
            <div class="eyebrow">Book Detail</div>
            <div class="detail-meta-pills">
              ${topMeta.map((item) => `<span class="detail-meta-pill">${escapeDetailHtml(item)}</span>`).join("")}
            </div>
          </div>
          <div class="detail-head-block">
            <div class="detail-title-stack">
              <h1>${escapeDetailHtml(book.title)}</h1>
              ${subtitle}
              ${authorMarkup}
              <p class="detail-summary">${escapeDetailHtml(book.summary)}</p>
              <a class="compact-store-button detail-inline-store-button" href="${escapeDetailHtml(book.storeUrl)}" target="_blank" rel="noreferrer">${escapeDetailHtml(getStoreButtonLabel(book.storeUrl))}</a>
            </div>
          </div>

          ${chipMarkup}

          <dl class="detail-meta-grid">
            ${buildMetaItem("연령", book.age)}
            ${buildMetaItem("분야", book.category)}
            ${buildMetaItem("발행일", book.publishDate)}
            ${buildMetaItem("페이지", book.pages)}
            ${buildMetaItem("정가", book.price)}
            ${buildMetaItem("ISBN", book.isbn)}
          </dl>

          <section class="detail-review-block reveal" id="review-curation">
            <div class="detail-review-head">
              <div>
                <div class="eyebrow">Review Curation</div>
                <h2>리뷰 모음</h2>
              </div>
              <p>온라인서점 리뷰와 블로그 후기를 나란히 두어, 평점 확인과 사진형 체험 후기를 한 번에 이어서 볼 수 있게 구성했습니다.</p>
            </div>
            <div class="review-link-grid">
              ${reviewLinks.map((item) => buildReviewCard(book, item)).join("")}
            </div>
          </section>
        </div>
      </section>

      <section class="detail-content-grid">
        <article class="detail-story-card reveal">
          <div class="eyebrow">Overview</div>
          <h3>책 소개</h3>
          ${storyParagraphs.map((paragraph) => `<p>${escapeDetailHtml(paragraph)}</p>`).join("")}
        </article>

        <div class="detail-side-stack">
          <article class="detail-info-card reveal">
            <div class="eyebrow">Point</div>
            <h3>이 책의 포인트</h3>
            <ul class="detail-point-list list-reset">
              ${(book.highlights || []).map((item) => `<li>${escapeDetailHtml(item)}</li>`).join("")}
            </ul>
          </article>

          <article class="detail-info-card reveal">
            <div class="eyebrow">Reader Guide</div>
            <h3>이런 독자에게 추천해요</h3>
            <ul class="detail-point-list list-reset">
              ${readerGuideItems.map((item) => `<li>${escapeDetailHtml(item)}</li>`).join("")}
            </ul>
            <div class="detail-guide-actions">
              <a class="detail-guide-link" href="#review-curation">리뷰 모음 보기</a>
              <a class="detail-guide-link is-soft" href="./books.html">비슷한 도서 더 보기</a>
            </div>
          </article>
        </div>
      </section>

      <section class="detail-related-block reveal">
        <div class="detail-related-head">
          <div>
            <div class="eyebrow">Related Books</div>
            <h3>함께 보면 좋은 도서</h3>
          </div>
          <a class="pill-link" href="./books.html">목록 더 보기</a>
        </div>
        <div class="related-book-grid">
          ${relatedMarkup}
        </div>
      </section>
    </article>
  `;

  document.title = `사파리 출판사 | ${book.title}`;
  hydrateResolvedBlogReviews();
}

if (!detailBook) {
  renderMissingState();
} else {
  renderDetailPage(detailBookId, detailBook);
}
