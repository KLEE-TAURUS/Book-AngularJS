var app = angular.module('myApp', []);

// 此处我们通过工厂方法将socket定义为服务（单例模式，仅初始化一次）
app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://0.0.0.0:8080');

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

function MainCtrl($scope, socket) {

    $scope.message = '';
    $scope.messages = [];

    // 从服务器端收到一条消息
    socket.on('new:msg', function (message) {
        $scope.messages.push(message);
    });

    // 通知服务器端有一条新消息
    $scope.broadcast = function () {
        socket.emit('broadcast:msg', { message: $scope.message });
        $scope.messages.push($scope.message);
        $scope.message = '';
    }
}
