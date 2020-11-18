import { reqSpecsList,  reqSpecsCount } from '../../ustil/https'
//初始化
const state = {
    //分类list
    list: [],
    //总数
    total: 0,
    //一次请求几个
    size: 2,
    //页数
    page: 1,

}
//数据的修改
const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, page) {
        state.page = page
    }
}
//处理逻辑
const actions = {
    //发请求
    reqList(context, bool) {
        //看bool的值？{}或{page:context.state.page,size:context.state.size}
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        //发请求
        reqSpecsList(params).then(res => {
            let list = res.data.list ? res.data.list : []

            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch('reqList');
                return
            }
            list.forEach(item => {
                item.attrs =JSON.parse(item.attrs)
            });

            context.commit('changeList', list)
        })
    },
    //请求总数
    reqCount(context) {
        reqSpecsCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //修改页码
    changePage(context,page) {
        // 修改页码
        context.commit('changePage',page)
        //重新请求数据
        context.dispatch('reqList')
    }
    
}
//导出数据
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

//导出
export default {
    state, mutations, getters, actions,
    namespaced: true
}