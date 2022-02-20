import './style.css';
import Comments from '../../components/Comments'

function Section() {
    return (
      <div
        className="
          flex
          flex-col
          justify-center
          w-full
          min-h-full
        "
      >
        <Comments />
      </div>
    );
  }
  
export default Section;