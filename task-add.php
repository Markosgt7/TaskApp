<?php

use LDAP\Result;

    include_once'database.php';

    if(isset($_POST['name']) && isset($_POST['description'])){
        $name=strtoupper($_POST['name']);
        $description=strtoupper($_POST['description']);
        $query="INSERT INTO tasks(name,description) VALUES('$name','$description')";
        $result=mysqli_query($connection, $query);
        if(!$result){
            die('Query Failed with'.mysqli_error($connection));
        }
        echo 'Task Added Successfully';
    }
   
?>