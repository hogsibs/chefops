const negotiate = (context, _, connectionInfo) => {
  context.res.body = connectionInfo;
};
export default negotiate;
