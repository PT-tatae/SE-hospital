package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut67/team04/config"
	"github.com/sut67/team04/controller"
)

const PORT = "8000"

func main() {
	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	// Create a Gin router
	r := gin.Default()

	// Define routes
	r.GET("/bookroom", controller.GetBookRoom)
	r.GET("/floor", controller.GetFloor)
	r.GET("/building", controller.GetBuilding)

	r.POST("/AddFloor",controller.AddFloor)
	r.POST("/AddBuilding",controller.AddBuilding)
	r.POST("/AddRoom",controller.AddRoom)

	// Start server
	r.Run(":" + PORT)
}
