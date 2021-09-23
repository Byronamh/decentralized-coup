import './index.css'
import { useRef } from 'react'
import { useHistory } from "react-router-dom";
import { validate, signup, login } from '../../lib/user';


export const Lobby = () =>{  
    const usernameRef = useRef(null) 
    const passwordRef = useRef(null)
    const history = useHistory();

    const sessionHandler = (isLogin=false) =>{
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        if(validate(username,password)){
            if(isLogin){
                login(username,password)
            }else{
                signup(username, password)
            }
        }
    }

    return(
        <div className="container">
            <div className="row full-height align-items-center justify-content-center">
                <div className="col col-md-8 col-lg-6 col-xl-4 card p-2">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" ref={usernameRef} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" ref={passwordRef} />
                        </div>
                        <button type="button" onClick={()=>sessionHandler(true)} className="btn btn-primary">Log In</button>
                        <button type="button" onClick={()=>sessionHandler(false)} className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}