# 原型驗證紀錄

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
