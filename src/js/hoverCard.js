/*
 *  Hover Card - v0.2.2
 *  Made by Sahil Prajapati
 */
(function( $ ) {
 
    $.fn.hoverCards = function(options) {
 
        var settings = $.extend({}, $.fn.hoverCards.defaults, options );
        var card;
        var showCard = false;
        var hCard = $('<div/>');
        var request;
        this.addClass('hover-activated');

    	$('.hover-activated').stop(true, true).hover(function(){
    		card = $(this);
    		timeout = setTimeout(function(){
            showCard = true;
            if(showCard === true){
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
		 	}
		 },settings.delay);
	 	},
	    function(){
	    	//else don't show and clearout timer
            clearTimeout(timeout);
            showCard = false;
	    	card.find('.hoverParent').fadeOut(settings.fadeOut).find('.hoverCard').hide();
	    });


	    function getData(url, id){
			
			request = $.ajax({
		        url: url+id,
		        method: 'get',
		        dataType: 'json',
		        beforeSend: function(data){
		        	hCard.addClass('hoverParent').css('left','-7px').fadeIn(settings.fadeIn);//.append('<div class="hoverCard in-block">Loading..</div>');
		        	card.css('position','relative').append(hCard);
		        },
		        success: function(data){
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
	        data += '<p class="small role text-muted">'+user.role+'</p>';
	        if (user.hasOwnProperty("about")){
	        	if(user.about.length > 140 ){
	        		data += '<p class="about small">'+user.about.substring(0,140)+'..</p></div></div>';
	        	}
	        	else{
	        		data += '<p class="about small">'+user.about.substring(0,140)+'</p></div></div>';
	        	}

	    	}
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
	    	var left = card.offset().left;
	    	var page_width = $(window).width();
	    	if(elem_height-page_height > 250){
	    		//top-left
	    		if(page_width - left < 335){
		    		hCard.css({'top':'-20px','height': '40px','display':'block','left':'-209px'}).find('.hoverCard').css({'bottom':'30px','top':'none','display':'block'});
		    		hCard.find('.arrow-down').show().css('left','240px');
		    		hCard.find('.arrow-up').hide().css('left','none');
	    		}//top-right
	    		else{
	    			hCard.css({'top':'-20px','height': '40px','display':'block','left':'none'}).find('.hoverCard').css({'bottom':'30px','top':'none','display':'block'});
		    		hCard.find('.arrow-down').show().css('left','32px');
		    		hCard.find('.arrow-up').hide().css('left','32px');
	    		}
	    	}
	    	else{
	    		if(page_width - left < 335){//bottom-left
		    		hCard.css({'top':'3px','height': '120px','display':'block','left':'-209px'}).find('.hoverCard').css({'top':'24px','bottom':'none','display':'block'});
		    		hCard.find('.arrow-up').show().css('left','240px');
		    		hCard.find('.arrow-down').hide().css('left','240px');
	    		}
	    		else{//bottom-right
	    			hCard.css({'top':'3px','height': '120px','display':'block','left':'none'}).find('.hoverCard').css({'top':'24px','bottom':'none','display':'block'});
		    		hCard.find('.arrow-up').show().css('left','32px');
		    		hCard.find('.arrow-down').hide().css('left','32px');
	    		}
	    	}
	    }
        return this;
 
    };
 
	$.fn.hoverCards.defaults = {
		"url":null,
		"fadeIn": 800,
		"fadeOut":400,
		"backgroundColor":'#ddd',
		"delay": 1300
	};

}( jQuery ));
