import _ from 'lodash'
import React, { Component } from 'react'

import Grid from './grid'
import Icon from './icon'
import CodePanel from './code-panel'
import './App.css'

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
    }, {
      name: 'poop',
      still: './poop.png',
      gif: './poop.png'
    }, {
      name: 'channing',
      still: './channinghead.png',
      gif: './channinghead.png'
    }, {
      name: 'poop',
      still: './ghost.png',
      gif: './ghost.png'
    }, {
      name: 'poop',
      still: './alien.png',
      gif: './alien.png'
    }]

    this.state = {
      isDragging: false,
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

  onStartDrag () {
    this.setState({ isDragging: true })
  }

  onStopDrag () {
    this.setState({ isDragging: false })
  }

  render () {
    const { percentWidthGrid, columns, rows } = this.props
    const percentWidthTile = percentWidthGrid / columns
    const percentHeightGrid = percentWidthTile * rows
    const dimension = `${percentWidthTile}vw`

    return (
      <div className={'App' + (this.state.isDragging ? ' is-dragging' : '')}>
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
            <Icon key={index}
              dimension={dimension}
              {...item}
              onStart={this.onStartDrag.bind(this)}
              onStop={this.onStopDrag.bind(this)}
              updateText={this.updateText.bind(this)}/>
          ))}
        </div>
      </div>
    )
  }
}

export default App
