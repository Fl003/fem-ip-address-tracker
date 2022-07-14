$(document).ready(function () {
    var map, marker;

    // $.ajax({
    //     type: "GET",
    //     url: "https://api.ipify.org?format=json",
    //     data: "data",
    //     dataType: "JSON",
    // }).done(function(ip) {
    //     $.ajax({
    //         type: "GET",
    //         url: "",
    //         data: {apiKey: api_key, ipAddress: ip},
    //         dataType: "JSON",
    //         success: function (response) {
    //             createMap(response.location.lat, response.location.lng);
    //         }
    //     });
    // });

    showOwnIp();

    function showOwnIp() {
        return $.getJSON('https://api.ipify.org?format=json', function(data){
            searchIP(data.ip);
        });
    }

    $.ajax({
        type: "GET",
        url: "geoapioutput.json",
        data: "data",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            createMap(response.location.lat, response.location.lng);
        }
    });

    $("#search").click(function () { 
        let input = $("#input").val();
        searchIP(input);
    });

    function createMap(lat, lng) {
        map = L.map('map').setView([lat, lng], 13);
        L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);

        var customMarker = L.icon({
            iconUrl: 'images/icon-location.svg',
            iconSize: [46, 56],
            iconAnchor: [23 , 0]
        })

        marker = L.marker([lat, lng], {icon: customMarker}).addTo(map);
    }

    function changeLocation(lat, lng) {
        map.flyTo([lat, lng], 13);
        marker.setLatLng([lat, lng]);
    }

    function searchIP(ip) {
        $.ajax({
            type: "GET",
            url: "https://geo.ipify.org/api/v2/country,city?apiKey=at_3H2gp1Az7l58gRqSx66oVCSxbK0QQ&ipAddress=8.8.8.8",
            data: {apiKey: "at_3H2gp1Az7l58gRqSx66oVCSxbK0QQ", ipAddress: ip},
            dataType: "JSON",
            success: function (response) {
                showDetailAndLocation(response);
            }
        });
    }

    // 

    function showDetailAndLocation(data) {
        $("#ip").text(data.ip);
        $("#location").text(data.location.city + ", " + data.location.region + " " + data.location.postalCode);
        $("#timezone").text("UTC " + data.location.timezone);
        $("#isp").text(data.isp);

        changeLocation(data.location.lat, data.location.lng);
    }
});