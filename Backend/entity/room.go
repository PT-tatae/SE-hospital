package entity

import "gorm.io/gorm"

type Room struct {

    gorm.Model

    RoomNumber  string `json:"room_number"`

    RoomTypeID  uint   
	RoomType  RoomType `gorm:"foreignKey: RoomTypeID"`


    FloorID     uint   
    Floor Floor    `gorm:"foreignKey:FloorID"`

    BuildingID    uint
    Building    Building `gorm:"foreignKey:BuildingID"`

    BedCapacity int    `json:"bed_capacity"`

    PatientRoom []PatientRoom `gorm:"foreignKey:RoomID"`
    
    RoomLayout RoomLayout `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

