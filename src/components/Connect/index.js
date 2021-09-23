import { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { db, user, createRoom, createInitialPlayerPayload } from '../../lib/user';

export const Connect = () =>{
    const history = useHistory()
    const roomIdRef = useRef(null) 
    const [alias, setAlias] = useState('')

    useEffect(()=>{
        db.on('auth', async(event) => {
            const newname = await user.get('alias')
            setAlias(()=> newname)
        });
    },[])

    
    const createAndConnectRoom = async() =>{
        const roomId = await createRoom()
        console.log('created room with ID: '+roomId)
        history.push(`/game/${roomId}`)
    }

    const connectToRoom = async () =>{
        const roomId = roomIdRef.current.value;
        const roomExists = await user.get('rooms').get(roomId)
        if(roomExists!==undefined){
            await user.get('rooms').get(roomId).get('players').get(alias).put(createInitialPlayerPayload())
            history.push(`/game/${roomId}`)
        }else if(window.confirm('Game not found, do you wish to create it?')){
            createAndConnectRoom()
        }else{
            alert('You could not connect to that game')
        }
    }

    return(
        <div className="container">
            <div className="row full-height align-items-center justify-content-center">
                <div className="col col-md-8 col-lg-6 col-xl-4 card p-2">
                    <h4> Hello {alias}</h4>
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