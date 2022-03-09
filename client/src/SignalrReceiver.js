import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

const SignalrReceiver = () => {
  const [receivedMessages, dispatchMessage] = useReducer(
    (messages, message) => [...messages, message],
    []
  );
  const connection = useMemo(
    () =>
      new HubConnectionBuilder()
        .withUrl("http://localhost:7071/api/", { withCredentials: false })
        .configureLogging(LogLevel.Information)
        .build(),
    []
  );
  const [connectionLive, setConnectionLive] = useState(false);
  useEffect(() => {
    connection.on("newMessage", dispatchMessage);
    connection.start().then(() => {
      setConnectionLive(true);
    });
    return () => {
      connection.stop();
    };
  }, [connection]);
  const reportGas = useCallback(
    () => connection.invoke("dispatch", "Melody has really bad gas 😔"),
    [connection]
  );
  return (
    <>
      {receivedMessages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      {connectionLive ? <button onClick={reportGas}>Report Gas</button> : null}
    </>
  );
};
export default SignalrReceiver;
