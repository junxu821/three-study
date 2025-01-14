export default {
    extends: ['@commitlint/config-conventional'], // 直接引入配置好的一个库，免得自己要一个一个定义
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'build', // 编译相关修改（新版本发布）
                'feat', // 新功能
                'fix', // 修复bug
                'update', // 更新某功能
                'refactor', // 重构
                'docs', // 文档
                'chore', // 增加依赖或库
                'style', // 格式（不影响代码变动）
                'revert', // 撤销commit 回滚上一版本
                'perf' // 性能优化
            ]
        ],
        'scope-case': [0]
    },
    plugins: [
        {
            rules: {
                'commit-rule': ({ raw }) => {
                    return [
                        /^\[(build|feat|fix|update|refactor|docs|chore|style|revert|perf)].+/g.test(
                            raw
                        ),
                        `commit备注信息格式错误，格式为 <[type] 修改内容>，type支持`
                    ];
                }
            }
        }
    ]
};
