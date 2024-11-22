import { useEffect, useState } from "react";
import { Layout, message, Select, Button, Input } from "antd";
import { GetFloor, GetRoomLayout, GetBuilding } from "../../../services/https";
import { RoomLayoutInterface } from "../../../interfaces/RoomLayout";
import { FloorInterFace } from "../../../interfaces/Floor";
import { BuildingInterFace } from "../../../interfaces/Building";
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Option } = Select;
import "./CreateRoom.css";

const CreateRoomLayout: React.FC = () => {
  const navigate = useNavigate(); 
  const [SizeArrayX,setSizeArrayX] = useState<number>(1);
  const [SizeArrayY,setSizeArrayY] = useState<number>(1);

  const creatRoom = (x: number, y: number)=>{
    console.log("position_x",x);
    console.log("position_y",y);
  }

  const handleSizeArrayXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    setSizeArrayX(value >0 ? value : 0); // กำหนดค่าอย่างน้อยเป็น 0
  };

  const handleSizeArrayYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    setSizeArrayY(value >0 ? value : 0); // กำหนดค่าอย่างน้อยเป็น 0
  };

  return (
    <Layout className="layout-create-room">
      <Header className="header-create-room">
        <h1>เพิ่มผังห้อง</h1>
      </Header>
      <Content className="content-create-room">
        <div className="content-block1">
          <div className="box-input">
            <Button danger onClick={() => navigate('/ManageRoom')}>ย้อนกลับ</Button>
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
            <Option value="1" style={{ color: "red", fontWeight: "bold" }}>เพิ่มชั้นใหม่</Option>
            <Option value="2" >ชั้น 1</Option>
            </Select>

            <Select placeholder="เลือกอาคาร" style={{ width: 120 }}>
              <Option value="1" style={{ color: "red", fontWeight: "bold" }}>เพิ่มอาคารใหม่</Option>
              <Option value="2" >อาคาร A</Option>
            </Select>
          </div>
        </div>
        <div className="content-block2">
        <p>คอลัมน์: {SizeArrayX}</p>
        <p>แถว: {SizeArrayY}</p>
        </div>
      </Content>
    </Layout>
  );
};
export default CreateRoomLayout;
