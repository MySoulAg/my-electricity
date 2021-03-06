/**
 * 用于element-ui组件的按需引入
 */
import Vue from 'vue';
import {
    Button,
    Select,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Dialog,
    Pagination,
    MessageBox,
    Tag,
    Tooltip,
    Tree,
    Option,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Steps,
    Step,
    Upload,
    CheckboxGroup,
    Checkbox
} from 'element-ui';


Vue.use(Button);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Tooltip);
Vue.use(Tree);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Alert);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Upload);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm