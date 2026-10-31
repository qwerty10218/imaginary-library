# 臆想書房 — 接續快照

日期：2026-10-26。本文件只描述新專案；原作只讀，不能套用原遠端或作品規範。

最新本機待作者確認：《台南少年追風記》正式故事時間線為 EP.02〈擁抱〉大一上、EP.03〈安平之光〉大二暑假、EP.01〈夏夜晚風〉大三下初夏；發表順序維持 EP.01 → EP.02 → EP.03。三篇全文核對後僅修正 `content/works/tainan-youth-wind/chapters/ep03.md` 一句，將「最近專題寫得太煩」改成「上學期的期末專題才剛交出去」。EP.01／02、26 則註解、歌曲與播放器未改。`npm run check`、`npm test`、台南及正式發布瀏覽器回歸、release gate 通過；初次瀏覽器測試因預覽服務未啟動失敗，啟動後重跑通過。這次未 Commit、Push 或部署，正式站仍是舊句；使用者未追蹤的根目錄 `封面.png` 未觸碰。下方收錄時三篇與首發包雜湊相同的紀錄是歷史狀態，EP.03 目前已有這一處本機校訂。

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
## 2026-10-26 手機閱讀器寬度／線條／底部工具布局（本機待驗收）

僅改 web/css/reader.css 與 music-player.css 的 <=599px 響應式規則，沿用原 DOM、分頁／量測與 dock ResizeObserver。正文 Page／Scroll 卡片收至 88vw，兩側6vw（包含安全區下限）；Page 內距28px，Scroll內距22px，保留使用者字級與行距。375／390／430px 卡片約330／343／378px，播放器 width:min(72vw,280px)，約270／280／280px。Aa為獨立44px圓形按鈕，位於播放器上方右側、間距8px；去除共同大外框，保留原 always／auto／hidden 偏好。Page繼續依實際兩列dock高度預留書高，Scroll保留既有底部進度與安全預留機制。

手機隱藏書頁兩層裝飾外框、頁碼區進度細線、頁首底線及翻頁按鈕圓框；播放器展開摘要底線移除；單層書頁／播放器邊框及必要註解線降低對比，分場虛線仍保留並淡化。翻頁觸控區44×78px，位於左右邊緣且不壓文字。未更動小說、章節／音檔／播放邏輯、註解、進度資料格式、TTS或桌面樣式。

新增 tests/mobile-layout.mjs：375×667、390／430／1440×900測試 Page／Scroll 寬度、頁碼、翻頁區與正文不相交、Aa不重疊／開設定、Page展開工具不遮書頁、水平溢出、音訊播放／暫停與註解。tests/ux.mjs 原固定120頁上限因375×667展開工具後產生更多頁而失敗，改讀實際總頁數＋每次必須前進＋必須抵達章末斷言，完整重跑通過，沒有關閉或跳過檢查。

最終 npm run check（語法／4進度測試／build／公開產物稽核）、npm test（6項）、release gate、mobile-layout、ux（375／390／430／1440）、tainan（390／1440三首歌／跨章／26註／逐頁）、vinyl（320／375／390／430／1440轉動／暫停／續播／幾何）均通過。1440px收合與展開前後PNG的SHA-256分別一致，桌面畫面未變。所有為Edge headless；Safari真機／實際安全區與工具列未驗，現有專案無TTS實作。

前後截圖在 .local/mobile-reader/before-page-{375,390,430,1440}.png、before-expanded-*.png、after-page-*.png、after-expanded-*.png，另有 after-scroll-*.png 與 results.json。保留開始前的所有其他工作樹修改；未 Commit、Push、部署。待 Gary 視覺確認手機正文留白、線條及 Aa 上下排列。
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
## 2026-10-27 手機新增14／16px字級（本機未發布）

依作者要求在既有手機font-size選單加入14／16，完整選項為14、16、18、20、22、24；預設18不改。web/js/reader.js沿用原變更／分頁／保存流程，讓小字級通過設定驗證並使用實際字級量測。桌面仍只顯示18／20／22／24；若讀取手機儲存的14／16，桌面顯示20但不覆寫原偏好，切回手機恢復原字級。未改CSS、正文、音樂、註解資料或雲端。

tests/mobile-capacity.mjs增加CAPACITY_FONT參數；14與16在375×667、390×844、430×932、深／淺色共12組逐頁全文／註碼／分場與裁切檢查通過。EP.01頁數14px為35／24／20，16px為42／29／24，僅作本機明體1.9行距實測。tests/mobile-reflow.mjs涵蓋新選項順序、小字級選擇／重載保存、閱讀位置、手機→桌面選項／顯示20且偏好仍14→手機恢復14；375／390／430均通過。npm run check與6項單元測試通過；初次瀏覽器測試因4173預覽服務停止而連線失敗，重新以隱藏背景程序啟動既有preview.mjs後全數重跑通過。Safari真機未驗。

修改檔案為web/js/reader.js、tests/mobile-capacity.mjs、tests/mobile-reflow.mjs及本輪接續文件；結果／截圖在.local/mobile-capacity/after-{14,16}.json與對應PNG。未Commit、Push、部署；其他既有工作樹差異保留。

