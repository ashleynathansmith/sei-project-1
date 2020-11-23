/* eslint-disable indent */

function init() {

  //VARIABLES ------------------------------------------------------------------------------------------

  const grid = document.querySelector('.grid')

  const width = 28
  const height = 36
  const cellCount = width * height
  const cells = []

  const start = document.querySelector('.start')
  const pacClass = 'pac'
  const rollClass = 'roll'
  const virusClass = 'virus'
  const virusStartingPositionOne = 462
  const virusStartingPositionTwo = 491
  const virusStartingPositionThree = 459
  const virusStartingPositionFour = 518
  const rollPositionOne = 169
  const rollPositionTwo = 194
  const rollPositionThree = 729
  const rollPositionFour = 754

  let pacCurrentPosition = 742 //variable to keep track of current position
  let virusCurrentPositionOne = 462 //variable to keep track of virus one
  let timer //timer for ghost movement for intervals as whack a pika demo
  let totalVirus = 1 //variable settign current total virus count for virus movement below

  // ! MAKE A GRID -------------------------------------------------------------------------------------

  // function, createGrid which takes one parameter, invoked the fucntion below passing in value of current position
  // includes a loop to create the cells relevant to cellCount variable mentioned above
  // tells the function to create a new element for each loop and save to a variable called cell
  // tells the function to append each new element to a class of .grid to its parents of grid
  // pushes each element to its parent (grid)

  function createGrid(pacStartingPosition) {
    for (let i = 0; i < layout.length; i++) {
      const cell = document.createElement('div')
      cellCount.textContent = i
      grid.appendChild(cell)
      cells.push(cell)

      //2nd part of the function loops through the array adding the styling for the maze. If statement which checks if the maze array current index === 1 and if condition is true it will add the class 'black' which will style the maze.
      //MAZE
      if (layout[i] === 0) {
        cells[i].classList.add('virushome')
      }
      if (layout[i] === 1) {
        cells[i].classList.add('black')
      }
      if (layout[i] === 2) {
        cells[i].classList.add('edges')
      }
      if (layout[i] === 3) {
        cells[i].classList.add('path')
      }
      if (layout[i] === 4) {
        cells[i].classList.add('doors')
      }
      if (layout[i] === 5) {
        cells[i].classList.add('lives')
      }
      if (layout[i] === 6) {
        cells[i].classList.add('roll')
      }
    }
    // invoking the addPac function, whichever number is passed into its paratmeters the player will start at. We pass pacStartingPosition which is === pacCurrentPosition as we invoke it in createGrid below.
    // also invoked are all elements that will be on the board which relate to positions mentioned in variables above.
    addPac(pacStartingPosition)
    addVirus1(virusStartingPositionOne)
    addVirus2(virusStartingPositionTwo)
    addVirus3(virusStartingPositionThree)
    addVirus4(virusStartingPositionFour)
    addRoll1(rollPositionOne)
    addRoll2(rollPositionTwo)
    addRoll3(rollPositionThree)
    addRoll4(rollPositionFour)
  }

  //CREATE MAZE - maze is put into an array to create its layout. This is then used within the create grid function to create the grid which matches the cell position to the maze position
  // 1 = black, 2 = edge, 3 = path, 4 = door, 5 = lives

  const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                  2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
                  2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2,
                  2, 6, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 6, 2,
                  2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2,
                  2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
                  2, 3, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 3, 2,
                  2, 3, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 3, 2,
                  2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2,
                  2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2,
                  1, 1, 1, 1, 1, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 2, 3, 2, 2, 3, 2, 2, 2, 4, 4, 2, 2, 2, 3, 2, 2, 3, 2, 1, 1, 1, 1, 1,
                  2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2,
                  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                  2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2,
                  1, 1, 1, 1, 1, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 1, 1, 1, 1, 1,
                  2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2,
                  2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
                  2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2,
                  2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2,
                  2, 6, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 6, 2,
                  2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2,
                  2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2,
                  2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2,
                  2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2,
                  2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2,
                  2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
                  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                  1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  // invoking createGrid and passing in value of what currentPosition is. Current position is passed as JavaScript reloads the grid after every turn. 
  createGrid(pacCurrentPosition)
  // ? Question - why does createGrid need to be invoked after the maze array if it's global?

  // ! -------------------------------------------------------------------------------------------------
  // ? ADD & REMOVE ELEMENTS TO THE GRID ---------------------------------------------------------------
  //function is saying, the cells at the position mentioned in the variable above, add a class list of (example pacClass) which has been assigned the class for the player in css
  function addPac(position) {
    cells[position].classList.add(pacClass)
  }
  function addVirus1(position) {
    cells[position].classList.add(virusClass)
  }
  function addVirus2(position) {
    cells[position].classList.add(virusClass)
  }
  function addVirus3(position) {
    cells[position].classList.add(virusClass)
  }
  function addVirus4(position) {
    cells[position].classList.add(virusClass)
  }
  function addRoll1(position) {
    cells[position].classList.add(rollClass)
  }
  function addRoll2(position) {
    cells[position].classList.add(rollClass)
  }
  function addRoll3(position) {
    cells[position].classList.add(rollClass)
  }
  function addRoll4(position) {
    cells[position].classList.add(rollClass)
  }

  //REMOVE PAC
  //function is saying whichever position the cell is in, if it's class is pacClass remove this.
  function removePac(position) {
    cells[position].classList.remove(pacClass)
  }
  function removeVirus(position) {
    cells[position].classList.remove(virusClass)
  }

  //? --------------------------------------------------------------------------------------------------
  //! PLAYER MOVEMENT ----------------------------------------------------------------------------------  
  //? Movement not correct since changing shape from a square, need to have a think what conditons should be for a rectangle or should movement be based on class?
  //? How does it work with the function running? how many times? everytime a keycode conditon is met?

  //MOVE PAC
  function handleKeyUpForPlayerMovement(event) {
    removePac(pacCurrentPosition)
    const horizontalPosition = pacCurrentPosition % width
    const verticalPosition = Math.floor(pacCurrentPosition / width)
    switch (event.keyCode) {
      //move right takes the horizontal position pac is in which is worked out by using the remainder operator on pacs current position % width (example if the cell is 11, remainder would be 11 as width(12) doesn't fit into 11. By default all numbers on the right of the board will have a remainder of 11) A right move can only be made when horiztonal position is less than width minus 1 (11) as cells on the far right of the board will always be equal to 11 the if statement doesn't run
      case 39: //arrow right
        if (horizontalPosition < width - 1 && cells[pacCurrentPosition + 1].classList.contains('path') || cells[pacCurrentPosition + 1].classList.contains('noDotPath') || cells[pacCurrentPosition - width].classList.contains('roll')) pacCurrentPosition++
        cells[pacCurrentPosition].setAttribute('class', 'noDotPath')
        break
      //move left takes the horizontal position pac is in which is worked out by using thr remainder operator on pacs current position % width (example if the cell is 0 or 12, the remainder would be 0 for both as there is nothing left after its been divided by 12. This is passed to the value of horizontal position when the left key is pressed. The if statement will only run if the cell number is not divisible by 12 and by default all numbers on the left of the board are)
      case 37: //arrow left
        if (horizontalPosition > 0 && cells[pacCurrentPosition - 1].classList.contains('path') || cells[pacCurrentPosition - 1].classList.contains('noDotPath') || cells[pacCurrentPosition - width].classList.contains('roll'))
          pacCurrentPosition--
        cells[pacCurrentPosition].setAttribute('class', 'noDotPath')
        break
      //move up takes pacs current position and is divided by width (example if the cell number is 1, the vertical position woudld be 0.08 which we use math.floor on to round down to 0). This is passed to the if statement where the condition only runs when the vertical position is greater than 0. By default all the cell positions at the top of the grid will be less than 1 which is rounded down to 0.  
      case 38: //arrow up
        if (verticalPosition > 0 && cells[pacCurrentPosition - width].classList.contains('path') || cells[pacCurrentPosition - width].classList.contains('noDotPath') || cells[pacCurrentPosition - width].classList.contains('roll'))
          pacCurrentPosition -= width
        cells[pacCurrentPosition].setAttribute('class', 'noDotPath')
        break
      //move down takes pacs current position and is divided again by width (example if the cell position is 132 this would equal 11). This is again passed to the if statement where the condition to move down is if the vertical position(11) is less than width -1 (11) as the numbers are the same pac won't move down. By default all the numbers on the bottom will be rounded down to 11 so the condition is never met to run the movememt.
      case 40: //arrow down
        if (verticalPosition < width + 7 && cells[pacCurrentPosition + width].classList.contains('path') || cells[pacCurrentPosition + width].classList.contains('noDotPath') || cells[pacCurrentPosition - width].classList.contains('roll'))
          pacCurrentPosition += width
        cells[pacCurrentPosition].setAttribute('class', 'noDotPath')
        break
      default:
        console.log('INVALID KEY')
    }

    addPac(pacCurrentPosition)
  }

  // ! ------------------------------------------------------------------------------------------------
  // * VIRUS RANDOMLY GENERATED MOVEMENT --------------------------------------------------------------

  // create an array for all possible moves the computer can make
  // select a move at random & assign to array
  // check if the next cell of the grid in that direction is a valid move
  // if valid move computer and change class to virus or if the move cointains a wall select another random move
  // ? function looping but not moving the virus multiple times, is this an issue in the function or startGame?
  function randomVirusMovement(virusCurrentPositionOne) {
    removeVirus(virusCurrentPositionOne)
    const moves = [1, +height, -1, -height]
    let move = moves[Math.floor(Math.random() * moves.length)]
    
    //change to not edge
    if (cells[virusCurrentPositionOne + move].classList.contains('path') || cells[virusCurrentPositionOne + move].classList.contains('noDotPath') || cells[virusCurrentPositionOne + move].classList.contains('roll') || cells[virusCurrentPositionOne + move].classList.contains('doors') || cells[virusCurrentPositionOne + move].classList.contains('black')) {
      virusCurrentPositionOne += move
      cells[virusCurrentPositionOne += move].setAttribute('class', 'virus')
      console.log(virusCurrentPositionOne)
    } else if (cells[virusCurrentPositionOne + move].classList.contains('edges')) {
      move = moves[Math.floor(Math.random() * moves.length)]
      console.log
    }
  }

  // randomVirusMovement(virusCurrentPositionOne)

  function startGame() {
    timer = setInterval(() => {
      if (totalVirus > 50) {
        endGame()
        return
      }
      totalVirus++
      console.log(totalVirus)
      randomVirusMovement(virusCurrentPositionOne)
    }, 500)
  }
  // DEMO-----------------------------------------------------------------------------------------------------------
  function endGame() {
    clearInterval(timer)
    window.alert('game-over')
  }

  // function startGame() {
  //   timer = setInterval(() => {
  //     if (totalVirus > 50) {
  //       endGame()
  //       return
  //     }
  //     totalVirus++
  //     removeVirus(virusCurrentPositionOne)
  //     virusCurrentPositionOne += 1
  //     addVirus1(virusCurrentPositionOne)
  //   }, 200)
  //   console.log(virusCurrentPositionOne)
  // }

  // function endGame() {
  //   clearInterval(timer)
  //   window.alert('game-over')
  // }


  // * ---------------------------------------------------------------------------------------------------
  // ? EVENT LISTENERS -----------------------------------------------------------------------------------

  // * Event listeners
  document.addEventListener('keyup', handleKeyUpForPlayerMovement)
  start.addEventListener('click', startGame)

  // ? ---------------------------------------------------------------------------------------------------
















































































































}


window.addEventListener('DOMContentLoaded', init)