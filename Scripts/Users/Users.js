$(function () {

    //$('#TGDaoTaoTu').datetimepicker();
    //$('#TGDaoTaoDen').datetimepicker();

    submit();
    $('#tblDSNV').dataTable({
        "bPaginate": false,
        orderCellsTop: true,
        "scrollY": true,
        "scrollX": true,
        scrollCollapse: false,
        paging: true,
        "order": [0, 'asc'],
        "language": _language
    });
    validationCreate();
    
    //fnNhapMoi();

});


function validationCreate() {
    $('#FromCreateNV').bootstrapValidator({
        // live: 'disabled',
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: 'This value is not valid',
        submitButtons: 'button[id="btnCreateNV"]',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',

        },
        fields: {
            HoTen: {

                validators: {
                    notEmpty: {
                        message: 'Họ tên không được để trống'
                    },

                    //remote: {
                    //    type: 'GET',
                    //    url: '/Validating/IsSupplierExists',
                    //    data: { type: 'Id' },
                    //    message: 'The Id is already in use'
                    //},


                }
            },
            DiaChi: {

                validators: {
                    notEmpty: {
                        message: 'Địa chỉ không được để trống'
                    },

                }
            },
            DienThoai: {

                validators: {
                    notEmpty: {
                        message: 'Điện thoại không được để trống'
                    },

                }
            },
            TGDaoTaoTu: {

                validators: {
                    notEmpty: {
                        message: 'Thời gian bắt đầu đào tạo không được để trống'
                    },
                    date: {
                        format: 'MM/DD/YYYY',
                        message: 'Định dạng ngày chưa đúng',
                    },
                }
            },
            TGDaoTaoDen: {

                validators: {
                    notEmpty: {
                        message: 'Thời gian kết thúc đào tạo không được để trống'
                    },
                    date: {
                        format: 'MM/DD/YYYY',
                        message: 'Định dạng ngày chưa đúng',
                    },
                }
            },
            //Email: {

            //    validators: {
            //        notEmpty: {
            //            message: 'The Email is required and cannot be empty'
            //        },
            //        emailAddress: {
            //            message: 'The input is not a valid email address'
            //        },

            //    }
            //},

        }
    });
  
}

function fnOpenModalThemNV() {
    //$('#titlemodal').html("Thêm nhân viên");
   // CreateNV();
    $('#ModelCreate').modal("show");
 
}
function fnOpenModalSuaNV(id) {
    //$('#titlemodal').html("Sửa thông tin nhân viên");
    EditNV(id);
    $('#ModelEdit').modal("show");
    
}

function formatDate(value) {
    var split = value.split('/');
    if (split.length > 2) {
        return split[2] + "/" + split[0] + "/" + split[1];
    }
    else {
        return value;
    }
}


//function CreateNV() {

//    $.ajax({
//        //data: {id: id},
//        url: "/Users/Create",
//        contentType: 'html',
//        success: function (rs) {
//            $('#divcontent').html(rs);
          
//        },
//        complete: function () {
//            //$('#tblDSCapBac').DataTable();
//            setDatetime();
//        }
//    });
//}
function EditNV(id) {

  

    $.ajax({
        data: {id: id},
        url: "/Users/Edit",
        contentType: 'html',
        success: function (rs) {
            $('#divEditNV').html(rs);
          
        },
        complete: function () {
            //$('#tblDSCapBac').DataTable();
           

            submit();
           
        }
    });
}

function LoadDSNhom() {

    $.ajax({

        url: "/Users/LoadDSNV",
        contentType: 'html',
        success: function (rs) {
            $('#divLoadDSNV').html(rs);
            $('#tblDSNV').dataTable({
                "bPaginate": false,
                orderCellsTop: true,
                "scrollY": true,
                "scrollX": true,
                scrollCollapse: false,
                paging: true,
                "order": [0, 'asc'],
                "language": _language
            });
            //EventClickTableDS();
        },
        complete: function () {
            //$('#tblDSCapBac').DataTable();
        }
    });
}