## 2026-10-27 小字級發布授權

Gary 已明確指示 push，授權本次手機14／16px選項及相關測試發布。僅提交本輪程式與紀錄，保留預設18px與桌面原選項；EP.03、.gitignore及其他既有差異排除。部署結果另續記。

## 2026-10-27 手機14／16px正式發布驗證

依Gary「push」授權，程式提交034e3d6已Push至main；Pages Actions 40381740371的build／deploy均成功。工作區與精確提交樹check、6項單元測試、release gate通過；14／16px在375／390／430px深淺12組逐頁全文及三組重排／偏好／進度回歸通過。正式站reader.js、reader.html及EP.03產物SHA-256與提交樹建置一致，未混入本機小說校訂。

正式站Edge headless 375／390／430px驗證預設18、可選16與14、相符頁數、重載字級與閱讀位置保存；切至1440px桌面只顯示18／20／22／24並使用20px，返回手機恢復14px，無腳本錯誤。Safari真機仍未驗。原.gitignore、EP.03、其他既有接續差異與來源包均保留於本機，未混入提交；此前未發布紀錄為歷史狀態。
## 2026-10-27 手機翻書底部空間回收（本機待驗收）

依作者要求僅處理手機Page：web/js/reader.js的syncFloating在phonePage且mode=page時設hidden，不覆寫always／auto／hidden偏好，Scroll維持原規則；首次量測dock前先套模式與隱藏狀態。web/css/reader.css沿599px手機與959px觸控橫向斷點，僅Page播放器回調width:min(82vw,320px)、置中且無共用外框與gap。書高／body底部預留直接使用實際dock高度，移除最低44／56px保留槽；safe area、100dvh與100vh後備沿用。上方工具列、桌面、Scroll、音訊／小說／註解／TTS未改。

實測EP.01、18px／1.9、原浮動Aa常駐：375×667正文421→473px高、播放器270→307.5px寬，兩側33.75px；390×844正文598→650px、播放器280→319.796875px，兩側35.1015625px；430×932正文686→738px、播放器280→320px，兩側55px。播放器收合dock高98→46，Aa與gap的52px全數回收給正文，展開時也回收52px。無歌曲作品dock為0、正文另增加44px。沒有新增播放器高度，保持既有展開高度限制與內部捲動。正文寬度／字級不變。

新tests/mobile-bottom.mjs（BOTTOM_PHASE=before／預設after）量測前後四尺寸，驗證Aa隱藏／上方設定、無空列／無橫向溢出／Page不被播放器遮住、無音樂作品dock歸零、翻頁／繁簡／註解／音訊播放暫停／進度／音量。tests/mobile-layout.mjs更新Page隱藏Aa及新寬度斷言，另保留Scroll浮動Aa／舊寬度斷言。台南逐頁回歸曾兩次在切換模式後發生頁碼未前進，確認為dock高度二次重排競態；改為手機Page分頁前同步量測、取消過期排程，observer跳過已量測變化後，未修改台南測試標準即通過。

最終npm run check、6項單元測試、release gate、bottom四尺寸、capacity深淺六組、mobile-reflow三尺寸、UX四尺寸、台南三篇／26註／三首歌通過。EP.01收合18px頁數49→45、34→31、28→26，逐頁全文重組／註碼／分場及邊界驗證通過。1440px桌面Page收合／展開、所有尺寸Scroll與上方列前後PNG位元完全相同。Safari真機／實際底部工具列及Home Indicator仍未驗，僅Edge headless viewport／橫向重排模擬；現有專案無TTS實作。

報告.local/mobile-bottom/REPORT.md、before.json／after.json；前後截圖before/after-page-{375,390,430,1440}.png、before/after-expanded-*.png、before/after-scroll-*.png與header截圖。保留開始前所有其他工作樹差異；未Commit、Push、部署，待Gary視覺驗收。

## 2026-10-27 手機翻書底部發布授權

Gary 已指示 push，授權本次手機Page隱藏重複Aa、回收正文空間及回調播放器寬度發布。只提交本輪程式、測試與紀錄；EP.03校訂、.gitignore及其他既有差異排除，部署結果另續記。

## 2026-10-27 手機翻書底部正式發布驗證

依Gary「push」授權，程式提交c6bc045已Push至main；Pages Actions 40447064455的build／deploy均成功。精確待提交樹npm run check、6項單元測試與release gate通過，沿用本輪已通過的bottom／capacity／reflow／UX／台南回歸結果。

正式站reader.html、reader.css、reader.js及EP.03顯示產物SHA-256與提交樹建置一致，未混入本機小說校訂。直接在正式站執行bottom測試，375×667、390×844、430×932及1440×900全部通過，涵蓋手機Page Aa隱藏、dock無空列／無歌曲歸零、正文與播放器尺寸、上方Aa、翻頁／繁簡／註解、播放暫停／進度／音量及Scroll浮動Aa恢復，無腳本錯誤。線上截圖與量測在.local/mobile-bottom/live/。Safari真機仍未驗。

