import GUN from 'gun';
import { v4 as uuidv4 } from 'uuid';

const db = GUN();

export const sendAction = ({actionName, roomName, identity}) => {
    db.get(roomName).get('actions').put({ actionName,identity,ts:new Date().toISOString})   
}