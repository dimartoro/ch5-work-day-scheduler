// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

    function setTimeStyles(hours){
      var tasks = document.querySelector("#calendar").children;
      for(var x = 0; x< tasks.length; x++){
          var taskVal = parseInt(tasks[x].id.substring(5));
          tasks[x].classList.remove("past");
          tasks[x].classList.remove("present");
          tasks[x].classList.remove("future");
          if(taskVal < hours){
              tasks[x].classList.add("past");
          }
          if(taskVal > hours){
              tasks[x].classList.add("future");
          }
          if(taskVal == hours){
              tasks[x].classList.add("present");
          }
      }
  
  }
  var currentTime= new Date();
  
  setInterval(function(){
      var t = new Date(); 
      document.getElementById('currentDay').textContent = t;
      document.getElementById('currentDay').classList.add('timerRed');
     },1000);


  function fillDays(){
      var timeBlocks = document.getElementsByClassName('time-block');
      for(var x = 0; x<timeBlocks.length; x++){
          var children = timeBlocks[x].children;
          for(var y = 0; y<children.length; y++){
              if(children[y].type == 'textarea'){
                  var valuesFromStorage = localStorage.getItem(timeBlocks[x].id);
                  children[y].value = valuesFromStorage;
              }
          }
      }
  }

  function save(caller){
      var parent = caller.parentElement;
      for(var x = 0; x<parent.children.length; x++){
          if(parent.children[x].type == 'textarea'){
              localStorage.setItem(parent.id, parent.children[x].value);
          }
      }
  }

  function remove(caller){
      var parent = caller.parentElement;
      for(var x = 0; x<parent.children.length; x++){
          if(parent.children[x].type == 'textarea'){
              parent.children[x].value = '';
              localStorage.removeItem(parent.id);
          }
      }
  }
  
  var saveBtns = document.getElementsByClassName('saveBtn');
  for(var x= 0; x<saveBtns.length; x++){
  saveBtns[x].addEventListener('click', function(){save(this);});
  }

  var deleteBtns = document.getElementsByClassName('deleteBtn');
  for(var x= 0; x<deleteBtns.length; x++){
      deleteBtns[x].addEventListener('click', function(){remove(this);});
  }

  setTimeStyles(currentTime.getHours());
  fillDays();
  
  });
  