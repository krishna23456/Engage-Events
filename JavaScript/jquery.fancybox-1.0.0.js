(function(d){var c={},b=new Image,a=["png","jpg","jpeg","gif"],f,e=1;d.fn.fancybox=function(g){c.settings=d.extend({},d.fn.fancybox.defaults,g);d.fn.fancybox.init();return this.each(function(){var h=d(this);var i=d.metadata?d.extend({},c.settings,h.metadata()):c.settings;h.unbind("click").click(function(){d.fn.fancybox.start(this,i);return false})})};d.fn.fancybox.start=function(k,m){if(c.animating){return false}if(m.overlayShow){d("#fancy_wrap").prepend('<div id="fancy_overlay"></div>');d("#fancy_overlay").css({width:d(window).width(),height:d(document).height(),opacity:m.overlayOpacity});if(d.browser.msie){d("#fancy_wrap").prepend('<iframe id="fancy_bigIframe" scrolling="no" frameborder="0"></iframe>');d("#fancy_bigIframe").css({width:d(window).width(),height:d(document).height(),opacity:0})}d("#fancy_overlay").click(d.fn.fancybox.close)}c.itemArray=[];c.itemNum=0;if(jQuery.isFunction(m.itemLoadCallback)){m.itemLoadCallback.apply(this,[c]);var n=d(k).children("img:first").length?d(k).children("img:first"):d(k);var j={width:n.width(),height:n.height(),pos:d.fn.fancybox.getPosition(n)};for(var h=0;h<c.itemArray.length;h++){c.itemArray[h].o=d.extend({},m,c.itemArray[h].o);if(m.zoomSpeedIn>0||m.zoomSpeedOut>0){c.itemArray[h].orig=j}}}else{if(!k.rel||k.rel==""){var l={url:k.href,title:k.title,o:m};if(m.zoomSpeedIn>0||m.zoomSpeedOut>0){var n=d(k).children("img:first").length?d(k).children("img:first"):d(k);l.orig={width:n.width(),height:n.height(),pos:d.fn.fancybox.getPosition(n)}}c.itemArray.push(l)}else{var g=d("a[@rel="+k.rel+"]").get();for(var h=0;h<g.length;h++){var j=d.metadata?d.extend({},m,d(g[h]).metadata()):m;var l={url:g[h].href,title:g[h].title,o:j};if(m.zoomSpeedIn>0||m.zoomSpeedOut>0){var n=d(g[h]).children("img:first").length?d(g[h]).children("img:first"):d(k);l.orig={width:n.width(),height:n.height(),pos:d.fn.fancybox.getPosition(n)}}if(g[h].href==k.href){c.itemNum=h}c.itemArray.push(l)}}}d.fn.fancybox.changeItem(c.itemNum)};d.fn.fancybox.changeItem=function(i){d.fn.fancybox.showLoading();c.itemNum=i;d("#fancy_nav").empty();d("#fancy_outer").stop();d("#fancy_title").hide();d(document).unbind("keydown");imgRegExp=a.join("|");imgRegExp=new RegExp("."+imgRegExp+"$","i");var g=c.itemArray[i].url;if(g.match(/#/)){var h=window.location.href.split("#")[0];h=g.replace(h,"");d.fn.fancybox.showItem('<div id="fancy_div">'+d(h).html()+"</div>");d("#fancy_loading").hide()}else{if(g.match(imgRegExp)){d(b).unbind("load").bind("load",function(){d("#fancy_loading").hide();c.itemArray[i].o.frameWidth=b.width;c.itemArray[i].o.frameHeight=b.height;d.fn.fancybox.showItem('<img id="fancy_img" src="'+b.src+'" />')}).attr("src",g+"?rand="+Math.floor(Math.random()*999999999))}else{d.fn.fancybox.showItem('<iframe id="fancy_frame" onload="jQuery.fn.fancybox.showIframe()" name="fancy_iframe'+Math.round(Math.random()*1000)+'" frameborder="0" hspace="0" src="'+g+'"></iframe>')}}};d.fn.fancybox.showIframe=function(){d("#fancy_loading").hide();d("#fancy_frame").show()};d.fn.fancybox.showItem=function(k){d.fn.fancybox.preloadNeighborImages();var h=d.fn.fancybox.getViewport();var j=d.fn.fancybox.getMaxSize(h[0]-50,h[1]-100,c.itemArray[c.itemNum].o.frameWidth,c.itemArray[c.itemNum].o.frameHeight);var g=h[2]+Math.round((h[0]-j[0])/2)-20;var i=h[3]+Math.round((h[1]-j[1])/2)-40;var l={left:g,top:i,width:j[0]+"px",height:j[1]+"px"};if(c.active){d("#fancy_content").fadeOut("normal",function(){d("#fancy_content").empty();d("#fancy_outer").animate(l,"normal",function(){d("#fancy_content").append(d(k)).fadeIn("normal");d.fn.fancybox.updateDetails()})})}else{c.active=true;d("#fancy_content").empty();if(d("#fancy_content").is(":animated")){console.info("animated!")}if(c.itemArray[c.itemNum].o.zoomSpeedIn>0){c.animating=true;l.opacity="show";d("#fancy_outer").css({top:c.itemArray[c.itemNum].orig.pos.top-18,left:c.itemArray[c.itemNum].orig.pos.left-18,height:c.itemArray[c.itemNum].orig.height,width:c.itemArray[c.itemNum].orig.width});d("#fancy_content").append(d(k)).show();d("#fancy_outer").animate(l,c.itemArray[c.itemNum].o.zoomSpeedIn,function(){c.animating=false;d.fn.fancybox.updateDetails()})}else{d("#fancy_content").append(d(k)).show();d("#fancy_outer").css(l).show();d.fn.fancybox.updateDetails()}}};d.fn.fancybox.updateDetails=function(){d("#fancy_bg,#fancy_close").show();if(c.itemArray[c.itemNum].title!==undefined&&c.itemArray[c.itemNum].title!==""){d("#fancy_title div").html(c.itemArray[c.itemNum].title);d("#fancy_title").show()}if(c.itemArray[c.itemNum].o.hideOnContentClick){d("#fancy_content").click(d.fn.fancybox.close)}else{d("#fancy_content").unbind("click")}if(c.itemNum!=0){d("#fancy_nav").append('<a id="fancy_left" href="javascript:;"></a>');d("#fancy_left").click(function(){d.fn.fancybox.changeItem(c.itemNum-1);return false})}if(c.itemNum!=(c.itemArray.length-1)){d("#fancy_nav").append('<a id="fancy_right" href="javascript:;"></a>');d("#fancy_right").click(function(){d.fn.fancybox.changeItem(c.itemNum+1);return false})}d(document).keydown(function(g){if(g.keyCode==27){d.fn.fancybox.close()}else{if(g.keyCode==37&&c.itemNum!=0){d.fn.fancybox.changeItem(c.itemNum-1)}else{if(g.keyCode==39&&c.itemNum!=(c.itemArray.length-1)){d.fn.fancybox.changeItem(c.itemNum+1)}}}})};d.fn.fancybox.preloadNeighborImages=function(){if((c.itemArray.length-1)>c.itemNum){preloadNextImage=new Image();preloadNextImage.src=c.itemArray[c.itemNum+1].url}if(c.itemNum>0){preloadPrevImage=new Image();preloadPrevImage.src=c.itemArray[c.itemNum-1].url}};d.fn.fancybox.close=function(){if(c.animating){return false}d(b).unbind("load");d(document).unbind("keydown");d("#fancy_loading,#fancy_title,#fancy_close,#fancy_bg").hide();d("#fancy_nav").empty();c.active=false;if(c.itemArray[c.itemNum].o.zoomSpeedOut>0){var g={top:c.itemArray[c.itemNum].orig.pos.top-18,left:c.itemArray[c.itemNum].orig.pos.left-18,height:c.itemArray[c.itemNum].orig.height,width:c.itemArray[c.itemNum].orig.width,opacity:"hide"};c.animating=true;d("#fancy_outer").animate(g,c.itemArray[c.itemNum].o.zoomSpeedOut,function(){d("#fancy_content").hide().empty();d("#fancy_overlay,#fancy_bigIframe").remove();c.animating=false})}else{d("#fancy_outer").hide();d("#fancy_content").hide().empty();d("#fancy_overlay,#fancy_bigIframe").fadeOut("fast").remove()}};d.fn.fancybox.showLoading=function(){clearInterval(f);var g=d.fn.fancybox.getViewport();d("#fancy_loading").css({left:((g[0]-40)/2+g[2]),top:((g[1]-40)/2+g[3])}).show();d("#fancy_loading").bind("click",d.fn.fancybox.close);f=setInterval(d.fn.fancybox.animateLoading,66)};d.fn.fancybox.animateLoading=function(g,h){if(!d("#fancy_loading").is(":visible")){clearInterval(f);return}d("#fancy_loading > div").css("top",(e*-40)+"px");e=(e+1)%12};d.fn.fancybox.init=function(){if(!d("#fancy_wrap").length){d('<div id="fancy_wrap"><div id="fancy_loading"><div></div></div><div id="fancy_outer"><div id="fancy_inner"><div id="fancy_nav"></div><div id="fancy_close"></div><div id="fancy_content"></div><div id="fancy_title"></div></div></div></div>').appendTo("body");d('<div id="fancy_bg"><div class="fancy_bg fancy_bg_n"></div><div class="fancy_bg fancy_bg_ne"></div><div class="fancy_bg fancy_bg_e"></div><div class="fancy_bg fancy_bg_se"></div><div class="fancy_bg fancy_bg_s"></div><div class="fancy_bg fancy_bg_sw"></div><div class="fancy_bg fancy_bg_w"></div><div class="fancy_bg fancy_bg_nw"></div></div>').prependTo("#fancy_inner");d('<table cellspacing="0" cellpadding="0" border="0"><tr><td id="fancy_title_left"></td><td id="fancy_title_main"><div></div></td><td id="fancy_title_right"></td></tr></table>').appendTo("#fancy_title")}if(d.browser.msie){d("#fancy_inner").prepend('<iframe id="fancy_freeIframe" scrolling="no" frameborder="0"></iframe>')}if(jQuery.fn.pngFix){d(document).pngFix()}d("#fancy_close").click(d.fn.fancybox.close)};d.fn.fancybox.getPosition=function(g){var h=g.offset();h.top+=d.fn.fancybox.num(g,"paddingTop");h.top+=d.fn.fancybox.num(g,"borderTopWidth");h.left+=d.fn.fancybox.num(g,"paddingLeft");h.left+=d.fn.fancybox.num(g,"borderLeftWidth");return h};d.fn.fancybox.num=function(g,h){return parseInt(d.curCSS(g.jquery?g[0]:g,h,true))||0};d.fn.fancybox.getPageScroll=function(){var h,g;if(self.pageYOffset){g=self.pageYOffset;h=self.pageXOffset}else{if(document.documentElement&&document.documentElement.scrollTop){g=document.documentElement.scrollTop;h=document.documentElement.scrollLeft}else{if(document.body){g=document.body.scrollTop;h=document.body.scrollLeft}}}return[h,g]};d.fn.fancybox.getViewport=function(){var g=d.fn.fancybox.getPageScroll();return[d(window).width(),d(window).height(),g[0],g[1]]};d.fn.fancybox.getMaxSize=function(k,j,h,g){var i=Math.min(Math.min(k,h)/h,Math.min(j,g)/g);return[Math.round(i*h),Math.round(i*g)]};d.fn.fancybox.defaults={hideOnContentClick:false,zoomSpeedIn:500,zoomSpeedOut:500,frameWidth:600,frameHeight:400,overlayShow:false,overlayOpacity:0.4,itemLoadCallback:null}})(jQuery);function InitializeBehaviors(){jQuery("a.PopupTriggerLink").fancybox(GetFancyboxOptions());jQuery("input.RegisterButton").click(function(a){a.preventDefault();jQuery(this).siblings("a.PopupTriggerLink").click()})}function GetFancyboxOptions(){var b=jQuery('<div id="fancy_outer"/>').appendTo(document.body);var a={frameWidth:b.width(),frameHeight:b.height(),overlayShow:true};b.remove();return a}function RegisterBehaviorWithPageManager(){var a=Sys.WebForms.PageRequestManager.getInstance();if(a){a.add_endRequest(InitializeBehaviors)}}var delayRegistration=typeof(Sys)==="undefined";jQuery(function(){InitializeBehaviors();if(delayRegistration){RegisterBehaviorWithPageManager()}});if(!delayRegistration){RegisterBehaviorWithPageManager()};