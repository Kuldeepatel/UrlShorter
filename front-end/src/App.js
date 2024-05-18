import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default App;
