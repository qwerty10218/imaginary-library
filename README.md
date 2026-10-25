# 臆想書房

Gary's Imaginary Library · Gary Lee

原創小說與短篇故事的靜態閱讀網站。MVP 0.1 已有書庫、作品詳情、Markdown 章節目錄與 Page／Scroll 閱讀器。第一部作品《朕都穿越了，怎麼還是你這奸臣？！》已收錄作者提供的正式封面、簡介及前三章。

## 本機預覽

使用 Node.js 24 與 npm：

```sh
npm ci
npm run check
npm run dev
```

首頁：[http://127.0.0.1:4173/imaginary-library/](http://127.0.0.1:4173/imaginary-library/)

正式網站：[https://qwerty10218.github.io/imaginary-library/](https://qwerty10218.github.io/imaginary-library/)

建置輸出在 `dist/`，路徑採相對連結，供 GitHub Pages 的 `/imaginary-library/` 子路徑使用。`npm run dev` 只服務 `dist/`；修改來源後先重跑 `npm run build`。正式入口不需要測試查詢參數或原型頁。

## 新增作品與章節

1. 在 `content/works/` 建立小寫英文 ID 資料夾，例如 `new-story/`。
2. 建立 `metadata.json`，參照 [第一部作品 metadata](content/works/zhen-du-chuanyue/metadata.json)。至少填寫 `id`、`title`、`author`、`description`、`volume`、`genres`、`tags`、`status`、`updatedAt`、`chapters`。`status` 為 `upcoming`、`serializing` 或 `complete`。
3. 將作者正文存入 `chapters/<chapter-id>.md`，參照 [Markdown 範本](content/CHAPTER_TEMPLATE.md)。檔名與章節 ID 相同；ID 用小寫英文、數字與連字號。
4. 在 `metadata.json` 的 `chapters` 陣列按閱讀順序加入 `{"id":"chapter-one","title":"第一章　標題","published":true}`。只有已登錄且明確標記 `published: true` 的章節會進入建置產物；未登錄的 Markdown 不會公開。
5. 可選：將封面放入 `web/assets/covers/`，在 metadata 設定相對網站路徑，例如 `"cover":"assets/covers/new_story_cover.webp"`。未提供封面時使用文字佔位設計。
6. 執行 `npm run check`、`npm run build`、`npm run dev`，在書庫、作品頁與閱讀頁逐一預覽。上架前確認作者稿與章節順序。

作品資料與正文存在 Git，網站從建置時產生的 `data/works.json` 載入索引。新增作品或章節不需要修改閱讀器程式。本機閱讀進度按作品 ID 分開保存在 `imaginary-library:v1:` 命名空間；繁簡偏好另存於 `imaginary-library:v1:language`。繁體 Markdown 是唯一正式來源，畫面簡體轉換沿用原閱讀器的 OpenCC 1.0.5（同版精簡 `tw→cn` 模組，本機靜態資源），不需要外部定位或字型服務。登入及雲端同步尚未啟用。

## 驗證與發布狀態

`npm run check` 執行語法、進度單元測試、建置與公開產物敏感內容掃描。瀏覽器測試需先啟動預覽服務：`node tests/browser.mjs`、`node tests/page-turn.mjs`、`node tests/mvp.mjs`、`node tests/release.mjs`。`node tests/workflow.mjs` 驗證新作品與 Markdown 上稿只複製已登錄章節，測後會重建正式產物。

`node scripts/check-release.mjs` 會確認正式封面與前三章來源，避免不完整作品部署。正式雲端資源仍須另獲授權。靜態 GitHub Pages 不提供訪客 IP 地區資訊；本站不呼叫第三方定位 API，預設繁體並讓讀者手動切換。
