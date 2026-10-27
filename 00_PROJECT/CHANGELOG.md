# 變更紀錄

## 2026-10-26 — 台南三篇時間線校訂（本機待確認）

- EP.03〈安平之光〉把「最近專題寫得太煩」修為「上學期的期末專題才剛交出去」，對齊大二暑假；其餘兩篇、發表順序、註解與音樂未改。本次尚未發布。

## 2026-10-26 — 台南篇章閱讀排版

- 三篇書內標題統一為 `EP.XX｜篇名`；開篇重複的作品與聆聽資訊收起，歌曲與場景移至正文最後的「延伸聆聽」。原稿不變。

## 2026-10-26 — 台南少年追風記

- 新增三篇完整繁體 Markdown 與 26 則獨立文化註解，接入既有書庫、Page／Scroll 閱讀器與閱讀進度。
- 新增 MP3 黑膠播放器；歌曲切換由讀者決定，跨章保留正在播放的曲目。作者確認三首歌曲具公開使用授權，指定音檔納入靜態建置。
- 依作者後續指定以 MP3 唱盤整合新版為準，加入木質底座、唱針動作及不會上傳的本機 MP3 選檔；新版包已承接四個音檔，舊包因刪除審查拒絕暫保留。
- 加入作者指定封面與完整簡介；保留封面原比例，維持 GitHub Pages 子路徑相容。第四首無關 MP3 未納入。
- 內容 commit `0e7767f` 已上線；Actions run `40290782382` 成功，正式站與線上 MP3 播放已在 390／1440px Edge headless 驗證。

## 2026-10-26 — 沉浸式閱讀頁

- 桌面 Page 模式擴大書本高度，精簡頂部工具列，左右兩側翻頁並保留底部進度。
- 改善暖紙、日光與夜讀的書本層次；已儲存的主題在章節載入初期即生效，避免短暫顯示 Dark Mode。
- Scroll、手機單頁、章節、腳註、繁簡與進度功能維持。

## 2026-10-26 — 首作前三章與簡繁閱讀

- 作者提供的正式前三章按順序上架，封面與完整簡介沿用現有作品；第三章只標示局部視角切換並採用作者允許的短結尾。
- 首作 ID 改為 `zhen-du-chuanyue`，更新發布檢查及上稿說明。
- 原閱讀器的 OpenCC 1.0.5 `tw→cn` 方法接入書庫、詳情、正文、腳註與介面，偏好保存在新專案鍵；無定位 API 與雲端服務。
- 不改既有翻頁演算法、分頁核心與進度資料結構。

## 2026-10-25 — 獨立專案基底與視覺原型

- 建立臆想書房品牌與本機原型。
- 保全原始工作成果並隔離舊專案內容與 Git。
- 重用分頁／腳註，新增乾淨三主題與輕摺頁。
- 新命名空間的本機進度、停用雲端介面及測試基底。
- 尚未公開發布，未啟用雲端，待視覺驗收。

## 2026-10-26 — MVP 0.1 閱讀流程

- 新增正式書庫、作品詳情、章節目錄及 Markdown 靜態上稿索引。
- 首部作品資料已登錄；作者正文尚未提供，因此沒有正式章節。
- 閱讀頁沿用 Page／Scroll、腳註、三主題與本機進度，加入上下章及章末續讀。
- 新增手機與桌面瀏覽器流程測試、上稿建置驗證及 README 操作說明。
- 僅本機保存，不 Push／部署／啟用雲端。

## 2026-10-26 — 首作封面與發布準備

- 將作者提供的正式 WebP 封面、卷名、分類及兩種長度的簡介接入首頁與詳情頁。
- 本機準備 GitHub Pages 工作流與前兩章發布檢查；正文缺失時阻止部署。
- 第一、二章完整原稿尚未取得，未正式發布。


## 2026-10-26 MVP 品質修正

