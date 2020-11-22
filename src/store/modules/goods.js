import { reqgoodsList, reqgoodsCount } from "../../ustil/https"
const state = {
    // 分类列表
    list: [],
    // 总数
    total:0,
    // 每次请求几个数据
    size:2,
    // 页数
    page:1,
}

const mutations = {
    // 修改
    changeList(state, arr) {
        state.list = arr
        console.log(state.list);
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state,page){
        state.page=page;
    }
}

const actions = {
    // 发起请求
    reqList(context){
        //发请求，成功之后，修改list
        reqgoodsList({page:context.state.page,size:context.state.size}).then(res=>{
            let list=res.data.list?res.data.list:[]
            
            if(list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1)
                context.dispatch("reqList");
                return;
            }
            
            context.commit("changeList",list)
        })
    },
    //请总数
    reqCount(context){
        reqgoodsCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    // 修改页码
    changePage(context, page) {
        // 修改页码
        context.commit("changePage", page)
        // 重新请求数据
        context.dispatch("reqList")
    }

}
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.changeTotal
    },
    size(state) {
        return state.size
    },
}
export default {
    state, mutations, getters, actions,
    namespaced: true
}