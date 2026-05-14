$(document).ready(function(){
    //ìë¨ ë©ë´
    $('.nav .nav_open').click(function(){
		$('div.menu_open').show();
		$('a.nav_close').css('display', 'inline-block');
		$('a.nav_open').css('display', 'none');
	});
	$('a.nav_close').click(function(){
		$('div.menu_open').hide();
		$('a.nav_close').css('display', 'none');
		$('a.nav_open').css('display', 'inline-block');
	});
    $('.dropbtn').mouseover(function(){
        $(this).find('div.dropdown-content').show();
        $('div.menu_open').hide();
        $('a.nav_close').css('display', 'none');
		$('a.nav_open').css('display', 'inline-block');
    });
    $('.dropbtn').mouseout(function(){
        $(this).find('div.dropdown-content').hide();
    });
    
    //ìë¸ ë©ë´
	/*
    $('.depth1 p').click(function(){
		$('.depth1_open').show();
		$('.ico_close').css('display', 'inline-block');
	});	
	$('.depth1_open').on("click", "li.on", function(){		
		$('.depth1_open').hide();
	});
	*/
    $('.depth2 p').click(function(){
		$('.depth2_open').show();
	});
	$('.depth2_open').on("click", "li.on", function(){		
		$('.depth2_open').hide();
	});

    //selectbox
	var select = $('.select-script select');
	select.change(function(){
		var select_name = $(this).children('option:selected').text();
		$(this).siblings("label").text(select_name);
	});
	var location = $('.select-depth select');
	location.change(function(){
		var select_name = $(this).children('option:selected').text();
		$(this).siblings("label").text(select_name);
	});
	var depth = $("#depth_selectbox option:selected").text();
	$('.depth_label').text(depth);
    
    //footer
    $('.fs_wrap').click(function(){
		$(this).css('display','none');
		$('.fs_wrap_down').css('display','block');
		$('ul.fs_list').stop().slideDown('fast'); 
	});
	$('.fs_wrap_down').click(function(){
		$(this).css('display','none');
		$('.fs_wrap').css('display','block');
		$('ul.fs_list').css('display','none');
	});
	$('.fs_list li.close a').click(function(){
		$('.fs_wrap_down').css('display','none');
		$('.fs_wrap').css('display','block');
		$('ul.fs_list').css('display','none');
	});
    
    //ëììì¸ê²ì
    $('.bookfind .detail_open').click(function(){
		$(this).css('display','none');
		$('.detail_close').css('display', 'inline-block');
		$('div.detail_con').stop().slideDown('fast'); 
	});
    $('.bookfind .detail_close').click(function(){
		$(this).css('display','none');
		$('.detail_open').css('display', 'inline-block');
		$('div.detail_con').stop().slideUp('fast'); 
	});
    
    //ìë¨ê²ìë²í¼
    $('.find .btn_findopen').click(function(){
		$('.find_wrap').show();
		$('a.btn_findclose').css('display', 'inline-block');
		$('#HEAD_SCH_TEXT').focus();
		/*$('a.btn_findopen').css('display', 'none');*/
	});
	$('a.btn_findclose').click(function(){
		$('.find_wrap').hide();
		$('a.btn_findclose').css('display', 'none');
		/*$('a.btn_findopen').css('display', 'inline-block');*/
	});
 
});
