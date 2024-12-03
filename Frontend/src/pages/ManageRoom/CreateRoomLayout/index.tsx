import { useEffect, useState } from "react";
import { Layout, message, Select, Button, Input, Modal } from "antd";
import { GetFloor, GetRoomLayout, GetBuilding } from "../../../services/https";
import { RoomLayoutInterface } from "../../../interfaces/RoomLayout";
import { FloorInterFace } from "../../../interfaces/Floor";
import { BuildingInterFace } from "../../../interfaces/Building";
import { useNavigate } from "react-router-dom";
import { RoomLayout } from "../../../interfaces/RoomLayout";

const { Header, Content } = Layout;
const { Option } = Select;
import "./CreateRoom.css";

const CreateRoomLayout: React.FC = () => {
  const navigate = useNavigate();
  const [SizeArrayX, setSizeArrayX] = useState<number>(1);
  const [SizeArrayY, setSizeArrayY] = useState<number>(1);
  const [roomLayout, setRoomLayout] = useState<RoomLayout>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [arrayXBoxRoom,setArrayXBoxRoom] = useState<number>(0);
  const [arrayYBoxRoom,setArrayYBoxRoom] = useState<number>(0);

  

  const creatRoom = (x: number, y: number, newRoomName: string) => {
    console.log("position_x", x);
    console.log("position_y", y);
    console.log("newRoomName", newRoomName);
  };
  useEffect(() => {
    const layout = Array.from({ length: SizeArrayY }, (_, rowIndex) =>
      Array.from({ length: SizeArrayX }, (_, colIndex) => ({
        position_x: colIndex,
        position_y: rowIndex,
        room_name: "", // ค่าเริ่มต้นเป็นห้องว่าง
      }))
    );
    setRoomLayout(layout);
  }, [SizeArrayX, SizeArrayY]);

  const handleSizeArrayXChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.valueAsNumber;
    setSizeArrayX(value > 0 ? value : 0); // กำหนดค่าอย่างน้อยเป็น 0
  };

  const handleSizeArrayYChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.valueAsNumber;
    setSizeArrayY(value > 0 ? value : 0); // กำหนดค่าอย่างน้อยเป็น 0
  };

  // ฟังก์ชันจัดการเมื่อคลิก div
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setArrayXBoxRoom(colIndex);
    setArrayYBoxRoom(rowIndex);
    setIsModalVisible(true);
    
  };
  const handleOK = () =>{
    const targetRoom = roomLayout[arrayYBoxRoom][arrayXBoxRoom];

    if (!targetRoom.room_name) {
      const newRoomName = prompt("Enter a name for this room:");

      if (newRoomName) {
        const updatedLayout = [...roomLayout];
        updatedLayout[arrayYBoxRoom][arrayXBoxRoom] = {
          ...targetRoom,
          room_name: newRoomName,
        };
        setRoomLayout(updatedLayout);
        creatRoom(arrayYBoxRoom, arrayXBoxRoom, newRoomName);
      }
    } else {
      alert(`This room is already named: ${targetRoom.room_name}`);
    }
  }

  return (
    <Layout className="layout-create-room">
      <Header className="header-create-room">
        <h1>เพิ่มผังห้อง</h1>
      </Header>
      <Content className="content-create-room">
        <div className="content-block1">
          <div className="box-input">
            <Button danger onClick={() => navigate("/ManageRoom")}>
              ย้อนกลับ
            </Button>
          </div>
          <div className="box-select-data">
            <p>เลือกขนาดผังห้อง</p>
            <Input
              type="number"
              placeholder="คอลัม"
              min={0}
              className="input-box-side-array"
              onChange={handleSizeArrayXChange}
              value={SizeArrayX ?? ""}
            />
            <p>X</p>
            <Input
              type="number"
              placeholder="แถว"
              min={0}
              className="input-box-side-array"
              onChange={handleSizeArrayYChange}
              value={SizeArrayY ?? ""}
            />
            <Select placeholder="เลือกชั้น" style={{ width: 120 }}>
              <Option value="1" style={{ color: "red", fontWeight: "bold" }}>
                เพิ่มชั้นใหม่
              </Option>
              <Option value="2">ชั้น 1</Option>
            </Select>

            <Select placeholder="เลือกอาคาร" style={{ width: 120 }}>
              <Option value="1" style={{ color: "red", fontWeight: "bold" }}>
                เพิ่มอาคารใหม่
              </Option>
              <Option value="2">อาคาร A</Option>
            </Select>
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
                    style={{
                      width: "140px",
                      height: "140px",
                      
                      textAlign: "center",
                      margin:"10px",
                    }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    <div className="box-data-room">
                      {room.room_name || "ว่าง"}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Modal
        title="ตั้งค่าห้อง"
        visible={isModalVisible}
        onOk={() => {
          handleOK();
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
        >
          <p>แก้ไขชื่อห้อง: {roomLayout[arrayYBoxRoom]?.[arrayXBoxRoom]?.room_name || "ว่าง"}</p>
          <p>ตำแหน่ง: X = {arrayXBoxRoom + 1}, Y = {arrayYBoxRoom + 1}</p>

        </Modal>
      </Content>
    </Layout>
    
  );
};
export default CreateRoomLayout;

