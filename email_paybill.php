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
    $mail->isHTML(true);


    $mail->Subject = "BreadTopExpress Order " . $_POST['paidInvoice'] . " has/have been PAID";
    $mail->Body    = "- Date: " . $_POST['paymentTime'] . "<br>" .
                     "- To: " . $_POST['email'] . "<br>" .
                     "- From: </b>" . "breadtopexpress@gmail.com" . "<br><br>" .
                     "<b>Invoice Payment Confirmation</b><br><br>" .
                     "- Company name: " . $_POST['username']."<br><br>" .
                     "- Payment time: " . $_POST['paymentTime']."<br><br>" .
                     " Your account detail <b>BEFORE</b> the payment: <br>" .
                     "- Account credit : $" . $_POST['accountcredit_before'] ."<br>" .
                     "- Owing Invoice : " . $_POST['owingInvoice'] ."<br>" .
                     "- Total amount of Owing Invoice : $" . $_POST['totalOwing_beforepayment'] ."<br><br>" .
                     " Your <b>PAYMENT</b> detail: <br>" .
                     "- Payment Amount : $" . $_POST['paymentamount'] ."<br>" .
                     "- Total amount of payment (payment amount + account credit) : " . $_POST['totalpaymentamount'] ."<br><br>" .
                     " Your account detail <b>AFTER</b> the payment: <br>" .
                     "- Invoice (PAID) : " . $_POST['paidInvoice'] ."<br>" .
                     "- Invoice (OWING) : " . $_POST['owingInvoiceLeft'] ."<br>" .
                     "- Total amount of Owing Invoice : $" . $_POST['totalOwing_afterpayment'] ."<br>" .
                     "- Account credit : $" . $_POST['accountcredit_after'] ."<br><br>" .
                     "- BreadTopExpress thanks you for your payment. ";
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
