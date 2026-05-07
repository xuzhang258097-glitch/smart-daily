# Smart Daily · 智阅每日 — 部署指南

## 方案：GitHub Pages（推荐）

**优势**：
- ✅ 完全免费，永久在线
- ✅ 自动 HTTPS（https://你的用户名.github.io/smart-daily）
- ✅ 手机端、电脑端都能访问
- ✅ 支持自定义域名（可选）
- ✅ 每天自动更新课后时间数据

---

## 部署步骤（只需操作一次）

### 第 1 步：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名称填 `smart-daily`
3. 选择 **Public**（公开，免费部署）
4. 点击 **Create repository**

### 第 2 步：上传代码

在 `smart-daily` 文件夹中打开终端，执行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/smart-daily.git
git push -u origin main
```

> 如果没有安装 Git，也可以直接把文件夹内容拖拽到 GitHub 网页上传。

### 第 3 步：开启 GitHub Pages

1. 进入仓库页面 → 点击 **Settings**
2. 左侧菜单选择 **Pages**
3. **Source** 选择 **GitHub Actions**
4. 完成！

### 第 4 步：等待首次部署

- 点击仓库顶部的 **Actions** 标签
- 等待工作流运行完成（约 1-2 分钟）
- 完成后，访问 `https://你的用户名.github.io/smart-daily`

---

## 自动更新说明

- **每天上午 10:00（北京时间）**，GitHub Actions 会自动运行更新脚本
- 获取 B 站热门视频 + 小宇宙热门播客最新数据
- 自动提交并重新部署网站
- 你也可以随时手动触发：进入 Actions → 点击 **Update Leisure Data & Deploy** → **Run workflow**

---

## 自定义域名（可选）

如果想用自己的域名（如 `daily.yourdomain.com`）：

1. 在 `smart-daily` 文件夹创建 `CNAME` 文件，内容写你的域名
2. 在你的域名 DNS 添加 CNAME 记录指向 `你的用户名.github.io`
3. 在 GitHub Pages 设置中填入自定义域名

---

## 访问地址

| 环境 | 地址 |
|------|------|
| 默认 | `https://你的用户名.github.io/smart-daily` |
| 自定义域名 | `https://你的域名`（如配置） |

手机、电脑、平板均可直接访问，无需任何客户端。
