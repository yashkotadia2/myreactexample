const Unprotected = ({ isLoggedIn, children }) => {

    if (isLoggedIn) {
      return;
    }
    else{
        return children;
    }
  };
  export default Unprotected;