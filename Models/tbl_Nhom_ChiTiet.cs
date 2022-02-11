namespace Demo.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_Nhom_ChiTiet
    {
        [Key]
        public int AutoID { get; set; }

        [StringLength(50)]
        [Display(Name = "Mã nhân viên")]
        public string IDUser { get; set; }

        [Display(Name = "Mã nhóm")]
        public int? IDNhom { get; set; }


        [Display(Name = "Mã cấp bậc")]
        public int? IDCapBac { get; set; }

        public virtual tbl_Nhom tbl_Nhom { get; set; }

        public virtual tbl_Users tbl_Users { get; set; }
        public virtual tbl_DanhMucCapBac Tbl_DanhMucCapBac { get; set; }
    }
}
