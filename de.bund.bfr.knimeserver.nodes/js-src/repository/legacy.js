 function prepareData(_firstModel){
		jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};
		//prepare generalInformation
		if(_firstModel.generalInformation.creationDate  === undefined){
			_firstModel.generalInformation.creationDate = '';
		}else{
			_firstModel.generalInformation.creationDate = new Date(_firstModel.generalInformation.creationDate).toISOString();
		}
		//prepare scope
		if(_firstModel.scope  == undefined){
			_firstModel.scope = {};
		}
		if(_firstModel.scope.product  == undefined){
			_firstModel.scope.product = {};
		}

		if(_firstModel.scope.populationGroup  == undefined){
			_firstModel.scope.populationGroup = {};
		}
		if(_firstModel.scope.product.productionDate  == undefined){
			_firstModel.scope.product.productionDate = '';
		}else{
			_firstModel.scope.product.productionDate = new Date(_firstModel.scope.product.productionDate).toISOString()
		}
		
		if(_firstModel.scope.product.expirationDate  == undefined){
			_firstModel.scope.product.expirationDate = '';
		}else{
			_firstModel.scope.product.expirationDate = new Date(_firstModel.scope.product.expirationDate).toISOString();
		}
		if(_firstModel.scope.product.productionMethod  == undefined){
			_firstModel.scope.product.productionMethod = [];
		}
		if(_firstModel.scope.product.productionMethod.length == 0){
			_firstModel.scope.product.productionMethod = '';
		}else{
			var methods = '';
			$.each(_firstModel.scope.product.productionMethod, function( index, value ) {
				  methods = methods + value +', ';
			});
			_firstModel.scope.product.productionMethod = methods;
		}
		if(_firstModel.scope.product.packaging  == undefined){
			_firstModel.scope.product.packaging = [];
		}
		if(_firstModel.scope.product.packaging.length == 0){
			_firstModel.scope.product.packaging = '';
		}else{
			var packaging = '';
			$.each(_firstModel.scope.product.packaging, function( index, value ) {
				packaging = packaging + value +', ';
			});
			_firstModel.scope.product.packaging = packaging;
		}
		if(_firstModel.scope.product.productTreatment  == undefined){
			_firstModel.scope.product.productTreatment = [];
		}
		if(_firstModel.scope.product.productTreatment.length == 0){
			_firstModel.scope.product.productTreatment = '';
		}else{
			var productTreatment = '';
			$.each(_firstModel.scope.product.productTreatment, function( index, value ) {
				productTreatment = productTreatment + value +', ';
			});
			_firstModel.scope.product.productTreatment = productTreatment;
		}
		//prepare databackground
		if(_firstModel.dataBackground  == undefined){
			_firstModel.dataBackground = {};
		}
		if(_firstModel.dataBackground.study  == undefined){
			_firstModel.dataBackground.study = {};
		}
		if(_firstModel.dataBackground.study.protocolUri == null){
			_firstModel.dataBackground.study.protocolUri = '';
		}
		if(_firstModel.dataBackground.dietaryAssessmentMethod  == undefined){
			_firstModel.dataBackground.dietaryAssessmentMethod = {};
		}
		if(_firstModel.dataBackground.dietaryAssessmentMethod.numberOfFoodItems == undefined){
			_firstModel.dataBackground.dietaryAssessmentMethod.numberOfFoodItems = [];
		}
		if(_firstModel.dataBackground.dietaryAssessmentMethod.numberOfFoodItems.length == 0){
			_firstModel.dataBackground.dietaryAssessmentMethod.numberOfFoodItems = '';
		}else{
			var numberOfFoodItems = '';
			$.each(_firstModel.dataBackground.dietaryAssessmentMethod.numberOfFoodItems, function( index, value ) {
				numberOfFoodItems = numberOfFoodItems + value +', ';
			});
			_firstModel.dataBackground.dietaryAssessmentMethod.numberOfFoodItems = numberOfFoodItems;
		}
		if(_firstModel.dataBackground.dietaryAssessmentMethod.foodDescriptors == undefined){
			_firstModel.dataBackground.dietaryAssessmentMethod.foodDescriptors = [];
		}
		if(_firstModel.dataBackground.dietaryAssessmentMethod.foodDescriptors.length == 0){
			_firstModel.dataBackground.dietaryAssessmentMethod.foodDescriptors = '';
		}else{
			var foodDescriptors = '';
			$.each(_firstModel.dataBackground.dietaryAssessmentMethod.foodDescriptors, function( index, value ) {
				foodDescriptors = foodDescriptors + value +', ';
			});
			_firstModel.dataBackground.dietaryAssessmentMethod.foodDescriptors = foodDescriptors;
		}
		if(_firstModel.dataBackground.dietaryAssessmentMethod.recordTypes == undefined){
			_firstModel.dataBackground.dietaryAssessmentMethod.recordTypes = [];
		}
		if(_firstModel.dataBackground.dietaryAssessmentMethod.recordTypes.length == 0){
			_firstModel.dataBackground.dietaryAssessmentMethod.recordTypes = '';
		}else{
			var recordTypes = '';
			$.each(_firstModel.dataBackground.dietaryAssessmentMethod.recordTypes, function( index, value ) {
				recordTypes = recordTypes + value +', ';
			});
			_firstModel.dataBackground.dietaryAssessmentMethod.recordTypes = recordTypes;
		}
	}
	function make_ID (words) {
           
            m = words.replace(/\s/g, '');
            return m[0].toUpperCase()+""+m.substring(1);

        }
		
	function postJSONFormBuilt(_firstModel){
		if(jQuery.isEmptyObject(_firstModel.generalInformation.author)){
			$("#"+make_ID('author')).parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.generalInformation.creators)){
			$("#"+make_ID('creators')).parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.scope.populationGroup)){
			$("[id='Population Group']").parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.scope.spatialInformation)){
			$("[id='Spatial Information']").parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.dataBackground.study)){
			$("#"+make_ID('study')).parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.dataBackground.dietaryassessmentmethod)){
			$("#"+make_ID('Dietaryassessmentmethod')).parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.dataBackground.laboratory)){
			$("#"+make_ID('Laboratory')).parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.modelMath.exposure)){
			$("#"+make_ID('exposure')).parent().parent().hide();
		}
		if(jQuery.isEmptyObject(_firstModel.modelMath.exposure)){
			$("#"+make_ID('exposure')).parent().parent().hide();
		}
	
	}
