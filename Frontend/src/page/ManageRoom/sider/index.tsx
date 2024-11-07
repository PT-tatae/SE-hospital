// SiderFloor.tsx
import { Menu } from "antd";

interface SiderFloorProps {
  floors: Array<{ floor_number: number }>;
  //onFloorSelect: (floorNumber: number) => void;
}

const SiderFloor: React.FC<SiderFloorProps> = ({ floors}) => { //, onFloorSelect 
  return (
    <div className="siderfloor">
      <h1 style={{ color: "black" }}>ชั้นที่</h1>
      <Menu
        //onClick={(item) => onFloorSelect(parseInt(item.key))} // เรียก onFloorSelect เมื่อเลือกชั้น
      >
        {floors.map((floor) => (
          <Menu.Item key={floor.floor_number}>
            {`ชั้นที่ ${floor.floor_number}`}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default SiderFloor;
