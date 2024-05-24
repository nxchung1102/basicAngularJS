window.SanPhamController = function ($scope, $http, $location, $routeParams) {
    var url = "http://localhost:3000/sanpham"

    $scope.lstSanPham = []
    $http.get(url)
        .then(function (response) {
            $scope.lstSanPham = response.data
            console.log("mảng sản phẩm : "+ response.data)
        })
        .catch(function (error) {
            console.log("lỗi API")
        })
    $scope.data = {
        name: "",
        gia: "",
        moTa: ""
    }

    $scope.editing = false;
    $scope.currentIndex = null;

    $scope.save = function () {
        if(checkEmpty()){
        let data = angular.copy($scope.data);
        console.log("add" + data)
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
        } 
    else {
            // Cập nhật nếu đang ở chế độ sửa
            let link = url + "/" + $scope.lstSanPham[$scope.currentIndex].id;
            $http.patch(link, data)
                .then(function (response) {
                    alert("Sửa thành công");
                    $scope.loadData();
                    $scope.clearForm();
                })
                .catch(function (error) {
                    console.log("Lỗi API");
                });
        }
    }
    };
    $scope.update = function (value) {
        // Đặt thông tin của bản ghi vào form khi nhấn nút "Sửa"
        $scope.data= angular.copy(value);
        $scope.editing = true;
        $scope.currentIndex = $scope.lstSanPham.indexOf(value);
    };



    //xoá post
    $scope.delete = function (id) {
        let check = confirm("Bạn có muốn xoá không ? ")
        if (check) {
            let link = url + "/" + id
            $http.delete(link)
                .then(function (response) {
                    alert("Xoá thành công")
                })
                .catch(function (error) {
                    alert("Lỗi API")
                })

        }

    }




    $scope.loadData = function () {
        // Tải lại dữ liệu từ server
        $http.get(url)
            .then(function (response) {
                $scope.lstSanPham = response.data;
            })
            .catch(function (error) {
                console.log("Lỗi API");
            });
    };
    $scope.clearForm = function () {
        // Đặt lại form và biến trạng thái sửa
        $scope.data = {
            name: "",
            gia: "",
            moTa: ""
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

    $scope.minGia=null
    $scope.maxGia=null
    
    $scope.validate={
        name:false,
        gia:false,
        moTa:false

    }

    function checkEmpty(){
        let check = true
        if($scope.data.name ==""){
            $scope.validate.name = true
            check = false
        }
        if($scope.data.gia ==""){
            $scope.validate.gia = true
            check = false
        }
        if($scope.data.moTa ==""){
            $scope.validate.moTa = true
            check = false
        }
        return check
    }

    $scope.validatename = function(){
        if($scope.data.name ==""){
            $scope.validate.name = true

        }
        else{
            $scope.validate.name = false
        }
    }
    $scope.validategia = function(){
        if($scope.data.gia ==""){
            $scope.validate.gia = true

        }
        else{
            $scope.validate.gia = false
        }
    }
    $scope.validatemoTa= function(){
        if($scope.data.moTa ==""){
            $scope.validate.moTa = true

        }
        else{
            $scope.validate.moTa = false
        }
    }
}
