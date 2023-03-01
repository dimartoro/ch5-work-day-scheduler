$(function () { // "A call to this jQuery function wraps all code that interacts with the DOM to ensure that the code isn't run until the browser has finished 
                //rendering all the elements in the html".

//this function is in charge of setting up the colors "stages of the day, past, present, future" in the text areas 
//comparing the hours from the current time (currentTime variable) with the substring xx of the children attribute id "hour-xx". 

    function setTimeStyles(hours){
        $("#calendar").children().each(function(){
            var me = this;
            var calSecIdHourlyValue = parseInt($(me).attr("id").substring(5));
            $(me).removeClass("past");
            $(me).removeClass("present");
            $(me).removeClass("future");

            if(calSecIdHourlyValue < hours){
                $(me).addClass("past");
            }
            if(calSecIdHourlyValue > hours){
                $(me).addClass("future");
                
            }
            if(calSecIdHourlyValue == hours){
                $(me).addClass("present");
            } 
      });
  }
  
  //this function is in charge of showing the tasks, saved in the local storage,  in the calendar after refreshing the web page.
  var currentTime= new Date();
  
  function fillDays(){
      $(".time-block").each(function(){
        var parent = this;
        $(parent).children().each(function(){
            var me = this;
            if($(me).is('textarea')){
                var valuesFromStorage = localStorage.getItem($(me).parent().attr("id"));
                $(me).text(valuesFromStorage);
            }
        });
      });
  }

  //call the function setTimeStyles sending it the hour from currentTime.
  setTimeStyles(currentTime.getHours());
  fillDays();
  
  //the set interval function is in charge to automaticly show the current time at the top of the work scheduler calendar.
  setInterval(function(){

    // var t = new Date();

    var now = dayjs();
    var t = now.format("MMM D, YYYY, h:mm:ss a")

    $('#currentDay').text(t);
    $('#currentDay').addClass('timerRed');
    },1000);

  });

//save the tasks from the text area in the local storage. Takes the parent of the caller, and each of the children of the parent looking the textarea, 
//and save in localStorage the parent attribute id and the task (value) from the text area.
  function save(caller){
    $(caller).parent().children().each(function(){
        var me = this;
        if($(me).is("textarea")){
            localStorage.setItem($(me).parent().attr("id"), $(me).val());
        }
    });
}

//delete the tasks from the text area in the local storage seting up "". Takes the parent of the caller, and each of the children of the parent looking the textarea, 
//and removing from the localStorage the parent attribute id and the task (value) from the text area.
function remove(caller){
    $(caller).parent().children().each(function(){
        var me = this;
        if($(me).is("textarea")){
            $(me).val("");
            localStorage.removeItem($(me).parent().attr("id"));
        }
    });
}

//onclick function activated by the cliking of the save icon.
$('.saveBtn').each(function(){
    var me = this;
    $(me).on('click', function(){save(this);});
});

//onclick function activated by the clicking of the trashcan icon.
$('.deleteBtn').each(function(){
    var me = this;
    $(me).on('click', function(){remove(this);});
});
  