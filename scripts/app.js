/* eslint-disable indent */

function init() {

  //VARIABLES ------------------------------------------------------------------------------------------

  const grid = document.querySelector('.grid')
  const totalScore = document.querySelector('.score')
  const audio = document.getElementById('audio')

  const width = 28
  const height = 36
  const cells = []

  const start = document.querySelector('.start')
  const pacClass = 'pac'

  let score = 0
  let pacCurrentPosition = 742 //variable to keep track of current position
  let pacStartingPosition = pacCurrentPosition

  // ! MAKE A GRID -------------------------------------------------------------------------------------

// function, createGrid which takes one parameter (pacStartingPosition)
  function createGrid(pacStartingPosition) {
    // includes a loop to create the cells relevant to cellCount variable mentioned above
    for (let i = 0; i <  cellCount.length; i++) {
    // tells the function to create a new element for each loop and save to a variable called cell
      const cell = document.createElement('div')
// tells the function to append each new element to a class of .grid to its parents of grid
      grid.appendChild(cell)
      // pushes each element to its parent (grid)
      cells.push(cell)
      // 2nd part of the function loops through the array adding the styling for the layout. If statement, which checks if the layout array current index === 1 and if condition is true, it will add the class 'black' etc. 
      //Layout
      if (cellCount[i] === 0) {
        cells[i].classList.add('virusHome')
      }
      if (cellCount[i] === 1) {
        cells[i].classList.add('black')
      }
      if (cellCount[i] === 2) {
        cells[i].classList.add('edges')
      }
      if (cellCount[i] === 3) {
        cells[i].classList.add('path')
      }
      if (cellCount[i] === 4) {
        cells[i].classList.add('doors')
      }
      if (cellCount[i] === 5) {
        cells[i].classList.add('lives')
      }
      if (cellCount[i] === 6) {
        cells[i].classList.add('roll')
      }
    }
    // invoking the addPac function, whichever number is passed into its paratmeters, the player will start at. We pass pacStartingPosition which is === pacCurrentPosition as we invoke it in createGrid below.
    addPac(pacStartingPosition)
  }

  //CELL COUNT - cell count is put into an array to create its layout. This is then used within the create grid function to create the grid which matches the cell position to the maze position
  // 0 = middle rec 1 = black, 2 = edge, 3 = path, 4 = door, 5 = lives 6 = roll

  const cellCount = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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
    rollEaten()
    endGame()
    win()
  }

  // ! ------------------------------------------------------------------------------------------------

    function rollEaten() {
      if (cells[pacCurrentPosition].classList.contains('roll')) {
          score += 100
          totalScore.innerHTML = score
          cells[pacCurrentPosition].classList.remove('roll')
          viruses.forEach(virus => virus.isScared = true)
      }
    }

  // * VIRUS RANDOMLY GENERATED MOVEMENT --------------------------------------------------------------

  //New movement for virus put into a Class. Generic virus class created for all properties needed
class Virus {
  constructor(className, startPosition, speed) {
    this.className = className //if not included the virus class will multiply when moving around the game
    this.startPosition = startPosition //sets the start position for viruses
    this.isScared = false //boolean true/false to declare if roll has been eaten and toggles class changes
    this.speed = speed //sets the speed of the indivudal viruses
    this.currentPosition = startPosition // to keep track of viruses current cell position
    this.timerId = 500 //unsure on how it works console.log prints 1/2/3/4
  }
}

//4 viruses created for the game
viruses = [
  new Virus('virus', 113, 250), //properties class, startposition and speed in m/s
  new Virus('virus', 138, 250),
  new Virus('virus', 897, 250),
  new Virus('virus', 922, 250)
]

//code to add viruses to the board which states for each virus go through and add their current cell a class of virus which is set in css to contain the virus image
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
  
  const moves = [-1, +1, +width, -width]
  let move = moves[Math.floor(Math.random() * moves.length)]

virus.timerId = setInterval(function() {
  // console.log(virus.timerId)
  if  (!cells[virus.currentPosition + move].classList.contains('virus') &&
        !cells[virus.currentPosition + move].classList.contains('edges') ) {
          //remove the virus classes
          cells[virus.currentPosition].classList.remove(virus.className)
          cells[virus.currentPosition].classList.remove('scared-virus')
          //move into that space
          virus.currentPosition += move
          cells[virus.currentPosition].classList.add(virus.className, 'virus')
// if the virus is scared, remove virus class and add scared-virus to change display of virus
        if (virus.isScared === true) {
          cells[virus.currentPosition].classList.remove('virus')
          cells[virus.currentPosition].classList.add('scared-virus')
        }
        //if the virus is scared and the virus current position contains pac, remove the virus class from display so it looks as though the virus has been eaten
        if (virus.isScared === true && cells[virus.currentPosition].classList.contains('pac')) {
          cells[virus.currentPosition].classList.remove(virus.className, 'virus', 'scared-virus')
          
        //plus 1000 to the score
          score += 1000
        }
  
      //else find a new random direction ot go in
      } else move = moves[Math.floor(Math.random() * moves.length)]
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
    if (cells[pacCurrentPosition].classList.contains('virus')) {
      window.alert('game-over')
    }
  }

  function win() {
    if (score > 5000) {
      window.alert(`Congratulations, you scored over 5000!`)
    }
  }

  function playAudio(event) {
    console.log(event.target)

    if (event.target.innerHTML === 'Start Game') {
      audio.src = 'styles/pacman_beginning.wav'
      audio.play()
    } 
    if (event.keyCode === 39 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 40) {
      audio.src = 'styles/pacman_chomp.wav'
      audio.play()
    }
    if (cells[pacCurrentPosition].classList.contains('virus')) {
      audio.src = 'styles/pacman_death 2.wav'
      audio.play()
    }
  }


  // * ---------------------------------------------------------------------------------------------------
  // ? EVENT LISTENERS -----------------------------------------------------------------------------------

  // * Event listeners
  document.addEventListener('keydown', handleKeyUpForPlayerMovement)
  start.addEventListener('click', playAudio)
  document.addEventListener('keyup', playAudio)

  // ? ---------------------------------------------------------------------------------------------------

}


window.addEventListener('DOMContentLoaded', init)