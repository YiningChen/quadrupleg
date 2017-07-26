import _ from 'lodash'
import React, { Component } from 'react'
import DraggableMethodsContainer from './draggable-methods'

import Draggable from 'react-draggable';

import Grid from './grid'
import CodePanel from './code-panel'
import './App.css'

class Icon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: this.props.still
    }
  }

  onStopIcon () {
    this.setState({ image: this.props.gif })
    this.props.onStopIcon(this.props.name)
  }

  render () {
    return (
      <div>
        <img className='icon-placeholder' src={this.props.still}/>
        <Draggable defaultPosition={{x: 0, y: 0}} onStop={this.onStopIcon.bind(this)}>
          <div style={{ width: this.props.dimension, height: this.props.dimension }}>
            <img src={this.state.image} style={{ width: '100%', height: '100%' }}/>
          </div>
        </Draggable>
      </div>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)
      /*
    const url = 'https://cdn.dribbble.com/users/375867/screenshots/2001532/crocodile-dragon-frog-running-and-jumping-game-character-sprite-sheets-game-asset-game-art-game-design-cartoon.jpg'
      return {
            background: null,
            actions: [],
            image: (rowIndex === 2 && colIndex === 2) && url
          }
      */
    const grid = _.range(props.rows).map((rowIndex) => (
      _.range(props.columns).map((colIndex) => 0)
    ))

    this.items = [{
      name: 'patrick',
      still: './patrick-still.png',
      gif: './patrick.gif'
    }]

    this.state = {
      grid: grid,
      text: []
    }
  }

  updateText (text) {
    this.setState((prevState) => ({
      text: prevState.text.concat(text)
    }))
  }

  updateGrid (row, column, data) {
    this.setState((state) => {
      state.grid[row][column] = data
    })
  }

  loopThroughGrid (method) {
    this.state.grid.map((row, rowIndex) => (
      row.map((item, colIndex) => {
        method(item, rowIndex, colIndex)
      })
    ))
  }

  onStopIcon (iconType) {
    this.updateText(`add("${iconType}");`)
  }

  render () {
    const { percentWidthGrid, columns, rows } = this.props
    const percentWidthTile = percentWidthGrid / columns
    const percentHeightGrid = percentWidthTile * rows
    const dimension = `${percentWidthTile}vw`

    return (
      <div className='App'>
        <div style={{ height: `${percentHeightGrid}vw` }}>
          <div className='panel' style={{width: `${100 - percentWidthGrid}vw`}}>
            <CodePanel text={this.state.text} />
          </div>
          <div className='panel' style={{width: `${percentWidthGrid}vw`}}>
            <Grid
              grid={this.state.grid}
              dimension={dimension}
              updateGrid={this.updateGrid.bind(this)}
              updateText={this.updateText.bind(this)}
            />
          </div>
        </div>
        <div className='bottom-panel' style={{ height: `calc(100vh - ${percentHeightGrid}vw)` }}>
          {this.items.map((item, index) => (
            <Icon key={index} dimension={dimension} onStopIcon={this.onStopIcon.bind(this)}  {...item}/>
          ))}
        </div>
      </div>
    )
  }
}

export default App
