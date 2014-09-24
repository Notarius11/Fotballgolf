var listOfEvents = null;
var listOfFields = null;

function onLoad() {
	/* Get the latest news */

}
function menuClick(pControl){
	if ($(pControl).parent().hasClass('enabled')){
		$('.menuNavigator').removeClass('enabled');
		$(pControl).parent().removeClass('enabled');
		$(pControl).addClass('icon-list');
		$(pControl).removeClass('icon-cancel');
	} else {
		$('.menuNavigator').css({ left: $(pControl).parent().position().left, top: $(pControl).parent().position().top + $(pControl).parent().height(), width: '100%' });
		$('.menuNavigator').addClass('enabled');
		$(pControl).parent().addClass('enabled');
		// Make sure the navigator is opened under the control selected
		$(pControl).removeClass('icon-list');
		$(pControl).addClass('icon-cancel');
	}
}
function homeClick() {
	// Hide all main content and the show the correct
	$('#mainContent').find('.groupContent').hide();
	// Hide toggling of all other nav items and toggle selected
	$('#mainMenuLarge').find('a').removeClass('toggled');

	$('#sectionHeading span').text('News');
	$('#home').show();
}
function eventClick(pControl){
	if ($(pControl).parent().find('.eventContent').is(':visible')) {
		$(pControl).parent().find('.eventContent').hide();
	}
	else {
		$(pControl).parent().find('.eventContent').show();	
	}
}

function navItemClickLarge(pControl) {
	// Hide all main content and the show the correct
	$('#mainContent').find('.groupContent').hide();

	// Hide toggling of all other nav items and toggle selected
	$('#mainMenuLarge').find('a').removeClass('toggled');
	$(pControl).addClass('toggled');

	if ($(pControl).is($('#navItemLargeAboutUs'))) {
		$('#aboutUs').show();
		$('#sectionHeading span').text('Om oss');
	} else if($(pControl).is($('#navItemLargeKontakt'))) {
		$('#contact').show();
		$('#sectionHeading span').text('Kontakt oss');
	} else if($(pControl).is($('#navItemLargeFields'))) {
		$('#fields').show();
		if (listOfFields === null){
			GetFieldsData();	
		}
		$('#sectionHeading span').text('Baner');
	} else if($(pControl).is($('#navItemLargeMembership'))) {
		$('#becomeMember').show();
		$('#sectionHeading span').text('Medlemskap');
	} else if ($(pControl).is($('#navItemLargeStatistics'))) {
		$('#statistics').show();
		$('#sectionHeading span').text('Statistikk');
	} else if ($(pControl).is($('#navItemLargeEvents'))) {
		$('#events').show();
		if (listOfEvents === null) {
			GetEventsData();	
		}
		$('#sectionHeading span').text('Kommende Events');
	}

	$('.menuNavigator').removeClass('enabled');
	$('#menuButton').addClass('icon-list');
	$('#menuButton').removeClass('icon-cancel');
	$('#menuButton').parent().removeClass('enabled');
}
function navItemClick(pControl) {
	// Hide all nav and the show the correct
	$('#mainContent').find('.groupContent').hide();

	if ($(pControl).is($('#navItemAboutUs'))) {
		$('#aboutUs').show();
		$('#sectionHeading span').text('Om oss');
	} else if($(pControl).is($('#navItemKontakt'))) {
		$('#contact').show();
		$('#sectionHeading span').text('Kontakt oss');
	} else if($(pControl).is($('#navItemFields'))) {
		$('#fields').show();
		if (listOfFields === null){
			GetFieldsData();	
		}
		$('#sectionHeading span').text('Baner');
	}
	else if($(pControl).is($('#navItemMembership'))) {
		$('#becomeMember').show();
		$('#sectionHeading span').text('Medlemskap');
	} else if ($(pControl).is($('#navItemStatistics'))) {
		$('#statistics').show();
		$('#sectionHeading span').text('Statistikk');
	} else if ($(pControl).is($('#navItemEvents'))) {
		$('#events').show();
		if (listOfEvents === null) {
			GetEventsData();	
		}
		$('#sectionHeading span').text('Kommende Events');
	}

	$('.menuNavigator').removeClass('enabled');
	$('#menuButton').addClass('icon-list');
	$('#menuButton').removeClass('icon-cancel');
	$('#menuButton').parent().removeClass('enabled');
}
function GetEventsData(){
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    	var res = JSON.parse(xmlhttp.responseText);
      	AddEvents(res);
      	//$("#fields").html(res);
    }
  }
  xmlhttp.open("GET","connectDB.php?function=Events",true);
  xmlhttp.send();
}
function GetFieldsData(){
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    	var res = JSON.parse(xmlhttp.responseText);
      	AddFields(res);
    }
  }
  xmlhttp.open("GET","connectDB.php?function=Fields",true);
  xmlhttp.send();
}
function AddFields(pFields){
	//Loop through and add events to the DOM
	if (pFields.length > 0){
		listOfFields = pFields;
	}
	for (var i = 0; i < pFields.length; i++){

		var newField = $('#fieldMal').clone(true);
		// Change the eventID
		$(newField).attr('id','field_' + pFields[i].ID.toString());
		$(newField).css('display','block');
		// Set the eventfields
		$(newField).find("div[field='fieldTitle']").text(isEmpty(pFields[i].Title).toString());
		$(newField).find("div[field='fieldDescription']").text(isEmpty(pFields[i].Description).toString());
		if(pFields[i].ID){
			$(newField).find("img[field='fieldImg']").attr('src', 'images/Fields/' + pFields[i].ID.toString() + '/overview.jpg');
		}
		$(newField).find("span[field='fieldNumHoles']").text("Hull: " + isEmpty(pFields[i].NumHoles).toString());
		$(newField).find("span[field='fieldPar']").text("Par: " + isEmpty(pFields[i].Par).toString());
		$(newField).find("span[field='fieldRecord']").text("Record: " + isEmpty(pFields[i].Record).toString());
		$('#fields').append(newField);
	}
}
function isEmpty(pValue){
	if (pValue) {
		return pValue;
	} else {
		return "";
	}
}
function AddEvents(pEvents) {
	//Loop through and add events to the DOM
	if (pEvents.length > 0){
		listOfEvents = pEvents;
	}
	for (var i = 0; i < pEvents.length; i++){

		var newEvent = $('#eventMal').clone(true);
		// Change the eventID
		$(newEvent).attr('id','event_' + pEvents[i].ID.toString());
		$(newEvent).css('display','block');
		// Set the eventfields
		$(newEvent).find("div[field='eventID']").text(pEvents[i].ID.toString());
		$(newEvent).find("span[field='eventTitle']").text(pEvents[i].Title.toString());
		$(newEvent).find("span[field='eventDay']").text(pEvents[i].Day.toString());
		$(newEvent).find("span[field='eventMonth']").text(pEvents[i].Month.toString());
		$(newEvent).find("span[field='eventPlayers']").text(pEvents[i].Registered.toString());
		$('#upcomingEvents').append(newEvent);
	}
}
function saveMember(pMember) {
	var listOfControls = $(pMember).parent().find("input[required]");

	for (var i = 0; i< listOfControls.length; i++){
		if (!$(listOfControls[i])[0].checkValidity()){
			$(listOfControls[i]).addClass('errorBox');
			return;
		} else {
			$(listOfControls[i]).removeClass('errorBox');
		}
	}
	var person = {
		method: "SaveMember",
		personFirstName: $(pMember).parent().find("input[data-field='FirstName']").val(),
		personLastName: $(pMember).parent().find("input[data-field='LastName']").val(),
		personEmail: $(pMember).parent().find("input[data-field='Email']").val(),
		personBirth: $(pMember).parent().find("input[data-field='BirthDay']").val(),
		personMember: 1
	};

	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	} else { // code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    	var res = JSON.parse(xmlhttp.responseText);
	    	
	    	if (res.Error == "") {
	    		$(pMember).parent().parent().find($('.registerMemberFooter')).css("color","#75E33D");
	    		$(pMember).parent().parent().find($('.registerMemberFooter')).text("Success: You are now a member");
	    	} else {
	    		$(pMember).parent().parent().find($('.registerMemberFooter')).text(res.Error);
	    		$(pMember).parent().parent().find($('.registerMemberFooter')).css("color","#CF3838");
	    		
	    	}
		}
	}
	var parameters = JSON.stringify(person);

	xmlhttp.open("POST","connectDB.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
}

