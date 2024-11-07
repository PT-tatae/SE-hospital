package controller

import (
    "net/http"
    "github.com/sut67/team04/config"
    "github.com/sut67/team04/entity"
    "github.com/gin-gonic/gin"
)

type BookRoomResult struct{
	RoomLayoutID	uint `json:"room_layout_id"`

	// BuildingName  string `json:"building_name"`

	RoomNumber   string `json:"room_number"`

    RoomName string `json:"room_name"`

	PositionX int `json:"position_x"`

	PositionY int `json:"position_y"`

    // FloorNumber     string    `json:"floor_number"`
}


func GetBookRoom(c *gin.Context) {
    var results []BookRoomResult
    buildingInput := c.Query("building_name")
    floorInput := c.Query("floor_number")

    db := config.DB()

    query := db.Model(&entity.RoomLayout{}).
        Select(`
            room_layouts.id AS room_layout_id,
            buildings.building_name,
            rooms.room_number,
            room_types.room_name,
            room_layouts.position_x,
            room_layouts.position_y,
            floors.floor_number
        `).
        Joins("LEFT JOIN buildings ON room_layouts.building_id = buildings.id").
        Joins("LEFT JOIN rooms ON room_layouts.room_id = rooms.id").
        Joins("LEFT JOIN room_types ON rooms.room_type_id = room_types.id").
        Joins("LEFT JOIN floors ON rooms.floor_id = floors.id")

    // เพิ่มเงื่อนไขการค้นหาด้วย building_name และ floor_number (ถ้า floor_number มีค่า)
    if buildingInput != "" {
        query = query.Where("buildings.building_name LIKE ?", "%"+buildingInput+"%")
    }
    if floorInput != "" {
        query = query.Where("floors.floor_number = ?", floorInput)
    }

    if err := query.Find(&results).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": err.Error(),
        })
        return
    }

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