- 明確翻頁操作解除殘留選取，保留選字及複製。
- 允許 3D 翻頁輪廓顯示、保留既有動畫與速度。
- 加入不改頁數的章末導覽，改善標題換行、首頁作品曝光與詳情閱讀入口。
- 沿用 OpenCC，排除程式碼，提前套用已儲存語言再測量分頁。
- 增加正式頁五尺寸回歸與實際字型驗證；發布 gate 相容 LF／CRLF。


## 2026-10-26 《叫我沈總》正式上架

新增《叫我沈總》正式書籍資料、封面與第一章，完整同人 AU 聲明、獨立作者伏筆追蹤；沿用現有閱讀器與 OpenCC。


### 《叫我沈總》發布驗收結果

內容 commit `4de5de1` 已 Push，Pages Actions run `40306251293` build／deploy 成功。正式首頁、詳情、閱讀頁、索引、第一章、封面皆 HTTP 200，正文與封面 SHA-256 和本機一致。正式站 390／1440px Edge headless 書庫→作品→閱讀→繁簡→翻頁／滾動→進度恢復→返回目錄→舊書回歸通過，無腳本或失敗資源；本機 release 390／1440／1720px、台南 26 註與音樂、6 組動畫回歸均通過，精確提交樹的 check 與發布 gate 亦通過。iPhone Safari 實機未驗；現有站無 TTS 介面及 OG 分享圖系統，未新增或宣稱驗收。正式章節：https://qwerty10218.github.io/imaginary-library/reader.html?work=jiao-wo-shen-zong&chapter=001 。


## 2026-10-26 首頁與閱讀器 UX 本機驗收

本機待驗收：精簡首頁尺寸與間距；依現有 genres 分類篩選並可摺疊簡介；繼續閱讀只先顯示最近一本，其餘可展開。新增既有設定面板的浮動 Aa 與三種偏好；音樂和 Aa 共用安全區域工具列，保留跨章播放。正文 hr 沿用原閱讀器虛線設計並共用分頁測量樣式。未改正文／音訊／路由／繁簡機制；未發布。


### 2026-10-26 作者驗收與正式發布授權

作者已確認 UX 畫面 OK，明確授權測試後 Push 為正式版本。本次只提交首頁／閱讀器 UX、相關測試與本輪文件；既有 EP.03 正文校訂、.gitignore 及其他無關變更排除。npm run check、npm test（6 項）與發布 gate 已通過；正式部署結果將另行續記。


### 2026-10-26 UX 正式版本發布完成

作者已視覺驗收並授權正式發布。UX 提交 `1c079aa` 已 Push，GitHub Pages Actions `40336560855` build／deploy 成功。正式站 https://qwerty10218.github.io/imaginary-library/ 的首頁、閱讀頁、CSS、library／library-model／reader／music-player 腳本與待發布產物 SHA-256 一致；台南 EP.03 也和提交樹一致，沒有混入本機未提交校訂。正式站 Edge headless 375×667、390×900、430×900、1440×900 完整 UX 流程通過，涵蓋分類／摺疊、最近閱讀、Aa 三模式與偏好還原、三主題分場、註解、音樂跨章與逐頁檢查，無腳本或 HTTP 失敗。

線上音訊載入較慢，tests/ux.mjs 新增等待播放狀態與自動收合完成後再操作；保留原斷言，未改網站播放功能。6 項單元測試、check／build、發布 gate 通過。工作區原有 .gitignore、EP.03 校訂與無關接續文字保留、排除發布。iPhone Safari 實機未驗；現行書目無《彼岸仍是人間》，現行閱讀器無 TTS 實作，未宣稱驗證。


## 2026-10-26 黑膠播放器（未發布）

固定 44px 圓形播放鍵；播放器樣式集中至 music-player.css，維持 76px 底座，增加黑膠層次及 8 秒平滑旋轉。播放後保留展開，可手動收合；減少動態偏好停用旋轉。相關本機檢查與回歸通過，待作者視覺驗收。


