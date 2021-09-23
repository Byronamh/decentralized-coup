
import { useMachine } from "@xstate/react";
import { useCallback, useEffect, useState } from "react";
import { getStateMachine } from "../../lib/stateMachine";
import { db, user } from "../../lib/user";
import { GameRoom } from "../GameRoom";

export const GameBoard = ({roomId, playerName}) =>{

    const stateMachine = getStateMachine()
    const [current, send] = useMachine(stateMachine);
    const [isLeader, setLeader] = useState(false)
  
  
    
    const emulateBaton = async () =>{
        await user.get('rooms').get( roomId).get('owner').put('someone elsze')
    }


    return (
        <>
            <button onClick={emulateBaton}/>
        </>
    )
}