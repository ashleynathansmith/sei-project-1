/* eslint-disable indent */

function init() {

  //VARIABLES ------------------------------------------------------------------------------------------

  const grid = document.querySelector('.grid')
  const totalScore = document.querySelector('.score')

  const width = 28
  const height = 36
  const cellCount = width * height
  const cells = []

  const start = document.querySelector('.start')
  const pacClass = 'pac'
  const rollClass = 'roll'
  const virusClass = 'virus'
  // const virusStartingPositionOne = 120 //fine
  let totalVirus = 1
  let score = 0

  let pacCurrentPosition = 742 //variable to keep track of current position
  const pacStartingPosition = pacCurrentPosition
  // let virusCurrentPositionOne = 120
  let timer //timer for ghost movement for intervals as whack a pika demo

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
        cells[i].classList.add('virusHome')
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
    // addVirus(virusStartingPositionOne)
    
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
  //REMOVE PAC
  //function is saying whichever position the cell is in, if it's class is pacClass remove this.
  function removePac(position) {
    cells[position].classList.remove(pacClass)
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
      case 39: //arrow right
        if (horizontalPosition < width - 1 && !cells[pacCurrentPosition + 1].classList.contains('edges')) 
        pacCurrentPosition++
        break
      case 37: //arrow left
        if (horizontalPosition > 0 && !cells[pacCurrentPosition - 1].classList.contains('edges'))
          pacCurrentPosition--
        break
      case 38: //arrow up
        if (verticalPosition > 0 && !cells[pacCurrentPosition - width].classList.contains('edges'))
          pacCurrentPosition -= width
        break
      case 40: //arrow down
        if (verticalPosition < width + 4 && !cells[pacCurrentPosition + width].classList.contains('edges'))
          pacCurrentPosition += width
        break
      default:
        console.log('INVALID KEY')
    }

    addPac(pacCurrentPosition)
    addScore()
    
  }

  // ! ------------------------------------------------------------------------------------------------

    function rollEaten() {
      if (cells[pacCurrentPosition].classList.contains('roll')) {
        if (cells[pacCurrentPosition].classList.contains('roll')) {
          score += 100
          totalScore.innerHTML = score
          cells[pacCurrentPosition].classList.remove('roll')
      }
    }
  }

  // * VIRUS RANDOMLY GENERATED MOVEMENT --------------------------------------------------------------

  //New movement for virus put into a Class. Generic virus class created for properties needed
class Virus {
  constructor(className, startPosition, speed) {
    this.className = className
    this.startPosition = startPosition
    this.speed = speed
    this.currentPosition = startPosition
    this.timerId = 500
  }
}

//4 viruses created for the game
viruses = [
  new Virus('virus', 113, 250),
  new Virus('virus', 138, 250),
  new Virus('virus', 897, 250),
  new Virus('virus', 922, 250)
]

//code to add viruses to the board which states for each virus go through each one and add their current index a class of virus which is set in css to contain the virus image
viruses.forEach(virus => {
  cells[virus.currentPosition].classList.add('virus')
})

//code which moves all viruses seperatly using logic below. Again runs through each virus using for each loop and invokes the moveVirus function
viruses.forEach(virus => moveVirus(virus))

 // create an array for all possible moves the computer can make
  // select a move at random & assign to array
  // check if the next cell of the grid in that direction is a valid move
  // if valid move computer and change class to virus or if the move contains a wall select another random move

function moveVirus(virus) {
  
  const directions = [-1, +1, +width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

virus.timerId = setInterval(function() {
  if  (!cells[virus.currentPosition + direction].classList.contains('virus') &&
        !cells[virus.currentPosition + direction].classList.contains('edges') ) {
          //remove the ghosts classes
          cells[virus.currentPosition].classList.remove(virus.className)
          cells[virus.currentPosition].classList.remove('virus')
          //move into that space
          virus.currentPosition += direction
          cells[virus.currentPosition].classList.add(virus.className, 'virus')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]
      endGame()
}, virus.speed)
}

//OLD CODE FOR VIRUS MOVEMENT SET TO ONE SPECIFC VIRUS
  // function randomVirusMovement(virusCurrentPositionOne) {
  //   const moves = [+1, +width, -1, -width]
  //   let move = moves[Math.floor(Math.random() * moves.length)]
  //   console.log(move)
  //   console.log(virusCurrentPositionOne)
  //   if (!cells[virusCurrentPositionOne + move].classList.contains('edges')) {
  //     removeVirus(virusCurrentPositionOne)
  //     virusCurrentPositionOne += move
  //     cells[virusCurrentPositionOne].classList.add('virus')
  //   } else {
  //     move = moves[Math.floor(Math.random() * moves.length)]
  //   }
  // }

//SCORE
  function addScore() {
    if (cells[pacCurrentPosition].classList.contains('path')) {
      score += 10
      totalScore.innerHTML = score
      cells[pacCurrentPosition].classList.remove('path')
    }
    }

  function endGame() {
    if (cells[pacCurrentPosition].className.contains('pac') && cells[this.virus.currentPosition].className.contains('virus')) {
      clearInterval(timer)
      window.alert('game-over')
    }
  }

  // * ---------------------------------------------------------------------------------------------------
  // ? EVENT LISTENERS -----------------------------------------------------------------------------------

  // * Event listeners
  document.addEventListener('keyup', handleKeyUpForPlayerMovement)
  start.addEventListener('click', startGame)

  // ? ---------------------------------------------------------------------------------------------------
















































































































}


window.addEventListener('DOMContentLoaded', init)