function fnNhapMoi() {
    $("#HoTen").val('');
    $("#DiaChi").val('');
    $("#DienThoai").val('');
    $("#TGDaoTaoTu").val('');
    $("#TGDaoTaoDen").val('');
}

function submit() {
    // this is the id of the form
    $("#btnCreateNV").click(function (e) {
        console.log('create')
        //e.preventDefault(); // avoid to execute the actual submit of the form.

        //var form = $('#FromCreateNV').serializeArray();
        //var actionUrl = form.attr('action');

        if ($("#FromCreateNV #HoTen").val() == '') {
            alert("Họ tên không được để trống");
            return;
        }

        if ($("#FromCreateNV #DiaChi").val() == '') {
            alert("Địa chỉ không được để trống");
            return;
        }
        if ($("#FromCreateNV #DienThoai").val() == '') {
            alert("Điện thoại không được để trống");
            return;
        }
        if ($("#FromCreateNV #TGDaoTaoTu").val() == '') {
            alert("Thời gian bắt đầu đào tạo không được để trống");
            return;
        }
        if ($("#FromCreateNV #TGDaoTaoDen").val() == '') {
            alert("Thời gian kết thúc đào tạo không được để trống");
            return;
        }

        var NgayTu = formatDate($('#TGDaoTaoTu').val());
        var NgayDen = formatDate($('#TGDaoTaoDen').val());
        var _data = {
            HoTen: $('#HoTen').val(),
            DiaChi: $('#DiaChi').val(),
            DienThoai: $('#DienThoai').val(),
            GioiTinh: $('#GioiTinh').val(),
            TGDaoTaoTu: NgayTu,
            TGDaoTaoDen: NgayDen,
            Lock: $('#Lock').val()
        }
        $.ajax({
            type: "POST",
            url: "/Users/Create",
            data: _data, // serializes the form's elements.
            dataType: 'json',
            success: function (rs) {
                fnMessage(rs.status, rs.message);

                if (rs.status == "done") {
                    LoadDSNhom();
                    fnNhapMoi();
                }
            }
        });

    });

    $("#btnCapNhatNV").click(function (e) {
        console.log('Edit');
        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $('#FromEditNV').serializeArray();
        //var actionUrl = form.attr('action');
        if ($("#FromEditNV #HoTen").val() == '') {
            alert("Họ tên không được để trống");
            return;
        }

        if ($("#FromEditNV #DiaChi").val() == '') {
            alert("Địa chỉ không được để trống");
            return;
        }
        if ($("#FromEditNV #DienThoai").val() == '') {
            alert("Điện thoại không được để trống");
            return;
        }
        if ($("#FromEditNV #TGDaoTaoTu").val() == '') {
            alert("Thời gian bắt đầu đào tạo không được để trống");
            return;
        }
        if ($("#FromEditNV #TGDaoTaoDen").val() == '') {
            alert("Thời gian kết thúc đào tạo không được để trống");
            return;
        }
        var NgayTu = formatDate($('#FromEditNV #TGDaoTaoTu').val());
        var NgayDen = formatDate($('#FromEditNV #TGDaoTaoDen').val());

        var _data = {
            IDUser: $('#IDUser').val(),
            HoTen: $('#HoTen').val(),
            DiaChi: $('#DiaChi').val(),
            DienThoai: $('#DienThoai').val(),
            GioiTinh: $('#GioiTinh').val(),
            TGDaoTaoTu: NgayTu,
            TGDaoTaoDen: NgayDen,
            Lock: $('#Lock').val()
        }
        $.ajax({
            type: "POST",
            url: "/Users/CapNhat",
            data: _data, // serializes the form's elements.
            dataType: 'json',
            success: function (rs) {
                fnMessage(rs.status, rs.message);

                if (rs.status == "done") {
                    LoadDSNhom()
                    fnNhapMoi();
                }
            }
        });

    });

}

