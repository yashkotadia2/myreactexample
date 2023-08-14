const Protected = ({ isLoggedIn, children }) => {

  if (!isLoggedIn) {
    return;
  }
  return children;
};
export default Protected;