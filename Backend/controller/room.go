package controller

import (
    "net/http"
    "github.com/sut67/team04/config"
    "github.com/sut67/team04/entity"
    "github.com/gin-gonic/gin"
)

type BookRoomResult struct{
	BookRoomID	uint `json:"book_room_id"`

	BuildingName  string `json:"building_name"`

	RoomNumber   string `json:"room_number"`

    RoomName string `json:"room_name"`

	PositionX int `json:"position_x"`

	PositionY int `json:"position_y"`

    FloorNumber     string    `json:"floor_number"`
}


func GetBookRoom(c *gin.Context) {
    var results []BookRoomResult
    buildingInput := c.Param("building_name") 

    db := config.DB()

    // Query ข้อมูลโดยใช้ joins เพื่อเชื่อมความสัมพันธ์ระหว่างตาราง
    if err := db.Model(&entity.BookRoom{}).
        Select(`
            book_rooms.id AS book_room_id,
            buildings.building_name,
            rooms.room_number,
            room_types.room_name,
            book_rooms.position_x,
            book_rooms.position_y,
            floors.floor_number
        `).
        Joins("LEFT JOIN buildings ON book_rooms.building_id = buildings.id").
        Joins("LEFT JOIN rooms ON book_rooms.room_id = rooms.id").
        Joins("LEFT JOIN room_types ON rooms.room_type_id = room_types.id").
        Joins("LEFT JOIN floors ON rooms.floor_id = floors.id").
        Where("buildings.building_name LIKE ?", "%"+buildingInput+"%").
        Find(&results).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": err.Error(),
        })
        return
    }

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if len(results) == 0 {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "ไม่พบห้อง",
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "data": results,
    })
}