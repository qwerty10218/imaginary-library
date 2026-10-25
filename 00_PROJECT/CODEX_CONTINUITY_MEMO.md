# 接續要點

- 只操作此副本；原始《彼岸仍是人間》專案不得修改。新 Git 位於副本根目錄，`web/` 不再是倉庫。
- `.migration-backup` 內有舊 Git 與原作品，永久排除於新提交及產物。不可掃描整個根目錄後直接上傳。
- MVP 0.1 的正式入口是 `web/index.html`；資料從 `content/works/*/metadata.json` 建置到 `dist/data/works.json`。首作 ID `zhen-du-chuanyue`，已接封面、簡介及作者前三章；第四章尚缺。
- 只有 metadata 的 `chapters` 中 `published: true` 的 Markdown 會進入公開產物。`content/CHAPTER_TEMPLATE.md` 只供編輯，不複製到 dist。
- `web/reader.html` 和 `web/js/reader.js` 沿用既有 `reader/core.js`、`page-turn.js` 和 `progress.js`；`prototype.html` 保留回歸用，正式入口不依賴它。
- Pages workflow 和 `scripts/check-release.mjs` 已準備，檢查封面與前三章。使用者已授權三章及測試確認後發布；正式雲端同步仍須另獲授權。
- 簡繁轉換使用原閱讀器同版 OpenCC 1.0.5 的 `tw→cn` 精簡模組，位於 `web/js/vendor/opencc.js`；全站狀態在 `web/js/language.js`，本機偏好鍵為 `imaginary-library:v1:language`。不使用原作的專有 conversion-dict.js 或舊儲存鍵。
- 本機驗證與截圖見 `00_PROJECT/QA_REPORT.md` 及忽略區 `.local/mvp/`。Edge headless 已測，iPhone Safari 實機未測。
- 首作前三章已上線至 `https://qwerty10218.github.io/imaginary-library/`，線上截圖在 `.local/release/live-*.png`；正式編輯後請重新執行 check、release gate 及真實瀏覽器測試。iPhone Safari 實機仍未測。
