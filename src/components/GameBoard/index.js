
import { useEffect, useState } from "react";
import { db, user } from "../../lib/user";
import { StartGameButton } from "../StartGameButton";

export const GameBoard = ({roomId,playerName}) =>{
    const [roomOwner, setRoomOwner] = useState('')

    useEffect(()=>{
        const room = user.get('rooms').get(roomId)

        setRoomOwner(async ()=> await db.user(room).get('alias'))

        room.get('leaderName').on(newLeader=>{
            //handle new leader
        })
        
        room.get('players').map().once(newPlayer=>{
            //handle new players
        })

        room.get('gameStarted')


    },[roomId])


    useEffect(()=>{
        const room = user.get('rooms').get(roomId)

        if(roomOwner===playerName){
            //user is room owner, can start the game
            room.get('startRequests').once(startReq=>{
                //handle start game requests
            })
        }    

    },[playerName,roomOwner,roomId])


    return (
            <StartGameButton roomId={roomId}/>
        )
}