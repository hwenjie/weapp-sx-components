export default {
    instanc: null,
    loginedCallBacks: [],
    code: '',
    isLogin(){
        return new Promise((resolve, reject) => {
            /**
             * checkSession && 验证本地储存的信息
             * 
             */

            resolve({
                success: false
            })
        })
    },
    signUp(data, cb){
        /**
         * data {
         *      code,
         *      encrypted_data,
         *      iv
         * }
         * 
         * 自定义接口
         * 例如：userSignUp(data, res => {
         *          if(res.success){
         *             cb(true) 
         *          }else{
         *              cb(false, res.msg)
         *          }
         * 
         *      })
         * 
         */
        cb(true)
    },
    async login(cbData){
        this.loginedCallBacks[0] = cbData;
        let res = await this.isLogin()
        if(res.success){
            this.instanc.call(true)
            return
        }
        wx.login({
            success: data => {
                this.code = data.code;
                this.instanc.show()
            },
            fail: err => {
                this.instanc.cancel(null, err)
            }
        })
        
    }
}