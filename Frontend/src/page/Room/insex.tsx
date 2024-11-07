import React, { useEffect, useState } from 'react';
import { RoomLayout } from '../../interface/room';
const masterData = [
    { book_room_id: 1, building_name: "อาคาร A", room_number: "101", room_name: "ห้อง ICU", position_x: 0, position_y: 0 },
    //{ book_room_id: 2, building_name: "อาคาร A", room_number: "102", room_name: "ห้องเดี่ยว", position_x: 0, position_y: 1 },
    { book_room_id: 3, building_name: "อาคาร B", room_number: "201", room_name: "ห้องรวม", position_x: 1, position_y: 0 },
    { book_room_id: 4, building_name: "อาคาร B", room_number: "202", room_name: "ห้องรวม", position_x: 1, position_y: 1 }, 
  { book_room_id: 5, building_name: "อาคาร C", room_number: "301", room_name: "ห้อง ICU", position_x: 2, position_y: 0 },
    //{ book_room_id: 6, building_name: "อาคาร C", room_number: "302", room_name: "ห้องเดี่ยว", position_x: 2, position_y: 1 },
    //{ book_room_id: 7, building_name: "อาคาร D", room_number: "401", room_name: "ห้องรวม", position_x: 3, position_y: 0 },
    { book_room_id: 8, building_name: "อาคาร D", room_number: "402", room_name: "ห้องรวม", position_x: 3, position_y: 1 },
];

export default function BookRoom(){
    

    const [roomLayout, setRoomLayout] = useState<RoomLayout>([]);


    useEffect(() => {
        const width = Math.max(...masterData.map(room => room.position_x)) + 1;
        const height = Math.max(...masterData.map(room => room.position_y)) + 1;

        // สร้างโครงสร้างห้อง
        const layout = Array.from({ length: height }, () => Array(width).fill(null));

        masterData.forEach(room => {
            layout[room.position_y][room.position_x] = {
                book_room_id: room.book_room_id,
                room_name: room.room_name,
                building_name: room.building_name,
                status: room.position_x % 2 === 0 ? "available" : "occupied", // ตัวอย่างสถานะ
            };
        });

        setRoomLayout(layout);
    }, []);
    return(
        <>

        </>
    )
}
    
