package entity

import "gorm.io/gorm"

type Floor struct {

	gorm.Model

    FloorNumber     string    `json:"floor_number"`

	BuildingID uint
	Building Building `gorm:"foreignKey:BuildingID"`

	RoomLayout []RoomLayout `gorm:"foreignKey:FloorID"`
}
