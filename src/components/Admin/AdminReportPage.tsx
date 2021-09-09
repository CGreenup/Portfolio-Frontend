import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { responseTimeUrl } from "../../api/api";

import AdminChart from "../Admin/AdminChart";
import AverageResponseTime from "./AverageResponseTime";

const adminReportPage = (props: any) => {

    const [averageResponseTime, setResponseTime] = useState("");
    const reportPage = (): void => {
        let pathname = "./admin";
        window.location.pathname = pathname;
    }

    //refactor this to get all data in one call later
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        let response = await axios.get(`${responseTimeUrl}`);
        setResponseTime(response.data);
    }

    return (
        <div>
            <AverageResponseTime responseTime = {averageResponseTime}/>      
            <AdminChart/>
            <button className="btn btn-primary" onClick={() => reportPage()}> 
                Go Back
            </button>
        </div>
    )
}
export default adminReportPage;