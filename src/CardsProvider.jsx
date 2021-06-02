import React, { createContext, useContext, useEffect, useState } from 'react';

const CardContext = createContext()

export const useCards = ()=> useContext(CardContext)

const CardsProvider = ({children}) => {
    const [cardData, setCardData] = useState([]);
    let [load, setLoad] = useState(true);
    useEffect(() => {
        const getData = async () => {
          let data = await fetch(
            "https://thetaporlandppsapi.azurewebsites.net/api/HttpTrigger1?QueryEvent=*"
          );
          let response = await data.json();
          setLoad(false);
          setCardData(response);
        };
        getData();
      }, []);
    return (
        <CardContext.Provider value={{cardData,load}}>
            {children}
        </CardContext.Provider>
    );
};

export default CardsProvider;