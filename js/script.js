//BUSINESS LOGIC

//FUNCTION FOR PLACING AN ORDER

function placeOrder(){

//GETTING INPUT FROM THE FORM

    var name=$("input#name").val();
    var flavor=$("#pizza-flavor").val();
    var crust=$("#pizza-crust").val();
    var size=$("#pizza-size").val();
    var toppings=[];
    $.each($('input[name="toppings"]:checked'),
        function(){
            toppings.push($(this).val());
        }
    );
    var number=$("#quantity").val();

//SETTING DIFFERENT PRICES FOR THE PIZZA FLAVORS

    var sizeCost;
    if(flavor === "Bbq Beef" || flavor === "Chicken Tikka" || flavor === "Hawaiian" ) {
        if(size === "Small"){
            sizeCost = 400;
        }
        else if(size==="Medium"){
            sizeCost = 650;
        }
        else if(size === "Large"){
            sizeCost = 900;
        }
    }
    else if(flavor === "Grilled Pork" || flavor === "Margharita" || flavor === "Marinara" || flavor === "Pulled Pork" ){
        if(size === "Small"){
            sizeCost = 450;
        }
        else if(size==="Medium"){
            sizeCost = 700;
        }
        else if(size === "Large"){
            sizeCost = 950;
        }
    }
    else if(flavor === "Mushroom" || flavor === "Original Veggie" || flavor === "Oyster" || flavor === "Pepperoni"){
        if(size === "Small"){
            sizeCost = 500;
        }
        else if(size==="Medium"){
            sizeCost = 800;
        }
        else if(size === "Large"){
            sizeCost = 1100;
        }
    }

//SETTING PRICES FOR DIFFERENT CRUST TYPES

    var crustCost;
    if (crust === "Gluten Free"){
        crustCost = 200;
    }
    else if( crust === "Hand Tossed"){ 
        crustCost = 150;
    }
    else if( crust === "Original"){ 
        crustCost = 100;
    }
    else if( crust === "Pan"){ 
        crustCost = 250;
    }  
    else if( crust === "Stuffed"){ 
        crustCost = 100;
    }  
    else if( crust === "Thin"){ 
        crustCost = 150;
    }

// TOPPINGS CHECKBOX, SETTING THE PRICES ACCORDING TO SIZES

    //getting the number of checkboxes checked
    var checkboxes= $('input[name="toppings"]:checked').length;

    //limit number of checkboxes to 3
    if(checkboxes<=3){
        if(size === "Small"){
            var toppingsCost = checkboxes * 70;
        }
        else if(size === "Medium"){
            var toppingsCost = checkboxes * 100;
        }
        else if(size === "Large"){
            var toppingsCost= checkboxes * 130;
        }
    }
    //disable unchecked boxes
    $("input[type='checkbox']:not(:checked)").prop({ 
        disabled: true
    });

    //deactivate button after order is made to prevent client from changing order once the order is placed 
    $('#placeorder').prop('disabled', true);    
    
//GETTING THE TOTAL AMOUNT
    $("#yourorder").show();

    var price =(sizeCost + crustCost +toppingsCost);
    var totalPrice = parseInt(price*number);
    
    $(".salutation").text("Hey " + name +" . Here's your order:");
    $(".pizza-size").append('<tr><td id="pizza-size">'+ size);
    $(".number").append('<tr><td id="number">' + number);
    $(".pizza-crust").append('<tr><td id="pizza-crust">' + crust);
    $(".pizza-flavor").append('<tr><td id="pizza-flavor">' + flavor);
    $(".pizzaTotal1").append('<tr><td id="pizzaTotal1">' + totalPrice);
    $(".toppings").append('<tr><td id="pizza-toppings">' + toppings);

    //create an array for all total prices
    arrayTotal.push(totalPrice); 
      if (toppings == "") {
          $(".toppings").append('<tr><td id="pizza-toppings">' + "-");
      }
      if (toppings != "") {
          $(".toppings").append('<tr><td id="pizza-toppings">' + toppings);
      
      $(".name").text(name);
    }
     else {
      document.getElementById("pizza-toppings-help").innerHTML = "Please select a maximum of 3!";

      //overrides previous color styling
      document.getElementById("pizza-toppings-help").style.cssText = 'color:red !important' 
  }

//ADDING THE MAKE DELIVERY FUNCTION 
   
                   
}
function makeDelivery() {
    $("#deliveryConfirmation").show;

    //getting user delivery location
    var location=$("input#location").val();
    var phone=$("input#phone").val();

    $(".location").text(location);
    $(".phone").text(phone);
    $("#delivery").hide();


}


//USER INTERFACE
$(document).ready(function(){
    $("#orders").submit(function(event){
        event.preventDefault();
        placeOrder();
    });
    $("#deliveryDetails").submit(function(event) {
        event.preventDefault();
        makeDelivery();
    });
});