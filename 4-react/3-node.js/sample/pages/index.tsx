import Layout from "../components/layout";
import { useRouter } from "next/router";



const Index = () => {
  const router = useRouter();

  return (
    <Layout>
      <table className={"table"}>
        <tr>
          <td>
            <th>
              <div className="searchBar">
                <input type={"text"} className={"input-sm"} />
              </div>
            </th>
            <th>
              <div className="searchButton">
                <button>검색</button>
              </div>
            </th>
            <th>
              <div className="bookmarkButton">
                <button>즐겨찾기</button>
              </div>
            </th>
          </td>
        </tr>
      </table >
      <div className="transPatner">
        <button className="transButton">파트너</button>
      </div>
    </Layout >
  );
};


export default Index;
