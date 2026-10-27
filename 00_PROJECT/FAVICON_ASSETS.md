# 品牌圖示來源與歸檔

正式 Favicon 使用作者提供的 D 版套件，全部逐位元搬入，沒有產圖、重採樣或重新壓縮。

## 正式與原始素材

- `web/assets/icons/`：網站部署的七個正式檔案。ICO 含 16/32/48/64px。
- `web/assets/branding/`：D 版母版、來源、64px 衍生圖與原有 2048px `favicon-source.jpg`；不部署。
- 唯一例外 `brand-logo.png` 為既有頁首完整 Logo 的 192px 圖檔，維持頁首像素不變，由 Build 明確複製。
- `legacy/`：被 D 版取代的舊圖示與舊製作腳本（文字歸檔，不再執行），不部署。
- `favicon-inventory.json`：完整原始名稱、格式、尺寸、SHA256 與搬移目的地。
- `favicon-source.jpg` SHA256：`7fec420fe4614f5dbe9c5aeda2905566cf3eeabbb3563b3ae3401a85b022d062`。

## 原 Favicon/ 完整清單與處置

| 原檔名 | 格式／尺寸 | 用途 | 搬移位置 |
| --- | --- | --- | --- |
| 臆想書房_D版_16x16.png | PNG RGB 16×16 | 正式圖示 | `web/assets/icons/favicon-16x16.png` |
| 臆想書房_D版_180x180.png | PNG RGB 180×180 | Apple Touch Icon | `web/assets/icons/apple-touch-icon.png` |
| 臆想書房_D版_192x192.png | PNG RGB 192×192 | 大型圖示 | `web/assets/icons/icon-192x192.png` |
| 臆想書房_D版_32x32.png | PNG RGB 32×32 | 正式圖示 | `web/assets/icons/favicon-32x32.png` |
| 臆想書房_D版_48x48.png | PNG RGB 48×48 | 正式圖示 | `web/assets/icons/favicon-48x48.png` |
| 臆想書房_D版_512x512.png | PNG RGB 512×512 | 大型圖示 | `web/assets/icons/icon-512x512.png` |
| 臆想書房_D版_64x64.png | PNG RGB 64×64 | 64px 預覽用衍生圖，非部署資產 | `web/assets/branding/favicon-64x64.png` |
| 臆想書房_D版_favicon.ico | ICO RGB 16×16 / 32×32 / 48×48 / 64×64 | 正式 ICO，含 16/32/48/64px | `web/assets/icons/favicon.ico` |
| 臆想書房_D版_Favicon母版_1024.png | PNG RGB 1024×1024 | D 版 Favicon 母版 | `web/assets/branding/favicon-master.png` |
| 臆想書房_D版_去字原樣.png | PNG RGB 331×331 | 331px 來源衍生圖，保留備查 | `web/assets/branding/logo-source-no-text.png` |
| 臆想書房_D版_尺寸預覽.png | PNG RGB 550×200 | 現成實際尺寸預覽 | `web/assets/branding/favicon-preview.png` |
| 臆想書房_D版_忠實母版_1024.png | PNG RGB 1024×1024 | D 版完整構圖母版 | `web/assets/branding/logo-master.png` |

以上 12 檔皆完整保留並校驗 SHA256；根目錄 Favicon/ 在搬移驗證後移除，無用途不明的檔案遭刪除。

## 維護與驗證

不要再從舊 JPEG 執行舊腳本覆蓋 D 版。更新圖示需取得新成品，先比對並更新清單 SHA256，再執行 `npm run check`、`npm test`、`node tests/favicon.mjs`。
四個 HTML Head 使用 `assets/icons/` 相對路徑；沒有 Manifest，也未新增 PWA。`dist/` 為忽略的自動產物，只能由 Build 更新。

原套件 ICO 與同尺寸 PNG 並非逐像素相同：16/32/48/64px 最大單通道色階差依序為 1/1/2/3（0–255）；均保留提供的原始位元，未重產。Chrome 四頁實際分頁快取像素已比對 D 版 ICO 完全一致。

## 完整網站同步的版本管理界線

正式圖示及頁首 brand-logo.png 納入 Git；其他 branding/ 母版、預覽、來源、legacy/ 與盤點 JSON 以 .gitignore 保留本地，不推至 GitHub。測試改讀 tests/fixtures/favicon-assets.json 的八個正式資產雜湊，不依賴本地設計檔。Build 只發佈正式資產，未更動授權音樂清單。
