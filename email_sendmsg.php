<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'phpmailer/PHPMailerAutoload.php';

// if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputSubject']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    // if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputSubject']) || empty($_POST['inputMessage'])) {
    //     $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    //     echo json_encode($data);
    //     exit;
    // }

    //create an instance of PHPMailer

    $mail = new PHPMailer();

    $mail->setFrom('breadtopexpress@gmail.com', 'breadtopexpress');
    $mail->addAddress('nickyangtest@gmail.com');
    // $mail->addAddress('oojacklioo6@gmail.com');
    $mail->isHTML(true);


    $mail->Subject = "BreadTopExpress Important Notification";
    $mail->Body    = "Dear Customer: <br />" . $_POST['msg'] .
                     "<br> BreadTopExpress thanks you for your business. ";
    // $mail->Body    = $_POST['Description'];
    // $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

    // if (isset($_POST['ref'])) {
    //     $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    // }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

// } else {
//
//     $data = array('success' => false, 'message' => 'Please fill out the form completely.');
//     echo json_encode($data);
//
// }
