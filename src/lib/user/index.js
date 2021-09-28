import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { v4 as uuid } from 'uuid';

// Database
export const db = GUN();

// Gun User
export const user = db.user().recall({sessionStorage: true});
window.user = user

//auth functions
export const login = async (username, password)  => user.auth(username, password, ({ err }) => err && alert(err))
export const signup = (username, password)=> user.create(username, password)
export const logout = () => user.leave();
export const validate = (username, password) => {
    //honestly this should be delegated, but I really can't be bothered
    if( username!==undefined && password!== undefined ){
        if( password.length<12 ){
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

export const getNodeOwner = node => db.user(node).get("alias")
export const getCurrentUser = () => user.get('alias')

export const createInitialPlayerPayload = () =>{
    return {
        coins:2,
        alive: true,
        availableCards:2
    }
}

export const createAction = async (roomId) => {
    const actionId = uuid()
    user.get('rooms').get(roomId).get('actions').get(actionId).put({
        actor: await getCurrentUser(),
        challenged: {},
        accepted: {},
        status: 'PENDING', // pending, accepted, lost, won,
        actionCt: "0"
    }, ()=> console.log(`action ${actionId} has been created`))
   return actionId
}

export const acceptAction = (roomId, actionId, actor) =>{
   return user.get('rooms').get(roomId).get('actions').get(actionId).get('accepted').put({[actor]:true})
}
export const challengeAction = (roomId, actionId, actor) =>{
    return user.get('rooms').get(roomId).get('actions').get(actionId).get('challenged').put({[actor]:true})
}
export const reportActionOutcome = async (roomId, actionId, outcome) =>{
    const currentUser = await getCurrentUser()
    const action = user.get('rooms').get(roomId).get('actions').get(actionId)
    
    if(currentUser === await action.get('actor')){
        return action.get('status').put(outcome);
    }else{
        console.warning('you are not authorized to report this actions outcome')
        return false;
    }
}
// game room functions
export const createRoom = async (roomId=uuid()) => {
    const owner = await getCurrentUser()
    console.log(owner)
    await user.get('rooms').get(roomId).put({
        actions: {},                // action log - leader
        messages: {},               // chat 
        leaderName: owner,              // current player
        owner,                      // lobby owner
        players: {[owner]:createInitialPlayerPayload()},           // players in lobby
        gameStarted: false,         // has game started?
        startRequests: 0
    })

    console.log(console.log(`room with ID ${roomId} has been created`))
    return roomId
}
