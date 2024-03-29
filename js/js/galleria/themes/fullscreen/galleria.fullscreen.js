!function(i){
	Galleria.addTheme({
		name:"fullscreen",
		author:"Galleria",
		css:"galleria.fullscreen.css",
		defaults:{
			transition:"none",
			imageCrop:true,
			thumbCrop:"height",
			easing:"galleriaOut",
			trueFullscreen:false,
			_hideDock:Galleria.TOUCH?false:true,
			_closeOnClick:false
		},
		init:function(t){
			Galleria.requires(1.4,"This version of Fullscreen theme requires Galleria version 1.4 or later");
			this.addElement("thumbnails-tab");
			this.appendChild("thumbnails-container","thumbnails-tab");
			var e=this.$("thumbnails-tab"),
			a=this.$("loader"),
			n=this.$("thumbnails-container"),
			s=this.$("thumbnails-list"),
			h=this.$("info-text"),
			o=this.$("info"),
			l=!t._hideDock,
			r=0;
			if(Galleria.IE){
				this.addElement("iefix");this.appendChild("container","iefix");
				this.$("iefix").css({
					zIndex:3,
					position:"absolute",
					backgroundColor:this.hasVariation("light")?"#fff":"#000",
					opacity:.4,
					top:0
					})
			}
			if(t.thumbnails===false){
				n.hide()
			}
			var c=this.proxy(function(t){
				var e=t.width||i(t).width();if(!(t||e)){return}
				e=Math.min(e,i(window).width());
				h.width(e-40);
				if(Galleria.IE&&this.getOptions("showInfo")){
					this.$("iefix").width(o.outerWidth()).height(o.outerHeight())
					}
			});
			this.bind("rescale",function(){r=this.getStageHeight()-e.height()-2;n.css("top",l?r-s.outerHeight()+2:r);var i=this.getActiveImage();if(i){c(i)}});this.bind("loadstart",function(t){if(!t.cached){a.show().fadeTo(100,1)}i(t.thumbTarget).css("opacity",1).parent().siblings().children().css("opacity",.6)});this.bind("loadfinish",function(i){a.fadeOut(300);this.$("info, iefix").toggle(this.hasInfo())});this.bind("image",function(i){i.imageTarget&&c(i.imageTarget)});this.bind("thumbnail",function(a){i(a.thumbTarget).parent(":not(.active)").children().css("opacity",.6);i(a.thumbTarget).on("click:fast",function(){if(l&&t._closeOnClick){e.trigger("click:fast")}})});this.trigger("rescale");if(!Galleria.TOUCH){this.addIdleState(n,{opacity:0});this.addIdleState(this.get("info"),{opacity:0});this.$("image-nav-left, image-nav-right").css("opacity",.01).hover(function(){i(this).animate({opacity:1},100)},function(){i(this).animate({opacity:0})}).show()}if(Galleria.IE){this.addIdleState(this.get("iefix"),{opacity:0})}if(t._hideDock){e.on("click:fast",this.proxy(function(){e.toggleClass("open",!l);if(!l){n.animate({top:r-s.outerHeight()+2},400,t.easing)}else{n.animate({top:r},400,t.easing)}l=!l}))}else{this.bind("thumbnail",function(){n.css("top",r-s.outerHeight()+2)});e.css("visibility","hidden")}this.$("thumbnails").children().hover(function(){i(this).not(".active").children().stop().fadeTo(100,1)},function(){i(this).not(".active").children().stop().fadeTo(400,.6)});this.enterFullscreen();this.attachKeyboard({escape:function(i){return false},up:function(i){if(!l){e.trigger("click:fast")}i.preventDefault()},down:function(i){if(l){e.trigger("click:fast")}i.preventDefault()}})}})}(jQuery);