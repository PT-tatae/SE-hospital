package controller

import (
    "net/http"
    "github.com/sut67/team04/config"
    "github.com/sut67/team04/entity"
    "github.com/gin-gonic/gin"
)
type (
	Floor struct{
		FloorNumber string `json:"floor_number"`
	};
)
	

func GetFloor(c *gin.Context) {
    buildingName := c.Param("building_name")
    var results []Floor

    db := config.DB()
    query := db.Model(&entity.Floor{}).
        Select("DISTINCT floors.floor_number AS floor_number").
        Joins("LEFT JOIN rooms ON rooms.floor_id = floors.id").
        Joins("LEFT JOIN room_layouts ON room_layouts.room_id = rooms.id").
        Joins("LEFT JOIN buildings ON room_layouts.building_id = buildings.id")

    if buildingName != "" {
        query = query.Where("buildings.building_name LIKE ?", buildingName)
    }

    if err := query.Find(&results).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": err.Error(),
        })
        return
    }

     // ตรวจสอบว่ามีข้อมูลหรือไม่
     if len(results) == 0 {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "อาคารนี้ยังไม่มีชั้นในอาคาร",
        })
        return
    }

    c.JSON(http.StatusOK, results)
}


func AddFloor(c *gin.Context) {
    floorNumberInput := c.Param("floor_number")
    var floor entity.Floor

    // ผูกข้อมูล JSON เข้ากับโครงสร้าง Floor
    if err := c.ShouldBindJSON(&floor); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ตรวจสอบและเพิ่มข้อมูลด้วย FirstOrCreate
    result := config.DB().Where("floor_number = ?", floorNumberInput).FirstOrCreate(&floor)

    // ตรวจสอบว่าการเพิ่มข้อมูลมีปัญหาหรือไม่
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "เพิ่มสำเร็จ"})
}
