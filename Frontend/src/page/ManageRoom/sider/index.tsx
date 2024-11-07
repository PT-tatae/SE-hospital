import { Menu } from "antd";

interface SiderFloorProps {
  floors: Array<{ floor_number: string }>;
  building: string;
  onFloorSelect: (buildingName: string, floorNumber: string) => void; // เปลี่ยน floorNumber เป็น string
}

const SiderFloor: React.FC<SiderFloorProps> = ({ floors, building, onFloorSelect }) => {
  console.log("SiderFloor floors ",floors);
  console.log("SiderFloor building ",building);

  if (!floors || floors.length === 0) {
    return <div>ไม่มีข้อมูลชั้น</div>; // แสดงข้อความเมื่อไม่มีข้อมูล
  }
  
  return (
    <div className="siderfloor">
      <h1 style={{ color: "black" }}>ชั้นที่</h1>
      <Menu
        onClick={(item) => onFloorSelect(building, item.key)} // ส่ง floorNumber เป็น string
      >
        {Array.isArray(floors) && floors.map((floor) => (
          <Menu.Item key={floor.floor_number.toString()}>
            {`ชั้นที่ ${floor.floor_number}`}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default SiderFloor;
