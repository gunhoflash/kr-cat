import ReactFullpage from '@fullpage/react-fullpage';
import './App.css';
import Section1 from './sections/1';
// import Section2 from './sections/2';
// import Section3 from './sections/3';
import Section4 from './sections/4';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props
const pluginWrapper = () => {
  // require('./statics/fullpage.scrollHorizontally.min');
};

function App() {
  return (
    <Fullpage />
  );
}

const Fullpage = () => {
  const sections = [
    <Section1 />,
    // <Section2 />,
    // <Section3 />,
    <Section4 />,
  ];

  return (
    <ReactFullpage
      // pluginWrapper={pluginWrapper}

      //fullpage options
      scrollingSpeed={1000} /* Options here */
      scrollOverflow={true}
      recordHistory={false}
      normalScrollElements=".normal-scroll-element"

      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            {sections.map((section, i) => (
              <div key={i} className="section">
                {section}
              </div>
            ))}
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default App;
