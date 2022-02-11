namespace Demo.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_Nhom
    {
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public tbl_Nhom()
        //{
        //    tbl_Nhom_ChiTiet = new HashSet<tbl_Nhom_ChiTiet>();
        //}

        [Key]
        public int IDNhom { get; set; }

        [StringLength(50)]
        [Display(Name = "Tên nhóm")]
        public string TenNhom { get; set; }

        [StringLength(4000)]
        [Display(Name = "Ghi chú")]
        public string GhiChu { get; set; }

        [Display(Name = "Số thành viên")]
        public int? SoThanhVien { get; set; }

        [Display(Name = "Trạng thái")]
        public bool? Lock { get; set; }

        [Display(Name = "Ngày thêm")]
        public DateTime? NgayThem { get; set; }


        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<tbl_Nhom_ChiTiet> tbl_Nhom_ChiTiet { get; set; }

        //public virtual tbl_Nhom tbl_Nhom1 { get; set; }

    }
}
