import helper from './helper'
Component({
    created(){
        helper.instanc = this;
    },
    data: {
        showLogin: helper.showLogin
    },
    methods: {
        show(){
            this.setData({
                showLogin: true
            })
        },
        cancel(e, err){
            this.call(false, err)
        },
        bindGetUserInfo(res){
            if(res.detail.userInfo){
                let _data = {
                    code: helper.code,
                    encrypted_data: res.detail.encryptedData,
                    iv: res.detail.iv
                }
                helper.signUp(_data, (res, err) => {
                    
                    if(res){
                        this.call(true)
                    }else{
                        this.call(false, err)
                    }
                })
            }else{
                this.call(false, res)
            }
        },
        call(status, err){
            this.setData({
                showLogin: false
            })
            let cbData = helper.loginedCallBacks.length ? helper.loginedCallBacks.shift(): {};
            if(status){
                cbData.success && cbData.success()
            }else{
                cbData.fail && cbData.fail(err)
            }
        }
    }
})