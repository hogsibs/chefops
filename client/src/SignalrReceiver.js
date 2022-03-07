import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useReducer } from "react";

const SignalrReceiver = () => {
  const [receivedMessages, dispatchMessage] = useReducer(
    (messages, message) => [...messages, message],
    []
  );
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:7071/api/")
      .configureLogging(LogLevel.Information)
      .build();
    connection.on("newMessage", dispatchMessage);
    connection.start();
    return () => {
      connection.stop();
    };
  }, []);
  return (
    <>
      {receivedMessages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </>
  );
};
export default SignalrReceiver;
