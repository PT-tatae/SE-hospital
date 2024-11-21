import { useEffect, useState } from "react";
import { Layout, message, Select, Button, Input } from "antd";
import { GetFloor, GetRoomLayout, GetBuilding } from "../../../services/https";
import { RoomLayoutInterface } from "../../../interfaces/RoomLayout";
import { FloorInterFace } from "../../../interfaces/Floor";
import { BuildingInterFace } from "../../../interfaces/Building";
const { Header, Content } = Layout;
const { Option } = Select;
import "./CreateRoom.css";

const CreateRoomLayout: React.FC = () => {
  return (
    <Layout className="layout-create-room">
      <Header className="header-create-room">
        <h1>เพิ่มผังห้อง</h1>
      </Header>
      <Content className="content-create-room">
        <div className="content-block1">
          <div className="box-input">
            <p>เลือกขนาดผังห้อง</p>
            <Input
              type="number"
              placeholder="คอลัม"
              min={0}
              className="input-box-side-array"
            />
            <p>X</p>
            <Input
              type="number"
              placeholder="แถว"
              min={0}
              className="input-box-side-array"
            />
          </div>
          <div className="box-select-data">
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
      </Content>
    </Layout>
  );
};
export default CreateRoomLayout;
