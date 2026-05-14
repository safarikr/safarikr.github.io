function buildSmartStoreSearchUrl(query) {
  return `https://smartstore.naver.com/epublic5131/search?q=${encodeURIComponent(query)}`;
}

function buildNaverBlogSearchUrl(query) {
  return `https://search.naver.com/search.naver?where=blog&sm=tab_jum&query=${encodeURIComponent(query)}`;
}

function normalizeBlogReviewQuery(query) {
  return String(query || "")
    .replace(/\s+사파리\s*$/u, "")
    .trim();
}

function buildYes24GoodsUrl(goodsId) {
  return `https://www.yes24.com/product/goods/${goodsId}`;
}

const reviewPhotoThumbnailByGoodsId = {
  "34890837": "./assets/reviews/yes24-34890837.jpg",
  "24624678": "https://image.yes24.com/goods/24624678/XL",
  "120254237": "https://image.yes24.com/goods/120254237/XL",
  "75227421": "./assets/reviews/yes24-75227421.jpg",
  "28066312": "./assets/reviews/yes24-28066312.jpg",
  "99112574": "./assets/reviews/yes24-99112574.jpg",
  "143896312": "./assets/reviews/yes24-143896312.jpg",
  "147561016": "./assets/reviews/yes24-147561016.jpg",
  "151353660": "./assets/reviews/yes24-151353660.jpg",
  "168457218": "./assets/reviews/yes24-168457218.jpg",
  "146902377": "./assets/reviews/yes24-146902377.jpg",
  "147562166": "./assets/reviews/yes24-147562166.jpg",
  "146902376": "./assets/reviews/yes24-146902376.jpg",
  "124640001": "./assets/reviews/yes24-124640001.jpg",
  "125076050": "./assets/reviews/yes24-125076050.jpg",
  "125970791": "./assets/reviews/yes24-125970791.jpg",
  "153263385": "./assets/reviews/yes24-153263385.jpg",
  "104195170": "./assets/reviews/yes24-104195170.jpg",
  "97964127": "https://image.yes24.com/goods/97964127/XL",
  "37862049": "./assets/reviews/yes24-37862049.jpg",
  "143896277": "./assets/reviews/yes24-143896277.jpg",
};

const reviewPhotoThumbnailByQuery = {
  "24분 편의점 1호 사파리": "./assets/reviews/blog-24store-1.jpg",
  "24분 편의점 2호 사파리": "./assets/reviews/blog-24store-2.jpg",
  "24분 편의점 3호 사파리": "./assets/reviews/blog-24store-3.jpg",
  "내가 정말정말 좋아하는 빨간 장화 사파리": "./assets/reviews/blog-macmillan-red-boots.jpg",
  "나는 이 닦기가 정말정말 싫어요 사파리": "./assets/reviews/blog-macmillan-brush-teeth.jpg",
  "눈이 좋아 사파리": "./assets/reviews/blog-macmillan-snow.jpg",
  "공포의 노트 1 사파리": "./assets/reviews/blog-horror-note-1.jpg",
  "공포의 노트 2 사파리": "./assets/reviews/blog-horror-note-2.jpg",
  "공포의 노트 3 사파리": "./assets/reviews/blog-horror-note-3.jpg",
  "100층 버스 사파리": "./assets/reviews/blog-hundred-bus.jpg",
  "100층 로켓 사파리": "./assets/reviews/blog-hundred-rocket.jpg",
  "긴급 출동 공룡구급대 사파리": "./assets/reviews/blog-dino-ambulance.jpg",
  "붕붕이와 신나는 공룡 나라로 사파리": "./assets/reviews/blog-dino-bungbung.jpg",
  "우리는 아기 공룡 사파리": "./assets/reviews/blog-dino-baby.jpg",
};

const blogReviewByQuery = {
  "24분 편의점 1호 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=asdf3763&logNo=224009965495",
    thumbnail: "./assets/reviews/blog-24store-1.jpg",
    meta: "blog.naver.com/asdf3763",
  },
  "24분 편의점 2호 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=asca1129&logNo=223982722055",
    thumbnail: "./assets/reviews/blog-24store-2.jpg",
    meta: "blog.naver.com/asca1129",
  },
  "24분 편의점 3호 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=dreaming-mj&logNo=224130834715",
    thumbnail: "./assets/reviews/blog-24store-3.jpg",
    meta: "blog.naver.com/dreaming-mj",
  },
  "내가 정말정말 좋아하는 빨간 장화 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=aji1991&logNo=223902799560",
    thumbnail: "./assets/reviews/blog-macmillan-red-boots.jpg",
    meta: "blog.naver.com/aji1991",
  },
  "나는 이 닦기가 정말정말 싫어요 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=botepretty&logNo=223989966263",
    thumbnail: "./assets/reviews/blog-macmillan-brush-teeth.jpg",
    meta: "blog.naver.com/botepretty",
  },
  "눈이 좋아 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=bada_home_&logNo=223901688412",
    thumbnail: "./assets/reviews/blog-macmillan-snow.jpg",
    meta: "blog.naver.com/bada_home_",
  },
  "공포의 노트 1 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=archive_books&logNo=223315185510",
    thumbnail: "./assets/reviews/blog-horror-note-1.jpg",
    meta: "blog.naver.com/archive_books",
  },
  "공포의 노트 2 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=2173286&logNo=223415511684",
    thumbnail: "./assets/reviews/blog-horror-note-2.jpg",
    meta: "blog.naver.com/2173286",
  },
  "공포의 노트 3 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=315as&logNo=223427134343",
    thumbnail: "./assets/reviews/blog-horror-note-3.jpg",
    meta: "blog.naver.com/315as",
  },
  "100층 버스 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=booksabouttruelove&logNo=223008772858",
    thumbnail: "./assets/reviews/blog-hundred-bus.jpg",
    meta: "blog.naver.com/booksabouttruelove",
  },
  "100층 로켓 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=gytmd3412&logNo=222555559826",
    thumbnail: "./assets/reviews/blog-hundred-rocket.jpg",
    meta: "blog.naver.com/gytmd3412",
  },
  "긴급 출동 공룡구급대 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=412hana&logNo=223728106075",
    thumbnail: "./assets/reviews/blog-dino-ambulance.jpg",
    meta: "blog.naver.com/412hana",
  },
  "붕붕이와 신나는 공룡 나라로 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=black457&logNo=222717724708",
    thumbnail: "./assets/reviews/blog-dino-bungbung.jpg",
    meta: "blog.naver.com/black457",
  },
  "우리는 아기 공룡 사파리": {
    url: "https://m.blog.naver.com/PostView.naver?blogId=cgu0618&logNo=223843669182",
    thumbnail: "./assets/reviews/blog-dino-baby.jpg",
    meta: "blog.naver.com/cgu0618",
  },
};

function buildStoreReview(goodsId, title, description, thumbnail) {
  const resolvedThumbnail = reviewPhotoThumbnailByGoodsId[goodsId] || thumbnail;

  return {
    platform: "YES24 회원리뷰",
    eyebrow: "온라인서점",
    title,
    label: "예스24 리뷰 열기",
    description,
    url: `https://m.yes24.com/Goods/Review/${goodsId}`,
    thumbnail: resolvedThumbnail,
    meta: "m.yes24.com · 회원리뷰",
  };
}

