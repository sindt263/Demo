using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Demo.Models
{
    public partial class dataconnect : DbContext
    {
        public dataconnect()
            : base("name=dataconnect")
        {
        }

        public virtual DbSet<tbl_DanhMucCapBac> tbl_DanhMucCapBac { get; set; }
        public virtual DbSet<tbl_Nhom> tbl_Nhom { get; set; }
        public virtual DbSet<tbl_Nhom_ChiTiet> tbl_Nhom_ChiTiet { get; set; }
        public virtual DbSet<tbl_Users> tbl_Users { get; set; }
        public virtual DbSet<BangDemMaSo> BangDemMaSoes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<tbl_Nhom>()
            //    .HasMany(e => e.tbl_Nhom_ChiTiet)
            //    .WithOptional(e => e.tbl_Nhom)
            //    .HasForeignKey(e => e.IDNhom);

            //modelBuilder.Entity<tbl_Nhom>()
            //    .HasOptional(e => e.tbl_Nhom1)
            //    .WithRequired(e => e.tbl_Nhom2);

            modelBuilder.Entity<tbl_Users>()
                .Property(e => e.IDUser)
                .IsUnicode(false);

            modelBuilder.Entity<BangDemMaSo>()
                .Property(e => e.ID)
                .HasPrecision(18, 0);
        }
    }
}
