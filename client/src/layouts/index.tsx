import "../css/global.css";
import React, { useEffect, useState, createContext } from "react";
import { ThemeProvider } from "../components/Themeprovider";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import firebase from "firebase/app";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../firebase";

export const userContext = createContext({
  user: "",
  handlelogin: () => {},
  logout: () => {},
});

type ct = {
  admins: [] | string[];
  setadmins: (c: string) => void;
};

export const adminContext = createContext<ct>({
  admins: [],
  setadmins: () => {},
});
export const itemsContext = createContext<{
  items: myobj[];
  setitems: () => void;
}>({
  items: [],
  setitems: () => {},
});
type myobj = {
  itemName: string;
  total: string;
  available: number;
  pic: string;
  category: string;
};
function index({ children }: { children: React.ReactNode }) {
  const [admins, setadmins] = useState<string[]>([]);
  const provider = new GoogleAuthProvider();
  const [user, setuser] = useState("");
  const [items, setitems] = useState<Array<myobj>>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/items/").then((res) => {
      if (res.status === 200) {
        res.json().then((re) => {
          setitems(re);
        });
      }
    });
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      if (User) {
        auth.currentUser
          ?.getIdToken(true)
          .then(function (idToken) {
            const { displayName, email, photoURL } = User;
            if (email) {
              if (email.includes("iith.ac.in")) {
                setuser(email);
              } else {
                logout();
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setuser("");
      }
    });
    fetch("http://localhost:5000/api/admins/fetchadmins").then((res) =>
      res.json().then((data) => {
        setadmins(data);
      })
    );
  }, []);
  const handlelogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const token = credential ? credential.accessToken : undefined;
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        setuser("");
        // window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider>
      <userContext.Provider value={{ user, handlelogin, logout }}>
        <adminContext.Provider value={{ admins, setadmins }}>
          <itemsContext.Provider value={{ items, setitems }}>
            <div
              className="font-regular bg-lightbg dark:bg-darkbg 
          text-lightsecondary dark:text-darksecondary font-semibold min-h-[100vh]"
            >
              <Header />

              <div className="med:max-w-[70vw] md:max-w-[86vw] mx-auto max-w-[90vw]">
                {children}
              </div>

              <Footer />
            </div>
          </itemsContext.Provider>
        </adminContext.Provider>
      </userContext.Provider>
    </ThemeProvider>
  );
}

export default index;
