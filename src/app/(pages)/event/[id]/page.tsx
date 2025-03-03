/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

const DetailPage = ({ params}: { params: Promise<{ id: string }> }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const resolvedParams = await params;
            const res = await fetch(`/api/post/${resolvedParams.id}`);
            if (!res.ok) throw new Error("Data not found");

            const json = await res.json();
            if (!json.post) {
                router.push("/404");
                return;
            }

            setTitle(json.post.title);
            setContent(json.post.content);
            setImageUrl(json.post.imageUrl || null);
        } catch (error) {
            console.error("Error fetching data:", error);
            router.push("/404");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            {imageUrl && (
                <div className="flex justify-center mb-5">
                    <Image
                        src={imageUrl}
                        alt="Event Image"
                        width={900}
                        height={500}
                        className="rounded-lg shadow-md object-cover w-full max-w-2xl aspect-video"
                    />
                </div>
            )}
            <h1 className="text-4xl font-bold mb-3 text-center break-words">{title}</h1>
            <p className="text-gray-700 whitespace-pre-line break-words">{content}</p>
        </div>
    );
};

export default DetailPage;