.gitignore、EP.03校訂、其他既有接續差異、來源包與根目錄圖片均保留本機，未納入發布。前述未發布段落為歷史紀錄，以本段為準。
## 2026-10-27 品牌Favicon轉檔與整合（本機未發布）

唯一來源為作者根目錄favicon.jpg：JPEG／RGB／2048×2048／無ICC與EXIF方向；SHA-256 7fec420fe4614f5dbe9c5aeda2905566cf3eeabbb3563b3ae3401a85b022d062。先驗證轉檔，再原樣移至web/assets/branding/favicon-source.jpg，移動前後位元雜湊相同，未重新壓縮，根目錄不保留無用途副本。README保留來源與重製說明。所有縮圖從完整原圖直接Lanczos縮小，保留深墨綠、暖金與象牙白，不裁切／拉伸／去背或增加邊框。

新增web/favicon.ico（真正ICO，16／32／48三份PNG編碼影格）及web/assets/icons下六份RGB PNG：favicon-16x16、32x32、48x48、apple-touch-icon180、icon192與icon512。scripts/generate-favicons.py使用已提供的Pillow可重製；從歸檔來源重跑後七份檔案位元完全一致。Python逐像素與完整原圖Lanczos結果比較、PNG簽章／尺寸／RGB／深色角落、ICO目錄與三個解碼影格均通過。

四頁index／work／reader／prototype的空白data:,圖示改為相對網址ICO、16／32 PNG及180 Apple Touch Icon；沒有既有Manifest，不新增PWA。HTML移除圖示link後與HEAD逐字相同（僅正規化換行），未更動其他UI。build.mjs只增ICO與icons目錄至dist，來源JPEG／README不部署；preview.mjs補ICO MIME，未改小說／播放器機制。

新增tests/favicon.test.mjs（真實PNG／ICO格式與多尺寸、四頁唯一相對引用）與tests/favicon.mjs（臨時127.0.0.1隨機埠，模擬/imaginary-library/子目錄，四頁載入／MIME／瀏覽器解碼及六PNG路徑）。npm run check（語法／4進度測試／build／公開稽核）、npm test共8項、release gate與圖示瀏覽器測試全通過。另讀取本次測試專用Edge profile的Favicons SQLite，四個頁面均實際選用子目錄ICO、快取16／32px，快取像素與產出PNG相符；不是只檢查HTML。所有七份dist資產與web位元相同，確認dist無原始JPEG。

曾嘗試停止既有預覽程序與另啟背景服務，均遭自動核准審查以blocked by policy拒絕，未繼續操作該程序；改採測試程式內短暫HTTP服務，驗證後自動關閉，既有4173服務完整保留。一次臨時inline驗證命令引號解析失敗，改為.local/favicon/check-build.mjs後通過，未影響資產。報告資料在.local/favicon/validation.json、browser-results.json、tab-icons.json與contact-sheet.png。正式站未部署，不宣稱線上圖示已更新。未Commit／Push／部署，保留原有工作樹其他差異。

## 2026-10-27 頁首品牌 Logo（本機未發布）

- 依作者要求，首頁、作品頁與閱讀預覽頁的「臆」字方框改為既有品牌 Logo；沿用 assets/icons/icon-192x192.png，完整保留背景與圖案。
- 桌面 36px、手機 32px 正方形，object-fit: contain；保留品牌文字及連結，圖片為裝飾性空替代文字。正式閱讀器上方工具列不變。
- 修改 web/index.html、web/work.html、web/prototype.html、web/css/reader.css。
- npm run check、npm test（8/8）通過；Edge 實測 375/390/430/1440px 三頁 Logo 正確載入、比例正常、無水平溢出；四頁 Favicon 子路徑驗證通過。
- 截圖：.local/favicon/header-{375,390,430,1440}.png。未 Commit、Push 或部署。


## 2026-10-27 小尺寸 Favicon 候選預覽（待作者視覺確認）

- 新增 scripts/preview-favicons.py，僅輸出 .local/favicon-review；不覆蓋原始 JPEG、現用圖示、Apple Touch Icon、大型品牌圖示或網站 UI。
- 原圖 2048×2048；以亮度 >=120 分離主體，邊界 [342,553,1706,1614]，寬 66.6%、高 51.8%；此為閾值測量，忽略 JPEG 暗色邊緣噪點。
- 產生原版與 +20/+25/+30% 置中正方形縮圖候選，每版含 16/32/48/64px RGB PNG、16/32/48px ICO；只收減背景留白，保留完整主體、無拉伸、無銳化。
- actual-size-comparison.png 為淺深分頁背景的實際 16/32/64px 並排預覽。初步建議 +30%；16px 複雜拱門仍受限，極簡方案僅提出兩片書頁與單層拱門、刪除內層門洞與細小光點，尚未重繪。
- Python 候選產生與 ICO 三尺寸驗證通過；npm run check、npm test（8/8）、node tests/favicon.mjs 通過，現有四頁 GitHub Pages 子路徑圖示引用正常。候選尚未接入網站，待作者確認後才定稿。
- 原圖 SHA256 維持 7fec420fe4614f5dbe9c5aeda2905566cf3eeabbb3563b3ae3401a85b022d062；未 Commit、Push、部署。


