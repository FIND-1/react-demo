/**
   CSS Modules是什么？
     * 一种样式管理方案，默认启用 “局部作用域”，避免样式在不同组件之间产生冲突。
     * 在构建时，类名会被编译为唯一的哈希值，保证样式隔离。
     (这点和Vue scoped并不一样 ,详见: 2_CssDifferent.tsx)

   怎么使用？
     1 :安装 三个 css 预处理器选一个:
      * npm install less -D   (搭配用 Ant Design)
      * npm install sass -D   (推荐)
      * npm install stylus -D
      2 : 在Vite中css Modules 是开箱即用的，只需要把文件名设置为:
          xxx.module.[css|less|sass|stylus] 即可

   文件命名约定:
      * 语义化命名: ComponentName.module.[css|less|sass|stylus]    (推荐)
      * 工具类模块:  utils.module.[css|less|sass|stylus]
      * 主题样式 : theme.module.[css|less|sass|stylus]

   原理解析：
      * 构建时编译技术（Build-time Transformation），通过构建工具（如 Webpack、Vite）,
      * 在打包阶段将 CSS 类名自动重命名为全局唯一的标识符，从而实现样式隔离。
      * 也就是: 局部作用域（Local Scope） + 类名哈希化

   核心特性：
      * 局部作用域：CSS 类名仅在当前组件生效。
      * 避免命名冲突：同名类会自动编译为不同的哈希值。
      * 样式复用：通过 `composes` 可以从其他样式中继承规则。
      * 全局支持：通过 `:global` 声明全局样式。

  使用建议:
      * composes：样式组合（推荐使用):
        语法: composes: button-base from './theme.module.scss(继承的模块路径)';
      * :global ：全局样式（仅用于第三方库或需要穿透的场景，避免滥用）
        语法: :global(.className){} / :global { .className {} }

 */


//使用方法，直接引入即可
import styles from './Card.module.scss';
import React from "react";
interface CardProps {
    name: string;
    age: number;
    avatar: string;
}
const AddCssCard: React.FC<CardProps> = ({ name, age, avatar }) => {
    return (
        <div className={styles.card}>
            <header className={styles.header}>
                <div>{name}</div>
                <div>{age}岁</div>
            </header>
            <section className={styles.content}>
                <img src={avatar} alt={name} width={40} height={40} style={{ borderRadius: '50%' }} />
                <div>用户信息卡片</div>
            </section>
        </div>
    );
};
export default AddCssCard;
