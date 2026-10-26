# 臆想書房 — 接續快照

日期：2026-10-26。本文件只描述新專案；原作只讀，不能套用原遠端或作品規範。

台南三篇閱讀顯示已將原稿開篇重複的系列／聆聽引言移出正文前方，章標題統一為 `EP.XX｜篇名`；曲目與場景在正文最後的「延伸聆聽」，Scroll 模式排在章末註釋之後。原始三篇 Markdown 未修改。`npm run check`、台南系列 390／1440px 瀏覽器測試、正式發布回歸通過；本次修改的 Git／Pages 狀態以最新 `git log` 與 Actions 為準。

此排版修正的內容 commit `22e5639` 已 Push；Actions run `40294081883` build／deploy 成功。正式 EP.02 Markdown 首行與篇末聆聽資訊及線上閱讀器腳本均已核對為新版。後續狀態紀錄提交以 `git log -1` 為準。

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


## 2026-10-26 《叫我沈總》正式上架

本輪新增 jiao-wo-shen-zong《叫我沈總》第一章，唯一母本為叫我沈總_正式上架包/01_第一章原稿.md。原句逐段保留，增補 740 漢字，正文 2,429 漢字；只有末尾完章標記移除，最後對白固定為勞斯萊斯。來源 cover.png 原檔已接入（圖中未見所稱副標，不加字）。plot-notes.md 不進 dist；沒有續章。新書手機桌面整合與 check 通過，發布結果待續記。TTS 目前沒有實作可驗，Safari 未實測。工作區既有台南 EP.03 與六份文件修改留存且不混入本次提交；來源包與根目錄圖片不提交。


### 《叫我沈總》發布驗收結果

內容 commit `4de5de1` 已 Push，Pages Actions run `40306251293` build／deploy 成功。正式首頁、詳情、閱讀頁、索引、第一章、封面皆 HTTP 200，正文與封面 SHA-256 和本機一致。正式站 390／1440px Edge headless 書庫→作品→閱讀→繁簡→翻頁／滾動→進度恢復→返回目錄→舊書回歸通過，無腳本或失敗資源；本機 release 390／1440／1720px、台南 26 註與音樂、6 組動畫回歸均通過，精確提交樹的 check 與發布 gate 亦通過。iPhone Safari 實機未驗；現有站無 TTS 介面及 OG 分享圖系統，未新增或宣稱驗收。正式章節：https://qwerty10218.github.io/imaginary-library/reader.html?work=jiao-wo-shen-zong&chapter=001 。


## 2026-10-26 首頁與閱讀器 UX 本機驗收

最新優先：首頁／閱讀器 UX 已完成本機驗證，等待 Gary 視覺驗收，禁止自行 Commit／Push／部署。現有文學書房風格保留，局部縮 Hero／間距、分類篩選（由 genres 推導、多重歸類）、書卡原生 details 摺疊簡介、依 updatedAt 顯示最近一本繼續閱讀（其他紀錄可展開，不刪除）。

新 Aa 仍開原 settings dialog，floating 偏好沿原 reader:settings 保存，always／auto／hidden；頂部 Aa 保留。音樂 details 與 Aa 在同一 reader-dock，安全區域與底部預留空間，ResizeObserver 調整 Page 書高，收合列顯示實際播放曲目，跨章原曲不中斷。正文 hr 直接參考本機遷移 snapshot/style.css 205／538 行的細虛線，scope 僅正文並包含測量 rig；未改 Markdown／OpenCC／分頁核心／音訊。

新檔 web/js/library-model.js、tests/library-model.test.mjs、tests/ux.mjs；改 web/index.html、reader.html、css/reader.css、js/library.js、reader.js、music-player.js，及 tests/tainan.mjs 動態頁數上限＋逐次前進斷言。npm run check、npm test(6)、release gate、UX 375／390／430／1440px、release／shen／tainan／immersive／page-turn 通過。16 份內容及 MP3 檔與本輪開始 SHA-256 相同。

對照 .local/ux/review.html、before/after PNG、baseline/results JSON；本機對照伺服器 http://127.0.0.1:4174/，網站仍用 4173。待確認視覺、分類命名與觸控；Safari 真機未驗。當前書目沒有《彼岸仍是人間》，且沒有 TTS 實作，不能聲稱已回歸。工作開始前已有 .gitignore、台南 EP.03 與六份文件變更，均保留，勿將其誤認本輪改稿或擅自發布。