## 2026-10-27 D 版 Favicon 歸檔及整合（本機未發布）

- 依作者要求直接使用 Favicon/ 的 12 個既有檔案，不產圖、不重新壓縮；盤點／目的地／尺寸／RGB 格式／SHA256 全記於 web/assets/branding/README.md 與 favicon-inventory.json。12 檔目的地 SHA256 全數一致。
- 七個正式資產集中 web/assets/icons/，含四尺寸 ICO 與六個 PNG；64px PNG、兩份 1024px 母版、331px 去字來源及 550×200 預覽歸檔 branding/，不部署。原始 favicon-source.jpg 完整保留；舊七個圖示與兩個製作腳本轉存 legacy/，避免誤覆蓋 D 版。
- 根目錄 Favicon/ 驗證後清空移除；web/favicon.ico 舊位置移除，舊檔完整歸檔。原有其他未提交變更及小說資料不碰觸。
- 四個 HTML Head 改用 assets/icons/favicon.ico，相對子路徑，sizes 對應 16/32/48/64；無 Manifest。頁首原圖另存 branding/brand-logo.png，僅改路徑而保留原圖位元與外觀，沒有改 UI。
- Build 沿用自訂腳本，不是 Vite；dist/ 被 Git 忽略且無追蹤，完全由 Build 重建。Build 只明確複製 icons/ 與 brand-logo.png，實測母版／預覽均不公開，舊 dist/favicon.ico 不再存在。
- npm run check（含 Build）、npm test（9/9）、node tests/favicon.mjs（Chrome）、node scripts/check-release.mjs 通過。Chrome 四頁實際快取 D 版 ICO，共 8 個 16/32px 點陣，逐像素比對 ICO 相符；所有引用 HTTP200、正確 MIME、瀏覽器解碼及 Pages 子路徑驗證通過。
- 補充比對原套件 ICO 和同尺寸 PNG 最大通道色階差為 1/1/2/3（16/32/48/64px）；首次逐像素完全相同斷言失敗，確認為提供套件原有微量色差，保留原檔並記錄，後續以格式／尺寸／SHA256 驗證，不重產。
- 完整盤點與實際 16/32/64px 預覽見 branding/README.md、favicon-preview.png；無功能方面未解問題。未 Commit、Push 或部署，待作者確認。


## 2026-10-27 完整本地網站同步（作者已驗收，準備發布）

- 作者改為授權整體已驗收網站同步，不只 Favicon：含 EP.03 專題一句校訂、D 版七個圖示、頁首完整 Logo、必要 HTML/CSS、Build/預覽 MIME、測試與正式專案文件。其餘閱讀器／播放器 JS、歌曲、26 則註解、作品清單與封面未做功能或內容修改。
- fetch 後本地 HEAD 與 origin/main 均 fa085c21087749c80460e40e7d0dfb09c245c9f4；Pages 成功 run 40447243336 與 github-pages deployment 7349978282 同 SHA，無遠端落後或衝突。
- 正式站逐檔盤點 45 檔：初始 27 檔完全相同，其餘包含 8 個新資產、4 HTML、reader.css、EP.03 與索引，另 3 JS 純換行差異；已加 .gitattributes 將網站 JS/CSS/HTML 固定 LF，無 JS 邏輯差異，確保 Windows/Linux Build 一致。
- .gitignore 保留 _archive/、未參與建置的叫我沈總_正式上架包/ 與 branding/ 設計檔於本地；只有 brand-logo.png 納入 Git。舊圖示、母版、預覽及來源不提交；正式盤點文件在 FAVICON_ASSETS.md，測試讀八個公開資產雜湊 fixture，不依賴本地設計素材。dist/ 忽略且不追蹤，沿用 main 的既有 Pages workflow；無新增 MP3。
- 工作區 npm run check、npm test 9/9、npm run build、release gate、Chrome favicon 瀏覽器測試通過；tainan 390/1440（26 註解、三歌、音量/進度/切章）、release 390/1440/1720（書庫、封面、繁簡、逐頁導航）通過。
- 後續將以精確暫存樹的獨立目錄驗證建置與產物雜湊，再 Commit/Push；部署與正式站驗證結果另行續記。此段不宣稱發布已完成。


完整同步發布前最終確認：精確暫存樹匯出到獨立 .local/sync/verified-tree，以 npm ci 安裝（0 漏洞），check、9/9 tests、build、release gate、Chrome favicon 測試全部通過；獨立目錄沒有母版／預覽／legacy 或上架包。正式 Build 45 檔與主工作區逐位元完全相同。mobile-bottom 375/390/430/1440 回歸通過。明確 Stage 名單僅包含正式網站、EP.03、文件、測試與必要設定；無新增 MP3、憑證或忽略素材；git diff --check 通過。作者已授權 Commit/Push 及既有 Pages 正式部署，部署後結果記於本輪最終回報及 .local/sync/ 實測報告。


