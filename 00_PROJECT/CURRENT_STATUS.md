# 目前狀態

日期：2026-10-26。

《臆想書房》MVP 0.1 已接入首作《朕都穿越了，怎麼還是你這奸臣？！》的作者正式封面、簡介與前三章 Markdown。作品 ID 為 `zhen-du-chuanyue`，連載中；第四章尚未提供，不在目錄與公開產物。第三章以段落分隔標示和珅內心視角，結尾採用作者允許的短句版本。

書庫 → 詳情 → 章節目錄 → Page／Scroll 正文 → 下一章均在本機可用。手機預設 Scroll、可切單頁 Page；桌面預設雙頁。Dark／Light／Warm Paper、腳註、翻頁及作品獨立本機進度沿用原型。書內章節標題已按讀者意見放大，分頁測量同步使用相同尺寸。簡繁切換復用原閱讀器 OpenCC 1.0.5 `tw→cn`，繁體 Markdown 為唯一來源，偏好使用新專案的 localStorage 鍵保存。簡體顯示使用 SC 字型序列，並將 OpenCC 輸出的異體「擡」顯示為「抬」。靜態 Pages 無訪客 IP 地區資料，因此預設繁體並提供手動切換。

本機 `npm run check`、發布檢查、新作品上稿測試、390／1440px 正式內容瀏覽器測試及 MVP 測試已通過。原型回歸通過；正式 GitHub Pages 線上首頁、封面與前三章於 390／1440px Edge headless 實測通過，詳見 `QA_REPORT.md`。iPhone Safari 實機未驗證。雲端同步、登入、TTS 均未啟用。

已 Push 並部署至 `https://qwerty10218.github.io/imaginary-library/`；首次 Pages 設定缺失已修正，GitHub Actions run `40236235609` 的 build／deploy 成功。Commit 與後續接續狀態以最新 `AI_SYNC_BRIEF.md` 為準。使用者未追蹤的 `封面.png` 保留在本機，不納入提交。
