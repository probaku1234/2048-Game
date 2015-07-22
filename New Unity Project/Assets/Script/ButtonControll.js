#pragma strict
var myRestart : UnityEngine.UI.Button;
var myExit : UnityEngine.UI.Button;

function Start () {
	myRestart.onClick.AddListener(function() {RestartButtonClick();});
	myExit.onClick.AddListener(function() {ExitButtonClick();});
}

function Update () {
	
}

function RestartButtonClick () {
	Application.LoadLevel("mainScene");
	Debug.Log("Restart");
}

function ExitButtonClick () {
	Application.Quit();
	Debug.Log("Quit");
}

