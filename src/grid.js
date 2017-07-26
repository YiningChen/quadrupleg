import _ from 'lodash'
import React, { Component } from 'react'

function Tile ({ dimension, image }) {
  const style = {
    width: `${dimension}px`,
    height: `${dimension}px`
  }

  return (
    <div className='grid-tile' style={style}>
      {image && <img src={image} style={{ height: '100%', width: '100%' }}/>}
    </div>
  )
}

class Grid extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className='grid'>
        {this.props.grid.map((row, rowIndex) => (
          row.map(({ image }, colIndex) => {
            return <Tile key={`${rowIndex},${colIndex}`} dimension={this.props.dimension} image={image}/>
          })
        ))}
      </div>
    )
  }
}

function GridContainer (props) {
}

export default Grid
