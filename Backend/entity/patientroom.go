package entity
import (
	"time"
	"gorm.io/gorm"

)
type PatientRoom struct {
	gorm.Model

	PatientID string `json:"patient_id"` 

	RoomID uint
	Room	Room `gorm:"foreignKey:RoomID"`

	AdmissionDate time.Time `json:"admission_date"`

	DischargeDate time.Time	`json:"discharge_date"`

	Status      string `json:"status"`
}