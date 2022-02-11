$(function () {
   
    
    submitThemCapBac();

    $('#tblDSCapBac').dataTable({
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
    fnNhapMoi();
    EventClickTableDS();
});

function validationCreate() {
    $('#FromCreateCapBac').bootstrapValidator({
        // live: 'disabled',
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: 'This value is not valid',
        submitButtons: 'button[id="btnLuuCapBac"]',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',

        },
        fields: {
            TenCapBac: {

                validators: {
                    notEmpty: {
                        message: 'Tên cấp bậc không được để trống'
                    },

                    //remote: {
                    //    type: 'GET',
                    //    url: '/Validating/IsSupplierExists',
                    //    data: { type: 'Id' },
                    //    message: 'The Id is already in use'
                    //},


                }
            },
            LevelCapBac: {

                validators: {
                    notEmpty: {
                        message: 'Cấp bậc không được để trống'
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

function fnNhapMoi() {
    $("#TenCapBac").val('');
    $("#LevelCapBac").val('');
    $("#GhiChu").val('');
    $("#IDCapBac").val('');
    $("#Lock").val('');


    $('#btnLuuCapBac').show();
    $('#btnCapNhat').hide();
}


function submitThemCapBac() {
    // this is the id of the form
    $("#btnLuuCapBac").click(function (e) {
    
        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $('#FromCreateCapBac').serializeArray();
        //var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: "/DanhMucCapBac/Create",
            data: form, // serializes the form's elements.
            dataType: 'json',
            success: function (rs) {
                fnMessage(rs.status, rs.message);
               
                if (rs.status == "done") {
                    LoadLaiDS()
                    EventClickTableDS();
                    fnNhapMoi();
                }
            }
        });

    });
    // this is the id of the form
    $("#btnCapNhat").click(function (e) {
    
        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $('#FromCreateCapBac').serializeArray();
        //var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: "/DanhMucCapBac/Edit",
            data: form, // serializes the form's elements.
            dataType: 'json',
            success: function (rs) {
                fnMessage(rs.status, rs.message);
               
                if (rs.status == "done") {
                    LoadLaiDS()
                    EventClickTableDS();
                    fnNhapMoi();
                }
            }
        });

    });
}


function XoaCapBac(_id) {

    var XN = confirm("Bạn thật sự muốn xóa cấp bậc này !");
    if (XN) {
        //e.preventDefault(); // avoid to execute the actual submit of the form.

      /*  var form = $('#FromCreateCapBac').serializeArray();*/
        //var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: "/DanhMucCapBac/XoaCapBac",
            data: {id: _id}, // serializes the form's elements.
            dataType: 'json',
            //contentType: 'json',
            success: function (rs) {
                fnMessage(rs.status, rs.message);

                if (rs.status == "done") {
                    LoadLaiDS()
                    EventClickTableDS();
                    
                }
            }
        });
    }
   

}
function LoadLaiDS() {
    
        $.ajax({
            
            url: "/DanhMucCapBac/LoadDS",
            contentType: 'html',
            success: function (rs) {
                $('#divDSCapBac').html(rs);
                EventClickTableDS();
            },
            complete: function () {
                //$('#tblDSCapBac').DataTable();
            }
        });

}

function EventClickTableDS() {
    $('#tblDSCapBac tbody tr').each(function () {
        $(this).find('td').click(function () {

            
            $('#IDCapBac').val($(this).parent('tr').attr('id'));
            $('#Lock').val($(this).parent('tr').attr('lock').toLowerCase());

           
            $('#TenCapBac').val($(this).parent('tr').find('td:eq(1)').text().trim());
            $('#LevelCapBac').val($(this).parent('tr').find('td:eq(4)').text().trim());
            $('#GhiChu').val($(this).parent('tr').find('td:eq(2)').text().trim());
            

            $('#btnLuuCapBac').hide();
            $('#btnCapNhat').show();
        });
    });
}

function fnLuuPhieu() {

    var TenCapBac = $('#divCreateCapBac #TenCapBac').val();
    var LevelCapBac = $('#divCreateCapBac #LevelCapBac').val();

    var re = "";
    re += KiemTraLenght('LevelCapBac'); re += KiemTraNull('LevelCapBac')
    re += KiemTraLenght('LevelCapBac'); re += KiemTraNull('LevelCapBac')

    if (re != '') {
        console.log(re)
        return;
    }

    if ($('#divChiTiet tbody tr').length < 1) {
        alert("Chưa nhập chi tiết phiếu");
        return;
    }


    $.ajax({
        // type: 'POST',
        url: "/Admin/PhieuXuat/CreatePhieuXuat",
        contentType: 'json',
        dataType: 'json',
        data: {
            HoaDonID: HoaDonID
            , HoTenNguoiNhan: HoTenNguoiNhan
            , HoTenKH: HoTenKH
            , IDKH: IDKH
            , Ngay: _ChangeValueDateInsert(Ngay)
            , DiaChi: DiaChi
            , SDT: SDT
            , TongTien: TongTien
            , DaThu: DaThu
            , GhiChu: GhiChu
            , xml: XMlChiTiet()
        },
        success: function (rs) {
            alert(rs[0].status + ' ' + rs[0].message);

        }, error: function () {
            //alert("Lổi");
        }, complete: function () {
            fnNhapMoiChiTiet();

        }
    });
}