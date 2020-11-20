
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
  let pacCurrentPosition = 143 //variable to keep track of current position
  let virusCurrentPostion = 101
  
  //MAKE A GRID
  // function, createGrid which takes one parameter, invoked the fucntion below passing in value of current position
  // includes a loop to create the cells relevant to cellCount variable mentioned above
  // tells the function to create a new element for each loop and save to a variable called cell
  // tells the function to append each new element to a class of .grid to its parents of grid
  // pushes each element to its parent (grid)
  function createGrid(pacStartingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cellCount.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
      cell.innerText = i
    }

    //invoking the addPac function, whicever number is passed into its paratmeters the player will start at. We pass pacStartingPosition which is === pacCurrentPosition as we invoke it in createGrid below
    addPac(pacStartingPosition)
    addRoll(50)
    addVirus(25)
    addBananaBread(120)
  }
  
  //invoking createGrid and passing in value of what currentPosition is. Current position is passed as JavaScript reloads the grid after every turn 
  createGrid(pacCurrentPosition) 

  //ADD PAC TO GRID
  //function is saying, the cells at the position mentioned in the variable above, add a class list of pacClass which has been assigned the class for the player in css
  function addPac(position) {
    cells[position].classList.add(pacClass) 
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

  //REMOVE PAC
  //function is saying whichever position the cell is in, if it's class is pacClass remove this which deletes the player emoji
  function removePac(position) { 
    cells[position].classList.remove(pacClass)
  }
  function removeVirus(position) { 
    cells[position].classList.remove(virusClass)
  }
  
  //MOVE PAC
  function handleKeyDownForPlayerMovement(event) {
    removePac(pacCurrentPosition)
    const horizontalPosition = pacCurrentPosition % width
    const verticalPosition = Math.floor(pacCurrentPosition / width)
    switch (event.keyCode) {
      //move right takes the horizontal position pac is in which is worked out by using the remainder operator on pacs current position % width (example if the cell is 11, remainder would be 11 as width(12) doesn't fit into 11. By default all numbers on the right of the board will have a remainder of 11) A right move can only be made when horiztonal position is less than width minus 1 (11) as cells on the far right of the board will always be equal to 11 the if statement doesn't run
      case 39: //arrow right
        if (horizontalPosition < width - 1) pacCurrentPosition++
        break
        //move left takes the horizontal position pac is in which is worked out by using thr remainder operator on pacs current position % width (example if the cell is 0 or 12, the remainder would be 0 for both as there is nothing left after its been divided by 12. This is passed to the value of horizontal position when the left key is pressed. The if statement will only run if the cell number is not divisible by 12 and by default all numbers on the left of the board are)
      case 37: //arrow left
        if (horizontalPosition > 0) pacCurrentPosition--
        break
        //move up takes pacs current position and is divided by width (example if the cell number is 1, the vertical position woudld be 0.08 which we use math.floor on to round down to 0). This is passed to the if statement where the condition only runs when the vertical position is greater than 0. By default all the cell positions at the top of the grid will be less than 1 which is rounded down to 0.  
      case 38: //arrow up
        if (verticalPosition > 0) pacCurrentPosition -= width
        break
        //move down takes pacs current position and is divided again by width (example if the cell position is 132 this would equal 11). This is again passed to the if statement where the condition to move down is if the vertical position(11) is less than width -1 (11) as the numbers are the same pac won't move down. By default all the numbers on the bottom will be rounded down to 11 so the condition is never met to run the movememt.
      case 40: //arrow down
        if (verticalPosition < width - 1) pacCurrentPosition += width
        break
      default:
        console.log('INVALID KEY')
    }

    addPac(pacCurrentPosition)
  }

  //VIRUS RANDOMLY GENERATED MOVEMENT
  function moveVirus() {
    removeVirus(virusCurrentPostion)
    const horizontalPosition = pacCurrentPosition % width
    const verticalPosition = Math.floor(pacCurrentPosition / width)
      if (virusCurrentPostion)
  }

  







  // * Event listeners
  document.addEventListener('keydown', handleKeyDownForPlayerMovement)


  
  














































































































}


window.addEventListener('DOMContentLoaded', init)