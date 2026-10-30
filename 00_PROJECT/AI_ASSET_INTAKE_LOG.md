# ChatGPT 交付素材接收紀錄

依 [AI_COLLAB_WORKFLOW.md](AI_COLLAB_WORKFLOW.md) 增量維護。僅記本次已辨識／處理項目，不把所有未追蹤檔案當成 ChatGPT 交付物；私人全文、本機路徑及敏感設定只存忽略的本地索引。下列日期是本輪盤點日，不冒充歷史來源的原始接收日期。

## 紀錄格式

每批記錄：接收／盤點日期、原始檔名與類型、原始位置、整理後位置、是否整合、是否需要部署、原件是否歸檔及保存位置、必要 SHA-256 或 manifest、待確認事項。狀態可用「已整合」「僅歸檔」「待判定」「歷史保留」「規則文件」。同一原件未變更時引用舊紀錄，不重複雜湊所有歷史檔。

## 2026-10-27 初始盤點：建立規範，不搬歷史檔案

| 原件／類型 | 原始位置及目前去向 | 整合／部署 | 原始保存與去重 | 待確認／處置 |
| --- | --- | --- | --- | --- |
| 本次「長期協作與素材自動歸檔規範」／UTF-8 TXT | 本次訊息附件 `貼上的文字.txt` → AGENTS.md、本流程及本紀錄 | 規則文件；不部署為網站頁面 | 原附件留原位；SHA-256 見下方實測補記 | 已依作者任務整理，無素材搬移 |
| `叫我沈總_正式上架包/`／歷史來源資料夾 | 根目錄原位保留 | 已有正式作品，但本輪不重新判定每檔整合狀態；來源包不部署 | 忽略來源原位保存；既有 `_archive/phase1-source-manifest.json` 為歷史去重依據，本輪未重算全包 | `_archive/INDEX.md` 記載舊本地腳本路徑依賴；不自行搬移 |
| `台南少年追風記_首發包/`／歷史來源資料夾 | 根目錄原位保留 | 已有正式系列；本輪不重整／重發，來源包不部署 | 忽略來源原位保存；歷史 manifest 同上，本輪未重算全包 | 存在歷史路徑依賴紀錄，維持原位 |
| `台南少年追風記_MP3唱盤整合版新版/`／歷史來源資料夾 | 根目錄原位保留 | 現有正式音樂依 metadata；本輪不新增音樂或部署來源包 | 忽略來源原位保存，不重複複製或重算全包 | scripts/preview.mjs 尚有本地音樂來源路徑，搬移須另核對 |
| 既有 D 版圖示與完整版 Logo／PNG、ICO、JPEG、來源腳本 | 正式成品 `web/assets/icons/`、頁首 `web/assets/branding/brand-logo.png`；其他來源與舊版在 branding 本地忽略區 | 先前已整合並發布；本輪不重產、不改引用 | 詳見 FAVICON_ASSETS.md；本地 `web/assets/branding/favicon-inventory.json` 有原名／目的地／SHA-256 | 已有來源紀錄，沿用，不再複製一套 |

根目錄目前沒有另見散落的新 ZIP、小說 MD 或圖片；必要設定、正式資料夾及歷史來源包保持原狀。`_archive/`、`.local/`、`.migration-backup/` 都不是本次新增交付，不刪除、不搬移。尚未完成原位歸檔的歷史來源不代表網站缺少正式依賴，後續整理須先查引用。

本次附件實測：UTF-8 可解碼、11475 bytes；SHA-256：`6def51a32b5e12a6c1415a17e7b0101a2add16e2424cd1ab20ecc98b15ecdd21`。原附件完整保留，未複製到網站資產。


## 2026-10-27 EP.04〈30CM〉與台南來源整理（作者授權上線）

