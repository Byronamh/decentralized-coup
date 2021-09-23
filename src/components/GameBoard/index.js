
import { useMachine } from "@xstate/react";
import { useCallback, useEffect, useState } from "react";
import { getStateMachine } from "../../lib/stateMachine";
import { db, user } from "../../lib/user";
import { StartGameButton } from "../StartGameButton";

export const GameBoard = ({roomId}) =>{

    const stateMachine = getStateMachine()
    const [current, send] = useMachine(stateMachine);
    const [roomOwner, setRoomOwner] = useState('')
    const [alias, setAlias] = useState('')
    const [players, setPlayers] = useState([])

    useEffect(()=>{
        const room = user.get('rooms').get(roomId)

        setAlias(async ()=> await user.get('alias') )
        setRoomOwner(async ()=> await db.user.get(room).get('alias'))

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

        if(roomOwner===alias){
            //user is room owner, can start the game

            room.get('startRequests').once(startReq=>{
                //handle start game requests
            })

        }    

    },[alias,roomOwner,roomId])


    return (
            <StartGameButton/>
        )
}