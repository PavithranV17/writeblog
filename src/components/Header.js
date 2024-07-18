import { Link, NavLink } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import BlogLogo from "../assets/logo.png";
import { useState } from "react";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("isAuth")) || false);

  function Login(){
    signInWithPopup(auth, provider).then((result) => {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
    })
  }

  function Logout(){
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem("isAuth", false);
  }

  return (
    <header>
      <Link to="/" className="logo">
        <img src={BlogLogo} alt="WriteNode Logo" />
        <span>WriteBlog</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className="link" end>Home</NavLink>
        { isAuth ? (
          <>
            <NavLink to="/create" className="link">Create</NavLink>
            <button onClick={Logout} className="auth"><i className="bi bi-box-arrow-right"></i> Logout</button> 
          </>                   
        ) : (
          <button onClick={Login} className="auth"><i className="bi bi-google"></i> Login</button>
        ) }        
      </nav>
    </header>
  )
}
