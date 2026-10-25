# 可選雲端同步審查

## 已確認的舊前端行為

舊機制依 reader_name 查詢 reading_progress，以暱稱作 upsert conflict key。取得 chapter_id、progress、updated_at，實際還原主要是章節。未使用 Supabase Auth 身份驗證。

同步延遲五秒，只有 catch，未一致檢查 API 回傳 error；可能把失敗當成功。同步時間使用瀏覽器 Date.now / ISO 時間，沒有可靠伺服器版本比較。沒有多作品識別、段落位置、離線待送佇列、有限退避或衝突解決。

本機未找到資料表 DDL 或 RLS policy。資料表欄位僅從客戶端請求推定，**正式 schema、RLS、grants 均未驗證**。未連線查詢或修改舊資料庫。

## 分類

1. 可保留設計：背景同步、延遲保存、雲端故障不阻擋閱讀。沒有已確認可不改就安全沿用的身份／資料寫入模組。
2. 需修改：回傳錯誤處理、重試、資料識別、版本、時間戳、位置模型及本機／雲端合併。
3. 不沿用：暱稱作身份、強制登入、硬編碼舊服務目標、登入即以雲端覆蓋本機。

## 第一階段

本機資料是必要功能。ProgressStore 使用獨立 namespace；SyncPort 預設 disabled，不載入 SDK、不保存雲端憑證、不發送請求。原型有基本位置與例外測試；正式多作品與完整復原仍待實作。

## 第二階段啟用前置條件

- 另獲授權並建立獨立服務環境，不沿用舊正式資料庫。
- 採 Auth Email OTP / Magic Link；顯示名稱與身份分離。
- row key 為 user_id、work_id；資料含 chapter_id、block anchor、offset、percentage、content version、schema version、server updated_at 及 revision。
- RLS 的 SELECT／INSERT／UPDATE／DELETE 必須限制 auth.uid() = user_id；拒絕匿名存取他人進度。用兩個帳號及匿名請求實測，不只閱讀 SQL。
- 前端只能使用該新專案的公開設定；service role／管理憑證永不進前端或公開 Git。
- 第一次登入逐作品合併：只有一邊有資料則採用該邊；相同位置合併；兩邊不同且缺少共同同步基準時呈現兩個位置供選，不單憑裝置時間覆寫。
- 後續以伺服器 revision 條件更新偵測衝突。保留本機未送出位置，不因網路失敗丟失；採有限次數退避重試。
- 登出取消待發送請求並清除該帳號雲端工作狀態，不串到下一個帳號，也不刪除訪客本機閱讀紀錄。

以上為後續規格，尚未實作或啟用。雲端工作不阻擋第一版完成。
