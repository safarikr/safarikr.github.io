
$(document).ready(function() {
	// ê²ìíí°, ëìë°°ë ì´ê¸°í
	$("#FILTER_AGECODE li, #FILTER_CATE li, .sorting button").removeClass("on");
	$("#FILTER_AGECODE li:first-child, #FILTER_CATE li:first-child, .sorting button:first").addClass("on");			
	$("input[name='FILTER_CATE']").prop("checked", false).closest("div").removeClass("ez-checked");	
	$(".find_option, .find_tit, .curation_sub_tit").hide();
	$(".find_filter, .find_filter2, .setbook_banner").show();	
	
	// ì¸ì íì¤í ë¦¬ ì ì¥ë ë´ì© ëë ì ê· ëª©ë¡ ì·¨ë
	PAGING.fnRestoreHistoryState();	
	
	// ì²´í¬ë°ì¤
	$('.content input').ezMark();	
	
	// ë§ì¤ì
	$('.ellipsis').ellipsis();

	// ê²ìì´ ìí°í¤ ì²ë¦¬	
	$('#FIND_SCH_TEXT').keypress(function(e){
		if (e.keyCode == 13) {
			e.preventDefault();
			PAGING.fnSearchList();
		}
	});		
	
	// ìì¸ê²ì ì í	
	$("input[name='FIND_CATE']").click(function(){	 	// ë¶ì¼
		PAGING.fnChkFind(this, "CATE");			
	});			
	$("input[name='FIND_AGECODE']").click(function(){	// ì°ë ¹
		PAGING.fnChkFind(this, "AGECODE");
	});		
	$("input[name='FIND_AWARD']").click(function(){		// ìì ë° ì ì  ëì êµ¬ë¶ 
		PAGING.fnChkFind(this, "AWARD");						
	});
	
	// ê²ìíí° ì í
	$("input[name='FILTER_CATE']").click(function(){	// ë¶ì¼
		PAGING.fnChkFilter(this, "CATE", "checkbox");						
	});		
	$("#FILTER_CATE li").click(function(){				// ë¶ì¼ (ìë¦¬ì¦ëì) 
		PAGING.fnChkFilter(this, "CATE", "li");			
	});			
	$("#FILTER_AGECODE li").click(function(){			// ì°ë ¹
		PAGING.fnChkFilter(this, "AGECODE", "li");			
	});
	$("input[name='FILTER_SERIES']").click(function(){	// ìë¦¬ì¦ 20201014 ì¶ê°
		PAGING.fnChkFilter(this, "SERIES", "checkbox");						
	});	
			
	// ì ë ¬ ìì ì í
	$(".sorting button").click(function(){			
		PAGING.fnSelSort(this);
	});		
});	 

