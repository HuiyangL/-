window.addEventListener('load',function(){
	let header=$('header')[0];
//	console.log(header)
	let headBox=$('.head-box')[0];
    let imgs=$('li',headBox);
    let back=$('.back')[0];
    let forward=$('.forward')[0];
    let now=next=0;
    let t;
    let widths=imgs[0].offsetWidth;
    let flag=true;
    let lunbodian=$('.lunbodian')[0];
    let lis=$('li',lunbodian);
    
    
    //back、forward效果
    back.onclick=function(){
    	if(!flag){
    		return;
    	}
    	flag=false;
    	move1();
    	return false;
    }
    
    forward.onclick=function(){
    	if(!flag){
    		return;
    	}
    	flag=false;
    	move();
    	return false;
    }
    
    function move1(){
    	next--;
    	if(next==-1){
    		next=imgs.length-1;
    	}
    	imgs[next].style.left=`${-widths}px`;
    	animate(imgs[now],{left:widths});
    	lis[now].classList.remove('hot');
    	animate(imgs[next],{left:0},function(){
    		flag=true;
    	});
    	lis[next].classList.add('hot');
    	now=next;
    }
    //自动轮播
    t=setInterval(move,3000);
    function move(){
    	next++;
    	if(next==imgs.length){
    		next=0;
    	}
    	imgs[next].style.left=`${widths}px`;
    	animate(imgs[now],{left:-widths});
    	lis[now].classList.remove('hot');
    	animate(imgs[next],{left:0},function(){
    		flag=true;
    	});
    	lis[next].classList.add('hot');
    	now=next;
    }
    
    header.onmouseenter=function(){
    	clearInterval(t);
    }
    header.onmouseleave=function(){
    	t=setInterval(move,3000);
    }
     //下方的轮播点与上方的图片链接
     for(let i=0;i<imgs.length;i++){
     	lis[i].onclick=function(){
     		if(i==now){
     			return;
     		}
     		lis[now].classList.remove('hot');
     		lis[i].classList.add('hot');
     		if(i>now){
     			imgs[i].style.left=`${widths}px`;
     			animate(imgs[now],{left:-widths});
     			animate(imgs[i],{left:0});
     		}
     		if(i<now){
     			imgs[i].style.left=`${-widths}px`;
     			animate(imgs[now],{left:widths});
     			animate(imgs[i],{left:0});
     		}
     		now=next=i;
     	}
     }
     
     
    let imggs=$('.show-cont>li');
	let mask=$('.mask');
	let close=$('.icon-guanbi');
	let nextt=$('.icon-xiajiantou');
	let prev=$('.icon-houtui');
	let mImg=$('.mask-box>img');
	let index=0;
	
	imggs.click(function(){
		index=$(this).find('a').find('img').index();
		let src=$(this).find('a').find('img').attr('src');
		mImg.attr('src',src);
		mask.addClass('active');
		$(document.querySelector('body')).prop('overflow','hidden');
	})
	
	//利用事件委派，委派给文档document
	/*$(document).click(function(e){
		let element=e.target;
		if(element.nodeName=="IMG"){
			let src=$(element).attr('src');
			mImg.attr('src',src);
			mask.addClass('active');
		}
	})*/
	
	//关闭按钮
	close.click(function(){
		mask.removeClass('active');
	})
	
	//屏蔽浏览器的默认行为
	$(document).mousedown(false);
	
	//next键
	nextt.click(function(){
		if(index==2){
		   return;
		}
		index++;
		let src=$('.show-cont>li>a').eq(index).find('img').attr('src');
		mImg.attr('src',src);
	})
	
	//prev键
	prev.click(function(){
		if(index==0){
			return;
		}
		index--;
		let src=$('.show-cont>li>a').eq(index).find('img').attr('src');
		mImg.attr('src',src);
	})
	
	//点击图片左侧实现prev键的功能
	mask.click(function(e){
		let lefts=e.clientX;
		if(lefts<window.innerWidth / 2){
			prev.trigger('click');
		}
	})
	//点击图片右侧实现next键的功能
	mask.click(function(e){
		let lefts=e.clientX;
		if(lefts>window.innerWidth / 2){
			nextt.trigger('click');
		}
	})
    
})
	