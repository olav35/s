const ws = require('ws')

const url = process.argv[2]
const WebSocket = new ws(url)
const stdin = process.openStdin()

if(process.argv[3]){
  WebSocket.onopen = () => WebSocket.send(process.argv[3])
}

stdin.addListener("data", async (data) => {
  console.log('SENT---------------------------------------------------------------------------')
  const input = data.toString().trim()
  WebSocket.send(input)
})

WebSocket.onmessage = ({data}) => {
  console.log(JSON.parse(data))
  console.log('RECEIVED-----------------------------------------------------------------------')
}

WebSocket.onclose = ({data}) => {
  console.error('Connection closed')
  process.exit()
}