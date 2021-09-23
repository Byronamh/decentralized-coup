import { createMachine } from "xstate";

export const getStateMachine = () =>{    
    return createMachine({
      id: 'coupEngine',
      initial: 'waiting_for_players',
      context: {
        retries: 0
      },
      states: {
        waiting_for_players: {
          on: {
            GAME_START: 'waiting_for_action'
          }
        },
        waiting_for_action: {
          on: {
            PLAYER_ACTION: 'action_done',
          }
        },
        action_done: {
          on: {
            CHALLENGED: 'action_challenged',
            ACCEPTED: 'action_accepted'
          }
        },
        action_challenged: {
          on: {
            OUTCOME: 'action_finished',
          }
        },
        action_accepted: {
          on: {
            OUTCOME: 'action_finished',
          }
        },
        action_finished: {
          on: {
            WIN_CONDITION_FOUND: 'game_finished',
            NEXT_PLAYER_SET: 'waiting_for_action'
          }
        },
        game_finished: {
          type: 'final'
        },
      }
    });
}