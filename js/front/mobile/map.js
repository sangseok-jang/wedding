
//마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new daum.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new daum.maps.LatLng(map_info.map_lat, map_info.map_long), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
};    

//지도를 생성합니다        
var map = new daum.maps.Map(mapContainer, mapOption); 



//마커가 표시될 위치입니다 
var markerPosition  = new daum.maps.LatLng(map_info.map_lat, map_info.map_long); 

//마커를 생성합니다
var marker = new daum.maps.Marker({
   position: markerPosition
});

//마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);


//var big      = '<a href="http://map.daum.net/link/map/'+map_info.map_title+','+map_info.map_lat+','+map_info.map_long+'" style="color:blue" target="_blank">큰지도보기</a>';
var big      = '';
var bro_navi = '<a href="http://map.daum.net/link/map/'+map_info.map_title+','+map_info.map_lat+','+map_info.map_long+'" style="color:blue;" target="_blank">길찾기</a>';


var iwContent = '<div style="padding:5px; width:100%;text-align: left;">'+map_info.map_title+'<br/>'+big+bro_navi, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
iwPosition = new daum.maps.LatLng(map_info.map_lat, map_info.map_long); //인포윈도우 표시 위치입니다


//커스텀 오버레이에 표시할 내용입니다
//HTML 문자열 또는 Dom Element 입니다
var content = '<div class="p_b_color" style="padding: 0.125em 0.25em; font-size: 1em;  border-radius: 0.5em;">';
content += '    <a href="http://map.daum.net/link/map/'+map_info.map_title+','+map_info.map_lat+','+map_info.map_long+'" class="b_f_color" target="_blank">'+map_info.map_title+'</a>';
content += '</div>';

//커스텀 오버레이를 생성합니다
var mapCustomOverlay = new daum.maps.CustomOverlay({
    position: markerPosition,
    content: content,
    xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
    yAnchor: 2.7// 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
});

// 커스텀 오버레이를 지도에 표시합니다
mapCustomOverlay.setMap(map);


//장소 검색 객체를 생성합니다
//var ps = new daum.maps.services.Places(); 


//키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (status, data, pagination) {
    if (status === daum.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new daum.maps.LatLngBounds();
        for (var i=0; i<data.places.length; i++) {
                displayMarker(data.places[i]);        
                bounds.extend(new daum.maps.LatLng(data.places[i].latitude, data.places[i].longitude));
        }             
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}

//지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
 
 //    마커를 생성하고 지도에 표시합니다
    var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.latitude, place.longitude) 
    });

    // 마커에 클릭이벤트를 등록합니다
    daum.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.title + '</div>');
        
        $('.map_address').val(place.address);
        $('.map_new_address').val(place.newAddress ? place.newAddress : place.address);
        $('.map_lat').val(place.latitude);
        $('.map_long').val(place.longitude);
        $('.map_phone').val(place.phone);
        //$('.map_title').val(place.title);
        
        infowindow.open(map, marker);
    });
}

