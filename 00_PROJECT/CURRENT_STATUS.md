# 目前狀態

日期：2026-10-26。

台南篇章顯示產物的標題已統一為 `EP.XX｜篇名`，原稿開頭重複的系列／聆聽引言不再出現在正文前；曲目與場景改在故事結尾的「延伸聆聽」顯示，Scroll 模式置於章末註釋之後。三篇來源 Markdown 未改動，腳註與音樂對應維持原樣。

此排版修正 commit `22e5639` 已上線，Actions run `40294081883` 成功；正式 EP.02 Markdown 與閱讀器腳本已核對為新版。

台南系列本輪已發布：內容 commit `0e7767f` 已 Push，GitHub Actions run `40290782382` build／deploy 成功。正式站兩作品、六章；台南系列封面、三篇 Markdown、三首授權 MP3 均 HTTP 200。390／1440px Edge headless 線上從書庫進入 EP.01 並試播成功。iPhone Safari 實機未驗。下方早期首作發布紀錄為歷史資訊。

《台南少年追風記》EP.01〈夏夜晚風〉、EP.02〈擁抱〉、EP.03〈安平之光〉已接入書庫與現有閱讀器。三篇 Markdown 與作者新版包 SHA-256 相同；26 則文化註解由獨立 `notes.json` 建置為可點擊腳註。作品使用作者指定封面與完整簡介，封面不裁切。使用者已確認伍佰／五月天／海豚刑警三首 MP3 的曲目版本與公開使用授權；只有這三首進入靜態建置，第四首無關音檔未納入。切章不打斷目前播放。390／1440px Edge headless 的整合與逐頁檢查通過，iPhone Safari 實機未驗。

使用者指定 `台南少年追風記_MP3唱盤整合版新版/` 為主要來源；其三篇正文與文化註解和舊包相同。播放器已採用新版木質唱盤、唱針靠近／退回及瀏覽器本機 MP3 選檔。來源包仍由 `.gitignore` 排除，正式站只部署挑選出的三首授權 MP3。舊包遞迴刪除遭自動核准審查拒絕，故暫保留。缺檔提示與本機檔案選取已在 Edge headless 驗證。

《臆想書房》MVP 0.1 已接入首作《朕都穿越了，怎麼還是你這奸臣？！》的作者正式封面、簡介與前三章 Markdown。作品 ID 為 `zhen-du-chuanyue`，連載中；第四章尚未提供，不在目錄與公開產物。第三章以段落分隔標示和珅內心視角，結尾採用作者允許的短句版本。

書庫 → 詳情 → 章節目錄 → Page／Scroll 正文 → 下一章均在本機可用。手機預設 Scroll、可切單頁 Page；桌面預設雙頁。Dark／Light／Warm Paper、腳註、翻頁及作品獨立本機進度沿用原型。正式閱讀頁已收斂頂部工具列，桌面 Page 書本在 1720×864 為 754px 高，翻頁鍵位於兩側，底部只留進度；Scroll 仍保留上下章連結。已儲存的閱讀主題於章節頁首幀生效，避免跨章時先閃 Dark Mode。書內章節標題已按讀者意見放大，分頁測量同步使用相同尺寸。簡繁切換復用原閱讀器 OpenCC 1.0.5 `tw→cn`，繁體 Markdown 為唯一來源，偏好使用新專案的 localStorage 鍵保存。簡體顯示使用 SC 字型序列，並將 OpenCC 輸出的異體「擡」顯示為「抬」。靜態 Pages 無訪客 IP 地區資料，因此預設繁體並提供手動切換。

本機 `npm run check`、發布檢查、新作品上稿測試、390／1440px 正式內容瀏覽器測試及 MVP 測試已通過。原型回歸通過；正式 GitHub Pages 線上首頁、封面與前三章於 390／1440px Edge headless 實測通過，詳見 `QA_REPORT.md`。iPhone Safari 實機未驗證。雲端同步、登入、TTS 均未啟用。

已 Push 並部署至 `https://qwerty10218.github.io/imaginary-library/`；首次 Pages 設定缺失已修正，GitHub Actions run `40236235609` 的 build／deploy 成功。Commit 與後續接續狀態以最新 `AI_SYNC_BRIEF.md` 為準。使用者未追蹤的 `封面.png` 保留在本機，不納入提交。


## 2026-10-26 集中修正補充

本輪修正選字鎖定、翻頁輪廓裁切、章末導覽、標題孤行風險、簡體初始測量順序與閱讀入口位置。維持現有 OpenCC、480ms fold、沉浸式書頁、前三章正式內容與個人字型選擇。五種指定尺寸的 Edge headless 驗收通過；iPhone Safari 實機與原讀者錄影情境未驗證。新作品／音樂播放器等平行未提交工作保留於工作區，不屬於本輪發布範圍。