### 黑膠比例微調（本機未發布）
木座可見寬度 -30%、唱片 68→76px；外框尺寸不變，唱臂依比例定位。保留既有質感／動畫／音訊，check 與相關瀏覽器回歸通過。


### 精簡播放器展開資訊（本機未發布）
移除重複目前播放曲目與正常播放提示；空狀態不佔位，保留錯誤及操作提示。收合列、唱盤與控制不變，check 與播放器／台南／UX 回歸通過。


## 2026-10-26 播放器驗收與 Push 授權

Gary 已確認目前播放器並明確指示「OK PUSH」。本次發布包含播放器質感、比例、展開資訊精簡及選曲小標清晰度；只提交播放器程式、相關測試與本輪紀錄。EP.03 校訂、.gitignore、來源包與其他既有文件差異排除。工作區 check、6 項單元測試及 release gate 通過；Push 與 Pages 結果另行續記。

## 2026-10-26 黑膠播放器正式發布驗證

作者已驗收並指示 OK PUSH。播放器程式與回歸提交 3980c85 已 Push 至 main，GitHub Pages Actions 40341375076 的 build／deploy 均成功。工作區及精確待提交樹的 check、6 項單元測試、release gate 通過；vinyl 320／375／390／430／1440、tainan 390／1440、ux 375／390／430／1440 回歸通過。獨立驗證副本初次因 Windows archive CRLF 及缺少 node_modules 失敗，改用 core.autocrlf=false 匯出並連結既有依賴後完整通過，未修改小說或略過檢查。

正式站 reader.html、reader.css、music-player.css、music-player.js 與 EP.03 顯示產物 SHA-256 均和提交樹建置一致；390／1440px Edge headless 驗證 12px 選曲小標、無重複資訊、MP3 播放／暫停與旋轉，無腳本錯誤。截圖 .local/vinyl/live-{390,1440}.png。Safari 真機未驗。EP.03 本機校訂、.gitignore、其他既有接續差異與未追蹤來源包仍未提交，未混入發布。此前「待驗收／未發布」段落為歷史紀錄，以本段為準。

### 2026-10-26 手機閱讀器留白與工具區（本機未發布）
正文88vw、播放器最多280px；Aa獨立置於播放器上方，移除重複外框、頁碼進度細線及播放器摘要底線，淡化必要邊界。桌面不變；相關檢查／回歸通過，待作者視覺確認。


### 2026-10-26 手機分頁有效容量（本機未發布）
回收手機Page內距／頁眉與頁外頁碼占位，保留18px新使用者預設與已存字級，正文高度增加83px；逐頁全文／註解／分場比對通過。修正手機首次dock量測影響進度恢復的競態，加入dynamic viewport重排及100vh後備。桌面深／淺截圖完全一致。量測報告 .local/mobile-capacity/REPORT.md；Safari真機未驗，未Commit／Push／部署。


## 2026-10-26 手機閱讀器驗收與發布授權

Gary 已指示「push一下」，授權本輪手機閱讀寬度、底部工具布局與分頁容量修改發布。提交範圍僅閱讀器 CSS／手機分支、相關測試與本輪紀錄；EP.03 校訂、.gitignore、來源包及其他既有差異仍排除。正式部署與線上驗證結果另續記。

## 2026-10-27 手機閱讀器正式發布驗證

依 Gary「push一下」授權，手機閱讀器程式提交 dfb993d 已 Push 至 main；Pages Actions 40355011243 的 build／deploy 均成功。精確提交樹的 npm run check、6項單元測試及 release gate 通過；容量深淺六組、重排／進度／橫向三組、UX四尺寸、台南三篇／26註／三首歌回歸通過。

正式站 reader.html、reader.css、music-player.css、reader.js、music-player.js 及 EP.03 顯示產物 SHA-256 與本次提交樹建置一致，沒有混入本機 EP.03 校訂。Edge headless 正式站375×667、390×844、430×932測得正文區分別280×421、293.21875×598、328.40625×686px，頁數49／34／28；逐頁操作、重載進度、Aa、音樂播放／暫停均通過。1440px桌面預設20px與雙頁通過。線上截圖 .local/mobile-capacity/live-{375,390,430}.png。iPhone Safari真機仍未驗。

