package main
	
import(
	"github.com/sut67/team04/config"
)
func main(){
	// open connection database
    config.ConnectionDB()

   // Generate databases
    config.SetupDatabase()

}