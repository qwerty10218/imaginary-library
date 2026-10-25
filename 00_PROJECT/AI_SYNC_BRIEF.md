# 臆想書房 — 接續快照

日期：2026-10-26。此文件只描述新專案；不可套用原小說創作規範或原遠端設定。

## 現況

MVP 0.1 的書庫、作品詳情、Markdown 建置索引與閱讀器已完成。首作《朕都穿越了，怎麼還是你這奸臣？！》已接入使用者指定的 WebP 封面、第一卷名稱、分類、連載狀態、首頁短簡介及詳情頁完整簡介。封面原檔 1086×1448，複製後 SHA-256 一致，靜態路徑為 `web/assets/covers/zhen_du_chuanyue_cover.webp`。

**第一、二章完整原稿尚未取得，正式章節數為 0。** 專案及適用本機文字檔沒有兩章全文；較早的對話僅能讀到第二章討論稿，不能證明是可發布定稿。已請使用者提供兩份完整原稿。禁止根據摘要續寫、用測試文字代替或發布目前不完整作品。

本機預覽：http://127.0.0.1:4173/imaginary-library/ 。首頁與詳情頁封面於 390px／1440px Edge headless 實測可用，截圖位於忽略區 `.local/mvp/`。正式正文路由只有在章節登錄後才可閱讀。

## 技術與驗證

- `content/works/<id>/metadata.json` 登錄作品及章節；只有明確 `published: true` 的 Markdown 被複製進 `dist`。
- `web/reader.html` 沿用 Page／Scroll、桌面雙頁、手機單頁、三主題、腳註、上下章、翻頁及作品獨立進度。動畫實作未改。
- Pages workflow 已在本機準備，依 GitHub 官方的 configure／upload／deploy Pages 流程建置 `dist`；`scripts/check-release.mjs` 在封面或前兩章缺失時阻止部署。正式入口資源以內容版本查詢字串減少舊快取，索引與章節使用 no-store 請求。
- `npm run check`、`node tests/mvp.mjs`、`node tests/workflow.mjs`、原 15 組 `node tests/browser.mjs`、6 組 `node tests/page-turn.mjs` 均通過。`node scripts/check-release.mjs` 因缺少兩章而按設計失敗。詳細見 QA_REPORT.md。
- 尚未驗證兩章真實正文、iPhone Safari 實機或 Pages 線上環境。

## Git 與下一步

- 工作區是獨立副本。新 Git 根目錄 `main`，origin 僅指向 `https://github.com/qwerty10218/imaginary-library.git`。本輪前 HEAD 926647b，完成本機變更後以 `git log -1` 查最新 SHA。
- 本輪開始時已有未追蹤的 `封面.png`，屬使用者工作，保留未變動、未提交。`.migration-backup` 仍在忽略區，舊原作品與 Git 不在新提交／產物。
- 遠端 `ls-remote` 無分支；公開 GitHub API 顯示 Repository 存在、Pages 尚未啟用。`gh` CLI 在本機不可用。本輪未 Push、未啟用 Pages、未部署、未操作原專案。
- 下一步等使用者提供兩份完整原稿，確認章名與文字，按順序加入 Markdown，重跑真實內容版面／發布檢查、審核公開產物與遠端，符合本次有條件授權後再 Push 並部署。若 Pages 需網頁設定，精確回報步驟與線上驗證結果。
