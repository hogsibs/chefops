const negotiate = async (context, _, connectionInfo) => {
  context.res.body = connectionInfo;
};
export default negotiate;
