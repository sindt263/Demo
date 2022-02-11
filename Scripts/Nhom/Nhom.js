$(function () {

    Autocomplete();
    submit();

    $('#tblDSNhom').dataTable({
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
    LoadDSNhom();
    
});

function validationCreate() {
    $('#FromCreateCapBac').bootstrapValidator({
        // live: 'disabled',
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: 'This value is not valid',
        submitButtons: 'button[id="btnCreateNhom"]',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',

        },
        fields: {
            TenNhom: {

                validators: {
                    notEmpty: {
                        message: 'Tên nhóm không được để trống'
                    },

                }
            },

        }
    });
}


function LoadDSNhom() {
    $.ajax({
        type: "POST",
        url: "/Nhom/LoadDSNhom",
        //data: { id: _id }, // serializes the form's elements.
        dataType: 'json',
        //contentType: 'json',
        success: function (rs) {
            var html = "";
            if ($.fn.DataTable.isDataTable('#tblDSNhom')) {
                $('#tblDSNhom').DataTable().destroy();
            }

            $.each(rs, function (i, item) {
                html += "<tr id='" + item.IDNhom + "'  Lock='" + item.Lock+"' >";
                html += "<td>" + (i+1) + "</td>";
                html += "<td>" + item.TenNhom + "</td>";
                html += "<td>" + fnNullToString(item.SoThanhVien) + "</td>";
                html += "<td>" + item.GhiChu + "</td>";
                html += "<td>" + (item.Lock == "1" ? "Đã đóng" : "Đang dùng") + "</td>";
                html += "<th>"
                html += "<button type = 'button' class='btn btn-primary' onclick='fnOpenChiTiet(\"" + item.IDNhom + "\");' > Chi tiết</button >";
                html += "</th>";
                html += "</tr>";
            })

            $('#tblDSNhom tbody').html(html);

            $('#tblDSNhom').dataTable({
                "bPaginate": false,
                orderCellsTop: true,
                "scrollY": true,
                "scrollX": true,
                scrollCollapse: false,
                paging: true,
                "order": [0, 'asc'],
                "language": _language
            });
            EventClickTableDS();
        }
    });
}


function LoadDSCapBac() {
    $.ajax({
        type: "POST",
        url: "/Nhom/LoadDSCapBac",
        //data: { id: _id }, // serializes the form's elements.
        dataType: 'json',
        //contentType: 'json',
        success: function (rs) {
            var html = "";
            $.each(rs, function (i, item) {
                html += "<option value='" + item.IDCapBac + "' >" + item.TenCapBac + "</option>";
            })

            $('#slCapBac').html(html);

        }
    });
}
function LoadDSThanhVien(_id) {
    $.ajax({
        type: "POST",
        url: "/Nhom/LoadDSThanhVien",
        data: { id: _id }, // serializes the form's elements.
        dataType: 'html',
        //contentType: 'json',
        success: function (rs) {
            //var html = "";
            //$.each(rs, function (i, item) {
            //    html += "<tr>";
            //    html += "<td>" + (i + 1) + "</td>";
            //    html += "<td>" + item.IDUser + "</td>";
            //    html += "<td>" + item.IDCapBac + "</td>";
            //    html += "<td><button type = 'button' class='btn btn-danger' onclick='fnXoaThanhVien('" + item.AutoID + "');' > Xóa</button></td>";
               
            //    html += "</tr>";
            //})

            $('#divDSThanhVienNhom').html(rs);

        }
    });
}

function fnNhapMoi() {
    $("#TenNhom").val('');
    $("#GhiChu").val('');
    $("#AutoID").val('');
    $("#Lock").val('');


    $('#btnCreateNhom').show();
    $('#btnCapNhat').hide();
}

function submit() {
    // this is the id of the form
    $("#btnCreateNhom").click(function (e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $('#FromCreateNhom').serializeArray();
        //var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: "/Nhom/Create",
            data: form, // serializes the form's elements.
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

    $("#btnCapNhat").click(function (e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $('#FromCreateNhom').serializeArray();
        //var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: "/Nhom/Edit",
            data: form, // serializes the form's elements.
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


function EventClickTableDS() {
    $('#tblDSNhom tbody tr').each(function () {
        $(this).find('td').click(function () {


            $('#IDNhom').val($(this).parent('tr').attr('id'));
            $('#Lock').val($(this).parent('tr').attr('lock').toLowerCase());


            $('#TenNhom').val($(this).parent('tr').find('td:eq(1)').text().trim());
            $('#SoThanhVien').val($(this).parent('tr').find('td:eq(2)').text().trim());
            $('#GhiChu').val($(this).parent('tr').find('td:eq(3)').text().trim());


            $('#btnCreateNhom').hide();
            $('#btnCapNhat').show();
        });
    });
}


function fnOpenChiTiet(id) {
    $('#ModelChiTiet').modal('show')
    LoadDSCapBac();
    LoadDSThanhVien(id);
    $('#IDNhom').val(id);
    
}

function fnADDThanhVIenVaoNhom() {
    var _data = {
        IDUser: $('#IDThanhVien').val(),
        IDCapBac: $('#slCapBac').val(),
        IDNhom: $('#IDNhom').val()
    }
    $.ajax({
        type: "POST",
        url: "/Nhom/AddUserVaoNhom",
        data: _data, // serializes the form's elements.
        dataType: 'json',
        //contentType: 'json',
        success: function (rs) {
          
            if (rs.status == 'done') {
                LoadDSThanhVien($('#IDNhom').val())
                LoadDSNhom()
            } else {
                fnMessage(rs.status, rs.message);
            }
        }
    });
}



function XoaThanhVienNhom(_id) {

    var XN = confirm("Bạn thật sự muốn xóa cấp bậc này !");
    if (XN) {
        //e.preventDefault(); // avoid to execute the actual submit of the form.

        /*  var form = $('#FromCreateCapBac').serializeArray();*/
        //var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: "/Nhom/XoaThanhVien",
            data: { id: _id, idnhom: '' }, // serializes the form's elements.
            dataType: 'json',
            //contentType: 'json',
            success: function (rs) {
                fnMessage(rs.status, rs.message);

                if (rs.status == "done") {
                    LoadDSThanhVien()
                    LoadDSNhom()
                }
            }
        });
    }


}

function Autocomplete() {
    $('#txtTenThanhVien').autocomplete(
        {
            showHeader: true,
            columns: [
                {
                    name: 'NgheNghiep',
                    width: '300px',
                    valueField: 'label'
                }
            ],
            source: function (request, response) {
                var _data = {
                    GiaTri: $('#txtTenThanhVien').val() 
                };
                $.ajax({
                    type: 'POST',
                    url: "/Nhom/AutoComplete",
                    data: _data,
                    dataType: 'json',
                    success: function (rs) {
                        response($.map(rs, function (item) {
                            return {
                                label: item.HoTen + ' (' + item.IDUser + ') ',
                                value: item.HoTen,
                                ID: item.IDUser,

                            };
                        }));
                    }
                });
            },
            max: 0,
            highlight: false,
            scroll: true,
            minLength: 2,
            cacheLength: 10,
            scrollHeight: 10,
            select: function (event, ui) {
                var index = $(this).parents("tr").index() + 1;
                $(this).attr('data-text', ui.item.Ten);
                $(this).val(ui.item.value);
                $('#IDThanhVien').val(ui.item.ID);
                return false;
            }
        });

    //$('#txtHoTenNT').blur(function () {
    //    var $this = $(this);
    //    if ($.trim($this.val()) != $this.attr('data-text')) {
    //        if ($.trim($this.val()) == '') {
    //            $(this).attr('data-text', '');
    //        }
    //        else {
    //            $this.val($this.attr('data-text'));
    //        }
    //    }
    //});
}


function fnNullToString(value) {
    if (value == null) {
        return "";
    } else {
        return value;
    }
}