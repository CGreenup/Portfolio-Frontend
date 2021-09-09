import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch } from '../../store/Hooks';
import { setFullPortfolio } from '../../features/FullPortfolioSlice';
import { useCookies } from "react-cookie";
import ViewPortfolio from "../ViewPortfolio/ViewPortfolio";
import { url } from "../../api/api";

const LoadViewPortfolio:React.FC<null> = () => {

    const [cookie] = useCookies();
    const [portfolioLoaded, setPortfolioLoaded] = useState(false);
    const dispatch = useAppDispatch();

    //get the portfolio data using axios
    async function getFullPortfolio(){
        let result = await axios.get(url + `/portfolios/full/${cookie["portfolio"].id}`);
        dispatch(setFullPortfolio({ fullPortfolio: result.data }));
        setPortfolioLoaded(true);
    }

    useEffect( 
    () => {
        getFullPortfolio();
    }, 
    []);

    function waitForFullPortfolio(){
        if(portfolioLoaded){
            return <ViewPortfolio/>
        }else{
            return (
                <div>
                    <p>
                        Loading Portfolio...
                    </p>
                </div>
            )
        }
    }

    return (
        <>
            {waitForFullPortfolio()}
        </>
    );
}

export default LoadViewPortfolio;