var metaData = $${SMetadata}$$;
var title="$${STitel2}$$";
var description="";
var formIsReady = false;

   // language=HTML
         $(document.body).append(
        /*Navbar*/
'<div id="Navbar"> </div>'+
       //'<table><tr><td><img src="https://foodrisklabs.bfr.bund.de/wp-content/uploads/2015/02/FSKlab7-1.png" alt="Logo" style="height:70px"></td><td> </td></tr>'+
       /*Header*/
       //'<h2>'+title+'</h2>'+
       /*Description*/
        '<p>'+description+'</p>'+
       /*Filter*/
        //	'<input id="filter-search" class="form-control" type="text" placeholder="Search">'+
       /*Table*/
        '<div id="MainTable"></div>'
   );


// /Navbar
         buildNavbar();

function buildNavbar(){
    $("#Navbar").append(
        '<div class="topnav" id="myTopnav" style="background-color: $${SColor-Main}$$;">'+
        '<h1> $${STitel1}$$</h1>'+
        '<a class="Nav" href="$${SLink1}$$" target="_blank">$${SLinkName1}$$<i class="fa fa-pencil"></i></a>'+
        '<a class="Nav" href="$${SLink2}$$" target="_blank">$${SLinkName2}$$<i class="fa fa-cloud-upload"></i></a>'+
	   '<a class="Nav" href="$${SLink3}$$" target="_blank">$${SLinkName3}$$<i class="fa fa-cloud-upload"></i></a>'+
        '<a class="Nav" href="$${SLink4}$$" target="_blank">$${SLinkName4}$$<i class="fa fa-pencil"></i></a>'+
        '<a class="Nav" href="$${SLink5}$$" target="_blank">$${SLinkName5}$$<i class="fa fa-pencil"></i></a>'+
        '<a href="javascript:void(0);" style="font-size:36px;" class="icon" id="MenuIcon"><i  style="font-size:26px;"class="material-icons">menu</i></a>'+
        '</div>'+
        '<div id="mySidenav" class="sidenav">'+
        '  <a href="javascript:void(0)" class="closebtn">&times;</a>'+
        '  <a class="Nav" href="$${SLink1}$$" target="_blank">$${SLinkName1}$$<i class="fa fa-pencil"></i></a></li>'+
        '  <a class="Nav" href="$${SLink2}$$" target="_blank">$${SLinkName2}$$<i class="fa fa-cloud-upload"></i></a></li>'+
        '<a class="Nav" href="$${SLink3}$$" target="_blank">$${SLinkName3}$$<i class="fa fa-cloud-upload"></i></a>'+
        '<a class="Nav" href="$${SLink4}$$" target="_blank">$${SLinkName4}$$<i class="fa fa-pencil"></i></a>'+
        '<a class="Nav" href="$${SLink5}$$" target="_blank">$${SLinkName5}$$<i class="fa fa-pencil"></i></a>'+
        '</div>'+
        '<div id="searchBar">'+
	    ' <div>'+
		'	<input id="filter-search" class="form-control"  type="search" placeholder="Search" aria-label="Search">'+
		'	<span id="clear" class="fa fa-times-circle"></span>'+
		'    <div id="numberModels"></div>'+
	    ' </div>'+
	 '</div>');
}

        //Table head and selects
            $("#MainTable").append('<table id="TableElement" class="sortable table table-sm table-responsive-xl">' +
            '<thead>' +
            '<th id="cleft">Check</th>'+
            '<th class="actives" id="col1" scope="col" data-sort="name">Model Name</th>'+
            '<th class="actives hideColumn" id="col2" scope="col" data-sort="name">ModelID</th>'+
            '<th class="actives" id="colS" data-sort="name"><span id="col3">Software</span><br/>'+
            	'<span><select id="soft" class="crit"><option selected="selected">Select</option></select>'+
            	'<button id="clearSoft" title="reset" class="fa fa-remove"></button></span></th>'+
            '<th class="actives" id="colE" data-sort="name"><span id="col4">Environment</span><br/>'+
            	'<span><select id="env" class="crit"><option selected="selected">Select</option></select>'+
            	'<button id="clearEnv" title="reset" class="fa fa-remove"></button></span></th>'+
            '<th class="actives" id="colH" data-sort="name"><span id="col5">Hazard</span><br/>'+
            	'<span><select id="haz" class="crit"><option selected="selected">Select</option></select>'+
            	'<button id="clearHaz" title="reset" class="fa fa-remove"></button></span></th>'+
		  '<th class="actives" id="col6" scope="col" data-sort="name">Execution Time </th>'+
		  '<th class="actives" id="col7" scope="col" data-sort="name">Upload Date </th>'+
            '<th id="cright">Details</th>' +
            '</thead>' +
            '<tbody id="rows"></tbody>'+
            '</table>'+
            '</div>');

