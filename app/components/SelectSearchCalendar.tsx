"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { eachDayOfInterval } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";

export function SelectSearchCalender({
    search,
    }: {
    search:
        | {
            startDate: Date;
            endDate: Date;
        }[]
        | undefined;
    }) {
    const [state, setState] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        },
    ]);

    let disabledDates: Date[] = [];
    search?.forEach((reservationItem) => {
        const dateRange = eachDayOfInterval({
        start: new Date(reservationItem.startDate),
        end: new Date(reservationItem.endDate),
        });

        disabledDates = [...disabledDates, ...dateRange];
    });
    return (
        <>
        <input
            type="hidden"
            name="startDate"
            value={state[0].startDate.toISOString()}
        />
        <input
            type="hidden"
            name="endDate"
            value={state[0].endDate.toISOString()}
        />
        <DateRange
            date={new Date()}
            showDateDisplay={false}
            rangeColors={["#2BB673"]}
            ranges={state}
            onChange={(item) => setState([item.selection] as any)}
            minDate={new Date()}
            direction="vertical"
            disabledDates={disabledDates}
        />
        </>
    );
}