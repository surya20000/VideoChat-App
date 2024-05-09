import { useState, createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const socketContext = createContext();

const socket = io("http://localhost:300");

const ContextProvider = ({ children }) => {
  const myVideo = useRef();

  const userVideo = useRef();

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState();
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
  };

  const callUser = () => {};

  const endCall = () => {};
};
