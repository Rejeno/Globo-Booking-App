"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useState } from "react";
import { DateRange } from "react-date-range";

export function SelectSearchCalender() {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const isSmallDevice = window.innerWidth <= 500; // Adjust the breakpoint as needed

    const calendarStyle = {
        width: isSmallDevice ? "100px" : "150px", // Adjust the width for smaller devices
        height: isSmallDevice ? "300px" : "280px", // Adjust the height for smaller devices
    };

    return (
        <div style={calendarStyle}>
            <DateRange
                date={new Date()}
                showDateDisplay={false}
                rangeColors={["#2BB673"]}
                ranges={state}
                onChange={(item) => setState([item.selection] as any)}
                minDate={new Date()}
                direction="vertical"
            />
        </div>
    );
}
