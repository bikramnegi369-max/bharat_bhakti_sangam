"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  User,
  Sparkles,
  RotateCw,
  Play,
  Film,
  Star,
  ExternalLink,
} from "lucide-react";
import { VideoReviewItem } from "../types";
import { VideoReviewFormData } from "../schemas/video-review.schema";
import VideoReviewFormModal from "./VideoReviewFormModal";
import { useRouter } from "next/navigation";
import {
  createVideoReview,
  updateVideoReview,
  deleteVideoReview,
  getAdminVideoReviews,
} from "../services/video-reviews.service";
import { derivePosterFromVideoUrl } from "../utils";
import { playfair } from "@/_lib/fonts";
import { extractPublicIdFromUrl } from "@/_lib/helpers";
import { deleteAssetByPublicId } from "@/_services/cloudinary.service";
import { TablePagination } from "@/_components/common/table/TablePagination";
import VideoReviewModal from "@/_components/sections/Marketing/Home/VideoReviewModal";

interface VideoReviewsManagementProps {
  initialItems: VideoReviewItem[];
  initialTotal?: number;
  initialPage?: number;
  initialLimit?: number;
  initialTotalPages?: number;
}

const DEFAULT_LIMIT = 6;

export default function VideoReviewsManagement({
  initialItems,
  initialTotal,
  initialPage = 1,
  initialLimit = DEFAULT_LIMIT,
  initialTotalPages,
}: VideoReviewsManagementProps) {
  const router = useRouter();
  const [items, setItems] = useState<VideoReviewItem[]>(initialItems);
  const [totalCount, setTotalCount] = useState<number>(
    initialTotal ?? initialItems.length,
  );
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialLimit);
  const [backendTotalPages, setBackendTotalPages] = useState<
    number | undefined
  >(initialTotalPages);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VideoReviewItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  // Video Preview Lightbox modal state
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const calculatedTotalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const activeTotalPages = backendTotalPages ?? calculatedTotalPages;

  const fetchPage = async (page: number, limit: number = pageSize) => {
    if (page < 1) return;
    setIsLoadingPage(true);
    try {
      const res = await getAdminVideoReviews({ page, limit });
      if (res.success && res.data) {
        setItems(res.data.items);
        setCurrentPage(res.data.page ?? page);
        if (typeof res.data.limit === "number") setPageSize(res.data.limit);
        if (typeof res.data.total === "number") setTotalCount(res.data.total);
        if (typeof res.data.totalPages === "number")
          setBackendTotalPages(res.data.totalPages);
      } else {
        toast.error(res.error || "Failed to load video reviews.");
      }
    } catch {
      toast.error("Failed to load video reviews.");
    } finally {
      setIsLoadingPage(false);
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
      const res = await getAdminVideoReviews({
        page: currentPage,
        limit: pageSize,
      });
      if (res.success && res.data) {
        setItems(res.data.items);
        if (typeof res.data.total === "number") setTotalCount(res.data.total);
        if (typeof res.data.totalPages === "number")
          setBackendTotalPages(res.data.totalPages);
        toast.success("Video reviews refreshed successfully!");
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

  const handleOpenEdit = (item: VideoReviewItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleFormSubmit = async (data: VideoReviewFormData) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        const id = String(editingItem._id || editingItem.id);
        const oldHighlight = editingItem.highlightVideoSrc;
        const oldVideo = editingItem.videoSrc;
        const oldPoster = editingItem.posterSrc;

        const res = await updateVideoReview(id, data);
        if (!res.success) {
          throw new Error(res.error || "Failed to update video review");
        }

        // Transaction succeeded: clean up replaced assets on Cloudinary
        // 1. Clean up old highlight video if changed
        if (oldHighlight && data.highlightVideoSrc !== oldHighlight) {
          const oldHighlightId = extractPublicIdFromUrl(oldHighlight);
          if (oldHighlightId) {
            deleteAssetByPublicId(oldHighlightId, "video").catch(console.error);
          }
        }

        // 2. Clean up old full review video if changed
        if (oldVideo && data.videoSrc !== oldVideo) {
          const oldVideoId = extractPublicIdFromUrl(oldVideo);
          if (oldVideoId) {
            deleteAssetByPublicId(oldVideoId, "video").catch(console.error);
          }
        }

        // 3. Clean up custom poster if changed or removed
        if (oldPoster && data.posterSrc !== oldPoster) {
          const oldPosterId = extractPublicIdFromUrl(oldPoster);
          if (oldPosterId) {
            deleteAssetByPublicId(oldPosterId, "image").catch(console.error);
          }
        }

        toast.success("Video review updated successfully!");
        setItems((prev) =>
          prev.map((it) =>
            String(it._id || it.id) === id
              ? {
                  ...it,
                  ...data,
                  posterSrc:
                    data.posterSrc ||
                    derivePosterFromVideoUrl(
                      data.highlightVideoSrc || data.videoSrc,
                    ),
                }
              : it,
          ),
        );
      } else {
        const res = await createVideoReview(data);
        if (!res.success || !res.data) {
          throw new Error(res.error || "Failed to create video review");
        }
        toast.success("New video review added successfully!");
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

  const handleDelete = async (item: VideoReviewItem) => {
    const id = String(item._id || item.id);
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title || "this video review"}"?`,
    );
    if (!confirmed) return;

    try {
      const res = await toast.promise(
        (async () => {
          const result = await deleteVideoReview(id);
          if (!result.success) {
            throw new Error(result.error || "Failed to delete video review.");
          }
          return result;
        })(),
        {
          pending: "Deleting video review...",
          success: "Review deleted successfully!",
          error: {
            render({ data }: { data: Error }) {
              return data?.message || "Failed to delete video review.";
            },
          },
        },
      );

      if (res.success) {
        await fetchPage(currentPage, pageSize);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleOpenPreview = (index: number) => {
    setPreviewIndex(index);
    setPreviewModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#2d0403] via-[#3a0605] to-[#1f0202] p-6 sm:p-8 text-white shadow-xl border border-amber-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-400" />
              <span>Homepage Experience Reviews</span>
            </div>
            <h1
              className={`${playfair.className} text-2xl sm:text-3xl font-bold text-white`}
            >
              Divine Video Reviews Management
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Manage devotee reviews and video testimonials featured on the
              homepage. Each review card autoplays a short looping highlight
              video, and devotees can click to play the full review in HD.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 text-sm font-semibold text-white border border-white/15 backdrop-blur-md transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <ExternalLink size={16} className="text-amber-400" />
              <span>View Live Home</span>
            </a>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              aria-label="Refresh video reviews data"
              aria-busy={isRefreshing}
              title="Refresh video reviews data"
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
              <span>Add Video Review</span>
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
      </div>

      {/* Reviews Cards Grid */}
      <div className="relative min-h-75">
        {isLoadingPage && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs z-20 flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-2 text-stone-600">
              <RotateCw size={28} className="animate-spin text-amber-600" />
              <span className="text-xs font-medium">Loading page data...</span>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Film size={28} />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">
              No Video Reviews Found
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Get started by adding your first devotee video review with an
              autoplay highlight clip.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Video Review</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((review, idx) => {
              const displayPoster =
                review.posterSrc ||
                derivePosterFromVideoUrl(
                  review.highlightVideoSrc || review.videoSrc,
                );
              const displayName = review.reviewerName?.trim() || "Anonymous";

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Top Preview Screen: Plays highlight video with play button on top */}
                  <div
                    onClick={() => handleOpenPreview(idx)}
                    className="relative aspect-9/16 w-full max-h-72 bg-stone-950 overflow-hidden cursor-pointer"
                  >
                    {review.highlightVideoSrc ? (
                      <video
                        src={review.highlightVideoSrc}
                        muted
                        loop
                        autoPlay
                        playsInline
                        poster={displayPoster}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Image
                        src={displayPoster}
                        alt={review.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Play Badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#E8C267]/90 text-[#2E0403] flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform">
                        <Play size={20} className="fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Rating Stars top right */}
                    {review.rating && (
                      <div className="absolute top-3 right-3 flex items-center gap-0.5 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-full border border-white/20">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            className="fill-[#E8C267] text-[#E8C267]"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4
                        className={`${playfair.className} text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2`}
                      >
                        {review.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                        <span className="flex items-center gap-1 font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <User size={13} className="text-amber-600" />
                          <span>{displayName}</span>
                        </span>

                        {review.location && (
                          <span className="flex items-center gap-1 text-stone-500">
                            <MapPin size={13} className="text-stone-400" />
                            <span>{review.location}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenPreview(idx)}
                        className="text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Play size={13} className="fill-current" />
                        <span>Watch Review</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(review)}
                          className="p-2 rounded-lg text-stone-600 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                          title="Edit Review"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(review)}
                          className="p-2 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Review"
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

      {/* Pagination Controls */}
      {totalCount > 0 && (
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
      )}

      {/* Add / Edit Form Modal */}
      <VideoReviewFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isSubmitting={isSubmitting}
      />

      {/* Lightbox Video Preview Modal */}
      <VideoReviewModal
        isOpen={previewModalOpen}
        currentIndex={previewIndex}
        items={items.map((it) => ({
          id: it.id,
          title: it.title,
          reviewerName: it.reviewerName,
          location: it.location,
          rating: it.rating,
          highlightVideoSrc: it.highlightVideoSrc,
          posterSrc:
            it.posterSrc ||
            derivePosterFromVideoUrl(it.highlightVideoSrc || it.videoSrc),
          videoSrc: it.videoSrc,
        }))}
        onClose={() => setPreviewModalOpen(false)}
        onNavigate={(newIdx) => setPreviewIndex(newIdx)}
      />
    </div>
  );
}
