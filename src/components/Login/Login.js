// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFBSignIn, handleGoogleSignIn, handleSignOut, initializeFramework, signInWithEmailAndPassword } from "./loginManager";

// firebase.initializeApp(firebaseConfig);



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false, 
  });

  initializeFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const FBSignIn = () => {
      handleFBSignIn()
      .then(res => {
        handleResponse(res, true);

      })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }
  

  //formSubmit
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, false);
      })
    }
    if (!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);

      })
    }
    e.preventDefault();
  };


  //update user
  

  //onBlur
  const handleBlur = (e) => {
    let isSymbolValid = true;
    if (e.target.name === "email") {
      isSymbolValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6;
      const isPassHasNum = /\d{1}/.test(e.target.value);
      isSymbolValid = isPassValid && isPassHasNum;
    }
    if (isSymbolValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };


  //FBSignIn 
  

  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign-Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign-In</button>
      )}
      <br/>
      <button onClick={FBSignIn}>Sign in using facebook</button>
      {user.isSignedIn && (
        <div>
          <p>welcome {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>our own authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New user sign up</label>
      {/* <p>name: {user.name}</p>
      <p>email: {user.email}</p>
      <p>password: {user.password}</p> */}
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Name" />}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Password"
        />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {
        user.success && <p style={{ color: "Green" }}>User {newUser ? 'created' :'logged in'} successfully</p>

      }
    </div>
  );
}

export default Login;
