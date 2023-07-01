// Create a P5 canvas. 
// Create a robot arm with 3 joints.
// The arm should be able to move in 2D space.

// Global variables
var canvasX = 600;
var canvasY = 600;
var armLength = 50;
var armAngle = 0;
var armAngle1 = 0;

function setup() {
    createCanvas(canvasX, canvasY);
    background(0);
    }

function draw() {
    // A dot at the mouse position.
    background(0);
    fill(255);
    ellipse(mouseX, mouseY, 10, 10);

    // The first joint is at the center of the canvas.
    translate(canvasX/2, canvasY/2);
    // Rotate the arm so that it points to the right.
    rotate(PI/2);
    // Draw the first joint.
    stroke(255);

    rotate(armAngle);
    line(0,0,0,armLength);
    // Move to the end of the first joint.
    translate(0,armLength);
    // Rotate the arm to the angle of the first joint.
    rotate(armAngle1);
    // Draw the second joint.
    line(0,0,0,armLength);
    // Move to the end of the second joint.
    translate(0,armLength);
    // Rotate the arm to the angle of the second joint.

    // A dot at the end effector position.
    fill(255,0,0);
    ellipse(0,0,10,10);
    
}

function mouseMoved() {
    // Use the mouse position to set the end effector position using the inverse kinematics equations.
    // The end effector position is the position of the mouse.
    var eeX = mouseX - canvasX/2;
    var eeY = mouseY - canvasY/2;
    eeX = -eeX;
    eeY = -eeY;
    // The length of the arm.
    var l1 = armLength;
    var l2 = armLength;
    var l3 = armLength;

    // The angle of the first joint points to the cursor if it is out of reach.
    if (sqrt(eeX*eeX + eeY*eeY) > 2*l1) {
        armAngle = atan2(eeY, eeX);
        armAngle1 = 0;
        return;
    }

    // Otherwise, use the inverse kinematics equations to calculate the joint angles.
    // The angle of the first joint.
    armAngle = atan2(eeY, eeX) - acos((l1*l1 + eeX*eeX + eeY*eeY - l2*l2)/(2*l1*sqrt(eeX*eeX + eeY*eeY)));
    // The angle of the second joint.
    armAngle1 = PI - acos((l1*l1 + l2*l2 - eeX*eeX - eeY*eeY)/(2*l1*l2));
    // The angle of the third joint.
    armAngle2 = PI - armAngle - armAngle2;

}

function mousePressed() {
    armAngle = 0;
    armAngle1 = 0;
    armAngle2 = 0;
}

