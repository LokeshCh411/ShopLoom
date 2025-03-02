<template>
    <img src="https://cdn.pixabay.com/photo/2018/07/25/18/36/ecommerce-3562005_1280.jpg" alt="">
    <div class="loginContainer">
        <div class="container">
            <div class="title">Sign Up</div>
            <div class="content">
                <form @submit.prevent="submitForm">
                    <div class="user-details">
                        <div class="input-box">
                            <span class="details">Email</span>
                            <input type="text" v-model="email" placeholder="Enter your email"
                                @click="signupValidations.emailError = ''" class="email" required />
                            <p class="error-message">{{ signupValidations.emailError }}</p>
                        </div>
                        <div class="input-box">
                            <span class="details">Phone Number</span>
                            <input type="text" v-model="phoneNumber"
                                @input="phoneNumber = phoneNumber.replace(/\D/g, ''); signupValidations.phoneNumberError = ''"
                                placeholder="Enter your number" class="phoneNumber" required />
                            <p class="error-message">{{ signupValidations.phoneNumberError }}</p>
                        </div>
                        <div class="input-box">
                            <span class="details">Password</span>
                            <input type="password" v-model="password" @click="signupValidations.passwordError = ''"
                                placeholder="Enter your password" class="password" required />

                            <p class="error-message">{{ signupValidations.passwordError }}</p>
                        </div>
                        <div class="input-box">
                            <span class="details">Confirm Password</span>

                            <input type="password" v-model="confirmPassword"
                                :style="{ borderColor: confirmPassword === '' ? '#ccc' : password === confirmPassword ? '#9b59b6' : '#d91212' }"
                                placeholder="Confirm your password" class="confirmPassword" required />
                            <p class="error-message">{{ signupValidations.confirmPasswordError }}</p>
                        </div>
                    </div>
                    <div class="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
                <div>
                    <p>
                        Already a member?
                        <router-link :to="{ name: 'LoginPage' }">Login here</router-link>
                    </p>
                </div>
                <div>
                    <p v-if="signupResult">Account created Successfully</p>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "SignUp",

    data() {
        return {
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            signupValidations: {
                emailError: "",
                phoneNumberError: "",
                passwordError: "",
                confirmPasswordError: ""
            },
            signupResult: false
        };
    },

    methods: {
        submitForm() {
            this.validateSignUpFormInputs();
            console.log('entered')
        },
        validateSignUpFormInputs() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#%^!%*?&]{6,}$/;  // ✅ Password validation
            const numberPattern = /^[6-9]\d{9}$/;

            if (!emailPattern.test(this.email)) {
                this.signupValidations.emailError = "Enter valid email address"
            }

            if (!passwordPattern.test(this.password)) {
                this.signupValidations.passwordError = "length should be atleast 6 , one letter, number and special character"
            }

            if (!numberPattern.test(this.phoneNumber)) {
                this.signupValidations.phoneNumberError = "Phone number should contain 10 digits only"
            }

            if (this.password !== this.confirmPassword) {
                this.signupValidations.confirmPasswordError = "Password should match";
            }
            console.log(this.signupValidations)
            if (this.signupValidations.emailError === "" && this.signupValidations.passwordError === "" && this.signupValidations.phoneNumberError === "" && this.signupValidations.confirmPasswordError === "") {
                this.signupResult = true
                setTimeout(() => {
                    this.signupResult = false
                }, 3000);
            }
        }
    },
};
</script>

<style scoped>
/* Importing Google Fonts - Poppins */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.loginContainer {
    width: 100%;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

#showPassord {
    height: 10px;
    background-color: #71b7e6;
}

.container {
    max-width: 500px;
    width: 90%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(129, 119, 119, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(20%, -42%);
}

/* .container {
    max-width: 400px;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(129, 119, 119, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */

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

form .button input:hover {
    background: linear-gradient(-135deg, #71b7e6, #9b59b6);
}

.error-message {
    height: 10px;
    width: 100%;
    color: red;
    float: left;
    text-align: start;
    font-size: 10px;
    padding: 0px;
    margin: 0px;
    /* background-color: gray; */
}

/* Responsive media query code for mobile devices */
@media (max-width: 584px) {

    .title {
        font-size: larger !important;
        transform: translateY(-10px);
    }

    .img {
        top: 10%;
        height: 100vh;
    }

    .container {
        box-shadow: 0 5px 10px rgba(129, 119, 119, 0.308);
        background-color: #ffffffe4;
        max-width: 90%;
        height: auto;
        left: 5% !important;
        top: 30%;
        transform: none;
        padding-left: 0%;
        padding-right: 0%;
    }

    .button {
        padding-top: 10px;

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
