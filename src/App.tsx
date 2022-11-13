import React from 'react';
import Form from './components/Form';
import DashBoard from './pages/DashBoard';
import { isLoginSelector, imgModalSelector } from './redux/loginSlice';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import AddImage from './components/AddImage';
function App() {
  const isLogin = useSelector(isLoginSelector);
  const imgModal = useSelector(imgModalSelector);

  return (
    <>
      {!isLogin && <Form />}
      {imgModal && <AddImage />}
      {isLogin && (
        <>
          <Navbar />
          <DashBoard />
        </>
      )}
    </>
  );
}

export default App;
