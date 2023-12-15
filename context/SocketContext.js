import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://192.168.1.103:4000", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.io.on("connect_error", (err) => {
      console.log(err.message);
    });

    newSocket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export function useSocket() {
  return useContext(SocketContext);
}
