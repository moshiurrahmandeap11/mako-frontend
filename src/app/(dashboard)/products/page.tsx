'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Trash2,
  Package,
  Check,
  FileSpreadsheet,
  Download,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { fetchApi } from '@/lib/api-client';
import Button from '@/components/Button';
import { TableRowSkeleton } from '@/components/Skeleton';
import swal from '@/lib/swal';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Add Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    externalId: '',
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    imageUrl: '',
    productUrl: '',
    category: '',
    inStock: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Excel Bulk Import Modal State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isDraggingExcel, setIsDraggingExcel] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchApi(`/api/products?page=${page}&limit=10&search=${encodeURIComponent(search)}`);
      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');
    setSubmitting(true);

    try {
      await fetchApi('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });
      setShowAddModal(false);
      setFormData({
        externalId: '',
        title: '',
        description: '',
        price: '',
        currency: 'USD',
        imageUrl: '',
        productUrl: '',
        category: '',
        inStock: true,
      });
      loadProducts();
    } catch (err: any) {
      setModalError(err.message || 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const result = await swal.fire({
      icon: 'warning',
      title: 'Delete Product?',
      text: 'This will remove the product and its pgvector embedding.',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;

    try {
      await fetchApi(`/api/products/${id}`, { method: 'DELETE' });
      loadProducts();
      swal.fire({
        icon: 'success',
        title: 'Product Deleted',
        text: 'The product has been removed from catalog.',
        confirmButtonText: 'OK',
        timer: 2000,
      });
    } catch (err: any) {
      swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: err.message || 'Failed to delete product',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDownloadSampleExcel = () => {
    const sampleData = [
      {
        externalId: 'PROD-001',
        title: 'Wireless Active Noise-Cancelling Headphones',
        description: 'Over-ear Bluetooth headphones with 30-hour battery life and spatial audio.',
        price: 199.99,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        productUrl: 'https://mystore.com/products/wireless-headphones',
        category: 'Audio & Electronics',
        inStock: 'TRUE',
      },
      {
        externalId: 'PROD-002',
        title: 'Smart Fitness Tracker & Heart Rate Monitor',
        description: 'Waterproof sports watch with step counter, sleep tracking, and OLED touch display.',
        price: 49.99,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        productUrl: 'https://mystore.com/products/fitness-tracker',
        category: 'Wearables',
        inStock: 'TRUE',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'labto_ai_products_sample.xlsx');
  };

  const handleExcelImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFile) return;

    setImporting(true);
    setImportResult(null);

    try {
      const buffer = await importFile.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      if (!rows || rows.length === 0) {
        throw new Error('Spreadsheet contains no product rows or has invalid headers.');
      }

      const productsToImport = rows.map((r) => ({
        externalId: String(r.externalId || r.SKU || r.id || `EXT_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`).trim(),
        title: String(r.title || r.name || r.Title || 'Untitled Product').trim(),
        description: String(r.description || r.Description || '').trim(),
        price: parseFloat(r.price || r.Price || 0),
        currency: String(r.currency || r.Currency || 'USD').toUpperCase().trim(),
        imageUrl: String(r.imageUrl || r.image_url || r.image || '').trim(),
        productUrl: String(r.productUrl || r.product_url || r.url || 'https://mystore.com').trim(),
        category: String(r.category || r.Category || 'General').trim(),
        inStock: String(r.inStock || r.in_stock || 'TRUE').toUpperCase() !== 'FALSE',
      }));

      const res = await fetchApi('/api/products/import', {
        method: 'POST',
        body: JSON.stringify({ products: productsToImport }),
      });

      setImportResult(res);
      loadProducts();
    } catch (err: any) {
      swal.fire({
        icon: 'error',
        title: 'Import Failed',
        text: err.message || 'Failed to parse Excel file. Please download and check the sample template.',
        confirmButtonText: 'OK',
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#222325] tracking-tight">Product Catalog</h1>
          <p className="text-[#62646A] text-xs mt-1">Manage catalog items available for Labto AI recommendations</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setShowImportModal(true)} variant="outline" className="text-[#222325] border-[#E4E5E7] hover:bg-slate-50">
            <span className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#1DBF73]" />
              <span>Bulk Excel / CSV Import</span>
            </span>
          </Button>

          <Button onClick={() => setShowAddModal(true)} variant="primary">
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </span>
          </Button>
        </div>
      </div>

      {/* Search Input Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#74767E] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products by title, category, or description..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-11 pr-4 py-3 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73] shadow-sm transition"
        />
      </div>

      {/* Product Table List */}
      <div className="bg-white border border-[#E4E5E7] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E5E7] bg-[#F7F7F7] text-[10px] font-bold text-[#74767E] uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">External SKU</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7] text-sm text-[#404145]">
              {loading ? (
                <>
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                </>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#74767E] text-xs">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#1DBF73]" />
                    No products found in catalog. Add your first item or upload an Excel/CSV spreadsheet!
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F7F7F7] transition">
                    <td className="py-4 px-6 flex items-center gap-3">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-[#E4E5E7]" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-[#E4E5E7] flex items-center justify-center text-[#74767E] text-xs">
                          📦
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[#222325] text-sm line-clamp-1">{p.title}</p>
                        <a href={p.productUrl} target="_blank" rel="noreferrer" className="text-xs text-[#1DBF73] hover:underline line-clamp-1 font-medium">
                          {p.productUrl}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-[#F7F7F7] text-[#404145] border border-[#E4E5E7]">
                        {p.category || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#222325]">
                      ${Number(p.price).toFixed(2)} {p.currency}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${p.inStock ? 'bg-[#E8F8F0] text-[#1DBF73] border border-[#1DBF73]/20' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-[#1DBF73]' : 'bg-rose-500'}`} />
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-[#74767E]">{p.externalId}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-[#74767E] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#E4E5E7] flex items-center justify-between text-xs text-[#74767E]">
            <span>Page {page} of {totalPages}</span>
            <div className="space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 rounded bg-white border border-[#E4E5E7] disabled:opacity-50 text-[#222325] font-semibold hover:bg-[#F7F7F7]"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 rounded bg-white border border-[#E4E5E7] disabled:opacity-50 text-[#222325] font-semibold hover:bg-[#F7F7F7]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E4E5E7] rounded-2xl p-6 w-full max-w-xl shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-[#222325]">Add New Product</h2>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-1">SKU / External ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.externalId}
                    onChange={(e) => setFormData({ ...formData, externalId: e.target.value })}
                    placeholder="PROD-001"
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Wireless Headphones"
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99.99"
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Electronics"
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-1">Product Page Link (URL) *</label>
                <input
                  type="url"
                  required
                  value={formData.productUrl}
                  onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                  placeholder="https://myshop.com/products/headphones"
                  className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-1">Image Thumbnail Link (URL)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://myshop.com/images/headphones.jpg"
                  className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Premium active noise cancelling bluetooth headphones..."
                  className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E4E5E7]">
                <Button type="button" onClick={() => setShowAddModal(false)} variant="outline" className="text-[#222325] border-[#E4E5E7]">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} variant="primary">
                  {submitting ? 'Saving...' : 'Create Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Excel / CSV Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E4E5E7] rounded-2xl p-6 w-full max-w-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#222325] flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#1DBF73]" />
                  <span>Bulk Excel / CSV Product Import</span>
                </h2>
                <p className="text-[#62646A] text-xs mt-1">Upload an Excel (.xlsx, .xls) or CSV spreadsheet to populate your catalog:</p>
              </div>

              <button
                type="button"
                onClick={handleDownloadSampleExcel}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8F8F0] hover:bg-[#d5f3e4] text-xs font-bold text-[#1DBF73] border border-[#1DBF73]/20 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Sample Template</span>
              </button>
            </div>

            {importResult && (
              <div className="p-3 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/30 text-[#1DBF73] text-xs flex items-center gap-2 font-bold">
                <Check className="w-4 h-4" />
                <span>Import complete! Processed: {importResult.totalProcessed} (Created: {importResult.createdCount}, Updated: {importResult.updatedCount})</span>
              </div>
            )}

            <form onSubmit={handleExcelImport} className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingExcel(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDraggingExcel(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingExcel(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setImportFile(e.dataTransfer.files[0]);
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
                  isDraggingExcel
                    ? 'border-[#1DBF73] bg-[#E8F8F0] scale-[1.01]'
                    : 'border-[#E4E5E7] hover:border-[#1DBF73] bg-[#F7F7F7]'
                }`}
              >
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="excelFileInput"
                />
                <label htmlFor="excelFileInput" className="cursor-pointer space-y-2 block">
                  <FileSpreadsheet className={`w-12 h-12 mx-auto transition ${isDraggingExcel ? 'text-[#1DBF73] scale-110' : 'text-[#1DBF73] opacity-80'}`} />
                  <p className="text-sm font-semibold text-[#222325]">
                    {importFile ? importFile.name : isDraggingExcel ? 'Drop your Excel file here!' : 'Click or Drag & Drop Excel / CSV file here'}
                  </p>
                  <p className="text-xs text-[#74767E]">Supports .xlsx, .xls, .csv files up to 10MB</p>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-[#E4E5E7]">
                <Button
                  type="button"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportFile(null);
                    setImportResult(null);
                  }}
                  variant="outline"
                  className="text-[#222325] border-[#E4E5E7]"
                >
                  Close
                </Button>
                <Button type="submit" disabled={importing || !importFile} variant="primary">
                  {importing ? 'Processing & Vectorizing...' : 'Upload & Import'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
