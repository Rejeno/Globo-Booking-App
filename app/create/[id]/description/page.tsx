'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CreateDescription } from "@/app/action";
import { Counter } from '@/app/components/Counter';
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage({ params }: { params: { id: string } }) {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [guests, setGuests] = useState<number>(0);
    const [rooms, setRooms] = useState<number>(0);
    const [bathrooms, setBathrooms] = useState<number>(0);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (guests <= 0 || rooms <= 0 || bathrooms <= 0) {
            toast.error("Guests, rooms, and bathrooms must each be greater than 0.");
            return;
        }

        try {
            await CreateDescription(formData);
            toast.success("Description created successfully!");
        } catch (error) {
            toast.error("Failed to create description. Please try again.");
        }
    };

    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors text-center">
                    Please describe your home
                </h2>
            </div>

            <form onSubmit={handleSubmit}>
                <input type="hidden" name="homeId" value={params.id} />
                <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
                    <div className="flex flex-col gap-y-2">
                        <Label className="font-semibold">
                            Title
                        </Label>
                        <Input name="title" type="text" required placeholder="Short and simple..." />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label className="font-semibold">
                            Description
                        </Label>
                        <Textarea name="description" required placeholder="Please describe your home" />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label className="font-semibold">
                            Price
                        </Label>
                        <Input name="price" type="number" required placeholder="Price per Night $" min={10} />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label className="font-semibold">
                            Image
                        </Label>
                        <Input name="image" type="file" required onChange={handleImageChange} />
                        {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-xs" />}
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col gap-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium font-semibold">
                                        Guests
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        How many guests can you accommodate?
                                    </p>
                                </div>
                                <Counter name="guests" value={guests} onChange={setGuests} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium font-semibold">
                                        Rooms
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        How many rooms do you have?
                                    </p>
                                </div>
                                <Counter name="rooms" value={rooms} onChange={setRooms} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium font-semibold">
                                        Bathrooms
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        How many bathrooms do you have?
                                    </p>
                                </div>
                                <Counter name="bathrooms" value={bathrooms} onChange={setBathrooms} />
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <CreationBottomBar />
            </form>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}
