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
		$('.menuNavigator').css({ left: $(pControl).parent().position().left, top: $(pControl).parent().position().top + $(pControl).height(), width: '100%' });
		$('.menuNavigator').addClass('enabled');
		$(pControl).parent().addClass('enabled');
		// Make sure the navigator is opened under the control selected
		$(pControl).removeClass('icon-list');
		$(pControl).addClass('icon-cancel');
	}
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
    	var res = xmlhttp.responseText;
      	$("#fields").html(res);
    }
  }
  xmlhttp.open("GET","connectDB.php?function=Fields",true);
  xmlhttp.send();
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

function saveRegistration(pRegistration) {
	// Get the Fields to register
	var eventID = $(pRegistration).parent().parent().find("div[field='eventID']").text();
	var personFirstName = $(pRegistration).parent().find("input[data-field]='FirstName'").text();
	var personLastName = $(pRegistration).parent().find("input[data-field]='LastName'").text();
	var personEmail = $(pRegistration).parent().find("input[data-field]='Email'").text();
	var personMember = $(pRegistration).parent().find("input[data-field]='Member'").val();

	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	  } else { // code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    	var res = xmlhttp.responseText;
	    }
	  }
	  xmlhttp.open("POST","connectDB.php?function=SaveReg&EventID=" + eventID + "&FirstName=" + personFirstName + "&LastName=" + personLastName + "&Email=" + personEmail + "&Member=" + personMember,true);
	  xmlhttp.send();
	}
}