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
	r.GET("/bookroom/:building_name", controller.GetBookRoom)

	// Start server
	r.Run(":" + PORT)
}
