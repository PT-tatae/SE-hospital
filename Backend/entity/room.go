package entity

import "gorm.io/gorm"

type Room struct {

    gorm.Model

    RoomNumber  string `json:"room_number"`

    RoomTypeID  uint   
	RoomType  RoomType `gorm:"foreignKey: RoomTypeID"`

    Status      string `json:"status"`

    FloorID     uint   
    Floor Floor    `gorm:"foreignKey:FloorID"`

    BedCapacity int    `json:"bed_capacity"`
}

