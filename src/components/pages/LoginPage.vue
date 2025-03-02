<template>
  <img src="https://cdn.pixabay.com/photo/2017/11/28/16/49/notebook-2984108_1280.jpg" alt="">
  <div class="container">
    <div class="title">Login</div>
    <div class="content">
      <form action="#" @submit.prevent="login">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Email</span>
            <input type="text" v-model="email" @click="(e)=>{emailError=''}" placeholder="Enter your email" class="email" required />
            <p class="error-message">{{ emailError }}</p>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" v-model="password" @click="(e)=>{passwordError=''}" placeholder="Enter your password" class="password" required />

            <p class="error-message ">{{ passwordError }}</p>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Login" @click="login" />
        </div>
        <div>
          <p>Don't have Account? <router-link :to="{ name: 'SignUp' }">Sign Up here</router-link></p>
        </div>
      </form>
    </div>
  </div>
  <div class="loginResult" v-if="loginResult" :style="{ backgroundColor: loginResultMessage === 'Login Successfully' ? 'green' : 'red' }">
    <p>{{ loginResultMessage }} <span class="closeLoginResult" @click="loginResult=false">X</span></p>
    <div class="slider"></div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      emailError: "",
      passwordError: "",
      loginResultMessage: "",
      loginResult: false
    }
  },
  methods: {
    login() {
      this.validateForm();
      if (this.emailError === "" || this.passwordError === "") {
        console.log(this.email, this.password);
      }
    },
    validateForm() {
      if(this.loginResult){
        this.loginResult=false
      }
      this.emailError = "";
      this.passwordError = "";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#%^!%*?&]{6,}$/;  // ✅ Password validation

      if (!emailPattern.test(this.email)) {
        this.emailError = "Invalid email format";
      }

      if (!passwordPattern.test(this.password)) {
        this.passwordError = "Password must have at least one letter, one number and one special character";
      }

      if (!this.emailError && !this.passwordError) {
        this.loginResult = true;
        this.loginResultMessage = "Login Successfully"
        setTimeout(() => {
          this.loginResult = false;
          this.loginResultMessage = ""
          this.$router.push('/');
        }, 4000);
        console.log("Login Successful", this.email, this.password);
      }
      else {
        this.loginResult = true;
        this.loginResultMessage = "Login failed. Try again";
        setTimeout(() => {
          this.loginResult = false;
          this.loginResultMessage = ""
        }, 4000);
      }
    }
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

img {
  width: 100%;
  height: calc(100vh - 96px);
  object-fit: cover;
  transform: scaleX(-1);

}

.container {
  max-width: 500px;
  height: 400px;
  width: 100%;
  background-color: #fff;
  padding:20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(20%, -42%);
}

.container .title {
  font-size: 25px;
  font-weight: 500;
  position: relative;
}

.content form .user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

form .user-details .input-box {
  margin-bottom: 10px;
  width: 75%;
}

form .input-box span.details {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
  float: left;
}

.user-details .input-box input {
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}

.user-details .input-box input:focus,
.user-details .input-box input:valid {
  border-color: #9b59b6;
}

form .button {
  height: 35px;
  margin: 15px;
}

form .button input {
  height: 100%;
  width: 35%;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.error-message {
  left: 0;
  height: 15px;
  text-align: start;
  color: rgb(194, 9, 9);
  font-size: 12px;
  margin-top: 5px;
}

form .button input:hover {
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
}

.loginResult {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(150%, 90px);
  /* transform: translateY(150%); */
  background-color: green;
  color: rgb(255, 255, 255);
  width: 300px;
  height: 30px;
  text-align: center;
  line-height: 28px;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.loginResult .slider {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: #d0d2d3;
  animation: slider 4s linear forwards;
}

.loginResult .closeLoginResult {
  position: absolute;
  right: 10px;
  top: 3px;
  cursor: pointer;
  font-weight: bold;
  color: rgb(50, 48, 48);
}

@keyframes slider {
  0% {
    width: 100%;
  }

  100% {
    width: 0%;
  }
}

/* Responsive media query code for mobile devices */
@media (max-width: 584px) {
  *{
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 85%;
    transform: none;
    left: 10%;
    top: 30%;
    padding: 0;
    margin: 0;
  }
  .content form .user-details {
    max-height: 300px;
  }

  form .user-details .input-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 75%;
  }

  form .user-details .input-box span.details {
    text-align: start;
  }
}

/* Responsive media query code for mobile devices */
@media (max-width: 459px) {
  .container .content .category {
    flex-direction: column;
  }
}
</style>