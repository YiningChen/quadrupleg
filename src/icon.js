import React, { Component } from 'react'
import Draggable from 'react-draggable';

class Icon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: this.props.still
    }

    this.hasBeenAdded = false
  }

  onStopIcon () {
    this.setState({ image: this.props.gif })
    this.props.updateText(`${this.hasBeenAdded ? 'move' : 'add'}("${this.props.name}");`)
    this.hasBeenAdded = true
  }

  render () {
    const style = { width: this.props.dimension, height: this.props.dimension }

    return (
      <div style={style}>
        <img className='icon-placeholder' src={this.props.still} style={style}/>
        <Draggable defaultPosition={{x: 0, y: 0}} onStop={this.onStopIcon.bind(this)}>
          <img src={this.state.image} style={{ width: '100%', height: '100%' }}/>
        </Draggable>
      </div>
    )
  }
}

export default Icon