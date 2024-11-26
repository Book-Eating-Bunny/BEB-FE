import {useEffect, useState} from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    const getServerData = () => {
      axios
        .get('/api/demo')
        .then((res) => {
          setServerData(res.data);
        })
        .catch((err) => console.log(err));
    };
    getServerData();
  }, []);

  return (
    <div>
      <p>
        리액트 프로젝트 띄우기 성공!!!!
        <br />
        서버 응답 데이터 : {serverData}
      </p>
    </div>
  );
};

export default ApiTest;