## 2026-10-27 固定完整同步流程（規則文件，本機未提交）

- 依作者要求將已驗證的三版本盤點、差異分類、明確 Stage、精確提交樹獨立建置、既有 Pages 發布與正式站逐檔雜湊／功能驗證寫入 AGENTS.md，詳細步驟為 SITE_SYNC_WORKFLOW.md。
- 完整同步授權涵蓋所有已驗收正式修改，不只最後單一功能；私人來源、母版、預覽、備份留本機，不以刪除素材或強制 Push 同步。現有驗收／授權已足夠時不重複詢問；本規則不授予永久發布權。
- 固定流程不硬編碼檔案數、頁數或歷史 SHA；保留無 gh 時 REST API、換行一致性、隔離建置、測試預覽與快取驗證方式，禁止把本機依賴藏進 CI。
- 上一輪完整同步實際已成功：8ee2bfb7e6c7d1e7016fad60bfb5ecd88f31f4a8，本地／origin/main／Pages SHA 相同；Actions 40512019214 Build/Deploy 成功，deployment 7359698616 success；45/45 線上檔案與本地 Build 完全一致，線上 release、tainan、favicon 測試全部通過。此前準備發布段落是歷史狀態。
- 本輪僅修改規則及接續文件，未改網站功能；npm run check（含 Build）、npm test 9/9、git diff --check 通過。未 Commit、Push 或部署新文件，正式站仍為 8ee2bfb。


## 2026-10-27 ChatGPT × Codex 長期協作與素材接收規範（本機未提交）

- 依作者附件任務保留全部既有 AGENTS 規則，新增強制必讀 AI_COLLAB_WORKFLOW.md 與 AI_ASSET_INTAKE_LOG.md，沿用 SITE_SYNC_WORKFLOW.md，沒有重複發布系統。
- 固定任務開始清點根目錄交付物、Git／忽略狀態、格式／尺寸／大小／SHA256、引用與去重；不是背景監控，不把所有未追蹤目錄視為交付物。明確作者／ChatGPT／Codex 分工、內容及發布授權，已授權例行安全整理自主完成。
- SOP 涵蓋 ZIP 路徑／連結／Windows 特殊名稱與碰撞檢查、檔數／輸出大小／壓縮比限制、隔離解壓，不執行來源腳本；原始位元保存、同名異內容保留、稿件／Story Bible／時間線對照、保護已確認設定、現有系統整合與根目錄回收。
- 實際路徑對照 covers/icons/branding/music、作品 metadata／chapters／notes 與沈總 plot-notes；沿用忽略 _archive/source-packages 作新交付歸檔位置，正式 Build 不能依賴來源包。未建立無用平行目錄。
- 初始接收紀錄包含本次附件（UTF-8／大小／SHA256）、三個歷史來源包與已整理品牌素材；歷史包不重算全包、不搬動，原有路徑依賴待日後相關任務核對。根目錄未見其他新散落 ZIP／MD／圖片；未改 _archive 私人索引或公開內容。
- 本站暫不規劃 TTS，規則禁止主動新增功能／測試或順手刪舊碼，保留 MP3 播放器。
- 本輪只改規則與必要文件。具體文件連結皆可解析；npm run check（含 Build）、npm test 9/9、git diff --check 通過；content/web/scripts/tests/package/忽略設定無新差異。未 Commit、Push、部署，網站正式版本仍為 8ee2bfb。前輪規則文件尚未提交的差異完整保留。


## 2026-10-27 EP.04〈30CM〉整合與台南來源歸檔（準備發布）

- 作者明確授權第四章、根目錄 MP3 接入播放器、完整同步上線，以及上線核對後移除本輪來源資料夾；台南舊素材整理歸檔、不刪備份。包內舊指令不取代作者當次要求。
- 新增 ep04.md、metadata 第四章及 thirty-centimeters 選曲、五則 notes 與正式 MP3。原稿 3 處大屌歌改大屌哥，逐字比對其餘全文不變，原有 EP.01–03 原始來源未變。四篇／31 註，作品描述卷別改連載，保持現有 UI／繁簡／黑膠播放器邏輯。
- 原稿與音檔完整保存在忽略歸檔；兩套歷史台南包從根目錄搬到 _archive/source-packages/tainan/，28 個來源檔 SHA256 全數一致。正式 Build、現行預覽與測試不依賴來源包，README 更新目前真實結構。沈總來源與 migration-backup 不動。
- 本地預覽的正式 MP3 原先沒有 HTTP Range，EP.04 拖曳進度測試失敗；補上與相容音訊路由共用的分段服務，PREVIEW_PORT 可指定 0 供隔離測試，預設仍 4173。未改產品播放器。
- 新 EP.04 瀏覽器測試涵蓋 375/390/430/1440、EP.03→04 導覽、末章無第五章、跨章音樂持續／切換／音量／進度、繁簡、註解、閱讀進度恢復。初次錯誤含既有隱藏連結保留 href、儲存延遲、收合 details 的 innerText 不可見等測試假設，已改用真實可操作狀態及等待，未關閉斷言。
- EP.04 深淺 375/390/430、18px 逐頁重組全文／註碼／分場檢查通過，分別 67/46/37 頁，無漏字／重複／裁切；桌面截圖完成，release 舊書回歸通過。Python mutagen 不存在，未安裝，改以原 MP3 標頭及瀏覽器解碼測得時長 378.160181 秒。
- 一併同步先前已完成的協作／完整同步規則及接收文件，並明確保留「暫不規劃 TTS」。後續依精確暫存樹驗證、Pages 成功與線上逐檔核對再清理本輪根目錄重複檔。尚未完成項不宣稱已發布。


