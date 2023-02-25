$(function () {
    function setTimeStyles(hours){
        $("#calendar").children().each(function(){
            var me = this;
            var taskVal = parseInt($(me).attr("id").substring(5));
            $(me).removeClass("past");
            $(me).removeClass("present");
            $(me).removeClass("future");

            if(taskVal < hours){
                $(me).addClass("past");
            }
            if(taskVal > hours){
                $(me).addClass("future");
                
            }
            if(taskVal == hours){
                $(me).addClass("present");
            } 
      });
  }
  
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

  setTimeStyles(currentTime.getHours());
  fillDays();
  
  setInterval(function(){
    var t = new Date(); 
    $('#currentDay').text(t);
    $('#currentDay').addClass('timerRed');
   },1000);
  });


  function save(caller){
    $(caller).parent().children().each(function(){
        var me = this;
        if($(me).is("textarea")){
            localStorage.setItem($(me).parent().attr("id"), $(me).val());
        }
    });
}

function remove(caller){
    $(caller).parent().children().each(function(){
        var me = this;
        if($(me).is("textarea")){
            $(me).val("");
            localStorage.removeItem($(me).parent().attr("id"));
        }
    });
}

$('.saveBtn').each(function(){
    var me = this;
    $(me).on('click', function(){save(this);});
});


$('.deleteBtn').each(function(){
    var me = this;
    $(me).on('click', function(){remove(this);});
});
  