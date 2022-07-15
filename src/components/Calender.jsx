import moment from "moment"
import "./Calendar.css"
import {Box,Text} from "@chakra-ui/react"
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
        <Box className="calendar">
            <Box className="header">
                <Text className="calendar-head bold-text">{currentMonth()} {currentYear()}</Text>
                <Box className="keys">
                <Text className="bold-text" onClick={()=>setValue(previousMonth())}>{"<"}</Text>
                <Text className="bold-text" onClick={()=>setValue(nextMonth())}>{">"}</Text> 
            </Box>
            </Box>
            <Box className="week mar">
                {dayName.map((d)=>(
                    <Text className="bold-text">{d}</Text>
                ))}
            </Box>
           <Box>
           {calendar.map((week)=>(
            <Box className="week">
                {week.map((day)=>(
                    
                  <Box className="day" onClick={()=>setValue(day)}>
                    <Text className={styleOfDay(day)}>{day.format("D")}</Text>
                   </Box>
                ))}
            </Box>
           ))}
           </Box>
        </Box>
    )
}