/*
 *  Hover Card - v0.0.1
 *  Made by Sahil Prajapati
 */
(function( $ ) {
 
    $.fn.hoverCards = function(options) {
 
        var settings = $.extend({}, $.fn.hoverCards.defaults, options );
        var card;
        var hCard = $('<div/>');
        var request;

    	this.hover(function(){
    		card = $(this);
	      	var dev_id = card.attr('data-dev-id');
	    	if(card.find('.hoverParent').length == 0){
	    		if (request != undefined){
	    			request.abort();
	    		}
		 		getData(settings.url, dev_id);
		 	}
		 	else{
		 		hCard = card.find('.hoverParent');
		 		var page_height = $(window).scrollTop();
	    		var elem_height = card.offset().top;
		 		positionCard(page_height, elem_height);	
	 		}
	 	},
	    function(){
	    	card.find('.hoverParent').fadeOut(settings.fadeOut).find('.hoverCard').hide();
	    });


	    function getData(url, id){
			
			request = $.ajax({
		        url: url+id,
		        method: 'get',
		        dataType: 'json',
		        beforeSend: function(data){
		        	hCard.addClass('hoverParent').fadeIn(settings.fadeIn).append('<div class="hoverCard">Loading..</div>');
		        	card.css('position','relative').append(hCard);
		        },
		        success: function(data){
		        	console.log(data);
		        	var user = data;

		          //calling hover plugin
		          createCard(user);
		        },
		        error:function(){

		        }
		      });
	    	
	    }

	    function createCard(user){
	        var data = '<div class="hoverCard"><div class="arrow-up"></div><div class="userPic" style="background-color:'+settings.backgroundColor+'"><div class="picContainer"><img src="'+user.pic+'"></div>';
	        data += '<div class="userDetail"><span class="name"><strong>'+user.name+'</strong></span>';
	        data += '<p class="small role text-muted">'+user.role+'</p><p class="about small">'+user.about+'</p></div></div>';
        	data += '<div class="userStats"><div><strong>'+user.solved+'</strong><p>Problems Solved</p></div>';
        	data += '<div><strong>'+user.followers+'</strong><p>Followers</p></div>';
        	data += '<div><strong>'+user.following+'</strong><p>Following</p></div></div><div class="arrow-down"></div></div>';
        	attachCard(data);	        
	    }

	    function attachCard(data){
	    	var page_height = $(window).scrollTop();
	    	var elem_height = card.offset().top;
	    	hCard.html(data);
	    	positionCard(page_height, elem_height);
	    	
	    }

	    function positionCard(page_height, elem_height){
	    	if(elem_height-page_height > 250){
	    		hCard.css({'top':'-20px','height': '40px','display':'block'}).find('.hoverCard').css({'bottom':'30px','top':'none','display':'block'});
	    		hCard.find('.arrow-down').show();
	    		hCard.find('.arrow-up').hide();
	    	}
	    	else{
	    		hCard.css({'top':'3px','height': '120px','display':'block'}).find('.hoverCard').css({'top':'24px','bottom':'none','display':'block'});
	    		hCard.find('.arrow-up').show();
	    		hCard.find('.arrow-down').hide();
	    	}
	    }
        return this;
 
    };
 
	$.fn.hoverCards.defaults = {
		"url":null,
		"fadeIn": 800,
		"fadeOut":400,
		"backgroundColor":'#ddd'
	};

}( jQuery ));
