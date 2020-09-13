/* Grid architecture
Legend
0: pac dots
1: wall
2: ghost lair
3: power pellets
4: empty space
*/

let score = 0;
let currentScore = document.getElementById('score')

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

let grid = document.createElement('div')
grid.setAttribute('class','grid')
document.body.append(grid);

/* Create an array to contain all 784 divs elements on the grid
depending on the legend, the div will be given their corresponding div classes
*/
let square = [];

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
let pacmanCurrentPosition = 434;
square[pacmanCurrentPosition].classList.add('pacman')
let mouth = document.createElement('div')
square[pacmanCurrentPosition].append(mouth)
mouth.classList.add('mouth');

//the width of the grid
let width = 28;

// We will create a function to let pacman move and eat the pacdots
//when pacman moves - we need to delete class of pacman from current div, add class of pacman to the other div and remove class of pacdots
//pacman can move left and right i.e. -1 or +1 step
//pacman can move up and down i.e. -width or +width 
// however pacman cannot move through walls 
//if pacman goes out of the grid from the left it should enter from the right and vice versa
function movePacman(e) {
     let key = e.keyCode
     
     if (key ===37) {
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
     square[pacmanCurrentPosition].classList.add('pacman')
     square[pacmanCurrentPosition].append(mouth)
     mouth.classList.add('mouth');
     scoreCount();
     square[pacmanCurrentPosition].classList.remove('pac-dots')
    
 
    
    }
    document.addEventListener('keydown',movePacman);

    scoreCount();

    function scoreCount(){
        if (square[pacmanCurrentPosition].classList.contains('pac-dots')) {
            score +=1;
        }
        else if (square[pacmanCurrentPosition].classList.contains('power-pellets')){
            score +=10;
        }
        currentScore.innerHTML = score;
    }

    let ghostCurrentPosition = 322  
    square[ghostCurrentPosition].classList.add('ghost');

    let ghostObject = {isBlue : false}
    // create a function for ghost to move - the ghost can move left, right (-1 , 1) and top, down (-width, width)
    // create a ghost that moves at random
    // ghost needs to 'decide' where to move first - but the destination cannot be a wall and the ghost should not exit the grid
    // if the ghost can move, remove ghost class from current position and add ghost class in the next square
    function moveGhost() {
        const directions = [-1, 1, -width, width]
        setInterval(function(){
            direction = directions[Math.floor(Math.random()*directions.length)]
            let ghostDestination = ghostCurrentPosition + direction
            if(square[ghostDestination].classList.contains('wall')===false && ghostDestination !== 364 && ghostDestination !== 391) {
                square[ghostCurrentPosition].classList.remove('ghost')
                square[ghostDestination].classList.add('ghost');
                ghostCurrentPosition += direction
                
            }
        }, 500);
    }
moveGhost();

    
    