- 2026-10-26 預覽連線排查：4173 未監聽，已重新啟動既有 scripts/preview.mjs；4174 對照服務仍在。Codex 內建瀏覽器已實際重載對照頁並開啟本機書庫，皆正常。此輪沒有程式修改、Commit／Push／部署；預覽服務停止或電腦重啟後須重新啟動。


### 2026-10-26 作者驗收與正式發布授權

作者已確認 UX 畫面 OK，明確授權測試後 Push 為正式版本。本次只提交首頁／閱讀器 UX、相關測試與本輪文件；既有 EP.03 正文校訂、.gitignore 及其他無關變更排除。npm run check、npm test（6 項）與發布 gate 已通過；正式部署結果將另行續記。


### 2026-10-26 UX 正式版本發布完成

作者已視覺驗收並授權正式發布。UX 提交 `1c079aa` 已 Push，GitHub Pages Actions `40336560855` build／deploy 成功。正式站 https://qwerty10218.github.io/imaginary-library/ 的首頁、閱讀頁、CSS、library／library-model／reader／music-player 腳本與待發布產物 SHA-256 一致；台南 EP.03 也和提交樹一致，沒有混入本機未提交校訂。正式站 Edge headless 375×667、390×900、430×900、1440×900 完整 UX 流程通過，涵蓋分類／摺疊、最近閱讀、Aa 三模式與偏好還原、三主題分場、註解、音樂跨章與逐頁檢查，無腳本或 HTTP 失敗。

線上音訊載入較慢，tests/ux.mjs 新增等待播放狀態與自動收合完成後再操作；保留原斷言，未改網站播放功能。6 項單元測試、check／build、發布 gate 通過。工作區原有 .gitignore、EP.03 校訂與無關接續文字保留、排除發布。iPhone Safari 實機未驗；現行書目無《彼岸仍是人間》，現行閱讀器無 TTS 實作，未宣稱驗證。

## 2026-10-26 黑膠播放器局部升級（本機待視覺驗收）

- 根因：播放鍵只有 min-height，寬度跟字形／padding 變動，原本即不是固定正圓；唱片已有 CSS 動畫，但全同心圓缺少辨識旋轉的標記，播放後立即收合也掩蓋回饋；唱盤 CSS 分散重複覆寫。
- 新增 web/css/music-player.css 集中原播放器視覺，reader.css 保留共用 dock 定位；reader.html 維持原入口／ID，只加樣式連結與 CSS 圖示。固定播放鍵 44×44、不收縮；唱片仍 68px，底座仍 76px。增加細溝紋、方向性反光、偏心標籤、主軸、金屬唱臂及暖木內框。
- music-player.js 沿用 audio 事件控制動畫，8 秒線性一圈、animation-play-state 暫停原角度；reduced-motion 停用旋轉。播放後保持面板展開，讀者可用摘要列收合，曲目繼續顯示。保留既有高度上限／面板內捲動、Aa 共用 dock、Page 高度預留；手機 Scroll 展開時仍是浮動覆蓋局部正文，需收合後繼續閱讀，這點待作者視覺／操作確認。
- 更新 tests/tainan.mjs 與 tests/ux.mjs，以明確手動收合驗證原回歸流程；新增 tests/vinyl.mjs 驗證 320／375／390／430／1440px 的按鈕、轉動、暫停原角度、續播、reduced-motion、溢出與 Aa 不重疊。初次新測試在 pause 事件尚未同步時取值失敗，改為等暫停狀態與瀏覽器繪製完成後，全部通過。
- npm run check（語法、4 項進度測試、build、公開產物稽核）、npm test（6 項）、release gate、vinyl、tainan（390／1440，三首 MP3／進度／音量／跨章／26 註）、ux（375／390／430／1440）、release（390／1440／1720）全部通過。Edge headless；Safari 真機未驗，現有專案無 TTS 實作，不能宣稱 TTS 回歸通過。
- 桌面／手機前後截圖：.local/vinyl/before-390.png、before-1440.png、after-390.png、after-1440.png，另有 320／375／430px 修改後畫面。播放器尺寸／成熟低調質感及播放後保持展開的偏好待 Gary 確認。
- 未改小說、metadata、音檔、註解、進度格式、分頁核心或雲端；保留開始前所有其他工作樹變更。未 Commit、Push 或部署。
## 2026-10-26 黑膠播放器比例微調（本機，未發布）

僅調整 web/css/music-player.css 的唱盤視覺區：木質底座移至原偽元素、水平內縮各 15%（可見寬度減少 30%），其餘露出既有深色背景；唱片 68→76px（+11.8%），依視覺區中心重新定位唱片／唱臂，保留原溝紋、標籤、光影、8 秒旋轉與播放邏輯。未新增 DOM 或播放器。

