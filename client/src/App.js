import Footer from './theme/component/Footer';
import App_Routes from './theme/routes/App_Routes';
import Navbar from './theme/component/Navbar';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './theme/style_sheet/main.scss';



function App() {

  const logInChe = useSelector(state => state.user.isLoggedIn);

  return (
  <>
      <div className="App">
          <Navbar logInFlag={logInChe}/>
          <App_Routes/>
          <Footer/>
      </div>
  </>
  );
}

export default App;
