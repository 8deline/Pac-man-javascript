//start the game 

let startGame = document.querySelector('#start')
let startOverlay = document.querySelector('#overlay')
let currentScore = document.getElementById('score')
let winoverlay = document.getElementById('overlay-win')
let loseGame = document.querySelector('#overlay-lose')
let replay = document.querySelector('#replay-button')
let home = document.querySelector('#home-button')

//the width of the grid
let width = 28;
//the directions that pacman and ghost can go  left right or up down ,i.e. 1 entire width
const directions = [-1, 1, -width, width]

// creating an div container for the game grid
let grid = document.createElement('div')
grid.setAttribute('class','grid')
document.body.append(grid);

/* Grid architecture
Legend
0: pac dots
1: wall
2: ghost lair
3: power pellets
4: empty space
*/

const gridArray = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,0,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,0,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,0,4,4,4,4,4,
    1,1,1,1,1,0,1,1,0,4,1,1,1,1,1,1,1,1,4,0,1,1,0,1,1,1,1,1,                                                          
    1,1,1,1,1,0,1,1,0,4,4,4,4,4,4,4,4,4,4,0,1,1,0,1,1,1,1,1,
    1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,
    1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,
    1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,
    1,0,0,0,0,0,1,1,0,4,4,4,0,1,1,0,4,4,4,0,1,1,0,0,0,0,0,1,
    1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,
    1,0,1,1,1,0,0,0,0,1,1,1,0,1,1,0,1,1,1,0,0,0,0,1,1,1,0,1,
    1,3,1,1,1,0,1,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,3,1,
    1,0,1,1,1,0,1,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]


let square = [];
let score = 0;
let pacmanCurrentPosition = 0;
let ghostCurrentPosition = 0;  
//pacman's mouth
let mouth = document.createElement('div')


// determine if the ghost is blue or not
let ghostObject = {isBlue: false};

//determine if the user has pressed start
let gameProgress = {gameInProgress: false}



//create a function to initialise the game
function gameStart() {
    /* Create an array to contain all 784 divs elements on the grid
depending on the legend, the div will be given their corresponding div classes
*/
    score = 0;
    currentScore.innerText = score;

    for (let i=0; i<gridArray.length; i++){
        square.push(document.createElement('div'))
        switch(gridArray[i])
        {case 0: 
            square[i].className += " pac-dots"
            
            break
        case 1:
            square[i].className +=" wall"
            break

        case 2:
            square[i].className +=" ghost-lair"
            break

        case 3:
            square[i].className +=" power-pellets"
            break

        default:
            square[i].className += " empty"

        }
        grid.append(square[i])

    }

    // we let pacman begin in this particular grid index
    pacmanCurrentPosition = 434;
    square[pacmanCurrentPosition].classList.add('pacman')
    square[pacmanCurrentPosition].append(mouth)
    mouth.classList.add('mouth');

    // Ghost curent position
    ghostCurrentPosition = 322;  
    square[ghostCurrentPosition].classList.add('ghost');
    gameProgress.gameInProgress = true;
   
}
//ghostMoving function is called
ghostMoving();

startGame.addEventListener("click", function() {
    startOverlay.style.display = 'none'
    gameStart();
});


    // create a function for ghost to move - the ghost can move left, right (-1 , 1) and top, down (-width, width)
    // create a ghost that moves at random
    // ghost needs to 'decide' where to move first - but the destination cannot be a wall and the ghost should not exit the grid
    // if the ghost can move, remove ghost class from current position and add ghost class in the next square
    //ghost should only move after the user press start
function ghostMoving() {
    if (gameProgress.gameInProgress = true) {
        setInterval( function() {
            let direction = directions[Math.floor(Math.random()*directions.length)]
            let ghostDestination = ghostCurrentPosition + direction
            if(square[ghostDestination].classList.contains('wall')===false && ghostDestination !== 364 && ghostDestination !== 391) {
                square[ghostCurrentPosition].classList.remove('ghost','blueGhost')
                square[ghostDestination].classList.add('ghost');
                ghostCurrentPosition += direction
                if (ghostObject.isBlue) {
                    square[ghostDestination].classList.add('blueGhost')
                }
                
            }   
        }, 500)
    }   
}









