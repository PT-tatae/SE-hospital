package config

import (
	"fmt"
	"github.com/sut67/team04/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
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
	)

	// ตัวอย่างข้อมูลสำหรับ TypeRoom
	singleRoom := entity.RoomType{
		RoomName: "ห้อง ICU",
	}
	doubleRoom := entity.RoomType{
		RoomName: "ห้องเดี่ยว",
	}
	suiteRoom := entity.RoomType{
		RoomName: "ห้องรวม",
	}
	db.Create(&singleRoom)
	db.Create(&doubleRoom)
	db.Create(&suiteRoom)

	// ตัวอย่างข้อมูลสำหรับ Building
	buildingA := entity.Building{
		BuildingName: "อาคาร A",
		Location:     "มทส.",
	}
	buildingB := entity.Building{
		BuildingName: "อาคาร B",
		Location:     "มทส.",
	}
	db.Create(&buildingA)
	db.Create(&buildingB)

	// ตัวอย่างข้อมูลสำหรับ Floor
	floor1 := entity.Floor{
		BuildingID: buildingA.ID,
		Number:     1,
	}
	floor2 := entity.Floor{
		BuildingID: buildingA.ID,
		Number:     2,
	}
	floor3 := entity.Floor{
		BuildingID: buildingB.ID,
		Number:     1,
	}
	db.Create(&floor1)
	db.Create(&floor2)
	db.Create(&floor3)

	// ตัวอย่างข้อมูลสำหรับ Room
	room101 := entity.Room{
		RoomNumber:  "101",
		RoomTypeID:  singleRoom.ID,
		Status:      "Available",
		FloorID:     floor1.ID,
		BedCapacity: 1,
	}
	room102 := entity.Room{
		RoomNumber:  "102",
		RoomTypeID:  doubleRoom.ID,
		Status:      "Occupied",
		FloorID:     floor1.ID,
		BedCapacity: 2,
	}
	room201 := entity.Room{
		RoomNumber:  "201",
		RoomTypeID:  suiteRoom.ID,
		Status:      "Available",
		FloorID:     floor2.ID,
		BedCapacity: 3,
	}
	db.Create(&room101)
	db.Create(&room102)
	db.Create(&room201)

	fmt.Println("Database setup completed with sample data.")
}
