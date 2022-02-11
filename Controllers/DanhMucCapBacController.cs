using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Demo.Models;

namespace Demo.Controllers
{
    public class DanhMucCapBacController : Controller
    {
        private dataconnect db = new dataconnect();

        // GET: DanhMucCapBac
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoadDS()
        {
           
            return View(db.tbl_DanhMucCapBac.OrderBy(x => x.LevelCapBac).ToList());
            //return Json(result, JsonRequestBehavior.AllowGet);
        }
     

        // GET: DanhMucCapBac/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DanhMucCapBac/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create([Bind(Include = "TenCapBac,GhiChu,Lock,LevelCapBac")] tbl_DanhMucCapBac tbl_DanhMucCapBac)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";
            if (ModelState.IsValid)
            {
                db.tbl_DanhMucCapBac.Add(tbl_DanhMucCapBac);
                db.SaveChanges();

                tb.status = "done";
                tb.message = "Đã thêm thành công";
                return Json(tb, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index");
            }
            return Json(tb, JsonRequestBehavior.AllowGet);
            //return View(tbl_DanhMucCapBac);
        }


        // POST: DanhMucCapBac/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "IDCapBac,TenCapBac,GhiChu,Lock,LevelCapBac")] tbl_DanhMucCapBac tbl_DanhMucCapBac)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";

            if (ModelState.IsValid)
            {
                db.Entry(tbl_DanhMucCapBac).State = EntityState.Modified;
                db.SaveChanges();

                tb.status = "done";
                tb.message = "Cập nhật thành công";
                return Json(tb, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index");
            }

            return Json(tb, JsonRequestBehavior.AllowGet);
            //return View(tbl_DanhMucCapBac);
        }


        public JsonResult XoaCapBac(string id)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";
            try
            {
                tb = db.Database.SqlQuery<ThongBao>("exec sp_XoaCapBac @id=N'"+ id + "'").Single();

              
                return Json(tb, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index");

            }
            catch (Exception ex)
            {
                tb.message = ex.Message;
                return Json(tb, JsonRequestBehavior.AllowGet);
            }


        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
