(function () {
  const audioItems = Array.isArray(window.safariAudioCatalog) ? window.safariAudioCatalog : [];
  const catalog = typeof window.getSafariMergedCatalog === "function" ? window.getSafariMergedCatalog() : {};
  const sampleMap = window.safariAudioSamples || {};
  const catalogEntries = Object.entries(catalog);
  const catalogByBookCode = new Map();
  const catalogByTitle = new Map();

  catalogEntries.forEach(([id, book]) => {
    const bookCode = extractBookCodeFromOfficialUrl(book?.officialUrl);
    const titleKey = normalizeTitle(book?.title);

    if (bookCode && !catalogByBookCode.has(bookCode)) {
      catalogByBookCode.set(bookCode, { id, book });
    }

    if (titleKey && !catalogByTitle.has(titleKey)) {
      catalogByTitle.set(titleKey, { id, book });
    }
  });

  const elements = {
    total: document.querySelector("[data-audio-total]"),
    mp3: document.querySelector("[data-audio-mp3-total]"),
    soundpen: document.querySelector("[data-audio-soundpen-total]"),
    series: document.querySelector("[data-audio-series-total]"),
    seriesFilters: document.querySelector("[data-audio-series-filters]"),
    search: document.querySelector("[data-audio-search]"),
    grid: document.querySelector("[data-audio-grid]"),
    count: document.querySelector("[data-audio-count]"),
    state: document.querySelector("[data-audio-state]"),
    loadMoreShell: document.querySelector("[data-audio-load-more-shell]"),
    loadMore: document.querySelector("[data-audio-load-more]"),
    empty: document.querySelector("[data-audio-empty]"),
    player: document.querySelector("[data-audio-player]"),
    playerType: document.querySelector("[data-player-type]"),
    playerTitle: document.querySelector("[data-player-title]"),
    playerMeta: document.querySelector("[data-player-meta]"),
    playerDescription: document.querySelector("[data-player-description]"),
    playerCover: document.querySelector("[data-player-cover]"),
    playerDetail: document.querySelector("[data-player-detail]"),
    playerOfficial: document.querySelector("[data-player-official]"),
    playerPrimary: document.querySelector("[data-player-primary]"),
    playerPreview: document.querySelector("[data-player-preview]"),
    playerDownload: document.querySelector("[data-player-download]"),
    playerStatus: document.querySelector("[data-player-status]"),
    playerChips: document.querySelector("[data-player-chips]"),
    playerAudioShell: document.querySelector("[data-player-audio-shell]"),
    playerAudio: document.querySelector("[data-player-audio]"),
  };

  const filterButtons = Array.from(document.querySelectorAll("[data-audio-filter]"));
  const state = {
    type: "all",
    series: "",
    search: "",
    limit: 24,
    activeId: "",
    previewDuration: 30,
  };

  function escapeMarkup(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function resolveAssetSource(value) {
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

    if (/^https?:\/\//i.test(source)) {
      const proxyTarget = source.replace(/^https?:\/\//i, "");
      return `https://images.weserv.nl/?url=${encodeURIComponent(proxyTarget)}`;
    }

    return source;
  }

  function getAudioDisplayLabel(audioType) {
    return audioType === "soundpen" ? "사운드펜" : "MP3 음원";
  }

  function normalizeTitle(value) {
    if (typeof window.normalizeSafariTitle === "function") {
      return window.normalizeSafariTitle(value);
    }

    return String(value || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "");
  }

  function extractBookCodeFromOfficialUrl(url) {
    if (typeof window.extractSafariBookCode === "function") {
      return window.extractSafariBookCode(url);
    }

    const match = String(url || "").match(/[?&]bookcode=(\d+)/i);
    return match ? match[1] : "";
  }

  function stripText(value) {
    return String(value || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function firstSentence(value) {
    const text = stripText(value);

    if (!text) {
      return "";
    }

    const match = text.match(/^(.{1,130}?[.!?]|.{1,130}?\uB2E4\.)/u);
    return match ? match[1].trim() : text.slice(0, 130).trim();
  }

  function findLinkedBook(item) {
    if (item.bookCode) {
      const exactMatch = catalogByBookCode.get(String(item.bookCode));

      if (exactMatch) {
        return exactMatch;
      }
    }

    const normalizedItemTitle = normalizeTitle(item.title);
    const fallbackMatch = catalogByTitle.get(normalizedItemTitle);

    if (fallbackMatch) {
      return fallbackMatch;
    }

    return { id: "", book: null };
  }

  function findSample(item) {
    if (item.bookCode && sampleMap[item.bookCode]) {
      return sampleMap[item.bookCode];
    }

    return null;
  }

  function buildSampleOnlyItems() {
    const existingCodes = new Set(audioItems.map((item) => String(item.bookCode || "")).filter(Boolean));

    return Object.entries(sampleMap)
      .filter(([bookCode, sample]) => bookCode && sample?.src && !existingCodes.has(String(bookCode)))
      .map(([bookCode, sample]) => {
        const linkedBook = catalogByBookCode.get(String(bookCode));
        const book = linkedBook?.book || null;

        return {
          id: `local-sample-${bookCode}`,
          title: book?.title || sample.title || "사파리 오디오북",
          audioType: "mp3",
          audioLabel: "MP3 음원",
          downloadDiv: "LOCAL",
          cardType: "book",
          bookCode: String(bookCode),
          seriesCode: "",
          cover: book?.cover || "",
          officialUrl: book?.officialUrl || "",
          page: 999,
        };
      })
      .sort((a, b) => {
        const aBook = catalogByBookCode.get(a.bookCode)?.book;
        const bBook = catalogByBookCode.get(b.bookCode)?.book;
        const aOrder = Number(aBook?.importOrder || 99999);
        const bOrder = Number(bBook?.importOrder || 99999);

        return aOrder - bOrder || a.title.localeCompare(b.title, "ko");
      });
  }

  function enhanceItem(item) {
    const linkedBook = findLinkedBook(item);
    const book = linkedBook.book;
    const audioLabel = getAudioDisplayLabel(item.audioType);
    const seriesName = stripText(book?.series) || (item.cardType === "series" ? item.title : "");
    const localUrl = linkedBook.id ? `./book-detail.html?book=${encodeURIComponent(linkedBook.id)}` : "";
    const sample = findSample(item);
    const description =
      firstSentence(book?.summary) ||
      firstSentence(book?.overview) ||
      firstSentence(book?.description) ||
      `${audioLabel}이 제공되는 사파리 공식 등록 도서입니다.`;

    return {
      ...item,
      audioLabel,
      linkedBookId: linkedBook.id,
      linkedBook: book,
      seriesName,
      localUrl,
      cover: book?.cover || resolveAssetSource(item.cover),
      description,
      sample,
      chips: [
        audioLabel,
        seriesName,
        sample ? "실제 MP3 재생 가능" : "",
        stripText(book?.age),
      ]
        .filter(Boolean)
        .slice(0, 4),
    };
  }

  const enhancedItems = [...audioItems, ...buildSampleOnlyItems()].map(enhanceItem);
  const itemMap = new Map(enhancedItems.map((item) => [item.id, item]));

  function getSeriesOptions() {
    const counts = new Map();

    enhancedItems.forEach((item) => {
      if (!item.seriesName) {
        return;
      }

      counts.set(item.seriesName, (counts.get(item.seriesName) || 0) + 1);
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko"))
      .slice(0, 12);
  }

  function getFilteredItems() {
    const searchTerm = state.search.trim().toLowerCase();

    return enhancedItems.filter((item) => {
      if (state.type !== "all" && item.audioType !== state.type) {
        return false;
      }

      if (state.series && item.seriesName !== state.series) {
        return false;
      }

      if (!searchTerm) {
        return true;
      }

      const haystack = [item.title, item.seriesName, item.description, item.audioLabel]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm);
    });
  }

  function stopCurrentAudio() {
    if (!elements.playerAudio) {
      return;
    }

    elements.playerAudio.pause();
  }

  function playSample(item) {
    if (!elements.playerAudio || !item?.sample?.src) {
      return;
    }

    if (elements.playerAudio.getAttribute("src") !== item.sample.src) {
      elements.playerAudio.src = item.sample.src;
      elements.playerAudio.load();
    }

    try {
      elements.playerAudio.currentTime = 0;
    } catch (error) {
      // ignore seeking errors before metadata is ready
    }

    const playAttempt = elements.playerAudio.play();

    if (elements.playerStatus) {
      elements.playerStatus.textContent = "30초 미리듣기를 재생하고 있어요.";
    }

    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(function () {
        if (elements.playerStatus) {
          elements.playerStatus.textContent = "브라우저에서 자동 재생을 막았어요. 아래 플레이어의 재생 버튼을 눌러 주세요.";
        }
      });
    }
  }

  function updatePlayer(item, shouldAutoplay) {
    const activeItem = item || itemMap.get(state.activeId) || enhancedItems.find((entry) => entry.sample) || enhancedItems[0];

    if (!activeItem) {
      return;
    }

    state.activeId = activeItem.id;

    if (elements.playerType) {
      elements.playerType.textContent = activeItem.audioLabel;
    }

    if (elements.playerTitle) {
      elements.playerTitle.textContent = activeItem.title;
    }

    if (elements.playerMeta) {
      elements.playerMeta.textContent =
        activeItem.seriesName || (activeItem.cardType === "series" ? "사파리 공식 시리즈 음원 자료" : "사파리 공식 음원 자료실");
    }

    if (elements.playerDescription) {
      elements.playerDescription.textContent = activeItem.description;
    }

    if (elements.playerCover) {
      elements.playerCover.src = activeItem.cover;
      elements.playerCover.alt = `${activeItem.title} 표지`;
    }

    if (elements.playerDetail) {
      if (activeItem.localUrl) {
        elements.playerDetail.href = activeItem.localUrl;
        elements.playerDetail.hidden = false;
      } else {
        elements.playerDetail.hidden = true;
      }
    }

    if (elements.playerChips) {
      elements.playerChips.innerHTML = activeItem.chips
        .map((chip) => `<span class="tag">${escapeMarkup(chip)}</span>`)
        .join("");
    }

    if (elements.playerPreview) {
      elements.playerPreview.hidden = !activeItem.sample;
    }

    if (elements.playerDownload) {
      if (activeItem.sample) {
        elements.playerDownload.hidden = false;
        elements.playerDownload.href = activeItem.sample.src;
        elements.playerDownload.setAttribute("download", "");
      } else {
        elements.playerDownload.hidden = true;
        elements.playerDownload.removeAttribute("href");
      }
    }

    if (elements.playerAudioShell && elements.playerAudio) {
      elements.playerAudioShell.hidden = true;

      if (activeItem.sample) {
        if (elements.playerAudio.getAttribute("src") !== activeItem.sample.src) {
          elements.playerAudio.src = activeItem.sample.src;
          elements.playerAudio.load();
        }
      } else {
        stopCurrentAudio();
        elements.playerAudio.removeAttribute("src");
        elements.playerAudio.load();
      }
    }

    if (elements.playerStatus) {
      elements.playerStatus.textContent = activeItem.sample
        ? "지금 선택한 책은 실제 사파리 MP3가 연결되어 있습니다. 30초 미리듣기와 다운로드를 따로 사용할 수 있어요."
        : "이 책은 현재 샘플 MP3가 아직 연결되지 않았습니다. 공식 자료실에서 이어서 확인할 수 있어요.";
    }

    if (shouldAutoplay && activeItem.sample) {
      playSample(activeItem);
    }
  }

  function renderSeriesFilters() {
    if (!elements.seriesFilters) {
      return;
    }

    const options = getSeriesOptions();
    const buttons = [
      `<button class="audio-series-pill${state.series ? "" : " is-active"}" type="button" data-audio-series="">전체 시리즈</button>`,
      ...options.map(
        ([seriesName, count]) =>
          `<button class="audio-series-pill${state.series === seriesName ? " is-active" : ""}" type="button" data-audio-series="${escapeMarkup(
            seriesName
          )}">${escapeMarkup(seriesName)} <span>${count}</span></button>`
      ),
    ];

    elements.seriesFilters.innerHTML = buttons.join("");
  }

  function renderGrid() {
    if (!elements.grid) {
      return;
    }

    const filteredItems = getFilteredItems();
    const visibleItems = filteredItems.slice(0, state.limit);

    if (elements.count) {
      elements.count.textContent = `${filteredItems.length}개의 사파리 음원 자료를 보고 있어요`;
    }

    if (elements.state) {
      const stateText = [
        state.type === "all" ? "전체" : state.type === "mp3" ? "MP3 음원" : "사운드펜 음원",
        state.series ? `시리즈: ${state.series}` : "",
        state.search ? `검색어: “${state.search}”` : "",
      ]
        .filter(Boolean)
        .join(" · ");

      elements.state.textContent = stateText || "공식 자료실 기준으로 정리된 목록이에요.";
    }

    elements.grid.innerHTML = visibleItems
      .map((item) => {
        const isActive = state.activeId === item.id;

        return `
          <article class="audio-library-card${isActive ? " is-active" : ""}">
            <button class="audio-library-cover" type="button" data-audio-select="${escapeMarkup(item.id)}" aria-label="${escapeMarkup(item.title)} 선택">
              <img src="${escapeMarkup(item.cover)}" alt="${escapeMarkup(item.title)} 표지" loading="lazy" />
            </button>
            <div class="audio-library-copy">
              <div class="audio-library-topline">
                <span class="catalog-meta-chip">${escapeMarkup(item.audioLabel)}</span>
                ${item.seriesName ? `<span class="catalog-meta-chip is-subtle">${escapeMarkup(item.seriesName)}</span>` : ""}
                ${item.sample ? `<span class="catalog-meta-chip is-subtle">샘플 재생</span>` : ""}
              </div>
              <strong>${escapeMarkup(item.title)}</strong>
              <p>${escapeMarkup(item.description)}</p>
            </div>
            <div class="audio-library-actions">
              <button class="catalog-cta" type="button" data-audio-select="${escapeMarkup(item.id)}">${item.sample ? "30초 미리듣기" : "정보 보기"}</button>
              ${item.localUrl ? `<a class="catalog-meta-chip is-link" href="${escapeMarkup(item.localUrl)}">도서 페이지</a>` : ""}
            </div>
          </article>
        `;
      })
      .join("");

    if (elements.loadMoreShell) {
      elements.loadMoreShell.hidden = visibleItems.length >= filteredItems.length;
    }

    if (elements.empty) {
      elements.empty.hidden = filteredItems.length > 0;
    }
  }

  function renderStats() {
    if (elements.total) {
      elements.total.textContent = `${enhancedItems.length}개`;
    }

    if (elements.mp3) {
      elements.mp3.textContent = `${enhancedItems.filter((item) => item.audioType === "mp3").length}개`;
    }

    if (elements.soundpen) {
      elements.soundpen.textContent = `${enhancedItems.filter((item) => item.audioType === "soundpen").length}개`;
    }

    if (elements.series) {
      elements.series.textContent = `${getSeriesOptions().length}개`;
    }
  }

  function setType(nextType) {
    state.type = nextType;
    state.limit = 24;

    filterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.audioFilter === nextType);
    });

    renderSeriesFilters();
    renderGrid();
  }

  function bindEvents() {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        setType(button.dataset.audioFilter || "all");
      });
    });

    document.addEventListener("click", function (event) {
      const selectTarget = event.target.closest("[data-audio-select]");

      if (selectTarget) {
        const item = itemMap.get(selectTarget.getAttribute("data-audio-select"));

        if (item) {
          updatePlayer(item, true);
          renderGrid();
        }
      }

      const seriesTarget = event.target.closest("[data-audio-series]");

      if (seriesTarget) {
        state.series = seriesTarget.getAttribute("data-audio-series") || "";
        state.limit = 24;
        renderSeriesFilters();
        renderGrid();
      }
    });

    elements.playerPreview?.addEventListener("click", function () {
      const activeItem = itemMap.get(state.activeId);

      if (activeItem?.sample) {
        playSample(activeItem);
      }
    });

    elements.search?.addEventListener("input", function (event) {
      state.search = event.target.value || "";
      state.limit = 24;
      renderGrid();
    });

    elements.loadMore?.addEventListener("click", function () {
      state.limit += 24;
      renderGrid();
    });

    elements.playerAudio?.addEventListener("timeupdate", function () {
      if (elements.playerAudio.currentTime >= state.previewDuration) {
        elements.playerAudio.pause();
        try {
          elements.playerAudio.currentTime = 0;
        } catch (error) {
          // ignore
        }

        if (elements.playerStatus) {
          elements.playerStatus.textContent = "30초 미리듣기가 끝났어요. 다시 듣거나 다운로드를 이용해 주세요.";
        }
      }
    });
  }

  renderStats();
  renderSeriesFilters();
  renderGrid();
  updatePlayer(enhancedItems.find((item) => item.sample) || enhancedItems[0], false);
  bindEvents();
})();
