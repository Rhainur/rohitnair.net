/* Author:
Rohit Nair
*/
var arrowTimer = null;
var arrowLeftDefault = 0;

$(document).ready( function(){
	$('.content-section').addClass('hidden').first().removeClass('hidden');
	$('.outer-container').css('min-height', $(window).height()-130);
	arrowLeft = ($('.top-navigation').width()/2)-18;
	if($(window).width() > 480){
		restoreArrow(false);
		$('.arrow-down').show();
	}

	$('.top-navigation a').hover(
		function(){
			window.clearTimeout(arrowTimer);
			shiftArrowBelow(this);
		},
		function(){
			arrowTimer = window.setTimeout(function(){
				restoreArrow(true);
			}, 1000);
		}
	);

	$('header a').click(
		function(){
			if($(this).attr('href')=='#home'){
				arrowLeft = ($('.top-navigation').width()/2)-18;
				ga('send', 'pageview', '/');
			}else{
				arrowLeft = shiftArrowBelow(this);
				ga('send', 'pageview', '/' + encodeURIComponent($(this).attr('href').substring(1)));
			}

			if($('.current-section').attr('id')==$(this).attr('href').substring(1))
				return;

			var target = $($(this).attr('href'));

			$('.current-section').removeClass('current-section').slideUp('slow', function(){
				$(target).slideDown('slow').addClass('current-section');
			});
		}
	);

	if(window.location.hash.length > 0){
		$('a[href="'+window.location.hash+'"]').click();
		restoreArrow(false);
	}
});

$(window).resize(function(){
	if(window.location.hash.length > 0){
		$('a[href="'+window.location.hash+'"]').click();
	}else{
		arrowLeft = ($('.top-navigation').width()/2)-18;
	}
	restoreArrow(false);
	if($(window).width() > 480){
		$('.arrow-down').show();
	}
	$('.outer-container').css('min-height', $(window).height()-130);
});

function restoreArrow(animate){
	if(animate === true)
		$('.arrow-down').stop(true).animate({left: arrowLeft},500);
	else
		$('.arrow-down').stop(true).css({left: arrowLeft});
}

function shiftArrowBelow(element){
	var p = $(element).parent().position();
	var parentP = $(element).parent().parent().position();
	var newLeft = p.left-parentP.left+($(element).width()/2)-20;
	$('.arrow-down').stop(true).animate({'left': newLeft});
	return newLeft;
}