import { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { user, createRoom, createInitialPlayerPayload } from '../../lib/user';

export const Connect = () =>{
    const history = useHistory()
    const roomIdRef = useRef(null) 
    const [username, setUsername] = useState('')

    useEffect(()=>{
        user.get('alias').then(data => setUsername(()=>data))
    },[])

    
    const createAndConnectRoom = async() =>{

        const roomId = await createRoom()
        history.push(`/game/${roomId}`)
    }

    const connectToRoom = async () =>{
        const roomId = roomIdRef.current.value;
        if(roomId.length !== 36){
            alert('Invalid Room ID')
            return false;
        }

        console.log(`attempting to connect to room ${roomId}`)
        user.get('rooms').once(data=>console.log(data))
        const room = await user.get('rooms').get(roomId).once(data => console.log('data is:', data))
        console.log('found the following about room data: ', room)

        if(room!==undefined){
            await user.get('rooms').get(roomId).get('players').get(username).put(createInitialPlayerPayload())
            history.push(`/game/${roomId}`)
        }else if(window.confirm('Game not found, do you wish to create it?')){
            createAndConnectRoom(roomId)
        }else{
            alert('You could not connect to that game')
        }
    }

    return(
        <div className="container">
            <div className="row full-height align-items-center justify-content-center">
                <div className="col col-md-8 col-lg-6 col-xl-4 card p-2">
                    <h4> Hello {username}</h4>
                    <hr/>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Game Lobby Code</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" ref={roomIdRef} />
                        </div>
                        <div className="d-flex justify-content-around align-items-center">
                            <button type="button" onClick={connectToRoom} className="btn btn-primary">Connect</button>
                            <h5>Or</h5>
                            <button type="button" onClick={createAndConnectRoom} className="btn btn-primary">Create new lobby</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}