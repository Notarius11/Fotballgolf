/* Define glabal values */

var listOfPlayers,
	gameStage = 0,
	typeOfPlay; //1 = Teamplay and 2 equal to individual play

function onLoad() {
	/* Get the latest news */

}


/* Control Events */
function play_click(pTypeOfPlay) {
	typeOfPlay = pTypeOfPlay;
	runStep('Next');
}
function showHideGroup(pControl) {
	$(pControl).children('.groupContent').show();
}

/*Tool functions */
function runStep(pStepDirection) {
	//First clear of the content
	if(pStepDirection == 'Next'){
		$('#gameStage_' + gameStage.toString()).hide();
		gameStage++;
		$('#gameStage_' + gameStage.toString()).show();	
	}
	else {
		$('#gameStage_' + gameStage.toString()).hide();
		gameStage--;
		$('#gameStage_' + gameStage.toString()).show();	
	}

	if(gameStage == 0){
		$('#headerLabel').replaceWith('Registration (1 of 3) - Choose type of play');
		$('#btnPreviousStep').removeClass('btn-enabled');
		$('#btnPreviousStep').addClass('btn-disabled');
	} else if (gameStage == 1) {
		$('#headerLabel').replaceWith('Registration (2 of 3) - Add players');
		$('#btnPreviousStep').removeClass('btn-disabled');
		$('#btnPreviousStep').addClass('btn-enabled');
	}
}

function DropDown(el) {
    $('#row_1_Team') = el;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;
 
        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            event.stopPropagation();
        }); 
    }
}

	