EP.04 發布前最終驗證：本地 check（含 Build）、9 項單元測試、release gate、release 390/1440/1720 回歸通過；台南四篇 31 註／四首歌含本機選檔／錯誤提示回歸在 390/1440 通過。EP.04 專項 375/390/430/1440 全數通過，分段音訊靜態與相容路由 HTTP206 正確。精確暫存樹隔離匯出後 npm ci（0 漏洞）、check、9 tests、build、release gate 與 EP.04 四尺寸回歸均通過，不依賴根目錄包或本地歸檔；47 個產物的檔名集合與 SHA／位元內容和主工作區完全一致。來源／私密模式與具名 Stage 檢查通過。作者本次明確授權發布及部署核對後清理，成功部署與根目錄清理結果以本輪最終回報及 .local/ep04/ 實測報告為準，未提前宣稱成功。


## 2026-10-28 EP.05〈夢醒時分〉與共創規範（本輪授權發布）

- 初始 main／origin/main／既有成功 Pages 均為 b81bd4936850393b1227119656a2ac59816774b9；唯一未追蹤項為本次完整素材資料夾，無其他既有修改。
- EP.05 接入 tainan-youth-wind，排序接 EP.04，songId dream-awakening；全站 3 作品／9 章，台南 5 章／31 註。EP.01–04 位元未變；第五章原稿完整保留為相同位元前綴，只追加空文化註解及延伸聆聽區塊以符合現有 Build，未改台詞、歌詞或小說化安可順序。
- 兩份共創文件原樣納入 00_PROJECT，AGENTS 增量參照；創作記憶中的候選／未上線敘述為來源交付時點，實際 Git 與部署以本輪回報為準。MP3 按作者明確要求發布，來源及六檔 manifest 保存於忽略歸檔。
- npm run check（含 build／4 進度測試）、npm test（9 項）、release gate、EP.04／EP.05 四尺寸專項、台南 31 註與音樂回歸、release 390/1440/1720、favicon 均執行。EP.05 另逐頁檢查空頁及溢出；發布前尚須完成精確暫存樹獨立驗證。
- 初次 4173 音訊拖曳逾時：既有舊預覽未支援 Range（實測 200）；保留程序，改用現行 preview 4175（206）重跑通過，無需修改產品。iPhone Safari 實機未驗。
- 作者明確授權通過後 Commit／Push；本紀錄寫入時尚未發布，部署 SHA、Actions 及逐檔線上核對以本輪最終回報及 .local/ep05/ 報告為準，不提前宣稱上線。


## 2026-10-28 EP.05 文化註釋補充（獨立任務）

- 以現有正式 ep05.md 為唯一正文來源，新增十則註釋：被當、靠北／機掰、必修／點名、鹽酥雞、配位／視線遮擋、沒步、發光應援棒、安可／加班、米血、早八。只加註碼與文化註解清單，去除註碼後正文逐字相同，延伸聆聽未變；EP.01–04 正文與註釋未變。
- 沿用 notes.json、[註N] 與既有 Build／閱讀器：Scroll 章末註釋、Page 頁腳及點擊對話框；關閉返回原註碼焦點，沒有另建跳轉系統。本站無朗讀／TTS，相關排除行為不適用，未新增功能。
- npm run check（含 build／4 進度測試）、npm test（9 項）、release gate、EP.05 四尺寸十則註釋逐一開關／簡繁／頁腳／無空頁溢出／進度恢復、EP.04 四尺寸及台南舊四篇 31 註回歸通過；iPhone Safari 實機未驗。
- 初始 main 與 origin/main 均為 9a3f313；既有沈總歸檔文件差異保留且排除提交。本輪作者明確授權通過後 Commit／Push；本段寫入時尚待精確提交樹驗證及 Pages，部署結果以當輪最終回報與 .local/ep05-notes/ 證據為準。


## 2026-10-28 切章自動選曲、保持暫停（本機完成）

