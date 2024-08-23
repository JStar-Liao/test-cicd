echo -e "---------登录镜像容器服务--------"
# 登录镜像容器服务
docker login --username=$1 --password=$2
echo -e "---------停掉镜像--------"
# 停掉容器
docker stop cicd_v1
echo -e "---------删除本地容器和镜像--------"
# 删除本地容器
docker rm cicd_v1
# 删除本地镜像
docker rmi cicd:v1
echo -e "---------拉取镜像--------"
# 拉取镜像
docker pull cicd:v1
echo -e "---------创建容器并运行容器--------"
# -rm: docker会在容器退出时删除与它关联的数据卷
# -d: 后台运行容器，并返回容器ID
# -p: 端口映射，本机端口:容器端口
# --name: 指定容器名称
# 最后一个为镜像名称
docker run --rm -d -p 8080:80 --name cicd_v1 cicd:v1
echo -e "---------执行完毕--------"