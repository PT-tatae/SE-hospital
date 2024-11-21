package controller

import (
    "net/http"
    "github.com/sut67/team04/config"
    "github.com/sut67/team04/entity"
    "github.com/gin-gonic/gin"
)

type (
	Building struct{
		BuildingName string `json:"building_name"`
	};
)

func GetBuilding(c * gin.Context){
	var buildings []Building

	results := config.DB().Model(&entity.Building{}).Find(&buildings)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": buildings})
}

func AddBuilding(c *gin.Context) {
    buildingNumberInput := c.Param("building_name")
    var building entity.Building

    // ผูกข้อมูล JSON เข้ากับโครงสร้าง Floor
    if err := c.ShouldBindJSON(&building); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ตรวจสอบและเพิ่มข้อมูลด้วย FirstOrCreate
    result := config.DB().Where("building_name = ?", buildingNumberInput).FirstOrCreate(&building)

    // ตรวจสอบว่าการเพิ่มข้อมูลมีปัญหาหรือไม่
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "เพิ่มสำเร็จ"})
}