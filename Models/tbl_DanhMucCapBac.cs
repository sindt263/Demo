namespace Demo.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_DanhMucCapBac
    {
        [Key]
        [Display(Name ="Mã cấp bậc")]
        public int IDCapBac { get; set; }

        [StringLength(100)]
        [Display(Name = "Tên cấp bậc")]
        [Required(ErrorMessage = "Không được bỏ trống tên cấp bậc")]
        public string TenCapBac { get; set; }

        [StringLength(500)]
        [Display(Name = "Ghi chú")]
        public string GhiChu { get; set; }

        [Display(Name = "Khóa")]
        public bool? Lock { get; set; }

        [Display(Name = "Cấp bậc")]
        [Required(ErrorMessage = "Không được trường cấp bậc")]
        public int? LevelCapBac { get; set; }
    }
}
