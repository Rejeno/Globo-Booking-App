'use client';

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CounterProps {
    name: string;
    value: number;
    onChange: Dispatch<SetStateAction<number>>;
}

export function Counter({ name, value, onChange }: CounterProps) {
    const increase = () => {
        onChange(value + 1);
    };

    const decrease = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    return (
        <div className="flex items-center gap-x-4">
            <input type="hidden" name={name} value={value} />
            <Button variant="outline" size="icon" type="button" onClick={decrease}>
                <Minus className="h-4 w-4 text-primary" />
            </Button>
            <p className="font-medium text-lg">{value}</p>
            <Button variant="outline" size="icon" type="button" onClick={increase}>
                <Plus className="h-4 w-4 text-primary" />
            </Button>
        </div>
    );
}
