export interface RoomLayoutInterface {
    room_layout_id: number;  
    room_number: string;
    room_name: string;
    position_x: number;
    position_y: number;
    book_room_id: number; // Add this field
    building_name: string; // Add this field
    status: string; // Add this field
}


// กำหนดประเภทของ roomLayout เป็นอาร์เรย์ 2 มิติของ Room
export type RoomLayout = RoomLayoutInterface[][];
