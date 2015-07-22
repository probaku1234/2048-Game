#pragma strict
public var table : int[,] = new int[4,4];
var myTextBox : GameObject[];
var row : int[] = new int[17];
var col : int[] = new int[17];
var size : int = 0;

function Start () {
	table[0,0] = 0;
	table[0,1] = 0;
	table[0,2] = 0;
	table[0,3] = 0;
	table[1,0] = 0;
	table[1,1] = 0;
	table[1,2] = 0;
	table[1,3] = 0;
	table[2,0] = 0;
	table[2,1] = 0;
	table[2,2] = 0;
	table[2,3] = 0;
	table[3,0] = 0;
	table[3,1] = 0;
	table[3,2] = 0;
	table[3,3] = 0;
	myTextBox = new GameObject[16];
	myTextBox[0] = GameObject.Find('Table00');
	myTextBox[1] = GameObject.Find('Table01');
	myTextBox[2] = GameObject.Find('Table02');
	myTextBox[3] = GameObject.Find('Table03');
	myTextBox[4] = GameObject.Find('Table10');
	myTextBox[5] = GameObject.Find('Table11');
	myTextBox[6] = GameObject.Find('Table12');
	myTextBox[7] = GameObject.Find('Table13');
	myTextBox[8] = GameObject.Find('Table20');
	myTextBox[9] = GameObject.Find('Table21');
	myTextBox[10] = GameObject.Find('Table22');
	myTextBox[11] = GameObject.Find('Table23');
	myTextBox[12] = GameObject.Find('Table30');
	myTextBox[13] = GameObject.Find('Table31');
	myTextBox[14] = GameObject.Find('Table32');
	myTextBox[15] = GameObject.Find('Table33');	
	CreateZero();
	CreateZero();
	PrintOutTable();
}

function Update () {

}

function PrintOutTable () {
	myTextBox[0].GetComponent(UI.Text).text = table[0,0].ToString();
	myTextBox[1].GetComponent(UI.Text).text = table[0,1].ToString();
	myTextBox[2].GetComponent(UI.Text).text = table[0,2].ToString();
	myTextBox[3].GetComponent(UI.Text).text = table[0,3].ToString();
	myTextBox[4].GetComponent(UI.Text).text = table[1,0].ToString();
	myTextBox[5].GetComponent(UI.Text).text = table[1,1].ToString();
	myTextBox[6].GetComponent(UI.Text).text = table[1,2].ToString();
	myTextBox[7].GetComponent(UI.Text).text = table[1,3].ToString();
	myTextBox[8].GetComponent(UI.Text).text = table[2,0].ToString();
	myTextBox[9].GetComponent(UI.Text).text = table[2,1].ToString();
	myTextBox[10].GetComponent(UI.Text).text = table[2,2].ToString();
	myTextBox[11].GetComponent(UI.Text).text = table[2,3].ToString();
	myTextBox[12].GetComponent(UI.Text).text = table[3,0].ToString();
	myTextBox[13].GetComponent(UI.Text).text = table[3,1].ToString();
	myTextBox[14].GetComponent(UI.Text).text = table[3,2].ToString();
	myTextBox[15].GetComponent(UI.Text).text = table[3,3].ToString();
}

function FindZeroPosition () {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (table[j,i] == 0) {
				row[size] = i;
				col[size] = j;
				size++;
			}
		}
	}
}

function CreateZero () {
	FindZeroPosition();
	var i : int = Random.Range(0,size-1);
	table[col[i],row[i]] = 2;
	size = 0;
}

function CheckGameOver() : boolean {
	for (var i = 0; i < 4; i++) {
		for (var j = 0 ; j < 4; j++) {
			if (table[i,j] == 0) {
				return false;
			}
		}
	}
	
}

function CheckWin() : boolean {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (table[i,j] == 2048) {
				return true;
			}
		}
	}	
	return false;
}

function LeftCalculate () : boolean {
	var index : int = 0;
	var addIndex : int[] = new int[4];
	addIndex = [4,4,4,4];

	for (var i = 0; i < 4; i++) {
		for (var j = 0 ; j < 4; j++) {
			if (table[i,j] != 0) {
				for (var z = j-1; z > -1; z--) {
					if (table[i,z] != 0) {
						if (table[i,z] != table[i,j]) {	
							break;
						} else {
							addIndex[j] = z;
							table[i,j] = 0;
						}	
					}	
				}
			}
		}
		for (var k = 0; k < 4; k++) {
			if (addIndex[k] < 4) {
				table[i,addIndex[k]] = table[i,addIndex[k]] * 2;
			}
		}
		addIndex = [4,4,4,4];
	}
	
	return LeftMove();
}

function LeftMove () : boolean{
	var isMoved : boolean = false;
	var index : int = 0;
	var moveIndex : int[] = new int[4];
	moveIndex = [4,4,4,4];
	
	for (var i = 0; i < 4; i++) {
		for (var j = 0 ; j < 4; j++) {
			if (table[i,j] == 0) {
				moveIndex[i] = j;
				break;
			}
		}
	}
	
	for (var z = 0; z < 4; z++) {
		if (moveIndex[z] < 4) {
			index = moveIndex[z];
			for (var k = index+1; k < 4; k++) {
				if (table[z,k] != 0) {
					table[z,index] = table[z,k];
					table[z,k] = 0;
					index++;
				} 
			} 
			isMoved = true;
		}
	}
	
	if (isMoved) {
		CreateZero();
		CreateZero();
	}
	return isMoved;
}

