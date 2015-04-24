var getShows = function (showResponse) {
    "use strict";

    // for test pupose, print out the first result
    //console.log("This is what I get after callback");
    console.log(showResponse);

    // create a table to store the data
    var $showTable = $('<table>'),
            
        // create first row of containing the headings
        $row = $('<tr>'), $col1 = $('<td>').text("Name of Show"),
        //$col2 = $('<td>').text("Episode No."),
        $col3 = $('<td>').text("Episode No.: Title"),
        $col4 = $('<td>').text("Air Time"),
        $col5 = $('<td>').text("Network"),
        $col6 = $('<td>').text("Category"),
        $col7 = $('<td>').text("Summary");
    $row.append($col1);
    //$row.append($col2);
    $row.append($col3);
    $row.append($col4);
    $row.append($col5);
    $row.append($col6);
    $row.append($col7);
        
    $showTable.append($row);
    
    // loop through all objects to retrive needed informamtion
    for (var obj in showResponse){
                
        // variable show will be the current object 
        var show = showResponse[obj];
        // enter into show object of the show
        var showDesc = show.show;
        // enter into the network object
        var showNetwork = showDesc.network;
/*
        // TEST: prints all shows to console for testing
        console.log("first obj in showResponse");
                
        // prints all main objects
        console.log(show);
                
        // Name of Episode
        console.log("Name of Episode: " + show.name);
*/
        // convert time to 12 hour
        var time = show.airtime;
        var hour = +time.substr(0,2);
        var hr = hour % 12 || 12;
        var ampm = hour < 12? "AM" : "PM";
        time = hr + time.substr(2, 3) + ampm;
        
/*
        console.log("Air timme: " + time);
        console.log("Air timme: " + show.airtime);

        // Number of the show
        console.log("Episode: " + show.number);
                
        // Summary of the episode
        console.log("Summary: " + showDesc.summary);
            
        // name of the Show
        console.log("Name of Show: " + showDesc.name);
                
        // type of show
        console.log("Type: " + showDesc.type);
                
        // What network the show airs in 
        console.log("Network: " + showNetwork.name);
*/
                
        var $item = $('<tr>'); //create and start a row
        var $show = $('<td>').text(showDesc.name); // create variable to store Show name
        //var $episodeNum = $('<td>').text(show.number); // create variale to store Episode number
        var $episode = $('<td>').text(show.number + ":  " + show.name); // create variable to store Episode name
                
        var $airTime = $('<td>').text(time); // create variable to store Air Time
        var $network = $('<td>').text(showNetwork.name); // create variable to store name of the Network
        var $type = $('<td>').text(showDesc.type); // create variable to store type of show
        var sum = $(showDesc.summary).text(); // takes the summary and remove html tags

        var $summary = $('<td>').text(sum); // creates a variable to store the summary
                // add all the variables to the row
        $item.append($show);
        //$item.append($episodeNum);
        $item.append($episode);
        $item.append($airTime);
        $item.append($network);
        $item.append($type);
        $item.append($summary);
            
        // add the row to the table
        $showTable.append($item);
    }
    // attach the table to the "main" tag in html
    $('main').append($showTable);
};

$(document).ready(function() {
    $("button").on('click', function () {
        
        $('main').empty();
        
        // get current date
        var today = new Date();
        // pick out the year, month+1 and date
        var yyyy = today.getYear();
        var mm = today.getMonth()+1;
        var dd = today.getDate();

        // date manupulation
        if (yyyy<1000) {yyyy+=1900};
        if (mm<10) {mm='0'+mm};
        if (dd<10) {dd='0'+dd};
        
        var url;
        
        // get date from user
        var inputDate = document.getElementById('submitDate').value;
        
        // return shows on particular date
        if (inputDate.length !== 0){
            url = 'http://api.tvmaze.com/schedule?country=US&date='+inputDate;
        }else{ // otherwise return shows on todays date
            url = 'http://api.tvmaze.com/schedule?country=US&date='+yyyy+'-'+mm+'-'+dd;
        }
        $.getJSON(url, function (showResponse) {
                getShows(showResponse);
            });
    });
    
});