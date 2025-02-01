import { redirect } from "next/navigation";

export default function Home() {
  redirect("/posts"); // 홈페이지 접속 시 자동으로 /posts로 이동
}