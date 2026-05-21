"use client";

import { Field } from "@/_components/ui/Field/Field";
import FormActionButtons from "@/_components/common/FormActionButtons";
import {
  ManualAttendanceFormInput,
  ManualAttendanceFormData,
  ManualAttendanceSchema,
} from "@/_schemas/Event.schemas";
import { useUI } from "@/providers/UIProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface AddManualAttendanceFormProps {
  handleSubmit: (data: ManualAttendanceFormData) => void | Promise<void>;
}

export default function AddManualAttendanceForm({
  handleSubmit,
}: AddManualAttendanceFormProps) {
  const { closeModal } = useUI();

  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors, isSubmitting },
  } = useForm<ManualAttendanceFormInput, unknown, ManualAttendanceFormData>({
    resolver: zodResolver(ManualAttendanceSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      manualAttendance: 0,
    },
  });

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      <div className="grid grid-cols-1 gap-8">
        <Field
          label="Manual Attendance"
          type="number"
          min={0}
          step={1}
          error={errors.manualAttendance?.message}
          {...register("manualAttendance")}
          required
        />
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeModal}
        submitLabel="Submit"
      />
    </form>
  );
}
