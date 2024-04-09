"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function CreationSubmit() {
    const { pending } = useFormStatus();
    return (
    <>
        {pending ? (
        <Button disabled size="lg">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
        </Button>
        ) : (
        <Button type="submit" size="lg">
            Next
        </Button>
        )}
    </>
    );
}

export function AddToFavoriteButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
            <Button
                //variant="outline"
                size="icon"
                disabled
                className="hover:bg-transparent"
            >
                <Loader2 className="h-8 w-8 animate-spin text-white bg-transparent" style={{ backgroundColor: 'transparent' }} />
            </Button>
            ) : (
            <Button
                //variant="outline"
                size="icon"
                className="bg-transparent"
                type="submit"
            >
                <Heart className="w-9 h-9 text-white" />
            </Button>
            )}
        </>
        );
    }

    export function DeleteFromFavoriteButton() {
        const { pending } = useFormStatus();
        return (
            <>
                {pending ? (
                <Button
                    //variant="outline"
                    size="icon"
                    disabled
                    className="hover:bg-transparent"
                >
                    <Loader2 className="h-8 w-8 animate-spin text-white " />
                </Button>
                ) : (
                <Button
                    //variant="outline"
                    size="icon"
                    className="bg-transparent"
                    type="submit"
                >
                    <Heart className="w-9 h-9 text-white" fill="#E21C49" />
                </Button>
                )}
            </>
            );
        }

        export function ReservationSubmitButton() {
            const { pending } = useFormStatus();
            
                return (
                <>
                    {pending ? (
                    <Button className="w-full" disabled>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
                    </Button>
                    ) : (
                    <Button className="w-full" type="submit">
                        Make a Reservation!
                    </Button>
                    )}
                </>
                );
            }