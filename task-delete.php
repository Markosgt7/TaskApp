<?php   
    include_once'database.php';    
    if(!empty($_POST['id'])){
        $id = $_POST['id'];
        $query="DELETE FROM tasks WHERE id='$id'";
        $result=mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed on->'.mysqli_error($connection));
        }
        echo "Task delete successfully";
    }

?>