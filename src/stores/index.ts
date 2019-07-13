import { observable, computed, action } from 'mobx'

class Timer {
  @observable start = Date.now()
  @observable current = Date.now()
  @observable number = 0

  @computed
  get elapsedTime() {
    return this.current - this.start + 'milliseconds'
  }

  @action
  tick() {
    this.current = Date.now()
  }

  @action
  changeNumber() {
    this.number++
  }
}

export default {
  Timer: new Timer()
}

export interface ITimer extends Timer {}
