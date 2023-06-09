//dotenv下的config函数
// 用换行符 分割
// 比如
/**
 * NAME=若川
 * AGE=18
 * MP_WEIXIN=若川视野
 * BLOG=https://lxchuan12.gitee.io
 * ACTIVITY=每周一起学200行左右的源码共读活动
 * WEIXIN=
 */
const fs = require('fs');
const path = require('path');

const parse = function parse(src) {
  const obj = {};
  src
    .toString()
    .split('\n')
    .forEach(function (line, index) {
      const keyValueArr = line.split('='); // 用等号分割
      key = keyValueArr[0]; // NAME
      val = keyValueArr[1] || ''; // 若川
      obj[key] = val;
    });
  // { NAME: '若川', ... }
  return obj;
};

const config = function () {
  // 读取 node 执行的当前路径下的 .env 文件
  let dotenvPath = path.resolve(process.cwd(), '.env');
  // 按 utf-8 解析文件，得到对象
  // { NAME: '若川', ... }
  const parsed = parse(fs.readFileSync(dotenvPath, 'utf-8'));

  // 键值对形式赋值到 process.env 变量上，原先存在的不赋值
  Object.keys(parsed).forEach(function (key) {
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = parsed[key];
    }
  });

  // 返回对象
  return parsed;
};

console.log(config());
console.log(process.env);

// 导出 config parse 函数
module.exports.config = config;
module.exports.parse = parse;

/* 
  解读：----分割线------
   path.resolve总是返回一个以相对于当前的工作目录的绝对路径。
   path.resolve('foo/bar', './baz');==returns 'foo/bar/baz'
  
  process.cwd()与__dirname
  process.cwd() 是当前Node.js进程执行时的文件夹地址，项目根文件的地址，是一个绝对路径
  __dirname 是被执行的js 文件的地址 ——文件所在目录
  __dirname: 当前模块的目录名。 等同于 __filename 的 path.dirname()。__dirname 实际上不是一个全局变量，而是每个模块内部的。


  如果需要使用变量，需要配合如下扩展包使用。
  
  .env 文件在我们项目中非常常见，在 vue-cli 和 create-react-app 中都有使用。
  
  vue-cli .env[5]
  
  create-react-app .env[6]
 */
