# 原型驗證紀錄

## 2026-10-26：台南篇章標題與聆聽位置

- `npm run check`、`node tests/tainan.mjs`、`node tests/release.mjs` 通過。三篇建置產物以 `EP.XX｜篇名` 開頭，開篇無重複引言；Page／Scroll 與 26 則腳註、音樂播放在 390／1440px Edge headless 回歸通過，正式首作及 1720px 發布回歸亦通過。
- Scroll 模式「延伸聆聽」排在章末註釋之後；Page 模式排在故事正文最後。三篇來源 Markdown 未改。樣式截圖在忽略區 `.local/tainan/title-after-1440.png`、`.local/tainan/listening-end-1440.png`。
- commit `22e5639` 的 Actions run `40294081883` 成功；正式 EP.02 Markdown 的首行、篇末聆聽段及線上 `reader.js` 已核對，開篇舊聆聽引言不存在。

## 2026-10-26：《台南少年追風記》本機驗證

- 三篇入庫 Markdown 與首發包逐檔 SHA-256 相同；建置驗證 11＋10＋5 則註碼、篇末註解及獨立 `notes.json` 一致。
- `npm run check`、`npm test`、`node tests/tainan.mjs`、`node tests/mvp.mjs`、`node tests/release.mjs`、`node tests/immersive.mjs`、`node tests/workflow.mjs`、`node tests/browser.mjs`、`node tests/page-turn.mjs`、`node scripts/check-release.mjs` 通過。新系列於 390／1440px Edge headless 檢查三篇 Page 逐頁非空且無正文溢出、Scroll 註解可點、音樂播放／暫停／進度／音量、跨章不中斷、原首作可讀；既有沉浸式布局亦於 1720px 回歸通過。
- 本機伺服器 MP3 Range 請求為 HTTP 206；三首 MP3 均以使用者確認的對應曲目播放。來源 ID3 標籤均空白，演唱版本由使用者確認。
- 作者已確認三首 MP3 可公開使用；目前 `dist/` 預期只包含這三首，第四首無關歌曲及兩個來源包由 `.gitignore` 排除。iPhone Safari 實機未驗。
- 作者指定封面 SHA-256 與網站副本一致；首頁與作品詳情頁圖片載入且 `object-fit: contain`。正式簡介依作者原文分段顯示。靜態 MP3 以 `/imaginary-library/assets/music/` 相對路徑供應。
- 本次最終 `npm run check`、`npm test`、`node tests/tainan.mjs`、MVP／發布／沉浸式／上稿回歸、`node scripts/check-release.mjs` 通過。GitHub Actions run `40290782382` 成功；正式站三篇 Markdown、封面與三首 MP3 全部 HTTP 200。390／1440px Edge headless 線上實測從書庫進入作品與 EP.01、播放 MP3、唱盤旋轉，無腳本錯誤。線上截圖在忽略區 `.local/tainan/live-*.png`；iPhone Safari 實機未驗。
- 新版包三篇原稿與註解 JSON 和舊包雜湊相同；四個 MP3 複製到新版包後逐檔 SHA-256 相同。本機伺服器改讀新版包，播放器的木質底座、唱針播放狀態、本機檔案 blob 播放與缺檔友善提示於 390／1440px Edge headless 通過。新版展開面板在手機不遮住翻頁鍵；舊包仍保留且忽略。

## 2026-10-26：前三章正式上架驗證

