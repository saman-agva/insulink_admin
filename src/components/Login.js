import React, { Component, createRef } from 'react'
import PropsType from 'prop-types'
import {Form, Button, InputGroup, FormControl, Container, Row, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import cookie from 'react-cookies'
import axios from 'axios'
import './Login.css'
import loginSvg from '../assests/backgroundImages/login_svg.svg'
import fb_icon from '../assests/backgroundImages/fb_icon.svg'
import google_icon from '../assests/backgroundImages/google_icon.svg'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    constructor(){
        super();
        this.cardHeightAutoRef = createRef()
        this.state={
            hide:true,
            isEyeVisible:false,
            isLoading:false,
            rememberMe:false,
            email:null,
            password:null,
            emailError:null,
            passwordError:null,
            userData:null,
            backendErrorResponse:null,
        }
    }

    handlePasswordVisibility(){
        this.setState({
            hide:!this.state.hide
        })
    }
    
    validateEmail(email){
        // let isValid=false
        this.setState({
            backendErrorResponse:null
        })
        console.log("email validate")
        if (!email) {
            // isValid = false;
            this.setState({ emailError:"Please enter your email address."})
            return false
        }
        
        if (email !== null) {
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                //   isValid = false;
                console.log(pattern)
                this.setState({
                    emailError:"Please enter valid email address.",
                    email:null
                })
                return false
            }
        }
        this.setState({
            emailError:null,
            email:email
        })
        return true
        
    }
    
    validatePassword(password){
        console.log("password validate")
        this.setState({
            backendErrorResponse:null
        })
        if (!password) {
            // isValid = false;
            this.setState({ 
                passwordError:"Please enter your password.",
            })
            return false
        }
        
        if (password !== null) {
            // var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            // if (!pattern.test(password)) {
            //     //   isValid = false;
            //     this.setState({
            //         passwordError:"Please enter valid password.",
            //         password:null
            //     })
            //     return false
            // }
        }
        this.setState({
            passwordError:null,
            password:password
        })
        return true
    }

    rememberMe(){
        localStorage.setItem('rememberMe', 'Shaktish');
        localStorage.setItem('adminUserName', this.state.rememberMe ? this.state.email  : '');
        localStorage.setItem('adminUserCredential', this.state.rememberMe ? this.state.password : '');
        let adminuser = localStorage.getItem('adminUser')
        window.alert(adminuser)
    }
    
      handleSubmit(e){
        // e.preventDefault();
        this.rememberMe()
        let email=this.validateEmail(this.state.email)
        let password=this.validatePassword(this.state.password)
        console.log(email);
        console.log(password);
        if(email && password){
            this.setState({isLoading:true})
             axios.post(`https://insulink-backend.herokuapp.com/api/v1/auth/admin/login`, {
            email: this.state.email,
            password:this.state.password
        })
        .then(res => {
            this.setState({
                backendErrorResponse:null,
                isLoading:false
            })
            const datas = res.data
            console.log(datas.data.user.token)
            cookie.save('token', datas.data.user.token, { path: '/' })
            console.log(cookie.load('token'))
            this.setState({userData:datas.data.user});
            // this.props.setuserdetail(datas.data.user)
            // const { history } = this.props;
            this.props.history.push('/')
            console.log(this.props.history.location)
        })
        .catch(error => this.setState({
            backendErrorResponse:error.response.data.data.err.msg,
            isLoading:false}));
    
    
    }
    e.preventDefault();

    // if (this.state.emailError || this.state.passwordError || this.state.backendErrorResponse) {
    //     this.ref.cardHeightAutoRef.style.height='auto'
    // } 

    console.log("handle submit clicked")
    console.log(email);
    console.log(password);
    // console.log(this.state.email);
    // console.log(this.state.password)
    console.log(this.state.passwordError)
    console.log(this.state.backendErrorResponse)
    console.log(this.state.userData)
    


}

componentDidMount(){
    if(localStorage.getItem('adminUserName') && localStorage.getItem('adminUserCredential')){

        this.setState({
            email:localStorage.getItem('adminUserName'),
            password:localStorage.getItem('adminUserCredential')
        })
    }
}

