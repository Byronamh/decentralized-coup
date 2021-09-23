import {useEffect, useState} from "react";
import {
  useParams
} from "react-router-dom";
import { user } from "../../lib/user";
import { GameBoard } from "../GameBoard";
import { GameChat } from "../GameChat";

export const GameRoom = () =>{
    const { roomId } = useParams();

    const [alias, setAlias] = useState('')
    useEffect(()=>{
      user.once('auth', async(event) => {
          setAlias(await user.get('alias'))
      });
    },[])

    useEffect(()=>{
      console.log('my name is now'+alias)
    },[alias])
    return (
        <div className="container">
            <div className="row full-height align-items-center justify-content-center">
                <div className="col col-md-8 col-xl-6 card p-2">
                    <h4> Room {roomId}</h4>
                    <hr/>
                    <GameBoard roomId={roomId} />
                </div>
                <GameChat  roomId={roomId} playerName={alias}/>
            </div>
        </div>
    )
}