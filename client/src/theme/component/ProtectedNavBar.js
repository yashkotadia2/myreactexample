import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

export default function ProtectedNavBar(){
    return(
        <>
            <Link className="nav-item nav-link" to="/chat">Chat</Link>
{/*             <Link className="nav-item nav-link" title="Favourites" to="/favourites"><i className="fa fa-heart" aria-hidden="true"></i></Link>
            <Link className="nav-item nav-link" title="Shopping Cart" to="/shopping-bag"><i className='fa fa-shopping-bag'></i></Link>
            <Link className="nav-item nav-link" title="Wallet Balance" to="/wallet"><i className='fa fa-dollar'></i></Link> */}
        </>
    );
}