
export interface Room {
    book_room_id?: number;
    room_name?: string;
    building_name?: string;
    status?: string;
}

// กำหนดประเภทของ roomLayout เป็นอาร์เรย์ 2 มิติของ Room หรือ null
export type RoomLayout = (Room | null)[][];
