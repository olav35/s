#!/usr/bin/env node
const ws = require('ws')

const url = process.argv[2]

if(url === undefined) {
  const program_name = require('path').basename(process.argv[1])
  console.error(`usage: ${program_name} url [payload]`)
  process.exitCode = 1
  return
}

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