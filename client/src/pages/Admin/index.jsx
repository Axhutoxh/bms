import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";
import MoviesList from "./MoviesList";

function Admin() {
  return (
    <div>
     
        <PageTitle title="Admin" />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
            <MoviesList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Theatres" key="2">
           <TheatresList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;