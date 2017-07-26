import React, { Component } from 'react'

function Tile ({ row, column, data, dimension, image, onClick }) {
  const style = {
    width: `${dimension}vw`,
    height: `${dimension}vw`,
    'background-color': data && data.color
  }

  return (
    <div className='grid-tile' data-col={column} data-row={row} style={style}>
      {image && <img src={image} style={{ height: '99%', width: '99%' }} />}
    </div>
  )
}

class Grid extends Component {
  render () {
    return (
      <div className='grid' onTouchMove={event => {
        const touches = event.targetTouches
        let i
        for (i = 0; i < touches.length; i++) {
          const touched = document.elementFromPoint(touches[i].pageX, touches[i].pageY)
          const row = touched && touched.getAttribute('data-row')
          const col = touched && touched.getAttribute('data-col')
          row && col && this.props.updateGrid(row, col, { color: 'blue' })
        }
      }}>
        {this.props.grid.map((row, rowIndex) => (
          row.map((item, colIndex) => {
            return <Tile
              key={`${rowIndex},${colIndex}`}
              row={rowIndex}
              column={colIndex}
              data={this.props.grid[rowIndex][colIndex]}
              dimension={this.props.dimension}
              image={item.image}
              onClick={this.props.updateGrid} />
          })
        ))}
        <div className='character' ></div>
      </div>
    )
  }
}

export default Grid
