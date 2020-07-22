#!/usr/bin/env node
const ws = require('ws')

const url = process.argv[2]
const WebSocket = new ws(url)
const stdin = process.openStdin()

WebSocket.onopen = () => {
  if(process.argv[3]){
    WebSocket.send(process.argv[3])
 }
 
 stdin.addListener("data", async (data) => {
   const input = data.toString().trim()
   WebSocket.send(input)
   console.log('SENT---------------------------------------------------------------------------')
 })
 
 WebSocket.onmessage = ({data}) => {
   try {
     console.log(JSON.parse(data))
   } catch {
     console.log(data)
   }
   console.log('RECEIVED-----------------------------------------------------------------------')
 }
 
 WebSocket.onclose = () => {
   console.error('Connection closed')
   process.exit()
 }
}