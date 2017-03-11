<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8"/>
<title>Golos maps</title>
<style>
.map-info-window{
   background:#333;
   border-radius:4px;
   box-shadow:8px 8px 16px #222;
   color:#fff;
   max-width:200px;
   max-height:300px;
   text-align:center;
   padding:5px 20px 10px;
   overflow:hidden;
   position:absolute;
   text-transform:uppercase;
}


#map {
    width: 100%;
    height: 300px;
}
#mapCanvas {
    width: 100%;
    height: 400px;
}
input#postingkey {
    display: block;
    width: 100%;
}
input {
    margin: 5px 5px 0 5px;
}
#mapdesc,#mapimg{
width:100%;
display:block;
}
p.help {
    background: #f9f9f9;
    color: #868686;
    padding: 5px;
    border-radius: 3px;
}
.drdrop {
    padding: 10px 0;
    border-radius: 5px;
}
body { font-family: Arial, Helvetica, sans-serif;color: grey; }
input,#text-editor {
    background: #f7f7f7;
    border: 0;
    box-shadow: inset 0 0 10px -5px black;
	color:black;
	    padding: 5px;
    border-radius: 5px;
}

#addimg.loading{
background:url(https://s3.postimg.org/ejg32n7er/loading.gif);
transition:2s all ease;
height:50px;
}
#addimg.loading.hasload{
background:#36c77f;
height:auto;
}
.drdrop span { background: #7aa8ff; border: 0; padding: 10px; color: white; border-radius: 3px; box-shadow: 0 0 16px -7px black; cursor: pointer; }
#text-editor img { max-width: 100%; height: auto; }#text-editor { background: #f7f7f7; min-height: 200px; border-radius: 5px; padding: 1px 10px; }.golos-form { padding:5%; }#alerts { background: #ff8282; color: white; font-size:18px; border-radius: 3px; }input#post-golos-title{width:100%;margin:10px auto;padding:5px;border-radius:5px;font-size:1rem}.golos-form .mce-panel{border-radius:3px;margin:10px auto}.golos-form input[type=submit]{cursor:pointer;background:#248eff;border:0;display:block;margin:20px auto;padding:10px;width:160px;border-radius:3px;color:#fff;box-shadow:0 0 10px -5px #000}</style>
<meta name="Description" content="С помощью данной страницы вы можете записать в блокчейн голоса координаты места или целой полигональной зоны на карте. В последствии воспроизвести данные в кастом клиенте. Математический нотариат + земельный кадастр в перспективе...">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="icon" type="image/x-icon" href="https://golos.io/images/favicons/favicon.ico"/>
<script async src="https://golos.rubtc.info/wp-content/plugins/golos/golos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
<script src="https://cdn.tinymce.com/4/tinymce.min.js"></script>
<script async src="https://cdnjs.cloudflare.com/ajax/libs/sjcl/1.0.6/sjcl.min.js"></script>
<script  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDaKws1vkLkuxRcvJpYuMfB2drqX8VBoMI"></script>
</head>
<body>
<div class="golos-form">
 <h2>Golos Maps - Запись данных о местности в блокчейн</h2>
<div class="notice">
<h5>С помощью данной страницы вы можете записать в блокчейн голоса координаты места или целой полигональной зоны на карте (Форма для ввода полигональной зоны будет опубликована позднее). В последствии воспроизвести данные в кастом клиенте. (Математический нотариат + земельный кадастр в бч)</h5>
<h5>Данные о маркере на карте записываются в json metadata (широта, долгота, ближайший юридический адрес). В последствии данные можно отобразить в клиенте обратившись к json metadata. Более подробный мануал и примеры отображения данных будут опубликованы в блоге <a href="https://golos.io/@vik">golos.io/@vik</a></h5>
<div id="mapCanvas"></div>
  <div id="panel">
      <input id="city_country" type="textbox" value="King St, Belize City">
      <input type="button" value="Поиск" onclick="codeAddress()">
</div> 
   <div id="info"></div>
    <div id="address"></div>

</div>




<form id="post-golos-form" enctype="multipart/form-data">
<input type="text" name="map-desc" id="mapdesc" placeholder="Заметка над маркером на карте">
<input type="text" name="mapimg-url" id="mapimg" placeholder="URL изображения для заметки">
		   
		   

<h2>Содержание поста:</h2>
<input type="text" name="post-golos-title" id="post-golos-title" required aria-required="true" placeholder="Заголовок">
<div class="drdrop"><span id="addimg" onclick="document.querySelector('#loadinp').click()">Загрузить фото</span></div><input id="loadinp" style="visibility: collapse; width: 0px;" type="file" onchange="upload(this.files[0])">
<div id="text-editor"></div>
<input type="text" id="username" name="username" required aria-required="true" placeholder="Логин">
<input type="password" id="postingkey" name="postingkey" title="Никому не сообщайте свой ключ!" placeholder="Постинг ключ"/>
 
 <p><input title="Допускаются только латинские маленькие буквы или дефис" type="text" id="topic" name="topic" required aria-required="true" placeholder="ru--golos (топик)" pattern="[a-z0-9-]+"/><input type="text" id="permlink" name="permlink" required aria-required="true" title="Допускаются только латинские маленькие буквы или дефис. Введите желаемую ссылку вида my-post" placeholder="permlink (ссылка на пост)" pattern="[a-z0-9-]+"/></p>

 
 <input type="text" id="tag1" name="tag1" placeholder="Тег 1" pattern="[a-z0-9-]+">
<input type="text" id="tag2" name="tag2"  placeholder="Тег 2" pattern="[a-z0-9-]+">
<input type="text" id="tag3" name="tag3"  placeholder="Тег 3" pattern="[a-z0-9-]+">		
		<input type="submit" value="Отправить">
</form>
<div id="alerts"></div>
</div>

<script>

var geocoder;
var map;
var marker;

codeAddress = function () {
    geocoder = new google.maps.Geocoder();
  
  var address = document.getElementById('city_country').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 17,
            streetViewControl: true,
          mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP] 
    },
    center: results[0].geometry.location,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
      map.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          draggable: true,
		  icon: 'https://golos.io/images/favicons/favicon.ico',
          title: 'My Title'
      });
      updateMarkerPosition(results[0].geometry.location);
      geocodePosition(results[0].geometry.location);
        
      // Add dragging event listeners.
  google.maps.event.addListener(marker, 'dragstart', function() {
    updateMarkerAddress('Поиск адреса...');
  });
      
  google.maps.event.addListener(marker, 'drag', function() {
    //updateMarkerStatus('Двигаем');
    updateMarkerPosition(marker.getPosition());
  });
  
  google.maps.event.addListener(marker, 'dragend', function() {
    //updateMarkerStatus('Подвигали');
    geocodePosition(marker.getPosition());
      map.panTo(marker.getPosition()); 
  });
  
  google.maps.event.addListener(map, 'click', function(e) {
    updateMarkerPosition(e.latLng);
    geocodePosition(marker.getPosition());
    marker.setPosition(e.latLng);
  map.panTo(marker.getPosition()); 
  }); 
  
    } else {
      alert('Неверный геокод: ' + status);
    }
  });
}
codeAddress();
function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      updateMarkerAddress(responses[0].formatted_address);
    } else {
      updateMarkerAddress('Нет адресов в выбранной местности');
    }
  });
}

