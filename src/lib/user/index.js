import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

// Database
export const db = GUN();

// Gun User
export const user = db.user().recall({sessionStorage: true});

export const login = async (username, password)  => user.auth(username, password, ({ err }) => err && console.error(err))
export const signup = (username, password)=> user.create(username, password)
export const logout = () => user.leave();
export const validate = (username, password) => {
    //honmestly this should be delegated, but I really can't be bothered
    if( username!==undefined && password!== undefined ){
        if( password.length<16 ){
            alert('Password length must be at least 16 characters')
            return false
        }else{
            return true
        }
    }else{
        alert('Please complete all required fields')
        return false
    }
}
window.login = login
window.signup = signup