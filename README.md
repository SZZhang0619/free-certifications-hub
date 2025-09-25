# 🎓 免費認證課程大全

> 精選全球最優質的免費認證課程，涵蓋雲端運算、網路安全、資料庫管理、專案管理、數位行銷等熱門領域

[![Deploy to GitHub Pages](https://github.com/SZZhang0619/free-certifications-hub/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/SZZhang0619/free-certifications-hub/actions/workflows/deploy.yml)
[![Sync Free Certifications Data](https://github.com/SZZhang0619/free-certifications-hub/actions/workflows/sync-data.yml/badge.svg?branch=main)](https://github.com/SZZhang0619/free-certifications-hub/actions/workflows/sync-data.yml)

## 🌟 專案特色

### 🎨 豐富的視覺效果
- **Three.js** - 3D 幾何體背景動畫
- **p5.js** - 創意粒子動畫系統
- **Particles.js** - 粒子連線網絡背景
- **Rellax.js** - 視差滾動效果
- **Vanta.js** - 動態波浪背景

### 🚀 現代化功能
- **響應式設計** - 完美適配各種螢幕尺寸
- **智能搜尋** - 快速找到所需認證課程
- **分類瀏覽** - 五大主要領域分類
- **自動同步** - 每週自動更新最新課程資料
- **GitHub Pages** - 免費託管部署

### 📊 豐富內容
- **100+ 免費課程** - 涵蓋各大知名機構
- **5 大領域** - 綜合技術、網路安全、資料庫、專案管理、數位行銷
- **即時更新** - 自動同步最新認證資訊
- **直接連結** - 一鍵跳轉到官方認證頁面

## 🛠️ 技術棧

### 前端框架
- **React 19** - 現代化前端框架
- **Vite** - 快速建構工具
- **Tailwind CSS** - 實用優先的 CSS 框架

### UI 組件
- **shadcn/ui** - 高品質 React 組件庫
- **Lucide React** - 美觀的圖標庫
- **Radix UI** - 無障礙的原始組件

### 視覺效果庫
- **Three.js** - 3D 圖形庫
- **p5.js** - 創意編程庫
- **Particles.js** - 粒子效果庫
- **Rellax.js** - 視差滾動庫
- **Vanta.js** - 動態背景效果庫

### 部署與自動化
- **GitHub Actions** - CI/CD 自動化
- **GitHub Pages** - 免費靜態網站託管
- **npm** - Node.js 套件管理器

## 🚀 快速開始

### 1. 克隆專案
```bash
git clone https://github.com/SZZhang0619/free-certifications-hub.git
cd free-certifications-hub
```

### 2. 安裝相依套件
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 3. 啟動開發伺服器
```bash
npm run dev
```

### 4. 建構生產版本
```bash
npm run build
```

### 5. 預覽生產版本
```bash
npm run preview
```

## 📁 專案結構

```
free-certifications-hub/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Pages 部署工作流程
│       └── sync-data.yml       # 資料同步工作流程
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   └── Free-Certifications.md  # 認證課程原始資料
│   ├── components/
│   │   └── ui/                 # shadcn/ui 組件
│   ├── App.jsx                 # 主要應用程式組件
│   ├── App.css                 # 樣式檔案
│   └── main.jsx               # 應用程式入口點
├── DEPLOYMENT.md              # 部署指南
├── README.md                  # 專案說明
├── package.json               # 套件配置
├── vite.config.js            # Vite 配置
└── tailwind.config.js        # Tailwind CSS 配置
```

## 🔄 自動同步功能

專案配置了自動同步功能，每週日會自動：

1. 📥 從 [cloudcommunity/Free-Certifications](https://github.com/cloudcommunity/Free-Certifications) 下載最新資料
2. 🔍 檢查資料是否有變更
3. 📝 更新 `src/assets/Free-Certifications.md`
4. 🏗️ 重新建構專案
5. 🚀 自動部署到 GitHub Pages

## 📋 部署指南

詳細的部署說明請參考 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署到 GitHub Pages

1. Fork 此專案到您的 GitHub 帳號
2. 在 Settings > Pages 中啟用 GitHub Actions
3. 修改 `vite.config.js` 中的倉庫名稱
4. 推送程式碼，自動部署完成！

## 🎯 認證課程分類

### 🔧 綜合技術
- GitLab、Oracle、AWS、機器學習等

### 🛡️ 網路安全  
- Cisco、ISC²、Fortinet 等安全認證

### 🗄️ 資料庫
- MongoDB、Redis、Neo4j 等資料庫技術

### 📊 專案管理
- Scrum、六標準差等管理方法論

### 📈 數位行銷
- Google、Microsoft、Meta 等行銷認證

## 🤝 貢獻指南

歡迎貢獻！請遵循以下步驟：

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- [Cloud Community Free Certifications](https://github.com/cloudcommunity/Free-Certifications) - 提供豐富的免費認證課程資料
- [shadcn/ui](https://ui.shadcn.com/) - 優秀的 React 組件庫
- [Three.js](https://threejs.org/) - 強大的 3D 圖形庫
- [p5.js](https://p5js.org/) - 創意編程工具
- 所有提供免費認證課程的機構和組織

## 📞 聯絡資訊

如有問題或建議，請：
- 開啟 [Issue](https://github.com/SZZhang0619/free-certifications-hub/issues)
- 提交 [Pull Request](https://github.com/SZZhang0619/free-certifications-hub/pulls)

---

⭐ 如果這個專案對您有幫助，請給我們一個星星！

🌐 **線上預覽：** https://SZZhang0619.github.io/free-certifications-hub/
