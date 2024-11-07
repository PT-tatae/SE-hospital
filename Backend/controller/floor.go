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
	

func GetFloor(c *gin.Context){
	var floors []Floor
	results := config.DB().Model(&entity.Floor{}).Find(&floors)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, floors)
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
