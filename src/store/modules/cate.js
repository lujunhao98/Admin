import {reqcateList} from '../../ustil/https'
const state = {
    //分类list
    list:[]
}
const mutations = {
    //修改list
    changeList(state,arr){
        state.list=arr
    }
}
const actions = {
    //发起请求
    reqList(context){
        //发起请求，成功之后 修改list
        reqcateList({istree:true}).then(res=>{
            context.commit('changeList',res.data.list)
            console.log(res);
        })
    }
}
const getters = {
    list(state){
        return state.list
    }
}

export default {
    state, mutations, getters, actions,
    namespaced: true
}