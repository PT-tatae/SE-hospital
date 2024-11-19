package controller

import (
    "net/http"
	"errors"
    "github.com/sut67/team04/config"
    "github.com/sut67/team04/entity"
    "github.com/gin-gonic/gin"
	"gorm.io/gorm"

)

type (
    RoomLayoutResult struct{
        RoomLayoutID	uint `json:"room_layout_id"`
    
        // BuildingName  string `json:"building_name"`
    
        RoomNumber   string `json:"room_number"`
    
        RoomName string `json:"room_name"`
    
        PositionX int `json:"position_x"`
    
        PositionY int `json:"position_y"`
    
        // FloorNumber     string    `json:"floor_number"`
    };
    RoomInyput struct {
		FloorNumber  string  `json:"floor_number"`
		BuildingName string  `json:"building_name"`
		RoomNumber   string  `json:"room_number"`
		RoomName     string  `json:"room_name"`
		BedCapacity  int     `json:"bed_capacity"`
		PositionX    int     `json:"position_x"`
		PositionY    int     `json:"position_y"`
		PricePerNight float32 `json:"price_per_night"`
	}

)


func GetRoomLayout(c *gin.Context) {
    var results []RoomLayoutResult
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
        Joins("INNER JOIN buildings ON floors.building_id = buildings.id").
        Joins("INNER JOIN floors ON room_layouts.floors_id = floors.id").
		Joins("INNER JOIN rooms ON room_layouts.rooms_id = rooms.id").
        Joins("INNER JOIN room_types ON rooms.room_type_id = room_types.id")
        

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
            "error": "ไม่พบข้อมูลผังห้องห้อง",
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "data": results,
    })
}

func AddRoom(c *gin.Context) {
	var roomData RoomInyput;

	// ผูกข้อมูลจาก JSON ใน request มาใส่ใน roomData struct
	if err := c.ShouldBindJSON(&roomData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ข้อมูลไม่ถูกต้อง",
		})
		return
	}

	// เริ่มเชื่อมต่อกับฐานข้อมูล
	db := config.DB()

	// ค้นหาอาคารและชั้นจากชื่อ
	var building entity.Building
	if err := db.Where("building_name = ?", roomData.BuildingName).First(&building).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ไม่พบอาคาร",
		})
		return
	}

	var floor entity.Floor
	if err := db.Where("floor_number = ?", roomData.FloorNumber).First(&floor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ไม่พบชั้น",
		})
		return
	}

    var roomType entity.RoomType
	if err := db.Where("room_name = ?", roomData.RoomName).First(&roomType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ไม่พบประเภทห้อง",
		})
		return
	}

    // ใช้การทำธุรกรรมเพื่อเพิ่มข้อมูลทั้งหมด
	tx := db.Begin()

	// สร้างห้องใหม่
	room := entity.Room{
		RoomNumber:  roomData.RoomNumber,
		RoomTypeID:  roomType.ID, // ผูกกับ RoomType
		BedCapacity: roomData.BedCapacity,
		DepartmentID: 1,
		EmployeeID: 1,

	}

    if err := tx.Create(&room).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ไม่สามารถสร้างห้องได้",
		})
		return
	}

// ตรวจสอบว่ามีข้อมูลในตำแหน่งที่ต้องการอยู่แล้วหรือไม่
var existingRoomLayout entity.RoomLayout
if err := tx.Joins("JOIN rooms ON rooms.id = room_layouts.room_id").
    Where("room_layouts.building_id = ? AND rooms.floor_id = ? AND room_layouts.position_x = ? AND room_layouts.position_y = ?",
        building.ID, floor.ID, roomData.PositionX, roomData.PositionY).
    First(&existingRoomLayout).Error; err == nil {
    // หากมีข้อมูลในตำแหน่งนี้อยู่แล้ว ให้แสดงข้อความหรือจัดการตามที่ต้องการ
    tx.Rollback()
    c.JSON(http.StatusBadRequest, gin.H{
        "error": "มีห้องในตำแหน่งนี้อยู่แล้ว กรุณาเลือกตำแหน่งใหม่",
    })
    return
} else if !errors.Is(err, gorm.ErrRecordNotFound) {
    // กรณีมีข้อผิดพลาดในการค้นหาอื่นๆ ให้ส่ง error กลับไป
    tx.Rollback()
    c.JSON(http.StatusInternalServerError, gin.H{
        "error": "เกิดข้อผิดพลาดในการตรวจสอบตำแหน่ง",
    })
    return
}



	// สร้างข้อมูล RoomLayout
	roomLayout := entity.RoomLayout{
		BuildingID: building.ID,
		FloorID: floor.ID,
		RoomID:     room.ID,
		PositionX:  roomData.PositionX,
		PositionY:  roomData.PositionY,
	}

	
	if err := tx.Create(&roomLayout).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ไม่สามารถสร้างการจัดเรียงห้องได้",
		})
		return
	}

	// คอมมิตการทำธุรกรรม
	tx.Commit()

	c.JSON(http.StatusOK, gin.H{
		"message": "ห้องถูกเพิ่มเรียบร้อยแล้ว",
        "data": room.ID,
	})
}