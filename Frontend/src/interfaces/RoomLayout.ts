export interface RoomLayoutInterface {
    room_layout_id: number;  
    room_number: string;
    room_name: string;
    position_x: number;
    position_y: number;
}


// กำหนดประเภทของ roomLayout เป็นอาร์เรย์ 2 มิติของ Room
export type RoomLayout = RoomLayoutInterface[][];
