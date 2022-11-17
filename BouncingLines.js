let G, square1, square2,square3,square4, FRAMECOUNT,CX,CY;
function setup() {
  CX = 600;
  CY = 600;
  createCanvas(CX,CY);
  G = 1.5;
  FRAMECOUNT = 1;
  rectMode(CENTER);
  //                          X     =    y/2
  square1 = new Square(CX/2, 10, -50, 0, 20);
  square2 = new Square(CX/2, 10, 50, 0, 20);
  square3 = new Square(CX/2, 10, -75, 0, 20);
  square4 = new Square(CX/2, 10, 75, 0, 20);
  stroke(0,138,216); 
  strokeWeight(3);
}

function draw() {
  background(0);
  fill(255);
   square1.drawLines();
   square2.drawLines(); 
   square3.drawLines();
   square4.drawLines();
   
   square1.applyGravity();
   square2.applyGravity();
   square3.applyGravity();
   square4.applyGravity();

  //square1.show();
  //square2.show();
  //square3.show();
  //square4.show();
  
  square1.applyGravity();
  square2.applyGravity();
  square3.applyGravity();
  square4.applyGravity();
  
  square1.move();
  square2.move();
  square3.move();
  square4.move();
  
  
  
  

}


//A Suaare is used for collisions could just as easily be a circle
class Square {
   constructor(x, y, hV, vV, di){
   this.xPos = x;
   this.yPos = y;
   this.hVelocity = hV;
   this.vVelocity = vV;
   this.d = di;
   this.History = [];
  }
  
  //If at wall -> Bounce off
  WallCollision(){
    if(this.yPos > CY-(this.d/2) || this.yPos < this.d/2)
    {
      this.vVelocity *= -1;
      
      //I dont know why
      this.applyGravity();
      this.applyGravity();
    }
  
    if(this.xPos > CX - (this.d/2) || this.xPos < this.d/2)
    {
      this.hVelocity *= -1;
    }
  }
  
  move(){
    this.WallCollision();
    //History is used for creating the trails
    this.History.push(createVector(this.xPos, this.yPos));
    this.yPos += this.vVelocity;
    this.xPos += this.hVelocity;
  }
  
  
  applyGravity(){
   this.vVelocity += G; 
  }
  
  //To show the squares that make the trails
  show(){
   stroke(255);
   strokeWeight(4);
   noFill();
   rect(this.xPos, this.yPos, this.d/2,this.d/2);
   stroke(0,138,216); 
   strokeWeight(3);
   
  }
  
  
   drawLines()
   {
     if(this.History.length > 4)
      {
       for(let i = 0; i <this.History.length-3; i+=2)
       {
          let pos1 = this.History[i];
          let pos2 = this.History[i+1];
          let pos3 = this.History[i+2];
          line(pos1.x, pos1.y,pos2.x,pos2.y); 
          line(pos2.x,pos2.y, pos3.x,pos3.y);
         
          //Removes Trail after a set amount of time
          if(this.History.length > 150)
          {
             this.History.splice(0,1);
          }
          
        }
      }
     
   }
     
  

}
