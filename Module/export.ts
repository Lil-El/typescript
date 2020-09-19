//若要导入一个使用了export =的模块时，必须使用TypeScript提供的特定语法import module = require("module")。
export = ZipCodeValidator;

import zip = require("./ZipCodeValidator");

/**
 * 为了编译，我们必需要在命令行上指定一个模块目标。对于Node.js来说，使用--module commonjs； 对于Require.js来说，使用``–module amd`。比如：
    tsc --module commonjs Test.ts
    编译完成后，每个模块会生成一个单独的.js文件
 */
