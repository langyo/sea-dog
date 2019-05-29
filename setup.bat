echo 请稍等，已开始安装
git pull --force
echo 正在准备 client
cd client
npm i
cd ..
echo 正在准备 server
cd server
npm i
cd ..
echo 安装完成
echo TIP： 如果在安装完成后想启动服务，可分别运行 client_serve.cmd 与 serve.serve.cmd！
pause