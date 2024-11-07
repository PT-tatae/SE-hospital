package config

import (
	"fmt"
	"github.com/sut67/team04/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"time"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("SE_Project_G04.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Building{},
		&entity.Floor{},
		&entity.RoomType{},
		&entity.Room{},
		&entity.Patient{},
		&entity.PatientRoom{},
		&entity.BookRoom{},
	)

	// ตัวอย่างข้อมูลสำหรับ TypeRoom
	singleRoom := entity.RoomType{
		RoomName: "ห้อง ICU",
		PricePerNight: 3000.00,
	}
	doubleRoom := entity.RoomType{
		RoomName: "ห้องเดี่ยว",
		PricePerNight: 10000.00,
		
	}
	suiteRoom := entity.RoomType{
		RoomName: "ห้องรวม",
		PricePerNight: 15000.00,
	}
	db.FirstOrCreate(&singleRoom,entity.RoomType{RoomName: "ห้อง ICU"})
    db.FirstOrCreate(&doubleRoom,entity.RoomType{RoomName: "ห้องเดี่ยว"})
    db.FirstOrCreate(&suiteRoom,entity.RoomType{RoomName: "ห้องรวม"})

	// ตัวอย่างข้อมูลสำหรับ Building 
	buildingA := entity.Building{
		BuildingName: "อาคาร A",
		Location:     "มทส.",
	}
	buildingB := entity.Building{
		BuildingName: "อาคาร B",
		Location:     "มทส.",
	}
	db.FirstOrCreate(&buildingA,entity.Building{BuildingName: "อาคาร A"})
    db.FirstOrCreate(&buildingB,entity.Building{BuildingName: "อาคาร B"})

	// ตัวอย่างข้อมูลสำหรับ Floor
	floor1 := entity.Floor{
		FloorNumber:     "1",
	}
	floor2 := entity.Floor{
		FloorNumber:     "2",
	}
	floor3 := entity.Floor{
		FloorNumber:     "3",
	}
	db.FirstOrCreate(&floor1,entity.Floor{FloorNumber: "1"})
    db.FirstOrCreate(&floor2,entity.Floor{FloorNumber: "2"})
	db.FirstOrCreate(&floor3,entity.Floor{FloorNumber: "3"})

	// ตัวอย่างข้อมูลสำหรับ Room
	room101 := entity.Room{
		RoomNumber:  "101",
		RoomTypeID:  singleRoom.ID,
		//Status:      "Available",
		FloorID:     floor1.ID,
		BuildingID:	buildingA.ID,
		BedCapacity: 1,

	}
	room102 := entity.Room{
		RoomNumber:  "102",
		RoomTypeID:  doubleRoom.ID,
		//Status:      "Occupied",
		FloorID:     floor1.ID,
		BuildingID:	buildingA.ID,
		BedCapacity: 2,
	}
	room201 := entity.Room{
		RoomNumber:  "201",
		RoomTypeID:  suiteRoom.ID,
		//Status:      "Available",
		FloorID:     floor2.ID,
		BuildingID:	buildingB.ID,
		BedCapacity: 3,
	}
	db.FirstOrCreate(&room101,entity.Room{RoomNumber: "101"})
    db.FirstOrCreate(&room102,entity.Room{RoomNumber: "102"})
	db.FirstOrCreate(&room201,entity.Room{RoomNumber: "201"})

	Patient01 := entity.Patient{
		PatientName: "สมสัก",
	}

	Patient02 := entity.Patient{
		PatientName: "สมหมาย",
	}
	db.FirstOrCreate(&Patient01,entity.Patient{PatientName: "สมสัก"})
    db.FirstOrCreate(&Patient02,entity.Patient{PatientName: "สมหมาย"})

	// time zone Thailand
	loc, _ := time.LoadLocation("Asia/Bangkok")
	admissionDate := time.Now().In(loc)
	// outroom +7 day
	dischargeDate := admissionDate.AddDate(0, 0, 7)


	PatientRoom01:= entity.PatientRoom{
		PatientID :Patient01.ID,
		RoomID: room101.ID,
		AdmissionDate: admissionDate,
		DischargeDate: dischargeDate,
		Status: "Occupied",
	}

	PatientRoom02:= entity.PatientRoom{
		PatientID :Patient02.ID,
		RoomID: room102.ID,
		AdmissionDate: admissionDate,
		DischargeDate: dischargeDate,
		Status: "Vacant",
	}
	db.FirstOrCreate(&PatientRoom01,entity.PatientRoom{PatientID :Patient01.ID,})
	db.FirstOrCreate(&PatientRoom02,entity.PatientRoom{PatientID :Patient02.ID,})

	BookRoom01 := entity.BookRoom{
		BuildingID: buildingA.ID,
		RoomID: PatientRoom01.ID,
		PositionX: 1,
		PositionY: 1,
	}
	BookRoom02 := entity.BookRoom{
		BuildingID: buildingA.ID,
		RoomID: PatientRoom02.ID,
		PositionX: 1,
		PositionY: 2,
	}
	db.FirstOrCreate(&BookRoom01,entity.BookRoom{RoomID: PatientRoom01.ID})
	db.FirstOrCreate(&BookRoom02,entity.BookRoom{RoomID: PatientRoom02.ID})


	fmt.Println("Database setup completed.")
}
