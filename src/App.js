import _ from 'lodash'
import React, { Component } from 'react'
import DraggableMethodsContainer from './draggable-methods'

import Draggable from 'react-draggable';

import Grid from './grid'
import CodePanel from './code-panel'
import './App.css'

function Icon (props) {
  return (
    <Draggable defaultPosition={{x: 0, y: 0}} onStop={props.onStopIcon}>
      <div style={{ width: '50px', height: '50px', background: 'red' }}></div>
    </Draggable>
  )
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

    this.items = [1, 2, 3]

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
    
    console.log('onStopIcon')
    this.updateText(`add("patrick")`)
  }

  render () {
    const { percentWidthGrid, columns, rows } = this.props
    const percentWidthTile = percentWidthGrid / columns
    const percentHeightGrid = percentWidthTile * rows

    return (
      <div className='App'>
        <div style={{ height: `${percentHeightGrid}vw` }}>
          <div className='panel' style={{width: `${100 - percentWidthGrid}vw`}}>
            <CodePanel text={this.state.text} />
          </div>
          <div className='panel' style={{width: `${percentWidthGrid}vw`}}>
            <Grid
              grid={this.state.grid}
              dimension={percentWidthTile}
              updateGrid={this.updateGrid.bind(this)}
              updateText={this.updateText.bind(this)}
            />
          </div>
        </div>
        <div className='bottom-panel' style={{ height: `calc(100vh - ${percentHeightGrid}vw)` }}>
          {this.items.map((item, index) => <Icon key={index} onStopIcon={this.onStopIcon.bind(this)}/>)}
        </div>
      </div>
    )
  }
}

export default App
