$(function () {
	reset();
	mumberItem();

	addClassName(".burgerCont", ".burger");
	addClassName(".burgerCont", ".frame");
	addClassName(".burgerCont", ".burgerCont");
	addClassName(".burgerCont", ".menuIcon");
	addClassName(".burgerCont", ".menuWord");
	addClassName(".burgerCont", ".arrow");
	addClassName(".burgerCont", ".bg2");
	addClassName(".burgerCont", ".footer");
	showPage(".show_team", ".teamCon");
	showPage(".show_stack", ".stackCon");
	showPage(".show_contact", ".contactCon");
	showPage(".show_work", ".workCon");
	showWork(".workCon .page");
	turn(".mumberFace", ".mumberData")
});
$(window).resize(function () {
	reset();
	window.location.reload();
});

function reset() {
	var borderWidth = $(window).width() - 88;
	var borderHeight = $(window).height() - 88;
	$(".topFrame,.bottomFrame").attr("style", 'width:' + borderWidth + "px");
	$(".rightFrame,.leftFrame").attr("style", 'height:' + borderHeight + "px");
	$(".iconTeam,.iconProduct").attr("style", "left:" + parseInt((borderWidth / 2) - 23) + "px");
	$(".iconAbout,.iconDepartment").attr("style", "top:" + parseInt((borderHeight / 2) - 23) + "px;");
	$(".pageCont,.teamCon,.workCon,.stackCon,.contactCon").attr("style", "width:" + borderWidth + "px;height:" + parseInt(borderHeight + 2) + "px;");
	$(".burgerCont").attr("style", "left:" + parseInt(borderWidth / 2 - 17) + "px;");
}

function mumberItem() {
	var item = $(".teamMumberItem");
	var itemLength = item.length;
	var itemWidth = $(item).width();
	for (var i = 0; i < itemLength; i++) {
		$(item[i]).attr("style", "left:" + parseInt(itemWidth * i + 40 * i) + "px;");
	}
	var a = 0;
	var m = 0;
	$(".teamCon").bind('mousewheel', function (event, delta, deltaX, deltaY) { //鼠标滚动事件，增加相片排列的left值
		var left = $('.teamBoxes').position().left;
		if (delta == -1) {
			a += 213; //滚动一次移动的值
			if (left >= -((itemLength - 1) * 231)) {
				var newLeft = parseInt(left - 462) + "px";
				if ($(".teamBoxes").is(":animated")) {} else {
					$(".teamBoxes").animate({
						"left": newLeft
					}, 'easein'); //设置left值
				}

				console.log(newLeft);

			}

			m++; //滚动次数
		} else {
			if (left <= 0) {
				var get = $('.teamBoxes').position().left - m * 213; //向上滚动时减少一个单位
				for (var i = 0; i < itemLength; i++) {

					var newLeft = parseInt(left + 462) + "px";
					if ($(".teamBoxes").is(":animated")) {} else {
						$(".teamBoxes").animate({
							"left": newLeft
						}, 'easein'); //设置left值
					}
				}
			}

		}

	});
	// using the event helper

	// }
}

function addClassName(target, name) {
	var className = $(name);
	$(target).bind("click", function () {
		for (var i = 0; i < className.length; i++) {

			var classAll = $(className[i]).attr("class")
			var classAll = classAll.split(" ");

			if ($($(className)[i]).hasClass(classAll[0] + (i + 1) + "Animate")) {
				$(className[i]).removeClass(classAll[0] + (i + 1) + "Animate");
			} else {
				$(className[i]).addClass(classAll[0] + (i + 1) + "Animate");
			}
		}
	});
}

