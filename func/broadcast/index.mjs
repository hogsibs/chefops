const broadcast = (context) => {
  context.bindings.signalRMessages = [newMessage("Hello, World!")];
  context.done();
};
export default broadcast;

const newMessage = (message) => ({
  target: "newMessage",
  arguments: [message],
});
