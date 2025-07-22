import {io} from "socket.io-client"

const socket=io("https://localhost:5000")

export default socket;