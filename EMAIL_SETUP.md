# 📧 邮件服务配置指南

## 选项1: Gmail配置 (推荐用于开发测试)

### 步骤1: 启用两步验证
1. 登录您的Gmail账户
2. 进入 Google账户设置 (https://myaccount.google.com/)
3. 选择"安全性"
4. 启用"两步验证"

### 步骤2: 生成应用密码
1. 在"安全性"页面中找到"应用密码"
2. 选择"邮件"应用
3. 选择设备类型
4. 生成16位应用密码 (例如: abcd efgh ijkl mnop)

### 步骤3: 更新.env文件
```bash
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # 应用密码，不是普通密码
```

## 选项2: SendGrid配置 (推荐用于生产环境)

### 步骤1: 注册SendGrid
1. 访问 https://sendgrid.com/
2. 注册免费账户 (每天可发送100封邮件)

### 步骤2: 创建API密钥
1. 登录SendGrid控制台
2. 进入 Settings → API Keys
3. 创建新的API密钥
4. 复制API密钥

### 步骤3: 更新.env文件
```bash
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASS=SG.your_sendgrid_api_key_here
```

## 选项3: 其他SMTP服务

支持任何SMTP服务，例如：
- Outlook/Hotmail
- 腾讯企业邮箱
- 阿里云邮件服务
- 自建SMTP服务器

### 配置示例:
```bash
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@your-domain.com
EMAIL_PASS=your_password
```

## 测试邮件服务

配置完成后，我们可以运行测试脚本验证邮件功能：

```bash
npm run test-email
```

## 当前状态

🔧 **需要配置**: 请选择一种邮件服务并提供相应信息
📝 **建议**: 先使用Gmail进行开发测试，后续可以升级到SendGrid

请告诉我您选择哪种邮件服务，我会帮您完成配置！