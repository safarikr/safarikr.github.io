# Safari Publishing Demo

사파리 출판사 시안 사이트입니다.

## 로컬 확인

- 메인: `http://127.0.0.1:4173/index.html`
- 도서: `http://127.0.0.1:4173/books.html`
- 음원: `http://127.0.0.1:4173/audio.html`
- 이벤트: `http://127.0.0.1:4173/events.html`

## GitHub Pages 배포

이 폴더 내용은 `safarikr.github.io` 저장소 루트에 올리는 기준으로 맞춰져 있습니다.

1. GitHub에서 `safarikr.github.io` 공개 저장소를 만듭니다.
2. 이 폴더를 해당 저장소에 push 합니다.
3. 저장소 `Settings > Pages` 에서 `Deploy from a branch` 를 선택합니다.
4. `main` 브랜치와 `/ (root)` 를 배포 소스로 선택합니다.

기본 push 명령 예시:

```bash
git remote add origin https://github.com/safarikr/safarikr.github.io.git
git add .
git commit -m "Publish Safari site"
git push -u origin main
```

배포 주소:

- `https://safarikr.github.io/`
- `https://safarikr.github.io/e/`
- `https://safarikr.github.io/b/`
- `https://safarikr.github.io/a/`

## 나중에 커스텀 도메인 연결

나중에 DNS 담당자가 연결하면 아래 주소로 바꿀 수 있습니다.

- `https://play.safaribook.co.kr/`

그 단계에서는 저장소 설정의 `Pages > Custom domain` 에 도메인을 입력하고,
DNS 쪽에서 `CNAME` 연결을 진행하면 됩니다.

## 참고

- 이 저장소에는 실제 미리듣기용 MP3가 포함되어 있어서 용량이 큰 편입니다.
- Jekyll 간섭을 막기 위해 `.nojekyll` 파일이 포함되어 있습니다.
