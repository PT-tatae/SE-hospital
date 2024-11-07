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
	r.Use(CORSMiddleware())

	// Define routes
	r.GET("/RoomLayout", controller.GetRoomLayout)
	r.GET("/floor", controller.GetFloor)
	r.GET("/building", controller.GetBuilding)

	r.POST("/AddFloor",controller.AddFloor)
	r.POST("/AddBuilding",controller.AddBuilding)
	r.POST("/AddRoom",controller.AddRoom)

	// Start server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    }
}