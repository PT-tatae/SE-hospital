package entity

import "gorm.io/gorm"

type RoomType struct {

    gorm.Model

    RoomName string `json:"room_name"`

    PricePerNight float32 `json:"price_per_night"`

    Room []Room `gorm:"foreignKey: RoomTypeID"`
}
