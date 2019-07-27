//注册有小数点的数字键盘
CustomKeyboard.keyBoardAPI('numberKeyBoardWithDot')(class extends Component{
  render() {
      return (
          <CustomKeyboard.NumberKeyBoardView
              keyboardType={"number-pad"}
              disableOtherText={true}
              {...this.props}
          />
      )
  }
})