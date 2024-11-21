// import { useState } from 'react';
import './styles/main.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    const getServerData = () => {
      axios
        .get('/api/demo')
        .then((res: any) => {
          setServerData(res?.data);
        })
        .catch((err) => console.log(err));
    };

    getServerData();
  }, []);

  return (
    <>
      <div className="main">
        <a href="https://github.com/Book-Eating-Bunny" target="_blank">
          <img src="src\assets\3d토끼.png" className="main_logo" alt="logo" />
        </a>
        <h3>톡기를 누르면 이동</h3>
        <p>
          리액트 프로젝트 띄우기 성공!!!!
          <br />
          서버 응답 데이터 : {serverData}
        </p>
      </div>
    </>
  );
}

export default App;