// íì´ì§
var PAGING = {	
		// ì¸ì íì¤í ë¦¬ ì¬ì© ì¬ë¶	
		bUseHistory: true,	 	
		
		// ì¸ì íì¤í ë¦¬ ì ì¥ë ë´ì© ëë ì ê· ëª©ë¡ ì·¨ë
		fnRestoreHistoryState: function() {
			var obj = window.history.state;
			var bRestore = false;			
				
			if (typeof obj === "undefined") { // ì¸ì íì¤í ë¦¬ ì§ìì¬ë¶ íì¸
				PAGING.bUseHistory = false;				
			} 
			else {
				if (obj != null) {					
					if (obj.restore) { // "ë¤ë¡ê°ê¸°"ë¡ íì´ì§ ì ê·¼í ê²½ì° ì¸ì íì¤í ë¦¬ì ì ì¥ë ë´ì© ì·¨ë	
						bRestore = true;
						
						$("#divList").empty();
						$("#divLoad").empty();
						
						$("#PG").val(obj.page);
						$("#divList").append(obj.list);							 
						$("#divLoad").append(obj.more);
						
						var arrEtc = obj.etc.split('||');
						for (var i in arrEtc){							
							var arrSubEtc = arrEtc[i].split(':');
							$("#"+arrSubEtc[0]).val(arrSubEtc[1]);							
						}

						$("#"+arrSubEtc[0]).val(arrSubEtc[1]);						
						PAGING.fnSetValueRestore();						
					} 					
				}
				
				PAGING.fnSaveHistoryState(false, $("#PG").val());	// ì¸ì íì¤í ë¦¬ ì´ê¸°í
			}
			
			if (!bRestore) {
				PAGING.fnPageAct(); 
			}
		}, 	
				
		// ì¸ì íì¤í ë¦¬ ì ì¥
		fnSaveHistoryState: function() {		
			var bRestore = arguments[0];
			var nPage = arguments[1]; 
			var sList = arguments[2];	
			var sMore = arguments[3];	
			var sEtc = arguments[4];	
			
			if (!PAGING.bUseHistory) { return false; }	
			if (typeof bRestore !== "boolean") { bRestore = false; }			
			if (!$.isNumeric(nPage)) { nPage = 1; }			
			if (typeof sList !== "string") { sList = ""; }			
			if (typeof sMore !== "string") { sMore = ""; }
			if (typeof sEtc !== "string") { sEtc = ""; }
			
			var data = {restore:bRestore, page:nPage, list:sList, more:sMore, etc:sEtc};
			
			window.history.replaceState(data, "list", window.location.href);	
		}, 		
		
		// ëª©ë¡ ì·¨ë
		fnList: function() {
			var sSendUrl = $("#LISTURL").val();		
			var sSendData = $("#frmList").serializeArray();			
			var nPage = parseInt($("#PG").val());
			var nNextPage = nPage + 1;
			var sHtml = "";
			
			if (nPage == 1) { $("#divList").empty(); }			
			
			sHtml = "<div style=\"text-align:center;margin:20px 0\"><img src=\"/img/bx_loader.gif\" width=\"32\" height=\"32\" /></div>";			
			$("#divLoad").html(sHtml);
		 				
			$.ajax({
				type : "post", url : sSendUrl, data : sSendData, dataType : "text", cache : false,
				success : function(result) {						
						$("#divList").append(result);			
						$("#divList li.actResult:hidden").fadeIn();						
						$("#divLoad").empty();
						
						if (nNextPage <= parseInt($("#TOTPAGE").val())) {	
							sHtml = "<div id=\"load_more\" class=\"btn_wrap\"><a href=\"javascript:;\" class=\"button\" onclick=\"PAGING.fnPageAct("+ nNextPage +")\">ëë³´ê¸°</a></div>";							
							$("#divLoad").html(sHtml);
						}
						
						if (nPage == 1) { PAGING.fnSetValueTitle(); }
						
						$('.ellipsis').ellipsis();		
					}
			});		
		}, 		
		
		// íì´ì§ ì´ë	
		fnPageAct: function() {
			var nPageNo = arguments[0];
			
			if (!$.isNumeric(nPageNo)) { nPageNo = 1; }				
			$("#PG").val(nPageNo);
			
			PAGING.fnList();
		}, 			
				
		// ìì¸íë©´ ì´ë
		fnView: function() { 
			var sVal1 = arguments[0];
			var sVal2 = arguments[1];
			var sVal3 = arguments[2];
			var sUrl = "";
			var sEtc = "";
			
			switch (sVal1.toLowerCase()) {
				case "book" 	:	sUrl = "/book/list_detail.asp?bookcode="+sVal2; 
									sEtc = "SORTNO:"+ $("#SORTNO").val() +"||CATE:"+ $("#CATE").val() +"||AGECODE:"+ $("#AGECODE").val() +"||SCH_TEXT:"+ $("#SCH_TEXT").val() +"||SCH_ADD_TEXT:"+ $("#SCH_ADD_TEXT").val() +"||FIND_GROUP:"+ $("#FIND_GROUP").val() +"||FIND_REFIND:"+ $("#FIND_REFIND").val() +"||DOWNLOAD_DIV:"+ $("#DOWNLOAD_DIV").val() +"||SERIES:"+ $("#SERIES").val(); 
									break;
									
				case "series" 	:	sUrl = "/book/series_detail.asp?scode="+sVal2; 
									sEtc = "CATE:"+ $("#CATE").val() +"||DOWNLOAD_DIV:"+ $("#DOWNLOAD_DIV").val()+"||SERIES:"+ $("#SERIES").val(); 
									break;	
									
				case "award" 	:	sUrl = "/book/list_detail.asp?bookcode="+sVal2; 
									sEtc = "SORTNO:"+ $("#SORTNO").val() +"||AWARD:"+ $("#AWARD").val()+"||FIND_GROUP:"+ $("#FIND_GROUP").val();
									break;
				
				case "soundpen" :	sUrl = "/book/list_detail.asp?bookcode="+sVal2; 
									sEtc = "SORTNO:"+ $("#SORTNO").val() +"||CATE:"+ $("#CATE").val() +"||AGECODE:"+ $("#AGECODE").val() +"||SCH_TEXT:"+ $("#SCH_TEXT").val() +"||FIND_GROUP:"+ $("#FIND_GROUP").val(); 
									break;
	
				case "curation" :	sUrl = "/book/list_detail.asp?bookcode="+sVal2; 
									sEtc = "AGECODE:"+ $("#AGECODE").val() +"||CATE:"+ $("#CATE").val() +"||THEME_CODES:"+ $("#THEME_CODES").val();
									break;
									
				case "event" 	:	sUrl = "/community/event_detail.asp?seq="+sVal2;
									break;	
									
				case "review" 	:	sUrl = "/community/review_detail.asp?seq="+sVal2; 
									sEtc = "SCH_TEXT:"+ $("#SCH_TEXT").val();
									break;
									
				case "notice" 	:	sUrl = "/customer/notice_detail.asp?seq="+sVal2;					
									sEtc = "SCH_TEXT:"+ $("#SCH_TEXT").val();
									break;
									
				case "myreview" :	sUrl = "/mypage/myreview_detail.asp?seq="+sVal2; 									
									break;						
									
				default 		: 	sUrl = "/"; 
									break;
			}
			
			PAGING.fnSaveHistoryState(true, $("#PG").val(), $("#divList").html(), $("#divLoad").html(), sEtc);
			
			location.href = sUrl;
		},
		
		// ì¸ì íì¤í ë¦¬ì ì ì¥ë ë´ì© ì·¨ë í ê° ì¤ì  
		fnSetValueRestore :  function() {			 
			if ( $("#FIND_GROUP").val() == "Y" ){  // ìì¸ê²ì ìì­ ì¬ì©ì¬ë¶ íì¸
				$("input[name^='FIND_']").prop("checked", false).closest("div").removeClass("ez-checked");								
				$("input[name='FIND_CATE']").each(function() {	
					var arrCate = $("#CATE").val().split(',');
					for (var i in arrCate){							
						if ($(this).val() !="" && $(this).val() == arrCate[i]) {
							//$(this).prop("checked", true).closest("div").addClass("ez-checked");
							$(this).prop("checked", true).parent("div.ez-checkbox").addClass("ez-checked");
						}
					}
				});					
				$("input[name='FIND_AGECODE']").each(function() {	
					var arrAgecode = $("#AGECODE").val().split(',');
					for (var i in arrAgecode){
						if ($(this).val() !="" && $(this).val() == arrAgecode[i]) {					
							//$(this).prop("checked", true).closest("div").addClass("ez-checked");
							$(this).prop("checked", true).parent("div.ez-checkbox").addClass("ez-checked");							
						}
					}
				});					
				$("input[name='FIND_AWARD']").each(function() {	
					var arrAward = $("#AWARD").val().split(',');
					for (var i in arrAward){							
						if ($(this).val() !="" &&  $(this).val() == arrAward[i]) {					
							//$(this).prop("checked", true).closest("div").addClass("ez-checked");
							$(this).prop("checked", true).parent("div.ez-checkbox").addClass("ez-checked");							
						}
					}
				});					
			}			
			else {				
				$("#FILTER_CATE li, #FILTER_AGECODE li").removeClass("on");				
				$("#FILTER_CATE li").each(function() {						
					if ($(this).attr("data-cate") == $("#CATE").val()) {
						$(this).addClass("on");
					}
				});	
				$("#FILTER_AGECODE li").each(function() {						
					if ($(this).attr("data-agecode") == $("#AGECODE").val()) {
						$(this).addClass("on");
					}
				});				
				
				$("input[name='FILTER_CATE']").prop("checked", false).closest("div").removeClass("ez-checked");
				$("input[name='FILTER_CATE']").each(function() {	
					var arrCate = $("#CATE").val().split(',');
					for (var i in arrCate){							
						if ($(this).val() == arrCate[i]) {
							//$(this).prop("checked", true).closest("div").addClass("ez-checked");
							$(this).prop("checked", true).parent("div.ez-checkbox").addClass("ez-checked");
						}
					}
				});
				
				// ìë¦¬ì¦ 20201014 ì¶ê°
				$("input[name='FILTER_SERIES']").prop("checked", false).closest("div").removeClass("ez-checked");
				$("input[name='FILTER_SERIES']").each(function() {	
					var arrSeriesCode = $("#SERIES").val().split(',');
					for (var i in arrSeriesCode){							
						if ($(this).val() == arrSeriesCode[i]) {							
							$(this).prop("checked", true).parent("div.ez-checkbox").addClass("ez-checked");
						}
					}
				});								
			}			

			// ëì ì ë ¬
			$(".sorting button").removeClass("on");
			$(".sorting button").each(function() {
				if ($(this).attr("data-sortno") == $("#SORTNO").val() ) {
					$(this).addClass("on");
				}
			});
			
			// ìì¸ê²ì ìì­ ì íìµì
			if ($("input[name='FIND_AGECODE']:checked").length > 0 || $("input[name='FIND_CATE']:checked").length > 0 || $("input[name='FIND_AWARD']:checked").length > 0) {								
				PAGING.fnOptAdd();	 // ìì¸ê²ì ì íìµì ì¶ê°			
			}
			
			// ìì¸ê²ì ìì­ í¼ì¹ê¸°
			if ($("input[name='FIND_AGECODE']:checked").length > 0 || $("input[name='FIND_CATE']:checked").length > 0) {								
				$(".bookfind .detail_open").trigger('click');
			}			
			
			// ë¶íë ì´ì ì°ë ¹, ì±ë³, ì£¼ì  ì¤ì 
			$('select').each(function(){		
				$("label[for='"+ $(this).attr("id") +"']").text($(this).children("option:selected").text());			
			});	
			
			// ê²ìì´ ì¤ì 
			if ($("#SCH_TEXT").val() != "") {
				$("#ORG_SCH_TEXT").val($("#SCH_TEXT").val());
				
				if ($("#FIND_REFIND").val() == "Y") {			
					$("#FIND_SCH_TEXT").val($("#SCH_ADD_TEXT").val());
					//$("#chkRefind").prop("checked", true).closest("div").addClass("ez-checked");
					$("#chkRefind").prop("checked", true).parent("div.ez-checkbox").addClass("ez-checked");
				}
				else {					
					$("#chkRefind").prop("checked", false).closest("div").removeClass("ez-checked");
					$("#FIND_SCH_TEXT").val($("#SCH_TEXT").val());
				}				
			}
					
			// ìì¸ê²ì ê²ìì´ ìë ¥ ë° ìµìì ì íí ê²½ì° íí°ìì­ ì¨ê¹, ê²ì íì´í ì¶ë ¥
			if ( $("#FIND_GROUP").val() == "Y" && ($("input[name='FIND_AGECODE']:checked").length > 0 || $("input[name='FIND_CATE']:checked").length > 0 || $("#FIND_SCH_TEXT").val() != "") ) {
				$("div.find_filter, div.find_filter_soundpend, div.setbook_banner").hide();
			}			
			
			PAGING.fnSetValueTitle();  // ê²ìì´/ì´ ë ì½ëì íì´í ì¤ì 						
		}, 		
						
		// ê²ìì´/ì´ ë ì½ëì íì´í ì¤ì 
		fnSetValueTitle: function() {						
			var sSchText = $("#SCH_TEXT").val();
			var sSchAddText = $("#SCH_ADD_TEXT").val();
						
			if (sSchText == undefined) { sSchText = ""; }
			if (sSchAddText == undefined) { sSchAddText = ""; }			
						
			$("#spanSchText").empty().append('"'+sSchText+'"');			
			
			if (sSchAddText != "") { $("#spanSchText").append(' "'+sSchAddText+'"'); }
			
			if ($("input[name='FIND_AGECODE']:checked").length > 0 || $("input[name='FIND_CATE']:checked").length > 0 || $("#FIND_SCH_TEXT").val() != "") {
				$(".find_tit").show();
				$(".curation_sub_tit").show();
			}
			else {
				$(".find_tit").hide();	
				$(".curation_sub_tit").hide();	
			}			
			
			$("#spanTotcnt").text($("#TOTCNT").val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));			
		},
	
		// ìì¸ê²ì - ë¶ì¼/ì°ë ¹ ì í
		fnChkFind  :  function() {
			var objThis = arguments[0];	
			var objName = arguments[1];				
			var obj = "input[name='FIND_"+objName+"']";
			var sVal = "";
					
			if ($.trim($(objThis).val()) == ""){	// "ì ì²´" ì íí ê²½ì° ê·¸ì¸ í­ëª©ì ì²´í¬ í´ì  						
				$(obj+":not(:first)").prop("checked", false).closest("div").removeClass("ez-checked");				
			} 
			else { 
				if ($(obj+":first").val() == "" && $(obj+":checked:not(:first)").length > 0) {						
					$(obj+":first").prop("checked", false).closest("div").removeClass("ez-checked");
				}
				
				sVal = $(obj+":checked").map(function() {			
					return $(this).val();
				}).get().join(",");
			}
			
			$("#"+objName).val(sVal);
						
			PAGING.fnSearchList();		// ê²ìì²ë¦¬
		},	

		// ê²ìíí° - ë¶ì¼/ì°ë ¹ ì í
		fnChkFilter : function() {
			var objThis = arguments[0];	
			var objName = arguments[1];	
			var objForm = arguments[2];			
			var obj = "input[name='FILTER_"+objName+"']";
			var sVal = "";
			
			if (objForm.toLowerCase() == "li") {
				sVal = $(objThis).attr("data-"+objName.toLowerCase());			
			
				if (sVal == $("#"+objName).val()) { return; }
				
				$(objThis).siblings().removeClass("on");
				$(objThis).addClass("on");					
			} 
			else {
				sVal = $(obj+":checked").map(function() {			
					return $(this).val();
				}).get().join(",");			
			}
			
			$("#"+objName).val(sVal);
			
			PAGING.fnPageAct();	
		},
		
		// ì ë ¬ì í
		fnSelSort : function() {
			var obj = arguments[0];	
			var sVal = $(obj).attr("data-sortno");
			
			if (sVal == $("#SORTNO").val()) { return; }
			
			$("#SORTNO").val(sVal);
			
			$(obj).siblings().removeClass("on");
			$(obj).addClass("on");
						
			PAGING.fnPageAct();
		},
		
		// ê²ìë²í¼ ì²ë¦¬
		fnSearchList : function() {
			// ê²ìíí°, ì¸í¸ëì ë°°ë ì´ê¸°í
			$("#FILTER_AGECODE li, #FILTER_CATE li").removeClass("on");
			$("#FILTER_AGECODE li:first-child, #FILTER_CATE li:first-child").addClass("on");			
			$("input[name='FILTER_CATE']").prop("checked", false).closest("div").removeClass("ez-checked");					
			$(".find_filter, .find_filter2, .setbook_banner").show();
						
			var sFindSchText = $.trim($("#FIND_SCH_TEXT").val());
			
			// ê²ìì´ ìë ¥ì¬ë¶ íì¸
			if ($("#chkRefind").is(":visible")){
				if (sFindSchText == "") {
					alert("ê²ìì´ë¥¼ ìë ¥í´ì£¼ì¸ì.");
					return;
				}
			} 
				
			// ê²°ê³¼ë´ ì¬ê²ì ì²´í¬ì¬ë¶ íì¸		
			if ($("#chkRefind").is(":checked")) { 
				$("#SCH_TEXT").val($("#ORG_SCH_TEXT").val());
				$("#SCH_ADD_TEXT").val(sFindSchText);
				$("#FIND_REFIND").val("Y");				
			} 
			else {
				$("#ORG_SCH_TEXT").val(sFindSchText);
				$("#SCH_TEXT").val(sFindSchText);
				$("#SCH_ADD_TEXT").val("");	
				$("#FIND_REFIND").val("");
			}
			
			// ìì¸ê²ì ìì­ë´ ê° íì¸ í ì´ê¸°í
			if ($("input[name='FIND_AGECODE']:checked").length == 0) { 
				$("#AGECODE").val("");	
			}		
			if ($("input[name='FIND_CATE']:checked").length == 0) { 
				$("#CATE").val("");	
			}	
			if ($("input[name='FIND_AWARD']:checked").length == 0) { 
				$("#AWARD").val("");	
			} 
			
			// ìì¸ê²ì ìì­ ì¬ì©ì¬ë¶ íì¸
			if ( $("#AGECODE").val() != "" || $("#CATE").val() != "" || $("#AWARD").val() != "" ){ 
				$("#FIND_GROUP").val("Y"); 
			}
			
			// ìì¸ê²ì ìì­ ì¨ê¹
			if ($("input[name='FIND_AGECODE']:checked").length > 0 || $("input[name='FIND_CATE']:checked").length > 0 || sFindSchText != "") {
				$(".find_filter, .find_filter_soundpend, .setbook_banner").hide();
			}
			
			PAGING.fnOptAdd();	// ìì¸ê²ì ì íìµì ì¶ê°			
			PAGING.fnPageAct();		
		},
				
		// ìì¸ê²ì ì íìµì ì¶ê°
		fnOptAdd : function() {
			if ($(".find_option").is(":not(:empty)")){				
				var sCate = $("input[name='FIND_CATE']:checked").map(function() {			// ëì ë¶ë¥
					if ($(this).val() != ""){
						return "<li>"+ $("label[for='"+ $(this).attr("id") +"']").text() + "<a href=\"javascript:;\" onclick=\"PAGING.fnOptDel('CATE','"+ $(this).val() +"');\"><img src=\"/img/book/opt_del.png\" alt=\"ì­ì \"></a></li>";
					}
				}).get().join("");
								
				var sAgecode = $("input[name='FIND_AGECODE']:checked").map(function() {		// ëì ì°ë ¹
					if ($(this).val() != ""){
						return "<li>"+ $("label[for='"+ $(this).attr("id") +"']").text() + "<a href=\"javascript:;\" onclick=\"PAGING.fnOptDel('AGECODE','"+ $(this).val() +"');\"><img src=\"/img/book/opt_del.png\" alt=\"ì­ì \"></a></li>";
					}
				}).get().join("");
							
				var sAward = $("input[name='FIND_AWARD']:checked").map(function() {			// ìì ë° ì ì  ëì
					if ($(this).val() != ""){
						return "<li>"+ $("label[for='"+ $(this).attr("id") +"']").text() + "<a href=\"javascript:;\" onclick=\"PAGING.fnOptDel('AWARD','"+ $(this).val() +"');\"><img src=\"/img/book/opt_del.png\" alt=\"ì­ì \"></a></li>";
					}
				}).get().join("");
									 
				$(".find_option ul").empty().append(sCate).append(sAgecode).append(sAward);
							
				// ì íìµì ìì­ ì¨ê¹ ì²ë¦¬	
				if ($(".find_option ul").is(":empty")) { 
					$(".find_option").hide();	
				} 
				else { 
					$(".find_option").show();				
				}			
			}		
		},	
		
		// ì íìµì ì­ì 
		fnOptDel : function() {
			var obj	= arguments[0];
			var sVal = arguments[1];		
			
			$("input[name='FIND_"+obj+"']:checked").each(function() {
				if ($(this).val() == sVal ) {
					$(this).prop("checked", false).closest("div").removeClass("ez-checked");
				}
			});	
			
			var sCode = $("input[name='FIND_"+obj+"']:checked").map(function() {			
				return $(this).val();
			}).get().join(",");
			
			$("#"+obj).val(sCode);
			
			PAGING.fnSearchList();	
		},		
											
		// ì¶ì²ì´ ì í
		fnSetTag : function() {
			var re = /@/g;
			var sTag  = arguments[0].replace(re,"'");
			
			if (sTag != "") {
				$("#FIND_SCH_TEXT").val(sTag);
			}
		}	
};