- `npm run check` 通過：語法、4 項進度／隔離單元測試、1 部作品與 3 篇正式章節建置、公開產物舊資料與機密掃描。
- `node scripts/check-release.mjs` 通過：正式封面與三章存在，開頭及足量正文符合發布檢查。封面原件與專案 WebP SHA-256 相同，尺寸 1086×1448。
- 作者附件與入庫 Markdown 比對：前兩章逐字一致；第三章僅有兩個 `***` 視角分隔及作者允許的結尾替換。
- `node tests/workflow.mjs` 通過：新作品 metadata／已登錄 Markdown 會建置，未登錄草稿不進入 dist。
- `node tests/mvp.mjs` 通過：390／1440px 書庫封面、正式三章目錄，隔離測試資料之 Page／Scroll、三主題、腳註、粗斜體、簡繁切換、跨章與雙作品獨立進度。
- `node tests/release.mjs` 通過：390／1440px 正式首頁、詳情及前三章；桌面雙頁、手機單頁逐頁檢查無空白或正文溢出；簡繁偏好在書庫／詳情／章節及重新整理後保持，語言切換後仍可導航、進度章節 ID 未失效。截圖在忽略區 `.local/release/`。
- `node tests/browser.mjs` 原型 15 組尺寸／主題回歸通過；`node tests/page-turn.mjs` 6 組翻頁／主題／尺寸回歸通過。
- 本機預覽 `/imaginary-library/` 無 404。iPhone Safari 實機及正式 GitHub Pages 網址仍待線上驗證。
- GitHub Actions run `40236235609` 的 build／deploy 均成功。正式 `https://qwerty10218.github.io/imaginary-library/`、封面、資料索引、三章 Markdown 及 OpenCC 資源均 HTTP 200；390／1440px Edge headless 線上實測從首頁進入詳情並依序打開前三章，簡體切換正常，沒有 JS 錯誤或失敗資源請求。線上截圖位於 `.local/release/live-*.png`。iPhone Safari 實機仍未測。
- 書內標題字級調整後重新執行 `npm run check` 與 `node tests/release.mjs`，均通過；390／1440px 正式章節逐頁沒有空白或正文溢出，桌面預覽圖見 `.local/release/title-after-1440.png`。
- GitHub Pages run `40236804890` build／deploy 成功；線上 390／1440px Edge headless 計算字級與預期一致，無橫向溢出或失敗請求。線上截圖在 `.local/release/live-book-title-390.png`、`live-book-title-1440.png`。

## 執行環境

Node.js 24、Windows 本機 Microsoft Edge（Playwright headless）。沒有實機 iPhone／Safari 驗證。

## 已執行

- npm run check：語法、四個資料層測試、靜態建置、公開產物舊內容／端點掃描通過。
- npm audit：零已知漏洞。
- 瀏覽器矩陣：360、375、390、430 × 844，以及 1440 × 1000；各 Dark／Light／Warm。逐頁檢查示範正文與腳註無重疊、無水平溢出。
- 基本互動：手機預設 Scroll、設定切 Page、註腳開關、重載恢復、字級與模式切換、文字選取不誤翻頁、reduced motion、儲存阻擋不阻止閱讀。
- 原型測試未發送外部網路請求。
- 原專案完整性：3,703 檔 SHA-256 全量重驗，零變更。
- 備份與四類還原抽驗通過；回退資料及舊 Git 不在新版本控制範圍。

## 修復與額外回歸

首次瀏覽器測試 locator 同時命中隱藏 Page 與 Scroll：改為模式切換釋放隱藏正文，並將測試定位限定至可見容器。

較矮手機大字級含註碼段落發現重疊：修復長段落切分，新增 375×667／24px／2.1 行距逐頁驗證，已通過。長段落回歸確認文字無遺失、粗體與連結保留、註碼不重複；HTML 淨化測試通過。

長段落測試最初把 marked 輸出的區塊外換行也當成正文比較而失敗；確認差異只有末尾格式換行後，改為比較完整區塊正文（不移除區塊內空白），重新執行全套瀏覽器測試通過。

## 未驗證／未完成

- 真實 iPhone Safari、Safe Area 實機、低階手機耗電與影格量測。
- 1,000 作品、正式 metadata／manifest 上稿、完整多作品瀏覽器流程。
- 大圖、超長章末註、表格、長篇效能與跨版本文字錨點恢復。
- 正式雲端身份、資料表、RLS、衝突與重試。
- 本報告不能作為整站發布驗收。

## 2026-10-25：480ms 翻頁精修驗證

- npm run check 通過（語法、四個既有資料層測試、建置及公開內容掃描）。套件未變，沒有重跑與本輪無關的套件升級。
- node tests/browser.mjs：原有 15 組視窗／主題排版與互動回歸通過。
- node tests/page-turn.mjs：390×844／1440×1000，各 Dark／Light／Warm，前後翻頁、靜止頁與正反頁來源、480ms、固定翻轉軸、頁面清理及不重新分頁。
- 邊界及互動：首尾頁、奇數雙頁末頁、12 次快速輸入只排一個後續動作、快速反向、設定中斷、Scroll／Page 往返、關閉／淡入動畫、鍵盤、合成觸控、註腳、文字選取與保存／重載位置。
- 降級：reduced motion、缺少 Web Animations API、缺少 3D 及 CSS.supports API 均直接切換且可繼續前後翻頁。
- .local/page-turn/results.json 保存專項結果；12 個關鍵影格及四張三階段對照圖供第二輪視覺驗收。
- Edge CDP 的單次手機動畫中段 220ms 取樣：LayoutCount 增量 0、RecalcStyleCount 增量 2，見 .local/page-turn/performance.json；此取樣不代表實機耗電或完整效能基準。
- 取捨：固定軸的透視頁面＋動態明暗／邊緣亮帶近似紙張彎曲，沒有連續曲面或拖曳跟手的物理模擬；偏好較輕效果者可選淡入或關閉。
- iPhone Safari／低階手機實機效能、耗電與掉幀數尚未實測；不得將 Edge 的合成觸控驗證視為實機驗證。
- 原型目前只有單一示範章節，已測頁面邊界；正式跨章行為尚不存在，未宣稱跨章測試通過。

