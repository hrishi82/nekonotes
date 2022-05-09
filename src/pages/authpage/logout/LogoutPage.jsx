import {Link} from "react-router-dom"

export const LogoutPage = () =>{
    return (
        <div className="auth-page-container">
        <div className="logout-container">

                <div>
                    <h3 className="text-md">You've been sucessfully logged out!</h3>
                    <div className="section-gutter-sm"></div>
                    <Link to="/loginpage" className="btn pill-btn">Login again</Link>    
                </div>

                <div className="logout-img-container">
                    <img src="https://res.cloudinary.com/dac2rwutk/image/upload/v1652076995/undraw_login_re_4vu2_mnichw.svg" alt="logout-image" className="img-responsive" />
                </div>
 
        </div>
    </div>
    )
}
