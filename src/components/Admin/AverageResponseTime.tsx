import React from "react";

type Props = {
    responseTime: string
}

const AverageResponseTime:React.FC<Props> = (props) => {

    return(
        <div>
            <p>Average response time for the portfolios:</p>
            <p>{
            (props.responseTime != null)?
                props.responseTime:
                "Loading"
            }</p>
        </div>
    );
}


export default AverageResponseTime;

