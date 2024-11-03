package entity

import "gorm.io/gorm"

type Floor struct {

	gorm.Model

    BuildingID uint   `json:"building_id"` 
	Building	   Building `gorm:"foreignKey:BuildingID"`	

    Number     int    `json:"number"`

	Room []Room `gorm:"foreignKey:FloorID"`
}