- `30CM/04-30CM.md`（UTF-8 Markdown，21,618 bytes，SHA-256 `c963d074213fba0e70957628ac7dfb094068eea0001664a2dd72d7cd38ca1cb0`）→ `content/works/tainan-youth-wind/chapters/ep04.md`；僅按作者指示替換三處「大屌歌」為「大屌哥」。五則註解逐字接入 notes.json，延伸聆聽與選曲由 metadata 連接。
- `30CM/CODEX_PROMPT_EP04.txt`、`README.txt` 為來源說明，不進正式網站；原包三檔完整保存 `_archive/source-packages/chatgpt/2026-10-27/tainan-ep04/30CM/`。附帶指令僅供參考，以當次作者要求為準。
- 根目錄 `頑童-30CM.mp3`（4,874,874 bytes，ID3/MPEG，可由瀏覽器解碼，378.160181 秒，SHA-256 `557b96d9ec60eac1c2e1a0914b351d111c133a0fc2cab4043c648c648fd3924e`）→ `web/assets/music/thirty-centimeters.mp3`，依作者本次指示隨章接入播放器。原件同批歸檔，複製位元一致。
- 兩個歷史台南包已移至 `_archive/source-packages/tainan/legacy-first-release/` 與 `legacy-vinyl-package/`；連同本輪新來源共 28 檔全部 SHA256 校驗相同，manifest 在該區 `2026-10-27-manifest.json`，不公開。預覽／現行測試改用正式音檔，歷史本地快照的舊路徑保留為歷史，不作現行執行入口。
- 根目錄新 `30CM/` 及 MP3 重複副本依作者要求，待部署與線上全文／音檔核對成功後才移除；歸檔原件持續保留。其他作品來源、備份及 .migration-backup 不動。以上更新取代初始盤點中台南來源仍在根目錄的狀態。


## 2026-10-28 EP.05〈夢醒時分〉完整交付

- 實際入口為根目錄 `夢醒時分完整上架包/`（已解包六檔），未提供指定 ZIP，故無 ZIP 解壓。四份文件均通過 SHA256SUMS；章節原稿 SHA-256 `9242b77d1a674cb204541dca5a63d9b57f59bf98661701033a923f0ea3f7cd76`。
- 正文 → content/works/tainan-youth-wind/chapters/ep05.md；兩份 CREATIVE 文件 → 00_PROJECT/ 同名檔；README／SHA256SUMS 只歸檔。原件完整保存 `_archive/source-packages/chatgpt/2026-10-28/tainan-ep05/`，manifest.json 記六檔大小與雜湊，複製後逐檔核對。
- `伍佰-夢醒時分.mp3` → web/assets/music/dream-awakening.mp3，5,431,934 bytes，ID3/MPEG，瀏覽器解碼 226.255238 秒；SHA-256 `8f203eccea798bd1c57504cfa119bb6abd744daee6680d1ffe0ae1b923e84e26`，原件及正式檔位元相同。作者本次明確要求隨章發布；公開音樂與歌詞授權仍由作者另行確認。
- 歸檔不進 Git／Build；部署核對成功後才清除本次入口重複副本。發布結果以本輪最終回報為準。


## 2026-10-28 EP.04〈30CM〉v3 精簡定稿（本輪授權發布）

