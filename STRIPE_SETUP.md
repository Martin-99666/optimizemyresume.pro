# 💳 Stripe支付服务配置指南

## 步骤1: 注册Stripe账户

1. **访问Stripe官网**: https://stripe.com/
2. **注册账户**: 点击"Start now"创建账户
3. **验证邮箱**: 完成邮箱验证
4. **选择国家**: 选择您的业务所在国家

## 步骤2: 获取API密钥

### 测试模式密钥 (用于开发)

1. **登录Stripe控制台**: https://dashboard.stripe.com/
2. **确保处于测试模式**: 左侧切换开关应显示"测试数据"
3. **获取API密钥**:
   - 进入 "开发者" → "API密钥"
   - 复制 "可发布密钥" (pk_test_...)
   - 复制 "秘密密钥" (sk_test_...)

### 生产模式密钥 (用于正式运营)

1. **激活账户**: 完成Stripe账户验证
2. **切换到生产模式**: 关闭"测试数据"开关
3. **获取生产密钥**:
   - 可发布密钥 (pk_live_...)
   - 秘密密钥 (sk_live_...)

## 步骤3: 配置Webhook

Webhook用于接收支付状态更新：

1. **创建Webhook端点**:
   - 进入 "开发者" → "Webhooks"
   - 点击 "添加端点"
   - URL: `https://your-domain.com/api/payments/webhook`
   - 事件: 选择以下事件
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `customer.created`

2. **获取Webhook密钥**:
   - 点击创建的webhook
   - 复制 "签名密钥" (whsec_...)

## 步骤4: 更新环境配置

将以下信息添加到 `.env` 文件：

```bash
# Stripe测试配置
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# 生产环境时替换为:
# STRIPE_SECRET_KEY=sk_live_your_live_secret_key
# STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
```

## 步骤5: 前端支付集成

前端需要加载Stripe.js并创建支付表单：

```html
<!-- 在HTML中添加Stripe.js -->
<script src="https://js.stripe.com/v3/"></script>
```

## 测试支付

### 测试卡号
- **成功支付**: 4242 4242 4242 4242
- **需要验证**: 4000 0025 0000 3155
- **被拒绝**: 4000 0000 0000 0002

### 测试信息
- **过期日期**: 任何未来日期
- **CVC**: 任何3位数字
- **邮编**: 任何5位数字

## Stripe费用

### 测试模式
- 免费，无限制交易

### 生产模式
- 标准费率: 2.9% + ¥0.30 每笔成功交易
- 具体费率依据您的国家和业务类型

## 当前配置状态

🔧 **需要配置**: 
- Stripe账户注册
- API密钥获取
- Webhook设置

📝 **配置完成后运行**:
```bash
npm run test-stripe
```

## 安全注意事项

⚠️ **重要**: 
- 永远不要在前端暴露秘密密钥
- 使用HTTPS在生产环境
- 定期轮换API密钥
- 验证所有webhook请求

请完成Stripe账户注册并获取API密钥，然后告诉我，我会帮您完成集成！