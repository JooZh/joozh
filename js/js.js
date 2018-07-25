// JavaScript Document
$(function(){
	var select = $("select").val();
	$("select").change(function(){
			var select = $("select").val();
		show(select);
	});
	show(select);
	function show(select){
		$.ajax({ 
			url: "http://wthrcdn.etouch.cn/weather_mini?citykey="+select,
			type: "GET",
			dataType:'json',  
			success: function(res){ 
				// 将昨天的数据添加到列表中方便统一显示
				var data = res.data;
				var forecast = res.data.forecast;
				forecast.unshift({
					date:res.data.yesterday.date,
					high:res.data.yesterday.high,
					fengli:res.data.yesterday.fl,
					low:res.data.yesterday.low,
					fengxiang:res.data.yesterday.fx,
					type:res.data.yesterday.type
				})
				forecast.forEach(function(item,index){
					forecast[index].fengli = item.fengli.replace('<![CDATA[','').replace(']]>','')
					forecast[index].low = item.low.replace('低温 ','');
					forecast[index].high = item.high.replace('高温 ','');
					forecast[index].fengxiang = item.fengxiang.replace('无持续风向','不定风向');
				})
				data.forecast = forecast;
				// 显示顶部 信息
				$("#plans").html(data.city+" 今日平均温度 <strong>"+data.wendu+"</strong>℃ <br>"+data.ganmao);
				// console.log(data);
				var showHtml = '';
				$.each(data.forecast,function(index,value){
					showHtml += 
					'<div class="col-xs-6 col-sm-4 col-md-2">'+
						'<div class="panel panel-'+(index ==1?'primary':'default')+'">'+
							'<div class="panel-heading">'+
								'<div class="row">'+
									'<div class="col-xs-6 col-sm-6 col-md-6">'+week(value.date)+'</div>'+
									'<div class="col-xs-6 col-sm-6 col-md-6" style="text-align:right">'+value.type+'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="col-xs-12 col-sm-12 col-md-12">'+date()+day(value.date)+'</div>'+
								'</div>'+
							'</div>'+
							'<div class="panel-body">'+
								'<div class="row">'+
									'<div class="col-xs-7 col-sm-7 col-md-7">'+value.fengxiang+'</div>'+
									'<div class="col-xs-5 col-sm-5 col-md-5" style="text-align:right">'+value.fengli+'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="col-xs-6 col-sm-6 col-md-6">'+value.low+'</div>'+
									'<div class="col-xs-6 col-sm-6 col-md-6" style="text-align:right">'+value.high+'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
				});
				$('#show-weather-data').html(showHtml);
				function week(d){
					return d.substr(-3);
				}
				function day(d){
					if(d.charAt(2)=="星"){
						return d.substr(0,2);
					}else{
						return d.substr(0,3);
					}
				}
			}
		});
	}
	function date(){
		var oDate = new Date();
		var y = oDate.getFullYear();
		var m = (oDate.getMonth())+1;
		return y+"年"+m+"月";
	}
});
