import { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import './App.css';
import FirstSection from './sections/FirstSection';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props
const pluginWrapper = () => {
  // require('./statics/fullpage.scrollHorizontally.min');
};

function App() {
  const [color, setColor] = useState();

  return (
    <Fullpage />
  );
}

const Fullpage = () => (
  <ReactFullpage
    pluginWrapper={pluginWrapper}

    //fullpage options
    scrollingSpeed={1000} /* Options here */

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section">
            {/* <p>Section 1</p> */}
            <FirstSection />
          </div>
          <div className="section">
            <p>Section 2</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default App;
