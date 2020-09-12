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
function movePacman(e) {
     let key = e.keyCode
     square[pacmanCurrentPosition].classList.remove('pacman')
     if (key ===37) {
         square[pacmanCurrentPosition-1].style.transform= 'rotate(180deg)'
         pacmanCurrentPosition -=1;
     }
     else if (key === 38) {
        square[pacmanCurrentPosition-width].style.transform= 'rotate(-90deg)'
        pacmanCurrentPosition -= width;

     }
     else if (key === 39) {
        pacmanCurrentPosition += 1;

     }

     else if (key ===40) {
         square[pacmanCurrentPosition+width].style.transform = 'rotate(90deg)'
        pacmanCurrentPosition += width;
     }
     square[pacmanCurrentPosition].classList.add('pacman')
     square[pacmanCurrentPosition].classList.remove('pac-dots')
     square[pacmanCurrentPosition].append(mouth)
    mouth.classList.add('mouth');
    }

    document.addEventListener('keydown',movePacman);