//Table rows and filter options
var filterSoft = [];
var filterEnv = [];
var filterHaz = [];
metaDataLength = Object.keys(metaData).length;
for(i=0;i<metaDataLength;i++) {
   // var Modelname1 = Data(i, "0", "generalInformation", "name");//is this var used?
    let Modelname = Data(i, "0", "generalInformation", "name");
    let ModelID = Data(i, "0", "generalInformation", "identifier");
    let Software = Data(i, "0", "generalInformation", "software");
    let environment = knimeDataTable.getRows()[i].data[5];
    let hazard = knimeDataTable.getRows()[i].data[6];
    let executionTime = knimeDataTable.getRows()[i].data[1];
    let uploadTime = knimeDataTable.getRows()[i].data[7];
	
	//create the options for the th-filters
	filterSoft.push(Software);
	
    var environmentUniform=environment.split(/[,|]/);
	addUniformElements(environmentUniform,filterEnv);
	
    var hazardUniform=hazard.split("|");
    addUniformElements(hazardUniform,filterHaz);

     var filterSoftware = removeDuplicates(filterSoft);
	var filterEnvironment = removeDuplicates(filterEnv);
	var filterHazard = removeDuplicates(filterHaz);
	
	var splittingNumbers = executionTime.match(/[a-zA-Z]+|[0-9]+/g);
	var numberTimeArray = [];
	for (a = 0; a < splittingNumbers.length; a++){
		//console.log(splittingNumbers)
		var numberTime = splittingNumbers[a]
		if (numberTime == "d"){
			numberTime = 216000;
		}else if (numberTime == "h"){
			numberTime = 3600;
		}else if (numberTime == "m"){
			numberTime = 60;
		}else if(numberTime == "s"){
			numberTime = 1;
		}else{
			numberTime  = parseInt(numberTime);
		};
		numberTimeArray.push(numberTime);
	}
    seconds = 0;
    for (a = 1; a < numberTimeArray.length; a=a+2){
        preVal = numberTimeArray[a-1];
        seconds = seconds+(numberTimeArray[a]*preVal);
    }
    var date = new Date(null);
    date.setSeconds(seconds); // specify value for SECONDS here
    var durationTime = date.toISOString().substr(11, 8);

    var TableClass =["Modelname", "ModelID", "Software", "Environment", "Hazard", "durationTime", "uploadTime"]//Is this used?
    var rows = knimeDataTable.getRows();
////////////////////////////////

    
    var row = rows[i];
   
    
      var value = row.data[8];
      

////////////////////////////////
    $("#rows").append('<tr id="$${SRowID}$$">' +
        '<td>' +
        '<input type="checkbox"class="checkbox1" name="'+Object.keys(metaData)[i]+'" > ' +
        '</td>' +
        '<td>' + Modelname + '</td>'+
        '<td class="hideColumn">' + ModelID + '</td>' +
        '<td class="softCol columnS">' + Software + '</td>'+
        '<td class="envCol columnS">' + environment + '</td>'+
        '<td class="hazCol columnS">' + hazard + '</td>'+
        '<td>' + durationTime+'</td>'+
        '<td >' + uploadTime + '</td>' +
        '<td><button type="button" class="btn btn-primary detailsButton" data-loading-text="<i class=&#145;fa fa-spinner fa-spin&#145;></i> Processing..."  id="opener'+i+'">Details</button><br>'+
        //'<br><button type="button" class="btn btn-primary downloadButton"><a href="'+value+'">Download</a></button><div id="wrapper'+i+'"></td></tr>' + // details button
        '<br><a class="btn btn-primary downloadButton" href="'+value+'">Download</a><div id="wrapper'+i+'"></td></tr>'+
'</tr>'
    );
			
    $("#opener"+i).click(function(event){//to open details window
		var processedevent = event
		$.when( effect(event.target) ).done(function() {
			setTimeout(function(){ buildDialogWindow(processedevent);$('html, body').animate({scrollTop: 0}, 500);}, 50);
		});
       });
}

createSelect(filterSoftware,"#soft");
createSelect(filterEnvironment,"#env");
createSelect(filterHazard,"#haz");


