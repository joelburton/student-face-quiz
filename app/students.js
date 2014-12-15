angular.module('studentsFaceQuiz', ['firebase'])

    .controller('FaceQuizCtrl', ['$firebase', '$timeout', function ($firebase, $timeout) {
        var self = this;
        var firebaseRef = new Firebase("https://studentsfacequiz.firebaseio.com/");

        var students = $firebase(firebaseRef).$asArray();

        self.randomize = function () {
            if (self.upcomingName)
                $timeout.cancel(self.upcomingName);
            var i = Math.floor(Math.random() * students.length);
            self.studentName = "";
            self.studentPhoto = students[i]['photo'];
            self.upcomingName = $timeout(function () {
                self.studentName = students[i]['name'];
            }, 3000)
        };

        students.$loaded().then(function () { self.randomize(); });
    }]);


