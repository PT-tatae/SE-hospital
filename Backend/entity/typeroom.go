package entity

import "gorm.io/gorm"

type RoomType struct {

    gorm.Model

    RoomName string `json:"room_name"`

    Room []Room `gorm:"foreignKey: RoomTypeID"`
}