$(document).ready(function(){
    //Scrolling
    $('tbody').scroll(function(e) { //detect a scroll event on the tbody
	    $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
	    $('thead th:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
	    $('tbody td:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
    });
    
	//filter by different software, environment & hazard values
	$('#soft, #env, #haz').on('change',filterByCol);


	//clear the search bar input
	$("#clear").click(function(){
        let rows = $('#rows tr');
 	   rows.show();
        $("#filter-search").val("Search");
        $("#numberModels").fadeOut();
        //document.getElementById("numberModels").innerHTML=" ";
    });
    
	//clear the selects of the different filters
	$("#clearSoft").click(function(){
	   $("#soft").prop('options').length = 1;
	   $("#soft").val("Select");
	   filterByCol();  
	});
    	$("#clearEnv").click(function(){
    	   document.getElementById('env').options.length = 1;
	   $("#env").val("Select");
 	   filterByCol();
     });
    $("#clearHaz").click(function(){
   	   document.getElementById('haz').options.length = 1;
	   $("#haz").val("Select");
 	   filterByCol();
    });

	$("#col1").click(function(){
		sortColumn("#col1",1); 
	});
	$("#col2").click(function(){
		sortColumn("#col2",2); 
	});
	$("#col3").click(function(){
		sortSpan("#col3",3); 
	});
	$("#col4").click(function(){
		sortSpan("#col4",4); 
	});
	$("#col5").click(function(){
		sortSpan("#col5",5); 
	});
	$("#col6").click(function(){
		sortColumn("#col6",6); 
	});
	$("#col7").click(function(){
		sortColumn("#col7",7); 
	});
});

//FUNCTIONS
function Type(row, number, type){
	try{
		return metaData[Object.keys(metaData)[row]][number][type]
	}catch(err) {
          return "";
     }       
}
      
function Data(row, number, type, name){
     try{
         return metaData[Object.keys(metaData)[row]][number][type][name]
     }catch(err) {
         return "";
     }
}
       
function Data1(row, number, type, name, parameter){
	try{
         return metaData[Object.keys(metaData)[row]][number][type][name][parameter]
     }catch(err) {
         return "";
     }
}

//to convert tirst letter to uppercase
function capitalize(element) {
	return element.charAt(0).toUpperCase() + element.slice(1);
}
//to add elements previously splitted to an array
function addUniformElements(uniformedElement,targetArray){
	for(var en = 0; en < uniformedElement.length; en++){
    	 let element=capitalize(uniformedElement[en].trim());
      targetArray.push(element);
    }
}

//remove duplicates from arrays
function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array.sort();
}

//create the options for each filter
function createSelect(list, idName){
	for(var s = 0; s < list.length; s++) {
		$(idName).append('<option value="'+list[s]+'">'+ list[s]+'</option>');
	};
}

//multiple filtering for every column
function filterByCol(){
	    var filt="";
	    var rows = $('#rows tr');
	    var select1= $("#soft").val();
	    var select2 = $("#env").val();
	    var select3 = $("#haz").val();
	    rows.hide();
	    if (select1 == "Select" && select2 == "Select" && select3 == "Select"){
	         rows.show();
	         document.getElementById("numberModels").innerHTML="Your search returned " +rows.length+ " models";
	    }
	    else if (select2 == "Select"){
	        if (select1 != "Select" && select3 == "Select") {
	        	filt=$("#MainTable td.softCol:contains('" + select1 + "')").parent();
	        }else if (select1 != "Select" && select3 != "Select"){
	        	//filt=":contains('" + select1 + "'):contains('" + select3 + "')";
	        	filt1=rows.filter($("#MainTable td.softCol:contains('" + select1 + "')").parent());
	    		var selRows=rows.filter(filt1);
	    		filt= selRows.filter($("#MainTable td.hazCol:contains('" + select3 + "')").parent().show());
	    		rows.hide();
	        }else if (select1 == "Select" && select3 != "Select"){
	        	filt=$("#MainTable td.hazCol:contains('" + select3 + "')").parent();
	        }else{
	        	filt=""
	        }
	    }else if (select1 == "Select"){
	        if (select2 != "Select" && select3 == "Select"){
	        	filt=":contains('" + select2 + "')";
	        }else if (select2 != "Select" && select3 != "Select"){
	        	filt=":contains('" + select2 + "'):contains('" + select3 + "')";
	        }else if (select2 == "Select" && select3 != "Select"){
	        	filt=$("#MainTable td.hazCol:contains('" + select3 + "')").parent().show();
	        }else {
	        	filt="";
	        }
	    }else if(select3 == "Select"){
	    		if(select1 != "Select" && select2 != "Select"){
	    			filt1=rows.filter($("#MainTable td.softCol:contains('" + select1 + "')").parent());
	    			var selRows=rows.filter(filt1);
	    			filt= selRows.filter($("#MainTable td.envCol:contains('" + select2 + "')").parent().show());
	    			rows.hide();
	    		}else{
	        	filt=""
	        	}	
	    }else{
	        filt=":contains('" + select1 + "'):contains('" + select2 + "'):contains('" + select3 + "')"
	    }
	    
	    console.log(select1); 
	    console.log(select2);
	    console.log(select3);
	    console.log(filt);
	    
	    rows.filter(filt).show();
	    let searchResult = rows.filter(filt);
	    console.log(searchResult);
	    document.getElementById("numberModels").innerHTML="Your search returned " +searchResult.length+ " models";

	    let listFilteredSoft=[];
	    let listFilteredEnv=[];
	    let listFilteredHaz=[];	    
	    for(i=0;i<searchResult.length;i++) {
	    	let filteredSoft = searchResult[i].getElementsByTagName("td")[3].innerText;
		    let filteredEnv = searchResult[i].getElementsByTagName("td")[4].innerText;
			let filteredHaz = searchResult[i].getElementsByTagName("td")[5].innerText;
			
		    var filteredSoftUniform=filteredSoft.split(/[,|]/);
    		addUniformElements(filteredSoftUniform,listFilteredSoft);
			
			var filteredEnvUniform=filteredEnv.split(/[,|]/);
    		addUniformElements(filteredEnvUniform,listFilteredEnv);
			
			var filteredHazUniform=filteredHaz.split("|");
			addUniformElements(filteredHazUniform,listFilteredHaz);
		}

		var newFilterSoft = removeDuplicates(listFilteredSoft);
		var newFilterEnv = removeDuplicates(listFilteredEnv);
		var newFilterHaz = removeDuplicates(listFilteredHaz);

		
	    	clearFiltersOptions();
		createSelect(newFilterSoft,"#soft");
		$("#soft").val(select1);
		createSelect(newFilterEnv,"#env");
		$("#env").val(select2);
		createSelect(newFilterHaz,"#haz");
		$("#haz").val(select3);

	    if (filt==""){
	    	  createSelect(filterSoftware,"#soft");
	       console.log(filterSoftware);
	       console.log(filterEnvironment);
	       console.log(filterHazard);
	       createSelect(filterEnvironment,"#env");
	       createSelect(filterHazard,"#haz");
	       document.getElementById("numberModels").innerHTML=" ";
	    }
	    console.log("done");
}

function clearFiltersOptions(){
     document.getElementById('soft').options.length = 1;		
	document.getElementById('env').options.length = 1;
	document.getElementById('haz').options.length = 1;
}

//transform jquery :contains selector to case insensitive
jQuery.expr[':'].contains = function(a,i,m){
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

var $tr = $('.table tbody tr');
var $search = $('#filter-search'); // Get the input element
var cache = []; // Create an array called cache

$tr.each(function() {
      cache.push({ // Add an object to the cache array
          element: this, // This Content
          text: getText(this)== undefined?"":getText(this).trim().toLowerCase() // Its outerText (lowercase trimmed)
      });
});

function filter() { // Declare filter() function
      var query = (this.value == undefined?"":this.value.trim().toLowerCase());  // Get the query
      cache.forEach(function(p) { // For each entry in cache pass image
          var index = 0; // Set index to 0
          if (query) { // If there is some query text
              index = p.text.indexOf(query); // Find if query text is in there
          }
      	p.element.style.display = index === -1 ? 'none' : ''; // Show / hide
      	var trs = $('tbody tr:visible').length;
      	document.getElementById("numberModels").innerHTML="Your search returned  "+trs+ " models";
      });
     
}


if('oninput' in $search[0]) {// If browser supports input event
      $search.on('input', filter); // Use input event to call filter()
} else { // Otherwise
      $search.on('keyup', filter); // Use keyup event to call filter()
}

// Content elements for Searchfunction
function getText(element) {
      var text = '';
      if (element.outerText) {
          text += element.outerText.trim() + ' ';
      }else if (element.innerText) {
          text += element.innerText.trim() + ' ';
      }
      for (var i = 0; i < element.childNodes.length; i++) {
          text += getText(element.childNodes[i]);
      }
      return text;
}

//*******************Sort*******************//
var compare = {                           // Declare compare object
  name: function(a, b) {                  // Add a method called name
    a = a.replace(/^the /i, '');          // Remove The from start of parameter
    b = b.replace(/^the /i, '');          // Remove The from start of parameter

    if (a < b) {                          // If value a is less than value b
      return -1;                          // Return -1
    } else {                              // Otherwise
      return a > b ? 1 : 0;               // If a is greater than b return 1 OR
    }                                     // if they are the same return 0
  },
  duration: function(a, b) {              // Add a method called duration
    a = a.split(':');                     // Split the time at the colon
    b = b.split(':');                     // Split the time at the colon

    a = Number(a[0]) * 60 + Number(a[1]); // Convert the time to seconds
    b = Number(b[0]) * 60 + Number(b[1]); // Convert the time to seconds

    return a - b;                         // Return a minus b
  },
  date: function(a, b) {                  // Add a method called date
    a = new Date(a);                      // New Date object to hold the date
    b = new Date(b);                      // New Date object to hold the date

    return a - b;                         // Return a minus b
  }
};

function sortColumn(idName, column) {
	var $table = $(".sortable");              // This sortable table
	var $tbody = $table.find('tbody');        // Store table body
	var rows = $tbody.find('tr').toArray();   // Store array containing rows
	console.log(rows)
	var $header = $(idName);                  // Get the header
	console.log($header);
	var order = $header.data('sort');       // Get value of data-sort attribute
	console.log(order);
  
	// If selected item has ascending or descending class, reverse contents
	if ($header.is('.ascending') || $header.is('.descending')) {  
		$header.toggleClass('ascending descending');    // Toggle to other class
		$tbody.append(rows.reverse());                // Reverse the array
	} else {                                        // Otherwise perform a sort                            
		$header.addClass('ascending');                // Add class to header
		// Remove asc or desc from all other headers
      	$header.siblings().removeClass('ascending descending'); 
      	if (compare.hasOwnProperty(order)) {  // If compare object has method
        	console.log(column);
        	rows.sort(function(a, b) {               // Call sort() on rows array
          		a = $(a).find('td').eq(column).text().toLowerCase(); // Get text of column in row a
          		b = $(b).find('td').eq(column).text().toLowerCase(); // Get text of column in row b
          		return compare[order](a, b);           // Call compare method
			});
        	$tbody.append(rows);
      	}
	}
};

	function sortSpan(idName, column){
	var $table = $(".sortable");              // This sortable table
	var $tbody = $table.find('tbody');        // Store table body
	var rows = $tbody.find('tr').toArray();   // Store array containing rows
	console.log(rows)

	var $header = $(idName).parents('th');                  // Get the header
	//var $header = document.getElementById(idName);
	console.log($header);

	var order = $header.data('sort');       // Get value of data-sort attribute
	console.log(order);

    // If selected item has ascending or descending class, reverse contents
    if ($header.is('.ascending') || $header.is('.descending')) {  
      $header.toggleClass('ascending descending');    // Toggle to other class
      $tbody.append(rows.reverse());                // Reverse the array
    } else {                                        // Otherwise perform a sort                            
      $header.addClass('ascending');                // Add class to header
      // Remove asc or desc from all other headers
      $header.siblings().removeClass('ascending descending'); 
      if (compare.hasOwnProperty(order)) {  // If compare object has method
        console.log(column);
        rows.sort(function(a, b) {               // Call sort() on rows array
          a = $(a).find('td').eq(column).text().toLowerCase(); // Get text of column in row a
          b = $(b).find('td').eq(column).text().toLowerCase(); // Get text of column in row b
          return compare[order](a, b);           // Call compare method
        });
        $tbody.append(rows);
      }
    }
  };
//**************************************//

 function effect(target){
	var $this = $(target);
	$this.button('loading');
			
 }
 function buildDialogWindow(event){
 	id = event.target.id.substring(6);
	 _currentModel = $${SMetadata}$$[id][0];
	 
	//console.log(_currentModel);
	prepareData(_currentModel);
	_currentImage = knimeDataTable.getRows()[id].data[0];
	try{
		$('#imageDiv').children().remove();
		$('#imageDiv').append("<img  style='width:100%' src='data:image/png;base64,"+_currentImage+"'/>")
	}catch(err){
		//console.log(err)
	}

	try {
		createEMFForm();
	} catch(err){
		//console.log(err)
	}

	try{
		$.each(  $('html').find('style'), function( key, value ) {
			if($(value).attr('data-meta') == 'MuiInput'){ $(value).remove(); }
			else if($(value).attr('data-meta') == 'MuiInputLabel') { $(value).remove(); }
			else if($(value).attr('data-meta') == 'MuiFormLabel') { $(value).remove(); }
		});
	} catch(err){//console.log(err)
		//
	}

	try {
		$.each($('html').find('style'), function( key, value ) {
			if($(value).attr('data-meta') == 'MuiInput'){$(value).remove();}
			else if($(value).attr('data-meta') == 'MuiInputLabel'){$(value).remove();}
			else if($(value).attr('data-meta') == 'MuiFormLabel'){$(value).remove();}
		});
	} catch(err) { //console.log(err)
		////
	}

	try {	
		// tbody :has(td):not(:contains("No data"))
		
		//$('table td :contains("No data")').parent().parent().parent().remove();
		setTimeout(function(){ $("td:contains('No data')").parent().parent().parent().parent().parent().remove();}, 1000);
	
		$('.MuiFormLabel-root-100').css('font-size','1.5rem');
		$('.MuiDialog-paper-128').css('display','inline');
		$('.MuiDialog-paper-128').css('max-height','');
		$('.MuiDialog-paper-128').css('overflow-y','visible');

		$(".MuiTable-root-222 thead").removeAttr('class');
		$(".MuiTable-root-222 thead tr").removeAttr('class');
		$(".MuiTable-root-222 thead tr th").removeAttr('class');
		$(".MuiTable-root-222 thead tr th th").removeAttr('class');
		$(".MuiTable-root-222 tbody").removeAttr('class');
		$(".MuiTable-root-222 tbody tr").removeAttr('class');
		$(".MuiTable-root-222 tbody tr td").removeAttr('class');
		$(".MuiTable-root-222 tbody tr td div").removeAttr('class');
		$(".MuiTable-root-222 tbody tr td div div").removeAttr('class');
		$(".MuiTable-root-222 tbody tr td div div div").removeAttr('class');
	
		$('.MuiTable-root-222').addClass('table'); 
		$('.MuiTable-root-222').parent().addClass('table-responsive');
		//$('.table-responsive:not(:has(td))').css("background-color", "red");
		/*.filter(function() {
			console.log($(this).find('td').length, $(this));
			$(this).append("Some appended text.")
			return $(this).find('td').length == 0;
		})*/
		//$('.MuiTooltip-root-198:has(button)').parent().parent().parent().remove();
		//$('.MuiBadge-root-277').parent().remove();
		
		$('.MuiTable-root-222').removeClass('MuiTable-root-222'); 
		
		$('.MuiFormControl-root-90').addClass('form-group');
		$('.MuiGrid-typeContainer-1').css('display','inline');
	} catch(err){//console.log(err)
		///
	}
	
	try{
	} catch(err){//console.log(err)
	}

	$('#filter-search').attr("disabled", false);
	//$('label').removeAttr('class');
	//$('.MuiFormLabel-root-100').removeAttr('class');
	//$('label').addClass('without-transform');
	   
	$('.MuiInput-underline-110').addClass('without-after-element');
	
	try{
	   postJSONFormBuilt(_currentModel);
	} catch(err){//console.log(err)
		//
	}

	$('.replaced').parent().addClass('panel'); 
	$('.replaced').parent().addClass('panel-default'); 
	$('.replaced').addClass('panel-body'); 
		
	function makeId(words) {
		var n = words.split("Add to ");
		m = n[n.length - 1].replace(/\s/g, '');
		return m[0] == undefined?"":m[0].toLowerCase()+""+m.substring(1);
	}

	try{
	   $($("[aria-describedby*='tooltip-add']")).click(function(event) {
        	
        	currentArea = makeId($(this).attr('aria-label'));
        	event.preventDefault(); // Let's stop this event.
            event.stopPropagation(); // Really this time.
            $('#title'+currentArea).text(currentArea);
            $('#'+currentArea).modal('show');
        });
		
	} catch(err){//console.log(err)
		//
	}
		
	$('#titleOfCurrentModel').html(_currentModel.generalInformation.name);
	
	//window.generalInformation = _currentModel.generalInformation;
	
		window.store1.dispatch(Actions.init(_currentModel.generalInformation, window.schema, window.uischema));
	//window.scope =  _currentModel.scope;
		window.store2.dispatch(Actions.init(_currentModel.scope, window.schema2, window.uischema2));
	//window.modelMath =  _currentModel.modelMath;
		window.store17.dispatch(Actions.init(_currentModel.modelMath, window.schema17, window.uischema17));
	//window.dataBackground =  _currentModel.dataBackground;
		window.store6.dispatch(Actions.init(_currentModel.dataBackground, window.schema6, window.uischema6));
		
	$('#currentModel').modal('show');
	$('.modal-content').resizable({
			//alsoResize: ".modal-dialog",
			//minHeight: 150
	});
	$('.modal-dialog').draggable();
	$( "div[data-placement='top']" ).css('position','');
	$('label').removeAttr('class');
	
	$('.MuiFormHelperText-root-119').remove();
	$('.MuiBadge-root-277').remove();
	$(event.target).button('reset');
	$('input[type=text]').removeAttr('class');
	$('input[type=text]').addClass('form-control');
	$('input[type=text]').addClass('input-sm');
	$('#currentModel input').attr("readonly", true);
	$('#currentModel input:text').filter(function() { return $(this).val() == ""; }).parent().parent().parent().remove();

	$('.demoform').filter(function( index ) {
			if($( this ).find('input').length == 0) 
			return this ;
	}).remove();
	$('.MuiFormControl-root-90').filter(function( index ) {
			if($( this ).find('input').length == 0) 
			return this ;
	}).remove();
		
	$('input[type=text]').focusin(function() {
		$('.MuiInput-root-104').removeAttr('class');
		$.each(  $( this ).parent().parent().find("label"), function( key, label ) {
			$( label ).removeAttr('class');
			$( label ).attr('data-shrink',false);
			$('.MuiFormLabel-root-100').removeAttr('class');
		});
	});

	$( 'table' ).find("[type=text]").removeAttr('class');
	try{
		$("svg").parent().parent().parent().hide();
		notAProperDiv = $("div:contains('No applicable'):not(:has(div))");
		////console.log('notAProperDiv '+notAProperDiv);
		$.each(notAProperDiv, function( index, value ) {
			$(value).remove();
			
		});
		$('.MuiInput-underline-110').addClass('without-after-element');
		$.each($('#currentModel table input[value!=""]'),function(index , val){
				var currentheadertr = $(this).parent().parent().parent().parent().parent().parent().parent().find('thead tr');
				var currenttbody = $(this).parent().parent().parent().parent().parent().parent();
				var currenttr = $(this).parent().parent().parent().parent().parent();
				var currenttd = $(this).parent().parent().parent().parent();
				
				var indexx = currenttr.find('td').index( currenttd );
				var currentthead = $(currentheadertr.find('th').get(indexx));
				currentthead.prependTo(currentheadertr);
				$.each(currenttbody.find('tr'),function(index , ctr){
					//console.log($(ctr),$(ctr).find("td").get(indexx));
					$($(ctr).find("td").get(indexx)).prependTo(ctr);
				});
				
				
				//$(this).parent().parent().parent().parent().prependTo($(this).parent().parent().parent().parent().parent());
				////console.log($($(this).parent().parent().parent().parent().parent()),$($(this).parent().parent().parent().parent().parent()).find("td"),$(this).parent().parent().parent().parent(),index);
		});
	}catch(err){//console.log(err)
		//
	}
	
	$("svg").parent().parent().parent().hide();
}  // buildDialogWindow

var selectedBox = null;

//*********************Color****************************//
var mainColor =  "$${SColor-Main}$$";
var buttonColor = "$${SColor-Button}$$";
var hoverColor = "$${SColor Hover}$$";


// Tablehead
//$("table.sortable thead th").css({"background-color":""+mainColor+"","border":"1px solid "+mainColor+"","color":" white"});
$("table.sortable thead th").css({"background-color":""+mainColor+"","color":" white"});

$("#numberModels, #filter-search").css({"color":""+mainColor+"","opacity": "0.70"});

//Hidden Sidenav
$(".sidenav").css({"background-color":""+mainColor+""});


//Selects
$("#soft, #env, #haz").css({"color":""+mainColor+""})

// Buttons
$(".topnav a.Nav").css({"background-color":""+mainColor+""})
$(".detailsButton, .downloadButton").css({"background-color":""+buttonColor+"", "color":"white", "width":"90px"})
$("#clear").css({"color":""+mainColor+"","opacity": "0.5"})
$(".fa-remove").css({"color":""+hoverColor+""})

// Tablehead:hover
$("th.actives.ascending, th.actives.descending, table.sortable th.actives").hover(function(mouse) {
  $(this).css("background-color", mouse.type === "mouseenter"?""+hoverColor+"":""+mainColor+"")
});

$(".sidenav a.Nav").hover(function(mouse) {
  $(this).css("background-color", mouse.type === "mouseenter"?""+hoverColor+"":""+mainColor+"")
  $(this).css("color", mouse.type === "mouseenter"?"white":"white")
});

$(".sidenav .closebtn").hover(function(mouse) {
  $(this).css("color", mouse.type === "mouseenter"?""+hoverColor+"":"white")
});

/*$(".topnav a.Nav").hover(function(mouse) {
  //$(this).css("background-color", mouse.type === "mouseenter"?""+hoverColor+"":""+buttonColor+"")
  $(this).css("background-color", mouse.type === "mouseenter"?""+hoverColor+"":""+mainColor+"");
    //$(this).css("color", mouse.type === "mouseenter"?"white":"white")
});*/

$(".topnav a.Nav").hover(function(mouse) {
  $(this).css("background-color", mouse.type === "mouseenter"?""+hoverColor+"":""+mainColor+"")
    $(this).css("color", mouse.type === "mouseenter"?"white":"white")
});

$(".detailsButton, .downloadButton").hover(function(mouse) {
  $(this).css("background-color", mouse.type === "mouseenter"?""+hoverColor+"":""+buttonColor+"")
});

//*************************************************//


$${Sbootstrap}$$
$${Sbootstraptabcollapse}$$
$${Slodash}$$
$${Spunycode}$$
$${Sreactmin}$$
$${Sreactdom}$$
$${Sbundle}$$
loadCss("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css");
function loadCss(url) {
		    var link = document.createElement("link");
		    link.type = "text/css";
		    link.rel = "stylesheet";
		    link.href = url;
		    document.getElementsByTagName("head")[0].appendChild(link);
}

var _firstModelScript;


var _firstModelViz;
var path = {}
cssfiles = [];
_firstModel = $${SMetadata}$$[0][0];

window.generalInformation = _firstModel.generalInformation;
window.scope =  _firstModel.scope;
window.modelMath =  _firstModel.modelMath;
window.dataBackground =  _firstModel.dataBackground;

$(document).ready(function() {
	$('.checkbox1').click(function() {
  		selectedBox = this.name;
  		$('.checkbox1').each(function() {
      		if ( this.name == selectedBox ){
          		this.checked = true;
          		$(this).closest("tr").css("background-color", "#e1e3e8");
      		}else{
          		this.checked = false;
          		$(this).closest("tr").css("background-color", "transparent");
      		};
  		});
		FLOW_VARIABLES["selectedmodel"] = knimeDataTable.getRows()[selectedBox].rowKey;
	});


bodyContent = "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
		
"                <div class='tabbable'>\n" + 
"                    <ul class='nav nav-tabs'>\n" + 

"                        <li class='active'><a href='#sub21'>General Information</a>\n" + 
"                        </li>\n" + 
"                        <li><a href='#sub22'>Scope</a>\n" + 
"                        </li>\n" + 
"                        <li><a href='#sub23'>Data Background</a>\n" + 
"                        </li>\n" +
"                        <li><a href='#sub24'>Model Math</a>\n" + 
"                        </li>\n" + 
"                        <li ><a href='#sub27'>Model Plot</a>\n" + 
"                        </li>\n" + 
"                    </ul>\n" + 
"                    <div class='tab-content'>\n" + 
"                        <div class='tab-pane fade active in' id='sub21'>\n" + 
"                     		<div id=\"generalinformation\" class=\"App\">"+

"								<div class=\"demoform\">"+
"								</div>"+
"					  		</div>" +
"                        </div>\n" + 
"                        <div class='tab-pane fade' id='sub22'>\n" + 
"                    		 <div id=\"scope\" class=\"App\">"+
"								<div class=\"demoform\">"+
"								</div>"+
"					 		 </div>" +
"                        </div>\n" + 
"                        <div class='tab-pane fade' id='sub23'>\n" + 
"                    		 <div id=\"databackground\" class=\"App\">"+
"								<div class=\"demoform\">"+
"								</div>"+
"					 		 </div>" +
"                        </div>\n" + 
"                        <div class='tab-pane fade' id='sub24'>\n" + 
"                    		 <div id=\"modelMath\" class=\"App\">"+
"								<div class=\"demoform\">"+
"								</div>"+
"					 		 </div>" +
"                        </div>\n" + 

"                        <div class='tab-pane fade' id='sub27'>\n" + 
"                    		 <div >"+
"							<div id = 'imageDiv' />"+
"					 		 </div>" +
"                        </div>\n" + 
"                    </div>\n" + 
"                </div>\n" 

$('body').append(
		"<div id='currentModel' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog modal-lg'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titleOfCurrentModel' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='ModelContent' class='modal-body'>\n" + 
        			bodyContent+
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>\n" + 
        
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");


$('#Metadata a').on('click', function (e) {
  	e.preventDefault()
  	$(this).tab('show')
})

// initialize tab function
$('.nav-tabs a').click(function(e) {
 e.preventDefault();_currentModel
 $(this).tab('show');

});

// slide to top of panel-group accordion
$('.panel-group').on('shown.bs.collapse', function() {
 var panel = $(this).find('.in');
 $('html, body').animate({
     scrollTop: panel.offset().top + (-60)
 }, 500);
});
});

$(document).ready(function() {
$('#MenuIcon').click(function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    
 });
 $('.closebtn').click(function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
});

});