- 作者指定根目錄 `04-30CM_精簡試讀版_v3_統一大屌哥.md` 為唯一母本；9,719 bytes，SHA-256 `267a6986f42440dbe3d2d8aca7fdd86571cae574073918eb0cedafc8d499a3ff`。原樣取代 content/works/tainan-youth-wind/chapters/ep04.md，來源與正式檔逐位元一致，無正文重寫。大屌哥實測 5 處、大屌歌 0 處，保留散步、翔宇道歉、十年之約、合照與紅燈歌曲結尾。
- 沿用原 slug、章節順序、五則文化註解、延伸聆聽及歌曲；v3 的註4優先於先前未提交的簡短措辭，notes.json 已與 v3 同步（內容回到已提交版本），舊差異僅留本地稽核記錄。其他四章、閱讀器、播放器、繁簡原始位元未變。
- npm run check、npm test（9 項）、npm run build、release gate、EP.04 四尺寸、台南舊四篇註解／音樂回歸、chapter-music 390/1440 通過。另以 375/390/430/1440 逐頁掃描所有五註，無空頁／溢出，確認章末聆聽；iPhone Safari 實機未驗。發布前仍須精確暫存樹獨立驗證。
- 作者特別允許此次交付副本驗證後直接刪除、不另歸檔；檢查未追蹤狀態、路徑及正式程式無引用後，只刪除本輪根目錄 v3 副本。既有舊版原件與 v3 內容不同且屬歷史來源，完整保留，未刪備份。
- 初始 main／origin/main 為 fd8ea0a；既有沈總整理等無關文件差異保留、不夾帶。本輪已授權 Commit／Push，準備依既有 Pages 流程發布；實際結果以本輪最終回報及 .local/ep04-v3/ 證據為準。


## 2026-10-30 《規矩是死的，你也是》第一包

六檔來源已逐檔 SHA-256 核對保存於忽略的 _archive/source-packages/chatgpt/2026-10-30/rules-first-package/（manifest.json）。正文原樣整合，SHA-256 0b2f2e41cccdf81bf5ab36c5f2c06bbdd98611461d6c1a43e90358c94a5b7fcd。依作者補充以 cover.png 為準，以 Pillow 無損轉 WebP，1024×1536、解碼像素完全一致；正式 WebP SHA-256 031677c9afae2f49934c394cd1bc46b1161d9230e56480e39b8712c709528d9f。原包 WebP 不採用。來源包不進 Git／Build；待部署逐檔核對成功才清除根目錄入口。


## 2026-10-30 繁簡詞語修正

共用 language.js 補正「倒楣→倒霉」，保留「門楣→门楣」與既有「擡→抬」修正，繁體正文不變。新增 language.test.mjs，檢查乾／幹、髮／發、后／後、鍊／鏈、菸／煙、人物地名與繁體還原。check、11 項單元測試、build、release gate 通過；390/1440 實際閱讀頁簡體詞語、重載與繁體恢復、HTML 屬性／路由／code 保護通過，並批次檢查四作品 metadata 與十章轉換及原文還原。此段寫入時尚待精確提交樹與 Pages，沿用本輪新書發布後修正授權；部署結果見本輪最終回報及 .local/language-fix/。未收到新增素材，未搬移來源，既有文件差異保留且排除提交。


## 2026-10-30 第一章雙插圖

原始兩圖已複製核對保存於忽略的 _archive/source-packages/chatgpt/2026-10-30/rules-ep01-illustrations/，manifest.json 記對照；ep01_shiqiao_checkpoint.png：2325808 bytes，SHA-256 9a90c57a50a05cd4021fe8c0ea6b7d50c4ba9276d43d5c8be37e66d3e6a4faaa；ep01_shiqiao_gunpoint.png：2353153 bytes，SHA-256 b1a5bd5faa2068b67e9faf4a42c18066f03421d870c4eb0776bf1441f117024b。待本輪部署與線上核對成功後清除根目錄兩個 PNG，原圖歸檔保留。

作者本輪已明確授權 Commit／Push／部署與原圖歸檔、入口清理。寫入時尚待精確暫存樹及 Pages 驗證；既有五份歷史文件差異安全排除，發布結果見本輪最終回報及 .local/ep01-illustrations/。


## 2026-10-31 第一章插圖改至正文開頭

依作者最新指示，兩張內文插圖從中段移至章名之後、第一段正文之前，順序為遞菸→拔槍，各引用一次。正式封面與圖片位元不變；移除圖片標記後正文與上一版逐位元相同。無新增來源交付，不需歸檔或清理。check、11 項單元測試、build、release gate 已通過；手機／桌面與精確提交版本驗證進行中，通過後沿用本次上線授權發布。原有五份文件未提交內容保留且排除；最終測試／部署結果見本輪回報與 .local/ep01-opening/。
