import { useEffect, useRef, useState } from "react"
import { db, user } from "../../lib/user";

export const GameChat = ({roomId,playerName}) =>{
    const [messages, setMessages] = useState([])
    const messageInputRef = useRef(null)
    
    useEffect(()=>{
            user.get('rooms').get(roomId).get('messages').map().once( async incomingMessage=>{
                const author = await db.user(incomingMessage).get('alias')
                const {body} = incomingMessage;
                setMessages((messages)=>[...messages, {author, body}])
            });
    },[roomId])

    const sendMessage = () =>{
         console.log('clicked')
        const messageValue =  messageInputRef.current.value;

        if(messageValue.length>0){
            const timestamp = new Date().toISOString()
            user.get('rooms').get(roomId).get('messages').get(timestamp).put(
                {
                    author:playerName,
                    body:messageValue
                },messageInputRef.current.value='')
        }
    }
    
    return(
        <div className="col-12 col-md-4 col-lg-5  col-xl-3">
            <div className="messages-wrapper">
            {
                messages.map(({author, body},key)=> <div key={key} className="card">{author}: {body}</div>)
            }
            </div>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="type a message..."  ref={messageInputRef}/>
                <button className="btn btn-outline-secondary" onClick={sendMessage} type="button" id="button-addon2">Button</button>
            </div>
        </div>
        )
}