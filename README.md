# Decentralized Coup

Before you sue me, contact me via [linkedin](https://www.linkedin.com/in/byronamh/) with proof of ownership so I can take the project down.

The game Coup, but with fancy technical terms, such as "open source", "decentralized", "blockchain", "webRTC".

Full credit goes to the original makers of the game, whoever that may be, [ **support them by buying the game**](https://www.amazon.com/Indie-Boards-and-Cards-COU1IBC/dp/B00GDI4HX4) .

## Game Instructions

You can find the written instructions [here](https://www.ultraboardgames.com/coup/game-rules.php) or [watch a short video](https://www.youtube.com/watch?v=a8bY3zI9FL4).

## How it works


### Data storage
The core element of this project is [gunjs](https://gun.eco/). A decentralized database that uses webRTC to connect to other peers and share data with other nodes.
For a brief explanation on how it works, [check out a 100 second video](https://www.youtube.com/watch?v=oTQXzhm8w_8)

### UI
The UI was made in [React](https://reactjs.org/) and styled with [Bootstrap](https://getbootstrap.com/).


### Engine
The flow of games actions can be described with an image: 
![coup-state-machine drawio (1)](https://user-images.githubusercontent.com/18726495/134589215-38468f9b-4cea-4a2e-95b2-86bfddbd1db2.png)


This does not cover the internal logistics of the game itself, rather the flow of information inside the program.

Knowing the state of information and the flow of it, a Finite state machine was created, using [xstate](https://xstate.js.org/). The state machine looked like so:

![coupEngine](https://user-images.githubusercontent.com/18726495/134589011-85d76950-193f-4ad5-bda2-0e692921d3c1.png)

The state machine can be understood in the following way:
 - `waiting_for_players`: Lobby, game hasn't started. After all players in the lobby (at least 2) have requested a game start, the first turn will hapen
 - `waiting_for_action`: Waiting for the current player's turn to happen
 - `action_done`: The current player has made their selection, during this time other players can either `accept` or `challenge` said action.
   - If at least one player `challenges` the action, the state machine will move to `action_challenged`
   - If all players `accept` the action, the state machine will move to `action_accepted`
 - `action_challenged`: The action was challenged, given the user's and oponent's selected cards, a winner will be decided. The loser will discard a card
 - `action_accepted`: The action was not challenged, so it will be completed without any sort of revision
 - `action_finished`: Action finished, consecuences (a coup, income, assasination, block, etc) are calculated and applied
 - `game_finished`: If at the end of an action the game determines only one player is left standing, that player is declared winner and the game ends, otherwise the state machine will move to `waiting_for_action` and the next player will become the current player.

#### Rooms and sessions
The game works in "rooms", this means that there may be separate, independent, instances of the game across the network.
The structure of a room looks like so:
```js
  [roomId]:{
     actions: {},                // action log 
     messages: {},               // chat 
     leaderName: owner,          // current player
     owner,                      // lobby owner
     players: {<key>:<value>},   // players in lobby
     gameStarted: false,         // has game started?
     startRequests: 0            // number of start requests, will start when all players (2+) have requested to start
  }
```

A user's data inside a room looks like so:
```js
{
  coins: 2,        // initial number of coins, at 10 a coup will automatically happen
  alive: true,     // when this value is false the player is out of the game
  availableCards:2 // number of available cards, if this is 0 the player loses
}
```

#### Data synchronization and security
The card game works via 'turns', I took advantage of this by making the current player the "owner", acting as the central server for the duration of said turn.

Only the owner can create Actions, other players can either `challenge` or `accept` said action. Internally the action looks like so:
```js
  [actionId]:{
    actor,              // name of the owner 
    challenged: {},     // list of users that challenged the action
    accepted: {},       // list of users that accepted the action
    status: 'PENDING',  // pending, lost, won,
    }
```

After all players have acted upon said action (`accept`,`challenge`) the owner will compute the outcome and apply the corresponding consecuences, the state of the action will be `lost` if the action failed and `won` if the action succeeded.

After the consecuences are applied, the ownership is released to the next player

#### Sinchronizing information across all players
This was tricky, since no single node possesed all information across the network. So react hooks in combnination with xtate's state machine were used to write to the databse. Writing to the room's data except for the current action is forbidden for everyone except the owner.

----
##### **Everything below this line was output by `create-react-app`**


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
