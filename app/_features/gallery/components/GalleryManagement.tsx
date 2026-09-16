"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  User,
  Sparkles,
  AlertCircle,
  RotateCw,
  ImageIcon,
} from "lucide-react";
import { GalleryItem } from "../types";
import { GalleryItemFormData } from "../schemas/gallery.schema";
import GalleryFormModal from "./GalleryFormModal";
import { useRouter } from "next/navigation";
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getAdminGalleryItems,
} from "../services/gallery.service";
import { poppins, playfair } from "@/_lib/fonts";
import { formatGalleryDate, extractPublicIdFromUrl } from "@/_lib/helpers";
import { deleteAssetByPublicId } from "@/_services/cloudinary.service";

import { TablePagination } from "@/_components/common/table/TablePagination";

interface GalleryManagementProps {
  initialItems: GalleryItem[];
  initialTotal?: number;
  initialPage?: number;
  initialLimit?: number;
  initialTotalPages?: number;
}

const DEFAULT_LIMIT = 6;

export default function GalleryManagement({
  initialItems,
  initialTotal,
  initialPage = 1,
  initialLimit = DEFAULT_LIMIT,
  initialTotalPages,
}: GalleryManagementProps) {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [totalCount, setTotalCount] = useState<number>(
    initialTotal ?? initialItems.length,
  );
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialLimit);
  const [backendTotalPages, setBackendTotalPages] = useState<
    number | undefined
  >(initialTotalPages);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [loadingTargetPage, setLoadingTargetPage] = useState<number | null>(
    null,
  );

  const calculatedTotalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const activeTotalPages = backendTotalPages ?? calculatedTotalPages;

  // Asynchronously fetch items for a specific page and limit from the backend
  const fetchPage = async (page: number, limit: number = pageSize) => {
    if (page < 1) return;
    setIsLoadingPage(true);
    setLoadingTargetPage(page);
    try {
      const res = await getAdminGalleryItems({ page, limit });
      if (res.success && res.data) {
        setItems(res.data.items);
        setCurrentPage(res.data.page ?? page);
        if (typeof res.data.limit === "number") {
          setPageSize(res.data.limit);
        }
        if (typeof res.data.total === "number") {
          setTotalCount(res.data.total);
        }
        if (typeof res.data.totalPages === "number") {
          setBackendTotalPages(res.data.totalPages);
        }
      } else {
        toast.error(res.error || "Failed to load gallery items.");
      }
    } catch {
      toast.error("Failed to load gallery items.");
    } finally {
      setIsLoadingPage(false);
      setLoadingTargetPage(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchPage(newPage, pageSize);
  };

  const handleLimitChange = (newLimit: number) => {
    setPageSize(newLimit);
    fetchPage(1, newLimit);
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const res = await getAdminGalleryItems({
        page: currentPage,
        limit: pageSize,
      });
      if (res.success && res.data) {
        setItems(res.data.items);
        if (typeof res.data.total === "number") {
          setTotalCount(res.data.total);
        }
        if (typeof res.data.totalPages === "number") {
          setBackendTotalPages(res.data.totalPages);
        }
        toast.success("Gallery data refreshed successfully!");
      } else {
        router.refresh();
      }
    } catch {
      router.refresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleFormSubmit = async (data: GalleryItemFormData) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        const id = String(editingItem._id || editingItem.id);
        const oldImageUrl = editingItem.imageUrl || editingItem.src;
        const res = await updateGalleryItem(id, data);
        if (!res.success) {
          throw new Error(res.error || "Failed to update item");
        }

        // Transaction succeeded: clean up previous Cloudinary image if replaced
        if (oldImageUrl && data.imageUrl !== oldImageUrl) {
          const oldPublicId = extractPublicIdFromUrl(oldImageUrl);
          if (oldPublicId) {
            deleteAssetByPublicId(oldPublicId, "image").catch(console.error);
          }
        }

        toast.success("Gallery item updated successfully!");
        setItems((prev) =>
          prev.map((it) =>
            String(it._id || it.id) === id
              ? {
                  ...it,
                  ...data,
                  src: data.imageUrl,
                  artistName: data.artistName,
                }
              : it,
          ),
        );
      } else {
        const res = await createGalleryItem(data);
        if (!res.success || !res.data) {
          throw new Error(res.error || "Failed to create item");
        }
        toast.success("New gallery photo added successfully!");
        setModalOpen(false);
        setEditingItem(null);
        await fetchPage(1, pageSize);
        return;
      }
      setModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An error occurred while saving",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    const id = String(item._id || item.id);
    const confirmed = window.confirm(
      `Are you sure you want to remove "${item.title || "this image"}" from the gallery?`,
    );
    if (!confirmed) return;

    try {
      const res = await toast.promise(
        (async () => {
          const result = await deleteGalleryItem(id);
          if (!result.success) {
            throw new Error(result.error || "Failed to delete gallery item.");
          }
          return result;
        })(),
        {
          pending: "Removing gallery item...",
          success: "Item removed successfully!",
          error: {
            render({ data }: { data: Error }) {
              return data?.message || "Failed to delete gallery item.";
            },
          },
        },
      );

      if (res.success) {
        // Re-fetch the current page from the backend to ensure pagination metadata is exact
        await fetchPage(currentPage, pageSize);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#2d0403] via-[#3a0605] to-[#1f0202] p-6 sm:p-8 text-white shadow-xl border border-amber-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-400" />
              <span>Unified Media Management</span>
            </div>
            <h1
              className={`${playfair.className} text-2xl sm:text-3xl font-bold text-white`}
            >
              Gallery & Moments Management
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Upload and manage photos for both the{" "}
              <strong className="text-amber-200">Homepage</strong> (Captured
              Memories top-6 photo mosaic) and the{" "}
              <strong className="text-amber-200">Event page</strong> (Event
              Gallery slider displaying at most 10 photos).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              aria-label="Refresh gallery data"
              aria-busy={isRefreshing}
              title="Refresh gallery data"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-white/20 hover:border-amber-400/50 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer active:scale-95"
            >
              <RotateCw
                size={16}
                className={`transition-transform duration-500 ${
                  isRefreshing
                    ? "animate-spin text-amber-300"
                    : "text-amber-400"
                }`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-stone-900 shadow-lg hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
            >
              <Plus size={18} />
              <span>Add Photo</span>
            </button>
          </div>
        </div>

        {/* Refresh Syncing Status Bar */}
        {isRefreshing && (
          <div className="relative z-10 mt-4 pt-3 border-t border-white/10 animate-in fade-in duration-200">
            <div className="px-1 pb-1">
              <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200/80">
                <span>Updating list</span>
                <span>Syncing</span>
              </div>
              <div className="table-progress h-1.5 rounded-full bg-white/20" />
            </div>
          </div>
        )}

        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Info Notice for display rules */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-4 flex items-start gap-3.5 text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <span className="font-semibold text-amber-950">
            Display Rule Notice:{" "}
          </span>
          The first <strong>6 images</strong> listed here are featured on the{" "}
          <strong>Home Page</strong> (&ldquo;Captured Memories&rdquo; mosaic),
          while <strong>at most 10 images</strong> appear in the{" "}
          <strong>Event Page</strong> (&ldquo;Event Gallery&rdquo; slider).
        </div>
      </div>

      {/* Cards Grid with Loading Overlay */}
      <div className="relative min-h-75">
        {isLoadingPage && (
          <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center min-h-75 transition-all">
            <RotateCw className="w-8 h-8 text-amber-600 animate-spin mb-2" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Loading page {loadingTargetPage ?? currentPage}...
            </span>
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <ImageIcon size={28} />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">
              No Gallery Photos Found
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Get started by uploading your first photo to feature on the homepage
              and event gallery.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Photo</span>
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${isLoadingPage ? "opacity-40 pointer-events-none" : "opacity-100"}`}
          >
            {items.map((item, pageIndex) => {
              const globalIndex = (currentPage - 1) * pageSize + pageIndex;
              const isFeaturedOnHome = globalIndex < 6;
              const isFeaturedOnEvent = globalIndex < 10;
              return (
                <div
                  key={String(item._id || item.id || globalIndex)}
                  className="group relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  {/* Photo Viewport */}
                  <div className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={item.imageUrl || item.src}
                      alt={item.title || "Gallery image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badge for Display Destinations */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md ${
                          isFeaturedOnHome
                            ? "bg-[#740E0A] text-white border border-amber-400/40"
                            : isFeaturedOnEvent
                            ? "bg-stone-900/80 text-amber-300 border border-amber-400/30"
                            : "bg-black/60 text-stone-400 border border-white/10"
                        }`}
                      >
                        #{globalIndex + 1}{" "}
                        {isFeaturedOnHome
                          ? "Home + Event"
                          : isFeaturedOnEvent
                          ? "Event Only"
                          : "In Reserve"}
                      </span>
                    </div>

                    {/* Category Pill */}
                    {item.category && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-semibold border border-white/10">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3
                        className={`${poppins.className} font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-amber-800 transition-colors`}
                        title={item.title}
                      >
                        {item.title || "Untitled Sacred Moment"}
                      </h3>

                      <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-600">
                        {item.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={13} className="text-amber-700 shrink-0" />
                            <span className="truncate max-w-35">
                              {item.location}
                            </span>
                          </div>
                        )}
                        {item.date && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <Calendar size={13} className="text-slate-400 shrink-0" />
                            <span>{formatGalleryDate(item.date)}</span>
                          </div>
                        )}
                      </div>

                      {item.artistName && (
                        <div className="flex items-center gap-1.5 text-xs text-stone-600 pt-1">
                          <User size={13} className="text-amber-600 shrink-0" />
                          <span className="font-medium truncate">
                            {item.artistName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions: Edit / Delete */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600 font-medium">
                        {isFeaturedOnHome
                          ? "Featured on Homepage"
                          : isFeaturedOnEvent
                          ? "Featured on Event"
                          : "Sacred Memory"}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition cursor-pointer"
                          title="Edit photo details"
                          aria-label="Edit photo"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition cursor-pointer"
                          title="Delete photo"
                          aria-label="Delete photo"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Standard Admin TablePagination Component */}
      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-xs">
        <TablePagination
          page={currentPage}
          total={totalCount}
          limit={pageSize}
          totalPages={activeTotalPages}
          pageSizeOptions={[6, 12, 24]}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>

      {/* Modal Dialog */}
      <GalleryFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
