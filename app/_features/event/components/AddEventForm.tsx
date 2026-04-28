import { useMemo } from "react";
import { Field } from "@/_components/ui/Field/Field";
import { FormTagsField } from "@/_components/ui/Field/FormTagsField";
import {
  EventFormData,
  EventFormInput,
  EventSchema,
} from "@/_schemas/Event.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormDropdown } from "../../../_components/ui/Dropdown/FormDropdown";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import { BookingCategory } from "@/_types/Booking.types";
import { Venue } from "@/_types/Venue.types";
import { Sponsor } from "@/_types/Sponsors.types";
import { Artist } from "@/_types/Artists.types";
import { EventCategory } from "@/_types/EventCategories.types";

interface AddEventFormProps {
  handleSubmit: (data: EventFormData) => void;
  handleCancel?: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  initialData?: EventFormData;
  isEditOrDuplicateMode?: boolean;
  bookingTypes: BookingCategory[];
  sponsors: Sponsor[];
  artists: Artist[];
  categories: EventCategory[];
  venues: Venue[];
}

export default function AddEventForm({
  handleSubmit,
  handleCancel,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  initialData,
  isEditOrDuplicateMode,
  bookingTypes,
  sponsors,
  artists,
  categories,
  venues,
}: AddEventFormProps) {
  const { closeDrawer } = useUI();

  const venueOptions = useMemo(
    () => venues.map((v) => ({ label: v.venue, value: v._id })),
    [venues],
  );

  const bookingTypeOptions = useMemo(
    () => bookingTypes.map((b) => ({ label: b.bookingType, value: b._id })),
    [bookingTypes],
  );

  const sponsorOptions = useMemo(
    () => sponsors.map((s) => ({ label: s.sponsorName, value: s._id })),
    [sponsors],
  );

  const artistOptions = useMemo(
    () => artists.map((a) => ({ label: a.artistName, value: a._id })),
    [artists],
  );

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ label: c.categoryName, value: c._id })),
    [categories],
  );

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormInput, unknown, EventFormData>({
    resolver: zodResolver(EventSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues:
      isEditOrDuplicateMode && initialData
        ? ({
            ...initialData,
            eventDate:
              initialData.eventDate instanceof Date
                ? initialData.eventDate.toLocaleDateString()
                : initialData.eventDate,
          } as EventFormInput)
        : {
            eventName: "",
            eventDescription: "",
            venueName: "",
            eventDate: "",
            startTime: "",
            endTime: "",
            instruments: [],
            hashtags: [],
            bookingTypes: [],
            sponsors: [],
            artists: [],
            totalCapacity: 0,
            eventCategories: [],
            homeBanner: "",
            eventBanner: "",
            ogImage: "",
          },
  });

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field
          label="Event Name"
          error={errors.eventName?.message}
          {...register("eventName")}
          required
        />
        <FormDropdown
          name="venueName"
          control={control}
          label="Venue Name"
          options={venueOptions}
          required
        />

        <Field
          label="Event Date"
          type="date"
          error={errors.eventDate?.message}
          {...register("eventDate")}
          required
        />

        <Field
          label="Start Time"
          type="time"
          error={errors.startTime?.message}
          {...register("startTime")}
          required
        />
        <Field
          label="End Time"
          type="time"
          error={errors.endTime?.message}
          {...register("endTime")}
          required
        />

        <FormTagsField
          name="instruments"
          control={control}
          label="Instruments"
          required
        />
        <FormTagsField
          name="hashtags"
          control={control}
          label="Hash Tags"
          required
        />

        <FormDropdown
          name="bookingTypes"
          control={control}
          label="Booking Types"
          multiple
          options={bookingTypeOptions}
          required
        />
        <FormDropdown
          name="sponsors"
          control={control}
          label="Sponsors"
          multiple
          options={sponsorOptions}
          required
        />

        <FormDropdown
          name="artists"
          control={control}
          label="Artists"
          multiple
          options={artistOptions}
          required
        />
        <Field
          label="Total Capacity"
          type="number"
          error={errors.totalCapacity?.message}
          {...register("totalCapacity")}
          required
        />

        <FormDropdown
          name="eventCategories"
          control={control}
          label="Event categories"
          multiple
          options={categoryOptions}
          required
        />
        <FileUploadField
          name="homeBanner"
          control={control}
          label="Home Banner"
          error={errors.homeBanner?.message}
          required
        />
        <FileUploadField
          name="eventBanner"
          control={control}
          label="Event Banner"
          error={errors.eventBanner?.message}
          required
        />
        <FileUploadField
          name="ogImage"
          control={control}
          label="OpenGraph Image"
          error={errors.ogImage?.message}
          required
        />
        <Field
          as="textarea"
          label="Description"
          error={errors.eventDescription?.message}
          {...register("eventDescription")}
          required
          inputClassName="min-h-48!"
        />
      </div>
      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={handleCancel || closeDrawer}
        cancelLabel={cancelLabel}
        submitLabel={submitLabel}
      />
    </form>
  );
}
