
$(document).ready(function(){

    //submit an issue & prevent refresh
    $('#input-form').on('submit', function(event){
        event.preventDefault();
        submitIssue(event);
    });
});

//get values from form and submit issue
function submitIssue(event){

    //create issue object
    var issue = {id: null, description: null, severity: null, assign: null};

    issue.description = $('#description').val();
    issue.severity = $('#severity').val();
    issue.assign = $('#assign').val();
    issue.id = chance.guid();

    //create issue HTML
    var template = `<div class="col-10" id="${issue.id}" style="border: solid 2px green; margin: 10px 0; padding-bottom: 10px; border-radius: 10px">
            <p style="margin-bottom: 0px"> issue ID: ${issue.id}</p>
            <span class="badge badge-pill badge-success">open</span>
            <h3>${issue.description}</h3>
            <p>Priority: ${issue.severity}</p>
            <p>Assign to: ${issue.assign}</p>
            <hr>
            <button type="button" id="close" class="btn btn-sm btn-warning">close</button>
            <button type="button" id="delete${issue.id}" class="btn btn-sm btn-danger">delete</button>
        </div>
    </div>`

    //append issue to div.list
    $('#list').append(template);

    //reset form
    $("#description").val('')
    $("#severity").val('low')
    $("#assign").val('')
}

//close an issue
$('#list').on('click', 'div button.btn-warning' , function(event){
  $(this).parent().css("border","2px solid yellow")
  $(this).siblings('span').replaceWith("<span class=\"badge badge-pill badge-warning\">closed</span>")
  $(this).replaceWith('<button type="button" id="'+event.target.id+'"class="btn btn-sm btn-warning" disabled>close</button>')
});

//check if issue is closed & delete issue
$('#list').on('click', 'div button.btn-danger' , function(event){
  if($(this).siblings('.badge-warning').length !== 0){
      $(this).parent().css("border","2px solid red")
      $(this).parent().remove()
  }else if(window.confirm("This Issue is still open. Do you really want to delete?")){
    $(this).parent().css("border","2px solid red")
    $(this).parent().remove();
  }
});
