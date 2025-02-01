import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import MyInfo from "../components/MyInfo";
import MyOrder from "../components/MyOrder";
import MyParty from "../components/MyParty";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: "#f4f4f4";
  height: 100vh; // 콘텐츠 영역의 높이를 화면 전체로 설정
  overflow: auto; // 스크롤 추가
`;

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-info");
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState(null);
  const [parties, setParties] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "my-info":
        return <MyInfo />;
      case "my-order":
        return <MyOrder />;
      case "my-party":
        return <MyParty />;

      default:
        return <MyInfo />;
    }
  };

  return (
    <Wrapper>
      <SideBar onTabChange={(tab) => setActiveTab(tab)} />
      <Content> {renderContent()}</Content>
    </Wrapper>
  );
}
