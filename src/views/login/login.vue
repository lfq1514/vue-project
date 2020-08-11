<template>
  <div class="loginPage">
    <div class="formBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="userName">
          <el-input type="password" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="tipsBox">
            <div class="register" @click="dialogFormVisible = true">注册</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="注册新用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <img class="img" :src="logo" alt=""> -->
  </div>
</template>
<script>
import api from "@h/api.js";
export default {
  name: "Login",
  props: {},
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      logo: require("@a/images/logo.jpg"),
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { validator: validateUserName, type: "password", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      dialogFormVisible: false,
      form: {
        username: "",
        password: ""
      },
      formLabelWidth: "60px"
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      let _this = this;
      console.log('2222222')
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          let params = {
            username: _this.username,
            password: _this.password
          };
          _this.login(params);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login(params) {
      console.log('22')
      this.$router.push('/home')
      api.home
        .login()
        .then(res => {
          console.log("---");
          console.log(res);
        })
        .catch(err => {
          console.log("=====");
          console.log(err);
        });
    },
    //取消注册
    cancel() {
      this.dialogFormVisible = false;
      this.form.username = "";
      this.form.password = "";
    },
    //确认注册
    confirm() {
      this.dialogFormVisible = false;
      this.form.username = "";
      this.form.password = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.loginPage {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top right, #39f, #fff);
  position: relative;

  .formBox {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.tipsBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.register {
  text-decoration: underline;
  line-height: 25px;
}
.loginBtn {
  width: 100%;
}
::v-deep .el-dialog {
  width: 30%;
}
</style>
