import { useLayoutEffect, useRef} from "react";
import io from "socket.io-client";

export const useWebsocket = ({connectAddress, condition = true}, options ={}) => {
  const socket = useRef(null);

  useLayoutEffect(() => {
    if (condition) {
      socket.current = io(connectAddress, options);
    } else {
      socket.current?.close();
    }
  }, [condition]);
  const sendMessage = (eventName, msg) => {
    socket.current.emit(eventName, msg);
  };
  const receiveMessage = (eventName, eventHandler) => {
    return socket.current.on(eventName, eventHandler);
  };
  return { sendMessage, receiveMessage };
};
