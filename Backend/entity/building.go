package entity

import "gorm.io/gorm"

type Building struct {
    gorm.Model
    BuildingName  string `json:"building_name"`
    Location      string `json:"location"`

	Floor []Floor `gorm:"foreignKey:BuildingID"`
}
