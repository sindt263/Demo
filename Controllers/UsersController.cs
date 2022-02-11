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
    public class UsersController : Controller
    {
        private dataconnect db = new dataconnect();

        // GET: Users
        public ActionResult Index()
        {
            return View(db.tbl_Users.ToList());
        }
        public ActionResult LoadDSNV()
        {
           
            return View(db.tbl_Users.ToList());
        }

        // GET: Users/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbl_Users tbl_Users = db.tbl_Users.Find(id);
            if (tbl_Users == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Users);
        }

        // GET: Users/Create
        public ActionResult Create()
        {
            return View();
        }

        public string TaoMaNhanVien(string KyTu)
        {
            return db.Database.SqlQuery<string>("exec spTaoMaNV '"+ KyTu + "'").Single();
        }

        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Create(string HoTen, string DiaChi, string DienThoai, string GioiTinh, string TGDaoTaoTu, string TGDaoTaoDen, string Lock)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";

            if (ModelState.IsValid)
            {
                //tbl_Users.IDUser = TaoMaNhanVien("NV");
                //db.tbl_Users.Add(tbl_Users);
                //db.SaveChanges();

                tb = db.Database.SqlQuery<ThongBao>("exec spTaoMaNV N'"+ HoTen + "', N'"+ DiaChi + "', N'"+ DienThoai + "', N'"+ GioiTinh + "', N'"+ TGDaoTaoTu + "', N'"+ TGDaoTaoDen + "', N'"+ Lock + "'").Single();

              
                return Json(tb, JsonRequestBehavior.AllowGet);
            }

            return Json(tb, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult CapNhat(string IDUser, string HoTen, string DiaChi, string DienThoai, string GioiTinh, string TGDaoTaoTu, string TGDaoTaoDen, string Lock)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";

            if (ModelState.IsValid)
            {
                //tbl_Users.IDUser = TaoMaNhanVien("NV");
                //db.tbl_Users.Add(tbl_Users);
                //db.SaveChanges();

                tb = db.Database.SqlQuery<ThongBao>("exec spCapNhatMaNV N'"+ IDUser + "', N'"+ HoTen + "', N'"+ DiaChi + "', N'"+ DienThoai + "', N'"+ GioiTinh + "', N'"+ TGDaoTaoTu + "', N'"+ TGDaoTaoDen + "', N'"+ Lock + "'").Single();


                return RedirectToAction("Index");
            }

            return RedirectToAction("Index");
        }

        // GET: Users/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbl_Users tbl_Users = db.tbl_Users.Find(id);
            if (tbl_Users == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Users);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "IDUser,HoTen,DiaChi,DienThoai,GioiTinh,TGDaoTaoTu,TGDaoTaoDen,Lock")] tbl_Users tbl_Users)
        {
            ThongBao tb = new ThongBao();

            tb.status = "error";
            tb.message = "Chưa thêm được";
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Users).State = EntityState.Modified;
                db.SaveChanges();
                tb.status = "done";
                tb.message = "Cập nhật thành công";
                return Json(tb, JsonRequestBehavior.AllowGet);

                //return RedirectToAction("Index");
            }
            return Json(tb, JsonRequestBehavior.AllowGet);
            //return View(tbl_Users);
        }

        // GET: Users/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbl_Users tbl_Users = db.tbl_Users.Find(id);
            if (tbl_Users == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Users);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            tbl_Users tbl_Users = db.tbl_Users.Find(id);
            db.tbl_Users.Remove(tbl_Users);
            db.SaveChanges();
            return RedirectToAction("Index");
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
