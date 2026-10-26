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
