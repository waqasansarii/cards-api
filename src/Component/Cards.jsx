import React, { isValidElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import loading from "../Assets/load.gif";
import "./Card.css";
import { useCards } from "../CardsProvider"

const Cards = () => {
  const {load,cardData} = useCards()
  const { search } = useLocation()
  const [filteredCardData, setFilteredCardData] = useState([]);
  let [date, setDate] = useState("");
  const { push } = useHistory()
  useEffect(() => {
    setFilteredCardData(cardData);
  }, [cardData]);
  useEffect(()=>{
    const date = decodeURIComponent(new URLSearchParams(search).get("date"));
    console.log(date)
    if(date){
      const filter = cardData.filter((val) => {
        let fil =
          new Date(val.date).toDateString() ===
          new Date(date).toDateString();
        return fil;
      });
      setFilteredCardData(filter);
    }
  },[cardData,search])

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    push({
      search: `?date=${encodeURIComponent(date)}`
    })
  }
  if (load) {
    return (
      <div className="load">
        <img src={loading} alt="" />
      </div>
    );
  }
  const months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']
  return (
    <div className="card_container">
      <div className="card_main_div">
        <div className="date_inp_div">
          <form onSubmit={handleSubmit} action="/">
          <label htmlFor="date">
            Select any date to show results:
            <input
              type="date"
              name="date"
              onChange={(e) => handleChangeDate(e)}
              id="date"
            />
          </label>
          <button>Submit</button>
          </form>
        </div>
        {filteredCardData.length ? (
          <>
            {filteredCardData.map((val) => (
              <Link to={{
                search: `url=${val.url}`,
                pathname: "/details"
              }} key={val.id}>
                <div className="my_card">
                  <div className="img_sec">
                    <div>
                      <img src={val.thumbnail} alt="" />
                    </div>
                    <p>{val.title}</p>
                  </div>
                  <div className="detail_sec">
                    <h1>{val.title}</h1>
                    <p>{val.address}</p>
                    <span>
                      {months[new Date(val.date).getMonth()]} {new Date(val.date).getDate()} 
                    </span>
                    <span className="dash"> - </span>
                    <span>
                       {months[new Date(val.endDate).getMonth()]} {new Date(val.endDate).getDate()} 
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="empty">
            <h1>There is no card {date} </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
