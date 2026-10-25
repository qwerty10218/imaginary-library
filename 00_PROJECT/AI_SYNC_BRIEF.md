# 臆想書房 — 接續快照

日期：2026-10-25。此文件只描述新專案，不套用原小說工作規則。

## 目前節點

已完成安全保全、有效工作區隔離、新根 Git 與可操作閱讀頁視覺原型。**等待使用者視覺驗收，不得先全面套用 UI。**

預覽：啟動 npm run dev 後開啟 http://127.0.0.1:4173/imaginary-library/prototype.html?mode=page 。手機不帶 mode 參數時預設 Scroll，桌面預設雙頁。

## 安全與 Git

- 回退區 .migration-backup/2026-10-25：3,703 檔逐檔備份驗證，四類還原抽驗完成。
- 原專案全量 3,703 檔重驗無變更。
- 舊內容與舊 web/.git 已可還原地搬入忽略區，非永久刪除；自動審核阻擋了原永久刪除操作。
- 新倉庫根目錄 main；origin 為 https://github.com/qwerty10218/imaginary-library.git 。遠端仍空。
- 本機 Commit 可做；Push、Pages、正式部署與正式 Supabase 均未授權，未執行。

## 功能界線

- core.js 重用舊未提交腳註與分頁；只針對測量與已重現的長段落問題修復。
- 三主題、單／雙頁、Scroll、腳註與基本位置恢復皆為原型範圍。
- 正式書庫為空，示範不是新小說。完整資料模型、上稿、書庫詳情及多作品 UI 待後續。
- 本機進度命名空間獨立。SyncPort 停用，沒有服務連接；第二階段規格見 docs/CLOUD_SYNC_AUDIT.md。

## 下一步

先取得使用者對原型的視覺回饋；再按 CURRENT_STATUS.md 繼續階段 2–5。詳細已驗證項目與限制見 QA_REPORT.md。原型不具正式發布條件。
