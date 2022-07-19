// onload delay
// change to add tickets.button.buy accommodations.grid.buy
var showCart;
jQuery(document).ready(function($) {
    var cartWrapper = $('.cd-cart-container');
    //product id - you don't need a counter in your real project but you can use your real product id
    var productId = 0;
    var cartData = {};
    var discountData = {};

    if (cartWrapper.length > 0) {
        //store jQuery objects
        var cartBody = cartWrapper.find('.body')
        var cartList = cartBody.find('.table-body').eq(0);
        var cartTotal = cartWrapper.find('.cd-cart .subtotal').find('span.final');
        var cartTotalBeforeDiscount = cartWrapper.find('.cd-cart .subtotal').find('span.before-discount');


        var cartTotalTHB = cartWrapper.find('.cd-cart .subtotal').find('span.final-thb');
        var cartTotalBeforeDiscountTHB = cartWrapper.find('.cd-cart .subtotal').find('span.before-discount-thb');

        var cartTrigger = cartWrapper.find('.cd-cart-trigger');
//         var cartCount = cartTrigger.children('.count')
        var cartCount = $('#cart-toggle-counter')
        var cartCountShadow = $('#cart-toggle-counter-shadow')

        var addToCartBtn = $('.cd-add-to-cart');
        var discountList = cartBody.find('.discount-codes').eq(0);
        var undo = cartWrapper.find('.undo');
        var undoTimeoutId;


		$( "#discount-input" ).keyup(function() {
			var inputValue = $( "#discount-input" ).val();

			displayDiscountError('',false);
			
	  	    if (inputValue == '') {
				cartWrapper.removeClass('typing');		    
		    } else {
				cartWrapper.addClass('typing');
		    }
		});
        // Discount
        cartBody.find('.discount-header-title').on('click', function(event) {
            event.preventDefault();

            $(this).toggleClass('active');
            if($(this).hasClass('active')) {
                $('.wrapper-discount .discount-input-group').slideDown(150, function(){
                    $('#discount-input').get(0).focus();
                });
            }
            else {
                $('.wrapper-discount .discount-input-group').slideUp(150);
            }
        });
        cartBody.find('.discount-button').on('click', function(event) {
            event.preventDefault();

            var discount = $('#discount-input').val().trim().toUpperCase();
            if (discount == "") return;

            addDiscount(discount);
        });
        var togglePromo = function(event) {
            event.preventDefault();

			var icon = cartBody.find('.promo-code-toggle i');
			var promoInputContainer = $('.promo-code-input-container');
			if (icon.hasClass("fa-minus-circle")) {
				icon.removeClass("fa-minus-circle");
				icon.addClass("fa-plus-circle");
				promoInputContainer.removeClass('closed-container');
				promoInputContainer.addClass('open-container');
				
			} else {
				icon.removeClass("fa-plus-circle");
				icon.addClass("fa-minus-circle");
				promoInputContainer.removeClass('open-container');
				promoInputContainer.addClass('closed-container');

			}

        }
        cartBody.find('.promo-code-toggle').on('click', togglePromo);
        cartBody.find('.promo-code-text').on('click', togglePromo);
        
        
        

        //add product to cart
        addToCartBtn.on('click', function(event) {
            event.preventDefault();
            addToCart($(this));
            toggleCart(false);
            hideMissingProduct();
            

        });

        //open/close cart
        cartTrigger.on('click', function(event) {
            event.preventDefault();
            toggleCart();
        });

        //close cart when clicking on the .cd-cart-container::before (bg layer)
        cartWrapper.on('click', function(event) {
            if ($(event.target).is($(this))) toggleCart(true);
        });

        //delete an item from the cart
        cartList.on('click', '.delete-item', function(event) {
            event.preventDefault();
            removeProduct($(event.target).parents('.product'));
        });

        //update item quantity
        cartList.on('change', 'select', function(event) {
            quickUpdateCart();
        });

        //reinsert item deleted from the cart
        undo.on('click', 'a', function(event) {
            clearInterval(undoTimeoutId);
            event.preventDefault();
            cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
                quickUpdateCart();
            });
            for (p in cartData) {
                if (cartData[p].deleted) {
                    cartData[p].deleted = false;
                }
            }
            undo.removeClass('visible');
        });

        cartWrapper.find('.checkout').on('click', function(event) {
            checkout(false);	        
/*
	      if (!App.isAuthenticated) {
			if (window.location.href && window.location.href.includes('/th/') ) {
				window.location.href = "/th/login?_wp_http_referer=/th/checkout" ;
			} else {
				window.location.href = "/login?_wp_http_referer=/checkout" ;
			}
	      } else {
			if (window.location.href && window.location.href.includes('/th/') ) {
				window.location.href = "/th/checkout";
			} else {
				window.location.href = "/checkout";
			}
	      }
          return false;
*/

        });

        cartWrapper.find('.force-checkout').on('click', function(event) {
            checkout(false);
/*
	      if (!App.isAuthenticated) {
	//           SetCookie('wf_checkout_in_progress', true)
	          window.location.href = "/login";
	          return false;
	      } else {
	          window.location.href = "/checkout";
	          return false;
	      }
*/
        });

        cartWrapper.find('.cart-missing .btn-back').click(function () {
            hideMissingProduct();
        });
        
        
        
		// User Registration Links         
        $('.cart-user-signup-link').on('click', function(event) {
            goToUserScreen('signup');
		});        
        $('.cart-user-login-link').on('click', function(event) {
            goToUserScreen('login');
		});
        $('.cart-user-login-email-link').on('click', function(event) {
            goToUserScreen('login-email');
		});
        $('.cart-user-forgot-link').on('click', function(event) {
            goToUserScreen('forgot');
		});
		
		
        
		// User Registration Back Button         
        $('#cart-forgot .btn-back').on('click', function(event) {
            goToUserScreen('login-email');
		});

        $('#cart-login-email .btn-back').on('click', function(event) {
            goToUserScreen('login');
		});
		
		$('#cart-signup .btn-back').on('click', function(event) {
            goToUserScreen('login');
		});        
        
		$('#cart-login .btn-back').on('click', function(event) {
            goToUserScreen();
		});        
		
	
		// input field interactions
		$( ".signup-inputs .field input" ).keyup(function() {
			var inputValue = $( this ).val();
	  	    if (inputValue == '') {
				$( this ).parents('.field').removeClass('notempty');		    
		    } else {
				$( this ).parents('.field').addClass('notempty');
		    }			
		});		
    
		$( ".signup-inputs .field input" ).focus(function() {
			$( this ).parents('.field').removeClass('haserror')
			$( this ).parents('.field').addClass('focused');
		});
		$( ".signup-inputs .field input" ).focusout(function() {
			$( this ).parents('.field').removeClass('focused');		    
		});

		$( ".signup-inputs .field select" ).change(function() {
			$( this ).parents('.field').addClass('notempty');
		});		
		$( ".signup-inputs .field select" ).focus(function() {
			$( this ).parents('.field').removeClass('haserror')
			$( this ).parents('.field').addClass('focused');
		});
		$( ".signup-inputs .field select" ).focusout(function() {
			$( this ).parents('.field').removeClass('focused');		    
		});
// 		$( ".signup-inputs .field .datepicker" ).datepicker();
  
		
				// User Registration Form Sumbission        
        $('#cart-forgot .user-button-form-submit').on('click', function(event) {
	        var inputValue = $( '#userreg-forgot-email-input' ).val();
            if (!isEmail(inputValue)) {
	            $( '#userreg-forgot-email-input' ).parents('.field').addClass('haserror')
	            return false;
            }
            // handle for submit here
            console.log('submit');
            App.forgotPassword();
            
		});

        $('#cart-login-email .user-button-form-submit').on('click', function(event) {
	        var inputValue = $( '#userreg-login-email-input' ).val();
            if (!isEmail(inputValue)) {
	            $( '#userreg-login-email-input' ).parents('.field').addClass('haserror')
	            return false;
            }
            // handle for submit here
            console.log('submit');
            App.signIn();
            
		});
        $('#cart-signup .user-button-form-submit').on('click', function(event) {
	        var inputValue = $( '#userreg-signup-email-input' ).val();
            if (!isEmail(inputValue)) {
	            $( '#userreg-signup-email-input' ).parents('.field').addClass('haserror')
	            return false;
            }
	        var p1 = $( '#userreg-signup-password-input' ).val();

	        var p2 = $( '#userreg-signup-password-confirm-input' ).val();
            if (p1 != p2) {
	            $( '#userreg-signup-password-input' ).parents('.field').addClass('haserror')
	            $( '#userreg-signup-password-confirm-input' ).parents('.field').addClass('haserror')
	            return false;
	            
            }
            
            
            // handle for submit here
            console.log('submit');
            App.signUp();            
		});
 
		window.cartCheckout = checkout;
		window.cartCheckoutNew = checkoutNew;
		window.toggleCart = toggleCart;
		window.addToCart = addToCart;
        
        loadCartFromCookie();
        
    }


    function hasProductType(type) {
        for (p in cartData) {
            if (cartData[p].deleted) continue;
            if (cartData[p].type === type) return true;
        }
        return false;
    }

    function hideMissingProduct() {
// 				alert('hideMissingProduct');

/*
        cartWrapper.find('#cart-missing-ticket, #cart-missing-accommodation').addClass('hidden');
        cartWrapper.find('.cart-data-wrapper').removeClass('hidden');
*/
// 		cartWrapper.find('.recommendation-container.accommodation').addClass('hidden');				

    }

    function showMissingProduct(type) {
		cartWrapper.find('.recommendations').removeClass('hidden');				
		if (type == 'ticket') {
	        cartWrapper.find('#accomodation-recommendations').addClass('hidden');
	        cartWrapper.find('#ticket-recommendations').removeClass('hidden');
		} else {
			
	        cartWrapper.find('#ticket-recommendations').addClass('hidden');
	        cartWrapper.find('#accomodation-recommendations').removeClass('hidden');
		}

/*
        cartWrapper.find('#cart-missing-' + type).removeClass('hidden');
        cartWrapper.find('.cart-data-wrapper').addClass('hidden');
*/
    }

    function goToUserScreen(type) {
	    if (type) {
			cartWrapper.find('.cart-user-registration').addClass('hidden');				
	        cartWrapper.find('.cart-data-wrapper').addClass('hidden');
	        cartWrapper.find('#cart-' + type).removeClass('hidden');
	    } else {
			cartWrapper.find('.cart-user-registration').addClass('hidden');				
	        cartWrapper.find('.cart-data-wrapper').removeClass('hidden');
	    }
    }
    
	function hideRecommendations() {
// 		alert('hideRecommendations');
		cartWrapper.find('.recommendations').addClass('hidden');				
	}

    function checkoutNew(isCheckType) {

/*
      if (!App.isAuthenticated) {
//           SetCookie('wf_checkout_in_progress', true)
          window.location.href = "/login";
          return false;
      } 
*/
  		var request = {
  			cart: cartData,
  			promo_code: getDiscountCode()
  		}

		console.log(JSON.stringify(request));
        
        $('body').addClass('cart-loading');
        App.buyTickets(request, function(response, error) {
	        $('body').removeClass('cart-loading');
	        if (error) {
		        console.log(error);
    	      if (typeof checkoutDidFail === 'function') { 
    	        checkoutDidFail(error);
    	      }
// 		        error_code, error_message
	        } else {
		        console.log(response);
		        console.log('new');

		        if (true && response.data.checkout_url) {
				  	window.location.href = response.data.checkout_url;

			        cartData = {};
			        discountData = {};
			        saveCartToCookie();
			        cartList.find('div.product').remove();
			        discountList.html('');

				}		        
		        if (false && response.data.redirect) {
			        
			        
			        cartData = {};
			        discountData = {};
			        saveCartToCookie();
			        cartList.find('div.product').remove();
			        discountList.html('');
        			        
			        toggleCart();
			        cartWrapper.addClass('empty');
			        $('body').removeClass('cart-has-item-body-class')
        			        
			        $('#wondercart-link').attr('href', response.data.redirect)
			        triggerMouseEvent (document.getElementById('wondercart-link'), "mousedown");
			        window.open($('#wondercart-link').attr('href'), '_blank');
		        }
	        }
	        
        });
        /*
        url += "&promocode=" + getDiscountCode();

        toggleCart();
        cartWrapper.addClass('empty');
        $('body').removeClass('cart-has-item-body-class')

        
        $('#wondercart-link').attr('href', url)
//         alert('a');

        triggerMouseEvent (document.getElementById('wondercart-link'), "mousedown");

        window.open($('#wondercart-link').attr('href'), '_blank');
        */
    }



    function checkoutInline(isCheckType) {
        if (true) {
            goToUserScreen('signup-continued');
            return false;
        } 

        if (!App.isAuthenticated) {
            goToUserScreen('login');
            return false;
        } 
		var request = {
			cart: cartData,
			promo_code: getDiscountCode()
		}

		console.log(JSON.stringify(request));
        
        $('body').addClass('cart-loading');
        App.buyTickets(request, function(response, error) {
	        $('body').removeClass('cart-loading');
	        if (error) {
		        console.log(error);
	        } else {
		        console.log(response);
		        console.log('new');
		        
		        if (false && response.data.redirect) {
			        
			        
			        cartData = {};
			        discountData = {};
			        saveCartToCookie();
			        cartList.find('div.product').remove();
			        discountList.html('');
        			        
			        toggleCart();
			        cartWrapper.addClass('empty');
			        $('body').removeClass('cart-has-item-body-class')
        			        
			        $('#wondercart-link').attr('href', response.data.redirect)
			        triggerMouseEvent (document.getElementById('wondercart-link'), "mousedown");
			        window.open($('#wondercart-link').attr('href'), '_blank');
		        }
	        }
	        
        });
        /*
        url += "&promocode=" + getDiscountCode();

        toggleCart();
        cartWrapper.addClass('empty');
        $('body').removeClass('cart-has-item-body-class')

        
        $('#wondercart-link').attr('href', url)
//         alert('a');

        triggerMouseEvent (document.getElementById('wondercart-link'), "mousedown");

        window.open($('#wondercart-link').attr('href'), '_blank');
        */
    }
    
    function checkout(isCheckType) {
	    
/*
        if (!App.isAuthenticated) {
            goToUserScreen('login');
            return false;
        } 
*/

/*
        var url = 'https://www.eventpop.me/events/1554/orders/new?';
        for (p in cartData) {
            if (!cartData[p].deleted) {
                if (p == 6853) {
                    url += "ticket_types[" + p + "]=8&";
                } else {
                    url += "ticket_types[" + p + "]=" + cartData[p].quantity + "&";
                }
            }
        }
*/
        var url = 'https://www.ticketmelon.com/wonderfruit/wonderfruit2019?';
        var pids= 'ticket_type_id='
        var quantity= 'quantity='
        var count = 0;
        var donation = 0;
        for (p in cartData) {
            if (!cartData[p].deleted && p != 'donationtickettypeid') {
	            if (count > 0) {
	                pids += ',';
	                quantity += ','
	            }
              pids += p;
              if (p == '6f3387147f4711e8922201117567899b') {
                quantity += '10'		            
              } else {
                quantity += cartData[p].quantity		            
              }
              count++;
            }
            if (p == 'donationtickettypeid') {
              donation = cartData[p].price
            }
        }
        if (donation > 0 && count == 0) {
          pids += '881fa8bafad711e9967801117567899b';
          quantity += '1';
          url += pids + "&" + quantity;
          url += "&promocode=" + "WFDONATE";
        } else {
          url += pids + "&" + quantity;
          url += "&promocode=" + getDiscountCode();
        }
        if (donation > 0) {
          url += "&donation=" + donation;
        }

        cartData = {};
        discountData = {};
        saveCartToCookie();
        cartList.find('div.product').remove();
        discountList.html('');

        toggleCart();
        cartWrapper.addClass('empty');
        $('body').removeClass('cart-has-item-body-class')
        
/*
        ga('linker:decorate', url);
        alert(url)
        
        ga(function(tracker) {
            alert(1)
            var linkerParam = tracker.get('linkerParam');
            alert(linkerParam)
           a.href = url
           a.click 
        });
*/
        
        console.log(url);
        $('#wondercart-link').attr('href', url)
        triggerMouseEvent (document.getElementById('wondercart-link'), "mousedown");
        window.open($('#wondercart-link').attr('href'), '_blank');
    }

    function triggerMouseEvent (node, eventType) {
        var clickEvent = document.createEvent ('MouseEvents');
        clickEvent.initEvent (eventType, true, true);
        node.dispatchEvent (clickEvent);
    }
    function toggleCart(bool) {
        var cartIsOpen = (typeof bool === 'undefined') ? cartWrapper.hasClass('cart-open') : bool;

        if (cartIsOpen) {
            cartWrapper.removeClass('cart-open');
            $('body').removeClass('cart-open-body-class')
            //reset undo
            clearInterval(undoTimeoutId);
            undo.removeClass('visible');
            deleteProduct();

            setTimeout(function() {
                cartBody.scrollTop(0);
                //check if cart empty to hide it
                if (Number(cartCount.text()) == 0) {
	                 cartWrapper.addClass('empty');
					 $('body').removeClass('cart-has-item-body-class');                 
	            }
            }, 500);
        } else {
            cartWrapper.addClass('cart-open');
            $('body').addClass('cart-open-body-class')
			
			$('.recommendation-slideshow').slick('setPosition');            
        }
    }

    function addToCart(trigger) {
        var cartIsEmpty = cartWrapper.hasClass('empty');
        //update cart product list
        var qty = 1;
        var selectId = trigger.data('quantity-select');
        if (selectId) {
			if (document.getElementById(selectId)) {
				qty = parseInt(document.getElementById(selectId).value);			
				
			}
        }
        addProduct(trigger.data('product-id'), trigger.data('product-name'), trigger.data('price'), trigger.data('product-type'), qty);
        //update number of items
        updateCartCount(cartIsEmpty);
        //update total price
        updateCartTotal(trigger.data('price'), true);
        //show cart
        cartWrapper.removeClass('empty');
        $('body').addClass('cart-has-item-body-class')
        
    }

    function addProduct(productId, name, price, type, qty, is_init) {
        var currency = 'THB';
        //this is just a product placeholder
        //you should insert an item with the selected product info
        //replace productId, productName, price and url with your real product info

        if (productId) {

            var productAdded = get_cart_item_html(productId, name, currency, numberWithCommas(price));

            if (is_init) {

                cartList.prepend(productAdded);
            } else {
	            
                if (cartData[productId] && !cartData[productId].deleted) {
	                // party pass
	                if (productId == '6f3387147f4711e8922201117567899b') {
	                    if ((cartData[productId].quantity + qty) <= 1) {
	                        cartData[productId].quantity = cartData[productId].quantity + qty;
	                    }
	                }
                  if ((cartData[productId].quantity + qty) <= 10) {
                      cartData[productId].quantity = cartData[productId].quantity + qty;
                  }
	                if (productId == 'donationtickettypeid') {
                      cartData[productId].quantity = 1;
                      cartData[productId].price = price;
                      $('#cd-product-price-donationtickettypeid span').html(numberWithCommas(price))
	                }

                } else {
                    cartData[productId] = {
                        name: name,
                        price: price,
                        quantity: qty,
                        type: type
                    };
                    cartList.prepend(productAdded);

                }
            }
            $('#cd-product-' + productId).val(cartData[productId].quantity.toString());

            quickUpdateCart();
        }
    }

    function removeProduct(product) {
        productId = product.data('product-id');
        clearInterval(undoTimeoutId);
        deleteProduct();

        var topPosition = product.offset().top - cartBody.children('.cart-top').offset().top,
            productQuantity = Number(product.find('.quantity').find('select').val()),
            productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;

//         product.css('top', topPosition + 'px').addClass('deleted');
        product.addClass('deleted');

        cartData[productId].deleted = true;
        //update items count + total price
        updateCartTotal(productTotPrice, false);
        updateCartCount(true, -productQuantity);
        undo.addClass('visible');

        //wait 8sec before completely remove the item
        undoTimeoutId = setTimeout(function() {
            undo.removeClass('visible');
            deleteProduct();
        }, 8000);
    }

    function deleteProduct() {
        cartList.find('.deleted').remove();
        for (p in cartData) {
            if (cartData[p].deleted) {
                delete cartData[p];
            }
        }
    }

    function quickUpdateCart() {
        var quantity = 0;
        var price = 0;

        cartList.children('div.product:not(.deleted)').each(function() {
            var singleQuantity = Number($(this).find('select').val());
            quantity += singleQuantity;
            var p = $(this).data('product-id');
            cartData[p].quantity = Number($(this).find('select').val());

            var subtotal = cartData[p].quantity * cartData[p].price;
            $(this).find('.price').html('' + subtotal  + "");
        });

        updateCartTotal();
        cartCount.text(quantity);
        cartCountShadow.text(quantity)
        
        if (!hasProductType('ticket')) {
            showMissingProduct('ticket');
        } else if (!hasProductType('accommodation')) {
            showMissingProduct('accommodation');
        } else {
	        hideRecommendations();
        }
// 	        hideRecommendations();

    }

    function updateCartCount(emptyCart, quantity) {
        var count = 0;
        for (p in cartData) {
            if (!cartData[p].deleted) {
                count += cartData[p].quantity;
            }
        }

        cartCount.text(count);
        cartCountShadow.text(count);
//         cartCount.find('li').eq(1).text(count + 1);
    }

    function updateCartTotal() {
        var ct = 0;
        for (p in cartData) {
            var item = cartData[p];
            if (!item.deleted) {
                ct += item.quantity * item.price;
            }
        }

        var totalDiscount = getDiscountPrice(getDiscountCode());
        $('.wrapper-discount .discount-codes .discount .discount-value').text("- THB " + numberWithCommas(totalDiscount) + "");
		if (totalDiscount > 0) {
			cartTotalBeforeDiscount.show();			
			cartTotalBeforeDiscountTHB.show();			
			cartTotalBeforeDiscount.text('' + numberWithCommas(Number(ct).toFixed(0)) + "");
		} else {
			cartTotalBeforeDiscount.hide();			
			cartTotalBeforeDiscountTHB.hide();			
		}
		cartTotal.text(numberWithCommas(Number(ct - totalDiscount).toFixed(0)) + "");

        saveCartToCookie();
    }

	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
    function saveCartToCookie() {
        if (cartData) {
            DeleteCookie('wf_cart')
            SetCookie('wf_cart', JSON.stringify(cartData), exp)
        }
        if (discountData) {
            DeleteCookie('wf_cart_discount')
            SetCookie('wf_cart_discount', JSON.stringify(discountData), exp)
        }
    }

    function loadCartFromCookie() {
        var c = GetCookie('wf_cart');
        var d = GetCookie('wf_cart_discount');

        if (d != null) {
            discountData = JSON.parse(d);
            for (discount in discountData) {
                var discountHtml = getDiscountHtmlBlock(discount, 0);
                discountList.prepend(discountHtml);
            }
            var p = getDiscountCode();
			if (p.length > 0) {
	            addDiscount(p);
				$('.promo-code-toggle').click();
				document.getElementById("discount-input").value = p;
			}
			

        }

        if (c != null) {
            cartData = JSON.parse(c);
            if (cartData) {
                var count = 0;
                for (p in cartData) {
                    var item = cartData[p];
                    if (!item.deleted) {
                        addProduct(p, item.name, item.price, item.type, item.quantity, true);
                        count++;
                    }
                }
                if (count > 0) {
                    updateCartCount();
                    //update total price
                    updateCartTotal();
                    //show cart
                    cartWrapper.removeClass('empty');
					$('body').addClass('cart-has-item-body-class')
                    
                }
            }
        }
    }

    function getDiscountCode() {
      return $('.wrapper-discount .discount-codes .discount .discount-code').text();
    }

    function addDiscount(discount) {
        deleteDiscount();

        $.ajax({
            url: "https://api.ticketmelon.com/v1/s1/events/2464d82501bf11e9990801117567899b/promo/" + discount.toUpperCase(),
            dataType: "json",
            method: "GET"
        })
        .done(function(data) {
            discountData[discount] = formatDiscountData(data);

            var discountPrice = getDiscountPrice(discount);
			console.log('->' + discountPrice)
            if (discountPrice == 0) {
                deleteDiscount();
                saveCartToCookie();
//                 displayDiscountError("Invalid coupon code '" + discount + "'");
                displayDiscountError(getInvalidPromoText(), true);
				updateCartTotal();                
                return;
            }
			// Add alert styling here
            displayDiscountError(getPromoSuccessText(numberWithCommas(discountPrice)));
            var discountHtml = getDiscountHtmlBlock(discount, discountPrice);
            discountList.prepend(discountHtml);
//             $('#discount-input').val('');
            
            updateCartTotal();
            saveCartToCookie();
            $('.discount-header-title').click();
        })
        .fail(function(data) {
        })
        .always(function(data) {
        });
    }

    function displayDiscountError(message, isError) {
	    if (isError) {
			cartWrapper.addClass('show-error-state');
	    } else {
			cartWrapper.removeClass('show-error-state');		    
	    }
        cartBody.find('.discount-error').text(message);
    }

    function formatDiscountData(data) {
        var formatted = {};
        /*
        for (var index in data.ticket_types) {
            var ticket = data.ticket_types[index];
            if (ticket.discounted_price) {
                formatted[ticket["id"]] = ticket;
            }
        }
		*/
		var date = new Date(); 
		var timestamp = date.getTime();		
		var discounts = data['message']['Items'];
        for (var i=0; i<discounts.length; i++) {
			for (var j=0; j < discounts[i].ticket_type_id.length; j++) {
				console.log(discounts[i].end);
				console.log(timestamp)
				console.log(discounts[i].end > timestamp)

				if (discounts[i].is_active && (discounts[i].end > timestamp)) {
					formatted[discounts[i].ticket_type_id[j]] = discounts[i];
				}
			}

		}
        return formatted;
    }

    function getDiscountPrice(discountCode) {
        var discounts = discountData[discountCode];
        var totalDiscount = 0;
        if (!discounts) return totalDiscount;
        for (productId in cartData) {
            var item = cartData[productId];
            if (item.deleted) continue;
			console.log(JSON.stringify(item))
            var discount = discounts[productId];
            if (!discount) continue;

            var price = item.price;
            var discountedPrice = price;
            if (discount.percent > 0) {
	            discountedPrice = price - (price * discount.percent / 100);
            }
            if (discount.fixed > 0) {
	            discountedPrice = price - discount.fixed;
            }
/*
            var discountedPrice = parsePrice(discount.discounted_price);
            if (discount.discounted_price == 'Free') {
                discountedPrice = 0;
            }
*/

            var quantity = item.quantity;
            totalDiscount += (price - discountedPrice) * quantity;
        }

        return totalDiscount;
    }

    function parsePrice(value) {
        return Number(value.substring(1).replace(',', ''));
    }

    function getDiscountHtmlBlock(code, price) {
        return "<div class='discount color-red1'><span class='discount-code'>"+code+"</span><span class='discount-value'>- THB " + price + "</span></div>";
    }

    function deleteDiscount() {
        discountList.html('');
        discountData = {};
    }
    showCart = function() {
	    toggleCart();
    }
});

// Cookie Code
var expDays = 1; // number of days the cookie should last

function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function SetCookie(name, value) {
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        //     ((path == null) ? "" : ("; path=" + path)) +
        ("; path=/") +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
}

function DeleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

var exp = new Date();
exp.setTime(exp.getTime() + (expDays * 24 * 60 * 60 * 1000));

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
