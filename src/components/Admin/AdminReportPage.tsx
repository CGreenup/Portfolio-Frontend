import axios from "axios";
import { useCookies } from "react-cookie";

import AdminChart from "../Admin/AdminChart";
import AverageResponseTime from "./AverageResponseTime";

const adminReportPage = (props: any) => {

    const reportPage = (): void => {
        let pahtname = "./admin";
        window.location.pathname = pahtname;
      }

    return (
        <div>
            <AverageResponseTime/>      
            <AdminChart/>
            <button className="btn btn-primary" onClick={() => reportPage()}> 
                Go Back
            </button>
        </div>
    )
}
export default adminReportPage;