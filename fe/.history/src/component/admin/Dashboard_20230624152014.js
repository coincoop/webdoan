import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  List,
  Tooltip,
  Pagination,
  Form,
  Button,
  Input,
} from "antd";
import { Pie } from '@ant-design/plots';
import { Comment } from "@ant-design/compatible";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import ReactGA from "react-ga";

ReactGA.initialize("G-5W93GCZSFP");
ReactGA.pageview(window.location.pathname + window.location.search);
const PieChartComponent = () => {
  const PieChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      // Gọi API để lấy dữ liệu cho biểu đồ
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}admin/pro/dashboardpro/ad`
          );

          setChartData(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []);
    const convertedData = chartData.map((item) => ({
      type: item.type,
      value: parseInt(item.value),
    }));
    const config = {
      // Cấu hình biểu đồ
      appendPadding: 10,
      data: convertedData, // Sử dụng dữ liệu từ API
      angleField: "value",
      colorField: "type",
      radius: 1,
      label: {
        type: "inner",
        offset: "-30%",
        style: { textAlign: "center" },
        autoRotate: false,
        content: "{value}",
      },
      interactions: [{ type: "element-active" }],
    };

    return <Pie {...config} />;
  };
   return <PieChart />;
});
const Dashboard = () => {
  const [review, setReview] = useState([]);
  const [counthd, setCountHd] = useState([]);
  const [counthdtoday, setCountHdToday] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [replyContent, setReplyContent] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [todayRevenue, setTodayRevenue] = useState([]);
 
  useEffect(() => {
    getReview();
    getHoadon();
    getHoadonToday();
  }, []);

  const getReview = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/review/dashboard`);
      setReview(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getHoadon = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/counthoadon`);
      setCountHd(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getHoadonToday = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/counthoadontoday`);
      const revenue = response.data ?? 0;
      setCountHdToday(revenue);
      console.log(revenue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await axios.get(`${API_URL}admin/pro/totalall`);
        setTotalRevenue(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotal();
  }, []);

  useEffect(() => {
    const fetchTodayRevenue = async () => {
      try {
        const response = await axios.get(`${API_URL}admin/pro/totaltoday`);
        const revenue = response.data ?? 0;
        setTodayRevenue(revenue);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodayRevenue();
  }, []);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentReview = review.slice(startIndex, endIndex);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async () => {
    if (selectedReview) {
      const { makh, masp } = selectedReview;
      try {
        await axios.patch(`${API_URL}admin/review/dashboard/${makh}/${masp}`, {
          reply: replyContent,
        });
        setReplyContent("");
        setSelectedReview(null);
        getReview();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReplyCancel = () => {
    setReplyContent("");
    setSelectedReview(null);
  };

  const handleReply = (review, index) => {
    setReplyContent("");
    setSelectedReview(review);
    setSelectedCommentIndex(index);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              suffix="VNĐ"
            />
            <Typography.Text type="secondary">
              Doanh thu hôm nay: {todayRevenue.toLocaleString()} VNĐ
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Số người xem" value={1} />
            <Typography.Text type="secondary">
              Lượt xem hôm nay: {1}
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Số lượng thanh toán" value={counthd} />
            <Typography.Text type="secondary">
              Số lượng thanh toán hôm nay: {counthdtoday}
            </Typography.Text>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card>
            <Typography.Title level={4}>
              Biểu đồ sản phẩm đã bán
            </Typography.Title>
            <PieChartComponent />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Typography.Title level={4}>Đánh giá bình luận</Typography.Title>
            <List
              className="comment-list"
              header={`${review.length} đánh giá`}
              itemLayout="horizontal"
              dataSource={currentReview}
              renderItem={(item, index) => (
                <li>
                  <Comment
                    actions={[
                      <Button
                        key={`comment-list-reply-to-${index}`}
                        onClick={() => handleReply(item, index)}
                      >
                        Reply to
                      </Button>,
                    ]}
                    author={`Đánh giá của ${item.user.tenkh} về sản phẩm ${item.sanpham.tensp}`}
                    avatar="https://ibiettuot.com/wp-content/uploads/2021/10/avatar-mac-dinh.png"
                    content={item.noidung}
                    datetime={item.createAt}
                  />
                  {item.reply && (
                    <Comment
                      style={{ marginLeft: 32 }}
                      author="Admin"
                      avatar="https://cdn-icons-png.flaticon.com/512/10241/10241794.png"
                      content={item.reply}
                      datetime={item.replyAt}
                    />
                  )}
                  {selectedReview && selectedCommentIndex === index && (
                    <Form>
                      <Form.Item>
                        <Input.TextArea
                          value={replyContent}
                          onChange={handleReplyChange}
                          placeholder="Reply content"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" onClick={handleReplySubmit}>
                          Reply
                        </Button>{" "}
                        <Button onClick={handleReplyCancel}>Cancel</Button>
                      </Form.Item>
                    </Form>
                  )}
                </li>
              )}
            />

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={review.length}
              onChange={handlePageChange}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