## 2026-10-26：MVP 0.1 驗證

- `npm run check`：語法、四個進度測試、建置與公開產物掃描通過；正式產物為 1 部作品、0 篇正式章節。
- `node tests/workflow.mjs`：暫時建立第二部測試作品，驗證 metadata、已登錄 Markdown 與未登錄草稿的建置取捨；測後移除測試來源並重建正式產物。
- `node tests/mvp.mjs`：Edge headless 390×844 與 1440×1000。實際首頁／詳情頁顯示首部作品待上稿；隔離攔截的兩部測試作品驗證 Page／Scroll、三主題、最後一頁跨章、重載、腳註、獨立進度與繼續閱讀。沒有頁面錯誤、404 或外部請求。
- 原有 `node tests/browser.mjs`：15 組尺寸／主題及逐頁腳註排版回歸通過；`node tests/page-turn.mjs`：6 組動畫／主題／尺寸回歸通過。
- 截圖位於 `.local/mvp/`，只供本機驗收，不進 Git；閱讀器截圖中的文字是明確標記的測試佔位內容。
- 尚未驗證真實作者正文、長篇正式章節、iPhone Safari 實機與 GitHub Pages 線上環境。尚未 Push 或部署。

## 2026-10-26：首作封面與發布阻擋驗證

- 封面來源為使用者指定 WebP，實測 1086×1448；複製後 SHA-256 與來源一致。
- `npm run check` 通過；正式產物有新封面與作者提供的完整簡介，仍只有 0 篇章節。
- `node tests/mvp.mjs` 於 390×844／1440×1000 Edge headless 通過；首頁與詳情頁的封面 `naturalWidth/naturalHeight` 均為 1086×1448，圖片請求無 404。隔離測試章節的跨章及進度回歸通過。
- `node scripts/check-release.mjs` 因缺少兩章原稿按設計失敗。此為部署前必要阻擋，不能當正式內容驗收通過。
- 本輪最終回歸：`node tests/workflow.mjs`、原 15 組 `node tests/browser.mjs` 與 6 組 `node tests/page-turn.mjs` 均通過；Pages YAML 可解析為 build／deploy 兩個 job。首次 MVP 回歸因作品頁非同步載入的測試等待不足而失敗，補上明確載入等待後重跑通過，產品程式無此錯誤。
- GitHub Pages 與真實兩章閱讀流程尚未驗證；不 Push、不部署。

## 2026-10-26：簡體字型及「抬」字回歸

- 本機重現 OpenCC 將「抬起頭來」輸出為「擡起头来」，修正後簡體閱讀顯示「抬起头来」，不含「擡」；繁體原稿未修改。
- `npm run check` 通過：語法、四項進度測試、正式建置與公開內容掃描。
- `node tests/release.mjs` 通過：390×844／1440×1000 Edge headless，正式第二章簡體 Scroll 字形、SC 字型宣告、Page 往返、各章完整分頁、無資源錯誤。
- 目前瀏覽器測試只確認 CSS 字型宣告與 Windows 字型安裝情況；iPhone Safari 的實際字型與畫面尚未實機驗證。
- GitHub Actions run `40237266006` 部署成功；正式站 CSS、`language.js`、第二章原稿 HTTP 200。390／1440px Edge headless 線上驗證簡體字形及 SC 字型宣告通過，無頁面腳本錯誤。

## 2026-10-26：沉浸式布局與主題閃動

