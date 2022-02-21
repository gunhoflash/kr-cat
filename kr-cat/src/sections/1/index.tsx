import Timer from '@components/Timer';
import './style.css';

function Section() {
  return (
    <div
      className="
        flex
        flex-col
        justify-center
        overflow-hidden
        w-full
        h-full
        text-[200%]
        italic
        pl-[1rem]
        sm:pl-[2.5rem]
        md:pl-[5rem]
        lg:pl-[9rem]
        xl:pl-[17rem]
      "
    >
      <Timer />
    </div>
  );
}

export default Section;
