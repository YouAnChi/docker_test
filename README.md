# 前后端分离项目

这是一个使用Go语言（后端）和HTML/CSS/JavaScript（前端）构建的前后端分离项目。项目使用Docker进行容器化部署。

## 项目结构

```
.
├── README.md
├── frontend/           # 前端项目目录
│   ├── Dockerfile     # 前端Docker配置文件
│   ├── index.html     # 主页面
│   ├── css/          # CSS样式文件
│   └── js/           # JavaScript文件
├── backend/           # 后端项目目录
│   ├── Dockerfile     # 后端Docker配置文件
│   ├── main.go        # 主程序入口
│   ├── go.mod        # Go模块文件
│   └── go.sum        # Go依赖版本锁定文件
└── docker-compose.yml # Docker编排配置文件
```

## 技术栈

- 后端：
  - Go语言
  - Gin Web框架
  - RESTful API

- 前端：
  - HTML5
  - CSS3
  - JavaScript

## 开发环境要求

- Go 1.16+
- Docker
- Docker Compose

## 本地开发和测试

1. 克隆项目到本地

2. 启动后端服务
   ```bash
   cd backend
   go mod tidy  # 安装依赖
   go run main.go  # 启动服务
   ```
   后端服务将在 http://localhost:8080 运行

   可以通过以下命令测试后端API是否正常运行：
   ```bash
   # 测试健康检查接口
   curl http://localhost:8080/api/health
   # 预期输出：{"status":"ok"}

   # 获取数据列表
   curl http://localhost:8080/api/data
   # 预期输出：[]

   # 添加测试数据
   curl -X POST -H "Content-Type: application/json" -d '{"data":"测试数据"}' http://localhost:8080/api/data
   # 预期输出：{"message":"数据添加成功"}
   ```

3. 启动前端服务
   ```bash
   cd frontend
   # 可以使用任何静态文件服务器运行前端项目
   # 例如使用Python的简单HTTP服务器
   python3 -m http.server 3000
   ```
   前端页面将在 http://localhost:3000 运行

4. 测试前后端交互
   - 打开浏览器访问 http://localhost:3000
   - 在输入框中输入一些测试数据并点击提交
   - 点击"刷新数据"按钮，确认数据是否正确显示
   - 检查浏览器控制台，确保没有CORS或其他错误

## Docker部署

1. 构建并启动服务
   ```bash
   docker-compose up --build
   ```

2. 访问服务
   - 前端页面：http://localhost:3000
   - 后端API：http://localhost:8080

3. 停止服务
   ```bash
   docker-compose down
   ```

## API文档

### 示例API端点

- GET /api/health - 健康检查
- GET /api/data - 获取数据
- POST /api/data - 创建数据

具体API文档将根据实际业务需求进行补充。

## 注意事项

1. 确保Docker和Docker Compose已正确安装
2. 开发时注意CORS配置
3. 生产环境部署时建议配置反向代理

## 许可证

MIT License