- 修改前／後暖紙截圖：`.local/immersive/before-{1440,1720,390}.png`、`after-{1440,1720,390}.png`；1720px 翻頁中段：`after-turn-warm-1720.png`。這些圖片留在忽略區，未進公開產物。
- `npm run check` 通過：語法、進度測試、建置、公開內容掃描。`node tests/immersive.mjs` 通過：1440×900、1720×864、390×844，高度分別 790、754、701px；左右按鈕置中且無水平溢出，暖紙前後翻頁、按鈕焦點後鍵盤、Page／Scroll、進度、簡繁與跨章首幀主題均正常；本機儲存被封鎖時仍可閱讀。
- `node tests/release.mjs` 通過：三尺寸正式前三章逐頁掃描，無空白、正文／腳註溢出，章末右側翻頁進入下一章。`node tests/mvp.mjs` 通過：兩尺寸測試作品、獨立進度及腳註。`node tests/page-turn.mjs` 通過 6 組動畫回歸，`node tests/browser.mjs` 通過 15 組原型排版回歸。
- 暖紙模式連續翻頁未重現持續切換主題；已確認舊 HTML 跨章載入時先顯示預設 Dark Mode，改為解析 body 時立即還原偏好。實機 iPhone Safari 尚未驗證。
- GitHub Actions run `40238610296` build／deploy 成功；正式站 1720×864／390×844 Edge headless 書本高度 754／701px、側邊翻頁鍵可見、暖紙首幀穩定、無水平溢出或 JS 錯誤。線上截圖在 `.local/immersive/live-after-*.png`。


## 2026-10-26：MVP 最終整合驗收

驗收產物來自 HEAD 444b221 加本輪修正的獨立目錄 `.local/release-tree`（4174），不含平行的新作品／音樂功能。`npm run check` 通過語法、4 組進度測試、1 作品／3 章建置及公開內容掃描；`scripts/check-release.mjs` 通過。既有 `release.mjs`、`mvp.mjs`、`browser.mjs`（15 組）、`page-turn.mjs`（6 組）、`immersive.mjs` 均通過。原型測試驗證共用動畫；新增 final-qa 驗證正式頁。

- Edge/Chromium headless：1920×1080、1720×864、1440×900、390×844、375×667。首頁封面與詳情 CTA 首屏可見，三章逐頁無正文溢出，末章返回目錄、不指向第四章；手機 Page／Scroll、章末、繁簡與儲存偏好通過。
- 拖曳選字、實際 Ctrl+C／剪貼簿讀回、Shift 選取不翻頁、帶選取的箭頭按鈕／快捷鍵翻頁、選取時觸控滑動不翻頁通過。手機實體長按系統選單未實機驗證。
- 正式頁手動暫停 WAAPI 擷取 0／120／240／360／約 480ms（479.9ms）的畫面，測試暫時延長 watchdog 以容納截圖，正常時序測試不改 watchdog。圖檔：`.local/final-qa/fold-{width}-{time}.png`。五尺寸皆確認 480ms、旋轉矩陣與單一 overlay；快速連點、反向、resize 後清理通過。三主題中斷、跨章中斷另經本機測試通過。
- 中間幀人工檢視可看見不透明紙張正反面旋轉與落頁，未見透明文字交疊。原本錄影未提供，不能聲稱確認該錄影的瞬切／重影真正根因；目前可確認修復的是容器裁切與選取鎖定。
- 透過 CDP `CSS.getPlatformFontsForNode`，繁體明體實際 Noto Serif TC、簡體明體 SimSun、簡體黑體 Microsoft YaHei。原專案 CSS 的預設黑體以隔離探針測得 Microsoft JhengHei UI，未啟動原網站及其外部服務；此為同機 CSS 探針，不是原站完整執行狀態。結果在 `.local/final-qa/results.json` 與 `original-font-probe.json`。
- 乾隆維持乾隆；URL／ID／程式碼不轉換。繁簡與 Page／Scroll 往返、語言保存與段落定位通過；375／1720px 額外確認重新整理時在建立測量 rig 前已是 zh-CN，逐頁無溢出。
- 正式前三章及封面未修改；不包含測試截圖、私人備份、原小說或任何新章。iPhone Safari 真機未測，不能以此模擬驗收代替。

- 線上驗證：`f5071e3` 的 Actions run `40288298449` completed／success。1720×864、390×844 Edge headless 實測首頁一部正式作品、封面正常、CTA 在簡介之前、前三章有正文、殘留選取後箭頭可翻頁且有 480ms overlay、簡體重載保持。無 pageerror／HTTP 400+；畫面在 `.local/final-qa/live/`。


## 2026-10-26 首頁與閱讀器 UX 本機驗收

驗證環境：Windows／Node 24／Playwright Edge headless；375×667、390×900、430×900、1440×900。比較基準、截圖與結果：.local/ux/baseline.json、results.json、review.html 與 before-*／after-* PNG。