function saveRegistration(pRegistration) {

	//Verify that registration is valid
	var listOfControls = $(pRegistration).parent().find("input[required]");

	for (var i = 0; i< listOfControls.length; i++){
		if (!$(listOfControls[i])[0].checkValidity()){
			$(listOfControls[i]).addClass('errorBox');
			return;
		} else {
			$(listOfControls[i]).removeClass('errorBox');
		}
	}	

	// Get the Fields to register
	var events = {
		method: "SaveReg",
		eventID: $(pRegistration).parent().parent().parent().find("div[field='eventID']").text(),
		personFirstName: $(pRegistration).parent().find("input[data-field='FirstName']").val(),
		personLastName: $(pRegistration).parent().find("input[data-field='LastName']").val(),
		personEmail: $(pRegistration).parent().find("input[data-field='Email']").val(),
		personBirth: $(pRegistration).parent().find("input[data-field='BirthDay']").val(),
		personMember: $(pRegistration).parent().find("input:radio[name ='member']:checked").val()
	};

	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	} else { // code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    	var res = JSON.parse(xmlhttp.responseText);
	    	
	    	if (res.Error == "") {
	    		$(pRegistration).parent().parent().find($('.eventFooter')).css("color","#75E33D");
	    		$(pRegistration).parent().parent().find($('.eventFooter')).text("Success: You are now registered");
	    		$(pRegistration).parent().parent().find("span[field='eventPlayers']").text(res.NumRegistered.toString());
	    	} else {
	    		$(pRegistration).parent().parent().find($('.eventFooter')).text(res.Error);
	    		$(pRegistration).parent().parent().find($('.eventFooter')).css("color","#CF3838");
	    		
	    	}
		}
	}
	var parameters = JSON.stringify(events);

	xmlhttp.open("POST","connectDB.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
}