- 依作者要求改 music-player.chapter：開章／切章自動選該章 metadata 配歌，停止舊音訊、重設進度並保持暫停，須按播放才出聲；缺少配歌時清除舊 src 並停用播放，避免串歌。舊播放 Promise 的過期結果不再覆蓋新章狀態；本機選檔仍可覆蓋對應歌曲且不自動播放。沒有改閱讀器正文或新增素材。
- 更新 README 的切章行為及既有 ep04／ep05／tainan／ux 測試預期，新增 chapter-music 專項，涵蓋五首配歌、播放中／暫停切章、瀏覽器前進返回、重載、本機音檔、無配歌及恢復正常配歌。
- npm run check（含 build／4 進度測試）、npm test（9 項）、release gate、chapter-music 390/1440、ep04／ep05 375/390/430/1440、tainan 390/1440、ux 375/390/430/1440、git diff --check 通過。首次台南回歸仍點舊手動切歌按鈕而逾時，更新剩餘舊預期後重跑通過。iPhone Safari 實機未驗。
- 既有沈總歸檔文件修改及本輪期間另出現的 EP.04 註釋／對應文件修改原樣保留，未覆寫、Stage 或提交。本輪只完成本機修改與驗證，未 Commit／Push／部署。最新切章行為取代歷史紀錄中的原曲跨章繼續播放。


### 切章狀態顯示補正

依作者截圖，開章／換歌後顯示「聆聽 · 歌手〈歌名〉」代表未開始；僅實際播放過再暫停才顯示「已暫停」。以 playing 事件記錄本次曲目是否開始，每次選曲重置；不改自動配歌及禁止自動播放行為。npm run check（含 build）、npm test（9 項）、chapter-music 390／1440 專項通過，含五章未開始顯示、播放／暫停、切章重置、返回前進與本機選檔。初次新增暫停標籤斷言早於非同步 pause 事件，改為等待實際標籤更新後重跑通過。仍為本機修改，未 Commit／Push。


### 本輪發布準備

作者已明確授權 Push。只同步自動配歌／未開始狀態、相關測試與 README 及本功能紀錄；沈總來源整理及 EP.04 註解措辭修訂保持本機，排除本次提交。以精確暫存樹獨立建置與測試後發布，線上結果以本輪最終回報及 .local/music-publish/ 證據為準，不預先宣稱成功。


## 2026-10-28 EP.04〈30CM〉v3 精簡定稿（本輪授權發布）

- 作者指定根目錄 `04-30CM_精簡試讀版_v3_統一大屌哥.md` 為唯一母本；9,719 bytes，SHA-256 `267a6986f42440dbe3d2d8aca7fdd86571cae574073918eb0cedafc8d499a3ff`。原樣取代 content/works/tainan-youth-wind/chapters/ep04.md，來源與正式檔逐位元一致，無正文重寫。大屌哥實測 5 處、大屌歌 0 處，保留散步、翔宇道歉、十年之約、合照與紅燈歌曲結尾。
- 沿用原 slug、章節順序、五則文化註解、延伸聆聽及歌曲；v3 的註4優先於先前未提交的簡短措辭，notes.json 已與 v3 同步（內容回到已提交版本），舊差異僅留本地稽核記錄。其他四章、閱讀器、播放器、繁簡原始位元未變。
- npm run check、npm test（9 項）、npm run build、release gate、EP.04 四尺寸、台南舊四篇註解／音樂回歸、chapter-music 390/1440 通過。另以 375/390/430/1440 逐頁掃描所有五註，無空頁／溢出，確認章末聆聽；iPhone Safari 實機未驗。發布前仍須精確暫存樹獨立驗證。
- 作者特別允許此次交付副本驗證後直接刪除、不另歸檔；檢查未追蹤狀態、路徑及正式程式無引用後，只刪除本輪根目錄 v3 副本。既有舊版原件與 v3 內容不同且屬歷史來源，完整保留，未刪備份。
- 初始 main／origin/main 為 fd8ea0a；既有沈總整理等無關文件差異保留、不夾帶。本輪已授權 Commit／Push，準備依既有 Pages 流程發布；實際結果以本輪最終回報及 .local/ep04-v3/ 證據為準。


## 2026-10-30 《規矩是死的，你也是》第一包

本輪新增 rules-are-dead-so-are-you（第一卷上海就是浦東／ep01 死人不領餉），正文與交付逐位元一致；封面依作者最新指示從 PNG 無損轉 WebP。已通過 check、9 項單元測試、build、release gate、新作四寬度與既有章節／音樂／圖示回歸。未動其他作品；五份既有歷史文件差異以 index blob 安全排除。來源六檔備存與雜湊見接收紀錄。作者已授權 Push／部署與成功後清理入口，實際結果以本輪最終回報為準，不提前宣稱部署成功。


## 2026-10-30 繁簡詞語修正

共用 language.js 補正「倒楣→倒霉」，保留「門楣→门楣」與既有「擡→抬」修正，繁體正文不變。新增 language.test.mjs，檢查乾／幹、髮／發、后／後、鍊／鏈、菸／煙、人物地名與繁體還原。check、11 項單元測試、build、release gate 通過；390/1440 實際閱讀頁簡體詞語、重載與繁體恢復、HTML 屬性／路由／code 保護通過，並批次檢查四作品 metadata 與十章轉換及原文還原。此段寫入時尚待精確提交樹與 Pages，沿用本輪新書發布後修正授權；部署結果見本輪最終回報及 .local/language-fix/。未收到新增素材，未搬移來源，既有文件差異保留且排除提交。


## 2026-10-30 第一章雙插圖

