import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { API_URL } from "../../config";

const ListCateProd = () => {
  const [cateProd, setCateProd] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    getCateProd();
  }, []);

  const getCateProd = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/cateProd`);
      const sortedData = response.data.sort((a, b) => a.stt - b.stt);
      setCateProd(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCateProd = async (id) => {
    try {
      await axios.delete(`${API_URL}admin/cateProd/${id}`);
      getCateProd();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCateProd = async (data) => {
    try {
      await axios.patch(`${API_URL}admin/cateProd/${data.id}`, {
        stt: data.stt,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCateProd((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id);
        const overIndex = previous.findIndex((i) => i.id === over?.id);
        const updatedData = arrayMove(previous, activeIndex, overIndex);
        const updatedOrder = updatedData.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        // Cập nhật số thứ tự trên server (MySQL)
        updatedOrder.forEach(updateCateProd);
        return updatedOrder;
      });
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "sort",
      key: "sort",
      width: 50,
      render: () => <MenuOutlined style={{ touchAction: "none", cursor: "move" }} />,
    },
    {
      title: "Stt",
      dataIndex: "stt",
      key: "stt",
      width: 120,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      width: 120,
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`editCateProd/${record.id}`}>
            <Button type="primary" size="large" icon={<EditOutlined />} />
          </Link>
          <Button
            type="primary"
            size="large"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteCateProd(record.id)}
          />
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];

  const Row = ({ children, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });

    const style = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && {
          ...transform,
          scaleY: 1,
        }
      )?.replace(/translate3d\(([^,]+),/, "translate3d(0,"),
      transition,
      ...(isDragging
        ? {
            position: "relative",
            zIndex: 9999,
          }
        : {}),
    };

    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        <td>
          <MenuOutlined
            style={{
              touchAction: "none",
              cursor: "move",
            }}
            {...listeners}
          />
        </td>
        {React.Children.map(children, (child) => {
          if (child.key !== "sort") {
            return <td>{child}</td>;
          }
          return null;
        })}
      </tr>
    );
  };

  return (
    <div style={{height: "100vh"}}>
      <Link to={`addCateProd`} className="btn btn-primary mb-2">
        Thêm mới
      </Link>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={cateProd.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            columns={columns}
            dataSource={cateProd}
            pagination={false}
            bordered
            scroll={{
              x: 1000,
              y: "100vh",
            }}
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="id"
          />
        </SortableContext>
        <DragOverlay>
          {({ active }) => (
            <div
              style={{
                zIndex: 9999,
                pointerEvents: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {active ? (
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>{active.data.ten}</td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default ListCateProd;
