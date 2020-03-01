const Home = () => import('@/views/home/Index.vue') //主页
const Welcome = () => import('@/views/home/Welcome.vue') //Welcome

const Users = () => import('@/views/users/Index.vue') //用户

const Roles = () => import('@/views/permissionsMgt/Roles.vue') //角色列表
const Rights = () => import('@/views/permissionsMgt/Rights.vue') //权限列表

const Categories = () => import('@/views/goodsMgt/Categories.vue') //商品分类
const Goods = () => import('@/views/goodsMgt/Goods.vue') //商品列表
const Params = () => import('@/views/goodsMgt/Params.vue') //分类参数
const AddGoods = () => import('@/views/goodsMgt/AddGoods.vue') //添加商品

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
            meta:{
                index:0
            }
        },
        {
            path: '/users',
            name: "Users",
            component: Users,
            meta:{
                index:1
            }
        },
        {
            path: '/roles',
            name: "Roles",
            component: Roles,
            meta:{
                index:2
            }
        }, {
            path: '/rights',
            name: "Rights",
            component: Rights,
            meta:{
                index:3
            }
        },
        {
            path: '/categories',
            name: "Categories",
            component: Categories,
            meta:{
                index:6
            }
        },
        {
            path: '/goods',
            name: "Goods",
            component: Goods,
            meta:{
                index:4
            }
        },
        {
            path: '/params',
            name: "Params",
            component: Params,
            meta:{
                index:5
            }
        },
        {
            path: '/addGoods',
            name: "AddGoods",
            component: AddGoods,
            meta:{
                index:7
            }
        },
        {
            path: '/orders',
            name: "Orders",
            component: Orders,
            meta:{
                index:8
            }
        },
        {
            path: '/reports',
            name: "Reports",
            component: Reports,
            meta:{
                index:9
            }
        },
    ]
}, ]