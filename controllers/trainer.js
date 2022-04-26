const User = require('../model/training');
const ejs = require('ejs');


module.exports = {
    addTraining: (req, res,next) => {
            console.log("POST");
            // var connected = "false";
            var trainingType = req.body.trainingType;
            var duration = 0;
            var price = 0;
            var date = req.body.date;
            var time = req.body.time;
                
        //checks if the email already exists in the databases
        
            
                const training = new training({
                    date,
                    time,
                    trainingType,
                })
                training.save().then((result) => {
                    console.log('new training created');
                    return res.render('/calendar');
                    
                        
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                    console.log("post error ");
                });
           
        
    }   
}



