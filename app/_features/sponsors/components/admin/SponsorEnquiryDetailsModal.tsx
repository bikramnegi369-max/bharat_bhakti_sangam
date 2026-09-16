"use client";

import React, { useState } from "react";
import {
  SponsorEnquiryRecord,
  SponsorEnquiryStatus,
} from "@/_types/Sponsors.types";
import {
  Building2,
  User,
  Mail,
  Globe,
  DollarSign,
  Tag,
  MessageSquare,
  Package,
  Calendar,
  X,
  CheckCircle2,
  PhoneCall,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import clsx from "clsx";

interface SponsorEnquiryDetailsModalProps {
  enquiry: SponsorEnquiryRecord;
  onClose: () => void;
  onUpdateStatus?: (
    id: string,
    status: SponsorEnquiryStatus,
  ) => Promise<void> | void;
}

export function SponsorEnquiryDetailsModal({
  enquiry,
  onClose,
  onUpdateStatus,
}: SponsorEnquiryDetailsModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<SponsorEnquiryStatus>(
    enquiry.status || "pending",
  );
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleStatusChange = async (newStatus: SponsorEnquiryStatus) => {
    if (newStatus === currentStatus) return;
    setCurrentStatus(newStatus);
    if (onUpdateStatus) {
      setIsUpdatingStatus(true);
      try {
        await onUpdateStatus(enquiry._id, newStatus);
      } finally {
        setIsUpdatingStatus(false);
      }
    }
  };

  const formattedDate = enquiry.createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(enquiry.createdAt))
    : "N/A";

  const getStatusBadge = (status: SponsorEnquiryStatus) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Approved</span>
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
            <span>Contacted</span>
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Declined</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[85vh] bg-white text-neutral-800 overflow-hidden">
      {/* 1. Header with Devotional Burgundy Aesthetic */}
      <div className="relative flex items-center justify-between border-b border-amber-950/20 bg-linear-to-r from-[#2D0403] via-[#3F0605] to-[#200202] px-6 py-5 text-white shadow-sm shrink-0">
        <div className="space-y-1 pr-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
              Commercial Sponsorship Proposal
            </span>
            <span className="text-amber-500/60">•</span>
            <div className="flex items-center gap-1 text-[11px] text-neutral-300">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight truncate">
              {enquiry.companyName}
            </h2>
            {getStatusBadge(currentStatus)}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="rounded-lg p-2 text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Status Pipeline Bar */}
        <div className="p-4 rounded-xl bg-[#FEF9F2] border border-[#FED7AA]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C120C]" />
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
              Pipeline Stage:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["pending", "contacted", "approved", "rejected"] as const).map(
              (st) => (
                <button
                  key={st}
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleStatusChange(st)}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer border",
                    currentStatus === st
                      ? "bg-[#5A0A06] text-white border-[#5A0A06] shadow-xs"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-[#5A0A06]/40 hover:text-neutral-900",
                  )}
                >
                  {st}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Primary Contact & Representative Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company & Representative Info */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Building2 className="w-4 h-4 text-[#E86A17]" />
              <span>Entity Profile</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-xs text-neutral-400 font-medium">
                  Brand / Organization
                </div>
                <div className="text-base font-extrabold text-neutral-900">
                  {enquiry.companyName}
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-400 font-medium">
                  Authorized Contact Person
                </div>
                <div className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{enquiry.fullName}</span>
                  {enquiry.designation && (
                    <span className="text-xs font-medium text-neutral-500">
                      ({enquiry.designation})
                    </span>
                  )}
                </div>
              </div>

              {enquiry.websiteOrInstagram && (
                <div>
                  <div className="text-xs text-neutral-400 font-medium">
                    Website or Social Handle
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <a
                      href={
                        enquiry.websiteOrInstagram.startsWith("http")
                          ? enquiry.websiteOrInstagram
                          : `https://${enquiry.websiteOrInstagram}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E86A17] hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span className="truncate max-w-xs">
                        {enquiry.websiteOrInstagram}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Direct Communication Channels */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Mail className="w-4 h-4 text-[#E86A17]" />
              <span>Contact Channels</span>
            </div>

            <div className="space-y-3">
              {/* Email with copy button */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-neutral-200/80">
                <div className="min-w-0 pr-2">
                  <div className="text-[11px] text-neutral-400 font-medium">
                    Official Email
                  </div>
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="text-sm font-semibold text-neutral-900 hover:text-[#5A0A06] hover:underline truncate block"
                  >
                    {enquiry.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(enquiry.email, "email")}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer shrink-0"
                  title="Copy email"
                >
                  {copiedKey === "email" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone with copy button */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-neutral-200/80">
                <div className="min-w-0 pr-2">
                  <div className="text-[11px] text-neutral-400 font-medium">
                    Phone / WhatsApp
                  </div>
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="text-sm font-semibold text-neutral-900 hover:text-[#5A0A06] hover:underline truncate block"
                  >
                    {enquiry.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(enquiry.phone, "phone")}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer shrink-0"
                  title="Copy phone"
                >
                  {copiedKey === "phone" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsorship Package & Budget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C120C] uppercase tracking-wider">
              <Tag className="w-4 h-4 text-[#E86A17]" />
              <span>Target Sponsorship Opportunity</span>
            </div>
            <p className="text-base font-extrabold text-[#3F0605] pt-1">
              {enquiry.sponsorshipInterest}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Estimated Budget Commitment</span>
            </div>
            <p className="text-base font-extrabold text-emerald-950 pt-1">
              {enquiry.estimatedBudgetRange || "Open for Discussion / Custom"}
            </p>
          </div>
        </div>

        {/* In-Kind / Product Service Offering */}
        {enquiry.productServiceContribution && (
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 uppercase tracking-wider">
              <Package className="w-4 h-4 text-[#E86A17]" />
              <span>Product, Service, or In-Kind Contribution</span>
            </div>
            <p className="text-sm text-neutral-800 whitespace-pre-line leading-relaxed bg-white p-3 rounded-xl border border-neutral-200/80 font-normal">
              {enquiry.productServiceContribution}
            </p>
          </div>
        )}

        {/* Vision & Additional Message */}
        {enquiry.additionalMessage && (
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#E86A17]" />
              <span>Partner Vision / Specific Requirements</span>
            </div>
            <p className="text-sm text-neutral-800 whitespace-pre-line leading-relaxed bg-white p-3 rounded-xl border border-neutral-200/80 font-normal">
              {enquiry.additionalMessage}
            </p>
          </div>
        )}
      </div>

      {/* 3. Sticky Action Footer */}
      <div className="border-t border-neutral-200/80 px-6 py-4 bg-neutral-50 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="text-xs text-neutral-500 font-medium">
          Bharat Bhakti Sangam Commercial Partnerships Desk
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${enquiry.email}?subject=Bharat Bhakti Sangam Sponsorship - ${encodeURIComponent(enquiry.companyName)}`}
            className="px-4 py-2 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-600" />
            <span>Send Email</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#5A0A06] hover:bg-[#740E0A] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
