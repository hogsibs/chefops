import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

let connection;
let startConnectionPromise;
const getSignalRConnection = async () => {
  if (!connection) {
    connection = new HubConnectionBuilder()
      .withUrl("http://localhost:7071/api/", { withCredentials: false })
      .configureLogging(LogLevel.Information)
      .build();
    startConnectionPromise = connection.start();
  }
  await startConnectionPromise;
  return connection;
};
export default getSignalRConnection;
