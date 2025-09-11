import React from 'react'
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./ReportCard.css"


const ReportCard = ({value,title,icon}) => {
  return (
    <div className="flex gap-5 items-center p-5 w-full  rounded-md h-[79px] css-1nj0gs7 ">
    <div className="rounded-md p-2 bg-[#000025]">
      {icon}
    </div>
    <div>
      <p className="font-bold text-lg">{value}</p>
      <p className="font-medium">{title}</p>
    </div>
  </div>
  )
}

export default ReportCard