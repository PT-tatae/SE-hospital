package entity
import (
	"gorm.io/gorm"
)

type RoomLayout struct{
	gorm.Model
	BuildingID uint
	Building Building `json:"BuildingID"`

	RoomID uint
	Room   *Room `gorm:"foreignKey:RoomID"`

	PositionX int `json:"position_x"`

	PositionY int `json:"position_y"`
}