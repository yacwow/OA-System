import React from 'react'

export default function staffAmount({ title, amount, styleData }) {
        // console.log(styleData)
    return (
        <div className='staff-amount-container' style={{...styleData}}>
            <div className="staff-amount_title">
                {title}
            </div>
            <div className="staff-amount_content">
                <div className="staff-amount_number">{amount}</div>
                <div className="staff-amount_txt">Person</div>
            </div>
        </div>
    )
}
