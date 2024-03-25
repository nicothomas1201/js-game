// import { MeshBasicMaterial, BoxGeometry, Mesh } from 'three'
// import { createCube } from './index'

// export const chessBoard = (boardSize: number = 8, squareSize: number = 1) => {
//   // const whiteMaterial = new MeshBasicMaterial({ color: 0xffffff })
//   // const blackMaterial = new MeshBasicMaterial({ color: 0x000000 })
//   const squares = []

//   for (let i = 0; i < boardSize; i++) {
//     for (let j = 0; j < boardSize; j++) {
//       // const squareGeometry = new BoxGeometry(squareSize, 0.1, squareSize)
//       // const squareMaterial = (i + j) % 2 === 0 ? whiteMaterial : blackMaterial
//       // const square = new Mesh(squareGeometry, squareMaterial)
//       const cube = createCube()
//       squares.push(cube)
//       // square.position.set(i * squareSize, 0, j * squareSize)
//       // boardGroup.add(square)
//     }
//   }

//   return squares
// }
