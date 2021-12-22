import './stylesheets/index.scss';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from './views/home';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
