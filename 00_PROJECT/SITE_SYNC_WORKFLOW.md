# 已驗收本地網站的完整同步與發布流程

本文件適用於本專案的原生 HTML、CSS、ES modules 與自訂 Node Build；不是通用 Vite 流程。命令以專案根目錄執行。使用前先讀 AGENTS.md、package.json、現有測試與 `.github/workflows/pages.yml`；若架構已變更，先依實際設定調整。

## 1. 確認授權與三種版本

- A：已儲存的本地正式網站來源與本地 Build，不僅是 Git HEAD。
- B：fetch 後的 origin/main。
- C：GitHub Pages 最新成功部署的實際 Commit。

作者驗收整體本地網站並授權同步時，包含已完成正文、UI、品牌資產、功能、必要建置與合理專案文件；不要強制拆成逐功能發布。未驗收內容、敏感資料及來源包不因此獲得公開授權。不確定某檔案是否適合公開時，列名並停止相關提交。

安全盤點命令：

```powershell
git status --short --branch
git fetch origin
git log -5 --oneline --decorate
git rev-list --left-right --count HEAD...origin/main
git diff
git diff --stat
git diff --cached
git ls-files --others --exclude-standard
git diff --name-only --diff-filter=U
git ls-files dist
```

另外檢查 `.gitignore`、`.gitattributes`、hooks 與部署 workflow。只有讀取及 fetch；不得用 reset、clean、checkout 覆蓋本地檔案。遠端有本地沒有的提交或分歧時停止發布，回報差異，不強制覆蓋或自行拉取合併。

查 GitHub Actions 與 github-pages deployment 的 SHA、狀態、環境網址，確認 C 是否等於 B。`gh` 不存在時可用 GitHub REST API；公開儲存庫優先無憑證的唯讀請求，保留回應於忽略的 `.local/sync/`，不可輸出 token。常用端點：

```text
https://api.github.com/repos/qwerty10218/imaginary-library/actions/workflows/pages.yml/runs
https://api.github.com/repos/qwerty10218/imaginary-library/actions/runs/{run_id}/jobs
https://api.github.com/repos/qwerty10218/imaginary-library/deployments?environment=github-pages
https://api.github.com/repos/qwerty10218/imaginary-library/deployments/{deployment_id}/statuses
```

## 2. 差異分類與資產界線

逐項記錄新增、修改、刪除／搬移，檢查 HTML/CSS/JS、閱讀器、播放器、作品 metadata、正文、文化註解、書庫、文件及 Build，不因首頁外觀相同就忽略內容。

| 分類 | 處理 |
| --- | --- |
| 已驗收正式網站來源、靜態資產、Build 所需設定 | 本次同步 |
| 適合目前儲存庫的工程文件、測試、規則、忽略設定 | 納入版本管理，不因此發布為網站頁面 |
| 備份、私人稿件、未使用上架包、設計來源／預覽、重複素材、暫存 | 原地保留本地並精確忽略，不加入 Git、不刪除 |

目前 `web/assets/icons/` 是正式圖示來源；`web/assets/branding/` 只有 `brand-logo.png` 受版本管理及部署，其餘設計素材保留本地。測試讀正式資產 fixture，不依賴忽略母版。不要重新產圖或改動品牌，除非另有要求。

`dist/` 是忽略的自動產物，不作為來源或 Stage 對象。Build 僅複製必要資產，母版、預覽、legacy 及來源包不得出現在產物。MP3 以既有 metadata 和授權清單為準，不把來源資料夾整批加入。忽略規則應精確，不以寬泛忽略掩蓋正式變更。

網站文字使用現有 LF 規則。若雜湊不同，先檢查是否純 CRLF／LF 差異；不能只忽略換行後宣稱逐位元相同。必要的換行統一不應混入邏輯修改。

## 3. 本地檢查、明確 Stage 與獨立建置

依 package.json 與變更範圍實際執行：

```powershell
npm run check
npm test
npm run build
node scripts/check-release.mjs
```

適用瀏覽器回歸：

