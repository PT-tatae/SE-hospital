import { useEffect, useState } from "react";
import { Layout, Card } from "antd";
import { RoomLayout } from "../../../interface/room";
//import "./room.css";
import SiderFloor from "./sider"

const { Sider,Content } = Layout; 

const masterData = [
  { book_room_id: 1, building_name: "อาคาร A", room_number: "101", room_name: "ห้อง ICU", position_x: 0, position_y: 0 },
  { book_room_id: 3, building_name: "อาคาร B", room_number: "201", room_name: "ห้องรวม", position_x: 1, position_y: 0 },
  { book_room_id: 4, building_name: "อาคาร B", room_number: "202", room_name: "ห้องรวม", position_x: 1, position_y: 1 },
  { book_room_id: 5, building_name: "อาคาร C", room_number: "301", room_name: "ห้อง ICU", position_x: 2, position_y: 0 },
  { book_room_id: 8, building_name: "อาคาร D", room_number: "402", room_name: "ห้องรวม", position_x: 3, position_y: 1 },
  { book_room_id: 9, building_name: "อาคาร D", room_number: "402", room_name: "ห้องรวม", position_x: 0, position_y: 2 },
];

const Floor = [
  { floor_number: 1 },
  { floor_number: 2 },
  { floor_number: 3 },
  { floor_number: 4 },
  { floor_number: 5 },
];

export default function BooxRoom() {
  const [roomLayout, setRoomLayout] = useState<RoomLayout>([]);

  useEffect(() => {
    const width = Math.max(...masterData.map((room) => room.position_x)) + 1;
    const height = Math.max(...masterData.map((room) => room.position_y)) + 1;

    const layout = Array.from({ length: height }, () => Array(width).fill(null));

    masterData.forEach((room) => {
      layout[room.position_y][room.position_x] = {
        book_room_id: room.book_room_id,
        room_name: room.room_name,
        building_name: room.building_name,
        status: room.position_x % 2 === 0 ? "available" : "occupied",
      };
    });

    setRoomLayout(layout);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ background: "#f8f8f8", padding: "10px" }}>
      <SiderFloor floors={Floor} />  
      {/* onFloorSelect={fetchRoomsByFloor} */}
      </Sider>
      

      <Content className="Content" style={{width: "200vh", padding: "20px"}}>
        <Card>
          <div className="Content-header">
            <h1>แผนผังห้อง</h1>
          </div>
        </Card>
        <div className="box-room" 
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // กำหนดให้อยู่ในแนวตั้ง
        }}
        >
          {roomLayout.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>

              {row.map((room, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                >
                  {room ? (
                    <div
                      style={{
                        padding: "10px",
                        marginRight: "10px",
                        border: "1px solid #ddd",
                        backgroundColor: room.status === "available" ? "#a0e3a1" : "#f08a8a",
                      }}
                    >
                      <p>{room.room_name}</p>
                      <p>ID: {room.book_room_id}</p>
                      <p>Building: {room.building_name}</p>
                      <p>Status: {room.status}</p>
                    </div>
                  ) : (
                    <div style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  );
}