function showPage(target, page) {
	var target = $(target);
	var page = $(page);
	var classname = $(page).attr("class") + "1Animate";
	var other = $(".pageCont>div").not(".burgerCont").not(page);

	target.bind("click", function () {
		if ($(page).hasClass(classname)) {
			$(page).removeClass(classname);
		} else {
			$(page).addClass(classname);
		}
		for (var i = 0; i < other.length; i++) {
			if ($(other[i]).hasClass("teamCon1Animate")) {
				$(other[i]).removeClass("teamCon1Animate");
			}
			if ($(other[i]).hasClass("workCon1Animate")) {
				$(other[i]).removeClass("workCon1Animate");
			}
			if ($(other[i]).hasClass("contactCon1Animate")) {
				$(other[i]).removeClass("contactCon1Animate");
			}
			if ($(other[i]).hasClass("stackCon1Animate")) {
				$(other[i]).removeClass("stackCon1Animate");
			}
		}
	})
	// target.bind("clikck",funciton(){

	// });
}
// function toPage(a){
// 	var name=['first',"second","third","fourth"];
// 	var a = $(a).html()[1] - 1;
// 	console.log(this,a);
// 	var left = $(".pageCont").width() * a;
// 	console.log(left);
// 	$("."+name[a]+"Page").css("left",left);
// }
function showWork(clas) { //delta 滚动反向，正上负下。
	var pages = $(clas);
	var name = ['first', "second", "third", "fourth"];

	for (var i = 0; i < pages.length - 1; i++) {
		pages[i].index = i;
		$(pages[i]).bind("mousewheel", function (event, delta, deltaX, deltaY) {
			if (delta == -1) {
				$(this).addClass(name[this.index] + "PageAnimate");
				$(pages[this.index + 1]).addClass(name[this.index + 1] + "PageAnimate");

			} else {
				$(this).removeClass(name[this.index] + "PageAnimate");
				$(pages[this.index - 1]).removeClass(name[this.index - 1] + "PageAnimate");

			}
		});
	}
	$(pages[pages.length - 1]).bind("mousewheel", function (event, delta, deltaX, deltaY) {
		if (delta == 1) {
			$(this).removeClass(name[pages.length - 1] + "PageAnimate");
		}
	})
}

function turn(face, data) {
	var $face = $(face),
		$data = $(data);
	$face.each(function (index) {
		$(this).mouseover(function () {
			{
				// $(this).css({
				// 	'transform': 'rotateY(0.5 turn)'
				// });
				// $($data[index]).css({
				// 	'opacity': 1,
				// 	'filter': 'alpha(opacity = 100)'
				// })
				console.log("over")
			}
		})
	})
}

// var data = [{
// 				id:"chenQi",
// 				name:"陈奇",
// 				dataTiny:"软件研发部(2012)、CERT组长(2012-2013)",
// 				job: "就职公司：杭州胡同科技有限公司"
// 				bgP: "../images/chenQi.png"
// 			}
// 			,{
// 				id:"caoXuDong",
// 				name:"曹旭东",
// 				dataTiny:"网站建设部",
// 				job: "就职公司：什么值得买"
// 				bgP: "../images/caoXuDong.png"
// 			},
// 			{
// 				id:"pengWei",
// 				name:"彭炜",
// 				dataTiny:"网站建设部",
// 				job: "就职公司：百度"
// 				bgP: "../images/pengWei.png"
// 			},{
// 				id:"yanMingRui",
// 				name:"严敏睿",
// 				dataTiny:"网络安全部(2013)",
// 				job: "就职公司：360公司"
// 				bgP: "../images/yanMingRui.png"
// 			},{
// 				id:"qiaoZhi",
// 				name:"乔治",
// 				dataTiny:"扫地组组长",
// 				job: "就职公司：淘乐创想科技公司"
// 				bgP: "../images/qiaoZhi.png"
// 			}]
// // function loadPic(data){

// // 	for(var i = 0; i<data.length;i++){
// // 		var html = '<div class="TeamMumberItem"><div class="mumberFace" id='+data.id+'>'
// // 		$(".TeamMuber")[0].html(


// // 		)
// // 	}