- 本輪程式 `f5071e3` 已發布；Actions `40288298449` 成功。正式站 1720／390px 已再驗通過，網址 https://qwerty10218.github.io/imaginary-library/ 。平行未提交工作仍留本機。


## 2026-10-26 《叫我沈總》正式上架

《叫我沈總》第一章已完成本機上架，3 部作品／7 章。npm run check、發布 gate、新書 390／1440px 整合通過；正在依 main push → GitHub Actions Pages 流程發布。既有台南 EP.03 與接續文件修改保留工作區、排除本次提交。封面採來源原檔，圖中未見說明所稱副標；未加字。現有閱讀器無 TTS 控制／實作，TTS 未驗；Safari 實機未驗。


### 《叫我沈總》發布驗收結果

內容 commit `4de5de1` 已 Push，Pages Actions run `40306251293` build／deploy 成功。正式首頁、詳情、閱讀頁、索引、第一章、封面皆 HTTP 200，正文與封面 SHA-256 和本機一致。正式站 390／1440px Edge headless 書庫→作品→閱讀→繁簡→翻頁／滾動→進度恢復→返回目錄→舊書回歸通過，無腳本或失敗資源；本機 release 390／1440／1720px、台南 26 註與音樂、6 組動畫回歸均通過，精確提交樹的 check 與發布 gate 亦通過。iPhone Safari 實機未驗；現有站無 TTS 介面及 OG 分享圖系統，未新增或宣稱驗收。正式章節：https://qwerty10218.github.io/imaginary-library/reader.html?work=jiao-wo-shen-zong&chapter=001 。


## 2026-10-26 首頁與閱讀器 UX 本機驗收

首頁與閱讀器 UX 本機修改完成，等待作者視覺驗收；沒有 Commit、Push、Pages 發布或雲端變更。原工作區 .gitignore、台南 EP.03 校訂及既有接續文件差異均保留。

1440px 無進度時書庫標題由約 506px 提前至 350px，主標由 115.2px 降為 64.8px；390px 標題由約 403px 提前至 293px，主標 52px → 39px。新增分類／簡介摺疊、最近一本繼續閱讀、共用播放器／Aa 工具區、原設定面板入口及正文低對比分場虛線。本機書庫 http://127.0.0.1:4173/imaginary-library/；前後對照 http://127.0.0.1:4174/ （伺服器存續期間可用），靜態對照檔與截圖在 .local/ux/。

check／build、6 項單元測試、release gate、UX 375／390／430／1440px、release、shen、tainan、immersive、page-turn 均通過。現行公開書目無《彼岸仍是人間》，本輪只讀回退 CSS；現行閱讀器無 TTS 實作，無法驗該功能。iPhone Safari 真機／實際 Home Indicator 與瀏覽器工具列仍待人工確認。


- 2026-10-26 預覽連線排查：4173 未監聽，已重新啟動既有 scripts/preview.mjs；4174 對照服務仍在。Codex 內建瀏覽器已實際重載對照頁並開啟本機書庫，皆正常。此輪沒有程式修改、Commit／Push／部署；預覽服務停止或電腦重啟後須重新啟動。


### 2026-10-26 作者驗收與正式發布授權

作者已確認 UX 畫面 OK，明確授權測試後 Push 為正式版本。本次只提交首頁／閱讀器 UX、相關測試與本輪文件；既有 EP.03 正文校訂、.gitignore 及其他無關變更排除。npm run check、npm test（6 項）與發布 gate 已通過；正式部署結果將另行續記。


### 2026-10-26 UX 正式版本發布完成

作者已視覺驗收並授權正式發布。UX 提交 `1c079aa` 已 Push，GitHub Pages Actions `40336560855` build／deploy 成功。正式站 https://qwerty10218.github.io/imaginary-library/ 的首頁、閱讀頁、CSS、library／library-model／reader／music-player 腳本與待發布產物 SHA-256 一致；台南 EP.03 也和提交樹一致，沒有混入本機未提交校訂。正式站 Edge headless 375×667、390×900、430×900、1440×900 完整 UX 流程通過，涵蓋分類／摺疊、最近閱讀、Aa 三模式與偏好還原、三主題分場、註解、音樂跨章與逐頁檢查，無腳本或 HTTP 失敗。

線上音訊載入較慢，tests/ux.mjs 新增等待播放狀態與自動收合完成後再操作；保留原斷言，未改網站播放功能。6 項單元測試、check／build、發布 gate 通過。工作區原有 .gitignore、EP.03 校訂與無關接續文字保留、排除發布。iPhone Safari 實機未驗；現行書目無《彼岸仍是人間》，現行閱讀器無 TTS 實作，未宣稱驗證。
