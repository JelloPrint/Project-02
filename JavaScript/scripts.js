var body = $('body');
var stories = $('.stories');
var select = $('select');
var loader = $('.loading');

// make sure scripts dont run until html loaded
$(document).ready(function(){

	select.change(function (event) {
		event.preventDefault();
		
		var selected = $(this).val();
		loader.show();
		stories.empty();
		body.addClass('active');

		$.ajax({
			method: 'GET',
			dataType: 'json',
			url: 'http://api.nytimes.com/svc/topstories/v1/' + selected + '.json?api-key=88152552d8b84a218f8395e816149640'
		})

		.done(function(data){   
			if (data.results.length === 0) {
				stories.append();
			} else { 
				var nytData = data.results;
				var newYorkTimes = nytData.filter(function (item) {
					return item.multimedia.length;
				}).splice(0, 12);

				newYorkTimes.forEach(function(item, index){
					stories.append('<li class= "content-' + index + '"> <a class="text" href="' + item.url + '" target="_blank"><p class="abstract-text"> ' + item.abstract + 
					'</p></a> </li>');

					img = item.multimedia[4];
					$('.content-' + index).css("background-image", "url(\"" + img.url + "\")");
				});
			}

		})

		.always(function(){
				loader.hide();
		});

	});

});