using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Demo.Models;

namespace Demo.Controllers
{
    public class NhomController : Controller
    {
        dataconnect db = new dataconnect();
        // GET: Nhom
        public ActionResult Index()
        {
            return View();
        }

        #region Nhom
        public ActionResult Create()
        {
            return View();
        }

        public JsonResult LoadDSNhom()
        {
                      
            var result = db.tbl_Nhom.OrderBy(x => x.IDNhom).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadDSThanhVien(int id)
        {
            var result = db.tbl_Nhom_ChiTiet.Where(x=>x.IDNhom == id).OrderBy(x => x.AutoID).ToList();
            return View(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create([Bind(Include = "TenNhom,GhiChu,Lock")] tbl_Nhom tbl_nhom)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";
            if (ModelState.IsValid)
            {
                
                db.tbl_Nhom.Add(tbl_nhom);
                db.SaveChanges();

                tb.status = "done";
                tb.message = "Đã thêm thành công";
                return Json(tb, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index");
            }
            return Json(tb, JsonRequestBehavior.AllowGet);
            //return View(tbl_DanhMucCapBac);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "IDNhom,TenNhom,SoThanhVien,GhiChu,Lock")] tbl_Nhom tbl_nhom)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";

            if (ModelState.IsValid)
            {
                db.Entry(tbl_nhom).State = EntityState.Modified;
                db.SaveChanges();

                tb.status = "done";
                tb.message = "Cập nhật thành công";
                return Json(tb, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index");
            }

            return Json(tb, JsonRequestBehavior.AllowGet);
            //return View(tbl_DanhMucCapBac);
        }

        [HttpPost]
        public ActionResult AddUserVaoNhom(string IDUser, string IDCapBac, string IDNhom)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";

            if (ModelState.IsValid)
            {
                tb = db.Database.SqlQuery<ThongBao>("exec sp_AddUserVaoNhom @IDUser=N'"+IDUser+"', @IDCapBac=N'"+IDCapBac+ "', @IDNhom=N'" + IDNhom + "'").Single();
                //tb.status = "done";
                //tb.message = "Cập nhật thành công";
                return Json(tb, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index");
            }

            return Json(tb, JsonRequestBehavior.AllowGet);
            //return View(tbl_DanhMucCapBac);
        }

        public JsonResult XoaThanhVien(string id, string idnhom)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";
            try
            {
                tb = db.Database.SqlQuery<ThongBao>("exec sp_XoaThanhVienNhom @id=N'" + id + "', @idnhom=N'" + idnhom + "'").Single();


                return Json(tb, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index");

            }
            catch (Exception ex)
            {
                tb.message = ex.Message;
                return Json(tb, JsonRequestBehavior.AllowGet);
            }


        }

        #endregion

        #region Khác nhóm
        public JsonResult LoadDSCapBac()
        {
            var data = db.tbl_DanhMucCapBac.Where(x=>x.Lock == false).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AutoComplete(string GiaTri)
        {
            var data = db.tbl_Users.Where(oh => oh.HoTen.Contains(GiaTri)).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion


       
    }
}