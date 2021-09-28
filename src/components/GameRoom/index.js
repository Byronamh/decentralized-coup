import {useEffect, useState} from "react";
import {
  useParams
} from "react-router-dom";
import { user } from "../../lib/user";
import { GameBoard } from "../GameBoard";
import { GameChat } from "../GameChat";

export const GameRoom = () =>{
    const { roomId } = useParams();
    const [username, setUsername] = useState('')
    
    useEffect(()=>{
      user.get('alias').then(data => setUsername(()=>data))

    },[])

    return (
        <div className="container">
            <div className="row full-height align-items-center justify-content-center">
                <div className="col col-md-8 col-xl-6 card p-2">
                    <h4> Room {roomId}</h4>
                    <hr/>
                    <GameBoard roomId={roomId} playerName={username} />
                </div>
                <GameChat  roomId={roomId} playerName={username}/>
            </div>
        </div>
    )
}