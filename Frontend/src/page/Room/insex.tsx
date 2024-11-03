export default function Room() {
    const dataRoom = [
      { ID: 1, Name: "Room 101", Status: "available" },
      { ID: 2, Name: "Room 102", Status: "occupied" },
      { ID: 3, Name: "Room 201", Status: "available" },
      { ID: 4, Name: "Room 202", Status: "occupied" },
      { ID: 5, Name: "Room 301", Status: "available" },
      { ID: 6, Name: "Room 302", Status: "occupied" },
      { ID: 7, Name: "Room 401", Status: "available" },
      { ID: 8, Name: "Room 402", Status: "occupied" },
      // สามารถเพิ่มห้องได้ตามต้องการ
    ];
  
    const roomLayout = [];
    let index = 0;
  
    // แถวแรก มี 5 ห้อง
    roomLayout.push(dataRoom.slice(index, index + 5));
    index += 5;
  
    // แถวที่เหลือ มี 1 ห้องต่อแถว
    while (index < dataRoom.length) {
      roomLayout.push([dataRoom[index]]);
      index += 1;
    }
  
    return (
      <div>
        {roomLayout.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
            {row.map((room) => (
              <div
                key={room.ID}
                style={{
                  padding: "10px",
                  marginRight: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: room.Status === "available" ? "#a0e3a1" : "#f08a8a",
                }}
              >
                <p>{room.Name}</p>
                <p>Status: {room.Status}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  