// We will create a function to let pacman move and eat the pacdots
//when pacman moves - we need to delete class of pacman from current div, add class of pacman to the other div and remove class of pacdots
//pacman can move left and right i.e. -1 or +1 step
//pacman can move up and down i.e. -width or +width 
// however pacman cannot move through walls 
//if pacman goes out of the grid from the left it should enter from the right and vice versa
function movePacman(e) {
     let key = e.keyCode
     
     if (key === 37) {
         if(square[pacmanCurrentPosition-1].classList.contains('wall')===false){
        square[pacmanCurrentPosition].classList.remove('pacman')
         square[pacmanCurrentPosition-1].style.transform= 'rotate(180deg)'
         pacmanCurrentPosition -=1;
         }

         if (pacmanCurrentPosition === 364) {
            square[pacmanCurrentPosition].classList.remove('pacman')
            pacmanCurrentPosition += 27

         }
     }
     else if (key === 38) {
         if(square[pacmanCurrentPosition-width].classList.contains('wall')=== false){
        square[pacmanCurrentPosition].classList.remove('pacman')
        square[pacmanCurrentPosition-width].style.transform= 'rotate(-90deg)'
        pacmanCurrentPosition -= width;
         }
     }
     else if (key === 39) {
         if(square[pacmanCurrentPosition+1].classList.contains('wall')===false){
        square[pacmanCurrentPosition].classList.remove('pacman')
        pacmanCurrentPosition += 1;
         }
         if(pacmanCurrentPosition=== 391) {
            square[pacmanCurrentPosition].classList.remove('pacman')
            pacmanCurrentPosition -= 27
         }
     }

     else if (key ===40) {
         if(square[pacmanCurrentPosition+width].classList.contains('wall')===false){
        square[pacmanCurrentPosition].classList.remove('pacman')
         square[pacmanCurrentPosition+width].style.transform = 'rotate(90deg)'
        pacmanCurrentPosition += width;
         }
     }
     eatPowerPellets();
     checkWin();
     eatGhost();
     gameOver();
     square[pacmanCurrentPosition].classList.add('pacman')
     square[pacmanCurrentPosition].append(mouth)
     mouth.classList.add('mouth');
     scoreCount();
     square[pacmanCurrentPosition].classList.remove('pac-dots')
    
    }

    document.addEventListener('keydown', movePacman);
    

    
// create a function to trace the score as pacman eats pacdots
    function scoreCount(){
        if (square[pacmanCurrentPosition].classList.contains('pac-dots')) {
            score +=1;
        }
        currentScore.innerHTML = score;
    }


    
/* when pacman eats the power pellets, the powerpellets need to be removed, and the ghost will turn blue for
14s before turning back to its original colour */ 
function eatPowerPellets() {
    if (square[pacmanCurrentPosition].classList.contains('power-pellets')) {
        score += 10;
        score.innerText = score;
        square[pacmanCurrentPosition].classList.remove('power-pellets')
        ghostObject.isBlue = true
        setTimeout(function(){
            ghostObject.isBlue = false
        },14000)
    }
}

/*When the ghost turn blue pacman can eat the ghost and score points */

function eatGhost() {
    if (square[pacmanCurrentPosition].classList.contains('blueGhost')){
        score += 100;
        score.innerHTML = score
        square[pacmanCurrentPosition].classList.remove('blueGhost','ghost')
        clearInterval(ghostMoving)
    }
}

// the player wins when he got all the pacdots and powerpellets || when he eats the blue ghost
function checkWin() {
    if (score === 282 || square[pacmanCurrentPosition].classList.contains('blueGhost')){
        
        winoverlay.style.display = 'block';
        document.addEventListener('keydown', function(){
            document.location.reload()
        })
        
    }
}

// gameOVer when pacman is in the same div square as the ghost is not blue, player can choose to replay (which will reset the game)
//or go back to home page
function gameOver() {
    if (square[pacmanCurrentPosition].classList.contains('ghost') && !ghostObject.isBlue){
        square[pacmanCurrentPosition].classList.remove('pacman');
        clearInterval(ghostMoving);
        
        loseGame.style.display = 'block'
        home.addEventListener('click', function() {
            document.location.reload()
        })

        replay.addEventListener('click',function(){
            loseGame.style.display= 'none';
            square[pacmanCurrentPosition].classList.remove('pacman');
            square[ghostCurrentPosition].classList.remove('ghost')
            gameStart()
        })
    }
}



    
    








