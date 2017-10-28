module.exports = function(x, y, callback){
	try {
		if(x < 0 || y < 0){
			throw new error("x = " + x + ", and y = " + y);
		}else callback(null, {
				method2: function(){
					return (2 * (x * y));
				},
				method1: function(){
					return (x * y);
				}
			});
		}
		catch (error){
			callback(error, null);
		}
	}