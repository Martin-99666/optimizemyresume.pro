# 部署和运行指南

## 🚀 生产环境部署

### 前置要求
- Node.js 16+
- MongoDB数据库
- 邮件服务 (Gmail/SendGrid)
- Stripe账户
- HTTPS域名

### 部署步骤

#### 1. 服务器环境准备
```bash
# 安装Node.js和npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2 (进程管理器)
sudo npm install -g pm2

# 克隆项目
git clone your-repository-url
cd optimizemyresume.pro
```

#### 2. 后端部署
```bash
cd backend

# 安装依赖
npm install --production

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入生产环境配置

# 创建管理员用户
npm run setup

# 使用PM2启动应用
pm2 start server.js --name "optimizemyresume-api"
pm2 save
pm2 startup
```

#### 3. 前端部署
```bash
# 上传index.html到Web服务器
# 确保CORS配置正确指向后端API域名
```

#### 4. Nginx配置 (推荐)
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # 前端静态文件
    location / {
        root /var/www/optimizemyresume;
        index index.html;
        try_files $uri $uri/ =404;
    }
    
    # 后端API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 文件上传大小限制
    client_max_body_size 10M;
}
```

## 🔧 开发环境运行

### 快速开始
```bash
# 1. 安装依赖
cd backend && npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 3. 启动开发服务器
npm run dev

# 4. 在另一个终端测试服务
npm run test-email    # 测试邮件服务
npm run test-db       # 测试数据库连接
npm run test-stripe   # 测试支付服务
```

### 开发工具命令
```bash
# 查看所有可用命令
npm run

# 常用命令
npm start              # 生产模式启动
npm run dev           # 开发模式启动 (自动重启)
npm run setup         # 创建管理员用户
npm run diagnose      # 系统诊断
```

## 📊 监控和维护

### 日志管理
```bash
# PM2日志查看
pm2 logs optimizemyresume-api

# 实时日志
pm2 logs optimizemyresume-api --lines 100

# 重启应用
pm2 restart optimizemyresume-api
```

### 数据备份
```bash
# MongoDB备份
mongodump --uri="your-mongodb-uri" --out backup/

# 恢复数据
mongorestore --uri="your-mongodb-uri" backup/
```

### 安全检查清单
- [ ] 使用HTTPS
- [ ] 配置防火墙
- [ ] 设置MongoDB访问限制
- [ ] 定期更新依赖包
- [ ] 监控错误日志
- [ ] 备份数据库

## 🔍 故障排除

### 常见问题

#### 1. 邮件发送失败
```bash
# 检查邮件配置
npm run test-email

# 可能原因:
# - Gmail应用密码错误
# - 两步验证未启用
# - 网络连接问题
```

#### 2. 数据库连接失败
```bash
# 检查数据库连接
npm run test-db

# 可能原因:
# - IP未加入白名单
# - 连接字符串错误
# - 网络问题
```

#### 3. 支付处理错误
```bash
# 检查Stripe配置
npm run test-stripe

# 可能原因:
# - API密钥错误
# - Webhook配置问题
# - 网络连接问题
```

#### 4. 文件上传失败
```bash
# 检查uploads目录权限
ls -la uploads/

# 创建uploads目录
mkdir -p uploads
chmod 755 uploads
```

### 性能优化
- 使用CDN加速静态文件
- 启用gzip压缩
- 配置Redis缓存
- 数据库索引优化
- 监控内存使用

### 扩展建议
- 负载均衡 (多实例部署)
- 容器化部署 (Docker)
- 微服务架构
- 队列系统 (处理大量订单)
- 实时通知 (WebSocket)