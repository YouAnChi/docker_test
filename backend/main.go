package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// 内存中存储数据
var dataStore = []string{}

func main() {
	r := gin.Default()

	// 配置CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	r.Use(cors.New(config))

	// API路由
	api := r.Group("/api")
	{
		api.GET("/health", healthCheck)
		api.GET("/data", getData)
		api.POST("/data", postData)
	}

	r.Run(":8080")
}

// 健康检查
func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

// 获取数据
func getData(c *gin.Context) {
	c.JSON(http.StatusOK, dataStore)
}

// 添加数据
func postData(c *gin.Context) {
	var request struct {
		Data string `json:"data" binding:"required"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dataStore = append(dataStore, request.Data)
	c.JSON(http.StatusCreated, gin.H{"message": "数据添加成功"})
}
