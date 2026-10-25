# 本機保全與回退

本輪建立 copy-manifest、original-manifest、removal-inventory 及 reference-map，均只存於忽略的 .migration-backup/2026-10-25。

- snapshot：3,703 個原副本檔案，2,466,953,887 bytes，逐檔 SHA-256 核對；node_modules 不列入可重建來源備份。
- original-manifest：原始專案 3,703 檔案完整雜湊基準。與副本內容比對僅 Git index 不同。
- restore-rehearsal：核心 JS、CSS、章節與 Git 設定的複製還原抽驗均通過。
- retired：批次永久刪除被自動安全審核阻擋後，採非破壞性的搬移隔離。舊資料及舊 Git 仍可復原，但不在有效工作區或新 Git 歷史。

永久清除尚未執行。不得把隔離搬移報告成已永久刪除。

回退只操作副本：先保存新工作，再將新根 Git 隔離，依 snapshot 的相對路徑還原檔案，核對 manifest；恢復舊 web/.git 前必須明確理解其舊 remote，禁止推送。原始專案不作為還原目標。

備份故障、路徑不在副本、發現 reparse point 或雜湊不符時停止。所有備份與清單不得提交至公開 Repository。
