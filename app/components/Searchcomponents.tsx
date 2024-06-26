"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { FormEvent, useState } from 'react';
import { useCountries } from "../lib/getCountries";
import { Counter } from "./Counter";
import { HomeMap } from "./HomeMap";
import { SelectSearchCalender } from "./SelectSearchCalendar";
import { CreationSubmit } from "./Submitbuttons";

export function SearchModalComponent() {
    const [step, setStep] = useState(1);
    const [locationValue, setLocationValue] = useState("");
    const { getAllCountries } = useCountries();
    const [guests, setGuests] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [error, setError] = useState("");

    function handleNextClick() {
        if (step === 1 && !locationValue) {
            setError("Please select a country.");
            return;
        }
        if (step === 2 && (!guests || !rooms)) {
            if (!guests) {
                setError("Please select the number of guests.");
                return; // Halt execution
            }
            if (!rooms) {
                setError("Please select the number of rooms.");
                return; // Halt execution
            }
        }
        setStep(step + 1);
    }

    function handleFormSubmit(event: FormEvent) {
        if (step === 2 && (!guests || !rooms)) {
            event.preventDefault();
            if (!guests) {
                setError("Please select the number of guests.");
            }
            if (!rooms) {
                setError("Please select the number of rooms.");
            }
        }
    }

    function SubmitButtonLocal() {
        if (step === 1) {
            return (
                <Button onClick={handleNextClick} type="button">
                    Next
                </Button>
            );
        } else if (step === 2) {
            return <CreationSubmit />;
        }
    }

    return (
        <>
            <Dialog open={!!error} onOpenChange={() => setError("")}>
                <DialogContent className="border border-red-500 border-width:4px">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-red-500">Error!</DialogTitle>
                        <DialogDescription>{error}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setError("")} className="bg-red-500 text-white">OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center justify-between rounded-full mr-4 py-1 sm:py-2 px-2 sm:px-4 border hover:shadow-md dark:hover:shadow-white cursor-pointer">
                        <div className="text-bold flex flex-1 justify-center divide-x sm:justify-start">
                            <p className="text-xs sm:text-base px-2 ">Anywhere</p>
                            <p className="text-xs sm:text-base px-2 ">Any Week</p>
                            <p className="font-bold text-xs sm:text-base px-2">Add Guests</p>
                        </div>
                        <Search className="bg-primary text-white p-1 h-6 sm:h-8 w-6 sm:w-8 rounded-full" />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form className="gap-4 flex flex-col" onSubmit={handleFormSubmit}>
                        <input type="hidden" name="country" value={locationValue} />
                        {step === 1 ? (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Select a Country</DialogTitle>
                                    <DialogDescription>
                                        Please Select a country, For Us to Know Your Destination
                                    </DialogDescription>
                                </DialogHeader>

                                <Select onValueChange={(value) => setLocationValue(value)} value={locationValue} required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Countries</SelectLabel>
                                            {getAllCountries().map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.flag} {item.label} / {item.region}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <HomeMap locationValue={locationValue} />
                            </>
                        ) : (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="-mt-2">Please provide all the information</DialogTitle>
                                </DialogHeader>

                                <Card>
                                    <CardHeader className="flex flex-col gap-y-2 -mt-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="underline font-medium font-semibold">Guests</h3>
                                                <p className="text-muted-foreground text-sm">How many guests?</p>
                                            </div>
                                            <Counter name="guests" value={guests} onChange={setGuests} />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="underline font-medium font-semibold">Rooms</h3>
                                                <p className="text-muted-foreground text-sm">How many rooms do you need?</p>
                                            </div>
                                            <Counter name="rooms" value={rooms} onChange={setRooms} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium font-semibold">Date</h3>
                                            <p className="text-muted-foreground text-sm mb-2">When are you planning to go?</p>
                                            <SelectSearchCalender />
                                        </div>
                                    </CardHeader>
                                </Card>
                            </>
                        )}
                        <DialogFooter className="-mt-2 -mb-2">
                            <SubmitButtonLocal />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
