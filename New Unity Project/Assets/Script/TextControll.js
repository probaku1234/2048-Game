#pragma strict
var isWin : boolean;
var isOver : boolean;
var windowRect : Rect = Rect (1000,1000,200,200);

function Start () {
	
}

function Update () {
	keyboard();
}

function keyboard () {
	if (Input.GetKeyDown(KeyCode.LeftArrow)) {
		if (GetComponent(Table).LeftCalculate()) {		
			Debug.Log("calculate");
			isWin = GetComponent(Table).CheckWin();
		} else {
			isOver = GetComponent(Table).CheckGameOver();
		} 
		GetComponent(Table).PrintOutTable();
	}else if (Input.GetKeyDown(KeyCode.RightArrow)) {
		if (GetComponent(Table).RightCalculate()) {
			isWin = GetComponent(Table).CheckWin();
		} else {
			isOver = GetComponent(Table).CheckGameOver();
		} 
		GetComponent(Table).PrintOutTable();
	}else if (Input.GetKeyDown(KeyCode.UpArrow)) {
		if (GetComponent(Table).UpCalculate()) {
			isWin = GetComponent(Table).CheckWin();
		} else {
			isOver = GetComponent(Table).CheckGameOver();
		} 
		GetComponent(Table).PrintOutTable();
	}else if (Input.GetKeyDown(KeyCode.DownArrow)) {
		if (GetComponent(Table).DownCalculate()) {
			isWin = GetComponent(Table).CheckWin();
		} else {
			isOver = GetComponent(Table).CheckGameOver();
		} 
		GetComponent(Table).PrintOutTable();
	}
}

function OnGUI () {
	//if (isWin) {
		windowRect = GUI.Window (0, windowRect, DoMyWindow, "My Window");
	//}
}

function DoMyWindow (windowID : int) {
	if (GUI.Button (Rect (10,20,100,20), "Hello World")) {
		print ("Got a click");
	}
}