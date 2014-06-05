// 为AMail服务创建一个模块
var aMailServices = angular.module('AMail', []);

// 创建URLs，templates（模版）和controllers（控制器）之间的映射关系
function emailRouteConfig($routeProvider) {
    $routeProvider.
    when('/', {
        controller: ListController,
        templateUrl: 'list.html'
    }).
    // 此处我们通过在id前添加冒号的方式为detail视图设置参数化的URL组件
    when('/view/:id', {
        controller: DetailController,
        templateUrl: 'detail.html'
    }).
    otherwise({
        redirectTo: '/'
    });
}

// 为AMail服务设置路由
aMailServices.config(emailRouteConfig);

// 测试数据
messages = [
    {
        id: 0,
        sender: 'jean@somecompany.com',
        subject: 'Hi there, old friend',
        date: 'Dec 7, 2013 12:32:00',
        recipients: ['greg@somecompany.com'],
        message: 'Hey, we could get together for lunch sometime and catch up.'
        + 'There are many things we should collaborate on this year.'
    },
    {
        id: 1,
        sender: 'maria@somecompany.com',
        subject: 'Where did you leave my laptop?',
        date: 'Dec 7, 2013 8:15:12',
        recipients: ['greg@somecompany.com'],
        message: 'I thought you were going to put it in my desk drawer.'
        + 'But it does not seem to be there.'
    },
    {
        id: 2,
        sender: 'bill@somecompany.com',
        subject: 'Lost python',
        date: 'Dec 6, 2013 20:35:02',
        recipients: ['greg@somecompany.com'],
        message: 'Nobody panic, but my pet python is missing from her cage.'
        + 'She doesn\'t move too fast, so just call me if you see her.'
    }
];

// 将messages发布至list模版
function ListController($scope) {
    $scope.messages = messages;
}

// 从路由中获取message的id（解析URL）并使用该id获取相应的message对象
function DetailController($scope, $routeParams) {
    $scope.message = messages[$routeParams.id];
}
