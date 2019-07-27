import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { sendMessageHtml, IOnMessage } from 'react-native-byron-highcharts'
import { WebView } from 'react-native-webview'

type IHChart = {
  navigation: NavigationScreenProp<{}>
}
class HChartScreen extends React.Component<IHChart> {
  public chart: WebView | null = null
  public componentDidMount() {}

  public onMessage(message: string) {
    try {
      const msg: IOnMessage = JSON.parse(message)
      switch (msg.event) {
        case 'initDone':
          if (this.chart) {
            this.chart.injectJavaScript(
              sendMessageHtml('updateChart', {
                series: [
                  {
                    data: [
                      [10, 143.8],
                      [23, 143],
                      [32, 111],
                      [33, 110],
                      [50, 88],
                      [66, 32.84]
                    ],
                    type: 'area'
                  },
                  { data: [[70, 8], [71, 18], [72, 28]], type: 'area' }
                ],
                xAxis: {
                  minPadding: 0,
                  maxPadding: 0,
                  lineColor: '#18222B',
                  gridLineColor: '#18222B',
                  plotLines: [
                    {
                      color: '#67717A',
                      value: 68,
                      width: 1,
                      label: {
                        text: '',
                        style: { color: '#D1D1D1' },
                        rotation: 90
                      }
                    }
                  ],
                  min: 62,
                  max: null
                }
              })
            )
          }
          break
        case 'updateDone':
          console.log('---updateDone-----')
          break
      }
    } catch (err) {
      console.log('---onError-----', err)
    }
  }

  public onLoadEnd() {
    if (this.chart) {
      this.chart.injectJavaScript(
        sendMessageHtml(
          'initChart',
          {
            chart: { type: 'area', backgroundColor: '#18222B' },
            title: { text: '', style: { color: '#D1D1D1' } },
            xAxis: {
              minPadding: 0,
              maxPadding: 0,
              lineColor: '#18222B',
              gridLineColor: '#18222B',
              labels: {},
              plotLines: [
                {
                  color: '#67717A',
                  value: 0,
                  width: 1,
                  label: { text: '', style: { color: '#D1D1D1' }, rotation: 90 }
                }
              ],
              min: 0,
              max: 0
            },
            yAxis: [
              {
                lineWidth: 1,
                gridLineWidth: 1,
                title: { text: '' },
                tickWidth: 1,
                lineColor: '#18222B',
                gridLineColor: '#18222B',
                tickLength: 5,
                tickPosition: 'inside',
                labels: { align: 'left', x: 8 }
              },
              {
                opposite: true,
                linkedTo: 0,
                lineWidth: 1,
                gridLineWidth: 0,
                lineColor: '#18222B',
                title: { text: '' },
                tickWidth: 1,
                tickLength: 5,
                tickPosition: 'inside',
                labels: { align: 'right', x: -8 }
              }
            ],
            legend: { enabled: false },
            plotOptions: {
              area: { fillOpacity: 0.2, lineWidth: 1, step: 'center' }
            },
            tooltip: {
              headerFormat:
                '<span style="font-size=10px;">价格: {point.key}</span><br/>',
              valueDecimals: 4
            },
            series: [
              { name: '买入累计', data: [], color: '#4C9478', type: 'area' },
              { name: '卖出累计', data: [], color: '#CC4A4A', type: 'area' }
            ],
            credits: { enabled: false }
          },
          true
        )
      )
    }
  }

  public render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ height: 360, backgroundColor: '#12151c' }}>
          <WebView
            style={{ flex: 1 }}
            originWhitelist={['*']}
            ref={ref => (this.chart = ref)}
            source={require('react-native-byron-highcharts/dist/index.html')}
            onMessage={evt => this.onMessage(evt.nativeEvent.data)}
            onLoadEnd={this.onLoadEnd.bind(this)}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    )
  }
}

export default HChartScreen
