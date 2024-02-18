import {createContext} from "react";
import socketIOClient, {io} from "socket.io-client";
import {action, makeAutoObservable, observable} from "mobx";
import {IFlight} from "../../types/types";

class SocketIoStore {
    io = io();
    @observable messages: IFlight[] = [];
    @observable isConnected: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    connect() {
        this.io = socketIOClient("http://localhost:4963/", {
            transports: ["websocket"],
        });
        this.io.on("flight-update", (data) => {
            this.handleMessage(data);
        });
        this.io.on("connected", () => {
            this.isConnected = true;
        });

    }

    @action
    handleMessage(message: IFlight) {
        this.messages.push(message);
    }

    disconnect() {
        this.io.disconnect();
        console.log("connection closed")
    }
}

const websocketStore = new SocketIoStore();
export default websocketStore;

export const SocketStoreContext = createContext(websocketStore);
