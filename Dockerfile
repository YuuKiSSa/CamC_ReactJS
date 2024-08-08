# 第一步：构建 React 应用
FROM node:18 AS build

# 设置工作目录
WORKDIR /app

# 拷贝 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝其余的应用程序代码
COPY . .

# 构建生产版本的应用
RUN npm run build

# 第二步：使用 Nginx 提供应用
FROM nginx:alpine

# 拷贝构建好的应用到 Nginx 的默认静态文件目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 Nginx 服务的端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]