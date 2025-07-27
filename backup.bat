@echo off
echo 🎯 OptimizeMyResume.pro - 项目备份脚本
echo =====================================

set BACKUP_DIR=optimizemyresume-backup-%date:~0,4%%date:~5,2%%date:~8,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set BACKUP_DIR=%BACKUP_DIR: =0%

echo 📦 创建备份目录: %BACKUP_DIR%
mkdir "%BACKUP_DIR%"

echo 📋 复制项目文件...

REM 复制主要文件
copy "index.html" "%BACKUP_DIR%\"
copy "CNAME" "%BACKUP_DIR%\"
copy "*.md" "%BACKUP_DIR%\"
copy "setup.*" "%BACKUP_DIR%\"

REM 复制后端目录 (排除node_modules)
echo 📁 复制后端代码...
robocopy "backend" "%BACKUP_DIR%\backend" /E /XD node_modules uploads

REM 创建重要说明文件
echo 📝 创建备份说明...
echo # OptimizeMyResume.pro 备份 > "%BACKUP_DIR%\BACKUP_INFO.txt"
echo. >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo 备份时间: %date% %time% >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo. >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo ## 恢复步骤: >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo 1. 解压备份文件 >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo 2. cd backend >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo 3. npm install >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo 4. 配置 .env 文件 >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo 5. npm run dev >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo. >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo ## 当前状态: >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo - 邮件服务: 已配置 (Gmail) >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo - 数据库: MongoDB Atlas (需要IP白名单) >> "%BACKUP_DIR%\BACKUP_INFO.txt"
echo - 支付: Stripe框架完成 (需要API密钥) >> "%BACKUP_DIR%\BACKUP_INFO.txt"

echo.
echo ✅ 备份完成！
echo 📁 备份位置: %BACKUP_DIR%
echo.
echo 💡 下一步:
echo    1. 将备份文件夹压缩保存
echo    2. 上传到Git仓库或云存储
echo    3. 配置剩余服务 (MongoDB, Stripe)
echo.
pause