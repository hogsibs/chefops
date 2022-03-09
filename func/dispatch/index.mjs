const dispatch = async (context, invocation) => {
  context.log(
    `Received ${context.bindingData.action} from ${invocation.ConnectionId}`
  );
};
export default dispatch;
