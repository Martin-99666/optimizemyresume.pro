#!/bin/bash

echo "🎯 OptimizeMyResume.pro - 项目备份脚本"
echo "====================================="

# 创建时间戳
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="optimizemyresume-backup-$TIMESTAMP"

echo "📦 创建备份目录: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

echo "📋 复制项目文件..."

# 复制主要文件
cp index.html "$BACKUP_DIR/"
cp CNAME "$BACKUP_DIR/"
cp *.md "$BACKUP_DIR/"
cp setup.* "$BACKUP_DIR/"

# 复制后端目录 (排除node_modules和uploads)
echo "📁 复制后端代码..."
rsync -av --exclude='node_modules' --exclude='uploads' backend/ "$BACKUP_DIR/backend/"

# 创建重要说明文件
echo "📝 创建备份说明..."
cat > "$BACKUP_DIR/BACKUP_INFO.txt" << EOF
# OptimizeMyResume.pro 备份

备份时间: $(date)

## 恢复步骤:
1. 解压备份文件
2. cd backend
3. npm install
4. 配置 .env 文件
5. npm run dev

## 当前状态:
- 邮件服务: 已配置 (Gmail)
- 数据库: MongoDB Atlas (需要IP白名单)
- 支付: Stripe框架完成 (需要API密钥)

## 重要文件说明:
- index.html: 主网站文件
- backend/: 完整后端系统
- *.md: 配置和文档文件
- .env.example: 环境变量模板

## 已完成功能:
✅ 完整的订单管理系统
✅ 文件上传和处理
✅ 邮件通知系统 (已测试)
✅ 支付处理框架
✅ 管理员面板
✅ 安全认证系统

## 待配置服务:
⚠️ MongoDB Atlas IP白名单
⚠️ Stripe API密钥配置
EOF

echo ""
echo "✅ 备份完成！"
echo "📁 备份位置: $BACKUP_DIR"
echo ""
echo "💡 下一步:"
echo "   1. 压缩备份文件夹: tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR"
echo "   2. 上传到Git仓库或云存储"
echo "   3. 配置剩余服务 (MongoDB, Stripe)"
echo ""

# 可选: 自动压缩
read -p "是否现在压缩备份? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗜️ 压缩备份文件..."
    tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"
    echo "✅ 压缩完成: $BACKUP_DIR.tar.gz"
    
    # 可选: 删除原文件夹
    read -p "删除原备份文件夹? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$BACKUP_DIR"
        echo "🗑️ 原备份文件夹已删除"
    fi
fi

echo "🎉 备份流程完成！"