import axios from "axios";

import { RoomLayoutInterface } from "../../interface/bookroom";
import { FloorInterFace } from "../../interface/Floor";

const apiUrl = "http://localhost:8000";

const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
};

async function GetRoomLayout(data: RoomLayoutInterface) {
    return await axios
      .post(`${apiUrl}/RoomLayout`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFloor(data: FloorInterFace) {
    return await axios
      .post(`${apiUrl}/floor`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetBuilding(data: FloorInterFace) {
    return await axios
      .post(`${apiUrl}/building`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

export{
    GetRoomLayout,
    GetFloor,
    GetBuilding,
}