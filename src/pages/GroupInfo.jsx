// 그룹 상세 페이지

import "./GroupInfo.css";
import "../components/common/Header";
import GroupInfoCard from "../components/Group/GroupInfoCard";
import Header from "../components/common/Header";
import Memories from "../components/Memorie/Memories";

const GroupInfo = () => {
  return (
    <div>
      <Header />
      <GroupInfoCard />
      <Memories />
    </div>
  );
};

export default GroupInfo;
