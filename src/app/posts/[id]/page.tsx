"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostDetailPage() {
  const { id } = useParams(); // ✅ URL에서 동적으로 ID 가져오기
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

  if (loading) return <p>로딩 중...</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">{new Date(post.created_at).toLocaleDateString()}</p>
      <div className="text-lg">{post.content}</div>
    </div>
  );
}
