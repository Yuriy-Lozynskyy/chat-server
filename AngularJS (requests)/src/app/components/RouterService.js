angular.module("NodeJSRouter").factory('routerService',routerService);
function routerService($http){
    var messages=[];
    var service={
      getMessages: getMessages,
      sendMessage:sendMessage
    };

  function getMessages(){
    $http({
        method : "GET",
        url : "http://simple-chat-example.herokuapp.com/v1/messages"
    }).then(function mySucces(response) {
          messages.splice(0, messages.length);
          for (var i=response.data.messages.length - 5;i<response.data.messages.length;i++){
            messages.push(response.data.messages[i]);
      };
    }, function myError(response) {
        messages = response.statusText;
    });
      return messages;
  };

  function sendMessage(message){
    $http({
        method : "POST",
        url : "http://simple-chat-example.herokuapp.com/v1/messages",
        data: { text: message }
    })
  };
     return service;
};
