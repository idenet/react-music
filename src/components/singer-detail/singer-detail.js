import React, { Component } from 'react'

// d动画
import { CSSTransition } from 'react-transition-group'

//子组件
import MusicList from 'components/music-list/music-list'

// api
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'

//util
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

// redux
import { connect } from 'react-redux'

@connect(state => state, null)
export default class SingerDetail extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      songList: []
    }
  }
  componentDidMount() {
    this.setState({
      show: true
    })
    let { id } = this.props.singer
    this._getSingerDetail(id)
  }
  _getSingerDetail(id) {
    getSingerDetail(id).then(res => {
      if (res.code === ERR_OK) {
        processSongsUrl(this._mormalizeSongs(res.data.list)).then(songs => {
          this.setState({
            songList: songs
          })
        })
      }
    })
  }
  _mormalizeSongs(list) {
    let ret = []
    list.forEach(item => {
      let { musicData } = item
      if (isValidMusic(musicData)) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
  render() {
    let { id, name, avatar } = this.props.singer
    if (!id) {
      this.props.history.goBack()
      return null
    }
    return (
      <CSSTransition in={this.state.show} timeout={300} classNames="fade">
        <MusicList title={name} bgImage={avatar} songs={this.state.songList} />
      </CSSTransition>
    )
  }
}
