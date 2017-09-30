module.exports = function(sequelize,DataTypes){
    var Customer = sequelize.define('Customer',
    {
        customerName:{
            type:DataTypes.STRING,
            allowNull:false
        }        
    },
    {
        classMethods:{
            associate:function(models){
                Customer.hasMany(models.Burgers)
            }
        }    
    });
    return Customer;
};