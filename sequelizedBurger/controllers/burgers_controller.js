var express = require('express');
var router = express.Router();
var db = require('../models');



/*==================================EXPRESS ROUTES====================================*/
router.get('/', function(req, res){
	//retrieve all data from burgers and the temp from the temperature table
	db.Burgers.findAll({
		include: [db.Customer],
		order:"name ASC"
		}).then(function(data){
		var hbsObject = { 
			burgers: data
		};
		console.log(hbsObject);
		res.render('index', hbsObject);
		}).catch(function(err){
			console.log(err);
		});
});

router.post('/burgers', function(req, res){
	//create burger
	db.Burgers.create(req.body)
		.then(function(data){
			console.log("added burger");
			res.redirect('/');
		}).catch(function(err){
			console.log(err);
		});
});

router.put('/burgers/:id', function(req, res){
	//update Temperatures table and burgers table
	
	var	customerName= req.body.customerName;
	var	burger_id= req.params.id;
	db.Customer.findAll({
		where:{
			name:customerName
		}
	}).then(function(customer){
		if(customer.length === 0){
			//Create New Customer
			db.Customer.create({
				name:customerName
			}).then(function(newCustomer){
				//Add Customer
				db.Burgers.update(
					{
					devoured:true,
					CustomerId:newCustomer.id
				},
				{
				where: {
					id:req.params.id
				}
			}
			).then(function(burger){
				res.redirect('/');
			}).catch(function(err){
				res.json(err);
			});
			}).catch(function(error){
				res.json(error)
			})
		
		}else{//customer Exists

db.Burgers.update({
	devoured:true,
	CustomerId:customer[0].id
},{
	where:{
		id:req.params.id
	}
}
).then(function(burger){
	res.redirect('/');

}).catch(function(err){
	res.json(err);
});
}
}).catch(function(error){
	if(error){
		res.json(error);
	}
})
});
/*==================================END EXPRESS ROUTES====================================*/


//export router to be required in server.js
module.exports = router;