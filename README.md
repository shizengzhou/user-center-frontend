# User Center

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

## Docker

### build

```bash
sudo docker build -t user-center-frontend:v0.0.1 .
```

### 运行

```bash
sudo docker run -p 80:80 -d user-center-frontend:v0.0.1
```

### 查看日志

```bash
sudo docker logs 容器ID -f
```

### 进入容器

```bash
sudo docker exec -i -t 容器ID /bin/bash
```

### 强制删除镜像

```bash
sudo docker rmi -f
```

## 代理

nginx 配置

```conf
location ^~ /api {
  proxy_pass http://127.0.0.1:8080/api;
  proxy_set_header Origin '';
  add_header Access-Control-Allow-Credentials true;
  add_header Access-Control-Allow-Headers $http_access_control_request_headers;
  add_header Access-Control-Allow-Methods POST,GET,OPTIONS,DELETE,PUT,HEAD,PATCH;
  add_header Access-Control-Allow-Origin $http_origin;
  add_header Access-Control-Expose-Headers $http_access_control_request_headers;

  if ($request_method = 'OPTIONS') {
    return 204;
  }
}
```
