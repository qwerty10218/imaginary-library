# 臆想書房 — 接續快照

日期：2026-10-26。本文件只描述新專案；原作只讀，不能套用原遠端或作品規範。

## 正式內容與功能

MVP 0.1 書庫、作品詳情、Markdown 閱讀器與首作前三章已正式上線：[臆想書房](https://qwerty10218.github.io/imaginary-library/)。作品 ID `zhen-du-chuanyue`；作者正式 1086×1448 WebP 封面、短／完整簡介、架空歷史說明與章節 `001.md` 至 `003.md` 均公開。第四章尚未提供，未創作、未登錄。第一、二章與作者附件逐字一致；第三章只加兩處視角分隔，結尾採作者允許版本。

全站簡繁切換復用原閱讀器 OpenCC 1.0.5 `tw→cn`，本機精簡模組位於 `web/js/vendor/opencc.js`。偏好存於 `imaginary-library:v1:language`；繁體 Markdown 為唯一來源。Page／Scroll、手機單頁、桌面雙頁、三主題、腳註、翻頁動畫與作品獨立本機進度均保留。無 IP 定位、外部定位 API、帳號或雲端同步。

讀者提出書內章節標題偏小後，書內大標題與頁頂小章名已適度放大；書頁上方的獨立標題維持原樣，分頁測量同步套用標題尺寸。樣式 commit `68855d5` 的 Pages build／deploy 已成功，390／1440px 線上與本機實測通過；沒有頁面溢出或失敗請求。

## 驗證與限制

`npm run check`、發布檢查、新作品上稿測試、390／1440px 正式內容及 MVP 瀏覽器測試、原型 15 組測試、翻頁 6 組測試均通過。線上首頁、封面、索引、三章及 OpenCC 均 HTTP 200；390／1440px Edge headless 從線上首頁依序讀到第三章、切至簡體，無 JS 錯誤或失敗資源請求。截圖在忽略區 `.local/release/live-*.png`。iPhone Safari 實機尚未驗證。

## Git 與部署

獨立新 Git `main` 的 origin 為 `https://github.com/qwerty10218/imaginary-library.git`。程式及正文 commit `6e8f8be` 已 Push；GitHub Pages 來源設為 workflow，Actions run `40236235609` build／deploy 成功。首次推送因 Pages 站點未建立而失敗，已修正設定並重新觸發成功。此快照及驗證文件的後續 commit 以 `git log -1` 為準。使用者未追蹤的 `封面.png` 留在本機，不納入提交；忽略區 `.migration-backup`、`.local`、`dist` 均未提交。原《彼岸仍是人間》專案未修改。
