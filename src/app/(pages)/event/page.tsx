import Item from "@/app/item";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
}

const getPost = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [] };
  }
};

const EventPage = async () => {
  const [posts, session] = await Promise.all([getPost(), getServerSession(authOptions)]);
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="p-5 rounded-md border-b leading-9 max-w-7xl mx-auto">
      {isAdmin && (
        <Link 
          href="/event/create"
          className="flex justify-end mr-5 mt-3 text-black rounded-md uppercase text-sm font-bold tracking-widest"
        >
          Create
        </Link>
      )}
      <div className="list-container">
        {Array.isArray(posts?.posts) && posts.posts.length > 0 ? (
          posts.posts.map((post: Post) => <Item key={post.id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
