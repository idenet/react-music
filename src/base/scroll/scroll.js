import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BScroll from 'better-scroll'

export default class componentName extends Component {
  static propTypes = {
    probeType: PropTypes.number, // 滚动方式
    click: PropTypes.bool, // 是否可以点击
    listenScroll: PropTypes.bool, // 监听滚动
    data: PropTypes.array, // 数据
    pullup: PropTypes.bool, // 下拉刷新
    beforeScroll: PropTypes.bool, // 滚动之前
    refreshDelay: PropTypes.number, //刷新
    direction: PropTypes.string,
    className: PropTypes.string,
    onScroll: PropTypes.func
  }

  static defaultProps = {
    probeType: 1,
    click: true,
    listenScroll: false,
    data: null,
    pullup: false,
    beforeScroll: false,
    refreshDelay: 20,
    direction: this.DIRECTION_V,
    className: 'scroll-wrapper',
    onScroll: f => f
  }
  constructor(props) {
    super(props)
    this.DIRECTION_H = 'horizontal'
    this.DIRECTION_H = 'horizontal'
    this.scrollWrapper = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.data !== nextProps.data) {
  //     console.log(nextProps)
  //     setTimeout(() => {
  //       this._refresh()
  //     }, this.props.refreshDelay)
  //   }
  // }
  componentWillUnmount() {
    this.scroll.off('scroll')
    this.scroll = null
  }
  _initScroll() {
    if (!this.scrollWrapper) {
      return
    }
    this.scroll = new BScroll(this.scrollWrapper.current, {
      probeType: this.props.probeType,
      click: this.props.click,
      eventPassthrough:
        this.props.direction === this.DIRECTION_V
          ? this.DIRECTION_H
          : this.DIRECTION_V
    })
    if (this.props.listenScroll) {
      this.scroll.on('scroll', pos => {
        this.props.onScroll(pos)
      })
    }
  }
  _disable() {
    this.scroll && this.scroll.disable()
  }
  _enable() {
    this.scroll && this.scroll.enable()
  }
  _refresh() {
    this.scroll && this.scroll.refresh()
  }
  _scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }
  _scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }

  render() {
    return (
      <div className={this.props.className} ref={this.scrollWrapper}>
        {this.props.children}
      </div>
    )
  }
}