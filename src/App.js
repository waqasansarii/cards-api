import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { useCards } from "./CardsProvider";
import Cards from "./Component/Cards";

function App() {
  const {  cardData,load } = useCards()
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact>
          <Cards />
        </Route>
        <Route
          path="/details"
          render={({ location }) => {
            const src = new URLSearchParams(location.search).get("url");
            if(cardData.find(el=> el.url === src)){
              return (
                <iframe
                  style={{
                    width: `100vw`,
                    height: `100vh`,
                    border: 0,
                    overflowX: `hidden`,
                  }}
                  src={src}
                ></iframe>
              );
            }
            else{
              return (
                !load && <h1 style={{color: `#fff`}}>URL don't exist</h1>
              )
            }
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
