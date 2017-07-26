import _ from 'lodash'
import React, { Component } from 'react'
import DraggablePlayer from './draggable-methods'

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

    this.player = {
      name: 'spongebob',
      still: './spongebob-still.png',
      gif: './spongebob.gif'
    }

    this.state = {
      isDragging: false,
      grid: grid,
      playerPosition: {
        x: 0,
        y: 0
      },
      text: []
    }
  }

  updatePlayerPosition (relativeX, relativeY) {
    this.setState(({ playerPosition }) => ({
      playerPosition: {
        x: playerPosition.x + relativeX,
        y: playerPosition.y + relativeY
      }
    }))
  }

  setPlayerPosition (x, y) {
    this.setState(({ playerPosition }) => ({
      playerPosition: {
        x: x,
        y: y
      }
    }))
  }

  updatePlayerPositonTowardsTouch (touchX, touchY) {
    const increment = 10
    let playerX = this.state.playerPosition.x
    let playerY = this.state.playerPosition.y
    let differenceX = touchX - playerX
    let differenceY = touchY - playerY
    console.log('---------')
    console.log(playerX)
    console.log(playerY)
    console.log(touchX)
    console.log(touchY)
    console.log(differenceX)
    console.log(differenceY)
    if (Math.abs(differenceX) > Math.abs(differenceY)) {
      playerX = differenceX > 0 ? playerX + increment : playerX - increment
    } else {
      playerY = differenceY > 0 ? playerY - increment : playerY + increment
    }
    this.setPlayerPosition(playerX, playerY)
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
              movePlayerTowardsTouch={this.updatePlayerPositonTowardsTouch.bind(this)}
              updateGrid={this.updateGrid.bind(this)}
              updateText={this.updateText.bind(this)}
            />
          </div>
        </div>
        <div className='bottom-panel' style={{ height: `calc(100vh - ${percentHeightGrid}vw)` }}>
          <DraggablePlayer
            dimension={dimension}
            position={this.state.playerPosition}
            updatePosition={this.updatePlayerPosition.bind(this)}
            setPosition={this.setPlayerPosition.bind(this)}
            onStart={this.onStartDrag.bind(this)}
            onStop={this.onStopDrag.bind(this)}
            updateText={this.updateText.bind(this)}
            {...this.player}
          />
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