已執行且通過：
- npm run check：JS 語法、4 項進度測試、build、公開產物稽核（3 部作品、7 章）。
- npm test：6 項單元測試（包含分類多重歸類、最近閱讀排序／完讀隱藏／不寫入舊紀錄）。
- node scripts/check-release.mjs：既有正式內容 gate。
- node tests/ux.mjs：四尺寸首頁首屏入口、分類、簡介收合、閱讀紀錄收合且不刪除；Aa 三模式、偏好還原、中段調字不回頂；三主題 hr；註解開關、跨章原曲繼續；台南三篇逐頁溢出／分場保留；播放器展開後 Page 書頁與工具區無交疊；其他兩書可讀，無 JS／HTTP 失敗與橫向溢出。
- node tests/release.mjs：390／1440／1720px 三章、繁簡、封面、翻頁。
- node tests/shen.mjs：390／1440px 新書功能、選字、進度還原、舊書入口。
- node tests/tainan.mjs：390／1440px 三章、26 註、三首 MP3、跨章播放、音量／進度、本機選檔、缺檔提示、逐頁檢查。
- node tests/immersive.mjs：1440／1720／390px、主題首幀、鍵盤、模式與進度；書高分別 736／700／645px。
- node tests/page-turn.mjs：6 組動畫／主題／尺寸、連續翻頁、模式中斷、降級、選字與進度。
- 內容保全：16 份 content 及 MP3 檔 SHA-256 和任務開始一致；git diff --check 通過。

失敗與修正：初次工具高度變數寫在 root、被 body 預設覆蓋，已改寫 body 後重跑四尺寸通過。台南測試原固定 100 頁在播放器展開的 EP.02 136 頁失敗，查明確實逐頁前進，改為真實頁數上限並新增前進斷言，完整測試通過。新測試初次點到書卡連結而非摺疊控制、以及讀取收合 details 的 innerText，已修正測試操作與讀值。

人工待驗：首頁視覺與分類命名、手機觸控手感、iPhone Safari 真機安全區域／工具列。CSS 已處理 env(safe-area-inset-*) 與 dvh，但不能以 Edge 模擬代替真機。現行書目只有三部作品，沒有《彼岸仍是人間》可回歸；本輪只讀其遷移快照 CSS，不碰原專案。現行閱讀器不存在 TTS 控制或 speechSynthesis 實作，TTS 未驗收，未另加一套。所有變更留本機，未 Commit／Push／部署。


### 2026-10-26 作者驗收與正式發布授權

作者已確認 UX 畫面 OK，明確授權測試後 Push 為正式版本。本次只提交首頁／閱讀器 UX、相關測試與本輪文件；既有 EP.03 正文校訂、.gitignore 及其他無關變更排除。npm run check、npm test（6 項）與發布 gate 已通過；正式部署結果將另行續記。


### 2026-10-26 UX 正式版本發布完成

作者已視覺驗收並授權正式發布。UX 提交 `1c079aa` 已 Push，GitHub Pages Actions `40336560855` build／deploy 成功。正式站 https://qwerty10218.github.io/imaginary-library/ 的首頁、閱讀頁、CSS、library／library-model／reader／music-player 腳本與待發布產物 SHA-256 一致；台南 EP.03 也和提交樹一致，沒有混入本機未提交校訂。正式站 Edge headless 375×667、390×900、430×900、1440×900 完整 UX 流程通過，涵蓋分類／摺疊、最近閱讀、Aa 三模式與偏好還原、三主題分場、註解、音樂跨章與逐頁檢查，無腳本或 HTTP 失敗。

線上音訊載入較慢，tests/ux.mjs 新增等待播放狀態與自動收合完成後再操作；保留原斷言，未改網站播放功能。6 項單元測試、check／build、發布 gate 通過。工作區原有 .gitignore、EP.03 校訂與無關接續文字保留、排除發布。iPhone Safari 實機未驗；現行書目無《彼岸仍是人間》，現行閱讀器無 TTS 實作，未宣稱驗證。

## 2026-10-26 手機分頁有效容量與重排（本機待驗收）

本輪僅改 web/css/reader.css 的手機Page規則及 web/js/reader.js 的手機分支；沿用599px手機與959px單頁斷點（959px內僅觸控橫向視窗套用），桌面原排版不動。保留88vw卡片與既有工具布局，Page左右內距28→24px、上下21/12→12/6px、頁眉31→20px、頁內頁碼20px；原頁外29px頁碼改由頁內顯示「目前頁／總頁」，原aria-live節點以視覺隱藏保留且不占布局。減少章標及段間留白，段距.65em、行距偏好不變；移除裝飾層但保留單頁緣／紙張色差與輕陰影。手機書高依真實dock／Safe Area計算回收多餘預留，100dvh具100vh後備。

