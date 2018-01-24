//index.js
//获取应用实例
//Created by jinsheng.huang on 2018.01.23
const app = getApp()

Page({
  data: {
    userName: "",
    mobileNumber: "",
    email: "",
    birthdate: "",
    isEmailCorrect: true,
    emailErrorMessage: "",
    isMobileNumberCorrect: true,
    mobileNumberErrorMessage: "",
    isDataCorrect: false
  },
  //事件处理函数
  onLoad: function () {
    
  }, 
  bindUserNameChange: function (e) {
    this.setData({
      userName: e.detail.value
    })
    this.checkData()
  },
  bindEmailChange: function (e) {
    let email = e.detail.value
    let checkResult = this.checkEmail(email)
    this.showEmailErrorBanner(checkResult == "success", checkResult)
    this.checkData();      
  }, 
  bindMobileNumberChange: function (e) {
    let mobileNumber = e.detail.value
    let checkResult = this.checkMobileNumber(mobileNumber)
    this.showMobileNumberErrorBanner(checkResult == "success", checkResult)
    this.checkData()
  },
  bindBirthdateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthdate: e.detail.value
    })
    this.checkData();
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.globalData.currentUser = e.detail.value
    app.globalData.userList.push(e.detail.value)
    this.dataReset()
  },
  formReset: function() {
    console.log('form发生了reset事件')
    this.dataReset()
  },
  checkMobileNumber: function(mobileNumber) {
    if (mobileNumber.length != 11) {
      return "Mobile number is invalid"
    }
    if (!this.checkMobileNumberRepeat(mobileNumber)) {
      return "Mobile number is already taken"
    }
    return "success"
  },
  checkEmail: function(email) {
    let rgx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!rgx.test(email)) {
      return "Email is invalid"
    }
    if (!this.checkEmailRepeat(email)) {
      return "Email is already taken"
    }
    return "success"
  },
  checkMobileNumberRepeat: function (mobileNumber) {
    for (var i = 0; i < app.globalData.userList.length; i++) {
      if (app.globalData.userList[i].mobileNumber == mobileNumber) {
        return false
      }
    }
    return true
  },
  checkEmailRepeat: function (email) {
    for (var i = 0; i < app.globalData.userList.length; i++) {
      if (app.globalData.userList[i].email == email) {
        return false
      }
    }
    return true
  },
  checkData: function() {
    let isDataCorrect = (
      this.data.isMobileNumberCorrect &&
      this.data.isEmailCorrect &&
      this.data.userName.length != 0 &&
      this.data.birthdate.length != 0
    );
    this.setData({
      isDataCorrect: isDataCorrect
    })
  },
  showEmailErrorBanner: function(isShow, errorMessage) {
    if (isShow) {
      this.setData({
        isEmailCorrect: true,
      })
    } else {
      this.setData({
        isEmailCorrect: false,
        emailErrorMessage: errorMessage,
      })
    }
  },
  showMobileNumberErrorBanner: function (isShow, errorMessage) {
    if (isShow) {
      this.setData({
        isMobileNumberCorrect: true,
      })
    } else {
      this.setData({
        isMobileNumberCorrect: false,
        mobileNumberErrorMessage: errorMessage,
      })
    }
  },
  dataReset: function() {
    this.setData({
      userName: "",
      mobileNumber: "",
      email: "",
      birthdate: "",
      isEmailCorrect: true,
      emailErrorMessage: "",
      isMobileNumberCorrect: true,
      mobileNumberErrorMessage: "",
      isDataCorrect: false
    })
  }
})
