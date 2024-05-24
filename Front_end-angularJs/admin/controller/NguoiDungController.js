 window.NguoiDungController = function($scope,$http,$location,$routeParams){
    var url = "http://localhost:3000/user"

    $scope.lstPost=[]
    $http.get(url)
    .then(function(response){
        $scope.lstPost = response.data
    })
    .catch(function(error){
        console.log("lỗi API")
    })
    $scope.data ={
        hoTen: "",
        email: "",
        vaiTro: "",
        password: ""
    }

    $scope.editing = false; 
    $scope.currentIndex = null; 

    $scope.save = function () {
        if(checkEmpty()){
        let data = angular.copy($scope.data);

        if (!$scope.editing) {
            // Thêm mới nếu không đang ở chế độ sửa
            $http.post(url, data)
                .then(function (response) {
                    alert("Thêm thành công");
                    $scope.loadData();
                    $scope.clearForm();
                })
                .catch(function (error) {
                    console.log("Lỗi API");
                });
        } else {
            // Cập nhật nếu đang ở chế độ sửa
            let link = url + "/" + $scope.lstPost[$scope.currentIndex].id;
            $http.patch(link, data)
                .then(function (response) {
                    alert("Sửa thành công");
                    $scope.loadData();
                    $scope.clearForm();
                })
                .catch(function (error) {
                    console.log("Lỗi API");
                });
        }}
    };
    $scope.update = function (value) {
        // Đặt thông tin của bản ghi vào form khi nhấn nút "Sửa"
        $scope.data = angular.copy(value);
        $scope.editing = true;
        $scope.currentIndex = $scope.lstPost.indexOf(value);
    };

   

    //xoá post
    $scope.delete = function(id){
        let check = confirm("Bạn có muốn xoá không ? ")
        if(check){
            let link = url +"/"+id
            $http.delete(link)
            .then(function(response){
                alert("Xoá thành công")
            })
            .catch(function(error){
                alert("Lỗi API")
            })

        }

    }
    var urlVaiTro= "http://localhost:3000/vaiTro"
    $scope.listvaiTro = []
    $http.get(urlVaiTro)
    .then(function(response){
        $scope.listvaiTro = response.data
    })
    .catch(function(error){
        console.log("Loi API")
    })


  
    
    $scope.loadData = function () {
        // Tải lại dữ liệu từ server
        $http.get(url)
            .then(function (response) {
                $scope.lstPost = response.data;
            })
            .catch(function (error) {
                console.log("Lỗi API");
            });
    };
    $scope.clearForm = function () {
        // Đặt lại form và biến trạng thái sửa
        $scope.data = {
            hoTen: "",
            email: "",
            vaiTro: "",
            password: ""
        };
        $scope.editing = false;
        $scope.currentIndex = null;
    };
    $scope.columnName=""
    $scope.revert = true
    $scope.sortColumn = function(columnName){
        if($scope.columnName==columnName){
            $scope.revert = !$scope.revert
        }
        else{
            $scope.columnName=columnName
            $scope.revert = true
        }
    }


      
    $scope.validate={
        hoTen:false,
       email:false,
      password:false,
      vaiTro:false

    }

    function checkEmpty(){
        let check = true
        if($scope.data.hoTen ==""){
            $scope.validate.hoTen = true
            check = false
        }
        if($scope.data.email ==""){
            $scope.validate.email = true
            check = false
        }
        if($scope.data.password ==""){
            $scope.validate.password = true
            check = false
        }
        if($scope.data.vaiTro ==""){
            $scope.validate.vaiTro = true
            check = false
        }
        return check
    }

    $scope.validatehoTen = function(){
        if($scope.data.hoTen ==""){
            $scope.validate.hoTen = true

        }
        else{
            $scope.validate.hoTen = false
        }
    }
    $scope.validateemail = function(){
        if($scope.data.email ==""){
            $scope.validate.email = true

        }
        else{
            $scope.validate.email = false
        }
    }
    $scope.validatepassword= function(){
        if($scope.data.password ==""){
            $scope.validate.password = true

        }
        else{
            $scope.validate.password = false
        }
    }
    $scope.validatevaiTro= function(){
        if($scope.data.vaiTro ==""){
            $scope.validate.vaiTro = true

        }
        else{
            $scope.validate.vaiTro = false
        }
    }

 }