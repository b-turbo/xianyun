export const state={
        userInfo:{
            token:'',
            user:{}
        }
}
export const mutations={
    //保存用户信息到state
    setUserInfo(state,data){
        state.userInfo=data
    },

    clearUserInfo(state){
        state.userInfo={
            token:'',
            user:{}
        }
    }
};

export const actions={}