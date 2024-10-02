import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import Header from "./components/Header/Header"
import styles from './App.module.css'
import UserStoriesPage from "./pages/YourStorisPage/UserStoriesPage"

function App() {

  return (
    <div className={styles.page}>
      <Header />
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/userstories" element={<UserStoriesPage />} />
        <Route path="/bookmarks" element={<HomePage />} />
      </Routes>
      {/* <HomePage /> */}
    </div>
  )
}

export default App
