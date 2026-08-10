'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Upload,
  Search,
  Trash2,
  Package,
  Check,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import Button from '@/components/Button';
import { TableRowSkeleton } from '@/components/Skeleton';

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

  // Bulk Import Modal State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
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
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetchApi(`/api/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setImporting(true);
    setImportResult(null);

    try {
      const parsedArray = JSON.parse(importJsonText);
      const res = await fetchApi('/api/products/import', {
        method: 'POST',
        body: JSON.stringify({ products: parsedArray }),
      });
      setImportResult(res);
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Invalid JSON input array format');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Product Catalog</h1>
          <p className="text-slate-400 text-xs mt-1">Manage catalog items available for Labto AI recommendations</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setShowImportModal(true)} variant="outline">
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Bulk JSON Import</span>
            </span>
          </Button>

          <Button onClick={() => setShowAddModal(true)} variant="filled">
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </span>
          </Button>
        </div>
      </div>

      {/* Search Input Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products by title, category, or description..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
        />
      </div>

      {/* Product Table List */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">External SKU</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
              {loading ? (
                <>
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                </>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500 text-xs">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-500" />
                    No products found in catalog. Add your first item or upload a JSON feed!
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-850/40 transition">
                    <td className="py-4 px-6 flex items-center gap-3">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 text-xs">
                          📦
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-white text-sm line-clamp-1">{p.title}</p>
                        <a href={p.productUrl} target="_blank" rel="noreferrer" className="text-xs text-amber-500 hover:underline line-clamp-1 font-medium">
                          {p.productUrl}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800">
                        {p.category || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      ${Number(p.price).toFixed(2)} {p.currency}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${p.inStock ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">{p.externalId}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
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
          <div className="p-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Page {page} of {totalPages}</span>
            <div className="space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 disabled:opacity-50 text-white font-medium"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 disabled:opacity-50 text-white font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-xl shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">Add New Product</h2>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">SKU / External ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.externalId}
                    onChange={(e) => setFormData({ ...formData, externalId: e.target.value })}
                    placeholder="PROD-001"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Wireless Headphones"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99.99"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Electronics"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Product Page Link (URL) *</label>
                <input
                  type="url"
                  required
                  value={formData.productUrl}
                  onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                  placeholder="https://myshop.com/products/headphones"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Image Thumbnail Link (URL)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://myshop.com/images/headphones.jpg"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Premium active noise cancelling bluetooth headphones..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button type="button" onClick={() => setShowAddModal(false)} variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} variant="filled">
                  {submitting ? 'Saving...' : 'Create Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk JSON Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">Bulk Import Products (JSON Feed)</h2>
            <p className="text-slate-400 text-xs">Paste an array of product JSON objects matching your catalog schema:</p>

            {importResult && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Import successful! Processed: {importResult.totalProcessed} (Created: {importResult.createdCount}, Updated: {importResult.updatedCount})</span>
              </div>
            )}

            <form onSubmit={handleBulkImport} className="space-y-4">
              <textarea
                rows={10}
                required
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder={`[
  {
    "externalId": "SKU-100",
    "title": "Classic White T-Shirt",
    "description": "100% organic cotton t-shirt",
    "price": 29.99,
    "productUrl": "https://mystore.com/products/white-tshirt",
    "category": "Apparel"
  }
]`}
                className="w-full p-3 font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportResult(null);
                  }}
                  variant="outline"
                >
                  Close
                </Button>
                <Button type="submit" disabled={importing} variant="filled">
                  {importing ? 'Importing...' : 'Start Import'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
