import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";
import { sortDescending } from "../../utils/array";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const eventSorted = sortDescending(data?.focus);


  useEffect(() => {
    const timer = setTimeout(
      () => setIndex(index < eventSorted.length - 1 ? index + 1 : 0), //  loop back to the first slide
      5000
    );
    return () => clearTimeout(timer);
  }, [index, eventSorted.length]);

  return (
    <div className="SlideCardList"> {/* Container for the slider */}
      {eventSorted?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {eventSorted?.map((event, radioIdx) => ( // Radio buttons for navigation
            <input
              key={event.id} // Use event.id as key for uniqueness
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)} // Change slide on radio button click
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
