import { user } from "../user";

const CARD_TYPES = ['duke', 'assasin', 'captain', 'ambassador']

const CARD_NAMES = {
    DUKE: "duke",
    ASSASSIN: "assassin",
    CAPTAIN: "captain",
    AMBASSADOR: "ambassador",
    CONTESSA: "contessa",
    values: () => [this.DUKE, this.ASSASSIN, this.CAPTAIN, this.AMBASSADOR, this.CONTESSA]
 };

export const ACTIONS = {
    income: {
        influence: "all",
        blockableBy: [],
        isChallengeable: false,
        moneyDelta: 1
    },
    foreign_aid: {
        influence: "all",
        blockableBy: [CARD_NAMES.DUKE],
        isChallengeable: false,
        moneyDelta: 2
    },
    coup: {
        influence: "all",
        blockableBy: [],
        isChallengeable: false,
        moneyDelta: -7
    },
    tax: {
        influence: CARD_NAMES.DUKE,
        blockableBy: [],
        isChallengeable: true,
        moneyDelta: 3
    },
    assassinate: {
        influence: CARD_NAMES.ASSASSIN,
        blockableBy: [CARD_NAMES.CONTESSA],
        isChallengeable: true,
        moneyDelta: -3
    },
    exchange: {
        influence: CARD_NAMES.AMBASSADOR,
        blockableBy: [],
        isChallengeable: true,
        moneyDelta: 0
    },
    steal: {
        influence: CARD_NAMES.CAPTAIN,
        blockableBy: [CARD_NAMES.AMBASSADOR, CARD_NAMES.AMBASSADOR],
        isChallengeable: true,
        moneyDelta: 2 // EDGE CASE: if victim only has 1 or 0 coins
    }
};

export const COUNTER_ACTIONS = {
    block_foreign_aid: {
        influences: [CARD_NAMES.DUKE]
    },
    block_steal: {
        influences: [CARD_NAMES.AMBASSADOR, CARD_NAMES.CAPTAIN]
    },
    block_assassinate: {
        influences: [CARD_NAMES.CONTESSA]
    },
};

export const onGameStart = (room, callback) => {
    user.get('rooms').get(room).get('gameStarted').on(
        (data)=>callback(data)
    )
}
export const onNewAction = (room, callback) => {
    user.get('rooms').get(room).get('actions').map().once(
        (newAction)=>callback(newAction)
    )
}

export const onActionEvent = (room, actionId, callback) =>{
    user.get('rooms').get(room).get('actions').get(actionId).map().once(
        event => callback(event)
    )
}
export const onÀctionFinished = (room, actionId, callback) =>{
    user.get('rooms').get(room)
}


export const onLeadChange = (room, callback) => {
    user.get('rooms').get(room).get('leaderName').on(
        (newLeader)=>callback(newLeader)
    )
}

