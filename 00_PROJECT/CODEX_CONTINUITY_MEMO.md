# 接續要點

- 只操作此副本；原始《彼岸仍是人間》專案不得修改。新 Git 位於副本根目錄，`web/` 不再是倉庫。
- `.migration-backup` 內有舊 Git 與原作品，永久排除於新提交及產物。不可掃描整個根目錄後直接上傳。
- MVP 0.1 的正式入口是 `web/index.html`；資料從 `content/works/*/metadata.json` 建置到 `dist/data/works.json`。首作已接封面與完整簡介，但第一、二章完整原稿尚缺，目前 0 篇。
- 只有 metadata 的 `chapters` 中 `published: true` 的 Markdown 會進入公開產物。`content/CHAPTER_TEMPLATE.md` 只供編輯，不複製到 dist。
- `web/reader.html` 和 `web/js/reader.js` 沿用既有 `reader/core.js`、`page-turn.js` 和 `progress.js`；`prototype.html` 保留回歸用，正式入口不依賴它。
- Pages workflow 和 `scripts/check-release.mjs` 已在本機準備，因缺兩章而阻擋部署。本輪使用者已授權「封面、完整兩章及測試無誤」後發布；條件未滿前不可 Push／部署。正式雲端同步仍須另獲授權。
- 本機驗證與截圖見 `00_PROJECT/QA_REPORT.md` 及忽略區 `.local/mvp/`。Edge headless 已測，iPhone Safari 實機未測。
