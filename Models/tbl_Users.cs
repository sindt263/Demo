namespace Demo.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_Users
    {
        [Key]
        [StringLength(15)]
        [Display(Name = "Mã nhân viên")]
        public string IDUser { get; set; }

        [StringLength(100)]
        [Display(Name = "Họ tên")]
        public string HoTen { get; set; }

        [StringLength(500)]
        [Display(Name = "Địa chỉ")]
        public string DiaChi { get; set; }

        [StringLength(15)]
        [Display(Name = "Điện thoại")]
        public string DienThoai { get; set; }

        [Display(Name = "Giới tính")]
        public bool? GioiTinh { get; set; }

        [Display(Name = "Đào tạo từ")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime TGDaoTaoTu { get; set; }

        [Display(Name = "Đào tạo đến")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime TGDaoTaoDen { get; set; }

        [Display(Name = "Trạng thái")]
        public bool? Lock { get; set; }

        [Display(Name = "Thời gian thêm")]
        public DateTime? TGThem { get; set; }
    }
}
