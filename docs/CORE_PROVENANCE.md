# 分頁核心保全與漸進遷移

本輪先交付視覺驗收原型，不宣稱完成整個閱讀器重構。

## 來源

從遷移當下包含未提交修改的 script.js 抽取以下函式群至 web/js/reader/core.js：

- escapeHtml、註碼識別、註解模型與收集。
- buildChapterModel、頁底註及章末註。
- getStackHeight、正文／註腳測量、makePage。
- stabilizePageBlocks、splitLongBlock、buildFallbackEndnotePages、buildPages。

這些函式沿用原演算法，沒有另寫新的分頁引擎。完整原始 JS、CSS、Git metadata 與未提交狀態皆存於本機忽略的回退區，不在新 Git 歷史。

## 最小介面改造

- createReaderCore() 封裝章節模型、測量 DOM 與排版尺寸；parse / paginate / pageNotes / endnotes / dispose 為原型介面。
- marked 固定版本，本機載入；DOMPurify 淨化 HTML。
- TTS 段落 selector 改為通用閱讀段落 selector。
- 原型傳入實際內容區寬高；測量與顯示共用 CSS。
- 頁底註高度計入外距、內距與分隔線。
- 長段落切分增加 data-start，供段內位置定位。
- 實測 375×667、24px／2.1 行距出現註腳重疊後，針對 splitLongBlock 修復：沿用二分測量，改用 DOM Range 保留格式，以 grapheme 邊界切分並保護註碼；每片段重新預留註腳空間。
- 舊動畫、單本設定、音訊及雲端耦合沒有載入原型。

## 視覺驗收後再處理

- 長段落切分已針對確認的錯誤修復；不把示範與回歸測試通過視為所有複雜 Markdown 組合均已驗證。
- 超長章末註、表格、大圖、圖片解碼後重排與大量正文效能尚未驗收。
- 正式章節導航、資料索引、通用 Markdown 註腳擴充、每作品內容版本恢復策略尚待後續階段。
- prototype.js 是獨立驗收控制器，不能直接當作完成版多作品應用。
