"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { Counter } from "./Counter";
import { HomeMap } from "./HomeMap";
import { CreationSubmit } from "./Submitbuttons";

export function SearchModalComponent(){
    const [step, setStep] = useState(1);
    const [locationValue, setLocationValue] = useState("");
    const {getAllCountries}  = useCountries();

    function SubmitButtonLocal(){
        if(step === 1) {
            return(
                <Button onClick={() => setStep(step + 1)} type="button">
                    Next
                </Button>
            );
            }else if(step === 2) {
                return <CreationSubmit />
            }
    }
    return(
        <Dialog>
            <DialogTrigger asChild>
            <div className="flex items-center justify-between rounded-full py-1 sm:py-2 px-2 sm:px-4 border hover:shadow-md dark:hover:shadow-white cursor-pointer">
                <div className="text-bold flex flex-1 justify-center divide-x sm:justify-start">
                    <p className="text-xs sm:text-base px-2 ">Anywhere</p>
                    <p className="text-xs sm:text-base px-2 ">Any Week</p>
                    <p className="text-xs sm:text-base px-2">Add Guests</p>
                </div>
                <Search className="bg-primary text-white p-1 h-6 sm:h-8 w-6 sm:w-8 rounded-full" />
            </div>
        </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
                <form className="gap-4 flex flex-col">
                    <input type="hidden" name="country" value={locationValue} />
                    {step === 1 ?(
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Select a Country
                                </DialogTitle>
                                <DialogDescription>
                                    Please Select a country, For Us to Know Your Destination
                                </DialogDescription>
                            </DialogHeader>

                            <Select required onValueChange={(value) => setLocationValue(value)} value={locationValue}>
                            <SelectTrigger className="w-full ">
                                <SelectValue placeholder="Select a Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Countries
                                    </SelectLabel>
                                    {getAllCountries().map((item) => (
                                        <SelectItem key={item.value} value={item.value} >
                                            {item.flag}  {item.label} / {item.region}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <HomeMap locationValue={locationValue} />
                        </>
                    ): (
                        <>
                            <DialogHeader>
                                <DialogTitle className="-mt-2">
                                Please provide all the information
                                </DialogTitle>
                            </DialogHeader>

                            <Card>
                            <CardHeader className="flex flex-col gap-y-2 -mt-2">
                            <div className="flex items-center justify-between ">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium font-semibold">
                                        Guests
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        How many guests?
                                    </p>
                                </div>
                                <Counter name="guests"/>
                            </div>

                            <div className="flex items-center justify-between ">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium font-semibold">
                                        Rooms
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        How many rooms do you need?
                                    </p>
                                </div>
                                <Counter name="rooms"/>
                            </div>
                            <div className="flex flex-col">
                                    <h3 className="underline font-medium font-semibold">
                                        Date
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        When are you planning to go?
                                    </p>
                                </div>
                        </CardHeader>
                    </Card>

                        </>
                    )}
                    <DialogFooter>
                        <SubmitButtonLocal />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}