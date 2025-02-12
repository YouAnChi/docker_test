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
   后端服务将在 http://localhost:8081 运行

   可以通过以下命令测试后端API是否正常运行：
   ```bash
   # 测试健康检查接口
   curl http://localhost:8081/api/health
   # 预期输出：{"status":"ok"}

   # 获取数据列表
   curl http://localhost:8081/api/data
   # 预期输出：[]

   # 添加测试数据
   curl -X POST -H "Content-Type: application/json" -d '{"data":"测试数据"}' http://localhost:8081/api/data
   # 预期输出：{"message":"数据添加成功"}
   ```

3. 启动前端服务
   ```bash
   cd frontend
   # 可以使用任何静态文件服务器运行前端项目
   # 例如使用Python的简单HTTP服务器
   python3 -m http.server 3001
   ```
   前端页面将在 http://localhost:3001 运行

4. 测试前后端交互
   - 打开浏览器访问 http://localhost:3001
   - 在输入框中输入一些测试数据并点击提交
   - 点击"刷新数据"按钮，确认数据是否正确显示
   - 检查浏览器控制台，确保没有CORS或其他错误

## Docker部署

### 使用Docker Compose（推荐）

1. 构建并启动服务
   ```bash
   # 构建镜像并在后台启动服务
   docker-compose up --build -d

   # 查看服务状态
   docker-compose ps
   ```

2. 访问服务
   - 前端页面：http://localhost:3001
   - 后端API：http://localhost:8081

3. 查看服务日志
   ```bash
   # 查看所有服务的日志
   docker-compose logs

   # 查看特定服务的日志（例如后端服务）
   docker-compose logs backend
   ```

4. 停止服务
   ```bash
   # 停止并移除容器
   docker-compose down

   # 停止并移除容器及镜像
   docker-compose down --rmi all
   ```

### 单独构建和运行Docker镜像

1. 构建后端镜像
   ```bash
   cd backend
   docker build -t myapp-backend .
   ```

2. 构建前端镜像
   ```bash
   cd frontend
   docker build -t myapp-frontend .
   ```

3. 运行容器
   ```bash
   # 运行后端容器
   docker run -d -p 8081:8080 --name myapp-backend myapp-backend

   # 运行前端容器
   docker run -d -p 3001:80 --name myapp-frontend myapp-frontend
   ```

4. 管理容器
   ```bash
   # 查看运行中的容器
   docker ps

   # 停止容器
   docker stop myapp-frontend myapp-backend

   # 移除容器
   docker rm myapp-frontend myapp-backend

   # 查看容器日志
   docker logs myapp-backend
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

## 迁移部署

如果要在其他安装了Docker的机器上运行本项目，可以按照以下步骤操作：

1. 在源机器上导出镜像
   ```bash
   # 保存前端镜像
   docker save myapp-frontend > myapp-frontend.tar
   # 保存后端镜像
   docker save myapp-backend > myapp-backend.tar
   ```

2. 将导出的镜像文件传输到目标机器
   - 可以使用scp、U盘等方式将 myapp-frontend.tar 和 myapp-backend.tar 传输到目标机器

3. 在目标机器上加载镜像
   ```bash
   # 加载前端镜像
   docker load < myapp-frontend.tar
   # 加载后端镜像
   docker load < myapp-backend.tar
   ```

4. 确认镜像已成功加载
   ```bash
   # 查看已加载的镜像
   docker images | grep myapp
   ```

5. 运行容器
   ```bash
   # 创建自定义网络（可选，用于容器间通信）
   docker network create myapp-network

   # 运行后端容器
   docker run -d \
     --name myapp-backend \
     --network myapp-network \
     -p 8080:8080 \
     myapp-backend

   # 运行前端容器
   docker run -d \
     --name myapp-frontend \
     --network myapp-network \
     -p 3000:80 \
     myapp-frontend
   ```

6. 验证服务是否正常运行
   - 访问前端页面：http://localhost:3000
   - 测试后端API：http://localhost:8080/api/health

7. 常用维护命令
   ```bash
   # 查看容器运行状态
   docker ps

   # 查看容器日志
   docker logs myapp-frontend
   docker logs myapp-backend

   # 停止服务
   docker stop myapp-frontend myapp-backend

   # 启动服务
   docker start myapp-frontend myapp-backend

   # 完全清理（如果需要重新部署）
   docker stop myapp-frontend myapp-backend
   docker rm myapp-frontend myapp-backend
   docker network rm myapp-network
   ```

## 许可证

MIT License