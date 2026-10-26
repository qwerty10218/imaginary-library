# 接續要點

- 台南篇章顯示轉換已統一書內標題為 `EP.XX｜篇名`，延伸聆聽在正文後；Scroll 模式置於章末註釋之後。原始三篇 Markdown 未改，測試見 `QA_REPORT.md`。

- 台南系列已以 commit `0e7767f` Push 並經 Actions run `40290782382` 成功部署。正式站 390／1440px Edge headless 已驗封面、三章入口與線上 MP3 試播；兩來源包仍忽略，舊包因自動審查拒絕而留在本機。iPhone Safari 實機未驗。

- 2026-10-26 新增《台南少年追風記》三篇於 `content/works/tainan-youth-wind/`。26 則腳註來源為 `notes.json`，由 `scripts/build.mjs` 轉接既有閱讀器。使用者已確認三首歌曲的公開使用授權，三首指定 MP3 位於 `web/assets/music/`，以 metadata 指定路徑建置。來源包整體仍忽略，第四首無關歌曲不進 Git 或 Pages。
- 新作品播放器位於 `web/js/music-player.js`，同頁切章由 `web/js/reader.js` 保留音訊元素。測試 `node tests/tainan.mjs`，先 `npm run check` 再啟動 `npm run dev`。作者署名 Gary Lee 及兩首無 ID3 演唱者標籤的版本已由使用者確認。
- 作者後續以 `台南少年追風記_MP3唱盤整合版新版/` 為準：原稿與註解和舊包相同，四個 MP3 已雜湊核對複製到新版包；預覽伺服器路徑已更新。播放器已整合新版木質唱盤、唱針動作與本機 MP3 選檔。舊包刪除被自動核准審查拒絕，目前兩包都保留並被忽略；只有三首授權歌曲另存至正式靜態資源。

- 只操作此副本；原始《彼岸仍是人間》專案不得修改。新 Git 位於副本根目錄，`web/` 不再是倉庫。
- `.migration-backup` 內有舊 Git 與原作品，永久排除於新提交及產物。不可掃描整個根目錄後直接上傳。
- MVP 0.1 的正式入口是 `web/index.html`；資料從 `content/works/*/metadata.json` 建置到 `dist/data/works.json`。首作 ID `zhen-du-chuanyue`，已接封面、簡介及作者前三章；第四章尚缺。
- 只有 metadata 的 `chapters` 中 `published: true` 的 Markdown 會進入公開產物。`content/CHAPTER_TEMPLATE.md` 只供編輯，不複製到 dist。
- `web/reader.html` 和 `web/js/reader.js` 沿用既有 `reader/core.js`、`page-turn.js` 和 `progress.js`；`prototype.html` 保留回歸用，正式入口不依賴它。
- Pages workflow 和 `scripts/check-release.mjs` 已準備，檢查封面與前三章。使用者已授權三章及測試確認後發布；正式雲端同步仍須另獲授權。
- 簡繁轉換使用原閱讀器同版 OpenCC 1.0.5 的 `tw→cn` 精簡模組，位於 `web/js/vendor/opencc.js`；全站狀態在 `web/js/language.js`，本機偏好鍵為 `imaginary-library:v1:language`。不使用原作的專有 conversion-dict.js 或舊儲存鍵。
- 本機驗證與截圖見 `00_PROJECT/QA_REPORT.md` 及忽略區 `.local/mvp/`。Edge headless 已測，iPhone Safari 實機未測。
- 首作前三章已上線至 `https://qwerty10218.github.io/imaginary-library/`，線上截圖在 `.local/release/live-*.png`；正式編輯後請重新執行 check、release gate 及真實瀏覽器測試。iPhone Safari 實機仍未測。
- 正式閱讀頁新增緊湊工具列、視窗高度書本與左右側翻頁鍵；Page 底部只留進度，Scroll 上下章連結保留。暖紙等偏好在 HTML 解析時即套用，避免跨章深色首幀。局部測試為 `node tests/immersive.mjs`，前後截圖在 `.local/immersive/`。
