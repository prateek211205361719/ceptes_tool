
import React,{Component} from 'react';
class Login extends Component{
    render(){
        return(
            <div className="theme-purple"> 
                <div className="page-header">
                    <div className="page-header-image" style={{"backgroundImage":"url(/images/login.jpg)"}}></div>
                    <div className="container">
                        <div className="col-md-12 content-center" style={{"top":"40%"}}>
                            <div className="card-plain">
                            <form className="form">
                                <div className="footer text-center">
                                     <a href="/auth/google" className="btn btn-primary btn-lg" style={{"background":"#dd4b39","padding":"10px 30px"}} >
                                        <i style={{"fontSize":"24px"}} className="zmdi zmdi-hc-fw zmdi-google-plus jssocials-share-logo" />  SIGN IN 
                                     </a>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    
                    <footer className="footer">
                        <div className="container">
                            <nav>
                                <ul>
                                    <li><a href="javascript:void(0);" target="_blank">Contact Us</a></li>
                                    <li><a href="javascript:void(0);" target="_blank">About Us</a></li>
                                    <li><a href="javascript:void(0);">FAQ</a></li>
                                </ul>
                            </nav>
                        <div className="copyright">
                            ©
                            <script>
                                document.write(new Date().getFullYear())
                            </script>2018,
                            <span>Designed by <a href="javascript:void(0);" target="_blank">ThemeMakker</a></span>
                        </div>
                        </div>
                    </footer>
                </div>      
            </div>
        );
    }
}

export default Login;