function RightCalculate (): boolean {
	var index : int = 0;
	var addIndex : int[] = new int[4];
	addIndex = [4,4,4,4];

	for (var i = 0; i < 4; i++) {
		for (var j = 3 ; j > -1; j--) {
			if (table[i,j] != 0) {
				for (var z = j+1; z < 4; z++) {
					if (table[i,z] != 0) {
						if (table[i,z] != table[i,j]) {	
							break;
						} else {
							addIndex[j] = z;
							table[i,j] = 0;
						}	
					}	
				}
			}
		}
		for (var k = 0; k < 4; k++) {
			if (addIndex[k] < 4) {
				table[i,addIndex[k]] = table[i,addIndex[k]] * 2;
			}
		}
		addIndex = [4,4,4,4];
	}
	
	return RightMove();
}

function RightMove () : boolean {
	var isMoved : boolean = false;
	var index : int = 0;
	var moveIndex : int[] = new int[4];
	moveIndex = [4,4,4,4];
	
	for (var i = 0; i < 4; i++) {
		for (var j = 3 ; j > -1; j--) {
			if (table[i,j] == 0) {
				moveIndex[i] = j;
				break;
			}
		}
	}
	
	for (var z = 0; z < 4; z++) {
		if (moveIndex[z] < 4) {
			index = moveIndex[z];
			for (var k = index-1; k > -1; k--) {
				if (table[z,k] != 0) {
					table[z,index] = table[z,k];
					table[z,k] = 0;
					index--;
				} 
			} 
			isMoved = true;
		}
	}
	
	if (isMoved) {
		CreateZero();
		CreateZero();
	}
	return isMoved;
}

function UpCalculate () : boolean {
	var index : int = 0;
	var addIndex : int[] = new int[4];
	addIndex = [4,4,4,4];

	for (var i = 0; i < 4; i++) {
		for (var j = 0 ; j < 4; j++) {
			if (table[j,i] != 0) {
				for (var z = j-1; z > -1; z--) {
					if (table[z,i] != 0) {
						if (table[z,i] != table[j,i]) {	
							break;
						} else {
							addIndex[j] = z;
							table[j,i] = 0;
						}	
					}	
				}
			}
		}
		for (var k = 0; k < 4; k++) {
			if (addIndex[k] < 4) {
				table[addIndex[k],i] = table[addIndex[k],i] * 2;
			}
		}
		addIndex = [4,4,4,4];
	}
	
	return UpMove();
}

function UpMove () : boolean {
	var isMoved : boolean = false;
	var index : int = 0;
	var moveIndex : int[] = new int[4];
	moveIndex = [4,4,4,4];
	
	for (var i = 0; i < 4; i++) {
		for (var j = 0 ; j < 4; j++) {
			if (table[j,i] == 0) {
				moveIndex[i] = j;
				break;
			}
		}
	}
	
	for (var z = 0; z < 4; z++) {
		if (moveIndex[z] < 4) {
			index = moveIndex[z];
			for (var k = index+1; k < 4; k++) {
				if (table[k,z] != 0) {
					table[index,z] = table[k,z];
					table[k,z] = 0;
					index++;
				} 
			} 
			isMoved = true;
		}
	}
	
	if (isMoved) {
		CreateZero();
		CreateZero();
	}
	return isMoved;
}

function DownCalculate () : boolean {
	var index : int = 0;
	var addIndex : int[] = new int[4];
	addIndex = [4,4,4,4];

	for (var i = 0; i < 4; i++) {
		for (var j = 3 ; j > -1; j--) {
			if (table[j,i] != 0) {
				for (var z = j+1; z < 4; z++) {
					if (table[z,i] != 0) {
						if (table[z,i] != table[j,i]) {	
							break;
						} else {
							addIndex[j] = z;
							table[j,i] = 0;
						}	
					}	
				}
			}
		}
		for (var k = 0; k < 4; k++) {
			if (addIndex[k] < 4) {
				table[addIndex[k],i] = table[addIndex[k],i] * 2;
			}
		}
		addIndex = [4,4,4,4];
	}
	
	return DownMove();
}

function DownMove () : boolean {
	var isMoved : boolean = false;
	var index : int = 0;
	var moveIndex : int[] = new int[4];
	moveIndex = [4,4,4,4];
	
	for (var i = 0; i < 4; i++) {
		for (var j = 3 ; j > -1; j--) {
			if (table[j,i] == 0) {
				moveIndex[i] = j;
				break;
			}
		}
	}
	
	for (var z = 0; z < 4; z++) {
		if (moveIndex[z] < 4) {
			index = moveIndex[z];
			for (var k = index-1; k > -1; k--) {
				if (table[k,z] != 0) {
					table[index,z] = table[k,z];
					table[k,z] = 0;
					index--;
				} 
			} 
			isMoved = true;
		}
	}
	
	if (isMoved) {
		CreateZero();
		CreateZero();
	}
	return isMoved;
}