/*==========================================================
'- ì©  ë : Null check
==========================================================*/
var fnChkVal = function() {
	var sName = arguments[0];
	var sType = arguments[1];
	var sMsg = arguments[2];
	var obj;
	var nFlag = 0;

	if ( $("#"+sName+"").length > 0 ) {
		obj = $("#"+sName+"");
	} else if ( $("[name='"+sName+"']").length > 0 ) {
		obj = $("[name='"+sName+"']");
	} else {
		return true;
	}

	if (sType == "txt") { sMsg += " ìë ¥í´ì£¼ì¸ì."; }
	else { sMsg += " ì íí´ì£¼ì¸ì."; }

	if ( sType == "txt" || sType == "sel" ) {

		if ( $.trim(obj.val() ) == "") {
			alert(sMsg); obj.focus(); return true;
		} else { return false; }

	} else if ( sType == "chk" || sType == "rdo" ) {
		
		obj.each(function() {
			if ( $(this).is(":checked") ) { nFlag ++; }
		});

		if (nFlag <= 0 ) {
			alert(sMsg); obj.focus();	 return true;
		} else { return false; }

	} else { return true; }

	return false;
}

/*==========================================================
'- ì©  ë : special check
==========================================================*/
var fnChkSpec = function() {
	var sTxt = arguments[0];
	var objRegExp1 =/^[0-9]/;				//ì«ì
	var objRegExp2 = /^[a-zA-Z]/;		// ìë¬¸ì²´í¬
	var objRegExp3 = /^[ã±-í£]/;			// íê¸ì²´í¬
	var sTmp;
	var i;
	
	for(i=0; i<sTxt.length; i++){
		sTmp = $.trim(sTxt.substring(i, i+1));
		if (sTmp != "") {
			if (!objRegExp1.test(sTmp)) {			//ì«ì
				if (!objRegExp2.test(sTmp)) {		//ìë¬¸
					if (!objRegExp3.test(sTmp)) {	//íê¸
						return true;	
					}
				}
			}
		}
	}
	return false;
}

/*=================================================
'- ì©  ë : eng & num check
=================================================*/
var fnChkEngNum = function() {
	var strVal = arguments[0];
	var objRegExp = /[^(a-zA-Z0-9)]/;

	return objRegExp.test(strVal);
}

/*=================================================
'- ì©  ë : eng check
=================================================*/
var fnChkEng = function() {
	var strVal = arguments[0];
	var objRegExp = /[^(a-zA-Z)]/;

	return objRegExp.test(strVal);
}

/*=================================================
'- ì©  ë : ì¿ í¤ ìì±
=================================================*/
var fnSetCookie = function() {
	var sName = arguments[0];
	var sValue = arguments[1];
	var nDay = arguments[2];
	var sExpire = new Date();
	var sCookieContent = "";

	sCookieContent = sName + "=" + sValue + "; path=/; ";
	if (nDay > 0 ) {
		sExpire.setDate(sExpire.getDate() + nDay);
		sCookieContent += " expires=" + sExpire.toGMTString() + ";";
	}
	document.cookie = sCookieContent;
}

/*=================================================
'- ì©  ë : ì¿ í¤ ê°ì ¸ì¤ê¸°
=================================================*/
var fnGetCookie = function() {
	var sName = arguments[0];
	var sValue = "";
	var sCookieContent = document.cookie;
	var nStart = sCookieContent.indexOf(sName);
	var nEnd;

	if (nStart != -1) {
		nStart += sName.length + 1;
		nEnd = sCookieContent.indexOf(";", nStart);
		if (nEnd == -1) { nEnd = sCookieContent.length; }
		sValue = sCookieContent.substring(nStart, nEnd);
	}

	return unescape(sValue);
}

/*=================================================
'- ì©  ë : ajax í¸ì¶ ì²ë¦¬ 
=================================================*/ 
function fnAjaxCall() {
	var sSendUrl		= arguments[0];
	var sSendMethod		= arguments[1];
	var sSendData		= arguments[2];
	var sDataType		= arguments[3];
	var CallBackFunc	= arguments[4];
	$.ajax({
		type:sSendMethod,
		url:sSendUrl, 
		data: sSendData,
		dataType:sDataType,
		async:false,
		clearForm:true,
		resetForm:true,
		success:function(data){
			if (CallBackFunc != undefined && CallBackFunc != "") {
				CallBackFunc(data);
			}
			return false;
		},
		error:function(response, textStatus, errThrown){
			//location.reload();
			//alert("response : " + response.status +"\nError Msg : " + response.responseText + "\nError : " + textStatus + "\nerrorThrown: " + errThrown);
		}
	});
}

/*=================================================
'- ì©  ë : ëì ìì¸ íì´ì§ ì´ë 
=================================================*/ 
var fnGoBookView = function() {
	var sBookcode = arguments[0];
	var sTarget = arguments[1];
	var sUrl = "/book/list_detail.asp?bookcode="+sBookcode;
	if (sTarget == "1") {
		window.open(sUrl,'list_detail');	
	}
	else {
		location.href = sUrl;
	}
}
	
 
/*=================================================
'- ì©  ë : ë¡ê·¸ì¸ íì´ì§ ì°ê²° ì ë¬´
=================================================*/ 
var fnLogin = function() {
	if (confirm("ë¡ê·¸ì¸ì´ íìí ìë¹ì¤ìëë¤. \n\në¡ê·¸ì¸ì íìë ¤ë©´ íì¸ì ëë¬ì£¼ì¸ì.")) {
		location.href = "/membership/login.asp";
	}
	else {
      return;
	}
}

