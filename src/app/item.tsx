"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    post: Post;
}

interface Post {
    id: number;
    title: string;
    content: string;
    description: string;
    createdAt: string;
    imageUrl?: string;
}

const Item = ({ post }: Props) => {
    const router = useRouter();
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "admin";

    const handleDelete = async (id: number) => {
        await fetch("/api/post?id=" + id, {
            method: "DELETE",
        });
        router.refresh();
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-3xl space-y-5 mb-7">
                <Link href={`/event/${post.id}`} className="block">
                    <div className="flex items-center gap-6 border p-5 rounded-lg shadow-lg bg-white 
                        hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer min-h-[300px]">

                        {/* Gambar dengan ukuran yang lebih proporsional */}
                        {post.imageUrl && (
                            <div className="w-[250px] h-[250px] flex-shrink-0">
                                <Image 
                                    src={post.imageUrl} 
                                    alt="Event Image"
                                    width={250} 
                                    height={250} 
                                    className="object-cover rounded-lg w-full h-full"
                                />
                            </div>
                        )}

                        {/* Container teks dengan overflow handling */}
                        <div className="flex-1 overflow-hidden">
                            <h1 className="text-xl font-bold mb-2 break-words">{post.title}</h1>
                            <p className="text-md text-gray-700 line-clamp-3 break-words">
                                {post.content}
                            </p>
                        </div>
                    </div>
                </Link>
        
                {isAdmin && (
                    <div className="flex justify-end gap-4 mt-5">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-600"
                            onClick={(e) => { e.stopPropagation(); router.push(`/event/update/${post.id}`); }}
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-600"
                            onClick={(e) => { e.stopPropagation(); handleDelete(post.id); }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Item;
