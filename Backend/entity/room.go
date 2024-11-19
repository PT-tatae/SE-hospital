package entity

import "gorm.io/gorm"

type Room struct {

    gorm.Model

    RoomNumber  string `json:"room_number"`

    RoomTypeID  uint   
	RoomType  RoomType `gorm:"foreignKey: RoomTypeID"`

    BedCapacity int    `json:"bed_capacity"`

    DepartmentID uint
    Department Department `gorm:"foreignKey:DepartmentID"`

    EmployeeID uint
    Employee Employee `gorm:"foreignKey:EmployeeID"`

    PatientRoom []PatientRoom `gorm:"foreignKey:RoomID"`
    
    RoomLayout RoomLayout `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

