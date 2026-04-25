import { Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

interface FormActionButtonsProps {
  cancelOnClick: () => void;
  containerClassName?: string;
  cancelLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
}

const FormActionButtons = ({
  cancelOnClick,
  containerClassName = "",
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  isSubmitting,
  submitDisabled,
}: FormActionButtonsProps) => {
  return (
    <div
      className={`flex bottom-10 right-10 justify-end gap-5 mt-5 lg:mt-10 items-center ${containerClassName}`}
    >
      <Button
        type="button"
        variant="secondary"
        onClick={cancelOnClick}
        disabled={isSubmitting}
      >
        {cancelLabel}
      </Button>

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting || submitDisabled}
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 lg:w-8 lg:h-8 animate-spin" />
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
};

export default FormActionButtons;
