using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace billingWebAPI.Models
{
    public partial class billingDBContext : DbContext
    {
        public billingDBContext()
        {
        }

        public billingDBContext(DbContextOptions<billingDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BillingDetailTb> BillingDetailTbs { get; set; } = null!;
        public virtual DbSet<BillingMasterTb> BillingMasterTbs { get; set; } = null!;
        public virtual DbSet<CategoryTb> CategoryTbs { get; set; } = null!;
        public virtual DbSet<CompanyEmployeeRoleTb> CompanyEmployeeRoleTbs { get; set; } = null!;
        public virtual DbSet<CompanyTb> CompanyTbs { get; set; } = null!;
        public virtual DbSet<CompanyUserTb> CompanyUserTbs { get; set; } = null!;
        public virtual DbSet<FinancialYearTb> FinancialYearTbs { get; set; } = null!;
        public virtual DbSet<GstTb> GstTbs { get; set; } = null!;
        public virtual DbSet<ProductRetailerMasterTb> ProductRetailerMasterTbs { get; set; } = null!;
        public virtual DbSet<ProductSupplierMaster> ProductSupplierMasters { get; set; } = null!;
        public virtual DbSet<ProductTb> ProductTbs { get; set; } = null!;
        public virtual DbSet<SupplierTb> SupplierTbs { get; set; } = null!;
        public virtual DbSet<UsersTb> UsersTbs { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//warningTo protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-FUGQNF4;Initial Catalog=billingDB;Integrated Security=True;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BillingDetailTb>(entity =>
            {
                entity.HasKey(e => e.BillingDetailId)
                    .HasName("PK_billing_detailTb");

                entity.ToTable("BillingDetailTb");

                entity.Property(e => e.BillingDetailId).HasColumnName("billing_detail_id");

                entity.Property(e => e.BillingDate)
                    .HasColumnType("datetime")
                    .HasColumnName("billing_date");

                entity.Property(e => e.BillingId).HasColumnName("billing_id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.GrandTotal).HasColumnName("grand_total");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ProductMeasurement)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_measurement");

                entity.Property(e => e.ProductPriceOn)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_price_on");

                entity.Property(e => e.PurchaseId).HasColumnName("purchase_id");

                entity.Property(e => e.Tax)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("tax");

                entity.Property(e => e.TotalCost).HasColumnName("total_cost");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Billing)
                    .WithMany(p => p.BillingDetailTbs)
                    .HasForeignKey(d => d.BillingId)
                    .HasConstraintName("billingFk");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.BillingDetailTbs)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("company6Fk");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.BillingDetailTbs)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("product5Fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BillingDetailTbs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user5Fk");
            });

            modelBuilder.Entity<BillingMasterTb>(entity =>
            {
                entity.HasKey(e => e.BillingId)
                    .HasName("PK_billing_masterTb");

                entity.ToTable("BillingMasterTb");

                entity.Property(e => e.BillingId).HasColumnName("billing_id");

                entity.Property(e => e.BillDate)
                    .HasColumnType("datetime")
                    .HasColumnName("bill_date");

                entity.Property(e => e.BillingDate)
                    .HasColumnType("datetime")
                    .HasColumnName("billing_date");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("company_name");

                entity.Property(e => e.GrandTotal).HasColumnName("grand_total");

                entity.Property(e => e.GstNo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("gstNo");
            });

            modelBuilder.Entity<CategoryTb>(entity =>
            {
                entity.HasKey(e => e.CategoryId)
                    .HasName("PK_categoryTb");

                entity.ToTable("CategoryTb");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("category_name");

                entity.Property(e => e.Cgst).HasColumnName("cgst");

                entity.Property(e => e.CommonName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("common_name");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.Igst).HasColumnName("igst");

                entity.Property(e => e.Pgst).HasColumnName("pgst");

                entity.Property(e => e.Sgst).HasColumnName("sgst");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CategoryTbs)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("company4Fk");
            });

            modelBuilder.Entity<CompanyEmployeeRoleTb>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PK_companyEmployeeRoleTb");

                entity.ToTable("CompanyEmployeeRoleTb");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<CompanyTb>(entity =>
            {
                entity.HasKey(e => e.CompanyId)
                    .HasName("PK_companyTb");

                entity.ToTable("CompanyTb");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.CompanyAddress)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("company_address");

                entity.Property(e => e.CompanyAdmin)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("company_admin");

                entity.Property(e => e.CompanyAssociation)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("company_association");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("company_name");

                entity.Property(e => e.Gstno)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("GSTno");
            });

            modelBuilder.Entity<CompanyUserTb>(entity =>
            {
                entity.HasKey(e => e.EmpId)
                    .HasName("PK_companyUserTb");

                entity.ToTable("CompanyUserTb");

                entity.Property(e => e.EmpId).HasColumnName("emp_id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyUserTbs)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("company2Fk");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.CompanyUserTbs)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("roleFk");
            });

            modelBuilder.Entity<FinancialYearTb>(entity =>
            {
                entity.HasKey(e => e.YearId)
                    .HasName("PK_financialYearTb");

                entity.ToTable("FinancialYearTb");

                entity.Property(e => e.YearId).HasColumnName("year_id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.IsClosed).HasColumnName("isClosed");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.FinancialYearTbs)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("companyFk");
            });

            modelBuilder.Entity<GstTb>(entity =>
            {
                entity.HasKey(e => e.GstId);

                entity.ToTable("GstTb");

                entity.Property(e => e.GstId).HasColumnName("gst_id");

                entity.Property(e => e.Cgst).HasColumnName("cgst");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.Gstno)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("GSTno");

                entity.Property(e => e.Igst).HasColumnName("igst");

                entity.Property(e => e.Pgst).HasColumnName("pgst");

                entity.Property(e => e.Sgst).HasColumnName("sgst");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.GstTbs)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("company3Fk");
            });

            modelBuilder.Entity<ProductRetailerMasterTb>(entity =>
            {
                entity.HasKey(e => e.ProductRetailerId)
                    .HasName("PK_product_retailer_masterTb");

                entity.ToTable("ProductRetailerMasterTb");

                entity.Property(e => e.ProductRetailerId).HasColumnName("product_retailer_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ProductStock).HasColumnName("product_stock");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductRetailerMasterTbs)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("productFk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ProductRetailerMasterTbs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user2Fk");
            });

            modelBuilder.Entity<ProductSupplierMaster>(entity =>
            {
                entity.HasKey(e => e.ProductSupplierId)
                    .HasName("PK_product_supplier_master");

                entity.ToTable("ProductSupplierMaster");

                entity.Property(e => e.ProductSupplierId).HasColumnName("product_supplier_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.SupplierId).HasColumnName("supplier_id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSupplierMasters)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("product2Fk");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.ProductSupplierMasters)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("supplierFk");
            });

            modelBuilder.Entity<ProductTb>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK_productTb");

                entity.ToTable("ProductTb");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.ProductBrand)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_brand");

                entity.Property(e => e.ProductMeasurement)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_measurement");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_name");

                entity.Property(e => e.ProductPackaging)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_packaging");

                entity.Property(e => e.ProductPriceOn)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_price_on");

                entity.Property(e => e.ProductQuantity)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_quantity");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ProductTbs)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("categoryFk");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.ProductTbs)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("company5Fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ProductTbs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("userFk");
            });

            modelBuilder.Entity<SupplierTb>(entity =>
            {
                entity.HasKey(e => e.SupplierId)
                    .HasName("PK_supplierTb");

                entity.ToTable("SupplierTb");

                entity.Property(e => e.SupplierId).HasColumnName("supplier_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.Contact)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contact");

                entity.Property(e => e.SupplierName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("supplier_name");
            });

            modelBuilder.Entity<UsersTb>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_usersTb");

                entity.ToTable("UsersTb");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Contact)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contact");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.UserType)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("user_type");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
