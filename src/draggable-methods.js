import React from 'react'
import Draggable from 'react-draggable'
import Icon from './icon'

class DraggablePlayer extends Icon {
  onDrag (event, pos) {
    this.setState((prevState) => ({
      x: prevState.x + pos.deltaX,
      y: prevState.y + pos.deltaY
    }))
  }

  render () {
    const { still, dimension, position, updatePosition, setPosition } = this.props
    const style = { width: dimension, height: dimension }
    return (
      <div style={style}>
        <img className='icon-placeholder' src={still} style={style} />
        <Draggable position={position} onDrag={(event, pos) => updatePosition(pos.deltaX, pos.deltaY)} onStart={() => this.onStart()} onStop={() => {
          this.onStop()
        }}>
          <img src={this.state.image} style={{ width: '100%', height: '100%' }} />
        </Draggable>
      </div>
    )
  }
}
export default DraggablePlayer