兩張 1536×1024 PNG 已轉無損 WebP，解碼像素一致，沿用現有閱讀器 img 與等比例 CSS；章節只新增兩個 img 標記（含 alt、width/height、lazy），刪除標記後正文逐位元等於原稿。圖一在捧出三炮台之後／一點意思之前；圖二在抽出手槍之後／你他媽也配之前，各一次。既有 Build 僅複製已發布章節引用的同作品插圖，預覽補 WebP MIME；workflow 測試新增引用資產、未引用排除、缺檔與越界拒絕。

npm run check、11 項單元測試、build、release gate、workflow 通過；375/390/430/1440，Dark/Light/Warm、scroll/page、單頁/雙頁、兩圖依序各一次、完整比例、無空頁或溢出、章末與進度重載、繁簡 alt 通過。既有章節 390/1440/1720、播放器 390/1440、favicon 回歸通過。無獨立 lint/typecheck；iOS 實機未驗。其他作品、metadata、封面未變。

原始兩圖已複製核對保存於忽略的 _archive/source-packages/chatgpt/2026-10-30/rules-ep01-illustrations/，manifest.json 記對照；ep01_shiqiao_checkpoint.png：2325808 bytes，SHA-256 9a90c57a50a05cd4021fe8c0ea6b7d50c4ba9276d43d5c8be37e66d3e6a4faaa；ep01_shiqiao_gunpoint.png：2353153 bytes，SHA-256 b1a5bd5faa2068b67e9faf4a42c18066f03421d870c4eb0776bf1441f117024b。待本輪部署與線上核對成功後清除根目錄兩個 PNG，原圖歸檔保留。

作者本輪已明確授權 Commit／Push／部署與原圖歸檔、入口清理。寫入時尚待精確暫存樹及 Pages 驗證；既有五份歷史文件差異安全排除，發布結果見本輪最終回報及 .local/ep01-illustrations/。


## 2026-10-31 第一章插圖改至正文開頭

依作者最新指示，兩張內文插圖從中段移至章名之後、第一段正文之前，順序為遞菸→拔槍，各引用一次。正式封面與圖片位元不變；移除圖片標記後正文與上一版逐位元相同。無新增來源交付，不需歸檔或清理。check、11 項單元測試、build、release gate 已通過；手機／桌面與精確提交版本驗證進行中，通過後沿用本次上線授權發布。原有五份文件未提交內容保留且排除；最終測試／部署結果見本輪回報與 .local/ep01-opening/。


## 2026-11-01 《規矩》第二章與通用上架規則

六檔來源逐檔核對 SHA-256 保存於忽略的 `_archive/source-packages/chatgpt/2026-11-01/rules-ep02/`，manifest.json 記原件，integration.json 記正式對照及衍生圖雜湊。新增 ep02.md、metadata 與三張正式 WebP；依作者要求優先沿用已驗收章首插圖慣例，三圖按算命→盤查→茶館排序各一次。正文僅適配圖位、路徑與既有腳註格式；兩註保留完整解釋，移除轉換後會形成空頁的章末註解分隔線。第三圖以內建 imagegen 移除白邊，生成 1536×1024，細節略有變化，非像素一致裁切；原 PNG 與修圖均保存。前兩圖以原尺寸無損 WebP。

第一章兩處二十二塊分別為出逃全部家當與脫險後餘額，無中途收入；依作者本輪確認條件改成八十塊，其他金額對白不變。新增 CHAPTER_PUBLISH_WORKFLOW.md，連入 AGENTS 與協作 SOP，規範章首位置、例外、圖像、註腳、歸檔、入口清理及完整發布。封面、其他作品與播放器不改。

check、11 項單元測試、build、release gate、workflow 已執行通過；430px 發現註解分隔線獨佔末頁，已修正後重跑四寬度三主題、翻頁／滾動、腳註／繁簡／進度回歸。精確暫存樹與 Pages 結果以本輪最終回報、`.local/rules-ep02/` 證據為準；未提前宣稱部署成功。既有五份歷史文件差異保留並安全排除提交。


## 2026-11-01 第二章完整修訂稿替換

依作者指定根目錄 `第二章_你他娘的_二十大洋_完整修訂.md` 更新既有 ep02；來源 34,134 bytes，SHA-256 `37ac0d58e453985f5f45981f45e6d102fb9d472649d1c44d39a16bd174d826af`。原件保存忽略的 `_archive/source-packages/chatgpt/2026-11-01/rules-ep02-full/`，manifest 記雜湊。正文逐字比對一致，僅移除來源中段圖標記、保留現行三圖章首 HTML，適配兩則新版註腳至既有格式。未潤稿或刪減；其他章節、metadata、正式圖片、封面、閱讀器及規則均不改。

check、11 項單元測試、build、release gate 已通過；四尺寸三主題逐頁／滾動、圖片／註腳／繁簡／進度測試、精確暫存版本獨立驗證與 Pages 發布依本輪證據 `.local/rules-ep02-full/` 及最終回報確認，不提前宣稱上線。既有五份文件差異保留且排除提交。成功後核對原件歸檔再清理本次根目錄副本。