function updateMarkerStatus(str) {
  //document.getElementById('markerStatus').innerHTML = str;
}

var la,lo,land;
function updateMarkerPosition(latLng) {
  document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
  la = latLng.lat(),
  lo = latLng.lng();
  
  
}

function updateMarkerAddress(str) {
  document.getElementById('address').innerHTML = str;
  land = str;
}



jQuery(document).ready( function( $ ) {
	tinymce.init( {
		selector:'#text-editor',       
		
	
		height: 300,
  menubar: false,
  plugins: [
    'autosave save advlist autolink lists link image charmap print preview hr anchor',
    'searchreplace wordcount visualchars code fullscreen',
    'insertdatetime save table contextmenu directionality',
    'emoticons paste imagetools codesample toc'
  ],
  toolbar1: 'undo redo | insert | bold italic | bullist numlist | link image',
  toolbar2: 'print preview media | emoticons | codesample | code',
  
  
  image_advtab: true,
		save_enablewhendirty: true,
		save_onsavecallback: function () { console.log('Saved'); },
		
	
  language: 'ru',
  language_url:'https://golos.rubtc.info/ru.js',
  paste_data_images: true
 
    } );
});


window.ondragover = function(e) {e.preventDefault()}
    window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
    function upload(file) {
        if (!file || !file.type.match(/image.*/)) return;
        document.getElementById("addimg").classList.add('loading');
        var fd = new FormData(); 
        fd.append("image", file); 
        var xhr = new XMLHttpRequest(); 
        xhr.open("POST", "https://api.imgur.com/3/image.json"); 
        xhr.onload = function() {
            var imgurl = JSON.parse(xhr.responseText).data.link;
			var ed = tinyMCE.get('text-editor');                // get editor instance
			var newNode = ed.getDoc().createElement ( "img" );  // create img node
			newNode.src=imgurl;                           // add src attribute
			ed.execCommand('mceInsertContent', false, newNode.outerHTML)
			document.getElementById("addimg").classList.add('hasload');
			
			
        }
        xhr.setRequestHeader('Authorization', 'Client-ID 28aaa2e823b03b1'); 
        xhr.send(fd);
    }
