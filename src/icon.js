import React, { Component } from 'react'
import Draggable from 'react-draggable';

class Icon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: this.props.still,
      isBeingDragged: false
    }

    this.hasBeenAdded = false
  }

  onStart () {
    this.props.onStart()
    this.setState({ isBeingDragged: true })
  }

  onStop () {
    this.props.onStop()
    this.setState({ image: this.props.gif, isBeingDragged: false })
    this.props.updateText(`${this.hasBeenAdded ? 'move' : 'add'}("${this.props.name}");`)
    this.props.playSoundEffect(this.props.audio && this.props.name)
    this.hasBeenAdded = true
  }

  render () {
    const style = { width: this.props.dimension, height: this.props.dimension }

    return (
      <div className={'icon' + (this.state.isBeingDragged ? ' is-being-dragged' : '')} style={style}>
        <img className='icon-placeholder' src={this.props.still} style={style}/>
        <Draggable defaultPosition={{x: 0, y: 0}}
          onStart={this.onStart.bind(this)}
          onStop={this.onStop.bind(this)}>
          <img src={this.state.image} className='icon-main-image' style={{ width: '100%', height: '100%' }}/>
        </Draggable>
      </div>
    )
  }
}

export default Icon
