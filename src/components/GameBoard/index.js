
import { useMachine } from "@xstate/react";
import { useCallback, useEffect, useState } from "react";
import { getStateMachine } from "../../lib/stateMachine";
import { db, user } from "../../lib/user";
import { GameRoom } from "../GameRoom";

export const GameBoard = ({roomId, playerName}) =>{

    const stateMachine = getStateMachine()
    const [current, send] = useMachine(stateMachine);
    const [isLeader, setLeader] = useState(false)
    
    const isWaitingForPlayers = current.matches("active")
    const isWaitingForAction = current.matches("waiting_for_action")
    const isActionDone = current.matches("action_done")
    const isActionChallenged = current.matches("action_challenged")
    const isActionAccepted = current.matches("action_accepted")
    const action_finished = current.matches("action_finished")
    const isGameFinished = current.matches("action_accepted")
    

    useEffect(()=>{
        user.get('rooms').get(roomId).get('owner').on((owner)=>{
            setLeader(playerName===owner) // owner switching
         })
    },[roomId])
    
    const emulateBaton = async () =>{
        await user.get('rooms').get( roomId).get('owner').put('someone elsze')
    }


    return (
        <>
            <button onClick={emulateBaton}/>
        </>
    )
}