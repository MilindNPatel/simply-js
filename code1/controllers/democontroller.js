'use strict' 

class Demo { 
    
    constructor(name, age) { 
      this._name = name; 
      this._age = age;
    } 

    test(req, res) { 
      // console.log("The height of the polygon: ", this.h) 
      // console.log("The width of the polygon: ",this. w) 
      res.json({ success: true, msg: 'User profile updated successfully' });
    } 

} 

Demo.prototype.personInfo = function(){
  return "Person info: \n   height: " + this._name + " \n   weight: " + this._age;
};

//creating an instance  
module.exports = Demo;

