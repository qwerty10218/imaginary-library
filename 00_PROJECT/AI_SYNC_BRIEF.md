# 臆想書房 — 接續快照

日期：2026-10-26。本文件只描述新專案；原作只讀，不能套用原遠端或作品規範。

## 最新：台南系列封面與三首授權音檔

使用者指定新版包的 `台南少年追風記封面.png`，副本已原樣放入 `web/assets/covers/tainan_youth_wind_cover.png`；metadata 已加入作者提供的完整簡介與首頁摘要。使用者明確確認伍佰〈夏夜晚風〉、五月天〈擁抱〉、海豚刑警〈安平之光〉三份 MP3 均取得公開使用授權。網站正式靜態資源 `web/assets/music/` 只收這三首，與新版包來源 SHA-256 相同；第四首無關音檔及兩個來源包仍排除於 Git／建置之外。`dist/` 現有兩作品、六章、三首 MP3。以下較早「待授權／公開版無 MP3／未發布」紀錄屬歷史狀態，以本段及實際 Git／Pages 狀態為準。原作專案未修改，使用者未追蹤的根目錄 `封面.png` 未碰觸。

內容 commit `0e7767f` 已 Push，GitHub Actions run `40290782382` build／deploy 成功。正式站首頁、作品頁、三篇 Markdown、封面與三首 MP3 均 HTTP 200；390／1440px Edge headless 線上從書庫進入 EP.01 並試播 MP3 成功，唱盤旋轉，無腳本錯誤。線上截圖在忽略區 `.local/tainan/live-*.png`；iPhone Safari 實機未驗。此段發布後狀態優先於下方歷史紀錄。

## 本機待發布：《台南少年追風記》

已在本機把 EP.01〈夏夜晚風〉、EP.02〈擁抱〉、EP.03〈安平之光〉接入新作品 `tainan-youth-wind`。三篇 `content/works/tainan-youth-wind/chapters/` 與首發包 Markdown SHA-256 相同；26 則文化註解在獨立 `notes.json`，建置時轉為原閱讀器的可點腳註。作者 Gary Lee 與〈夏夜晚風〉伍佰、〈安平之光〉海豚刑警版本由使用者確認；〈擁抱〉檔名標示五月天，四個 MP3 都沒有 ID3 標籤，其中一首溫室雜草歌曲未使用。

本機播放器使用 `scripts/local-music.json` 對應忽略區首發包的三首 MP3，預覽伺服器支援 Range。公開 `dist/` 無 MP3；未取得公開播放授權前，公開頁只顯示選曲與待授權提示。切章時原曲與播放狀態保留，由讀者自行切換。本輪 `npm run check`、新系列 390／1440px 三篇逐頁／26 註／三首音樂測試、MVP、正式首作、沉浸式、原型、動畫及上稿回歸均通過；iPhone Safari 實機未驗。新增截圖在忽略區 `.local/tainan/`。

此輪**未 Commit、Push 或部署台南系列**。期間曾有同期其他閱讀器／介面變動，沒有擅自還原；使用者未追蹤的 `封面.png` 保留。後續若要公開，先共同審查所有工作樹差異、確認三篇發布意願與音樂公開使用權，且絕不可提交首發包 MP3。

使用者後續指定 `台南少年追風記_MP3唱盤整合版新版/` 為主要來源。其三篇 Markdown 與 26 則註解 JSON 和舊包雜湊相同；四個 MP3 已逐檔複製到新版包並以 SHA-256 確認一致。本機預覽已改讀新版包；木質底座、播放時靠向唱片的唱針、可收合控制、單頁內本機 MP3 選檔已接入現有閱讀器。選檔不會上傳，公開產物仍無 MP3。新版有檔、缺檔提示、選檔與既有閱讀器於 390／1440px Edge headless 測試通過。

舊包仍在本機：遞迴刪除遭自動核准審查拒絕（policy blocked），未以替代刪除方式繞過。兩個來源包都被 `.gitignore` 排除，使用者未追蹤的 `封面.png` 也未觸碰。這輪沒有 Commit、Push 或部署台南系列；最後檢查時本機 `main` 與 `origin/main` 為 `434f757`，該提交屬同期其他工作，不含本輪未提交整合。正式公開前須審查本輪全部差異，並確認小說發布意願與音樂公開使用權。

## 正式內容與功能

