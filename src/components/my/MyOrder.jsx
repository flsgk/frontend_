import { useEffect, useState } from "react";

import styled from "styled-components";

import PaginationBar from "../common/PaginationBar.jsx";

import axios from "axios";

const Wrapper = styled.div`
  width: 100vw
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const OrderList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const OrderCard = styled.div`
  width: 800px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
`;

const Title = styled.h1`
  margin-top: 50px;
`;

const Divider = styled.hr`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  color: black;
`;

const OrderBold = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const OrderGray = styled.p`
  font-size: 15px;
  color: gray;
`;

const OrderLine = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: gray;
  text-decoration: line-through;
`;

const PaginationContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px; /* 화면 하단에서 20px 떨어지게 */
`;

export default function MyOrder({}) {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]); // 주문 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [totalItems, setTotalItems] = useState(10); // 전체 데이터 개수
  const itemsPerPage = 1; // 한 페이지당 보여줄 아이템 개수
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // API 호출 함수
    const fetchOrders = async (page) => {
      setLoading(true);
      try {
        const response = await axios.get(`/order/list?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더 추가
          },
        });
        setOrders(response.data.orders);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
      setLoading(false);
    };
    fetchOrders(currentPage);
  }, [currentPage]);

  // 클릭 시 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}.${day}`;
  };

  return (
    <Wrapper>
      <OrderList>
        {orders
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((data) => (
            <OrderCard key={data.ordersId}>
              <OrderBold>배송완료</OrderBold>
              <p>주문번호 {data.ordersId}</p>
              <OrderGray>{formatDate(data.purchaseDate)} 주문</OrderGray>
              <OrderBold>{data.finalPrice}원</OrderBold>&nbsp;&nbsp;
              <OrderLine>{data.price}원</OrderLine>
            </OrderCard>
          ))}
      </OrderList>

      <PaginationContainer>
        {/* 페이지네이션 */}
        <PaginationBar
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
        ></PaginationBar>
      </PaginationContainer>
    </Wrapper>
  );
}
