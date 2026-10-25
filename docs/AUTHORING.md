# Markdown 創作與上稿

作品資料放在 `content/works/<work-id>/metadata.json`，正文放在同一資料夾的 `chapters/<chapter-id>.md`。參照 [README](../README.md) 與 [章節範本](../content/CHAPTER_TEMPLATE.md)。

只有 metadata 的 `chapters` 陣列中明確標記 `published: true` 且檔案存在的章節會進入 `dist/`。按照目錄順序登錄即可，不需修改閱讀器核心。私人草稿應留在忽略的 `drafts/`，不要放入公開產物。

封面放在 `web/assets/covers/`；metadata 的 `cover` 使用 `assets/covers/<檔名>.webp` 等相對路徑。建置只複製 metadata 已登錄的封面。原稿與圖片上架後，執行 `npm run check`、`npm run build`，再以本機預覽確認手機、桌面、章節目錄和下一章導航。
