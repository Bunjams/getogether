import { EVENT_IMG_LINK } from "dictionaries";

const Home = () => {
  const list = EVENT_IMG_LINK;
  console.log(Object.keys(list));
  return (
    <div className="flex overflow-auto flex-col h-screen">
      {Object.keys(list).map((el, i) => {
        return (
          <div key={el} className="flex gap-2 flex-col">
            {el}
            <img src={Object.values(list)[i]} className="h-80 w-80" />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
