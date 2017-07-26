import React, { Component } from 'react'

function Tile ({ row, column, data, dimension, image, onClick }) {
  const style = {
    width: dimension,
    height: dimension,
    'background-color': data && data.color,
    backgroundImage: data && `url(${data.image})`,
    backgroundSize: dimension
  }

  return (
    <div className={`grid-tile ${data ? 'has-content' : ''}`} data-col={column} data-row={row} style={style}>
    </div>
  )
}

class Grid extends Component {

  constructor (props) {
    super(props)
    this.changed = new Set()
  }

  onTouchEnd (event) {
    const len = this.changed.size
    // this.props.updateText(`buildWall({\n\tlength: ${this.changed.size}\n})`)
    
    this.props.updateText([`var length = ${len};`, 'buildWall(length);'])
    // this.props.updateText(`buildWall(${JSON.stringify({length: 2}, null, 2)})`)
    this.changed.clear()
  }

  onTouchMove (event) {
    let i
    const touches = event.targetTouches
    for (i = 0; i < touches.length; i++) {
      const touched = document.elementFromPoint(touches[i].pageX, touches[i].pageY)
      const row = touched && touched.getAttribute('data-row')
      const col = touched && touched.getAttribute('data-col')
      if (row && col) {
        this.props.updateGrid(row, col, { image: './stone-tile.png' })
        this.changed.add(`${row},${col}`)
      }
    }
  }

  render () {
    return (
      <div className='grid' onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
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
      </div>
    )
  }
}

export default Grid
