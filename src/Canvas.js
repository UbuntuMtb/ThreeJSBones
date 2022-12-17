

Canvas = {};
//----------------------------------------------------------------------------------------
Canvas.init = function ()
{
    Canvas.CreateMainCanvas();
    Canvas.GetCanvasID();
}
//----------------------------------------------------------------------------------------
Canvas.GetCanvasID = function () {
    
    //Canvas when single rendering is needed.
    Canvas.MainCanvas = document.getElementById('MainCanvas');

}
//----------------------------------------------------------------------------------------
//This function add canvas dynamically.
//Function to add main canvas.
Canvas.CreateMainCanvas = function () {
    var div = document.createElement('div');
    div.id = "MainCanvasContainer";
    //The definition of the style under css folder.
    div.classList.add("MainContainerStyle");
    document.body.appendChild(div);
    var canvas = document.createElement('canvas');
    canvas.id = "MainCanvas";
    canvas.class = "c";
    div.appendChild(canvas);
}
//----------------------------------------------------------------------------------------
//This function add canvas dynamically.
//Function to add the canvas where particles are going to be displayed.
Canvas.CreateParticleCanvas = function () {
    var div = document.createElement('div');
    div.id = "ParticleCanvasContainer";
    //The definition of the style under css folder. 
    div.classList.add("ParticleContainerStyle");
    document.body.appendChild(div);
    var canvas = document.createElement('canvas');
    canvas.id = "ParticleCanvas";
    canvas.class = "c";
    div.appendChild(canvas);
}
//----------------------------------------------------------------------------------------
//This function add canvas dynamically.
//This functin add the canvas where the heatmap is displayed.
Canvas.CreateHeatmapCanvas = function () {
    var div = document.createElement('div');
    div.id = 'HeatmapContainer';
    //The definition of the style under css folder.
    div.classList.add("HeatmapContainerStyle");
    document.body.appendChild(div);
    var canvas = document.createElement('canvas');
    canvas.id = "HeatmapCanvas";
    canvas.class = "c";
    div.appendChild(canvas);
}
//----------------------------------------------------------------------------------------
//This functions add the canvas for debugging.
Canvas.CreateDebugContainer = function () {
    var div = document.createElement('div');
    div.id = 'DebugContainer';
    //The definition of the style under css folder.
    div.classList.add("DebugContainerStyle");
    document.body.appendChild(div);
    var pre = document.createElement('pre');
    pre.id = "DebugConsole";
    div.appendChild(pre);
}
//----------------------------------------------------------------------------------------
//Function used remove the main canvas dynamically.
Canvas.RemoveMainCanvas = function () {
    var old_canvas = document.getElementById('MainCanvas');
    old_canvas.remove();
    old_canvas = null;

    var old_div = document.getElementById('MainCanvasContainer');
    old_div.remove();
    old_div = null;
}
//----------------------------------------------------------------------------------------
//Function used to remove the particle canvas dynamically.
Canvas.RemoveParticleCanvas = function () {
    var old_canvas = document.getElementById('ParticleCanvas');
    old_canvas.remove();
    old_canvas = null;

    var old_div = document.getElementById('ParticleCanvasContainer');
    old_div.remove();
    old_div = null;
}
//----------------------------------------------------------------------------------------
//Funcntion used to remove the heatmap canvas.
Canvas.RemoveHeatmapCanvas = function () {
    var old_canvas = document.getElementById('HeatmapCanvas');
    old_canvas.remove();
    old_canvas = null;

    var old_div = document.getElementById('HeatmapContainer');
    old_div.remove();
    old_div = null;
}
//----------------------------------------------------------------------------------------
//Function used to remove the debugger canvas.
Canvas.RemoveDebugContainer = function () {
    var old_pre = document.getElementById('DebugConsole');
    old_pre.remove();
    old_pre = null;

    var old_div = document.getElementById('DebugContainer');
    old_div.remove();
    old_div = null;
}
//----------------------------------------------------------------------------------------