# 臆想書房 — 接續快照

日期：2026-10-26。本文件只描述新專案；原作只讀，不能套用原遠端或作品規範。

## 正式內容與功能

MVP 0.1 書庫、作品詳情、Markdown 閱讀器已完成。首作《朕都穿越了，怎麼還是你這奸臣？！》使用作者指定 ID `zhen-du-chuanyue`、正式 1086×1448 WebP 封面、完整及短簡介、架空歷史說明、作者正式前三章。第四章尚未提供，未創作、未登錄。第一、二章與附件逐字一致；第三章只加兩處視角分隔，結尾採作者允許版本。

全站簡繁切換復用原閱讀器 OpenCC 1.0.5 `tw→cn`，本機精簡模組在 `web/js/vendor/opencc.js`。偏好存於 `imaginary-library:v1:language`；繁體 Markdown 為唯一來源。Page／Scroll、手機單頁、桌面雙頁、三主題、腳註、翻頁動畫與作品獨立本機進度均保留。無 IP 定位、外部定位 API、帳號或雲端同步。

## 本機驗證

`npm run check`、`node scripts/check-release.mjs`、`node tests/workflow.mjs`、`node tests/mvp.mjs`、`node tests/release.mjs`、原型 15 組 `node tests/browser.mjs` 及翻頁 6 組 `node tests/page-turn.mjs` 通過。390／1440px 正式前三章逐頁無空白或正文溢出，簡繁與進度導航可用。Edge headless 截圖在忽略區 `.local/release/`。iPhone Safari 實機尚未驗證。

## Git 與發布

本機工作區是獨立副本，新 Git `main` 的 origin 僅指向 `https://github.com/qwerty10218/imaginary-library.git`；發布前 `git ls-remote --heads origin` 無分支。使用者未追蹤的 `封面.png` 不得提交，忽略區 `.migration-backup`、`.local`、`dist` 不得提交。使用者已授權封面、前三章與測試無誤後 Push／部署。本檔寫入時尚未完成遠端部署；公開狀態須以後續線上驗證更新，不能只憑本機測試宣稱已上線。