render() {
    console.log(this.props.history.location)
    console.log(this.state.backendErrorResponse)
    console.log(this.state.userData)
    
    
    
    return (
        <div className="login-card" ref='cardHeightAutoRef'>
        <div className="login-form">
        
        <h2>Login to Insulin</h2>
        <small style={{ marginBottom: '5%'}}>Lorem impsum this is demo</small>
        <form>
        <div class="mb-3">
        <input 
        type="email" 
        className="form-control " 
        id="exampleInputEmail1" 
        placeholder="Email" 
        onChange={(e)=>this.setState({email:e.target.value})} value={this.state.email}
        aria-describedby="emailHelp"/>
        <span> <i className="fas fa-envelope icon-left"></i></span>
        {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
        {
            this.state.emailError ? <small style={{color:'red'}}>{this.state.emailError}</small> :''
        }
        </div>
        <div class="mb-3">
        
        <input  
        type={this.state.hide? "password":"text"} 
        className="form-control"
        style={{
            margin: '8px 0',
            padding: '10px 30px'
            /* style="-webkit-text-security: square; */
        }}
        id="exampleInputPassword1" 
        placeholder="Password" 
        onChange={(e)=>this.setState({password:e.target.value})} value={this.state.password}
        />
        <span><i  className="fas fa-lock icon-left"></i> 
        <i onClick={()=>this.setState({hide: !this.state.hide})} className={this.state.hide ? "fas fa-eye-slash icon-right":" fas fa-eye icon-right"}></i></span>
        {
            this.state.passwordError !=null ? <small style={{color:'red'}}>{this.state.passwordError}</small> :''
        }
        {
            this.state.backendErrorResponse !=null ? <small style={{color:'red'}}>{this.state.backendErrorResponse}</small> :''
        }
        </div>
        {/* <div class="mb-3 form-check"> */}
        <Row style={{width:'100%', marginBottom:'10%'}}>
        <Col>

        <Form.Check 
        type="checkbox" 
        checked={this.state.rememberMe}
        onChange={()=>this.setState({rememberMe:!this.state.rememberMe})} label="Remember me" 
        />

        </Col>
        <Col style={{paddingRight:'0px'}}>
        <Link to='/' 
        style={{
            textDecoration:'none', 
            float:'right', 
            font: 'normal normal medium 18px/27px Poppins'
            }} >Forget Password?</Link>
        </Col>
        </Row>
        {/* </div> */}
        <button 
        type="submit" 
        style={{
            background:'#3E64E2', 
            color:'#fff', 
            borderRadius:'20px', 
            font:"normal normal 600 23px/34px Poppins;"}} 
        className="btn col login-button"
        onClick={(e)=>this.handleSubmit(e)}
        >{
            this.state.isLoading ? 'Verifying...': 'Login'
        }</button>
        </form>
        
        <Row style={{marginTop:'10%'}}>
        <Col style={{ textAlign:'center'}}>
        <Link to='/' 
        style={{
            paddingtop:'40px',
            textDecoration:'none',
            font: 'normal normal medium 18px/27px Poppins'}} >Or Signup with email</Link>
        </Col>
        </Row>
        
        <Row style={{marginTop:'10%', width:'100%'}}>
        <Col style={{padding:'0px'}}>
        <button className="social-button" >
        <img src={google_icon} alt='fb button' />
        Google
        </button>
        </Col>
        <Col style={{padding:'0px'}}>
        <button style={{float:'right'}} className=" social-button" id="button-addon2">
        <img src={fb_icon} alt='fb button' />
        Facebook
        </button>
        </Col>
        </Row>
        <Row style={{marginTop:'20px'}}>
        <Col style={{ textAlign:'center', display:'inline'}}> 
        <p>Not register yet? <Link to='/' style={{paddingtop:'40px',textDecoration:'none',font: 'normal normal medium 18px/27px Poppins'}} >Create an account</Link></p>
        
        </Col>
        </Row>
        </div>
        <div className="login-image">
        
        {/*                     
            <div id="left-top"><p>Hello</p></div>
            <div id="circle-top"><p>Hello</p></div>
            <div id="circle-above"><p>Hello</p></div>
        <div id="circle-below"><p>Hello</p></div> */}
        <img  src={loginSvg} alt="Login side" />
        </div>
        
        </div>
        )
    }
}