原工作區 .gitignore、EP.03校訂、其他既有文件差異、來源包與根目錄圖片保留，沒有納入本輪提交。前述「本機待驗收／未發布」為歷史紀錄，以本段為準。

### 2026-10-27 手機小字級（本機未發布）
新增14／16px選項，手機預設18px不變；保留字級偏好、正確重分頁，桌面選項維持原樣。check、單元測試與相關手機深淺色全文／重排驗證通過，Safari真機未驗。


## 2026-10-27 小字級發布授權

Gary 已明確指示 push，授權本次手機14／16px選項及相關測試發布。僅提交本輪程式與紀錄，保留預設18px與桌面原選項；EP.03、.gitignore及其他既有差異排除。部署結果另續記。

## 2026-10-27 手機14／16px正式發布驗證

依Gary「push」授權，程式提交034e3d6已Push至main；Pages Actions 40381740371的build／deploy均成功。工作區與精確提交樹check、6項單元測試、release gate通過；14／16px在375／390／430px深淺12組逐頁全文及三組重排／偏好／進度回歸通過。正式站reader.js、reader.html及EP.03產物SHA-256與提交樹建置一致，未混入本機小說校訂。

正式站Edge headless 375／390／430px驗證預設18、可選16與14、相符頁數、重載字級與閱讀位置保存；切至1440px桌面只顯示18／20／22／24並使用20px，返回手機恢復14px，無腳本錯誤。Safari真機仍未驗。原.gitignore、EP.03、其他既有接續差異與來源包均保留於本機，未混入提交；此前未發布紀錄為歷史狀態。

### 2026-10-27 手機Page底部回收（本機未發布）
手機翻書隱藏重複浮動Aa、播放器回調82vw／最多320px並置中；收合／展開正文皆回收52px，無歌曲作品回收44px。修正模式切換後工具量測重排競態；桌面、Scroll與上方列前後截圖相同，相關檢查全部通過。Safari真機未驗，未Commit／Push／部署。


## 2026-10-27 手機翻書底部發布授權

Gary 已指示 push，授權本次手機Page隱藏重複Aa、回收正文空間及回調播放器寬度發布。只提交本輪程式、測試與紀錄；EP.03校訂、.gitignore及其他既有差異排除，部署結果另續記。

## 2026-10-27 手機翻書底部正式發布驗證

依Gary「push」授權，程式提交c6bc045已Push至main；Pages Actions 40447064455的build／deploy均成功。精確待提交樹npm run check、6項單元測試與release gate通過，沿用本輪已通過的bottom／capacity／reflow／UX／台南回歸結果。

正式站reader.html、reader.css、reader.js及EP.03顯示產物SHA-256與提交樹建置一致，未混入本機小說校訂。直接在正式站執行bottom測試，375×667、390×844、430×932及1440×900全部通過，涵蓋手機Page Aa隱藏、dock無空列／無歌曲歸零、正文與播放器尺寸、上方Aa、翻頁／繁簡／註解、播放暫停／進度／音量及Scroll浮動Aa恢復，無腳本錯誤。線上截圖與量測在.local/mobile-bottom/live/。Safari真機仍未驗。

.gitignore、EP.03校訂、其他既有接續差異、來源包與根目錄圖片均保留本機，未納入發布。前述未發布段落為歷史紀錄，以本段為準。

### 2026-10-27 品牌Favicon（本機未發布）
作者favicon.jpg原樣歸檔為web/assets/branding/favicon-source.jpg；產生16／32／48 ICO與六PNG，四頁Head採相對圖示路徑，建置複製所需品牌資產。原圖背景與配色保留，不裁切；格式／像素／瀏覽器分頁快取及check／8項單元測試均通過。未新增Manifest或PWA，未Commit／Push／部署。


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
