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
    return (
        <DateRange
            date={new Date()}
            showDateDisplay={false}
            rangeColors={["#2BB673"]}
            ranges={state}
            onChange={(item) => setState([item.selection] as any)}
            minDate={new Date()}
            direction="vertical"
        />
    )
}