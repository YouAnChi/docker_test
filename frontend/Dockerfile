FROM nginx:alpine

# 删除默认的nginx静态文件
RUN rm -rf /usr/share/nginx/html/*

# 复制前端文件到nginx服务器目录
COPY . /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]