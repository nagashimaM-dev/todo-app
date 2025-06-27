// 最上層のページコンポーネント

import React from 'react';
import TodoContainer from '../Components/TodoContainer';

const Home = () => {
  return (
    <>
      <head>
        <title>Todoリスト</title>
      </head>
      <main>
        <TodoContainer />
      </main>
    </>
  );
};

export default Home;
