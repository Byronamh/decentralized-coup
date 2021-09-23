import { useEffect, useState } from "react"
import { user } from "../../lib/user"

export const StartGameButton = ({roomId}) =>{
    const [enabled, setEnabled] = useState(true)
    
    const sendStartRequest = async () => {
        const startCount = await user.get('rooms').get(roomId).get('startRequests')
        user.get('rooms').get(roomId).get('startRequests').put(+startCount+1,()=>setEnabled(false));
    }

    return(
        <button enabled={enabled}  type="button" onClick={sendStartRequest}>
            Ready to start
        </button>
    )
}