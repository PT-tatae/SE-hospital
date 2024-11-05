package entity

import "gorm.io/gorm"

type Patient struct {
	gorm.Model

	PatientName string `json:"patient_name"`

	PatientRoom []PatientRoom `gorm:"foreignKey:PatientID"`


}