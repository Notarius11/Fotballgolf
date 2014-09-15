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
	if ($(pControl).find('.eventContent').is(':visible')) {
		$(pControl).find('.eventContent').hide();
	}
	else {
		$(pControl).find('.eventContent').show();	
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
		GetFieldsData();
		$('#sectionHeading span').text('Baner');
	} else if ($(pControl).is($('#navItemLargeStatistics'))) {
		$('#statistics').show();
		$('#sectionHeading span').text('Statistikk');
	} else if ($(pControl).is($('#navItemLargeEvents'))) {
		$('#events').show();
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
		GetFieldsData();
		$('#sectionHeading span').text('Baner');
	} else if ($(pControl).is($('#navItemStatistics'))) {
		$('#statistics').show();
		$('#sectionHeading span').text('Statistikk');
	} else if ($(pControl).is($('#navItemEvents'))) {
		$('#events').show();
		$('#sectionHeading span').text('Kommende Events');
	}

	$('.menuNavigator').removeClass('enabled');
	$('#menuButton').addClass('icon-list');
	$('#menuButton').removeClass('icon-cancel');
	$('#menuButton').parent().removeClass('enabled');
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
  xmlhttp.open("GET","connectDB.php",true);
  xmlhttp.send();
}