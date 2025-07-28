# 安全设置指南 / Security Setup Guide

## 🔒 已实施的安全措施 / Implemented Security Measures

### 1. 环境变量保护 / Environment Variable Protection
- ✅ 敏感信息已从代码中移除
- ✅ 使用环境变量存储密码和API密钥
- ✅ `.env` 文件已添加到 `.gitignore`
- ✅ 创建了 `.env.example` 模板文件

### 2. MongoDB连接安全 / MongoDB Connection Security
- ✅ 用户名和密码使用 `encodeURIComponent()` 编码
- ✅ 支持灵活的连接方式（独立凭据或完整连接字符串）
- ✅ 连接失败时有适当的错误处理

### 3. 文件安全 / File Security
- ✅ 排除了安全敏感文件类型（.key, .pem, .p12, .pfx）
- ✅ 排除了配置文件中的机密信息

## ⚠️ 立即需要采取的行动 / Immediate Actions Required

### 1. 更改密码 / Change Passwords
**MongoDB Atlas:**
1. 登录 [MongoDB Atlas](https://cloud.mongodb.com/)
2. 进入 Database Access
3. 更改用户 `jiangbao00000` 的密码
4. 更新 `.env` 文件中的新密码

**Gmail 应用密码:**
1. 登录 [Google Account](https://myaccount.google.com/)
2. 进入 Security > 2-Step Verification > App passwords
3. 生成新的应用密码
4. 更新 `.env` 文件中的邮件凭据

### 2. 配置环境变量 / Configure Environment Variables

复制并编辑配置文件：
```bash
cd backend
cp .env.example .env
# 然后编辑 .env 文件，填入真实的凭据
```

**必需的配置项：**
```bash
# MongoDB 凭据
MONGODB_USERNAME=your_new_username
MONGODB_PASSWORD=your_new_password
MONGODB_CLUSTER=cluster0.zm8l0l0.mongodb.net

# 邮件配置
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_new_app_password

# 管理员账户
ADMIN_PASSWORD=your_secure_admin_password

# JWT 密钥（生成强随机字符串）
JWT_SECRET=your_jwt_secret_key_here

# Stripe 配置（从 Stripe 仪表板获取）
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 3. MongoDB Atlas 安全设置 / MongoDB Atlas Security Settings
1. **IP 白名单：** 只允许特定IP访问
2. **用户权限：** 使用最小权限原则
3. **连接加密：** 确保使用SSL/TLS连接

### 4. 验证安全设置 / Verify Security Setup
运行测试脚本确认配置正确：
```bash
cd backend
node scripts/testConnection.js
node scripts/testEmail.js
```

## 🛡️ 额外安全建议 / Additional Security Recommendations

### 生产环境 / Production Environment
1. **使用强密码策略**
2. **定期轮换凭据**
3. **启用监控和日志记录**
4. **使用防火墙规则**
5. **定期安全审计**

### 开发环境 / Development Environment
1. **不要在开发中使用生产凭据**
2. **使用不同的数据库实例**
3. **定期更新依赖包**

## 📋 安全检查清单 / Security Checklist

- [ ] MongoDB 密码已更改
- [ ] Gmail 应用密码已更新
- [ ] `.env` 文件已正确配置
- [ ] 管理员密码已设置为强密码
- [ ] JWT 密钥已生成（32+ 字符随机字符串）
- [ ] Stripe 密钥已配置
- [ ] IP 白名单已在 MongoDB Atlas 中设置
- [ ] 连接测试通过
- [ ] 邮件测试通过

## 🆘 紧急情况 / Emergency Procedures

如果怀疑凭据泄露：
1. 立即更改所有密码
2. 检查 MongoDB Atlas 访问日志
3. 检查 Stripe 仪表板中的可疑活动
4. 更新所有环境变量
5. 重新部署应用程序

## 📞 支持联系 / Support Contact

如需帮助，请联系：admin@optimizemyresume.pro