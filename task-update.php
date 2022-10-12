<?php

use LDAP\Result;

    include_once'database.php';

    $id=strtoupper($_POST['id']);
    $name=strtoupper($_POST['name']);
    $description=strtoupper($_POST['description']);

    $query="UPDATE tasks SET name='$name', description='$description' WHERE id='$id'";
    $result=mysqli_query($connection,$query);
    if(!$result){
        die('Query failed on->'.mysqli_error($connection));
    }
    echo "Task edited successfully";
?>