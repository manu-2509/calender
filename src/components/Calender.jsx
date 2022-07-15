import moment from "moment"
import "./Calendar.css"
import { useState,useEffect } from "react";
export const Calender=()=>{
const [calendar,setCalendar]=useState([]);

const [value,setValue]=useState(moment())

const firstDay=value.clone().startOf("month").startOf("week")
const lastDay=value.clone().endOf("month").endOf("week")
let dayName=["S","M","T","W","T","F","S"]

console.log(value)

useEffect(()=>{
const day=firstDay.clone().subtract(1,"day");
const temp=[];
while(day.isBefore(lastDay,"day")){
    temp.push(
        Array(7).fill(0).map(()=>day.add(1,"day").clone())
    )
}
setCalendar(temp);
},[value])

const isSelected=(day)=>{
    return value.isSame(day,"day");
}
const beforeToday=(day)=>{
    return day.isBefore(new Date(),"day")

}
const isToday=(day)=>{
    return day.isSame(new Date(),"day")
}
const styleOfDay=(day)=>{
    if(beforeToday(day)) return "before"
    if(isSelected(day)) return "selected"
    if(isToday(day)) return "today"
    return ""
}

const currentMonth=()=>{
return value.format("MMMM")
}
const currentYear=()=>{
    return value.format("YYYY")
}
const previousMonth=()=>{
    return value.clone().subtract(1,"month")
}
const nextMonth=()=>{
    return value.clone().add(1,"month")
}
    return(
        <div className="calendar">
            <div className="header">
                <h3>{currentMonth()} {currentYear()}</h3>
                <div className="keys">
                <h3 onClick={()=>setValue(previousMonth())}>{"<"}</h3>
                <h3 onClick={()=>setValue(nextMonth())}>{">"}</h3> 
            </div>
            </div>
            <div className="week mar">
                {dayName.map((d)=>(
                    <div>{d}</div>
                ))}
            </div>
           <div>
           {calendar.map((week)=>(
            <div className="week">
                {week.map((day)=>(
                    
                  <div className="day" onClick={()=>setValue(day)}>
                    <div className={styleOfDay(day)}>{day.format("D")}</div>
                   </div>
                ))}
            </div>
           ))}
           </div>
        </div>
    )
}