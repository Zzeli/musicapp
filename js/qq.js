$(function(){
	
	
	audio = $('#audio').get(0);
	$('.music').on('click',function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	})

	function display(){
		if(musics.length){
			$('.contain h3').html(musics[current].song);
			$('.change .art').html(musics[current].song);
			$('.change .name').html(musics[current].name);
			
			$('.foot .music').removeClass('music').toggleClass('pause');
			$('.list_con li').removeClass('active').eq(current).addClass('active');
			
			
		}else{
			$('.contain h3').html('');
		}
	}

	$(audio).on('play',display);
	
	$(audio).on('pause',function(){
		$('.foot .pause').removeClass('pause').toggleClass('music');
		
	})
	
//	$('.random .music').on('click',function(){
//		$(this).removeClass('music').toggleClass('pause');
//	});
	
	var current=1;
	var musics=[
		{id:1,song:'安和桥',name:'包师语',from:'中国新歌声',num:'第五期',src:'包师语 - 安和桥.mp3'},
		{id:2,song:'再见北极雪',name:'周传雄',from:'中国新歌声',num:'第五期',src:'周传雄 - 再见北极雪.mp3'},
		{id:3,song:'温暖',name:'许巍',from:'中国新歌声',num:'第五期',src:'许巍 - 温暖.mp3'},
		{id:4,song:'Better Man',name:'黄恺',from:'中国新歌声',num:'第五期',src:'张杰 - Better Man (Live).mp3'},
		{id:5,song:'Bang Bang',name:'程思佳',from:'中国新歌声',num:'第五期',src:'Jessie J - Bang Bang.mp3'},
		{id:6,song:'不完美小孩',name:'金雯昕',from:'中国新歌声',num:'第五期',src:'不完美女孩.mp3'}
	];

	function render(){
		$('.list_con').empty();
		$(musics).each(function(i,v){
			$('<li><h3>'+ v.song +'</h3><div class="bottom"><p>' + v.name + '</p><p>' + v.from+ '</p><p>'+ v.num +'</p></div><div class="delete">x</div></li>')
			.addClass(function(){
				return (i===current) ? 'active':'';
			})
			.appendTo('.list_con');
		});
	}
	render();
	

	
	var blue=$('.jdt .blue');
	var long=$('.jdt .long');
	
	$(audio).on('timeupdate',function(){
		blue.width(0);
		w=(audio.currentTime/audio.duration)*long.width();
		blue.width(w);
		
	})
	long.on('click',function(e){
		var x=e.offsetX;
		audio.currentTime=(x/long.width())*audio.duration;
	});
	
	
	next=function(){
		current +=1;
		current = current === musics.length ? 0 : current;
		audio.src = musics[current].src;
		audio.play();
	}
	
	$('.next').on('click',next);
	prev=function(){
		current -=1;
		current= current === 0 ? musics.length - 1 : current;
		audio.src = musics[current].src;
		audio.play();
	}
	
	$('.prev').on('click',prev);
	
	
	

	
	
	$('.gedan').on('click',function(){
		$('.change').css('transform','translate3d(0,0,0)');
	})
	var change=$('.change');
	var next=$('.next');
	var prev=$('.prev');
	var long=$('.long');
	$('.change').on('click',change,function(e){
      	var obj=e.target;
      if(!$(obj).is('.change')&&!$(obj).is('next')&&!$(obj).is(prev)&&!$(obj).is(long)){
        	$('.change').css('transform','translate3d(0,130%,0)');
      };
	
	});
	
	
	
		$('.list_con').on('click','li',function(){
		current=$(this).index();
		audio.src=musics[current].src;
		audio.play();
	})
		$('.list_con').on('click','.delete',function(){
		li =$(this).closest('li');
		index=li.index();
		li.remove();
		musics.splice(index,1);
		render();
		if(index > current){
			/////////////////
		}else if(index === current){
			
			if(musics.length){
				
//				if(index === musics.length){
//					current=0;
//				}else{
//					return index;
//				}
				audio.src = musics[current].src;
				audio.play();
			}else{
				audio.src='';
				current = null;
				display();
			}
			
		}else if(index < current){
			current -= 1;
		}
		render();
		return false;
		
	})
	
	
	
	
	var start= $('.start');
	var end=$('.end');
	
	function fn(s){
		s=Math.floor(s);
		min=Math.floor( s / 60 );
		min = min < 10 ? ('0'+min): min;
		secound=s%60;
		secound=secound < 10 ? ('0'+secound) : secound;
		return min + ' : '+ secound;
	}

	$(audio).on('canplay',function(){
		end.html(fn(audio.duration));
	})
	
	$(audio).on('timeupdate',function(){
		start.html(fn(audio.currentTime));
	})
	
	
	
	
});