新增 tests/vinyl.mjs 幾何斷言，涵蓋唱片 76px、旋轉中心 38px／38px、木座寬 70%、唱片不裁切及播放／暫停唱臂邊界。第一次木座測量未納入偽元素左右邊框而失敗，納入實際 2px 邊框後通過。npm run check、vinyl（320／375／390／430／1440px）、tainan（390／1440px 三首音訊／進度／音量／跨章／26 註／Page／Scroll）全部通過。Edge headless，Safari 真機未驗。

390px 外框前後皆 290×315px；1440px 前後皆 290×320px。對照與量測在 .local/vinyl-proportion/：before／after-{390,1440}.png、before／after-deck-{390,1440}.png、results.json。等待 Gary 視覺驗收。未修改小說、音檔、播放器互動與其他 UI；未 Commit、Push、部署，原工作區差異保留。
## 2026-10-26 精簡黑膠播放器展開資訊（本機未發布）

僅刪除 reader.html 的 music-now-playing 段落與 music-player.js 對該節點的寫入；保留 loadedSong／chapterSong、原收合列完整字串與狀態邏輯。正常播放／選曲不再輸出重複提示，music-status 留作缺檔、錯誤、選檔及跨章操作提示，空白時 display:none，不保留佔位。music-player.css 移除廢棄 now-playing 規則。唱盤比例／旋轉、播放／暫停、進度、音量、切歌、跨章與 Aa 定位未改；未改小說或其他閱讀器模組。

展開內容實際高度減少，仍沿用既有 max-height 與面板內捲動，因此視窗高度上限已被觸及時外框高度可能維持原上限，沒有新增空白。tests/tainan.mjs 的跨章斷言改驗實際播放曲目所在的 music-summary，仍驗本篇選曲與切歌功能。

npm run check（語法／進度測試／建置／公開產物稽核）、tainan（390／1440）、vinyl（320／375／390／430／1440）、ux（375／390／430／1440）全部通過；另以 EP.02 在390／1440 檢查重複 DOM 已移除、正常播放提示不佔位、收合列仍顯示「播放中 · 五月天〈擁抱〉」且可收合。第一次即時斷言讀值早於 audio play 事件同步，等待摘要更新後通過，未更動播放邏輯。錯誤與本機選檔提示由 tainan 回歸驗證。Edge headless；Safari 真機未驗，現有專案沒有 TTS 實作。原工作樹其他差異保留；未 Commit、Push、部署。

### 2026-10-26 播放器選曲小標清晰度（本機）
依作者截圖，僅調整 web/css/music-player.css 的 music-label：10→12px、字重 500、略縮字距並提高文字對比。其餘播放器與收合列未改。npm run check 通過；未 Commit、Push、部署。


## 2026-10-26 播放器驗收與 Push 授權

Gary 已確認目前播放器並明確指示「OK PUSH」。本次發布包含播放器質感、比例、展開資訊精簡及選曲小標清晰度；只提交播放器程式、相關測試與本輪紀錄。EP.03 校訂、.gitignore、來源包與其他既有文件差異排除。工作區 check、6 項單元測試及 release gate 通過；Push 與 Pages 結果另行續記。

## 2026-10-26 黑膠播放器正式發布驗證

作者已驗收並指示 OK PUSH。播放器程式與回歸提交 3980c85 已 Push 至 main，GitHub Pages Actions 40341375076 的 build／deploy 均成功。工作區及精確待提交樹的 check、6 項單元測試、release gate 通過；vinyl 320／375／390／430／1440、tainan 390／1440、ux 375／390／430／1440 回歸通過。獨立驗證副本初次因 Windows archive CRLF 及缺少 node_modules 失敗，改用 core.autocrlf=false 匯出並連結既有依賴後完整通過，未修改小說或略過檢查。

正式站 reader.html、reader.css、music-player.css、music-player.js 與 EP.03 顯示產物 SHA-256 均和提交樹建置一致；390／1440px Edge headless 驗證 12px 選曲小標、無重複資訊、MP3 播放／暫停與旋轉，無腳本錯誤。截圖 .local/vinyl/live-{390,1440}.png。Safari 真機未驗。EP.03 本機校訂、.gitignore、其他既有接續差異與未追蹤來源包仍未提交，未混入發布。此前「待驗收／未發布」段落為歷史紀錄，以本段為準。