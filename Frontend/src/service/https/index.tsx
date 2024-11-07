import axios from "axios";


const apiUrl = "http://localhost:8000";

const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
};

async function GetRoomLayout(buildingName: string, floorNumber: string) {
    return await axios
        .get(`${apiUrl}/RoomLayout?building_name=${buildingName}&floor_number=${floorNumber}`, requestOptions) 
        .then((res) => res)
        .catch((e) => {
            console.error("API error:", e.response);  // ดูข้อมูลข้อผิดพลาดที่มาจาก API
            return e.response;
        });
}


async function GetFloor() {
    return await axios
      .get(`${apiUrl}/floor`, requestOptions)
      .then((res) => res)
      .catch((e) => {
        console.error("API error:", e.response);  // ดูข้อมูลข้อผิดพลาดที่มาจาก API
        return e.response;
    });
}

async function GetBuilding() {
    return await axios
      .get(`${apiUrl}/building`, requestOptions)
      .then((res) => res)
      .catch((e) => {
        console.error("API error:", e.response);  // ดูข้อมูลข้อผิดพลาดที่มาจาก API
        return e.response;
    });
}

export{
    GetRoomLayout,
    GetFloor,
    GetBuilding,
}