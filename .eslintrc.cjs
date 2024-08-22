module.exports = {
    "env": { // 执行环境
        "browser": true,
        "es2021": true
    },
    "globals": { // 定义全局变量，避过no-undef
        "process": true
    },
    "extends": [// 已有配置拓展
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        "./.eslintrc-auto-import.json"
    ],
    "parser": "vue-eslint-parser", // 指定eslint语法解析器
    "parserOptions": { // 解析器选项
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [ // 第三方插件
        "vue",
        "@typescript-eslint"
    ],
    "rules": {// 规则
        "@typescript-eslint/ban-types": [
            "error",
            {
                "extendDefaults": true,
                "types": {
                    "{}": false
                }
            }
        ],
        "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": 2, //函数参数不能重复
        "no-multiple-empty-lines": [1, { "max": 1 }], //空行最多不能超过2行   
        "no-sparse-arrays": 2, //禁止稀疏数组， [1,,2]
        "no-undef": 1, //不能有未定义的变量
        "no-use-before-define": 0, //未定义前不能使用
        "no-useless-call": 2, //禁止不必要的call和apply
        "no-var": 1, //禁用var，用let和const代替
        "default-case": 2, //switch语句最后必须有default
        "indent": [2, 2], //缩进风格
        "space-after-keywords": [0, "always"], //关键字后面是否要空一格
        "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        "space-before-function-paren": 1,
        "space-before-blocks": 2, // if function等的大括号之前需要有空格
        "no-irregular-whitespace": 2, //不规则的空白不允许
        "no-trailing-spaces": 2, //一行结束后面有空格就发出警告
        "space-infix-ops": 2,
        "array-bracket-spacing": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "arrow-parens": ["error", "always"],
        "spaced-comment": 2,//注释风格要不要有空格什么的
        "semi": [2, "never"],
        "quotes": [1, 'single']
    }
}
