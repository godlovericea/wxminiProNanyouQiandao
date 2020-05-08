
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username:'',
    staffNo:'',
    loginFlag:true,
    show:false
  },
  onLoad() {
    
  },
  handleUserInfo(e) {
    console.log(e)
    if(!e.detail.userInfo){
      return false
    }else{
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.allow()
    }
  },
  // 处理用户名
  getUserName(val){
    this.setData({
      username:val.detail
    })
  },
  // 处理员工号，小于8位不让点击按钮
  getStaffNo(val) {
    this.setData({
      staffNo: val.detail
    })
    if (this.data.staffNo.length === 8){
      this.setData({
        loginFlag : false
      })
    }else{
      this.setData({
        loginFlag: true
      })
    }
  },
  // 点击登录按钮
  allow(){
    wx.showModal({
      title: '确认信息',
      content: `姓名：${this.data.username}， 工号：${this.data.staffNo}`,
      cancelColor:'#0F6AF9',
      confirmColor:'#0F6AF9',
      success:(res)=> {
        if (res.confirm) {
          console.log('用户点击确定')
          this.sureLogin()
        } else if (res.cancel) {
          console.log('用户点击取消')
          this.onClose()
        }
      }
    })
  },
  sureLogin(){
    console.log(this.data.username)
    console.log(this.data.staffNo)
    // this.getOpenId()
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  onClose(){
    wx.showToast({
      title: '请登录使用',
      icon: 'none',
      duration: 2000
    })
  }
})
