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

    $mail->setFrom($_POST['email'], 'breadtopexpress');
    $mail->addAddress('nickyangtest@gmail.com');
    // $mail->addAddress('oojacklioo6@gmail.com');
    $mail->addStringAttachment(file_get_contents($_POST['pdfurl']),'NewInvoice.pdf');
    $mail->isHTML(true);


    $mail->Subject = "BreadTopExpress Order #" . $_POST['invoiceNo'] . "has been CREATED";
    $mail->Body    = "- Date: " . $_POST['invoiceDate'] . "<br>" .
                     "- To: " . $_POST['email'] . "<br>" .
                     "- From: </b>" . "breadtopexpress@gmail.com" . "<br><br>" .
                     "<b>Electronic Order Confirmation</b><br><br>" .
                     "- Customer name: " . $_POST['username'] ." from ".$_POST['companyname']."<br><br>" .
                     "- Electronic Order No : " . $_POST['invoiceNo'] ."<br><br>" .
                     "- Order Detail : " . $_POST['itemlist'] ."<br>" .
                     "- Total Price : $" . $_POST['totalpriceinemail'] ."<br><br>" .
                     "- The requested delivery date is : " . $_POST['deliverdate'] ."<br><br>" .
                     "- This order will be processed in due course. <br><br>" .
                     "- BreadTopExpress thanks you for your business. ";
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
