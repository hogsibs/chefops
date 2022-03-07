const negotiate = (context, _, connectionInfo) => {
  context.res.body = connectionInfo;
  context.done();
};
export default negotiate;
