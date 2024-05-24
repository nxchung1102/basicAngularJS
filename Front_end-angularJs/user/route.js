var app = angular.module('asm1', ['ngRoute']);
app.controller("sanphamdamua", sanphamdamua);
app.controller("giohang", giohang);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/trangchu", {
            templateUrl: "screens/trangchu.html",
        })

        .when("/sanpham", {
            templateUrl: "screens/sanpham.html",
            controller: "sanpham"

        })
        .when("/sanphamdamua", {
            templateUrl: "screens/sanphamdamua.html",
            controller: "sanphamdamua"
        })

        .when("/giohang", {
            templateUrl: "screens/giohang.html",
            controller: "giohang"
        })

        .when("/chitiet", {
            templateUrl: "screens/chitiet.html",
        })
        .when("/chitiet1", {
            templateUrl: "screens/chitiet1.html",
        })
        .when("/chitiet2", {
            templateUrl: "screens/chitiet2.html",
        })
        .when("/chitiet3", {
            templateUrl: "screens/chitiet3.html",
        })
        .when("/giaynike", {
            templateUrl: "screens/giaynike.html",
        })
        .when("/flashsale", {
            templateUrl: "screens/flashsale.html",
        })
        .when("/gioithieu", {
            templateUrl: "screens/gioithieu.html",
        })
        .when("/lienhe", {
            templateUrl: "screens/lienhe.html",
        })
        .when("/login", {
            templateUrl: "screens/login.html",
        })
        .otherwise({
            templateUrl: "screens/trangchu.html",
        })
});

