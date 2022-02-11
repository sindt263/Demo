
$(function () {
    setDatetime();
});

function setDatetime() {
    $('.NgayThangNam')
        .datepicker({
            format: 'MM/dd/yyyy',
            // startDate: '01/01/2010',
            //endDate: '12/30/2020'
        })
        .on('changeDate', function (e) {
            $('.datepicker').hide();
            // Revalidate the date field
            //$('#NgayHoaDon').formValidation('date');
            fv.revalidateField('date');
        });
}

//-----------------------------------------------//
//Loại bỏ ký tự đặt biệt(sử dụng khi lưu dữ liệu tránh phát sinh lỗi
String.prototype.escapeSpecialChars = function () {
    return this.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
};

_language = { sProcessing: "Đang xử lý...", sLengthMenu: "Xem _MENU_ mục", sZeroRecords: "Không có dữ liệu", sInfo: "Đang xem _START_ đến _END_ (Tổng số: _TOTAL_)", sInfoEmpty: "Đang xem 0 đến 0 trong tổng số 0 mục", sInfoFiltered: "(được lọc từ _MAX_ mục)", sInfoPostFix: "", sSearch: "Tìm:", sUrl: "", oPaginate: { sFirst: "Đầu", sPrevious: "Trước", sNext: "Tiếp", sLast: "Cuối" }, select: { rows: "Đã chọn: %d" }, emptyTable: "Không có dữ liệu" }
//$.extend(true, $.fn.dataTable.defaults, {
//    "language": _language
//});
     

function fnMessage(status, message) {
    var icon = ''
    if (status.trim() == 'done') {
        icon = 'Thành công';
    }

    if (status.trim() == 'error') {
        icon = 'Chưa thành công';
    }
    $('#ModelThongBao_title').html(icon+ ' '+status)
    $('#ModelThongBao_message').html(message)

    $('#ModelThongBao').modal('show');
}