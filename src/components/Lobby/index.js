import './index.css'
import { useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { validate, signup, login, db, user } from '../../lib/user';


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
 
    useEffect(()=>{
        db.on('auth', async(event) => {
            const alias = await user.get('alias');
            console.log(`signed in as ${alias}`);
            history.push('/connect')
        });
    },[history])

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
                        <div className="row">
                            <div className="col text-center">
                                <button type="button" onClick={()=>sessionHandler(true)} className="btn btn-primary mr-3">Log In</button>

                            </div>
                            <div className="col text-center">
                                <button type="button" onClick={()=>sessionHandler(false)} className="btn btn-primary">Register</button>
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col text-center">
                                <a className="d-inline-block" href="https://www.ultraboardgames.com/coup/game-rules.php" target="_blank" rel="noreferrer">Read the instructions</a>
                            </div>
                            <div className="col text-center">
                                <a className="d-inline-block" href="https://github.com/Byronamh/decentralized-coup" target="_blank" rel="noreferrer">View the Source Code</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}