import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { errorAlert } from '../ustil/alert'
import store from '../store'
import router from '../router/index'

//开发环境使用 8080
let baseUrl = '/aa'
Vue.prototype.$imgPre='http://localhost:3000'

//上线用 打包
//  let baseUrl =''
// Vue.prototype.$imgPre=""

// 请求拦截
axios.interceptors.request.use(req => {
    if (req.url != baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userInfo.token
    }
    return req

})
//响应拦截
axios.interceptors.response.use(res => {
    console.log('本次请求的地址是:' + res.config.url);
    console.log(res);

    //统一处理失败，组件内只需要处理成功即可。
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    //掉线处理
    if (res.data.msg === '登录已过期或者访问权限受限')//掉线
    {   //清除登陆信息
        store.dispatch('changeUser', {})
        //跳转页面
        router.push('/login')
    }
    return res
})

// ==========菜单管理  开始======
//添加菜单
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form),
    })
}

//列表数据
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
//获取点击编辑的那条数据请求
export const reqMenuinfo = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}

// 修改菜单
export const reqMenuedit = (form) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(form)
    })
}

//删除
export const reqMenudel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: {
            id: id
        },
    })
}
// ==========菜单管理  结束======

// ==========角色管理  开始======
//角色添加
export const reqRoleadd = (user) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(user)
    })
}

//角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
//角色修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}
//角色编辑(详情)
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//角色删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}
// ==========角色管理  结束======
// ==========管理员管理  开始======
//管理员添加
export const reqManageAdd = (user) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(user)
    })
}
//管理员列表
export const reqManageList = (p) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}
//管理员删除

export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}
//获取一条数据
export const reqManageInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: 'get',
        params: {
            uid: uid
        }
    })
}
//总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}
//管理员登录
export const reqlogin = (user) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: qs.stringify(user)
    })
}
// ==========管理员管理  结束======
// ==========商品分类管理  开始======

//商品分类添加 包含文件
export const reqcateAdd = (cate) => {
    //有文件处理
    let d = new FormData()

    for (let i in cate) {
        d.append(i,cate[i])
    }

    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data:d
    })
}
//18.列表 p={istree:true}  p={pid:1}
export const reqcateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqcateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqcateDetail = id => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 38.修改 文件
export const reqcateUpdate = (cate) => {
    let d = new FormData()
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: d
    })
}

// ==========商品分类管理  结束======