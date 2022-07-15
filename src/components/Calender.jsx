import moment from "moment"
export const Calender=()=>{

const value=moment();
const firstDay=value.clone().startOf("month").startOf("week")
const lastDay=value.clone().endOf("month").endOf("week")
    return(
        <div>
            {firstDay.format("MM/DD")}-{lastDay.format("MM/DD")}
        </div>
    )
}