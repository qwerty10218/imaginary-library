# 臆想書房 — 接續快照

日期：2026-10-26。此文件只描述新專案；不可套用原小說創作規範或原遠端設定。

## 現況

使用者已授權由閱讀頁原型進入 MVP 0.1。正式首頁、作品詳情、Markdown 建置索引及閱讀頁已在本機完成。首頁 → 作品 → 章節 → 正文 → 下一章的流程，以隔離的測試章節在 390px／1440px Edge 驗證通過。正式作品《朕都穿越了，怎麼還是你這奸臣？！》只有作者提供的名稱、卷名、類型、簡介；**0 篇正式章節**，顯示待上稿。不得把測試佔位文字或原作品正文當新作發布。

本機入口：啟動 `npm run dev` 後開啟 http://127.0.0.1:4173/imaginary-library/ 。正式路徑採相對 URL，可於 `/imaginary-library/` 下運作；GitHub Pages 線上環境未部署、未實測。

## 技術與品質

- `content/works/<id>/metadata.json` 登錄作品及章節；只有明確 `published: true` 的 Markdown 被複製進 dist。上稿範本與 README 已備妥。
- `web/reader.html` 沿用 `reader/core.js`、`page-turn.js` 與 `progress.js`：Page／Scroll、桌面雙頁、手機單頁、三主題、腳註、上下章、章末續讀及作品獨立進度。
- 分頁使用實際紙頁內容盒尺寸；頁眉與正文上緣間距稍增。Markdown 內容 SHA256 短版作進度版本，變更時以百分比安全降級。
- `npm run check`、原 15 組瀏覽器回歸、6 組動畫回歸、2 組正式流程瀏覽器測試及新作品上稿建置測試已通過。詳細見 QA_REPORT.md；截圖在忽略區 `.local/mvp/`。
- 未驗證真實作者長篇內容、iPhone Safari 實機或 GitHub Pages 線上環境。

## 安全與下一步

- 新 Git 根目錄 `main`，origin 僅指向 `https://github.com/qwerty10218/imaginary-library.git`；前一輪 HEAD 為 `66f9a65`，本輪建立本機 MVP commit 後以 `git log -1` 查最新 SHA。無 Push、Pages、部署或正式 Supabase 操作。
- `.migration-backup/2026-10-25` 保留已驗證回退資料和舊 Git，不在新提交／公開產物中；原專案未被本輪操作。
- 下一步等待使用者檢視首頁與測試閱讀畫面，並提供正式章節稿；上稿後須重新驗收真實內容。公開發布及雲端啟用須另獲授權。
