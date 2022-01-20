document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(grid.querySelectorAll('div'))
    const height = 20
    const width = 10
    let currentPosition = 4

    function control(e) {
        switch(e.keyCode) {
            case 39:
                moveRight()
                break
            case 38:
                rotate()
                break
            case 37:
                moveLeft()
                break
            case 40:
                moveDown()
                break
        }
    }
    document.addEventListener('keyup', control)

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1],
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let random = Math.floor(Math.random()*theTetrominoes.length)
    let currentRotation = 0
    let current = theTetrominoes[random][currentRotation]

    function draw() {
        current.forEach( index => (
            squares[currentPosition + index].classList.add('block')
        )) 
    }

    function undraw() {
        current.forEach(index => (
            squares[currentPosition + index].classList.remove('block')
        ))
    }

    function moveDown() {
        undraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
    }

    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -= 1
        }
        draw()
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1
        }
        draw()
    }

    function rotate() {
        undraw()
        currentPosition++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }
    

})