$(document).ready(function(){
    let edit = false;
    $('#task-result').hide();
    fetchTasks();
    //task search
    $('#search').keyup(function(e){
        if($('#search').val()){
            let search = $('#search').val()
            $.ajax({
                url:'task-search.php',
                type:'POST',
                data: {search},
                success: function(response){
                    let tasks=JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                                ${task.name},${task.description}
                        </li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();

                }
            })
        }
        $('#task-result').hide();
    })
    //task add
    $('#task-form').submit(function(e){
       const postData ={
        name: $('#name').val(),
        description: $('#description').val(),
        id: $('#taskId').val()
       };

       let url = edit === false ? 'task-add.php':'task-update.php';
       $.post(url, postData, function(response){
            fetchTasks();
            $('#taskButton').text("Save Task")
            $('#task-form').trigger('reset');
       });
        e.preventDefault();
    });
    //task list
    function fetchTasks(){
        $.ajax({
            url: 'task-list.php',
            type:'GET',
            success: function(response){
                let tasks = JSON.parse(response);
                console.table(tasks);
                let template='';
                tasks.forEach(task=>{
                    template +=`
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a href="#" class="task-item">${task.name}</a>
                            </td>
                            <td>${task.description}</td>
                            <td>
                                <button class="btn btn-danger btn-sm task-delete">
                                    Delete
                                </button>
                            </td>
                            <td>
                                <input type="checkbox" class="text-center">
                            </td>
                        </tr>
                    `
                });
                $('#tasks').html(template);
            }
        })
    };

    //task delete
    $(document).on('click','.task-delete', function(){
        if(confirm('are you sure you want to delete it?')){
            let element=$(this)[0].parentElement.parentElement;
            let id= $(element).attr('taskId');
            console.log(id);
            $.post('task-delete.php', {id}, function(response){
            console.log(response)
            fetchTasks();
        });
        }
    })
    //task updating
    $(document).on('click','.task-item', function(){
        let element=$(this)[0].parentElement.parentElement;
        let id=$(element).attr('taskId');        
        $.post('task-single.php',{id}, function(response){            
            const task = JSON.parse(response);            
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            $('#taskButton').text("Edit Task")
            edit=true;

        });
    })
});