// Quad Scaling Script
var comp = app.project.activeItem;
var quadLayer = comp.selectedLayers[0];

var window = new Window("palette", "Quad Scaler", undefined);
window.orientation = "column";
var groupOne = window.add("group", undefined, "groupOne");
groupOne.orientation = "row";
groupOne.add("statictext", undefined, "Scale by:");
var rEditText = groupOne.add("edittext", undefined, "500");
rEditText.characters = 5;
var groupTwo = window.add("group", undefined, "groupTwo");
var button = groupTwo.add("button", undefined, "Scale!");

window.center();
window.show();

button.onClick = function() {

	if(app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
		alert("Please select a comp first");
		return false;
	}

app.beginUndoGroup("Quad Scaling");
var r = parseInt(rEditText.text);
var mask = quadLayer.property("Masks").property(1);
var points = mask.property("maskShape").value.vertices;
var scaledPoints = [points[0]-[r, r], points[1]+[r, -r], points[2]+[r, r], points[3]-[r, -r]];
var newQuadShape = new Shape();
newQuadShape.vertices = scaledPoints;

mask.property("maskShape").setValue(newQuadShape);

app.endUndoGroup();

}