實測原未設定字級為20px，依作者需求改為手機新使用者18px，桌面仍20px；有效18／20／22／24px既有偏好不改，不新增16px。手機visualViewport與window resize／dock高度變化共用160ms節流重新分頁。新測試重現重載進度可能回前一頁：首次分頁時dock高度尚未確定、第二次分頁capture覆蓋原anchor；改為手機首次render前先讀真實dock高度，並合併手機重排排程。未改分頁核心、儲存格式、小說、音樂、繁簡與註解資料；未改桌面既有重排路徑。

同EP.01、18px、1.9行距、明體、播放器收合／Aa常駐，實際DOM量測：375×667正文272×338→280×421px、70→49頁、全章平均53.9→77.0正文顯示字元／頁，第一頁79→92字元；390×844為285.2×515→293.2×598px、45→34頁、83.9→111.0字元／頁，首頁112→128；430×932為320.4×603→328.4×686px、35→28頁、107.9→134.8字元／頁，首159（原128）。深／淺主題數據一致。分頁仍從內容容器扣原8px安全餘量；字元含正文標點／章標／註碼、排除空白／頁眉／頁碼／註釋正文；全章3775字元前後完全一致，平均分母包含完整分頁。六組逐頁按data-idx／data-start重組來源全文、逐頁邊界、11註與分場數量均通過，無漏字重複或裁切。

新增 tests/mobile-capacity.mjs（CAPACITY_PHASE=before記錄基準，預設after）、tests/mobile-reflow.mjs（手機預設與既有24px保存、18／22／24px、1.7／1.9／2.1行距、進度恢復、視窗縮短120px、667×375／844×390／932×430橫向與返回直向、visualViewport事件、工具展開、手勢、480ms摺頁）。測試初版兩項工具錯誤為範圍包含量測rig造成多元素選擇及Touch事件缺identifier，均修正後重跑；進度失敗另如上修正真實初始化競態。最終capacity六組、reflow三組、mobile-layout四尺寸、UX四尺寸、tainan三篇／26註／三首歌、vinyl五尺寸、npm run check、6項單元測試、release gate全部通過。

1440×900桌面深／淺主題前後PNG位元完全相同；保留原字級、頁框、寬度、控制與翻頁模組。完整數據定義與比較報告 .local/mobile-capacity/REPORT.md；before.json／after.json 與 before/after-{375,390,430}-{dark,light}-{first,body,notes,scene}.png。Safari真機／實際工具列與Home Indicator未驗，本機WebKit執行檔不存在；僅以Edge headless模擬viewport變化，不能宣稱Safari通過。現有專案無TTS實作。保留先前所有本機差異；本輪未Commit、Push、部署。

## 2026-10-26 手機閱讀器驗收與發布授權

Gary 已指示「push一下」，授權本輪手機閱讀寬度、底部工具布局與分頁容量修改發布。提交範圍僅閱讀器 CSS／手機分支、相關測試與本輪紀錄；EP.03 校訂、.gitignore、來源包及其他既有差異仍排除。正式部署與線上驗證結果另續記。

## 2026-10-27 手機閱讀器正式發布驗證

依 Gary「push一下」授權，手機閱讀器程式提交 dfb993d 已 Push 至 main；Pages Actions 40355011243 的 build／deploy 均成功。精確提交樹的 npm run check、6項單元測試及 release gate 通過；容量深淺六組、重排／進度／橫向三組、UX四尺寸、台南三篇／26註／三首歌回歸通過。

正式站 reader.html、reader.css、music-player.css、reader.js、music-player.js 及 EP.03 顯示產物 SHA-256 與本次提交樹建置一致，沒有混入本機 EP.03 校訂。Edge headless 正式站375×667、390×844、430×932測得正文區分別280×421、293.21875×598、328.40625×686px，頁數49／34／28；逐頁操作、重載進度、Aa、音樂播放／暫停均通過。1440px桌面預設20px與雙頁通過。線上截圖 .local/mobile-capacity/live-{375,390,430}.png。iPhone Safari真機仍未驗。

原工作區 .gitignore、EP.03校訂、其他既有文件差異、來源包與根目錄圖片保留，沒有納入本輪提交。前述「本機待驗收／未發布」為歷史紀錄，以本段為準。