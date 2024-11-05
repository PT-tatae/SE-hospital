package entity

import "gorm.io/gorm"

type Floor struct {

	gorm.Model

    FloorNumber     string    `json:"floor_number"`

	Room []Room `gorm:"foreignKey:FloorID"`
}
