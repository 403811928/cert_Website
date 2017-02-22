// var index;
// $(function() {
//     var bodyWidth = $(".container").width();
//     console.log(typeof bodyWidth);
//         var item = $(".item");
//         var depart = $(".Depart");
//         for (var i = 0; i < item.length; i++) {
//             item[i].index = i;
//             item[i].oldStyle = {
//                     left:$(item[i]).position().left,
//                     'z-index':$(item[i]).css('z-index')
//                 };
//             console.log(item[i].oldStyle);
//             item[i].addEventListener("click", function() {
//                 if($(item[3]).position().left >0){

//                     console.log($(item[3]).position().left);
//                     var left = $(this).position().left;
//                     console.log(left);
//                     $(item).removeClass("first");
//                     $(item[this.index]).addClass("first");
//                     var other = item.not(".first");
//                     if (left >= (bodyWidth / 4)) {
//                         console.log("执行1.1");
//                         $(item[this.index]).css("z-index",3);
//                         $(item[this.index]).animate({
//                             left: 0
//                         }, 800);
//                     }else{
//                         console.log("执行1.2");
//                         $(item[this.index]).css("z-index",3);
//                     }
//                     other.animate({
//                         left: 0
//                     }, 800);
//                     $(depart[this.index]).show()
//                 }else{
//                     for(var b=0;b<item.length;b++){
                        
//                         $(item[b]).animate({
//                             left:item[b].oldStyle.left,
//                             'z-index':2
//                         },800);
//                         $(item[b]).removeClass("first");
//                     }
//                     index = this.index
//                     console.log("执行2");
//                     setTimeout(function(){$(depart[index]).hide();console.log("hide")},800);
//                     clearTimeout();
//                 }
                
//             });

//         };
// });

// function setCss(name){
//    var name = $("."+name);
//    for(var i=0;i<name.length;i++){
//     name[i].css({
//         left:name[i].oldStyle.left,
//         'z-index':name[i].oldStyle['z-index']
//         });
//     }
// }