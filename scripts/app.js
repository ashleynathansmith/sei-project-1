//PACNAN 2020 BOG ROLL EDITION

/*

GAME VISUAL DESIGN
Cartoon background image of a supermarket/home - CSS
Grid based shape following supermarket aisle - JS
Food eaten = bog roll - CSS
Ghost = virus - CSS
Player = nan or similar player item in pacman - CSS
Flashing virus when bog roll picked - CSS/GIF
CSS on the grid/backgroud image - CSS

MUSIC
Retro style - JS/AUDIO

SCORE
Score tally - HTML/CSS/JS

INTRO SCREEN
Simnpe design with game name etc. - HTML/CSS
Nan chasing toilet roll across screen animation to start before going into press start to play - CSS/JS
Items listed 10 points for dot, 50 points for toilet roll - HTML/CSS
black background very simple - CSS
colourful items - CSS
intro music - JS/AUDIO
high score button - HTML/CSS
lets play button HTML/CSS
Press space bar to start - HTML/CSS/JS

GAME FUNCTIONALITY  

MOVEMENT
PLAYER MOVEMENTS SIMILAR TO PIKA - keydown movemement within switch statement - JS
VIRUS MOVEMENTS & DIFFERENT MODES WHEN ITEM IS TAKEN, INDIVDUAL MOVEMENT FOR EACH VIRUS? - JS
Cells which player & computer can't move in to make shape of supermarket aisle - JS
ALL ITEMS TO STAY WITHIN THE GRID - JS

GAME MODES

ITEMS PLACED IN CELLS TO BE EATEN - CSS/JS
WHEN PLAYER AND VIRUS IN THE SAME CELL - PLAYER LOSES A LIFE - JS
BONUS BANNANA BREAD ITEM TO COLLECT - JS/CSS 
When item taken the game freezes and changes game mode CSS/JS

EVENT LISTENERS

WHEN ITEM IS TAKEN - JS
WHEN PLAYER AND COMPUTER ARE WITHIN THE SAME CELL - JS

CLASSES
DIFFEREMT CLASSES WHEN FOR VIRUS WHEN ITEM IS EATEN - CSS/JS

*/


function init() {

  //VARIABLES 

  const grid = document.querySelector('.grid')

  const width = 12
  const cellCount = width * width
  const cells = []

  const pacClass = 'pac'
  const rollClass = 'roll'
  const virusClass = 'virus'
  const bananaBreadClass = 'bananaBread'
  let pacCurrentPosition = 0 //variable to keep track of current position
  

  

  //MAKE A GRID
  // function, createGrid which takes one parameter, invoked the fucntion below passing in value of current position
  // includes a loop to create the cells relevant to cellCount variable mentioned above
  // tells the function to create a new element for each loop and save to a variable called cell
  // tells the function to append each new element to a class of .grid to its parents of grid
  // pushes each element to its parent (grid)
  function createGrid(pacStartingPosition) {
    console.log(pacStartingPosition)
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cellCount.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    //invoking the addPac function, whicever number is passed into its paratmeters the player will start at. We pass pacStartingPosition which is === pacCurrentPosition as we invoke it in createGrid below
    addPac(pacStartingPosition)
    addRoll(50)
    addVirus(25)
    addBananaBread(120)
  }

  createGrid(pacCurrentPosition) //invoking createGrid and passing in value of what currentPosition is. Current position is passed as JavaScript reloads the grid after every turn 

  //ADD PAC TO GRID
  function addPac(position) {
    cells[position].classList.add(pacClass) //function is saying, the cells at the position mentioned in the variable above, add a class list of pacClass which has been assigned the class for the player in css
  }
  function addRoll(position) {
    cells[position].classList.add(rollClass)
  }

  function addVirus(position) {
    cells[position].classList.add(virusClass)
  }

  function addBananaBread(position) {
    cells[position].classList.add(bananaBreadClass)
  }

  const result = document.getElementsByName('div')
  console.log(result)
  

  //first function created is createGrid which is passes in the value of pacStartingPosition (143)
  //within that function it calls addPac function which is passes in the value of pacStartingPosition(143)
  //lastly createGrid is invoked passing in the value

  //REMOVE PAC
  //function is saying whichever position the cell is in, if it's class is pacClass remove this which deletes the player emoji
  function removePac(position) { 
    cells[position].classList.remove(pacClass)
  }
  

  // * Move Pika
  function handleKeyDown(event) {
    removePac(pacCurrentPosition)
    const horizontalPosition = pacCurrentPosition % width
    const verticalPosition = Math.floor(pacCurrentPosition / width)
    switch (event.keyCode) {
      case 39: //arrow right
        if (horizontalPosition < width - 1) pacCurrentPosition++
        break
      case 37: //arrow left
        if (horizontalPosition > 0) pacCurrentPosition--
        break
      case 38: //arrow up
        if (verticalPosition > 0) pacCurrentPosition -= width
        break
      case 40: //arrow down
        if (verticalPosition < width - 1) pacCurrentPosition += width
        break
      default:
        console.log('INVALID KEY')
    }

    addPac(pacCurrentPosition)
  }


  //CREATE MAZE
  







  // * Event listeners
  document.addEventListener('keydown', handleKeyDown)

  
  














































































































}


window.addEventListener('DOMContentLoaded', init)