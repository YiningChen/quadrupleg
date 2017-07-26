import React, { Component } from 'react';
import Draggable from 'react-draggable';

class DraggableMethod extends Component {
  state = {
    x: 0,
    y: 0
  }

  onDrag (event, pos) {
    this.setState((prevState) => ({
      x: prevState.x + pos.deltaX,
      y: prevState.y + pos.deltaY
    }))
  }

  render () {
    return (
      <Draggable position={this.state} onDrag={this.onDrag.bind(this)} onStop={() => this.setState({x:0, y:0})}>
        <div className='draggable-method'></div>
      </Draggable>
    )
  }
}

class DraggableMethodsContainer extends Component {
  render () {
    return (
      <div className='draggable-method-container'>
        <DraggableMethod />
      </div>
    )
  }
}

export default DraggableMethodsContainer
