import React from "react";
import styles from './resume.scss'

const Resume: React.FC = () => {
    return (
        <div className={styles['resume']}>
            <div className={styles['container']}>
                <div className={styles['title']}>个人信息</div>
                <div className={styles['line']}>
                    姓名:<span style={{marginRight: '20px'}}>陈沪</span>
                    年龄:<span>23</span>
                </div>
                <div className={styles['line']}>
                    手机号:<span style={{marginRight: '40px'}}>15671163516</span>
                    邮箱:<span>2865334798@qq.com</span>
                </div>

                <div className={styles['title']}>
                    教育经历
                </div>
                <div className={styles['line']}>
                    <span style={{marginLeft: '0'}}>中南民族大学</span>
                    <span>软件工程</span>
                    <span>2016.09.01-2020.06.30</span>
                </div>

                <div className={styles['title']}>个人技能</div>
                <div className={styles['line']}>1.框架:React，Vue</div>
                <div className={styles['line']}>2.语言:TypeScript，JS[ES6规范],自己更喜欢用TypeScript开发项目</div>
                <div className={styles['line']}>3.构建工具:Webpack，熟悉webpack的基本配置，写过webpack插件</div>
                <div className={styles['line']}>4.CSS扩展语言:主要用Scss，Less也会</div>
                <div className={styles['line']}>5.测试:主要使用Jest做单元测试</div>
                <div className={styles['line']}>6.UI组件库:Element-ui，Antd,uView，也用过React+TS+Hooks开发过UI组件库</div>
                <div className={styles['line']}>7.状态管理:Vuex，React-Redux</div>
                <div className={styles['line']}>8.路由库:Vue-Router，React-Router</div>
                <div className={styles['line']}>9.其他库:echarts，ucharts，highlight.js，Vant等</div>

                <div className={styles['title']}>工作经历</div>
                <div className={styles['item']}>
                    <div>武汉易融宝信息服务有限公司 <span>2020.11.30-2021.08.13</span></div>
                    <div>负责公司的前端开发，主要业务是微信小程序，后台管理等</div>
                </div>
                <div className={styles['title']}>项目经历</div>
                <div className={styles['item']}>
                    <div>绿萝爱团【微信小程序】 <span>2020.12.01-2021.05-30</span></div>
                    <div>微信小程序平台团购秒杀商城，技术栈使用Uni-app+Vue2+Scss+uView，主要功能和技术如下：</div>
                    <div>1.使用Flex，Grid布局构建页面，使用Axios库获取后台接口数据</div>
                    <div>2.使用骨架屏和loading组件设置加载页面，优化用户体验</div>
                    <div>3.使用uView组件库快速构建页面和实现功能,如下拉刷新，上拉加载等功能</div>
                    <div>4.使用Vuex和localStorage缓存一些全局信息，如用户登录信息等</div>
                </div>
                <div className={styles['item']}>
                    <div>绿萝爱团后台管理 <span>2021.06.01-2021.07.10</span></div>
                    <div>后台管理系统，技术栈使用Vue2+Vue-Router+Vuex+Element+Scss，主要功能和技术如下：</div>
                    <div>1.基于Vue-admin-template的二次改写</div>
                    <div>2.Element-ui组件库快速构建页面，如Table组件，弹窗组件等</div>
                    <div>3.根据Axios二次封装请求，实现请求拦截和响应拦截</div>
                    <div>4.将一些库如Vue,Vuex,从bundle中抽取出来并放到CDN上，减小打包体积，加快响应速度</div>
                    <div>5.基于Vue-Router使用路由懒加载，优化前端性能</div>
                    <div>6.编写图片懒加载组件，优化前端性能</div>
                </div>

                <div className={styles['title']}>个人评价</div>
                <div className={styles['line']}>
                    喜欢造轮子，业余时间也会学习一下算法，React组件库代码：https://gitee.com/uhnehc/react-ui
                </div>

            </div>
        </div>
    )
}

export default Resume