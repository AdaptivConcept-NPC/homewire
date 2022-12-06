let totalShoppingBagAmt = document.getElementById('cart-total');
let cartTotalAmt = 0;
let cartList = "";
const closePayProcessBtn = document.getElementById('closepaymentprocessingmodal');
const pcmbtn = document.getElementById('pcmbutton');

const yocoSDK = new window.YocoSDK({
    publicKey: 'pk_test_d27d4f628E6ZzdM9ebd4'
});
/*const inline = yocoSDK.inline({
    amountInCents: 29699,
    currency: 'ZAR',
    layout: 'basic'
});
inline.mount('.yoco_inline');

$('.inline form').submit(e => {
    e.preventDefault();

    inline.createToken()
        .then( response => {
            if(response.error){
                $('.inline p').html("[Create Token Response Error]: "+response.error.message);
                $('.inline p').html('error');
            }
            else {
                fetch('/payment', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({token: response.id, amountInCents: 29699 })
                })
                    .then(result => result.json())
                    .then(data => {
                        if(data.errorCode){
                            $('.inline p').html("[Server ChargeAPI Error]: "+error.displayMessage);
                            $('.inline p').addClass('error');
                        }
                        else{
                            $('.inline p').html('Your payment is successful. We will send you and invoice shortly. Thank you for your service.');
                            $('.inline p').addClass('success');
                        }
                    })
                    .catch(error => {
                        $('.inline p').html("[Server ChargeAPI Payment Catch Error]: "+error.message);
                        $('.inline p').addClass('error');
                    })
            }
        })
        .catch(error => console.log("[Token Response Error]: "+error.message));
});*/

//Popup Method
$('.popup button').click(() => {
    $('#payment-process-spinner').show();
    closePayProcessBtn.click();
    cartTotalAmt = parseFloat(totalShoppingBagAmt.innerHTML);
    
    if(cartTotalAmt >= 200){
        //greater than or equal to R2.00
        cartTotalAmt = parseFloat(totalShoppingBagAmt.innerHTML) * 100;

        yocoSDK.showPopup({
            amountInCents: cartTotalAmt,
            currency: 'ZAR',
            name: 'Homewire.Store',
            description: 'Cart items list',
            callback: response => {
                if(response.error){
                    pcmbtn.click();
                    $('.popup p').html(`<i class="fas fa-bomb" style="font-size: 3rem;"></i><br> [Create Token Response Error]: `+response.error.message);
                    $('.popup p').addClass('error');
                    $('#payment-process-spinner').hide();
                }
                else {
                    //console.log(response);
                    fetch('/payment', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ token: response.id, amountInCents: cartTotalAmt })
                    })
                        .then(result => result.json())
                        .then(data => {
                            pcmbtn.click();
                            if(data.errorCode){
                                $('.popup p').html(`<i class="fas fa-bomb" style="font-size: 3rem;"></i><br> [Server ChargeAPI Error]: `+error.displayMessage);
                                $('.popup p').addClass('error');
                                $('#payment-process-spinner').hide();
                            }
                            else{
                                console.log(data);
                                $('.popup p').html(`<i class="fas fa-thumbs-up" style="font-size: 3rem;"></i><br> Your payment is successful. We will send you an invoice shortly. Thank you for your service.`);
                                $('.popup p').addClass('success');
                                $('#payment-process-spinner').hide();
                            }
                        })
                        .catch(error => {
                            pcmbtn.click();
                            $('.popup p').html(`<i class="fas fa-bomb" style="font-size: 3rem;"></i><br> [Server ChargeAPI Payment Catch Error]: `+error.message);
                            $('.popup p').addClass('error');
                            $('#payment-process-spinner').hide();
                        })
                }
            }
        })
    }else{
        //less then R2.00. do not allow purchase. Minimum purchase will be R10
        alert("😅 Well, unfortunately our minimum purchase amount is R10. Please consider adding more items to your shopping bag.");
    }
})