function buildBlogReview(query, title, description, thumbnail) {
  const resolvedReview = blogReviewByQuery[query];
  const searchTitle = normalizeBlogReviewQuery(query);
  const resolvedThumbnail =
    resolvedReview?.thumbnail ||
    reviewPhotoThumbnailByQuery[query] ||
    reviewPhotoThumbnailByQuery[searchTitle] ||
    thumbnail;
  const resolvedUrl = resolvedReview?.url || buildNaverBlogSearchUrl(searchTitle);
  const resolvedMeta = resolvedReview?.meta || "search.naver.com · 블로그 검색";
  const resolvedLabel = resolvedReview ? "블로그 후기 열기" : "블로그 후기 찾기";

  const review = {
    platform: "네이버 블로그",
    eyebrow: "블로그 모아보기",
    title,
    label: resolvedLabel,
    description,
    url: resolvedUrl,
    thumbnail: resolvedThumbnail,
    meta: resolvedMeta,
  };

  if (!resolvedReview && searchTitle) {
    review.resolveTitle = searchTitle;
  }

  return review;
}

window.bookCatalog = {
  "karel-sound": {
    title: "쫑긋쫑긋 무슨 소리일까?",
    series: "내 친구 카렐",
    author: "리즈벳 슬래거스",
    translator: "장미란",
    publisher: "사파리",
    age: "영아 · 유아",
    filters: ["baby", "preschool"],
    category: "외국창작 그림책",
    publishDate: "2016년 12월 19일",
    isbn: "9791160570397",
    pages: "32쪽",
    price: "12,000원",
    cover: "https://image.yes24.com/goods/34890837/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500403400017",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%AB%91%EA%B8%8B%EC%AB%91%EA%B8%8B%20%EB%AC%B4%EC%8A%A8%20%EC%86%8C%EB%A6%AC%EC%9D%BC%EA%B9%8C",
    summary:
      "귀로 듣고 손으로 만지며 내 몸과 세상을 알아가는 오감 놀이 그림책입니다.",
    overview:
      "아이들이 생활 속 소리와 촉감을 자연스럽게 발견하도록 이끄는 체험형 그림책입니다. 집 안과 바깥에서 만나는 익숙한 장면을 따라가며 듣고, 만지고, 반응하는 흐름이 부드럽게 이어져 처음 펼쳐 보기에도 부담이 적습니다.",
    description:
      "집 안과 바깥에서 들리는 다양한 소리, 손끝으로 느끼는 여러 촉감을 통해 아이가 세상을 배우는 흐름을 담아낸 책입니다. 사운드펜과 함께 활용하기 좋아 도서 체험형 상세 페이지로 연결했을 때 강점이 분명한 도서입니다.",
    highlights: ["사운드펜 적용 도서", "오감 놀이", "3~5세 추천"],
    reviewLinks: [
      {
        platform: "YES24 회원리뷰",
        eyebrow: "온라인서점",
        title: "예스24에서 구매자 리뷰 보기",
        label: "예스24 리뷰 열기",
        description: "별점과 포토 리뷰를 한 화면에서 바로 확인할 수 있습니다.",
        url: "https://m.yes24.com/Goods/Review/34890837",
        thumbnail: "./assets/reviews/yes24-34890837.jpg",
        meta: "m.yes24.com · 회원리뷰",
      },
      {
        platform: "네이버 블로그",
        eyebrow: "실사용 후기",
        title: "육아 기록형 블로그 후기",
        label: "블로그 후기 열기",
        description: "읽은 뒤 반응과 집에서의 활용 장면이 함께 담긴 후기입니다.",
        url: "https://blog.naver.com/iamyh36/220945258489",
        thumbnail: "./assets/reviews/blog-karel.jpg",
        meta: "blog.naver.com/iamyh36",
      },
      {
        platform: "YES24 독자 후기",
        eyebrow: "사진형 후기",
        title: "야호! 야호! 봄이 왔나 봐! 독자 후기 보기",
        label: "독자 후기 열기",
        description: "책 사진과 함께 봄 그림책 반응을 자세히 적어 둔 실제 독자 후기로 바로 이동합니다.",
        url: "https://sarak.yes24.com/review/21200011",
        thumbnail: "./assets/reviews/spring-yahoo-reader.jpg",
        meta: "sarak.yes24.com · 독자 후기",
      },
    ],
    related: ["world-culture", "franny-2", "one-voice"],
  },
  "world-culture": {
    title: "나는 알아요! : 세계의 문화",
    series: "나는 알아요!",
    author: "레이나 올리비에",
    illustrator: "엘린 반 린덴후이젠",
    translator: "우순교",
    publisher: "사파리",
    age: "초등저",
    filters: ["elementary"],
    category: "지식/교양 · 외국창작 그림책",
    publishDate: "2014년 2월 28일",
    isbn: "9791155091838",
    pages: "38쪽",
    price: "12,000원",
    cover: "https://image.yes24.com/goods/24624678/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500403800017",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EB%82%98%EB%8A%94%20%EC%95%8C%EC%95%84%EC%9A%94%20%EC%84%B8%EA%B3%84%EC%9D%98%20%EB%AC%B8%ED%99%94",
    summary:
      "세계 여러 나라의 문화를 어린이 시선으로 소개하는 지식 그림책입니다.",
    overview:
      "낯선 나라의 문화를 어렵게 설명하기보다, 또래 아이들의 일상과 시선으로 친근하게 보여 주는 지식 그림책입니다. 아시아, 아프리카, 유럽, 아메리카의 친구들이 스스로 자신의 문화를 들려주는 형식이라 읽는 동안 자연스럽게 세계를 넓게 바라보게 됩니다.",
    description:
      "아시아, 아프리카, 유럽, 아메리카 등 여러 대륙의 친구들이 직접 자신의 문화를 들려주는 형식으로 구성되어 있습니다. 낯선 세계를 친근하게 접하게 해 주고, MP3 음원과 함께 확장해 보기에도 좋은 대표 도서입니다.",
    highlights: ["세계 문화 입문", "MP3 음원 안내", "초등저 추천"],
    reviewLinks: [
      {
        platform: "YES24 회원리뷰",
        eyebrow: "온라인서점",
        title: "예스24에서 구매자 리뷰 보기",
        label: "예스24 리뷰 열기",
        description: "세계 문화 입문용으로 본 반응과 포토 후기를 확인할 수 있습니다.",
        url: "https://m.yes24.com/Goods/Review/24624678",
        thumbnail: "https://image.yes24.com/goods/24624678/XL",
        meta: "m.yes24.com · 회원리뷰",
      },
      {
        platform: "네이버 블로그",
        eyebrow: "독후활동 후기",
        title: "활동 연계가 돋보이는 블로그 후기",
        label: "블로그 후기 열기",
        description: "세계 지도와 함께 읽고 독후활동으로 확장한 실제 후기를 연결했습니다.",
        url: "https://blog.naver.com/lng191209/224021884447",
        thumbnail: "./assets/reviews/blog-world-culture.jpg",
        meta: "blog.naver.com/lng191209",
      },
    ],
    related: ["karel-sound", "one-voice", "geronimo-1"],
  },
  "geronimo-1": {
    title: "제로니모의 환상 모험 1",
    subtitle: "쥐라기로 떠나는 시간 여행",
    series: "제로니모의 환상 모험",
    author: "제로니모 스틸턴",
    translator: "김영선",
    publisher: "사파리",
    age: "초등저",
    filters: ["elementary", "series"],
    category: "읽기/문학 · 지식/교양",
    publishDate: "2008년 12월 15일",
    isbn: "9788962245202",
    pages: "404쪽",
    price: "17,900원",
    cover: "https://image.yes24.com/goods/120254237/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500430900001",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%A0%9C%EB%A1%9C%EB%8B%88%EB%AA%A8%EC%9D%98%20%ED%99%98%EC%83%81%20%EB%AA%A8%ED%97%98%201",
    summary:
      "공룡과 시간 여행, 모험이 한 권에 응축된 사파리 대표 읽기 시리즈입니다.",
    description:
      "풍부한 삽화와 빠른 전개 덕분에 긴 호흡의 읽기로 자연스럽게 넘어가게 돕는 장편 읽기책입니다. 시간 여행이라는 소재가 강하게 살아 있어 시리즈 입문용으로 보여 주기 좋고, 상세 페이지에서도 몰입감을 만들기 쉬운 도서입니다.",
    highlights: ["장편 읽기책", "시간 여행", "시리즈 입문 권"],
    reviewLinks: [
      {
        platform: "YES24 회원리뷰",
        eyebrow: "온라인서점",
        title: "예스24에서 시리즈 반응 보기",
        label: "예스24 리뷰 열기",
        description: "긴 호흡의 읽기책으로 넘어갈 때의 반응과 평점을 살펴볼 수 있습니다.",
        url: "https://m.yes24.com/Goods/Review/120254237",
        thumbnail: "https://image.yes24.com/goods/120254237/XL",
        meta: "m.yes24.com · 회원리뷰",
      },
      {
        platform: "네이버 블로그",
        eyebrow: "읽기 몰입 후기",
        title: "제로니모의 환상모험 1 블로그 후기",
        label: "블로그 후기 열기",
        description: "초등 읽기책으로 넘어갈 때의 반응과 실제 읽기 흐름을 담은 후기입니다.",
        url: "https://m.blog.naver.com/PostView.naver?blogId=drk919&logNo=223759834314",
        thumbnail: "./assets/reviews/blog-geronimo-1.jpg",
        meta: "blog.naver.com/drk919",
      },
    ],
    related: ["geronimo-9", "geronimo-22", "geronimo-28"],
  },
  "geronimo-9": {
    title: "제로니모의 환상 모험 9",
    subtitle: "영웅 오디세우스의 아주 특별한 모험",
    series: "제로니모의 환상 모험",
    author: "제로니모 스틸턴",
    translator: "성초림",
    publisher: "사파리",
    age: "초등저",
    filters: ["elementary", "series"],
    category: "읽기/문학 · 지식/교양",
    publishDate: "2010년 12월 10일",
    isbn: "9788964802472",
    pages: "380쪽",
    price: "17,900원",
    cover: "https://image.yes24.com/goods/140658290/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500430900010",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%A0%9C%EB%A1%9C%EB%8B%88%EB%AA%A8%EC%9D%98%20%ED%99%98%EC%83%81%20%EB%AA%A8%ED%97%98%209",
    summary:
      "그리스 신화와 모험 서사가 만나는 장편 읽기책으로, 시리즈 중에서도 읽는 재미가 또렷한 권입니다.",
    description:
      "오디세우스 이야기를 바탕으로 한 판타지 모험이 이어져서 역사와 신화 소재를 자연스럽게 접하기 좋습니다. 읽기책으로 넘어가는 초등 독자에게 분량감은 있으면서도 전개가 빨라, 시리즈 확장용으로 배치하기 좋습니다.",
    highlights: ["신화 모험", "장편 읽기책", "초등저 추천"],
    reviewLinks: [
      buildStoreReview(
        "140658290",
        "예스24에서 9권 반응 보기",
        "장편 판타지와 신화 소재가 어떤 반응을 얻었는지 온라인서점 리뷰에서 살펴볼 수 있습니다.",
        "https://image.yes24.com/goods/140658290/XL"
      ),
      buildBlogReview(
        "제로니모의 환상 모험 9 사파리",
        "네이버 블로그에서 시리즈 후기 더 보기",
        "같은 시리즈를 읽은 반응과 독서 흐름을 블로그 검색으로 이어 볼 수 있습니다.",
        "./assets/reviews/blog-geronimo-1.jpg"
      ),
    ],
    related: ["geronimo-1", "geronimo-22", "geronimo-28"],
  },
  "geronimo-11": {
    title: "제로니모의 환상 모험 11",
    subtitle: "고대 크리스털의 예언과 판타지 세계 대 결전",
    series: "제로니모의 환상 모험",
    author: "제로니모 스틸턴",
    publisher: "사파리",
    age: "초등저 · 초등고",
    filters: ["elementary", "series"],
    category: "읽기/문학 · 지식/교양",
    publishDate: "2024년 7월 10일",
    isbn: "9791169517270",
    pages: "384쪽",
    cover: "https://image.yes24.com/goods/127160174/XL",
    officialUrl: "https://www.yes24.com/product/goods/127160174",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%A0%9C%EB%A1%9C%EB%8B%88%EB%AA%A8%EC%9D%98%20%ED%99%98%EC%83%81%20%EB%AA%A8%ED%97%98%2011",
    summary:
      "판타지 세계의 예언과 대결 구도가 살아 있어 시리즈의 스케일을 느끼기 좋은 권입니다.",
    description:
      "위기감 있는 전개와 판타지 세계의 확장이 크게 살아 있는 권이라, 제로니모 시리즈를 좋아하는 독자가 다음 단계로 넘어가기에 좋습니다. 긴 분량에도 사건이 빠르게 이어져 책 읽는 호흡을 끌어올리기 좋습니다.",
    highlights: ["판타지 대결", "시리즈 확장", "초등 몰입 독서"],
    reviewLinks: [
      buildStoreReview(
        "127160174",
        "예스24에서 11권 반응 보기",
        "시리즈 중후반 권의 몰입감과 전개에 대한 반응을 온라인서점 리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/127160174/XL"
      ),
      buildBlogReview(
        "제로니모의 환상 모험 11 사파리",
        "네이버 블로그에서 시리즈 후기 더 보기",
        "같은 시리즈 독서 반응과 분위기를 블로그 검색으로 함께 살펴볼 수 있습니다.",
        "./assets/reviews/blog-geronimo-1.jpg"
      ),
    ],
    related: ["geronimo-1", "geronimo-22", "geronimo-28"],
  },
  "geronimo-22": {
    title: "제로니모의 환상 모험 22",
    subtitle: "파프프프로 사라진 요정 여왕님과 세 가지 마법의 보물",
    series: "제로니모의 환상 모험",
    author: "제로니모 스틸턴",
    translator: "이승수",
    publisher: "사파리",
    age: "초등저 · 초등고",
    filters: ["elementary", "series"],
    category: "읽기/문학 · 지식/교양",
    publishDate: "2015년 5월 6일",
    isbn: "9791155094716",
    pages: "380쪽",
    price: "17,900원",
    cover: "https://image.yes24.com/goods/142210979/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500430900023",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%A0%9C%EB%A1%9C%EB%8B%88%EB%AA%A8%EC%9D%98%20%ED%99%98%EC%83%81%20%EB%AA%A8%ED%97%98%2022",
    summary:
      "사라진 요정 여왕님과 마법의 보물을 찾는 모험이 펼쳐지는, 판타지 세계관 중심의 장편 읽기책입니다.",
    description:
      "요정 여왕님과 세 가지 보물을 둘러싼 사건이 이어져 판타지 세계 설정을 좋아하는 독자에게 특히 잘 맞습니다. 시리즈 중후반 권답게 세계관의 깊이가 살아 있고, 이야기만으로도 충분한 몰입감을 줍니다.",
    highlights: ["판타지 세계관", "마법 모험", "초등 장편 독서"],
    reviewLinks: [
      buildStoreReview(
        "142210979",
        "예스24에서 22권 반응 보기",
        "중후반 권까지 따라 읽은 독자들이 남긴 반응을 온라인서점 리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/142210979/XL"
      ),
      buildBlogReview(
        "제로니모의 환상 모험 22 사파리",
        "네이버 블로그에서 시리즈 후기 더 보기",
        "같은 시리즈 후기와 독서 반응을 블로그 검색으로 이어 볼 수 있습니다.",
        "./assets/reviews/blog-geronimo-1.jpg"
      ),
    ],
    related: ["geronimo-1", "geronimo-11", "geronimo-28"],
  },
  "geronimo-28": {
    title: "제로니모의 환상 모험 28",
    subtitle: "아기 공룡의 가족을 찾아 떠나는 시간 여행",
    series: "제로니모의 환상 모험",
    author: "제로니모 스틸턴",
    translator: "이승수",
    publisher: "사파리",
    age: "초등저 · 초등고",
    filters: ["elementary", "series"],
    category: "읽기/문학 · 지식/교양",
    publishDate: "2018년 12월 15일",
    isbn: "9791160574470",
    pages: "348쪽",
    price: "17,900원",
    cover: "https://image.yes24.com/goods/67485564/XL",
    officialUrl: "https://m.safaribook.co.kr/book/list_detail.asp?bookcode=1500430800319",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%A0%9C%EB%A1%9C%EB%8B%88%EB%AA%A8%EC%9D%98%20%ED%99%98%EC%83%81%20%EB%AA%A8%ED%97%98%2028",
    summary:
      "아기 공룡과 함께 시간 여행을 떠나는 이야기로, 공룡과 모험을 함께 좋아하는 아이에게 특히 잘 맞는 권입니다.",
    description:
      "공룡 시대와 시간 여행 요소가 함께 살아 있어서 제로니모 시리즈 안에서도 주제가 선명한 편입니다. 시리즈의 장편 호흡은 유지하면서도 사건이 빠르게 전개돼 몰입하기 좋고, 공룡 키워드 덕분에 관심을 끌기 쉽습니다.",
    highlights: ["공룡 모험", "시간 여행", "장편 읽기책"],
    reviewLinks: [
      buildStoreReview(
        "67485564",
        "예스24에서 28권 반응 보기",
        "공룡 소재와 장편 판타지 조합이 어떤 반응을 얻었는지 온라인서점 리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/67485564/XL"
      ),
      buildBlogReview(
        "제로니모의 환상 모험 28 사파리",
        "네이버 블로그에서 시리즈 후기 더 보기",
        "같은 시리즈 독서 반응과 사진 후기를 블로그 검색으로 이어 볼 수 있습니다.",
        "./assets/reviews/blog-geronimo-1.jpg"
      ),
    ],
    related: ["geronimo-22", "geronimo-1", "dino-ambulance"],
  },
  "franny-2": {
    title: "엽기 과학자 프래니 2",
    subtitle: "거인 큐피드의 공격",
    series: "엽기 과학자 프래니",
    author: "짐 벤튼",
    translator: "박수현",
    publisher: "사파리",
    age: "유아 · 초등저",
    filters: ["preschool", "elementary", "series"],
    category: "읽기/문학",
    publishDate: "2019년 6월 20일",
    isbn: "9791160575279",
    pages: "116쪽",
    price: "11,000원",
    cover: "https://image.yes24.com/goods/75227421/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500401100202",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%97%BD%EA%B8%B0%20%EA%B3%BC%ED%95%99%EC%9E%90%20%ED%94%84%EB%9E%98%EB%8B%88%202",
    summary:
      "엉뚱한 과학 소녀 프래니의 좌충우돌 실험을 유쾌하게 담은 읽기책입니다.",
    description:
      "우정과 상상력, 과학적 호기심을 한 번에 건드리는 챕터북 흐름이 잘 살아 있습니다. 저학년이 스스로 읽기 시작할 때 부담 없이 집어 들기 좋고, 시리즈 진입 장벽이 낮아 반응을 모으기 좋은 도서입니다.",
    highlights: ["챕터북 입문", "유머와 과학", "시리즈 도서"],
    reviewLinks: [
      {
        platform: "YES24 회원리뷰",
        eyebrow: "온라인서점",
        title: "예스24에서 챕터북 반응 보기",
        label: "예스24 리뷰 열기",
        description: "저학년 입문용으로 어떤 점이 좋았는지 실제 구매 후기를 볼 수 있습니다.",
        url: "https://m.yes24.com/Goods/Review/75227421",
        thumbnail: "./assets/reviews/yes24-75227421.jpg",
        meta: "m.yes24.com · 회원리뷰",
      },
      {
        platform: "네이버 블로그",
        eyebrow: "포토 후기",
        title: "표지와 내지 사진이 예쁜 블로그 후기",
        label: "블로그 후기 열기",
        description: "책 분위기와 읽는 연령대를 가볍게 가늠해 보기 좋은 후기입니다.",
        url: "https://blog.naver.com/flora303/222738150585",
        thumbnail: "./assets/reviews/blog-franny-2.jpg",
        meta: "blog.naver.com/flora303",
      },
    ],
    related: ["karel-sound", "geronimo-1", "lemoncello"],
  },
  lemoncello: {
    title: "레몬첼로 도서관 탈출 게임",
    series: "레몬첼로 도서관",
    author: "크리스 그라번스타인",
    translator: "정회성",
    publisher: "사파리",
    age: "초등고",
    filters: ["elementary", "series"],
    category: "읽기/문학",
    publishDate: "2016년 5월 30일",
    isbn: "9791160572643",
    pages: "408쪽",
    price: "13,000원",
    cover: "https://image.yes24.com/goods/28066312/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500430800010",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EB%A0%88%EB%AA%AC%EC%B2%BC%EB%A1%9C%20%EB%8F%84%EC%84%9C%EA%B4%80%20%ED%83%88%EC%B6%9C%20%EA%B2%8C%EC%9E%84",
    summary:
      "도서관을 무대로 퍼즐과 모험이 이어지는 사파리 대표 베스트 읽기책입니다.",
    overview:
      "하룻밤 동안 도서관 안에서 펼쳐지는 탈출 게임을 따라가며 퍼즐, 미션, 추리의 재미를 촘촘히 쌓아 가는 장편 읽기책입니다. 책장을 넘길수록 단서가 이어지고 사건이 커져서 긴 호흡의 읽기에도 몰입감을 유지하기 좋습니다.",
    description:
      "최첨단 도서관에서 하룻밤 동안 펼쳐지는 탈출 미션을 그린 이야기로, 게임 같은 전개와 빠른 몰입감이 강점입니다. 책과 게임을 동시에 좋아하는 독자에게 반응이 좋아 상세 페이지에 리뷰 흐름을 붙였을 때 특히 잘 어울립니다.",
    highlights: ["퍼즐형 모험", "초등고 추천", "베스트 시리즈"],
    reviewLinks: [
      {
        platform: "YES24 회원리뷰",
        eyebrow: "온라인서점",
        title: "예스24에서 장편 모험 리뷰 보기",
        label: "예스24 리뷰 열기",
        description: "몰입감과 난이도에 대한 실제 반응을 온라인서점 리뷰에서 확인할 수 있습니다.",
        url: "https://m.yes24.com/Goods/Review/28066312",
        thumbnail: "./assets/reviews/yes24-28066312.jpg",
        meta: "m.yes24.com · 회원리뷰",
      },
      {
        platform: "네이버 블로그",
        eyebrow: "블로그 모아보기",
        title: "네이버 블로그에서 관련 후기 더 보기",
        label: "블로그 후기 열기",
        description: "책 소개와 함께 실제로 읽은 느낌을 정리한 블로그 후기를 연결했습니다.",
        url: "https://m.blog.naver.com/PostView.naver?blogId=dotoribang&logNo=220757294811",
        thumbnail: "./assets/reviews/blog-lemoncello.jpg",
        meta: "blog.naver.com/dotoribang",
      },
    ],
    related: ["geronimo-1", "franny-2", "one-voice"],
  },
  "one-voice": {
    title: "세상을 바꾸는 하나의 목소리",
    series: "",
    author: "에밀리 하워스부스",
    translator: "김은정",
    publisher: "사파리",
    age: "초등고 · 청소년",
    filters: ["elementary"],
    category: "지식/교양",
    publishDate: "2021년 3월 30일",
    isbn: "9791166372421",
    pages: "40쪽",
    price: "13,500원",
    cover: "https://image.yes24.com/goods/99112574/XL",
    officialUrl: "https://www.safaribook.co.kr/book/list_detail.asp?bookcode=1500430700001",
    storeUrl:
      "https://smartstore.naver.com/epublic5131/search?q=%EC%84%B8%EC%83%81%EC%9D%84%20%EB%B0%94%EA%BE%B8%EB%8A%94%20%ED%95%98%EB%82%98%EC%9D%98%20%EB%AA%A9%EC%86%8C%EB%A6%AC",
    summary:
      "작은 목소리 하나가 사회를 바꾸는 힘이 될 수 있음을 보여 주는 메시지형 그림책입니다.",
    description:
      "환경과 사회, 연대의 의미를 어린이와 청소년 눈높이에서 풀어낸 책입니다. 짧지만 선명한 메시지가 있어 리뷰 모음과 함께 배치했을 때 설득력이 높고, 학부모와 교사 추천 흐름에도 자연스럽게 연결됩니다.",
    highlights: ["메시지 그림책", "초등고 · 청소년", "사회 주제"],
    reviewLinks: [
      {
        platform: "YES24 회원리뷰",
        eyebrow: "온라인서점",
        title: "예스24에서 메시지 도서 반응 보기",
        label: "예스24 리뷰 열기",
        description: "학부모와 교사 관점의 반응을 온라인서점 리뷰에서 먼저 살펴볼 수 있습니다.",
        url: "https://m.yes24.com/Goods/Review/99112574",
        thumbnail: "./assets/reviews/yes24-99112574.jpg",
        meta: "m.yes24.com · 회원리뷰",
      },
      {
        platform: "네이버 블로그",
        eyebrow: "추천 후기",
        title: "메시지 해석이 담긴 블로그 후기",
        label: "블로그 후기 열기",
        description: "책의 주제를 어떻게 받아들였는지 차분하게 정리한 리뷰를 연결했습니다.",
        url: "https://blog.naver.com/toaping/223829431638",
        thumbnail: "./assets/reviews/blog-one-voice.jpg",
        meta: "blog.naver.com/toaping",
      },
    ],
    related: ["world-culture", "lemoncello", "karel-sound"],
  },
  "spring-yahoo": {
    title: "야호! 야호! 봄이 왔나 봐!",
    series: "맥밀런 월드베스트",
    author: "팀 합굿",
    translator: "고영이",
    publisher: "사파리",
    age: "영아 · 유아",
    filters: ["baby", "preschool", "series"],
    category: "영아/유아 그림책",
    publishDate: "2025년 3월 20일",
    isbn: "9791169514491",
    pages: "36쪽",
    price: "13,500원",
    cover: "https://image.yes24.com/goods/143896312/XL",
    officialUrl: "https://www.yes24.com/product/goods/143896312",
    storeUrl: buildSmartStoreSearchUrl("야호! 야호! 봄이 왔나 봐!"),
    summary:
      "아기 토끼 깡총이와 함께 봄의 냄새와 소리, 감촉을 만나는 사랑스러운 계절 그림책입니다.",
    overview:
      "아기 토끼 깡총이가 봄이 오는 날을 기다리며 공기와 냄새, 소리의 변화를 느끼는 과정을 따라가는 계절 그림책입니다. 눈으로 보고 귀로 듣는 것에 그치지 않고, 코로 맡고 손으로 느끼며 계절을 받아들이는 흐름이 다정하게 이어집니다.",
    description:
      "봄이 오는 순간을 기다리는 아기 토끼 깡총이의 하루를 따라가며 아이가 계절 변화를 오감으로 자연스럽게 느끼도록 돕는 그림책입니다. 짧은 문장과 반복되는 리듬이 살아 있어 읽어 주기 좋고, 봄 주제 큐레이션 카드에도 잘 어울립니다.",
    highlights: ["봄 그림책", "오감 자극", "맥밀런 월드베스트"],
    reviewLinks: [
      {
        platform: "YES24 회원리뷰",
        eyebrow: "온라인서점",
        title: "예스24에서 봄 그림책 반응 보기",
        label: "예스24 리뷰 열기",
        description: "봄 주제 그림책을 찾는 부모 반응과 포토 후기를 바로 확인할 수 있습니다.",
        url: "https://m.yes24.com/Goods/Review/143896312",
        thumbnail: "./assets/reviews/yes24-143896312.jpg",
        meta: "m.yes24.com · 회원리뷰",
      },
    ],
    related: ["macmillan-snow", "macmillan-red-boots", "karel-sound"],
  },
  "24store-1": {
    title: "24분 편의점 1호",
    subtitle: "숲속마을점 수상한 자석 마술 쇼",
    series: "24분 편의점",
    publisher: "사파리",
    age: "초등저 · 초등중",
    filters: ["elementary", "series"],
    category: "읽기/문학",
    publishDate: "2025년 6월 15일",
    isbn: "9791169514101",
    pages: "104쪽",
    price: "14,800원",
    cover: "https://image.yes24.com/goods/147561016/XL",
    officialUrl: buildYes24GoodsUrl("147561016"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("24분 편의점 1호"),
    summary:
      "24분 안에 벌어지는 편의점 미스터리를 경쾌하게 풀어낸 시리즈 1권입니다.",
    description:
      "친근한 편의점 배경과 짧고 빠른 사건 전개가 강점이라 혼자 읽기 전환기 어린이에게 잘 맞습니다. 시리즈 진입용으로 보여 주기 좋고, 콘셉트가 분명해 목록에서도 눈에 잘 띄는 도서입니다.",
    highlights: ["시리즈 신작", "초등 읽기 입문", "24분 편의점"],
    reviewLinks: [
      buildStoreReview(
        "147561016",
        "예스24에서 1호 반응 보기",
        "첫 권 진입용으로 어떤 반응이 있었는지 회원리뷰를 바로 확인할 수 있습니다.",
        "https://image.yes24.com/goods/147561016/XL"
      ),
      buildBlogReview(
        "24분 편의점 1호 사파리",
        "24분 편의점 1호 블로그 후기 더 보기",
        "표지 사진과 줄거리 감상이 담긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/147561016/XL"
      ),
    ],
    related: ["24store-2", "24store-3", "horror-note-1"],
  },
  "24store-2": {
    title: "24분 편의점 2호",
    subtitle: "섬마을점 긴급 기름 제거 작전",
    series: "24분 편의점",
    publisher: "사파리",
    age: "초등저 · 초등중",
    filters: ["elementary", "series"],
    category: "읽기/문학",
    publishDate: "2025년 8월 20일",
    isbn: "9791169514118",
    pages: "104쪽",
    price: "14,800원",
    cover: "https://image.yes24.com/goods/151353660/XL",
    officialUrl: buildYes24GoodsUrl("151353660"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("24분 편의점 2호"),
    summary:
      "편의점이라는 익숙한 공간에서 구조 작전이 펼쳐지는 시리즈 2권입니다.",
    description:
      "장소는 가깝고 사건은 빠르게 커져서 초등 저학년이 끝까지 읽기 좋습니다. 1권을 좋아한 아이에게 다음 권으로 자연스럽게 이어 주기 좋은 흐름을 갖고 있습니다.",
    highlights: ["시리즈 확장", "초등 저학년", "모험 읽기책"],
    reviewLinks: [
      buildStoreReview(
        "151353660",
        "예스24에서 2호 반응 보기",
        "후속권으로 이어 읽기 좋은지, 실제 구매자 반응을 먼저 살펴볼 수 있습니다.",
        "https://image.yes24.com/goods/151353660/XL"
      ),
      buildBlogReview(
        "24분 편의점 2호 사파리",
        "24분 편의점 2호 블로그 후기 더 보기",
        "시리즈 흐름과 표지 인상이 담긴 블로그 후기를 이어서 볼 수 있습니다.",
        "https://image.yes24.com/goods/151353660/XL"
      ),
    ],
    related: ["24store-1", "24store-3", "hundred-bus"],
  },
  "24store-3": {
    title: "24분 편의점 3호",
    subtitle: "극장점 그림자 귀신 대소동",
    series: "24분 편의점",
    publisher: "사파리",
    age: "초등저 · 초등중",
    filters: ["elementary", "series"],
    category: "읽기/문학",
    cover: "https://image.yes24.com/goods/168457218/XL",
    officialUrl: buildYes24GoodsUrl("168457218"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("24분 편의점 3호"),
    summary:
      "극장을 배경으로 한 그림자 귀신 소동이 펼쳐지는 시리즈 3권입니다.",
    description:
      "기묘한 분위기와 유쾌한 전개가 함께 있어 긴장감은 살리고 부담은 낮췄습니다. 이야기책을 막 즐기기 시작한 독자에게도 가볍게 권하기 좋은 권입니다.",
    highlights: ["미스터리 감각", "시리즈 3권", "빠른 전개"],
    reviewLinks: [
      buildStoreReview(
        "168457218",
        "예스24에서 3호 반응 보기",
        "시리즈 후반으로 갈수록 재미가 유지되는지 회원리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/168457218/XL"
      ),
      buildBlogReview(
        "24분 편의점 3호 사파리",
        "24분 편의점 3호 블로그 후기 더 보기",
        "극장점 에피소드와 표지 감상이 담긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/168457218/XL"
      ),
    ],
    related: ["24store-1", "24store-2", "horror-note-2"],
  },
  "macmillan-red-boots": {
    title: "내가 정말정말 좋아하는 빨간 장화",
    series: "맥밀런 월드베스트",
    publisher: "사파리",
    age: "영아 · 유아",
    filters: ["baby", "preschool", "series"],
    category: "영아/유아 그림책",
    cover: "https://image.yes24.com/goods/146902377/XL",
    officialUrl: buildYes24GoodsUrl("146902377"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("내가 정말정말 좋아하는 빨간 장화"),
    summary:
      "사랑하는 물건 하나에 대한 아이의 마음을 귀엽게 담아낸 맥밀런 월드베스트 그림책입니다.",
    description:
      "짧고 또렷한 문장, 반복되는 리듬, 포근한 감정선이 잘 살아 있어 읽어 주기와 함께 보기 모두 편합니다. 영유아 도서 존을 채울 때 분위기를 부드럽게 만들어 주는 타이틀입니다.",
    highlights: ["맥밀런 월드베스트", "읽어 주기 좋은 책", "영아 · 유아"],
    reviewLinks: [
      buildStoreReview(
        "146902377",
        "예스24에서 구매자 반응 보기",
        "영유아와 함께 읽기 좋았는지 실제 회원리뷰를 빠르게 살펴볼 수 있습니다.",
        "https://image.yes24.com/goods/146902377/XL"
      ),
      buildBlogReview(
        "내가 정말정말 좋아하는 빨간 장화 사파리",
        "빨간 장화 그림책 블로그 후기 더 보기",
        "표지 분위기와 아이 반응이 담긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/146902377/XL"
      ),
    ],
    related: ["macmillan-snow", "macmillan-brush-teeth", "karel-sound"],
  },
  "macmillan-brush-teeth": {
    title: "나는 이 닦기가 정말정말 싫어요!",
    series: "맥밀런 월드베스트",
    publisher: "사파리",
    age: "영아 · 유아",
    filters: ["baby", "preschool", "series"],
    category: "영아/유아 그림책",
    isbn: "9791169514576",
    cover: "https://image.yes24.com/goods/147562166/XL",
    officialUrl: buildYes24GoodsUrl("147562166"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("나는 이 닦기가 정말정말 싫어요"),
    summary:
      "생활 습관 주제를 아이 시선으로 유쾌하게 풀어낸 맥밀런 월드베스트 도서입니다.",
    description:
      "싫어하는 마음을 먼저 공감해 주는 전개라 생활 그림책으로 꺼내기 좋습니다. 육아 리뷰 흐름과도 잘 맞아 후기형 상세 페이지와 자연스럽게 연결되는 책입니다.",
    highlights: ["생활 습관", "맥밀런 월드베스트", "부모 공감"],
    reviewLinks: [
      buildStoreReview(
        "147562166",
        "예스24에서 생활 습관 도서 반응 보기",
        "양치 습관 도입용으로 어떤 반응이 있었는지 회원리뷰를 확인할 수 있습니다.",
        "https://image.yes24.com/goods/147562166/XL"
      ),
      buildBlogReview(
        "나는 이 닦기가 정말정말 싫어요 사파리",
        "양치 그림책 블로그 후기 더 보기",
        "실사용 사진과 함께 남긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/147562166/XL"
      ),
    ],
    related: ["macmillan-red-boots", "macmillan-snow", "karel-sound"],
  },
  "macmillan-snow": {
    title: "눈이 좋아!",
    series: "맥밀런 월드베스트",
    publisher: "사파리",
    age: "영아 · 유아",
    filters: ["baby", "preschool", "series"],
    category: "영아/유아 그림책",
    cover: "https://image.yes24.com/goods/146902376/XL",
    officialUrl: buildYes24GoodsUrl("146902376"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("눈이 좋아 사파리"),
    summary:
      "계절의 설렘을 담백하게 전하는 맥밀런 월드베스트 시리즈 그림책입니다.",
    overview:
      "눈이 오는 날의 차가운 공기와 설렘을 아이 눈높이에서 포근하게 담아낸 계절 그림책입니다. 짧고 반복되는 문장, 부드러운 장면 전환, 사랑스러운 그림이 어우러져 겨울 풍경을 천천히 느끼며 읽기 좋습니다.",
    description:
      "눈 오는 날의 감각을 단순하고 사랑스럽게 풀어내서 짧은 독서 시간에도 만족감이 좋습니다. 계절 큐레이션이나 영유아 추천 묶음에 넣기 편한 타이틀입니다.",
    highlights: ["계절 그림책", "반복 리듬", "영아 · 유아"],
    reviewLinks: [
      buildStoreReview(
        "146902376",
        "예스24에서 계절 그림책 반응 보기",
        "짧고 포근한 그림책을 찾는 부모 반응을 회원리뷰에서 살펴볼 수 있습니다.",
        "https://image.yes24.com/goods/146902376/XL"
      ),
      buildBlogReview(
        "눈이 좋아 사파리",
        "눈이 좋아 블로그 후기 더 보기",
        "계절감 있는 사진과 함께 남긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/146902376/XL"
      ),
    ],
    related: ["macmillan-red-boots", "macmillan-brush-teeth", "hundred-rocket"],
  },
  "horror-note-1": {
    title: "경고! 절대 열면 안 되는 공포의 노트 1",
    subtitle: "춤추는 풍선 괴물과 생일 파티",
    series: "공포의 노트",
    publisher: "사파리",
    age: "초등저 · 초등중",
    filters: ["elementary", "series"],
    category: "읽기/문학",
    cover: "https://image.yes24.com/goods/124640001/XL",
    officialUrl: buildYes24GoodsUrl("124640001"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("공포의 노트 1 사파리"),
    summary:
      "무섭고 웃긴 몬스터 에피소드가 이어지는 공포 코믹 읽기책 시리즈 1권입니다.",
    description:
      "공포 분위기는 살리되 너무 무겁지 않아서 초등 독자가 재미있게 진입하기 좋습니다. 시리즈 첫 권답게 캐릭터와 세계관이 빨리 잡혀 상세 페이지에서도 설명이 잘 읽히는 도서입니다.",
    highlights: ["공포 코믹", "시리즈 1권", "초등 읽기책"],
    reviewLinks: [
      buildStoreReview(
        "124640001",
        "예스24에서 1권 반응 보기",
        "무섭지만 재미있게 읽히는지 회원리뷰 반응을 먼저 확인할 수 있습니다.",
        "https://image.yes24.com/goods/124640001/XL"
      ),
      buildBlogReview(
        "공포의 노트 1 사파리",
        "공포의 노트 1 블로그 후기 더 보기",
        "시리즈 입문 반응과 표지 사진이 담긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/124640001/XL"
      ),
    ],
    related: ["horror-note-2", "horror-note-3", "24store-1"],
  },
  "horror-note-2": {
    title: "경고! 절대 열면 안 되는 공포의 노트 2",
    subtitle: "터널물고기와 슈.초.괴.특.의 비밀",
    series: "공포의 노트",
    publisher: "사파리",
    age: "초등저 · 초등중",
    filters: ["elementary", "series"],
    category: "읽기/문학",
    isbn: "9791169517744",
    pages: "104쪽",
    cover: "https://image.yes24.com/goods/125076050/XL",
    officialUrl: buildYes24GoodsUrl("125076050"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("공포의 노트 2 사파리"),
    summary:
      "기묘한 터널물고기 사건과 비밀 조직 이야기가 더해지는 시리즈 2권입니다.",
    description:
      "전권보다 세계관이 넓어지면서도 리듬은 가벼워서 시리즈 몰입이 잘 이어집니다. 무서운 책을 좋아하지만 너무 강한 공포는 부담스러운 독자에게 잘 맞습니다.",
    highlights: ["괴물 사건", "시리즈 확장", "초등 독서"],
    reviewLinks: [
      buildStoreReview(
        "125076050",
        "예스24에서 2권 반응 보기",
        "후속권의 재미와 몰입감에 대한 회원리뷰를 바로 확인할 수 있습니다.",
        "https://image.yes24.com/goods/125076050/XL"
      ),
      buildBlogReview(
        "공포의 노트 2 사파리",
        "공포의 노트 2 블로그 후기 더 보기",
        "표지와 줄거리 감상이 함께 담긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/125076050/XL"
      ),
    ],
    related: ["horror-note-1", "horror-note-3", "24store-3"],
  },
  "horror-note-3": {
    title: "경고! 절대 열면 안 되는 공포의 노트 3",
    subtitle: "땅다람쥐 날과 으스스그림자 습격 사건",
    series: "공포의 노트",
    publisher: "사파리",
    age: "초등저 · 초등중",
    filters: ["elementary", "series"],
    category: "읽기/문학",
    cover: "https://image.yes24.com/goods/125970791/XL",
    officialUrl: buildYes24GoodsUrl("125970791"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("공포의 노트 3 사파리"),
    summary:
      "으스스한 그림자 사건이 펼쳐지는 공포의 노트 시리즈 3권입니다.",
    description:
      "시리즈 특유의 기괴한 유머가 살아 있어 읽는 재미가 분명합니다. 짧게 끊어 읽기 좋고 이야기 흐름이 빨라 독서 흥미를 붙이기 좋은 책으로 보입니다.",
    highlights: ["시리즈 3권", "기괴한 유머", "읽기 몰입"],
    reviewLinks: [
      buildStoreReview(
        "125970791",
        "예스24에서 3권 반응 보기",
        "시리즈를 계속 따라간 독자들의 반응을 회원리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/125970791/XL"
      ),
      buildBlogReview(
        "공포의 노트 3 사파리",
        "공포의 노트 3 블로그 후기 더 보기",
        "후속권 분위기와 표지 감상이 담긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/125970791/XL"
      ),
    ],
    related: ["horror-note-1", "horror-note-2", "lemoncello"],
  },
  "hundred-bus": {
    title: "100층 버스",
    series: "100층 시리즈",
    publisher: "사파리",
    age: "유아 · 초등저",
    filters: ["preschool", "elementary"],
    category: "그림책",
    publishDate: "2025년 9월 10일",
    isbn: "9791169514095",
    pages: "32쪽",
    price: "14,000원",
    cover: "https://image.yes24.com/goods/153263385/XL",
    officialUrl: buildYes24GoodsUrl("153263385"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("100층 버스 사파리"),
    summary:
      "층층이 이어지는 버스 안에서 상상력이 확장되는 100층 시리즈 신작 그림책입니다.",
    description:
      "계단처럼 이어지는 구조와 숨은 요소가 살아 있어 반복해서 펼쳐 보기 좋습니다. 100층 시리즈를 좋아하는 아이에게 바로 권하기 좋은 신작 흐름의 도서입니다.",
    highlights: ["100층 시리즈", "찾기 요소", "유아 · 초등저"],
    reviewLinks: [
      buildStoreReview(
        "153263385",
        "예스24에서 신작 반응 보기",
        "100층 시리즈 신작에 대한 초기 반응을 회원리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/153263385/XL"
      ),
      buildBlogReview(
        "100층 버스 사파리",
        "100층 버스 블로그 후기 더 보기",
        "표지와 내부 구성에 대한 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/153263385/XL"
      ),
    ],
    related: ["hundred-rocket", "macmillan-snow", "dino-ambulance"],
  },
  "hundred-rocket": {
    title: "100층 로켓",
    series: "100층 시리즈",
    publisher: "사파리",
    age: "유아 · 초등저",
    filters: ["preschool", "elementary"],
    category: "그림책",
    publishDate: "2021년 11월 25일",
    isbn: "9791166373633",
    pages: "32쪽",
    price: "13,000원",
    cover: "https://image.yes24.com/goods/104195170/XL",
    officialUrl: buildYes24GoodsUrl("104195170"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("100층 로켓 사파리"),
    summary:
      "우주로 뻗어 가는 상상과 층별 구성이 매력적인 100층 시리즈 도서입니다.",
    description:
      "위로 올라가며 계속 새로운 장면을 만나는 구조라 페이지를 넘기는 재미가 분명합니다. 찾기 요소와 이야기 흐름이 함께 살아 있어 미취학과 초등 저학년 모두 보기 좋습니다.",
    highlights: ["우주 상상", "100층 시리즈", "반복해서 보기 좋은 책"],
    reviewLinks: [
      buildStoreReview(
        "104195170",
        "예스24에서 시리즈 반응 보기",
        "100층 로켓을 읽은 독자 반응과 평점을 회원리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/104195170/XL"
      ),
      buildBlogReview(
        "100층 로켓 사파리",
        "100층 로켓 블로그 후기 더 보기",
        "읽어 주기 난이도와 아이 반응이 담긴 블로그 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/104195170/XL"
      ),
    ],
    related: ["hundred-bus", "macmillan-snow", "dino-bungbung"],
  },
  "dino-ambulance": {
    title: "긴급 출동! 공룡구급대",
    series: "공룡 시리즈",
    publisher: "사파리",
    age: "유아 · 초등저",
    filters: ["preschool", "elementary", "series"],
    category: "그림책",
    isbn: "9791166370748",
    pages: "32쪽",
    cover: "https://image.yes24.com/goods/97964127/XL",
    officialUrl: buildYes24GoodsUrl("97964127"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("긴급 출동 공룡구급대 사파리"),
    summary:
      "공룡과 탈것을 함께 좋아하는 아이 취향을 정확하게 겨냥한 공룡 시리즈 그림책입니다.",
    description:
      "공룡과 구급대라는 선호 요소가 분명해 첫인상이 강하고, 읽기 전에도 내용을 짐작하기 쉬워 반응을 얻기 좋습니다. 남아 선호 주제 큐레이션에 특히 잘 어울립니다.",
    highlights: ["공룡", "탈것", "유아 · 초등저"],
    reviewLinks: [
      buildStoreReview(
        "97964127",
        "예스24에서 공룡 도서 반응 보기",
        "공룡과 탈것 조합에 대한 실제 구매자 반응을 회원리뷰에서 볼 수 있습니다.",
        "https://image.yes24.com/goods/97964127/XL"
      ),
      buildBlogReview(
        "긴급 출동 공룡구급대 사파리",
        "공룡구급대 블로그 후기 더 보기",
        "표지와 함께 남긴 공룡 그림책 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/97964127/XL"
      ),
    ],
    related: ["dino-bungbung", "dino-baby", "hundred-bus"],
  },
  "dino-bungbung": {
    title: "붕붕이와 신나는 공룡 나라로!",
    series: "",
    publisher: "사파리",
    age: "영아 · 유아",
    filters: ["baby", "preschool"],
    category: "그림책",
    isbn: "9791160570786",
    pages: "32쪽",
    cover: "https://image.yes24.com/goods/37862049/XL",
    officialUrl: buildYes24GoodsUrl("37862049"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("붕붕이와 신나는 공룡 나라로 사파리"),
    summary:
      "자동차와 공룡을 좋아하는 아이에게 즐겁게 다가가는 공룡 테마 그림책입니다.",
    description:
      "친숙한 탈것 캐릭터와 공룡 나라 탐험을 묶어 상상 놀이하듯 읽기 좋습니다. 공룡 도서군을 넓힐 때 너무 무겁지 않은 톤의 책으로 균형을 잡아 줍니다.",
    highlights: ["공룡 놀이", "탈것 친구", "영아 · 유아"],
    reviewLinks: [
      buildStoreReview(
        "37862049",
        "예스24에서 공룡 놀이책 반응 보기",
        "탈것과 공룡을 함께 좋아하는 아이 반응을 회원리뷰에서 확인할 수 있습니다.",
        "https://image.yes24.com/goods/37862049/XL"
      ),
      buildBlogReview(
        "붕붕이와 신나는 공룡 나라로 사파리",
        "공룡 나라 그림책 블로그 후기 더 보기",
        "실물 사진과 함께 남긴 유아 그림책 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/37862049/XL"
      ),
    ],
    related: ["dino-ambulance", "dino-baby", "hundred-rocket"],
  },
  "dino-baby": {
    title: "우리는 아기 공룡",
    series: "",
    publisher: "사파리",
    age: "영아 · 유아",
    filters: ["baby", "preschool"],
    category: "영아/유아 그림책",
    isbn: "9791169519717",
    cover: "https://image.yes24.com/goods/143896277/XL",
    officialUrl: buildYes24GoodsUrl("143896277"),
    detailButtonLabel: "도서 자세히",
    detailLinkLabel: "도서 상세 페이지",
    storeUrl: buildSmartStoreSearchUrl("우리는 아기 공룡 사파리"),
    summary:
      "아기 공룡의 매력을 부드럽고 사랑스럽게 담아낸 영유아용 공룡 그림책입니다.",
    description:
      "강한 공룡 콘셉트보다 귀여운 매력이 앞에 있어 영유아 존에도 자연스럽게 어울립니다. 공룡 주제를 넓히되 전체 톤을 부드럽게 유지하고 싶을 때 넣기 좋은 책입니다.",
    highlights: ["아기 공룡", "영유아 그림책", "부드러운 톤"],
    reviewLinks: [
      buildStoreReview(
        "143896277",
        "예스24에서 아기 공룡 도서 반응 보기",
        "영유아에게 어떤 반응이 있었는지 회원리뷰에서 먼저 확인할 수 있습니다.",
        "https://image.yes24.com/goods/143896277/XL"
      ),
      buildBlogReview(
        "우리는 아기 공룡 사파리",
        "아기 공룡 블로그 후기 더 보기",
        "표지와 함께 남긴 영유아 공룡 도서 후기를 모아 볼 수 있습니다.",
        "https://image.yes24.com/goods/143896277/XL"
      ),
    ],
    related: ["dino-ambulance", "dino-bungbung", "macmillan-red-boots"],
  },
};
