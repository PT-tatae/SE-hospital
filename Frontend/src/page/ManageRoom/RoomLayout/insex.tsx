import { useEffect, useState } from "react";
import { Layout, Card, message } from "antd";
import { RoomLayout } from "../../../interface/RoomLayout";
//import "./room.css";
import SiderFloor from "../sider";

import { GetFloor, GetRoomLayout, GetBuilding } from "../../../service/https";
import { RoomLayoutInterface } from "../../../interface/RoomLayout";
import { FloorInterFace } from "../../../interface/Floor";
import { BuildingInterFace } from "../../../interface/Building";

const { Sider, Content } = Layout;

export default function LayoutRoom() {
  const [roomLayout, setRoomLayout] = useState<RoomLayout>([]);
  const [Floor, setFloor] = useState<FloorInterFace[]>([]); 
  const [DataApiRoomLayout, setDataApiRoomLayout] = useState<RoomLayoutInterface[]>([]);
  const [Building,setBuilding] = useState<BuildingInterFace>();

  useEffect(() => {
    const width = Math.max(...DataApiRoomLayout.map((room) => room?.position_x ?? 0)) + 1;
    const height = Math.max(...DataApiRoomLayout.map((room) => room?.position_y ?? 0)) + 1;
    
    // สร้าง layout 2 มิติ
    const layout = Array.from({ length: height }, () => Array(width).fill(null));
    
    DataApiRoomLayout.forEach((room) => {
      if (room?.position_x !== undefined && room?.position_y !== undefined) {
        layout[room.position_y][room.position_x] = {
          book_room_id: room.room_layout_id,
          room_name: room.room_name,
          status: room.position_x % 2 === 0 ? "available" : "occupied",
        };
      }
    });
  
    setRoomLayout(layout);
  }, [DataApiRoomLayout]);
  
  

  const fetchBuildingData = async () => {
    try {
      const response = await GetBuilding();
      if (response && response.data) {
        setBuilding(response.data);
        console.log("Building", response.data);
      } else {
        message.error("ไม่สามารถดึงข้อมูลชั้นได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      console.error(error);
    }
  };

  const fetchFloorData = async () => {
    try {
      const response = await GetFloor(); // เรียกใช้ GetFloor เพื่อดึงข้อมูล
      if (response && response.data) {
        setFloor(response.data); // อัปเดตข้อมูล floor ใน state
        console.log("Floor", response.data); // ตรวจสอบข้อมูลที่ได้
      } else {
        message.error("ไม่สามารถดึงข้อมูลชั้นได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchFloorData();
    fetchBuildingData();
  }, []);

  const fetchRoomsByFloor = async (
    buildingName: string,
    floorNumber: string
  ) => {
    try {
      // ส่งพารามิเตอร์ทั้งสองให้กับ GetRoomLayout
      const response = await GetRoomLayout(buildingName, floorNumber);
      if (response && response.data) {
        setDataApiRoomLayout(response.data.rooms);
        console.log("roomLayout", roomLayout);
      } else {
        message.error("ไม่สามารถดึงข้อมูลห้องได้");
      }
    } catch (error) {
      message.error("ไม่สามารถดึงข้อมูลได้");
      console.error(error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ background: "#f8f8f8", padding: "10px" }}>
        <SiderFloor
          floors={Floor}
          building={"อาคาร A"}
          onFloorSelect={fetchRoomsByFloor}
        />
      </Sider>

      <Content className="Content" style={{ width: "200vh", padding: "20px" }}>
        <Card>
          <div className="Content-header">
            <h1>แผนผังห้อง</h1>
          </div>
        </Card>
        <div
          className="box-room"
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column", // กำหนดให้อยู่ในแนวตั้ง
          }}
        >
          {roomLayout.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: "flex", marginBottom: "10px" }}
            >
              {row.map((room, colIndex) => (
                <div key={colIndex} style={{ width: "200px", height: "200px" }}>
                  {room ? (
                    <div
                      style={{
                        padding: "10px",
                        marginRight: "10px",
                        border: "1px solid #ddd",
                        backgroundColor:
                          room.status === "available" ? "#a0e3a1" : "#f08a8a",
                      }}
                    >
                      <p>{room.room_name}</p>
                      <p>ID: {room.book_room_id}</p>
                      <p>Building: {room.building_name}</p>
                      <p>Status: {room.status}</p>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                      }}
                    ></div>
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