var s;	
var tag1= "",tag2="",tag3="";

if("postK" in localStorage){
    document.getElementById('postingkey').placeholder = 'Ваш постинг ключ был введен ранее, сейчас зашифрован и сохранен';
} else {
   
}


// Запускаем функцию нажатием submit в форме #post-golos-form
jQuery( '#post-golos-form' ).on( 'submit', function(e) {
        e.preventDefault();
		// Записываем в переменные содержимое полей
		 var t = document.getElementById("post-golos-title").value,
			 // Вытаскиваем наш контент из редактора в переменную post_body
			 post_body = tinyMCE.activeEditor.getContent(),
			 u = document.getElementById("username").value;
			
			steem.api.getAccounts([u], function(err, result) {
				s = result[0].memo_key;
			
			postingKey = document.getElementById("postingkey").value;
			
			if (postingKey.length > 20){
			//encryption
			postK = sjcl.encrypt(s, postingKey);

			//storing to local storage
			localStorage.setItem("postK", postK);
			}
			// retrieve from local storage
			var enK = localStorage.getItem("postK");
			// decrypt
			var k = sjcl.decrypt(s, enK);
			
			
			 permlink = document.getElementById("permlink").value,

			 tag1 = document.getElementById("tag1").value,
			 tag2 = document.getElementById("tag2").value,
			 tag3 = document.getElementById("tag3").value,
			 topic = document.getElementById("topic").value,
			 mapdesc = document.getElementById("mapdesc").value,
			 mapimg = document.getElementById("mapimg").value,
			 jsonMetadata = {"tags":["vikmap",tag1,tag2,tag3],"vikmap":[la,lo,land,mapdesc,mapimg]},
			 parentAuthor = '', 
	         parentPermlink = topic;
			 steem.broadcast.comment(
					k,parentAuthor, parentPermlink, 
						u, 
						permlink, 
						t, 
						post_body, 
					jsonMetadata, 
					function(err, result) {
					  console.log(err,result);
					  // В случае ошибок - отразим их под формой
					  if(err != null){
					  document.getElementById('alerts').innerHTML = ('<blockquote>'+err+'</blockquote>'); 
					  }
					  if(result != null){
					  document.getElementById('alerts').innerHTML = ('<blockquote>Ошибок не выявлено, проверьте наличие поста - <a href="https://golosdb.com/'+topic+'/@'+u+'/'+permlink+'">golosdb.com/'+topic+'/@'+u+'/'+permlink+'</a>. Что бы отредактировать пост - просто нажмите кнопку отправить еще раз - это заменит содержимое поста на текущее содержимое редактора, важно, что бы вы не меняли ссылку "'+permlink+'". Заменив ссылку - будет создан новый пост, вместо редакции существующего.</blockquote>'); 
					  }
					});
		});			
});

    
</script>
<p class="help">Канал в телеграмм - <a href="https://web.telegram.org/#/im?p=@viknews">@viknews</a></p>
<p class="help">Обратная связь - <a href="https://web.telegram.org/#/im?p=@vikxx">@vikxx</a></p>
</body>
</html>