- `node tests/favicon.mjs`：圖示、Pages 子路徑、MIME、正式資產雜湊與私有來源不部署；自帶短期測試伺服器。
- `node tests/release.mjs`：書庫、封面、章節、繁簡、頁面導航。
- `node tests/tainan.mjs`：系列各篇歌曲對應、文化註解、播放／暫停、音量、進度、跨章播放。
- `node tests/mobile-bottom.mjs`：手機底部及桌面布局有相關變更時執行。

後三者目前使用既有 4173 預覽。先確認它服務本專案；保留使用者既有程序，不擅自終止或替換。需要替代服務時用可自動關閉的測試內伺服器；不能啟動時如實記為未驗證。測試失敗須讀錯誤並修正本次問題，不關閉檢查、改低門檻或刪測試。

先在 IMPLEMENTATION_LOG、CURRENT_STATUS、必要 CHANGELOG／QA 記錄範圍、驗證及當前狀態，最後更新 AI_SYNC_BRIEF。未部署前不得寫「已部署」。使用具名檔案清單 `git add -- <檔案…>`，再讀完整 `git diff --cached`、`git diff --cached --check`；確認沒有憑證、私人檔案、新增未授權音樂或來源素材。

若可能依賴本機檔案，使用 `git write-tree` 取得精確暫存樹，再以 `git -c core.autocrlf=false archive <tree>` 匯出到全新 `.local/sync/` 子目錄。Windows 不用會重新編碼二進位的文字重導向寫 tar；以 Node Buffer 或同等安全方式保存。不得覆蓋目前工作目錄。

在匯出目錄執行 `npm ci`、check、test、build、release gate 及適用的獨立測試。不能連結主工作區的忽略素材來掩蓋缺檔。將兩份 dist 的完整相對檔名集合與每檔 SHA-256 比對，必須一致；產物內檔案數當次計算。新增程式、設定或資產後重新驗證對應項目。

## 4. 提交與既有 Pages 發布

只有當次對話已授權 Push／部署、驗證通過且沒有未分類檔案時繼續。作者已授權的範圍內，不為每一步重複詢問。

提交前再次 fetch，確認遠端沒有新提交、沒有衝突或新出現的待同步正式差異。使用作者指定訊息；整體同步未指定時可用：

```powershell
git commit -m "chore: sync verified local site updates"
git push origin main
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

不得繞過 hooks、使用 force，或為同步建立另一套部署系統。沿用 main Push 觸發的 `.github/workflows/pages.yml`。比較完整 SHA，等候對應 run 的 Build、Deploy 及 github-pages deployment status 均成功；不是只看最近一個綠色工作流程。等候時合理拉長輪詢間隔，持續回報有意義的進展。

## 5. 發布後驗收

- 本地 HEAD = 遠端 main = 成功 Pages deployment SHA。
- 從 `https://qwerty10218.github.io/imaginary-library/` 以不同查詢參數及 no-cache 請求抓取當次完整 Build 清單，逐檔比較 SHA-256，包含正文、索引、HTML、CSS、JS、封面、圖示與正式音檔。記錄缺檔及差異，失敗時不宣稱同步完成。
- 檢查必要路由／連結和新刪除資產是否仍被引用；不能只比較首頁或 Git 版本。
- 用新的瀏覽器 context 驗證首頁 Logo、Favicon/Apple 圖示載入及 MIME、書庫、作品入口、閱讀器、註解、繁簡與音樂操作。相關手機與桌面尺寸依當次範圍測量。
- Favicon 可用 `TEST_BASE` 指向正式站；其他測試若硬編碼本機 URL，可在 `.local/sync/` 產生只替換 base 與 import 路徑的臨時副本，維持原斷言並記錄執行方式，不為上線測試改動產品程式。
- 最後執行 git status 與 diff；可以有明確分類的本地忽略素材，不能留下未同步的正式網站來源而宣稱一致。

原始 API 回應、雜湊報告、截圖和臨時測試放 `.local/sync/`。最終回報列出同步前差異、已同步內容、本地保留項目與原因、Commit、Actions 連結、正式網址、實測結果及未驗證事項。部署證據可於當輪最終回報引用；若還需更新版本管理文件，不得只為補寫「成功」無故連續觸發發布，應明確區分後續文件修改與已部署網站版本。
