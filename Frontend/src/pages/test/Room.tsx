import React, { useEffect, useState } from 'react';

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

export default function Room() {
    const [roomLayout, setRoomLayout] = useState([]);

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

    return (
        <div>
            {roomLayout.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
                    {row.map((room, colIndex) => (
                        <div
                            key={colIndex}
                            style={{
                              width: "200px",
                              height: "200px",}}
                        >
                            {room ? (
                                <div  style ={{
                                padding: "10px",
                                marginRight: "10px",
                                border: "1px solid #ddd",
                                backgroundColor: room ? (room.status === "available" ? "#a0e3a1" : "#f08a8a") : "transparent",
                                }}>
                                    <p>{room.room_name}</p>
                                    <p>ID: {room.book_room_id}</p>
                                    <p>Building: {room.building_name}</p>
                                    <p>Status: {room.status}</p>
                                </div>
                            ) : (
                                // สร้าง div เปล่าที่มีขนาดเดียวกันเพื่อรักษารูปแบบ
                                <div style={{ width: "100%", height: "100%" ,backgroundColor: "transparent"}}></div> 
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
