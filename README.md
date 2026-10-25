# 臆想書房

Gary's Imaginary Library · Gary Lee

現代原創小說與短篇閱讀空間。現階段是**閱讀頁視覺驗收原型**，正式書庫為空；尚未完成多作品上稿、正式閱讀進度與發布流程。

## 本機預覽

使用 Node.js 24 與 npm：

```sh
npm ci
npm run check
npm run dev
```

- 空書庫入口：http://127.0.0.1:4173/imaginary-library/
- 手機／桌面翻頁原型：http://127.0.0.1:4173/imaginary-library/prototype.html?mode=page
- 手機直接進 prototype.html 預設 Scroll；設定面板可切換翻頁、主題、字級、行距與動畫。
- 原型文字僅供排版驗收，不是正式作品。

瀏覽器測試（需先執行預覽服務）：`node tests/browser.mjs`。預設使用本機 Microsoft Edge；可用 `BROWSER_CHANNEL` 指定其他已安裝的 Playwright channel。

沒有網站 lint 或 TypeScript 設定；`check` 執行 JavaScript 語法、Node 測試、正式靜態建置與舊內容／端點掃描。瀏覽器測試另外執行。

## 發布限制

本機 Commit 已獲授權；Push、GitHub Pages、正式部署與雲端資源均未獲授權。不得直接部署目前原型。沒有配置任何雲端端點或登入 SDK。

參閱 docs/CORE_PROVENANCE.md、docs/CLOUD_SYNC_AUDIT.md 與 00_PROJECT/AI_SYNC_BRIEF.md。
