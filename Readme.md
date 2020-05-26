# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli
# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli
# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli


# 值得一提的是，如果安装过程出现sass相关的安装错误，请在安装mirror-config-china后重试。

$ npm install -g mirror-config-china


# 这样做的好处是全局的 Taro 版本还是 1.x 的，多个项目间的依赖不冲突，其余项目依然可以用旧版本开发。 如果你的项目里没有安装 Taro CLI，你需要先装一个：

Copy
# 如果你使用 NPM

$ npm install --save-dev @tarojs/cli@2.0.0

# 如果你使用 Yarn

$ yarn add -D @tarojs/cli@2.0.0
然后在你的项目目录里运行以下命令来升级依赖：

# 如果你使用 NPM

$ node ./node_modules/.bin/taro update project 2.0.0

# 如果你使用 Yarn

$ yarn taro update project 2.0.0