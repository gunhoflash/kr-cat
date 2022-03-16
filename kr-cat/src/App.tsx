import Section1 from './sections/1';
// import Section2 from './sections/2';
// import Section3 from './sections/3';
import Section4 from './sections/4';

const App = () => (
  <>
    {[
      <Section1 />,
      // <Section2 />,
      // <Section3 />,
      <Section4 />,
    ].map((section, i) => (
      <div key={i} className="w-screen h-screen">
        {section}
      </div>
    ))}
  </>
);

export default App;
