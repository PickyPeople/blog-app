import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function PostsPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return <p>게시글을 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📚 블로그 글 목록</h1>
      <Link href="/posts/new">
        <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          ✏️ 새 글 작성
        </button>
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="p-4 border-b">
            <Link href={`/posts/${post.id}`} className="text-lg font-semibold text-blue-500 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
