import { useEffect, useState } from "react";
import { Layout, message, Select, Button, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { RoomLayout } from "../../../interfaces/RoomLayout";
import "./room.css";

import { GetFloor, GetRoomLayout, GetBuilding } from "../../../services/https";
import { RoomLayoutInterface } from "../../../interfaces/RoomLayout";
import { FloorInterFace } from "../../../interfaces/Floor";
import { BuildingInterFace } from "../../../interfaces/Building";


const { Header, Content } = Layout;
const { Option } = Select;

const ManageRoom: React.FC = () => {
  const [Floor, setFloor] = useState<FloorInterFace[]>([]);
  const [closeOption,setCloseOption] = useState(true);
  const [Building, setBuilding] = useState<BuildingInterFace[]>([]);

  const [roomLayout, setRoomLayout] = useState<RoomLayout>([]);
  const [DataApiRoomLayout, setDataApiRoomLayout] = useState<RoomLayoutInterface[]>([]);


  const [buildingName, setBuildingName] = useState<string>(""); // เก็บชื่ออาคาร

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

  const fetchRoomsByFloor = async (
    buildingName: string,
    floorNumber: string,
  ) => {
    try {
      const response = await GetRoomLayout(buildingName, floorNumber);
      console.log("GetRoomLayout",response);
      
      if (response && response.data && Array.isArray(response.data)) {
        setDataApiRoomLayout(response.data); // Access response.data
        console.log("roomLayout", response.data);
      } else {
        message.error("ไม่สามารถดึงข้อมูลห้องได้");
      }
    } catch (error) {
      message.error("ไม่สามารถดึงข้อมูลได้");
      console.error(error);
    }
  };


  

  const addlayoutRoom = () => {
    console.log("clik");
  };

  const fetchFloorData = async (value:string) => {
    try {
      const response = await GetFloor(value); // เรียกใช้ GetFloor เพื่อดึงข้อมูล
      if (response && response.data) {
        setFloor(response.data); // อัปเดตข้อมูล floor ใน state
        console.log("response-Floor", response.data); // ตรวจสอบข้อมูลที่ได้
      } else {
        message.error("ไม่สามารถดึงข้อมูลชั้นได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      console.error(error);
    }
  };
  const fetchBuildingData = async () => {
    try {
      const response = await GetBuilding();
      if (Array.isArray(response.data) && response.data.length > 0) {
        setBuilding(response.data);
        console.log("Building", response.data);
      } else {
        message.error("ไม่สามารถดึงข้อมูลอาคารได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBuildingData();
    //
    //fetchRoomsByFloor("อาคาร A","1");
  }, []);

  const handleChangeOptionBuilding =(value: string) =>{
    setBuildingName(value); // อัปเดตชื่ออาคาร
    setCloseOption(false)
    fetchFloorData(value);
  }
  const handleChangeOptionFloor = (value: string) => {
    console.log("handleChangeOptionFloor-value",value);
    
    console.log(" handlebuildingName",buildingName);
    console.log(" handlefloorNumber",value);
    
    
    if (buildingName && value) {
      fetchRoomsByFloor(buildingName, value); // ถ้ามีทั้งอาคารและชั้น เรียกข้อมูลห้อง
    }
  };

  return (
    <div>
      <Layout className="room-layout">
        <Header className="header-roomlayout">
          <h1 className="h1-header">แผนผังห้อง</h1>
          <div className="input-container">
            <Input placeholder="ค้นหาห้อง" suffix={<SearchOutlined />} />;
            <div className="filter-box">
              <FilterOutlined />
            </div>
          </div>
        </Header>
        <Content className="content-roomlayout">
          <div className="content-block1">
            <div className="block-option">
              <Select
                placeholder="เลือกชั้น"
                style={{ width: 120 }}
                onChange={handleChangeOptionFloor}
                disabled={closeOption}
              >
                {Floor && Floor.length > 0 ? (
                  Floor.map((Floor, index) => (
                    <Option key={index} value={Floor.floor_number}>
                      {Floor.floor_number}
                    </Option>
                  ))
                ) : (
                  <Option value="no-floor" disabled>
                    ยังไม่มีชั้น
                  </Option>
                )}
              </Select>
              <Select
                placeholder="เลือกอาคาร"
                style={{ width: 140 }}
                onChange={handleChangeOptionBuilding}
              >
                {Building && Building.length > 0 ? (
                  Building.map((building, index) => (
                    <Option key={index} value={building.building_name}>
                      {building.building_name}
                    </Option>
                  ))
                ) : (
                  <Option value="no-building" disabled>
                    ยังไม่มีอาคาร
                  </Option>
                )}
              </Select>
            </div>

            <div className="block-button">
              <Button danger onClick={addlayoutRoom}>
                แก้ไขแผนผังห้อง
              </Button>
              <Button type="primary">เพื่มแผนผังห้อง</Button>
            </div>
          </div>

          <div className="content-block2"></div>
        </Content>
      </Layout>
    </div>
  );
};

export default ManageRoom;
