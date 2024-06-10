// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
//initializeApp 함수를 호출함으로써, Firebase 서비스가 애플리케이션에 연결되고 초기화됩니다.
const app = initializeApp(firebaseConfig);
//getAuth 함수는 Firebase 인증 서비스를 초기화하고, 인증 서비스에 대한 참조를 반환합니다.
const auth = getAuth(app);
//GoogleAuthProvider는 Firebase 인증에서 제공하는 클래스 중 하나로,
//Google 계정을 사용한 인증을 처리하는 공급자를 설정합니다.
//new GoogleAuthProvider()를 호출하면 Google 인증 공급자 객체가 생성됩니다.
const provider = new GoogleAuthProvider();

// Google 로그인 함수
export async function Googlelogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Google login error", error);
    throw error;
  }
}

// 이메일로 회원가입 함수
export function SignupWithEmail(email, password) {
  console.log(email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ..
    });
}

// 이메일로 로그인 함수
export async function LoginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user; // 사용자 정보를 반환
  } catch (error) {
    console.error("Login error", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있게 함
  }
}

// 로그아웃 함수
export function logout() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

// 사용자 상태 변화 감지 함수
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, callback);
}
