import React from "react";
import AppBar from "../components/appbar/appbar";
import { useRouter } from "next/router";

const Partner = () => {
  const router = useRouter();

  return (
    <div>
      <AppBar />
      <div>
        파트너 페이지 추가
      </div>
    </div>
  )
}


export default Partner;