MVP 0.1 書庫、作品詳情、Markdown 閱讀器與首作前三章已正式上線：[臆想書房](https://qwerty10218.github.io/imaginary-library/)。作品 ID `zhen-du-chuanyue`；作者正式 1086×1448 WebP 封面、短／完整簡介、架空歷史說明與章節 `001.md` 至 `003.md` 均公開。第四章尚未提供，未創作、未登錄。第一、二章與作者附件逐字一致；第三章只加兩處視角分隔，結尾採作者允許版本。

全站簡繁切換復用原閱讀器 OpenCC 1.0.5 `tw→cn`，本機精簡模組位於 `web/js/vendor/opencc.js`。偏好存於 `imaginary-library:v1:language`；繁體 Markdown 為唯一來源。Page／Scroll、手機單頁、桌面雙頁、三主題、腳註、翻頁動畫與作品獨立本機進度均保留。無 IP 定位、外部定位 API、帳號或雲端同步。

簡體模式已加 SC 字型序列；OpenCC 將來源「抬」誤轉成異體「擡」時，顯示層改回「抬」。第二章簡體全文在 390／1440px Edge headless 通過字形、字型宣告與 Scroll／Page 往返驗證；原稿、分頁核心與進度格式未改。

簡體修正 commit `4b02bba` 已 Push；GitHub Actions run `40237266006` build／deploy 成功，正式站 390／1440px Edge headless 的第二章簡體字形與 SC 字型宣告通過。iPhone Safari 實機仍未驗證。

本輪沉浸式閱讀頁改造已上線：程式 commit `f24dc3e` 的 GitHub Actions run `40238610296` build／deploy 成功。桌面書本高度於 1720×864 從 580px 增至 754px，工具列精簡、書頁外重複章名收起、左右側翻頁、底部僅進度；Scroll 上下章連結保留。章節 HTML 在首幀即還原已儲存的閱讀主題，暖紙翻動陰影減輕。`npm run check`、`tests/immersive.mjs`、`tests/release.mjs`、`tests/mvp.mjs`、原型動畫與排版回歸均通過；正式站 1720／390px Edge headless 再驗高度、側鍵與暖紙首幀。前後及線上截圖在忽略區 `.local/immersive/`。原專案與章節正文未改，iPhone Safari 實機未測。

讀者提出書內章節標題偏小後，書內大標題與頁頂小章名已適度放大；書頁上方的獨立標題維持原樣，分頁測量同步套用標題尺寸。樣式 commit `68855d5` 的 Pages build／deploy 已成功，390／1440px 線上與本機實測通過；沒有頁面溢出或失敗請求。

## 驗證與限制

`npm run check`、發布檢查、新作品上稿測試、390／1440px 正式內容及 MVP 瀏覽器測試、原型 15 組測試、翻頁 6 組測試均通過。線上首頁、封面、索引、三章及 OpenCC 均 HTTP 200；390／1440px Edge headless 從線上首頁依序讀到第三章、切至簡體，無 JS 錯誤或失敗資源請求。截圖在忽略區 `.local/release/live-*.png`。iPhone Safari 實機尚未驗證。

## Git 與部署

獨立新 Git `main` 的 origin 為 `https://github.com/qwerty10218/imaginary-library.git`。程式及正文 commit `6e8f8be` 已 Push；GitHub Pages 來源設為 workflow，Actions run `40236235609` build／deploy 成功。首次推送因 Pages 站點未建立而失敗，已修正設定並重新觸發成功。此快照及驗證文件的後續 commit 以 `git log -1` 為準。使用者未追蹤的 `封面.png` 留在本機，不納入提交；忽略區 `.migration-backup`、`.local`、`dist` 均未提交。原《彼岸仍是人間》專案未修改。


## 2026-10-26 MVP 集中修正接續

本輪沿用現有 OpenCC，沒有建立新語言系統。修復明確翻頁被 Selection 阻擋、旋轉輪廓裁切及簡體偏好在分頁之後才套用；新增章末低調導覽、同步測量的標題換行樣式、首頁留白與詳情 CTA 調整。正式三章與封面不變。`tests/final-qa.mjs` 為正式頁五尺寸回歸；完整結果、字型實測與限制見 QA_REPORT。動畫原錄影未取得，瞬切／重影未重現，不能編造根因。Safari 真機未驗證。

工作區另有進行中的新作品／音樂播放器與相關修改；本輪以 `.local/release-tree` 的乾淨基準加修正驗收，只提交本輪部分，保留工作區其他修改。回退快照在 `.local/mvp-baseline-*`，原專案只讀。發布狀態以下續記為準。

- 發布完成：程式 commit `f5071e3` 已 Push，Actions run `40288298449` build／deploy 成功。正式站 1720／390px 驗證通過，僅首作三章；平行的新作品／音樂與相關文件未混入本輪提交。最新 Git HEAD 可能是本發布紀錄的文件 commit。
