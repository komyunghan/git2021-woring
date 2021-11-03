import Layout from "../components/layout";
import Link from "next/link";
import GoogleMaps from "./MapAPI";
import { useRouter } from "next/router";
import { getTimeString } from "../lib/string";

import photoApi from "../api/photo";
import { PhotoItemResponse } from "../api/photo";

import Image from "next/image";
import { mapToStyles } from "@popperjs/core/lib/modifiers/computeStyles";

interface IndexProp {
  photos: PhotoItemResponse[];
}


const Index = ({ photos }: IndexProp) => {
  const router = useRouter();

  return (
    <Layout>
      <table className={"table"}>
        <tr>
          <td>
            <th>
              <div className={"searchBar"}>
                <input type={"search"} className={"input-sm"} />
              </div>
            </th>
            <th>
              <div className="searchButton">
                <button>검색</button>
              </div>
            </th>
          </td>
        </tr>
      </table>
      <div>
        <GoogleMaps></GoogleMaps>
      </div>
    </Layout>

  );
};


export default Index;