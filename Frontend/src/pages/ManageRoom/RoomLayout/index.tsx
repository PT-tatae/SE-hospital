import { useEffect, useState,  } from "react";
import { Layout, message, Select, Button, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { RoomLayout } from "../../../interfaces/RoomLayout";
import "./room.css";
import { GetFloor, GetRoomLayout, GetBuilding } from "../../../services/https";
import { RoomLayoutInterface } from "../../../interfaces/RoomLayout";
import { FloorInterFace } from "../../../interfaces/Floor";
import { BuildingInterFace } from "../../../interfaces/Building";

import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Option } = Select;

const ManageRoom: React.FC = () => {
  const navigate = useNavigate(); 
  const [Floor, setFloor] = useState<FloorInterFace[]>([]);
  const [closeOption, setCloseOption] = useState<boolean>(true);
  const [Building, setBuilding] = useState<BuildingInterFace[]>([]);

  const [roomLayout, setRoomLayout] = useState<RoomLayout>([]);
  const [DataApiRoomLayout, setDataApiRoomLayout] = useState<
    RoomLayoutInterface[] 
  >([]);

  const [buildingName, setBuildingName] = useState<string | null>(null); // เก็บชื่ออาคาร
  const [floorNumber, setFloorNumber] = useState<string | null>(null); // เก็บหมายเลขชั้น

  useEffect(() => {
    const width = Math.max(
      ...DataApiRoomLayout.map((room) => room?.position_x ?? 0)
    );
    console.log("width", width);

    const height = Math.max(
      ...DataApiRoomLayout.map((room) => room?.position_y ?? 0)
    );
    console.log("height", height);
    // สร้าง layout 2 มิติ
    const layout = Array.from({ length: height + 1 }, () =>
      Array(width + 1).fill(null)
    );
    console.log("layout", layout);

    DataApiRoomLayout.forEach((room) => {
      if (room?.position_x !== undefined && room?.position_y !== undefined) {
        layout[room.position_y][room.position_x] = {
          room_number: room.room_number,
          block_room_id: room.room_layout_id,
          room_name: room.room_name,
        };
      }
    });

    setRoomLayout(layout);
  }, [DataApiRoomLayout]);

  console.log("roomLayout", roomLayout);

  const fetchRoomsLayout = async (
    buildingName: string,
    floorNumber: string
  ) => {
    try {
      const response = await GetRoomLayout(buildingName, floorNumber);
      console.log("GetRoomLayout", response);

      if (response && response.data && Array.isArray(response.data)) {
        setDataApiRoomLayout(response.data); // Access response.data
        console.log("DataApiRoomLayout", response.data);
      } else if (response && response.error) {
        // ใช้ข้อความ error ที่ส่งมาจาก API
        message.error(response.error);
      }else {
        message.error("ไม่สามารถดึงข้อมูลห้องได้");
      }
    } catch (error) {
      message.error("ไม่สามารถดึงข้อมูลได้");
      console.error(error);
    }
  };

  const addlayoutRoom = () => {
    navigate('/ManageRoom/Create');
  };

  const fetchFloorData = async (value: string) => {
    try {
      const response = await GetFloor(value); // เรียกใช้ GetFloor เพื่อดึงข้อมูล
      if (response && response.data) {
        setFloor(response.data); // อัปเดตข้อมูล floor ใน state
        console.log("response-Floor", response.data); // ตรวจสอบข้อมูลที่ได้
      } else if (response && response.error) {
        // ใช้ข้อความ error ที่ส่งมาจาก API
        message.error(response.error);
      }else {
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
      } else if (response && response.error) {
        // ใช้ข้อความ error ที่ส่งมาจาก API
        message.error(response.error);
      }else {
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

  const handleChangeOptionBuilding = (value: string) => {
    setRoomLayout([]);
    setBuildingName(value); // อัปเดตชื่ออาคาร
    setCloseOption(false);
    fetchFloorData(value);
  };

  const handleChangeOptionFloor = (value: string) => {
    setFloorNumber(value);

    if (buildingName && value) {
      fetchRoomsLayout(buildingName, value); // ถ้ามีทั้งอาคารและชั้น เรียกข้อมูลห้อง
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
                value={floorNumber || null} // ควบคุมค่า state
                onChange={(value) => {
                  if (value === "clear") {
                    setFloorNumber(null); // ล้างค่า state
                  } else {
                    handleChangeOptionFloor(value); // อัปเดต state และเรียกฟังก์ชัน
                    setFloorNumber(value);
                  }
                }}
                disabled={closeOption}
              >
                <Option
                  value="clear"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  ล้างการเลือก
                </Option>
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
                value={buildingName || null} // ควบคุมค่า state
                onChange={(value) => {
                  if (value === "clear") {
                    setBuildingName(null); // ล้างค่า state
                    setCloseOption(true);
                  } else {
                    setFloorNumber(null); // ล้างค่า state
                    handleChangeOptionBuilding(value); // อัปเดต state และเรียกฟังก์ชัน
                    setBuildingName(value);
                  }
                }}
              >
                <Option
                  value="clear"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  ล้างการเลือก
                </Option>
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
              <Button danger>
                แก้ไขแผนผังห้อง
              </Button>
              <Button type="primary"  onClick={addlayoutRoom} >เพื่มแผนผังห้อง</Button>
            </div>
          </div>

          <div className="content-block2">
            <div className="box-room">
              {roomLayout.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{ display: "flex"}}
                >
                  {row.map((room, colIndex) => (
                    <div
                      key={colIndex}
                      style={{ width: "140px", height: "140px",textAlign:"center",margin:"10px" }}
                    >
                      {room ? (
                        <div className="box-data-room">
                          <p style={{fontSize:"24px",margin:"10px"}}>{room.room_number} </p>
                          <p style={{fontSize:"16px",margin:"10px"}}>ประเภทห้อง</p>
                          <p style={{fontSize:"24px",margin:"10px"}}>{room.room_name}</p>     
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
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ManageRoom;
