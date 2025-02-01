"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
      if (error) console.error("Error fetching post:", error);
      setPost(data);
      setLoading(false);
    }

    if (id) fetchPost();
  }, [id]);

  // ✅ 게시글 삭제 함수
  const handleDelete = async () => {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Error deleting post:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    } else {
      router.push("/posts"); // 삭제 후 목록 페이지로 이동
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">{new Date(post.created_at).toLocaleDateString()}</p>
      <div className="text-lg">{post.content}</div>

      {/* ✅ "수정" & "삭제" 버튼 추가 */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => router.push(`/posts/${id}/edit`)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ✏️ 수정
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑 삭제
        </button>
      </div>
    </div>
  );
}
