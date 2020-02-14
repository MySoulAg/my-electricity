const Home = () => import('@/views/home/Index.vue') //主页
const Welcome = () => import('@/views/home/Welcome.vue') //Welcome

const Users = () => import('@/views/users/Index.vue') //用户

const Roles = () => import('@/views/permissionsMgt/Roles.vue') //角色列表
const Rights = () => import('@/views/permissionsMgt/Rights.vue') //权限列表

const Categories = () => import('@/views/goodsMgt/Categories.vue') //商品分类
const Goods = () => import('@/views/goodsMgt/Goods.vue') //商品列表
const Params = () => import('@/views/goodsMgt/Params.vue') //分类参数

const Orders = () => import('@/views/orderMgt/Orders.vue') //订单列表

const Reports = () => import('@/views/statistical/Reports.vue') //数据报表




export default [{
    path: '/home',
    name: "Home",
    component: Home,
    redirect:'/',
    children: [
        {
            path: '/',
            name: "Welcome",
            component: Welcome,
        },
        {
            path: '/users',
            name: "Users",
            component: Users,
        },
        {
            path: '/roles',
            name: "Roles",
            component: Roles,
        }, {
            path: '/rights',
            name: "Rights",
            component: Rights,
        },
        {
            path: '/categories',
            name: "Categories",
            component: Categories,
        },
        {
            path: '/goods',
            name: "Goods",
            component: Goods,
        },
        {
            path: '/params',
            name: "Params",
            component: Params,
        },
        {
            path: '/orders',
            name: "Orders",
            component: Orders,
        },
        {
            path: '/reports',
            name: "Reports",
            component: Reports,
        },
    ]
}, ]