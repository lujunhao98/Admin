import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { errorAlert } from '../ustil/alert'
import store from '../store'
import router from '../router'

//开发环境使用 8080
let baseUrl = '/aa'
Vue.prototype.$imgPre = 'http://localhost:3000'

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
    if (res.data.msg == '登录已过期或访问权限受限')//掉线
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
//修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
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
// ==========商品分类  开始======

//商品分类添加 包含文件
export const reqcateAdd = (cate) => {
    //有文件处理
    let d = new FormData()

    for (let i in cate) {
        d.append(i, cate[i])
    }

    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: d
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

// ==========商品分类  结束======
// ==========商品规格  开始======
//商品规格添加
export const reqSpecsAdd = (form) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: qs.stringify(form)
    })
}
//规格列表
export const reqSpecsList = (p) => {
    return axios({
        url: baseUrl + '/api/specslist',
        method: 'get',
        params: p
    })
}
// 商品规格总数（用于计算分页）
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

//获取一条数据
export const reqSpecsInfo = (id) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//商品规格删除
export const reqSpecsdel = (id) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}
// ==========商品规格  结束======
// ==========商品管理  开始======
//文件添加
export const reqgoodsAdd = (form) => {
    let d = new FormData()
    for (let i in form) {
        d.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: 'post',
        data: d
    })
}

//18.列表 p={page:1,size:10}
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}
//26.删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqgoodsUpdate = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}
export const reqgoodsCount = () => {

    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}


// ==========商品管理  结束======
// ==========会员管理 开始======
//会员列表
export const reqMemberList = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
        method: 'get',
    })
}

//获取一条数据
export const reqMemberInfo = (uid) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        method: 'get',
        params: {
            uid: uid
        }
    })
}
//会员修改
export const reqMemberedit = (user) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(user)
    })
}
// ==========会员管理  结束======
// ==========轮播图管理  开始======
// 轮播图添加
export const reqBannerAdd = (cate) => {
    //有文件处理
    let d = new FormData()
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + '/api/banneradd',
        method: 'post',
        data: d
    })
}

// 轮播图列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + '/api/bannerlist',
        method: 'get',
    })
}
// 获取一条数据
export const reqBannerInfo = (id) => {
    return axios({
        url: baseUrl + '/api/bannerinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
// 轮播修改
export const reqBannerUpdate = (cate) => {
    let d = new FormData()
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + '/api/banneredit',
        method: 'post',
        data: d
    })
}
// 轮播图删除
export const reqBannerdel = (id) => {
    return axios({
        url: baseUrl + '/api/bannerdelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}
// ==========轮播图管理  结束======