/*=================================================
'- ì©  ë : ëª¨ë°ì¼ ëë°ì´ì¤ ì²´í¬
=================================================*/  
var fnIsMobile = function() {    
	var sMsg = arguments[0];	
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
		return true;	
	}
	else {
		if (sMsg != undefined && sMsg != "") { alert(sMsg); }		
		return false;
	}
}

/*=================================================
'- ì©  ë : ë§ì¤ìí
=================================================*/
jQuery.fn.extend({
	ellipsis : function(){
		return this.each(function(){var el = $(this);		
			if (el.css("overflow") == "hidden"){
				var text = el.html();
				var multiline = el.hasClass('multiline');
				var t = $(this.cloneNode(true))
				.hide()
				.css('position', 'absolute')
				.css('overflow', 'visible')
				.width(multiline ? el.width() : 'auto')
				.height(multiline ? 'auto' : el.height());
				el.after(t);
				function height(){return t.height() > el.height();};
				function width(){return t.width() > el.width();};
				var func = multiline ? height : width;
				while (text.length > 0 && func()){text = text.substr(0, text.length - 1);t.html(text + "...");}
				el.html(t.html());
				t.remove();
			}
		});
	}
});

/*=================================================
'- ì©  ë : íì¼ ë¤ì´ë¡ë
=================================================*/
var downTimeoutID;
var fnFileDownload = function() {    
	var sGbn = arguments[0];	
	var nSeq = arguments[1];
		
	if (sGbn == "") { alert("ìëª»ë ì ê·¼ìëë¤."); return; }	
	if (!$.isNumeric(nSeq)) { alert("ìëª»ë ì ê·¼ìëë¤."); return; }
		
	window.open("/common/inc/download_pop.asp?gbn="+sGbn+"&seq="+nSeq, "download_pop"); 
	
	/*
	var oIframe = $('<iframe>', {'id':'iframeDown', 'name':'iframeDown', 'src':'about:blank', 'style':'width:0px;height:0px;display:none;'});	
	var oForm = $('<form>', {'id':'frmDown', 'name':'frmDown', 'action':'/common/inc/download_pop.asp', 'method':'post', 'target':'iframeDown'});
	var oInput1 = $('<input>', {'type':'hidden', 'name':'gbn', 'value':sGbn});
	var oInput2 = $('<input>', {'type':'hidden', 'name':'seq', 'value':nSeq});	
	
	clearTimeout(downTimeoutID);	
	if ($('#frmDown').is(':visible')) {	$('#frmDown, #iframeDown').remove(); }
	
	$(document.body).append(oIframe).append(oForm.append(oInput1).append(oInput2));		
	$('#frmDown').submit();	
	
	downTimeoutID = setTimeout(function() {
		$('#frmDown, #iframeDown').remove();
	}, 1000);
	*/
}

/*=================================================
'- ì©  ë : ëììí íì
=================================================*/ 
var fnPopupReview = function() {
	var sBookcode = arguments[0];		
	if (sBookcode == undefined) { sBookcode = ""; }	
	var sUrl = "/book/review_write.asp?bookcode="+sBookcode;	
	
	window.open(sUrl,'review_write','width=895,height=680,top=0,left=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');	
}

/*=================================================
'- ì©  ë : ëììí ìì  íì
=================================================*/ 
var fnPopupReviewModify = function() {
	var nSeq = arguments[0];
	if (!$.isNumeric(nSeq)) { alert("ìëª»ë ì ê·¼ìëë¤."); return; }
	var sUrl = "/book/review_modify.asp?seq="+nSeq;	
	
	window.open(sUrl,'review_modify','width=895,height=680,top=0,left=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');	
}

/*=================================================
'- ì©  ë : ëììí ì­ì  ì²ë¦¬
=================================================*/ 
var fnProcReviewDelete = function() {	
	var nSeq = arguments[0];
	var sReturnUrl = arguments[1];
	
	if (!$.isNumeric(nSeq)) { alert("ìëª»ë ì ê·¼ìëë¤."); return; }
	
	var sSendUrl = "/book/review_del.proc.ajax.asp";	
						
	if (confirm("ìíì ì­ì íìê² ìµëê¹?")) {				
		var sSendData = { SEQ : nSeq };
				
		fnAjaxCall(sSendUrl, "POST", sSendData, "json", function(){
			var objData	= arguments[0];								
			if (objData.RESULTCD == "100") { // ì­ì ì±ê³µ
				if (sReturnUrl != undefined && sReturnUrl != "") {
					location.replace(sReturnUrl);
				}
				else {
					location.reload();
				}
			}
			else {
				alert(objData.RESULTMSG);
			}				
			objData = null;
			return false;
		});			
	}		
}


/*=================================================
'- ì©  ë : íê·¸ ê²ì
=================================================*/ 
var fnTagHeadSearch = function() {	
	var sTag = arguments[0];			
	var sTarget = arguments[1];	
	var sUrl = "/book/find_result.asp?search="+encodeURIComponent(sTag);
	
	if (sTarget == "1") {
		window.open(sUrl,'find_result');	
	}
	else {
		$("#HEAD_SCH_TEXT").val(sTag);	
		HEADER.fnHeadSearch();
	}	
}

/*=================================================
'- ì©  ë : ë¤ì´ë²ë¡ê·¸ì¸ íì
=================================================*/ 
var fnPopupNaverLogin = function() {
	var sUrl = "/membership/naver/naver_login.asp";		
	window.open(sUrl,'naverloginpop','titlebar=1, resizable=1, scrollbars=yes, width=600, height=550');	
}

