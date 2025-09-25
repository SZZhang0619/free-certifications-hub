# 🚀 GitHub Pages 部署指南

本指南將協助您將免費認證課程網站部署到 GitHub Pages，並設定自動同步功能。

## 📋 部署前準備

### 1. 建立 GitHub 倉庫
1. 登入 [GitHub](https://github.com)
2. 點擊右上角的 "+" 按鈕，選擇 "New repository"
3. 輸入倉庫名稱（例如：`free-certifications-hub`）
4. 設定為 Public（GitHub Pages 免費版需要公開倉庫）
5. 點擊 "Create repository"

### 2. 上傳專案檔案
```bash
# 在本地專案目錄中執行
git init
git add .
git commit -m "🎉 初始化免費認證課程網站"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## ⚙️ 設定 GitHub Pages

### 1. 啟用 GitHub Pages
1. 進入您的 GitHub 倉庫
2. 點擊 "Settings" 標籤
3. 在左側選單中找到 "Pages"
4. 在 "Source" 部分選擇 "GitHub Actions"
5. 點擊 "Save"

### 2. 設定 Vite 建構配置
確保 `vite.config.js` 包含正確的 base 路徑：

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPOSITORY_NAME/', // 替換為您的倉庫名稱
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 3. 更新 package.json
確保建構腳本正確：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🔄 自動部署工作流程

專案已包含兩個 GitHub Actions 工作流程：

### 1. 部署工作流程 (`.github/workflows/deploy.yml`)
- **觸發條件：** 推送到 main 分支時自動執行
- **功能：** 自動建構並部署到 GitHub Pages
- **執行步驟：**
  1. 檢出程式碼
  2. 設定 Node.js 環境
  3. 安裝 pnpm
  4. 安裝相依套件
  5. 建構專案
  6. 部署到 GitHub Pages

### 2. 資料同步工作流程 (`.github/workflows/sync-data.yml`)
- **觸發條件：** 每週日 UTC 00:00（台灣時間週日上午 8:00）
- **功能：** 自動同步最新的免費認證課程資料
- **執行步驟：**
  1. 下載最新的 README.md
  2. 檢查檔案變更
  3. 更新 `src/assets/Free-Certifications.md`
  4. 重新建構專案
  5. 提交並推送變更

## 🛠️ 手動觸發部署

### 方法一：透過 GitHub 網頁介面
1. 進入您的 GitHub 倉庫
2. 點擊 "Actions" 標籤
3. 選擇 "Deploy to GitHub Pages" 工作流程
4. 點擊 "Run workflow" 按鈕
5. 選擇分支並點擊 "Run workflow"

### 方法二：透過程式碼推送
```bash
# 進行任何變更後推送
git add .
git commit -m "🔧 更新網站內容"
git push origin main
```

## 📊 監控部署狀態

### 1. 檢查 Actions 執行狀態
1. 進入 GitHub 倉庫的 "Actions" 標籤
2. 查看最新的工作流程執行狀態
3. 點擊特定執行來查看詳細日誌

### 2. 檢查部署結果
- 部署成功後，網站將在以下網址可用：
  `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

## 🔧 自訂配置

### 1. 修改同步頻率
編輯 `.github/workflows/sync-data.yml` 中的 cron 表達式：

```yaml
schedule:
  # 每天 UTC 00:00 執行
  - cron: '0 0 * * *'
  
  # 每週一 UTC 09:00 執行
  - cron: '0 9 * * 1'
  
  # 每月 1 日 UTC 12:00 執行
  - cron: '0 12 1 * *'
```

### 2. 自訂網域名稱
1. 在倉庫根目錄建立 `public/CNAME` 檔案
2. 在檔案中輸入您的自訂網域（例如：`certifications.yourdomain.com`）
3. 在您的 DNS 提供商設定 CNAME 記錄指向 `YOUR_USERNAME.github.io`

### 3. 環境變數設定
如需設定敏感資訊：
1. 進入 GitHub 倉庫的 "Settings" > "Secrets and variables" > "Actions"
2. 點擊 "New repository secret"
3. 添加所需的環境變數

## 🐛 常見問題排解

### 1. 部署失敗
- 檢查 Actions 日誌中的錯誤訊息
- 確認 `vite.config.js` 中的 base 路徑正確
- 檢查相依套件是否正確安裝

### 2. 網站無法訪問
- 確認 GitHub Pages 已正確啟用
- 檢查倉庫是否為 Public
- 等待 DNS 傳播（可能需要幾分鐘）

### 3. 自動同步失敗
- 檢查來源倉庫 URL 是否正確
- 確認 GitHub Actions 有足夠的權限
- 檢查網路連線是否正常

## 📈 效能優化建議

### 1. 啟用快取
GitHub Actions 已配置 npm 快取以加速建構。

### 2. 程式碼分割
考慮使用動態匯入來減少初始載入時間：

```javascript
const LazyComponent = lazy(() => import('./components/LazyComponent'))
```

### 3. 圖片優化
- 使用 WebP 格式
- 實作懶載入
- 壓縮圖片檔案

## 🔒 安全性考量

### 1. 相依套件安全
定期更新相依套件：
```bash
npm audit
npm update
```

### 2. 敏感資訊保護
- 不要在程式碼中硬編碼 API 金鑰
- 使用 GitHub Secrets 儲存敏感資訊
- 定期檢查程式碼中的敏感資訊

## 📞 支援與協助

如果您在部署過程中遇到問題：

1. 檢查 [GitHub Pages 官方文件](https://docs.github.com/en/pages)
2. 查看 [GitHub Actions 文件](https://docs.github.com/en/actions)
3. 在專案 Issues 中回報問題

---

🎉 **恭喜！** 您的免費認證課程網站現在已經成功部署到 GitHub Pages，並具備自動同步功能！
