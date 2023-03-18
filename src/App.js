import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav/Nav';
import Notelist from './components/Notes/Notelist';
import Takenote from './components/Notes/Takenote';

function App() {
  var [navMode,setNavMode] = useState(0);
  const navToggler = ()=>{
    navMode===0?setNavMode(1):setNavMode(0);
  }
  var [view,setView] = useState("grid");
  const getView = (retView)=>{
    setView(retView);
  }
  return (
    <div>
      <Header navToggler={navToggler} getView={getView}/>
      <span className="content">
        <Nav navMode={navMode}/>
        <span className={`nonNav nonNavToggleClass${navMode} `}>
          <Takenote/>
          <Notelist view={view}/>
        </span>
      </span>
    </div>
  );
}

export default App;
